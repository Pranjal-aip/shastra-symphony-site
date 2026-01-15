import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, Heart, Flag, Sparkles, Calendar, ScrollText, ChevronRight, Sun, Moon, Leaf, Star, Check } from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};
const staggerContainer = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
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
const aryaValues = [{
  concept: 'Satya',
  conceptHi: 'सत्य',
  conceptSa: 'सत्यम्',
  skill: 'Honesty & confidence',
  skillHi: 'ईमानदारी और आत्मविश्वास',
  skillSa: 'सत्यनिष्ठा आत्मविश्वासश्च',
  meaning: 'Speaking and living in truth builds inner strength and trustworthiness.',
  example: 'When a child admits a mistake instead of hiding it, they earn respect and feel relieved.'
}, {
  concept: 'Dharma',
  conceptHi: 'धर्म',
  conceptSa: 'धर्मः',
  skill: 'Ethical decision-making',
  skillHi: 'नैतिक निर्णय-निर्माण',
  skillSa: 'नैतिकनिर्णयक्षमता',
  meaning: 'Doing what is right, even when it is difficult.',
  example: 'Choosing to help a struggling classmate instead of ignoring them.'
}, {
  concept: 'Karma',
  conceptHi: 'कर्म',
  conceptSa: 'कर्म',
  skill: 'Accountability',
  skillHi: 'जवाबदेही',
  skillSa: 'उत्तरदायित्वम्',
  meaning: 'Every action has a consequence; we are responsible for what we do.',
  example: 'If you study regularly, you perform well; if you skip, you struggle.'
}, {
  concept: 'Arya',
  conceptHi: 'आर्य',
  conceptSa: 'आर्यः',
  skill: 'Leadership & character',
  skillHi: 'नेतृत्व और चरित्र',
  skillSa: 'नेतृत्वं चरित्रं च',
  meaning: 'Being noble in thought, word, and deed.',
  example: 'Standing up for a friend who is being bullied shows true leadership.'
}, {
  concept: 'Seva',
  conceptHi: 'सेवा',
  conceptSa: 'सेवा',
  skill: 'Empathy & kindness',
  skillHi: 'सहानुभूति और दया',
  skillSa: 'सहानुभूतिः दया च',
  meaning: 'Selfless service to others brings joy and purpose.',
  example: 'Helping an elderly neighbor carry groceries without expecting anything in return.'
}, {
  concept: 'Pramana',
  conceptHi: 'प्रमाण',
  conceptSa: 'प्रमाणम्',
  skill: 'Logical thinking',
  skillHi: 'तार्किक सोच',
  skillSa: 'तार्किकचिन्तनम्',
  meaning: 'Using evidence and reasoning to understand the world.',
  example: 'Asking "how do we know this?" before believing something new.'
}, {
  concept: 'Sanskar',
  conceptHi: 'संस्कार',
  conceptSa: 'संस्कारः',
  skill: 'Discipline & habits',
  skillHi: 'अनुशासन और आदतें',
  skillSa: 'अनुशासनम् आदताश्च',
  meaning: 'Good habits formed early shape a successful life.',
  example: 'Waking up early, greeting elders, and keeping a tidy room daily.'
}];

// Time concepts data
const timeConcepts = [{
  icon: '🗓️',
  name: '60 Samvatsara',
  nameHi: '६० संवत्सर',
  nameSa: '६० संवत्सराः'
}, {
  icon: '📅',
  name: '12 Months',
  nameHi: '१२ मास',
  nameSa: '१२ मासाः'
}, {
  icon: '🌸',
  name: '6 Ṛitu (Seasons)',
  nameHi: '६ ऋतु',
  nameSa: '६ ऋतवः'
}, {
  icon: '♈',
  name: '12 Rāśi',
  nameHi: '१२ राशि',
  nameSa: '१२ राशयः'
}, {
  icon: '⭐',
  name: '27 Nakṣatra',
  nameHi: '२७ नक्षत्र',
  nameSa: '२७ नक्षत्राणि'
}, {
  icon: '🌙',
  name: '15 Tithi',
  nameHi: '१५ तिथि',
  nameSa: '१५ तिथयः'
}, {
  icon: '🌓',
  name: '2 Pakṣa',
  nameHi: '२ पक्ष',
  nameSa: '२ पक्षौ'
}, {
  icon: '📆',
  name: '7 Days',
  nameHi: '७ दिन',
  nameSa: '७ वासराः'
}, {
  icon: '☀️',
  name: '2 Ayan',
  nameHi: '२ अयन',
  nameSa: '२ अयने'
}];

// Module icons and colors
const moduleData = [{
  id: 'stories',
  icon: BookOpen,
  color: 'from-amber-500 to-orange-500',
  bgColor: 'from-amber-50 to-orange-50'
}, {
  id: 'dharma',
  icon: Heart,
  color: 'from-rose-500 to-pink-500',
  bgColor: 'from-rose-50 to-pink-50'
}, {
  id: 'etiquette',
  icon: Flag,
  color: 'from-blue-500 to-indigo-500',
  bgColor: 'from-blue-50 to-indigo-50'
}, {
  id: 'arya',
  icon: Sparkles,
  color: 'from-purple-500 to-violet-500',
  bgColor: 'from-purple-50 to-violet-50'
}, {
  id: 'time',
  icon: Calendar,
  color: 'from-emerald-500 to-teal-500',
  bgColor: 'from-emerald-50 to-teal-50'
}, {
  id: 'vedic',
  icon: ScrollText,
  color: 'from-saffron to-maroon',
  bgColor: 'from-saffron/10 to-maroon/10'
}];

// Simple Value Row for Āryudeśaratnamālā (no click interaction)
const ValueRow = ({
  value,
  language
}: {
  value: typeof aryaValues[0];
  language: string;
}) => {
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
  return <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg border border-purple-100">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-white font-heading font-bold text-sm shadow-md shrink-0">
        {getConcept().charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-heading font-semibold text-foreground text-sm">{getConcept()}</span>
        <span className="text-muted-foreground mx-2">→</span>
        <span className="font-body text-sm text-muted-foreground">{getSkill()}</span>
      </div>
    </div>;
};
const SyllabusSection = () => {
  const {
    language
  } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;
  const getTimeName = (item: typeof timeConcepts[0]) => {
    if (language === 'hi') return item.nameHi;
    if (language === 'sa') return item.nameSa;
    return item.name;
  };
  return;
};
export default SyllabusSection;