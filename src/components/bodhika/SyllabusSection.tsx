import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  BookOpen, 
  Heart, 
  Flag, 
  Sparkles, 
  Calendar, 
  ScrollText,
  ChevronRight,
  Sun,
  Moon,
  Leaf,
  Star,
  Check
} from 'lucide-react';

// Animation variants
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

// Translations for the syllabus section
const syllabusTranslations = {
  sectionTitle: {
    en: '📘 Bodhika Course Syllabus',
    hi: '📘 बोधिका पाठ्यक्रम',
    sa: '📘 बोधिका पाठ्यक्रमः'
  },
  sectionIntro: {
    en: 'Bodhika offers a value-based learning journey rooted in Indian wisdom, designed for children with clarity, joy, and practical relevance.',
    hi: 'बोधिका भारतीय ज्ञान में निहित मूल्य-आधारित शिक्षा यात्रा प्रदान करती है, जो बच्चों के लिए स्पष्टता, आनंद और व्यावहारिक प्रासंगिकता के साथ डिज़ाइन की गई है।',
    sa: 'बोधिका भारतीयज्ञाने मूलितां मूल्याधारितशिक्षायात्रां प्रदधाति, या बालकानां कृते स्पष्टतया आनन्देन व्यावहारिकप्रासंगिकतया च निर्मिता।'
  },
  
  // Module 1: Stories
  module1Title: {
    en: 'Stories & Their Learnings',
    hi: 'कहानियाँ और उनकी शिक्षाएँ',
    sa: 'कथाः तासां शिक्षाश्च'
  },
  module1Point1: {
    en: 'Inspiring stories from Indian tradition',
    hi: 'भारतीय परंपरा की प्रेरणादायक कहानियाँ',
    sa: 'भारतीयपरम्परायाः प्रेरणादायककथाः'
  },
  module1Point2: {
    en: 'Moral lessons: truth, courage, kindness, discipline',
    hi: 'नैतिक शिक्षा: सत्य, साहस, दया, अनुशासन',
    sa: 'नैतिकशिक्षा: सत्यं साहसं दया अनुशासनं च'
  },
  module1Point3: {
    en: 'Applying values in daily life',
    hi: 'दैनिक जीवन में मूल्यों का प्रयोग',
    sa: 'दैनिकजीवने मूल्यानाम् प्रयोगः'
  },

  // Module 2: God, Dharma & Karma
  module2Title: {
    en: 'Understanding God, Dharma & Karma',
    hi: 'ईश्वर, धर्म और कर्म की समझ',
    sa: 'ईश्वरधर्मकर्मणां ज्ञानम्'
  },
  module2Point1: {
    en: 'Names of God and their meanings',
    hi: 'भगवान के नाम और उनके अर्थ',
    sa: 'भगवतः नामानि तेषाम् अर्थाश्च'
  },
  module2Point2: {
    en: 'Can we see God? (age-appropriate explanation)',
    hi: 'क्या हम भगवान को देख सकते हैं? (आयु-उपयुक्त व्याख्या)',
    sa: 'किं वयं भगवन्तं द्रष्टुं शक्नुमः? (आयुउपयुक्तव्याख्या)'
  },
  module2Point3: {
    en: 'Dharma: right conduct & duty',
    hi: 'धर्म: सही आचरण और कर्तव्य',
    sa: 'धर्मः: सदाचारः कर्तव्यं च'
  },
  module2Point4: {
    en: 'Karma: actions & consequences',
    hi: 'कर्म: क्रियाएँ और परिणाम',
    sa: 'कर्म: क्रियाः फलानि च'
  },

  // Module 3: Etiquette & Nationalism
  module3Title: {
    en: 'Etiquette & Nationalism',
    hi: 'शिष्टाचार और राष्ट्रवाद',
    sa: 'शिष्टाचारः राष्ट्रभक्तिश्च'
  },
  module3Point1: {
    en: 'Respect for parents, teachers, elders',
    hi: 'माता-पिता, शिक्षक, बड़ों के प्रति सम्मान',
    sa: 'पित्रोः शिक्षकाणां वृद्धानां च आदरः'
  },
  module3Point2: {
    en: 'Good manners, discipline, self-control',
    hi: 'अच्छे व्यवहार, अनुशासन, आत्म-संयम',
    sa: 'सद्व्यवहारः अनुशासनम् आत्मसंयमश्च'
  },
  module3Point3: {
    en: 'Love and responsibility towards nation, culture & heritage',
    hi: 'राष्ट्र, संस्कृति और विरासत के प्रति प्रेम और जिम्मेदारी',
    sa: 'राष्ट्रस्य संस्कृतेः वारसतायाश्च प्रति स्नेहः उत्तरदायित्वं च'
  },

  // Module 4: Āryudeśaratnamālā
  module4Title: {
    en: 'Āryudeśaratnamālā – Values & Life Skills',
    hi: 'आर्युदेशरत्नमाला – मूल्य और जीवन कौशल',
    sa: 'आर्युदेशरत्नमाला – मूल्यानि जीवनकौशलानि च'
  },

  // Module 5: Time & Nature
  module5Title: {
    en: 'Indian Concept of Time & Nature',
    hi: 'समय और प्रकृति की भारतीय अवधारणा',
    sa: 'कालस्य प्रकृतेश्च भारतीयसंकल्पना'
  },
  module5Subtitle: {
    en: '(Conceptual understanding only – no prediction or superstition)',
    hi: '(केवल वैचारिक समझ – कोई भविष्यवाणी या अंधविश्वास नहीं)',
    sa: '(केवलं वैचारिकं ज्ञानम् – न भविष्यवाणी न अन्धविश्वासः)'
  },

  // Module 6: Vedic Literature
  module6Title: {
    en: 'Concept of Time & Vedic Literature',
    hi: 'समय और वैदिक साहित्य की अवधारणा',
    sa: 'कालसंकल्पना वैदिकसाहित्यं च'
  },
  module6Point1: {
    en: 'Four Yugas: Satya, Tretā, Dvāpara, Kali',
    hi: 'चार युग: सत्य, त्रेता, द्वापर, कलि',
    sa: 'चत्वारि युगानि: सत्यं त्रेता द्वापरं कलिश्च'
  },
  module6Point2: {
    en: 'Introduction to Vedic Granthas',
    hi: 'वैदिक ग्रंथों का परिचय',
    sa: 'वैदिकग्रन्थानां परिचयः'
  },
  module6Point3: {
    en: 'Relevance of Vedic wisdom in daily life',
    hi: 'दैनिक जीवन में वैदिक ज्ञान की प्रासंगिकता',
    sa: 'दैनिकजीवने वैदिकज्ञानस्य प्रासंगिकता'
  },

  // Teaching Philosophy
  teachingTitle: {
    en: 'Bodhika Teaching Philosophy',
    hi: 'बोधिका शिक्षण दर्शन',
    sa: 'बोधिका शिक्षणदर्शनम्'
  },
  teachingPoint1: {
    en: 'Child-friendly & story-based',
    hi: 'बाल-अनुकूल और कहानी-आधारित',
    sa: 'बालोपयुक्तं कथाआधारितं च'
  },
  teachingPoint2: {
    en: 'Value-oriented & practical',
    hi: 'मूल्य-उन्मुख और व्यावहारिक',
    sa: 'मूल्योन्मुखं व्यावहारिकं च'
  },
  teachingPoint3: {
    en: 'Free from fear, dogma, and blind belief',
    hi: 'भय, हठधर्मिता और अंधविश्वास से मुक्त',
    sa: 'भयात् हठधर्मितायाः अन्धविश्वासाच्च मुक्तम्'
  }
};

// Āryudeśaratnamālā values data
const aryaValues = [
  { concept: 'Satya', conceptHi: 'सत्य', conceptSa: 'सत्यम्', skill: 'Honesty & confidence', skillHi: 'ईमानदारी और आत्मविश्वास', skillSa: 'सत्यनिष्ठा आत्मविश्वासश्च', meaning: 'Speaking and living in truth builds inner strength and trustworthiness.', example: 'When a child admits a mistake instead of hiding it, they earn respect and feel relieved.' },
  { concept: 'Dharma', conceptHi: 'धर्म', conceptSa: 'धर्मः', skill: 'Ethical decision-making', skillHi: 'नैतिक निर्णय-निर्माण', skillSa: 'नैतिकनिर्णयक्षमता', meaning: 'Doing what is right, even when it is difficult.', example: 'Choosing to help a struggling classmate instead of ignoring them.' },
  { concept: 'Karma', conceptHi: 'कर्म', conceptSa: 'कर्म', skill: 'Accountability', skillHi: 'जवाबदेही', skillSa: 'उत्तरदायित्वम्', meaning: 'Every action has a consequence; we are responsible for what we do.', example: 'If you study regularly, you perform well; if you skip, you struggle.' },
  { concept: 'Arya', conceptHi: 'आर्य', conceptSa: 'आर्यः', skill: 'Leadership & character', skillHi: 'नेतृत्व और चरित्र', skillSa: 'नेतृत्वं चरित्रं च', meaning: 'Being noble in thought, word, and deed.', example: 'Standing up for a friend who is being bullied shows true leadership.' },
  { concept: 'Seva', conceptHi: 'सेवा', conceptSa: 'सेवा', skill: 'Empathy & kindness', skillHi: 'सहानुभूति और दया', skillSa: 'सहानुभूतिः दया च', meaning: 'Selfless service to others brings joy and purpose.', example: 'Helping an elderly neighbor carry groceries without expecting anything in return.' },
  { concept: 'Pramana', conceptHi: 'प्रमाण', conceptSa: 'प्रमाणम्', skill: 'Logical thinking', skillHi: 'तार्किक सोच', skillSa: 'तार्किकचिन्तनम्', meaning: 'Using evidence and reasoning to understand the world.', example: 'Asking "how do we know this?" before believing something new.' },
  { concept: 'Sanskar', conceptHi: 'संस्कार', conceptSa: 'संस्कारः', skill: 'Discipline & habits', skillHi: 'अनुशासन और आदतें', skillSa: 'अनुशासनम् आदताश्च', meaning: 'Good habits formed early shape a successful life.', example: 'Waking up early, greeting elders, and keeping a tidy room daily.' }
];

// Time concepts data
const timeConcepts = [
  { icon: '🗓️', name: '60 Samvatsara', nameHi: '६० संवत्सर', nameSa: '६० संवत्सराः' },
  { icon: '📅', name: '12 Months', nameHi: '१२ मास', nameSa: '१२ मासाः' },
  { icon: '🌸', name: '6 Ṛitu (Seasons)', nameHi: '६ ऋतु', nameSa: '६ ऋतवः' },
  { icon: '♈', name: '12 Rāśi', nameHi: '१२ राशि', nameSa: '१२ राशयः' },
  { icon: '⭐', name: '27 Nakṣatra', nameHi: '२७ नक्षत्र', nameSa: '२७ नक्षत्राणि' },
  { icon: '🌙', name: '15 Tithi', nameHi: '१५ तिथि', nameSa: '१५ तिथयः' },
  { icon: '🌓', name: '2 Pakṣa', nameHi: '२ पक्ष', nameSa: '२ पक्षौ' },
  { icon: '📆', name: '7 Days', nameHi: '७ दिन', nameSa: '७ वासराः' },
  { icon: '☀️', name: '2 Ayan', nameHi: '२ अयन', nameSa: '२ अयने' }
];

// Module icons and colors
const moduleData = [
  { 
    id: 'stories', 
    icon: BookOpen, 
    color: 'from-amber-500 to-orange-500',
    bgColor: 'from-amber-50 to-orange-50'
  },
  { 
    id: 'dharma', 
    icon: Heart, 
    color: 'from-rose-500 to-pink-500',
    bgColor: 'from-rose-50 to-pink-50'
  },
  { 
    id: 'etiquette', 
    icon: Flag, 
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'from-blue-50 to-indigo-50'
  },
  { 
    id: 'arya', 
    icon: Sparkles, 
    color: 'from-purple-500 to-violet-500',
    bgColor: 'from-purple-50 to-violet-50'
  },
  { 
    id: 'time', 
    icon: Calendar, 
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'from-emerald-50 to-teal-50'
  },
  { 
    id: 'vedic', 
    icon: ScrollText, 
    color: 'from-saffron to-maroon',
    bgColor: 'from-saffron/10 to-maroon/10'
  }
];

// Simple Value Row for Āryudeśaratnamālā (no click interaction)
const ValueRow = ({ value, language }: { value: typeof aryaValues[0], language: string }) => {
  const getConcept = () => {
    if (language === 'hi') return value.conceptHi;
    if (language === 'sa') return value.conceptSa;
    return value.concept;
  };
  
  const getSkill = () => {
    if (language === 'hi') return value.skillHi;
    if (language === 'sa') return value.skillSa;
    return value.skill;
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg border border-purple-100">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-white font-heading font-bold text-sm shadow-md shrink-0">
        {getConcept().charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-heading font-semibold text-foreground text-sm">{getConcept()}</span>
        <span className="text-muted-foreground mx-2">→</span>
        <span className="font-body text-sm text-muted-foreground">{getSkill()}</span>
      </div>
    </div>
  );
};

const SyllabusSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  const getTimeName = (item: typeof timeConcepts[0]) => {
    if (language === 'hi') return item.nameHi;
    if (language === 'sa') return item.nameSa;
    return item.name;
  };

  return (
    <section className="py-10 sm:py-14 md:py-20 bg-gradient-to-b from-white to-cream/20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-saffron/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-48 h-48 bg-maroon/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-8 sm:mb-10 md:mb-12">
            <Badge className="mb-3 sm:mb-4 bg-gradient-to-r from-saffron/20 to-maroon/20 text-maroon border-maroon/30 px-4 py-2 text-sm font-semibold">
              Curriculum
            </Badge>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t(syllabusTranslations.sectionTitle)}
            </h2>
            <p className="font-body text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t(syllabusTranslations.sectionIntro)}
            </p>
          </motion.div>

          {/* Module Accordion */}
          <motion.div variants={fadeInUp} className="mb-10 sm:mb-12">
            <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
              
              {/* Module 1: Stories */}
              <AccordionItem value="stories" className="border-2 border-border/50 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="px-4 sm:px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${moduleData[0].color} flex items-center justify-center shadow-lg`}>
                      <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <span className="font-heading font-semibold text-foreground text-sm sm:text-base md:text-lg text-left">
                      {t(syllabusTranslations.module1Title)}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={`px-4 sm:px-6 pb-5 bg-gradient-to-br ${moduleData[0].bgColor}`}>
                  <div className="space-y-2.5 pt-2">
                    {[syllabusTranslations.module1Point1, syllabusTranslations.module1Point2, syllabusTranslations.module1Point3].map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-2.5 sm:p-3 bg-white/80 rounded-lg">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="font-body text-foreground text-xs sm:text-sm">{t(point)}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Module 2: God, Dharma & Karma */}
              <AccordionItem value="dharma" className="border-2 border-border/50 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="px-4 sm:px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${moduleData[1].color} flex items-center justify-center shadow-lg`}>
                      <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <span className="font-heading font-semibold text-foreground text-sm sm:text-base md:text-lg text-left">
                      {t(syllabusTranslations.module2Title)}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={`px-4 sm:px-6 pb-5 bg-gradient-to-br ${moduleData[1].bgColor}`}>
                  <div className="space-y-2.5 pt-2">
                    {[syllabusTranslations.module2Point1, syllabusTranslations.module2Point2, syllabusTranslations.module2Point3, syllabusTranslations.module2Point4].map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-2.5 sm:p-3 bg-white/80 rounded-lg">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="font-body text-foreground text-xs sm:text-sm">{t(point)}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Module 3: Etiquette & Nationalism */}
              <AccordionItem value="etiquette" className="border-2 border-border/50 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="px-4 sm:px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${moduleData[2].color} flex items-center justify-center shadow-lg`}>
                      <Flag className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <span className="font-heading font-semibold text-foreground text-sm sm:text-base md:text-lg text-left">
                      {t(syllabusTranslations.module3Title)}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={`px-4 sm:px-6 pb-5 bg-gradient-to-br ${moduleData[2].bgColor}`}>
                  <div className="space-y-2.5 pt-2">
                    {[syllabusTranslations.module3Point1, syllabusTranslations.module3Point2, syllabusTranslations.module3Point3].map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-2.5 sm:p-3 bg-white/80 rounded-lg">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="font-body text-foreground text-xs sm:text-sm">{t(point)}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Module 4: Āryudeśaratnamālā */}
              <AccordionItem value="arya" className="border-2 border-border/50 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="px-4 sm:px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${moduleData[3].color} flex items-center justify-center shadow-lg`}>
                      <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <span className="font-heading font-semibold text-foreground text-sm sm:text-base md:text-lg text-left">
                      {t(syllabusTranslations.module4Title)}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={`px-4 sm:px-6 pb-5 bg-gradient-to-br ${moduleData[3].bgColor}`}>
                  <div className="pt-2 space-y-2">
                    {aryaValues.map((value, idx) => (
                      <ValueRow key={idx} value={value} language={language} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Module 5: Time & Nature */}
              <AccordionItem value="time" className="border-2 border-border/50 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="px-4 sm:px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${moduleData[4].color} flex items-center justify-center shadow-lg`}>
                      <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <span className="font-heading font-semibold text-foreground text-sm sm:text-base md:text-lg text-left">
                      {t(syllabusTranslations.module5Title)}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={`px-4 sm:px-6 pb-5 bg-gradient-to-br ${moduleData[4].bgColor}`}>
                  <div className="pt-2">
                    <p className="font-body text-xs sm:text-sm text-muted-foreground mb-4 italic">
                      {t(syllabusTranslations.module5Subtitle)}
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                      {timeConcepts.map((item, idx) => (
                        <div 
                          key={idx} 
                          className="flex flex-col items-center p-2.5 sm:p-3 bg-white/80 rounded-xl border border-emerald-100 hover:shadow-md transition-shadow"
                        >
                          <span className="text-xl sm:text-2xl mb-1.5">{item.icon}</span>
                          <span className="font-body text-[10px] sm:text-xs text-center text-foreground font-medium leading-tight">
                            {getTimeName(item)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Module 6: Vedic Literature */}
              <AccordionItem value="vedic" className="border-2 border-border/50 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="px-4 sm:px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${moduleData[5].color} flex items-center justify-center shadow-lg`}>
                      <ScrollText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <span className="font-heading font-semibold text-foreground text-sm sm:text-base md:text-lg text-left">
                      {t(syllabusTranslations.module6Title)}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={`px-4 sm:px-6 pb-5 bg-gradient-to-br ${moduleData[5].bgColor}`}>
                  <div className="space-y-2.5 pt-2">
                    {[syllabusTranslations.module6Point1, syllabusTranslations.module6Point2, syllabusTranslations.module6Point3].map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-2.5 sm:p-3 bg-white/80 rounded-lg">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-saffron to-maroon flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="font-body text-foreground text-xs sm:text-sm">{t(point)}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>

          {/* Teaching Philosophy Highlight Box */}
          <motion.div 
            variants={fadeInUp}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-saffron/30 via-maroon/30 to-saffron/30 rounded-2xl blur-lg" />
            <Card className="relative border-2 border-saffron/30 bg-gradient-to-br from-cream/50 to-white shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-saffron via-maroon to-saffron" />
              <CardContent className="p-5 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-saffron to-maroon flex items-center justify-center shadow-lg">
                    <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                    {t(syllabusTranslations.teachingTitle)}
                  </h3>
                </div>
                <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
                  {[syllabusTranslations.teachingPoint1, syllabusTranslations.teachingPoint2, syllabusTranslations.teachingPoint3].map((point, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-xl border border-saffron/20 shadow-sm"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-body text-foreground text-xs sm:text-sm font-medium">{t(point)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SyllabusSection;
