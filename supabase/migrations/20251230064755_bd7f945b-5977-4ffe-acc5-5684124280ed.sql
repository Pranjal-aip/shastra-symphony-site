-- Create table for AI-generated landing pages
CREATE TABLE public.ai_landing_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  
  -- Step 1: Course Basics
  course_name TEXT NOT NULL,
  transformation_goal TEXT NOT NULL,
  course_category TEXT NOT NULL,
  course_duration TEXT NOT NULL,
  course_mode TEXT NOT NULL,
  languages TEXT[] NOT NULL,
  
  -- Step 2: Target Audience & Course Nature
  target_audience TEXT[] NOT NULL,
  course_nature TEXT NOT NULL,
  difficulty_level TEXT NOT NULL,
  
  -- Step 3: Course Structure
  number_of_modules INTEGER NOT NULL,
  weekly_hours INTEGER NOT NULL,
  teaching_style TEXT[] NOT NULL,
  certificate_provided BOOLEAN DEFAULT false,
  
  -- Step 4: Batch & Pricing
  batches JSONB NOT NULL DEFAULT '[]',
  scholarship_available BOOLEAN DEFAULT false,
  limited_seats_badge BOOLEAN DEFAULT false,
  
  -- Step 5: Trust & Authority
  institution_name TEXT NOT NULL,
  instructor_name TEXT,
  years_of_experience INTEGER,
  total_students_taught INTEGER,
  recognitions TEXT,
  
  -- Step 6: Tone & Style
  tone_style TEXT NOT NULL,
  
  -- Generated Content
  generated_content JSONB,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'draft',
  slug TEXT UNIQUE,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ai_landing_pages ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access
CREATE POLICY "Admins can manage AI landing pages"
ON public.ai_landing_pages
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create policy for public read access on published pages
CREATE POLICY "Published landing pages are public"
ON public.ai_landing_pages
FOR SELECT
USING (status = 'published');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_ai_landing_pages_updated_at
BEFORE UPDATE ON public.ai_landing_pages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();