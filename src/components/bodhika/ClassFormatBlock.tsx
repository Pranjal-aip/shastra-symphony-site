import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Calendar, 
  Clock, 
  Timer, 
  Video, 
  Users 
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const translations = {
  title: {
    en: 'Class Format',
    hi: 'कक्षा प्रारूप',
    sa: 'कक्षाप्रारूपम्'
  },
  classes: {
    en: '2 sessions per week',
    hi: 'प्रति सप्ताह 2 सत्र',
    sa: 'प्रतिसप्ताहं २ सत्राणि'
  },
  duration: {
    en: '60 minutes per class',
    hi: 'प्रति कक्षा 60 मिनट',
    sa: 'प्रतिकक्षां ६० निमेषाः'
  },
  practice: {
    en: '10 min daily practice',
    hi: '10 मिनट दैनिक अभ्यास',
    sa: '१० निमेषाः दैनिकाभ्यासः'
  },
  mode: {
    en: 'Live + Recording Access',
    hi: 'लाइव + रिकॉर्डिंग एक्सेस',
    sa: 'प्रत्यक्षम् + अभिलेखप्रवेशः'
  },
  batch: {
    en: 'Limited per mentor',
    hi: 'प्रति मेंटर सीमित',
    sa: 'प्रतिगुरुं सीमितम्'
  }
};

const ClassFormatBlock = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  const formatItems = [
    { icon: Calendar, text: translations.classes, color: 'from-blue-500 to-blue-600' },
    { icon: Clock, text: translations.duration, color: 'from-purple-500 to-purple-600' },
    { icon: Timer, text: translations.practice, color: 'from-emerald-500 to-emerald-600' },
    { icon: Video, text: translations.mode, color: 'from-saffron to-orange-500' },
    { icon: Users, text: translations.batch, color: 'from-maroon to-maroon-dark' }
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      className="mt-6 sm:mt-8"
    >
      <Card className="border-2 border-saffron/20 bg-gradient-to-br from-saffron/5 to-orange-50/50 shadow-lg overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-saffron to-maroon" />
        <CardContent className="p-4 sm:p-5 md:p-6">
          <h3 className="font-heading font-bold text-foreground text-base sm:text-lg mb-4 text-center">
            {t(translations.title)}
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
            {formatItems.map((item, idx) => (
              <div 
                key={idx}
                className="flex flex-col items-center gap-2 p-2.5 sm:p-3 bg-white rounded-xl border border-border/50 shadow-sm"
              >
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-sm`}>
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <span className="font-body text-foreground font-medium text-[10px] sm:text-xs text-center leading-tight">
                  {t(item.text)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ClassFormatBlock;
