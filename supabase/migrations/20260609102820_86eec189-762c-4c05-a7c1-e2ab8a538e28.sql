
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS seo_title_en text,
  ADD COLUMN IF NOT EXISTS seo_title_hi text,
  ADD COLUMN IF NOT EXISTS seo_title_sa text,
  ADD COLUMN IF NOT EXISTS seo_description_en text,
  ADD COLUMN IF NOT EXISTS seo_description_hi text,
  ADD COLUMN IF NOT EXISTS seo_description_sa text,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'published',
  ADD COLUMN IF NOT EXISTS scheduled_at timestamptz,
  ADD COLUMN IF NOT EXISTS custom_html_en text,
  ADD COLUMN IF NOT EXISTS custom_html_hi text,
  ADD COLUMN IF NOT EXISTS custom_html_sa text,
  ADD COLUMN IF NOT EXISTS custom_css text;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'blog_posts_status_check') THEN
    ALTER TABLE public.blog_posts ADD CONSTRAINT blog_posts_status_check
      CHECK (status IN ('draft','scheduled','published'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS blog_posts_tags_idx ON public.blog_posts USING GIN(tags);
