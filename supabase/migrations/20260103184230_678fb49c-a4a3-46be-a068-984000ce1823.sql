-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Anyone can create course enrollment" ON public.course_enrollments;

-- Create a permissive INSERT policy for public enrollments
CREATE POLICY "Anyone can create course enrollment"
ON public.course_enrollments
FOR INSERT
TO public
WITH CHECK (true);