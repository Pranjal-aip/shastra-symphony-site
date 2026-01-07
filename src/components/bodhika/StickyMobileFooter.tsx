import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Flame, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

const translations = {
  secureSeat: {
    en: 'Secure My Seat',
    hi: 'अपनी सीट सुरक्षित करें',
    sa: 'स्वस्थानं सुरक्षितं कुरुत'
  },
  seatsLeft: {
    en: 'Few seats left!',
    hi: 'कुछ सीटें शेष!',
    sa: 'कानिचित् आसनानि शेषाणि!'
  }
};

// Fallback course ID for group batch
const FALLBACK_COURSE_ID = '695393a483bcbf4ec9283f27';

const handleAutoCheckout = async (setLoading: (val: boolean) => void) => {
  setLoading(true);
  
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/auto-checkout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
        },
        body: JSON.stringify({ courseType: 'group' })
      }
    );
    
    const data = await response.json();
    
    if (data.redirectUrl) {
      window.location.href = data.redirectUrl;
    } else {
      window.open(`https://learn.shastrakulam.com/single-checkout/${FALLBACK_COURSE_ID}`, '_blank');
    }
  } catch (error) {
    console.error('Auto-checkout failed:', error);
    window.open(`https://learn.shastrakulam.com/single-checkout/${FALLBACK_COURSE_ID}`, '_blank');
  } finally {
    setLoading(false);
  }
};

const StickyMobileFooter = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);
  const [hiddenNearPricing, setHiddenNearPricing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const pricingSection = document.getElementById('pricing-section');
      
      // Show after scrolling 400px
      setVisible(scrollY > 400);
      
      // Hide when near pricing section
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect();
        const isNearPricing = rect.top < window.innerHeight && rect.bottom > 0;
        setHiddenNearPricing(isNearPricing);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only show on mobile
  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {visible && !hiddenNearPricing && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-maroon via-maroon-dark to-maroon border-t border-saffron/20 p-3 shadow-2xl"
        >
          <div className="container mx-auto">
            <div className="flex items-center justify-between gap-3">
              <motion.div 
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="flex items-center gap-2"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <Flame className="h-4 w-4 text-saffron" />
                </motion.div>
                <span className="text-cream text-xs font-body">{t(translations.seatsLeft)}</span>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  className="bg-saffron hover:bg-saffron/90 text-white font-semibold px-6 py-2 rounded-full shadow-lg flex-1 max-w-[200px]"
                  onClick={() => handleAutoCheckout(setIsLoading)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <motion.span
                      animate={{ opacity: [1, 0.8, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="flex items-center"
                    >
                      {t(translations.secureSeat)}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </motion.span>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyMobileFooter;
