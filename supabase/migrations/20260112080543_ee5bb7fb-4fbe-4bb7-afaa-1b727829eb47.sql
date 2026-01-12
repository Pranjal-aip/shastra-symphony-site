-- Add og_image column to blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS og_image text;

-- Add og_image column to courses table  
ALTER TABLE public.courses
ADD COLUMN IF NOT EXISTS og_image text;

-- Add comment for documentation
COMMENT ON COLUMN public.blog_posts.og_image IS 'Custom Open Graph image URL for social media sharing';
COMMENT ON COLUMN public.courses.og_image IS 'Custom Open Graph image URL for social media sharing';