-- Fix security: Update all management policies to require admin role
-- This prevents any authenticated user from modifying content

-- ============= COURSES TABLE =============
DROP POLICY IF EXISTS "Authenticated users can manage courses" ON public.courses;

CREATE POLICY "Admins can manage courses"
ON public.courses
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============= BLOG_POSTS TABLE =============
DROP POLICY IF EXISTS "Authenticated users can manage blog posts" ON public.blog_posts;

CREATE POLICY "Admins can manage blog posts"
ON public.blog_posts
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============= COURSE_CATEGORIES TABLE =============
DROP POLICY IF EXISTS "Authenticated users can manage course categories" ON public.course_categories;

CREATE POLICY "Admins can manage course categories"
ON public.course_categories
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============= BLOG_CATEGORIES TABLE =============
DROP POLICY IF EXISTS "Authenticated users can manage blog categories" ON public.blog_categories;

CREATE POLICY "Admins can manage blog categories"
ON public.blog_categories
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============= SITE_SETTINGS TABLE =============
DROP POLICY IF EXISTS "Authenticated users can manage site settings" ON public.site_settings;

CREATE POLICY "Admins can manage site settings"
ON public.site_settings
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============= NOTIFICATION_POPUP TABLE =============
DROP POLICY IF EXISTS "Authenticated users can manage notification popup" ON public.notification_popup;

CREATE POLICY "Admins can manage notification popup"
ON public.notification_popup
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============= CAMPS TABLE =============
DROP POLICY IF EXISTS "Authenticated users can manage camps" ON public.camps;

CREATE POLICY "Admins can manage camps"
ON public.camps
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============= REFERRAL_LINKS TABLE =============
DROP POLICY IF EXISTS "Authenticated users can manage referral links" ON public.referral_links;

CREATE POLICY "Admins can manage referral links"
ON public.referral_links
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============= CONTACT_MESSAGES TABLE =============
DROP POLICY IF EXISTS "Authenticated users can manage contact messages" ON public.contact_messages;

CREATE POLICY "Admins can manage contact messages"
ON public.contact_messages
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============= CONTACT_MESSAGES INPUT VALIDATION =============
-- Create a trigger function to validate contact message inputs
CREATE OR REPLACE FUNCTION public.validate_contact_message()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  -- Validate name length (max 100 chars)
  IF char_length(NEW.name) > 100 THEN
    RAISE EXCEPTION 'Name must be 100 characters or less';
  END IF;
  
  -- Validate email length (max 255 chars) and basic format
  IF char_length(NEW.email) > 255 THEN
    RAISE EXCEPTION 'Email must be 255 characters or less';
  END IF;
  
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Validate message length (max 5000 chars)
  IF char_length(NEW.message) > 5000 THEN
    RAISE EXCEPTION 'Message must be 5000 characters or less';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for contact message validation
DROP TRIGGER IF EXISTS validate_contact_message_trigger ON public.contact_messages;
CREATE TRIGGER validate_contact_message_trigger
BEFORE INSERT OR UPDATE ON public.contact_messages
FOR EACH ROW
EXECUTE FUNCTION public.validate_contact_message();