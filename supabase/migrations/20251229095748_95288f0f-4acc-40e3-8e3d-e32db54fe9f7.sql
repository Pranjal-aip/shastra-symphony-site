-- Add link_url column to notification_popup table for clickable notifications
ALTER TABLE public.notification_popup 
ADD COLUMN IF NOT EXISTS link_url TEXT,
ADD COLUMN IF NOT EXISTS button_text_en TEXT DEFAULT 'Learn More',
ADD COLUMN IF NOT EXISTS button_text_hi TEXT DEFAULT 'और जानें',
ADD COLUMN IF NOT EXISTS button_text_sa TEXT DEFAULT 'अधिकं जानातु';