-- Create camps table
CREATE TABLE public.camps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_hi TEXT,
  title_sa TEXT,
  description_en TEXT,
  description_hi TEXT,
  description_sa TEXT,
  thumbnail TEXT DEFAULT '/placeholder.svg',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  age_category TEXT NOT NULL,
  age_min INTEGER,
  age_max INTEGER,
  location TEXT,
  price TEXT,
  registration_link TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.camps ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Anyone can view active camps"
ON public.camps
FOR SELECT
USING (is_active = true);

-- Create policy for authenticated users to manage camps
CREATE POLICY "Authenticated users can manage camps"
ON public.camps
FOR ALL
USING (true)
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_camps_updated_at
BEFORE UPDATE ON public.camps
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();