import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const useReferral = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const refCode = searchParams.get('ref');
    if (refCode) {
      // Store in session storage for later use in enrollments
      sessionStorage.setItem('referral_code', refCode);
      
      // Log the visit
      logReferralVisit(refCode);
    }
  }, [searchParams]);

  const logReferralVisit = async (code: string) => {
    try {
      // First get the referral link ID
      const { data: refLink } = await supabase
        .from('referral_links')
        .select('id')
        .eq('code', code)
        .eq('is_active', true)
        .single();

      if (refLink) {
        await supabase.from('referral_visits').insert({
          referral_link_id: refLink.id,
          page_visited: window.location.pathname,
          user_agent: navigator.userAgent,
        });
      }
    } catch (error) {
      console.error('Failed to log referral visit:', error);
    }
  };

  const getReferralCode = (): string | null => {
    return sessionStorage.getItem('referral_code');
  };

  const getReferralLinkId = async (): Promise<string | null> => {
    const code = getReferralCode();
    if (!code) return null;

    try {
      const { data } = await supabase
        .from('referral_links')
        .select('id')
        .eq('code', code)
        .eq('is_active', true)
        .single();
      
      return data?.id || null;
    } catch {
      return null;
    }
  };

  return { getReferralCode, getReferralLinkId };
};
