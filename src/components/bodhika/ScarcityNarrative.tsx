import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Lock, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  title: {
    en: 'Why We Limit Seats',
    hi: 'हम सीटें क्यों सीमित करते हैं',
    sa: 'वयं आसनानि किमर्थं सीमयामः'
  },
  description: {
    en: 'Bodhika is not a mass-enrollment course. We limit each cohort to maintain the sanctity of the transmission and allow for direct, personal interaction with every child.',
    hi: 'बोधिका एक सामूहिक-नामांकन पाठ्यक्रम नहीं है। हम प्रसारण की पवित्रता बनाए रखने और हर बच्चे के साथ प्रत्यक्ष, व्यक्तिगत संपर्क की अनुमति देने के लिए प्रत्येक समूह को सीमित करते हैं।',
    sa: 'बोधिका जननामाङ्कनपाठ्यक्रमः न। वयं प्रसारणस्य पवित्रतां रक्षितुं प्रत्येकबालकेन सह प्रत्यक्षव्यक्तिगतसंवादं च अनुमन्तुं प्रत्येकं समूहं सीमयामः।'
  },
  point1: {
    en: 'Deep, personal guidance for every child',
    hi: 'हर बच्चे के लिए गहरा, व्यक्तिगत मार्गदर्शन',
    sa: 'प्रत्येकबालकाय गहनं व्यक्तिगतं मार्गदर्शनम्'
  },
  point2: {
    en: 'Sacred learning environment maintained',
    hi: 'पवित्र सीखने का वातावरण बनाए रखा',
    sa: 'पवित्राधिगमवातावरणं रक्षितम्'
  },
  point3: {
    en: 'Quality over quantity, always',
    hi: 'हमेशा मात्रा से अधिक गुणवत्ता',
    sa: 'सर्वदा मात्रातः गुणवत्ता'
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }
  }
};

const ScarcityNarrative = () => {
  const { t } = useLanguage();
  
  const points = [
    { icon: Users, text: t(translations.point1) },
    { icon: Lock, text: t(translations.point2) },
    { icon: Heart, text: t(translations.point3) },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <Card className="border-2 border-maroon/20 bg-gradient-to-br from-maroon/5 to-saffron/5 shadow-lg overflow-hidden">
        <CardContent className="p-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center gap-4 mb-6"
          >
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-14 h-14 rounded-2xl bg-maroon flex items-center justify-center shadow-lg"
            >
              <Lock className="h-7 w-7 text-white" />
            </motion.div>
            <div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <Badge className="bg-red-100 text-red-700 border-red-200 mb-1">Exclusive</Badge>
              </motion.div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                {t(translations.title)}
              </h3>
            </div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="font-body text-muted-foreground leading-relaxed mb-6"
          >
            {t(translations.description)}
          </motion.p>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {points.map((point, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
                className="flex items-center gap-3"
              >
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-8 h-8 rounded-full bg-saffron/20 flex items-center justify-center"
                >
                  <point.icon className="h-4 w-4 text-saffron" />
                </motion.div>
                <span className="font-body text-sm text-foreground">{point.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScarcityNarrative;
