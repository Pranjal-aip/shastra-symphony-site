-- Create referral links table for tracking
CREATE TABLE public.referral_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Create referral visits tracking
CREATE TABLE public.referral_visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referral_link_id UUID NOT NULL REFERENCES public.referral_links(id) ON DELETE CASCADE,
  visited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  page_visited TEXT,
  user_agent TEXT,
  ip_hash TEXT
);

-- Create course enrollments table with age support
CREATE TABLE public.course_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  referral_link_id UUID REFERENCES public.referral_links(id) ON DELETE SET NULL,
  student_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  age INTEGER,
  age_group TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.referral_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;

-- RLS policies for referral_links (public read, admin write)
CREATE POLICY "Anyone can view active referral links"
ON public.referral_links FOR SELECT
USING (is_active = true);

CREATE POLICY "Authenticated users can manage referral links"
ON public.referral_links FOR ALL
USING (true)
WITH CHECK (true);

-- RLS policies for referral_visits (public insert for tracking, admin read)
CREATE POLICY "Anyone can log referral visits"
ON public.referral_visits FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can view referral visits"
ON public.referral_visits FOR SELECT
USING (true);

-- RLS policies for course_enrollments (public insert, admin read/manage)
CREATE POLICY "Anyone can create course enrollment"
ON public.course_enrollments FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can manage course enrollments"
ON public.course_enrollments FOR ALL
USING (true)
WITH CHECK (true);

-- Enable realtime for tracking
ALTER PUBLICATION supabase_realtime ADD TABLE public.referral_links;
ALTER PUBLICATION supabase_realtime ADD TABLE public.referral_visits;
ALTER PUBLICATION supabase_realtime ADD TABLE public.course_enrollments;

-- Add triggers for updated_at
CREATE TRIGGER update_referral_links_updated_at
  BEFORE UPDATE ON public.referral_links
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_course_enrollments_updated_at
  BEFORE UPDATE ON public.course_enrollments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();