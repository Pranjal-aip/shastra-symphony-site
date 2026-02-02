import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const translations = {
  sectionTitle: {
    en: 'How The 6-Month Bodhika Journey Works',
    hi: '6 माह की बोधिका यात्रा कैसे काम करती है',
    sa: 'षण्मासीया बोधिकायात्रा कथं कार्यं करोति'
  },
  sectionSubtitle: {
    en: 'A structured path to lasting transformation',
    hi: 'स्थायी परिवर्तन का एक संरचित मार्ग',
    sa: 'स्थायिपरिवर्तनस्य संरचितमार्गः'
  },
  month1Title: {
    en: 'Month 1',
    hi: 'माह 1',
    sa: 'मासः १'
  },
  month1Desc: {
    en: 'Discipline & Routine Building',
    hi: 'अनुशासन और दिनचर्या निर्माण',
    sa: 'अनुशासनं दिनचर्यानिर्माणं च'
  },
  month2Title: {
    en: 'Month 2',
    hi: 'माह 2',
    sa: 'मासः २'
  },
  month2Desc: {
    en: 'Respect, Manners & Sanskar',
    hi: 'सम्मान, शिष्टाचार और संस्कार',
    sa: 'आदरः शिष्टाचारः संस्कारश्च'
  },
  month3Title: {
    en: 'Month 3',
    hi: 'माह 3',
    sa: 'मासः ३'
  },
  month3Desc: {
    en: 'Emotional Control & Calmness',
    hi: 'भावनात्मक नियंत्रण और शांति',
    sa: 'भावनात्मकनियन्त्रणं शान्तिश्च'
  },
  month4Title: {
    en: 'Month 4',
    hi: 'माह 4',
    sa: 'मासः ४'
  },
  month4Desc: {
    en: 'Dharma & Decision Making',
    hi: 'धर्म और निर्णय लेना',
    sa: 'धर्मः निर्णयग्रहणं च'
  },
  month5Title: {
    en: 'Month 5',
    hi: 'माह 5',
    sa: 'मासः ५'
  },
  month5Desc: {
    en: 'Cultural Identity & Stories',
    hi: 'सांस्कृतिक पहचान और कहानियां',
    sa: 'सांस्कृतिकपरिचयः कथाश्च'
  },
  month6Title: {
    en: 'Month 6',
    hi: 'माह 6',
    sa: 'मासः ६'
  },
  month6Desc: {
    en: 'Practice, Habit Formation & Application',
    hi: 'अभ्यास, आदत निर्माण और अनुप्रयोग',
    sa: 'अभ्यासः आदतनिर्माणम् अनुप्रयोगश्च'
  }
};

const ProgramStructureSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  const months = [
    { 
      title: translations.month1Title, 
      desc: translations.month1Desc, 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100/50'
    },
    { 
      title: translations.month2Title, 
      desc: translations.month2Desc, 
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100/50'
    },
    { 
      title: translations.month3Title, 
      desc: translations.month3Desc, 
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'from-emerald-50 to-emerald-100/50'
    },
    { 
      title: translations.month4Title, 
      desc: translations.month4Desc, 
      color: 'from-saffron to-orange-500',
      bgColor: 'from-orange-50 to-orange-100/50'
    },
    { 
      title: translations.month5Title, 
      desc: translations.month5Desc, 
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-50 to-pink-100/50'
    },
    { 
      title: translations.month6Title, 
      desc: translations.month6Desc, 
      color: 'from-maroon to-maroon-dark',
      bgColor: 'from-red-50 to-red-100/50'
    }
  ];

  return (
    <section className="py-10 sm:py-14 md:py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-6 sm:mb-8 md:mb-10">
            <Badge className="mb-3 sm:mb-4 bg-saffron/10 text-saffron border-saffron/30 px-3 sm:px-4 py-1.5">
              6-Month Journey
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
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
          >
            {months.map((month, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className={`border-0 bg-gradient-to-br ${month.bgColor} shadow-md hover:shadow-lg transition-all duration-300 h-full overflow-hidden`}>
                  <div className={`h-1.5 bg-gradient-to-r ${month.color}`} />
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${month.color} flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md`}>
                      <span className="text-white font-bold text-sm sm:text-base">{idx + 1}</span>
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-xs sm:text-sm mb-1">
                      {t(month.title)}
                    </h3>
                    <p className="font-body text-muted-foreground text-[10px] sm:text-xs leading-snug">
                      {t(month.desc)}
                    </p>
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

export default ProgramStructureSection;
