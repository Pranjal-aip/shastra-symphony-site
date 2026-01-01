import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  scarcityText: {
    en: '⚠️ Limited Enrollment: Few seats left to ensure personalized guidance.',
    hi: '⚠️ सीमित नामांकन: व्यक्तिगत मार्गदर्शन के लिए कुछ ही सीटें शेष।',
    sa: '⚠️ सीमितनामाङ्कनम्: व्यक्तिगतमार्गदर्शनार्थं कानिचित् आसनानि शेषाणि।'
  },
  seatsRemaining: {
    en: 'Few Seats Left!',
    hi: 'कुछ सीटें शेष!',
    sa: 'कानिचित् आसनानि शेषाणि!'
  }
};

const ScarcityTopBar = () => {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-r from-maroon-dark via-maroon to-maroon-dark text-cream py-2.5 px-4 sticky top-0 z-50"
    >
      <div className="container mx-auto flex items-center justify-center gap-4 text-sm font-body">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="hidden sm:inline"
        >
          {t(translations.scarcityText)}
        </motion.span>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="sm:hidden text-xs"
        >
          ⚠️ Only 70 seats • Personalized guidance
        </motion.span>
        <motion.span 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-1.5 bg-saffron text-white px-3 py-1 rounded-full font-semibold text-xs"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <AlertTriangle className="h-3 w-3" />
          </motion.div>
          {t(translations.seatsRemaining)}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default ScarcityTopBar;
