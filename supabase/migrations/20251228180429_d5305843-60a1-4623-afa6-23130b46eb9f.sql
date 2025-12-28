-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title_en TEXT NOT NULL,
  title_hi TEXT,
  title_sa TEXT,
  short_description_en TEXT,
  short_description_hi TEXT,
  short_description_sa TEXT,
  full_description_en TEXT,
  full_description_hi TEXT,
  full_description_sa TEXT,
  thumbnail TEXT DEFAULT '/placeholder.svg',
  category TEXT NOT NULL,
  level TEXT NOT NULL DEFAULT 'All Ages',
  duration TEXT,
  price TEXT,
  is_popular BOOLEAN NOT NULL DEFAULT false,
  show_on_home BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title_en TEXT NOT NULL,
  title_hi TEXT,
  title_sa TEXT,
  excerpt_en TEXT,
  excerpt_hi TEXT,
  excerpt_sa TEXT,
  content_en TEXT,
  content_hi TEXT,
  content_sa TEXT,
  thumbnail TEXT DEFAULT '/placeholder.svg',
  category TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Shastrakulam Team',
  date TEXT NOT NULL DEFAULT to_char(now(), 'YYYY-MM-DD'),
  show_on_home BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create course_categories table
CREATE TABLE public.course_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name_en TEXT NOT NULL UNIQUE,
  name_hi TEXT,
  name_sa TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_categories table
CREATE TABLE public.blog_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name_en TEXT NOT NULL UNIQUE,
  name_hi TEXT,
  name_sa TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site_settings table for notifications and other settings
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notification_popup table
CREATE TABLE public.notification_popup (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_en TEXT,
  title_hi TEXT,
  title_sa TEXT,
  message_en TEXT,
  message_hi TEXT,
  message_sa TEXT,
  image_url TEXT,
  is_enabled BOOLEAN NOT NULL DEFAULT false,
  show_on_all_pages BOOLEAN NOT NULL DEFAULT true,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables (but allow public read access since this is a public website)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_popup ENABLE ROW LEVEL SECURITY;

-- Public read access for courses
CREATE POLICY "Anyone can view courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage courses" ON public.courses FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Public read access for blog posts
CREATE POLICY "Anyone can view blog posts" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage blog posts" ON public.blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Public read access for categories
CREATE POLICY "Anyone can view course categories" ON public.course_categories FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage course categories" ON public.course_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can view blog categories" ON public.blog_categories FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage blog categories" ON public.blog_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Public read access for site settings
CREATE POLICY "Anyone can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage site settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Public read access for notification popup
CREATE POLICY "Anyone can view notification popup" ON public.notification_popup FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage notification popup" ON public.notification_popup FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Storage policies for images bucket
CREATE POLICY "Anyone can view images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Authenticated users can upload images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'images');
CREATE POLICY "Authenticated users can update images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'images');
CREATE POLICY "Authenticated users can delete images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'images');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_notification_popup_updated_at BEFORE UPDATE ON public.notification_popup FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.course_categories (name_en, name_hi, name_sa) VALUES
  ('Sanskrit', 'संस्कृत', 'संस्कृतम्'),
  ('Shastra', 'शास्त्र', 'शास्त्रम्'),
  ('Yoga', 'योग', 'योगः'),
  ('Music', 'संगीत', 'संगीतम्'),
  ('Vedic Math', 'वैदिक गणित', 'वैदिकगणितम्'),
  ('Stories', 'कथाएँ', 'कथाः');

INSERT INTO public.blog_categories (name_en, name_hi, name_sa) VALUES
  ('Sanskrit Learning', 'संस्कृत शिक्षा', 'संस्कृतशिक्षा'),
  ('Parenting', 'पालन-पोषण', 'पालनपोषणम्'),
  ('Vedic Stories', 'वैदिक कथाएँ', 'वैदिककथाः'),
  ('Festivals', 'त्यौहार', 'उत्सवाः');

-- Insert default notification popup (disabled)
INSERT INTO public.notification_popup (title_en, title_hi, title_sa, message_en, message_hi, message_sa, is_enabled, show_on_all_pages) 
VALUES ('Welcome to Shastrakulam', 'शास्त्रकुलम् में आपका स्वागत है', 'शास्त्रकुलम् स्वागतम्', 'Discover the beauty of Vedic education.', 'वैदिक शिक्षा की सुंदरता की खोज करें।', 'वैदिकशिक्षायाः सौन्दर्यं अन्वेषयत।', false, true);

-- Insert sample courses
INSERT INTO public.courses (slug, title_en, title_hi, title_sa, short_description_en, short_description_hi, short_description_sa, category, level, duration, price, is_popular, show_on_home) VALUES
  ('sanskrit-basics', 'Sanskrit Basics', 'संस्कृत मूलभूत', 'संस्कृतमूलतत्त्वानि', 'Learn the fundamentals of Sanskrit language', 'संस्कृत भाषा की मूल बातें सीखें', 'संस्कृतभाषायाः मूलतत्त्वानि अधिगच्छत', 'Sanskrit', 'Kids', '12 weeks', '₹4,999', true, true),
  ('bhagavad-gita-study', 'Bhagavad Gita Study', 'भगवद्गीता अध्ययन', 'भगवद्गीताध्ययनम्', 'Deep dive into the timeless wisdom of Gita', 'गीता के शाश्वत ज्ञान में गहराई से जानें', 'गीतायाः शाश्वतज्ञाने गभीरताम् अनुभवत', 'Shastra', 'Adults', '16 weeks', '₹6,999', true, true),
  ('yoga-for-children', 'Yoga for Children', 'बच्चों के लिए योग', 'बालानां योगः', 'Age-appropriate yoga practices for kids', 'बच्चों के लिए उम्र के अनुसार योग अभ्यास', 'बालानां कृते युक्तयोगाभ्यासाः', 'Yoga', 'Kids', '8 weeks', '₹3,499', true, true),
  ('vedic-mathematics', 'Vedic Mathematics', 'वैदिक गणित', 'वैदिकगणितम्', 'Master ancient mathematical techniques', 'प्राचीन गणितीय तकनीकों में महारत हासिल करें', 'प्राचीनगणिततन्त्राणि अधिगच्छत', 'Vedic Math', 'Teens', '10 weeks', '₹4,499', false, true),
  ('indian-classical-music', 'Indian Classical Music', 'भारतीय शास्त्रीय संगीत', 'भारतीयशास्त्रीयसंगीतम्', 'Introduction to ragas and talas', 'राग और ताल का परिचय', 'रागतालयोः परिचयः', 'Music', 'All Ages', '12 weeks', '₹5,999', false, false),
  ('vedic-stories', 'Vedic Stories for Kids', 'बच्चों के लिए वैदिक कथाएँ', 'बालानां वैदिककथाः', 'Engaging stories from our scriptures', 'हमारे शास्त्रों से रोचक कहानियाँ', 'अस्माकं शास्त्रेभ्यः रोचककथाः', 'Stories', 'Kids', '6 weeks', '₹2,499', true, true);

-- Insert sample blog posts
INSERT INTO public.blog_posts (slug, title_en, title_hi, title_sa, excerpt_en, excerpt_hi, excerpt_sa, category, author, date, show_on_home) VALUES
  ('importance-of-sanskrit', 'The Importance of Sanskrit in Modern Education', 'आधुनिक शिक्षा में संस्कृत का महत्व', 'आधुनिकशिक्षायां संस्कृतस्य महत्त्वम्', 'Discover why Sanskrit remains relevant in today''s educational landscape.', 'जानें कि आज की शिक्षा में संस्कृत क्यों प्रासंगिक है।', 'अद्यतनशिक्षायां संस्कृतं किमर्थं प्रासंगिकम् अस्ति इति जानीत।', 'Sanskrit Learning', 'Dr. Sharma', '2024-01-15', true),
  ('teaching-values-to-children', 'Teaching Values Through Stories', 'कहानियों के माध्यम से मूल्य सिखाना', 'कथानां माध्यमेन मूल्यशिक्षणम्', 'How traditional stories can instill values in young minds.', 'पारंपरिक कहानियाँ बच्चों में मूल्य कैसे स्थापित कर सकती हैं।', 'पारम्परिककथाः बालमनसि मूल्यानि कथं स्थापयितुं शक्नुवन्ति।', 'Parenting', 'Acharya Priya', '2024-01-10', true),
  ('celebrating-festivals', 'The Significance of Vedic Festivals', 'वैदिक त्यौहारों का महत्व', 'वैदिकोत्सवानां महत्त्वम्', 'Understanding the deeper meaning behind our celebrations.', 'हमारे उत्सवों के पीछे के गहरे अर्थ को समझें।', 'अस्माकं उत्सवानां गभीरार्थं अवगच्छत।', 'Festivals', 'Pandit Ji', '2024-01-05', true),
  ('stories-of-rama', 'Stories from the Ramayana', 'रामायण की कहानियाँ', 'रामायणकथाः', 'Timeless tales of dharma and devotion.', 'धर्म और भक्ति की शाश्वत कथाएँ।', 'धर्मभक्त्योः शाश्वतकथाः।', 'Vedic Stories', 'Shastrakulam Team', '2024-01-01', true);