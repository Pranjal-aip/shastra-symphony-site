import React from 'react';
import { motion } from 'framer-motion';
import { Users, Flame } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  joinOthers: {
    en: 'Join others who have already secured their spot',
    hi: 'उन लोगों के साथ जुड़ें जिन्होंने पहले ही अपनी सीट सुरक्षित कर ली है',
    sa: 'अन्यैः सह मिलित ये स्वस्थानं सुरक्षितं कृतवन्तः'
  },
  spotsLeft: {
    en: 'Few spots left!',
    hi: 'कुछ स्थान शेष!',
    sa: 'कानिचित् स्थानानि शेषाणि!'
  }
};

interface ScarcityProgressBarProps {
  className?: string;
}

const ScarcityProgressBar = ({ className = '' }: ScarcityProgressBarProps) => {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`bg-cream/50 border border-border rounded-xl p-4 ${className}`}
    >
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex items-center gap-3 mb-3"
      >
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-8 h-8 rounded-full bg-saffron/20 flex items-center justify-center"
        >
          <Users className="h-4 w-4 text-saffron" />
        </motion.div>
        <span className="font-body text-sm text-foreground font-medium">
          {t(translations.joinOthers)}
        </span>
      </motion.div>
      
      {/* Progress Bar */}
      <div className="relative">
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '83%' }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-saffron to-maroon rounded-full relative"
          >
            <motion.div 
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 bg-white/30" 
            />
          </motion.div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-muted-foreground font-body">Filling fast</span>
          <motion.span 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-xs font-semibold text-red-600 font-body flex items-center gap-1"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 0.5, repeatDelay: 2 }}
            >
              <Flame className="h-3 w-3" />
            </motion.div>
            {t(translations.spotsLeft)}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

export default ScarcityProgressBar;
