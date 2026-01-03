-- Add Graphy integration columns to courses table
ALTER TABLE public.courses ADD COLUMN graphy_product_id TEXT;

-- Add Graphy integration columns to course_enrollments table
ALTER TABLE public.course_enrollments ADD COLUMN graphy_learner_id TEXT;
ALTER TABLE public.course_enrollments ADD COLUMN graphy_sync_status TEXT DEFAULT 'pending';
ALTER TABLE public.course_enrollments ADD COLUMN graphy_enrolled_at TIMESTAMPTZ;

-- Create graphy_progress table for caching student progress
CREATE TABLE public.graphy_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id UUID NOT NULL REFERENCES public.course_enrollments(id) ON DELETE CASCADE,
  progress_percent INTEGER DEFAULT 0,
  time_spent_secs INTEGER DEFAULT 0,
  quiz_scores JSONB DEFAULT '[]'::jsonb,
  last_synced_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(enrollment_id)
);

-- Enable RLS on graphy_progress
ALTER TABLE public.graphy_progress ENABLE ROW LEVEL SECURITY;

-- RLS policies for graphy_progress
CREATE POLICY "Authorized users can view graphy progress"
ON public.graphy_progress
FOR SELECT
USING (can_manage_enrollments(auth.uid()));

CREATE POLICY "Authorized users can manage graphy progress"
ON public.graphy_progress
FOR ALL
USING (can_manage_enrollments(auth.uid()))
WITH CHECK (can_manage_enrollments(auth.uid()));

-- Create trigger for updated_at on graphy_progress
CREATE TRIGGER update_graphy_progress_updated_at
BEFORE UPDATE ON public.graphy_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_course_enrollments_graphy_sync_status ON public.course_enrollments(graphy_sync_status);
CREATE INDEX idx_courses_graphy_product_id ON public.courses(graphy_product_id);