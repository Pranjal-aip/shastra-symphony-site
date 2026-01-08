import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Flame, Sparkles, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  joinOthers: {
    en: '🔥 Parents Already Enrolled Their Kids!',
    hi: '🔥 माता-पिता ने अपने बच्चों का नामांकन कर लिया!',
    sa: '🔥 पितरः स्वसन्तानान् नामाङ्कितवन्तः!'
  },
  urgency: {
    en: "Don't let your child miss this transformation",
    hi: 'अपने बच्चे को यह परिवर्तन मिस न होने दें',
    sa: 'स्वसन्तानं एतत् परिवर्तनं मा त्यजतु'
  },
  spotsLeft: {
    en: 'Seats filling fast!',
    hi: 'सीटें तेज़ी से भर रही हैं!',
    sa: 'आसनानि शीघ्रं पूर्यन्ते!'
  },
  fillingFast: {
    en: 'Filling fast',
    hi: 'तेजी से भर रहा है',
    sa: 'शीघ्रं पूर्यमाणम्'
  }
};

interface ScarcityProgressBarProps {
  className?: string;
  floating?: boolean;
}

const ScarcityProgressBar = ({ className = '', floating = false }: ScarcityProgressBarProps) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  
  useEffect(() => {
    if (!floating) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show after scrolling 400px
      setIsVisible(scrollY > 400 && !isDismissed);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [floating, isDismissed]);

  const handleEnrollClick = () => {
    document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  
  // Floating version
  if (floating) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-3 md:p-4"
          >
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-gradient-to-r from-maroon-dark via-maroon to-maroon-dark rounded-2xl p-4 md:p-5 shadow-2xl border border-saffron/30 backdrop-blur-sm">
                {/* Close button */}
                <button 
                  onClick={() => setIsDismissed(true)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-background rounded-full flex items-center justify-center shadow-md hover:bg-muted transition-colors"
                >
                  <X className="h-3 w-3 text-muted-foreground" />
                </button>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-saffron/20 via-transparent to-saffron/20 rounded-2xl blur-xl -z-10" />
                
                <div className="flex flex-col md:flex-row items-center gap-4">
                  {/* Left side - Text */}
                  <div className="flex-1 text-center md:text-left">
                    <motion.div 
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="flex items-center justify-center md:justify-start gap-2 mb-1"
                    >
                      <Sparkles className="h-5 w-5 text-saffron" />
                      <span className="text-lg md:text-xl font-heading font-bold text-cream">
                        {t(translations.joinOthers)}
                      </span>
                    </motion.div>
                    <p className="text-cream/80 text-sm font-body">
                      {t(translations.urgency)}
                    </p>
                  </div>
                  
                  {/* Progress Bar - Middle */}
                  <div className="w-full md:w-48 flex-shrink-0">
                    <div className="h-3 bg-cream/20 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '93%' }}
                        transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-saffron via-orange-400 to-saffron rounded-full relative"
                      >
                        <motion.div 
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent" 
                        />
                      </motion.div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-cream/60 font-body">{t(translations.fillingFast)}</span>
                      <motion.span 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="text-xs font-bold text-saffron font-body flex items-center gap-1"
                      >
                        <Flame className="h-3 w-3" />
                        {t(translations.spotsLeft)}
                      </motion.span>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEnrollClick}
                    className="bg-gradient-to-r from-saffron to-orange-500 text-maroon-dark font-heading font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-saffron/50 transition-shadow whitespace-nowrap"
                  >
                    Enroll Now →
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
  
  // Inline version (original)
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-r from-maroon/10 via-saffron/10 to-maroon/10 border-2 border-saffron/30 rounded-xl p-5 ${className}`}
    >
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex items-center gap-3 mb-3"
      >
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron to-orange-500 flex items-center justify-center shadow-lg"
        >
          <Users className="h-5 w-5 text-white" />
        </motion.div>
        <div>
          <span className="font-heading text-base md:text-lg text-foreground font-bold block">
            {t(translations.joinOthers)}
          </span>
          <span className="font-body text-sm text-muted-foreground">
            {t(translations.urgency)}
          </span>
        </div>
      </motion.div>
      
      {/* Progress Bar */}
      <div className="relative">
        <div className="h-4 bg-muted rounded-full overflow-hidden shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '93%' }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-saffron via-orange-400 to-maroon rounded-full relative"
          >
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent" 
            />
          </motion.div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-muted-foreground font-body">{t(translations.fillingFast)}</span>
          <motion.span 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-sm font-bold text-red-600 font-body flex items-center gap-1"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 0.5, repeatDelay: 1 }}
            >
              <Flame className="h-4 w-4" />
            </motion.div>
            {t(translations.spotsLeft)}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

export default ScarcityProgressBar;
