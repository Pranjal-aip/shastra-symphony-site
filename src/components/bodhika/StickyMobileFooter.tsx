import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Flame } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

const translations = {
  secureSeat: {
    en: 'Secure My Seat',
    hi: 'अपनी सीट सुरक्षित करें',
    sa: 'स्वस्थानं सुरक्षितं कुरुत'
  },
  startDate: {
    en: '7 March 2026',
    hi: '7 मार्च 2026',
    sa: '७ मार्च २०२६'
  }
};

const scrollToPricing = () => {
  const pricingSection = document.getElementById('pricing-section');
  if (pricingSection) {
    pricingSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const StickyMobileFooter = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);
  const [hiddenNearPricing, setHiddenNearPricing] = useState(false);

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
              <div className="flex items-center gap-2 bg-cream/10 rounded-full px-3 py-1 border border-saffron/30">
                <Flame className="h-3 w-3 text-saffron" />
                <span className="text-saffron text-xs font-body font-bold">{t(translations.startDate)}</span>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  className="bg-saffron hover:bg-saffron/90 text-white font-semibold px-6 py-2 rounded-full shadow-lg flex-1 max-w-[200px]"
                  onClick={scrollToPricing}
                >
                  <motion.span
                    animate={{ opacity: [1, 0.8, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex items-center"
                  >
                    {t(translations.secureSeat)}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </motion.span>
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
