-- Add age range columns to courses table
ALTER TABLE public.courses
ADD COLUMN age_min integer,
ADD COLUMN age_max integer;