import React, { useState, useEffect } from 'react';
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
  seatsLeft: {
    en: 'Few seats left!',
    hi: 'कुछ सीटें शेष!',
    sa: 'कानिचित् आसनानि शेषाणि!'
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
  if (!isMobile || !visible || hiddenNearPricing) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-maroon via-maroon-dark to-maroon border-t border-saffron/20 p-3 shadow-2xl animate-fade-up">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-saffron animate-pulse" />
            <span className="text-cream text-xs font-body">{t(translations.seatsLeft)}</span>
          </div>
          
          <Button
            size="sm"
            className="bg-saffron hover:bg-saffron/90 text-white font-semibold px-6 py-2 rounded-full shadow-lg flex-1 max-w-[200px] animate-pulse"
            onClick={scrollToPricing}
          >
            {t(translations.secureSeat)}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyMobileFooter;
