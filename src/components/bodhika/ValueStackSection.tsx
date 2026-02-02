import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Video, 
  Users, 
  Calendar, 
  BookOpen, 
  Heart, 
  Download, 
  MessageCircle, 
  Globe,
  Check
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const translations = {
  sectionTitle: {
    en: 'What Your Child Receives In Bodhika (6 Months)',
    hi: 'आपके बच्चे को बोधिका में क्या मिलेगा (6 माह)',
    sa: 'भवतः सन्तानः बोधिकायां किं प्राप्नोति (षण्मासाः)'
  },
  sectionSubtitle: {
    en: 'Complete learning package for character transformation',
    hi: 'चरित्र परिवर्तन के लिए पूर्ण शिक्षण पैकेज',
    sa: 'चरित्रपरिवर्तनाय पूर्णशिक्षणपैकेजः'
  },
  item1: {
    en: '48+ Live Interactive Classes',
    hi: '48+ लाइव इंटरैक्टिव कक्षाएं',
    sa: '४८+ जीवन्तसंवादात्मककक्षाः'
  },
  item2: {
    en: 'Mentor-Led Small Group Learning',
    hi: 'मेंटर-नेतृत्व छोटे समूह शिक्षण',
    sa: 'गुरुनेतृत्वलघुसमूहशिक्षणम्'
  },
  item3: {
    en: 'Daily Habit-Building Activities',
    hi: 'दैनिक आदत-निर्माण गतिविधियां',
    sa: 'दैनिकआदतनिर्माणक्रियाकलापाः'
  },
  item4: {
    en: 'Shloka Meaning Practice',
    hi: 'श्लोक अर्थ अभ्यास',
    sa: 'श्लोकार्थाभ्यासः'
  },
  item5: {
    en: 'Character Development Exercises',
    hi: 'चरित्र विकास व्यायाम',
    sa: 'चरित्रविकासव्यायामाः'
  },
  item6: {
    en: 'Lifetime Recording Access',
    hi: 'आजीवन रिकॉर्डिंग एक्सेस',
    sa: 'आजीवनम् अभिलेखप्रवेशः'
  },
  item7: {
    en: 'Parent Progress Updates',
    hi: 'अभिभावक प्रगति अपडेट',
    sa: 'पितृप्रगतिसूचनाः'
  },
  item8: {
    en: 'Cultural Learning Community',
    hi: 'सांस्कृतिक शिक्षण समुदाय',
    sa: 'सांस्कृतिकशिक्षणसमुदायः'
  }
};

const ValueStackSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  const valueItems = [
    { icon: Video, text: translations.item1, color: 'from-blue-500 to-blue-600' },
    { icon: Users, text: translations.item2, color: 'from-purple-500 to-purple-600' },
    { icon: Calendar, text: translations.item3, color: 'from-emerald-500 to-emerald-600' },
    { icon: BookOpen, text: translations.item4, color: 'from-saffron to-orange-500' },
    { icon: Heart, text: translations.item5, color: 'from-pink-500 to-rose-500' },
    { icon: Download, text: translations.item6, color: 'from-indigo-500 to-indigo-600' },
    { icon: MessageCircle, text: translations.item7, color: 'from-teal-500 to-teal-600' },
    { icon: Globe, text: translations.item8, color: 'from-maroon to-maroon-dark' }
  ];

  return (
    <section className="py-10 sm:py-14 md:py-20 bg-gradient-to-b from-white to-cream/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-saffron/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-6 sm:mb-8 md:mb-10">
            <Badge className="mb-3 sm:mb-4 bg-gradient-to-r from-saffron/10 to-maroon/10 text-maroon border-maroon/20 px-3 sm:px-4 py-1.5">
              Complete Package
            </Badge>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3 leading-tight px-2">
              {t(translations.sectionTitle)}
            </h2>
            <p className="font-body text-muted-foreground text-sm sm:text-base">
              {t(translations.sectionSubtitle)}
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            {valueItems.map((item, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border bg-white hover:shadow-lg transition-all duration-300 h-full group overflow-hidden">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span className="font-body text-foreground font-medium text-xs sm:text-sm leading-tight">
                            {t(item.text)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueStackSection;
