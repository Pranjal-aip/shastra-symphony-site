-- Add gender and state columns to course_enrollments table
ALTER TABLE course_enrollments 
ADD COLUMN IF NOT EXISTS gender text,
ADD COLUMN IF NOT EXISTS state text;