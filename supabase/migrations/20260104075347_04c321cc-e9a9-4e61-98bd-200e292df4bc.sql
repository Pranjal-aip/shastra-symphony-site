-- Table 1: graphy_learners - Track all learners from Graphy
CREATE TABLE public.graphy_learners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  mobile TEXT,
  graphy_learner_id TEXT UNIQUE,
  profile_data JSONB DEFAULT '{}'::jsonb,
  marketing_consent BOOLEAN DEFAULT false,
  consent_timestamp TIMESTAMP WITH TIME ZONE,
  signup_source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table 2: graphy_courses - Sync published courses from Graphy
CREATE TABLE public.graphy_courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  graphy_course_id TEXT UNIQUE,
  title TEXT NOT NULL,
  course_link TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb,
  is_synced_to_local BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table 3: graphy_subscribers - Track contact form submissions
CREATE TABLE public.graphy_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  mobile TEXT,
  source TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table 4: certificate_downloads - Track certificate download activity
CREATE TABLE public.certificate_downloads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id UUID REFERENCES public.course_enrollments(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  course_name TEXT,
  certificate_url TEXT,
  downloaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table 5: video_processing_logs - Track video upload processing status
CREATE TABLE public.video_processing_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id TEXT,
  course_name TEXT,
  status TEXT NOT NULL DEFAULT 'processed',
  processed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add certificate_download_count to course_enrollments
ALTER TABLE public.course_enrollments 
ADD COLUMN certificate_download_count INTEGER DEFAULT 0;

-- Enable RLS on all new tables
ALTER TABLE public.graphy_learners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.graphy_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.graphy_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificate_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_processing_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for graphy_learners
CREATE POLICY "Authorized users can view graphy learners"
ON public.graphy_learners FOR SELECT
USING (can_manage_enrollments(auth.uid()));

CREATE POLICY "Authorized users can manage graphy learners"
ON public.graphy_learners FOR ALL
USING (can_manage_enrollments(auth.uid()))
WITH CHECK (can_manage_enrollments(auth.uid()));

-- RLS Policies for graphy_courses
CREATE POLICY "Anyone can view graphy courses"
ON public.graphy_courses FOR SELECT
USING (true);

CREATE POLICY "Authorized users can manage graphy courses"
ON public.graphy_courses FOR ALL
USING (can_manage_courses(auth.uid()))
WITH CHECK (can_manage_courses(auth.uid()));

-- RLS Policies for graphy_subscribers
CREATE POLICY "Authorized users can view subscribers"
ON public.graphy_subscribers FOR SELECT
USING (can_manage_enrollments(auth.uid()));

CREATE POLICY "Authorized users can manage subscribers"
ON public.graphy_subscribers FOR ALL
USING (can_manage_enrollments(auth.uid()))
WITH CHECK (can_manage_enrollments(auth.uid()));

-- RLS Policies for certificate_downloads
CREATE POLICY "Authorized users can view certificate downloads"
ON public.certificate_downloads FOR SELECT
USING (can_manage_enrollments(auth.uid()));

CREATE POLICY "Authorized users can manage certificate downloads"
ON public.certificate_downloads FOR ALL
USING (can_manage_enrollments(auth.uid()))
WITH CHECK (can_manage_enrollments(auth.uid()));

-- RLS Policies for video_processing_logs
CREATE POLICY "Authorized users can view video logs"
ON public.video_processing_logs FOR SELECT
USING (can_manage_courses(auth.uid()));

CREATE POLICY "Authorized users can manage video logs"
ON public.video_processing_logs FOR ALL
USING (can_manage_courses(auth.uid()))
WITH CHECK (can_manage_courses(auth.uid()));

-- Create updated_at triggers for new tables
CREATE TRIGGER update_graphy_learners_updated_at
BEFORE UPDATE ON public.graphy_learners
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_graphy_courses_updated_at
BEFORE UPDATE ON public.graphy_courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();