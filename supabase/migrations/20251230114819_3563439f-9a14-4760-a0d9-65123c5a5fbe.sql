-- Step 1: Create helper functions for each role check
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin'::app_role)
$$;

CREATE OR REPLACE FUNCTION public.can_manage_blogs(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin'::app_role) 
      OR public.has_role(_user_id, 'blog_writer'::app_role)
$$;

CREATE OR REPLACE FUNCTION public.can_manage_courses(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin'::app_role) 
      OR public.has_role(_user_id, 'course_manager'::app_role)
$$;

CREATE OR REPLACE FUNCTION public.can_manage_enrollments(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin'::app_role) 
      OR public.has_role(_user_id, 'enrollment_manager'::app_role)
$$;

-- Step 2: Create function to check if user has any staff role
CREATE OR REPLACE FUNCTION public.has_any_staff_role(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'blog_writer', 'course_manager', 'enrollment_manager')
  )
$$;

-- Step 3: Create function to get user's roles
CREATE OR REPLACE FUNCTION public.get_user_roles(_user_id uuid)
RETURNS app_role[]
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT ARRAY_AGG(role) FROM public.user_roles WHERE user_id = _user_id
$$;

-- Step 4: Update blog_posts policies
DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;
CREATE POLICY "Authorized users can manage blog posts"
ON public.blog_posts
FOR ALL
USING (public.can_manage_blogs(auth.uid()))
WITH CHECK (public.can_manage_blogs(auth.uid()));

-- Step 5: Update blog_categories policies
DROP POLICY IF EXISTS "Admins can manage blog categories" ON public.blog_categories;
CREATE POLICY "Authorized users can manage blog categories"
ON public.blog_categories
FOR ALL
USING (public.can_manage_blogs(auth.uid()))
WITH CHECK (public.can_manage_blogs(auth.uid()));

-- Step 6: Update courses policies
DROP POLICY IF EXISTS "Admins can manage courses" ON public.courses;
CREATE POLICY "Authorized users can manage courses"
ON public.courses
FOR ALL
USING (public.can_manage_courses(auth.uid()))
WITH CHECK (public.can_manage_courses(auth.uid()));

-- Step 7: Update course_categories policies
DROP POLICY IF EXISTS "Admins can manage course categories" ON public.course_categories;
CREATE POLICY "Authorized users can manage course categories"
ON public.course_categories
FOR ALL
USING (public.can_manage_courses(auth.uid()))
WITH CHECK (public.can_manage_courses(auth.uid()));

-- Step 8: Update course_enrollments policies
DROP POLICY IF EXISTS "Admins can view all enrollments" ON public.course_enrollments;
DROP POLICY IF EXISTS "Admins can update enrollments" ON public.course_enrollments;
DROP POLICY IF EXISTS "Admins can delete enrollments" ON public.course_enrollments;

CREATE POLICY "Authorized users can view enrollments"
ON public.course_enrollments
FOR SELECT
USING (public.can_manage_enrollments(auth.uid()));

CREATE POLICY "Authorized users can update enrollments"
ON public.course_enrollments
FOR UPDATE
USING (public.can_manage_enrollments(auth.uid()))
WITH CHECK (public.can_manage_enrollments(auth.uid()));

CREATE POLICY "Authorized users can delete enrollments"
ON public.course_enrollments
FOR DELETE
USING (public.can_manage_enrollments(auth.uid()));