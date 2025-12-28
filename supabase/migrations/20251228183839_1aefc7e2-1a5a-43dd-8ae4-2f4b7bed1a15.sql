-- Enable realtime for tables
ALTER TABLE public.courses REPLICA IDENTITY FULL;
ALTER TABLE public.blog_posts REPLICA IDENTITY FULL;
ALTER TABLE public.course_categories REPLICA IDENTITY FULL;
ALTER TABLE public.blog_categories REPLICA IDENTITY FULL;
ALTER TABLE public.notification_popup REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.courses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.course_categories;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_categories;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notification_popup;

-- Create initial notification popup row if none exists
INSERT INTO public.notification_popup (is_enabled, show_on_all_pages, title_en, message_en)
SELECT false, true, '', ''
WHERE NOT EXISTS (SELECT 1 FROM public.notification_popup LIMIT 1);