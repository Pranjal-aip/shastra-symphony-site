import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Flame } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  classesStart: {
    en: 'Classes Start 7 March 2026',
    hi: '7 मार्च 2026 से कक्षाएं',
    sa: '७ मार्च २०२६ तः कक्षाः'
  },
  enrollNow: {
    en: 'Enroll Now',
    hi: 'अभी नामांकन करें',
    sa: 'अधुना नामाङ्कयत'
  }
};

const FloatingScarcityBadge = () => {
  const { t } = useLanguage();

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <motion.div
      className="fixed z-40 cursor-pointer"
      initial={{ x: '-100%', y: '30vh' }}
      animate={{ 
        x: ['calc(-100%)', 'calc(100vw + 100%)'],
        y: ['30vh', '25vh', '35vh', '28vh', '32vh']
      }}
      transition={{
        x: {
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        },
        y: {
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }}
      onClick={scrollToPricing}
    >
      <motion.div
        className="relative"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-saffron via-maroon to-saffron rounded-2xl blur-xl opacity-60 scale-110" />
        
        {/* Main badge */}
        <div className="relative bg-gradient-to-r from-maroon-dark via-maroon to-maroon-dark px-8 py-5 rounded-2xl border-2 border-saffron/50 shadow-2xl hover:scale-105 transition-transform">
          <div className="flex items-center gap-4">
            {/* Animated flame icon */}
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [-10, 10, -10]
              }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              className="bg-saffron/20 p-3 rounded-full"
            >
              <Flame className="h-8 w-8 text-saffron" />
            </motion.div>
            
            {/* Text content */}
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center gap-2"
              >
                <Calendar className="h-6 w-6 text-saffron" />
                <span className="text-2xl md:text-3xl font-heading font-bold text-cream">
                  {t(translations.classesStart)}
                </span>
              </motion.div>
              <p className="text-saffron font-body text-sm mt-1">
                {t(translations.enrollNow)} →
              </p>
            </div>
            
            {/* Animated flame icon */}
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [10, -10, 10]
              }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity, 
                ease: 'easeInOut',
                delay: 0.4
              }}
              className="bg-saffron/20 p-3 rounded-full"
            >
              <Flame className="h-8 w-8 text-saffron" />
            </motion.div>
          </div>
          
          {/* Sparkle effects */}
          <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 bg-saffron rounded-full"
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="absolute -bottom-1 -left-1 w-3 h-3 bg-cream rounded-full"
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute top-1/2 -right-3 w-2 h-2 bg-saffron rounded-full"
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FloatingScarcityBadge;
