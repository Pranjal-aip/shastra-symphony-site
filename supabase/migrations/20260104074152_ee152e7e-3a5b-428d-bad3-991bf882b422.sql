-- Add completion tracking columns to course_enrollments
ALTER TABLE public.course_enrollments 
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS certificate_issued BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS certificate_url TEXT;

-- Create enrollment_milestones table for tracking lesson completions
CREATE TABLE public.enrollment_milestones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id UUID NOT NULL REFERENCES public.course_enrollments(id) ON DELETE CASCADE,
  milestone_type TEXT NOT NULL, -- 'lesson_complete', 'progress_25', 'progress_50', 'progress_75', 'progress_100'
  item_name TEXT, -- Name of completed lesson/module
  progress_percent INTEGER,
  achieved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create abandoned_transactions table for tracking incomplete payments
CREATE TABLE public.abandoned_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  learner_name TEXT,
  course_name TEXT,
  graphy_transaction_id TEXT,
  amount TEXT,
  status TEXT NOT NULL DEFAULT 'initiated', -- 'initiated', 'completed', 'abandoned', 'followed_up'
  initiated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  follow_up_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.enrollment_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.abandoned_transactions ENABLE ROW LEVEL SECURITY;

-- RLS policies for enrollment_milestones
CREATE POLICY "Authorized users can view enrollment milestones"
ON public.enrollment_milestones
FOR SELECT
USING (can_manage_enrollments(auth.uid()));

CREATE POLICY "Authorized users can manage enrollment milestones"
ON public.enrollment_milestones
FOR ALL
USING (can_manage_enrollments(auth.uid()))
WITH CHECK (can_manage_enrollments(auth.uid()));

-- RLS policies for abandoned_transactions
CREATE POLICY "Authorized users can view abandoned transactions"
ON public.abandoned_transactions
FOR SELECT
USING (can_manage_enrollments(auth.uid()));

CREATE POLICY "Authorized users can manage abandoned transactions"
ON public.abandoned_transactions
FOR ALL
USING (can_manage_enrollments(auth.uid()))
WITH CHECK (can_manage_enrollments(auth.uid()));

-- Create indexes for better query performance
CREATE INDEX idx_enrollment_milestones_enrollment_id ON public.enrollment_milestones(enrollment_id);
CREATE INDEX idx_enrollment_milestones_type ON public.enrollment_milestones(milestone_type);
CREATE INDEX idx_abandoned_transactions_email ON public.abandoned_transactions(email);
CREATE INDEX idx_abandoned_transactions_status ON public.abandoned_transactions(status);

-- Add trigger for updated_at on abandoned_transactions
CREATE TRIGGER update_abandoned_transactions_updated_at
BEFORE UPDATE ON public.abandoned_transactions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();