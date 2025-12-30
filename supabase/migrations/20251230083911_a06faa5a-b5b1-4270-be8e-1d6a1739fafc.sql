-- Add validation trigger for course_enrollments (similar to contact_messages validation)
CREATE OR REPLACE FUNCTION public.validate_enrollment_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate age range (1-120)
  IF NEW.age IS NOT NULL AND (NEW.age < 1 OR NEW.age > 120) THEN
    RAISE EXCEPTION 'Age must be between 1 and 120';
  END IF;
  
  -- Validate email format
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Validate email length
  IF char_length(NEW.email) > 255 THEN
    RAISE EXCEPTION 'Email must be 255 characters or less';
  END IF;
  
  -- Validate student_name length (max 100 chars)
  IF char_length(NEW.student_name) > 100 THEN
    RAISE EXCEPTION 'Student name must be 100 characters or less';
  END IF;
  
  -- Validate message length (max 5000 chars)
  IF NEW.message IS NOT NULL AND char_length(NEW.message) > 5000 THEN
    RAISE EXCEPTION 'Message must be 5000 characters or less';
  END IF;
  
  -- Validate phone length (max 20 chars)
  IF NEW.phone IS NOT NULL AND char_length(NEW.phone) > 20 THEN
    RAISE EXCEPTION 'Phone must be 20 characters or less';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for enrollment validation
DROP TRIGGER IF EXISTS validate_enrollment_trigger ON public.course_enrollments;
CREATE TRIGGER validate_enrollment_trigger
BEFORE INSERT OR UPDATE ON public.course_enrollments
FOR EACH ROW EXECUTE FUNCTION public.validate_enrollment_data();

-- Fix storage policies to restrict uploads to admin only
-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

-- Create admin-only policies for storage operations
CREATE POLICY "Admin-only uploads" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (
  bucket_id = 'images' AND 
  public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admin-only image updates" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (
  bucket_id = 'images' AND 
  public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admin-only image deletes" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (
  bucket_id = 'images' AND 
  public.has_role(auth.uid(), 'admin'::app_role)
);