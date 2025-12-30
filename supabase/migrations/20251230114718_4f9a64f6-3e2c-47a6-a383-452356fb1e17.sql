-- Step 1: Add new enum values only (must be committed before use)
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'blog_writer';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'course_manager';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'enrollment_manager';