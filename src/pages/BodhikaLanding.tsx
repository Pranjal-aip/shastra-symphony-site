import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  CheckCircle2, 
  MessageCircle, 
  Users, 
  Clock, 
  Award, 
  Heart, 
  Star, 
  Shield, 
  Brain, 
  Smile, 
  Book, 
  Calendar,
  Quote,
  Video,
  Download,
  Sparkles,
  GraduationCap,
  ArrowRight,
  X,
  Check,
  Phone,
  Leaf,
  Music,
  Play,
  ChevronRight,
  ArrowDown,
  Target,
  Flame
} from 'lucide-react';

// Import images
import heroGurukul from '@/assets/bodhika/hero-gurukul.jpg';
import onlineLearning from '@/assets/bodhika/online-learning.jpg';
import CountdownTimer from '@/components/bodhika/CountdownTimer';
import founderImage from '@/assets/bodhika/founder-yogesh.jpg';
import SyllabusSection from '@/components/bodhika/SyllabusSection';
import ProgramStructureSection from '@/components/bodhika/ProgramStructureSection';
import ValueStackSection from '@/components/bodhika/ValueStackSection';
import ClassFormatBlock from '@/components/bodhika/ClassFormatBlock';
import ObjectionCrusherFAQ from '@/components/bodhika/ObjectionCrusherFAQ';

// WhatsApp number for counselor
const WHATSAPP_NUMBER = '918679441338';
const WHATSAPP_COUNSELOR_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20want%20to%20know%20more%20about%20the%20Bodhika%20Sanatan%20Dharma%20program%20for%20my%20child.`;

// Animation variants - Enhanced for smoother mobile experience
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

// Translations - Updated with new content
const translations = {
  // Meta
  metaTitle: {
    en: 'Bodhika - 6-Month Character Development Program for Children | Shastrakulam',
    hi: 'बोधिका - बच्चों के लिए 6 माह चरित्र विकास कार्यक्रम | शास्त्रकुलम्',
    sa: 'बोधिका - बालकानां कृते षण्मासीयं चरित्रविकासकार्यक्रमम् | शास्त्रकुलम्'
  },
  metaDescription: {
    en: 'Build discipline, emotional balance, respect, and moral values in children aged 6-12 through Sanatan life principles. March 2026 batch - Limited seats.',
    hi: '6-12 वर्ष के बच्चों में अनुशासन, भावनात्मक संतुलन, सम्मान और नैतिक मूल्यों का निर्माण करें। मार्च 2026 बैच - सीमित सीटें।',
    sa: '६-१२ वर्षीयेषु बालकेषु अनुशासनं भावनात्मकसन्तुलनं आदरं नैतिकमूल्यानि च निर्मातुं।'
  },

  // Hero Section - NEW CONTENT
  heroHeadline: {
    en: 'Raise a Calm, Disciplined & Value-Rooted Child (Ages 6–12)',
    hi: 'एक शांत, अनुशासित और मूल्य-निहित बच्चा पालें (आयु 6–12)',
    sa: 'शान्तं अनुशासितं मूल्यमूलितं च बालकं पालयत (वयः ६–१२)'
  },
  heroSubheadline: {
    en: 'Bodhika is a 6-month live character development program that builds discipline, emotional balance, respect, and moral values in children using Sanatan life principles — in a child-friendly modern format.',
    hi: 'बोधिका 6 माह का लाइव चरित्र विकास कार्यक्रम है जो बच्चों में अनुशासन, भावनात्मक संतुलन, सम्मान और नैतिक मूल्यों का निर्माण करता है — सनातन जीवन सिद्धांतों का उपयोग करते हुए — बाल-अनुकूल आधुनिक प्रारूप में।',
    sa: 'बोधिका षण्मासीयं जीवन्तचरित्रविकासकार्यक्रमम् अस्ति यत् बालकेषु अनुशासनं भावनात्मकसन्तुलनं आदरं नैतिकमूल्यानि च निर्माति — सनातनजीवनसिद्धान्तैः — बालोपयुक्तआधुनिकप्रारूपेण।'
  },
  // NEW 3 Benefit Bullets
  heroOutcome1: {
    en: 'Improves focus, discipline & daily behavior',
    hi: 'ध्यान, अनुशासन और दैनिक व्यवहार में सुधार',
    sa: 'ध्यानम् अनुशासनं दैनिकव्यवहारं च सुधारयति'
  },
  heroOutcome2: {
    en: 'Builds emotional control & respectful habits',
    hi: 'भावनात्मक नियंत्रण और सम्मानजनक आदतें बनाता है',
    sa: 'भावनात्मकनियन्त्रणम् आदरपूर्णाभ्यासांश्च निर्माति'
  },
  heroOutcome3: {
    en: 'Develops strong cultural identity & values',
    hi: 'मजबूत सांस्कृतिक पहचान और मूल्यों का विकास',
    sa: 'दृढसांस्कृतिकपरिचयं मूल्यानि च विकासयति'
  },
  heroUrgency: {
    en: '28 March 2026 Batch | Limited Seats',
    hi: '28 मार्च 2026 बैच | सीमित सीटें',
    sa: '२८ मार्च २०२६ वर्गः | सीमितासनानि'
  },
  heroUrgencySubtext: {
    en: 'Small groups • Personal guidance • Admissions close when seats fill',
    hi: 'छोटे समूह • व्यक्तिगत मार्गदर्शन • सीटें भरने पर प्रवेश बंद',
    sa: 'लघुसमूहाः • व्यक्तिगतमार्गदर्शनम् • आसनपूर्णे प्रवेशः बन्धः'
  },
  // NEW CTA Buttons
  heroPrimaryCTA: {
    en: 'Book Free Parent Orientation',
    hi: 'निःशुल्क अभिभावक ओरिएंटेशन बुक करें',
    sa: 'निःशुल्कपितृपरिचयं आरक्षयत'
  },
  heroSecondaryCTA: {
    en: 'Talk to Counselor on WhatsApp',
    hi: 'WhatsApp पर परामर्शदाता से बात करें',
    sa: 'WhatsApp-द्वारा परामर्शकेन सह वदत'
  },
  heroCTAShort: {
    en: 'Talk to Counselor',
    hi: 'परामर्शदाता से बात करें',
    sa: 'परामर्शकेन सह वदत'
  },
  heroCTASubtext: {
    en: 'Free guidance • No obligation • Limited seats',
    hi: 'निःशुल्क मार्गदर्शन • कोई बाध्यता नहीं • सीमित सीटें',
    sa: 'निःशुल्कमार्गदर्शनम् • न बाध्यता • सीमितासनानि'
  },
  reserveSeat: {
    en: 'Enroll Now',
    hi: 'अभी नामांकन करें',
    sa: 'अधुना नामाङ्कयत'
  },
  bookFreeOrientation: {
    en: 'Book Free Orientation',
    hi: 'निःशुल्क ओरिएंटेशन बुक करें',
    sa: 'निःशुल्कपरिचयं आरक्षयत'
  },
  enrollNow: {
    en: 'Enroll Now',
    hi: 'अभी नामांकन करें',
    sa: 'अधुना नामाङ्कयत'
  },

  // Trust Strip
  trustLive: {
    en: '100% Live Classes',
    hi: '100% लाइव कक्षाएं',
    sa: '१००% जीवन्तकक्षाः'
  },
  trustRecordings: {
    en: 'Recordings for Revision',
    hi: 'पुनरावृत्ति के लिए रिकॉर्डिंग',
    sa: 'पुनरावृत्त्यर्थम् अभिलेखाः'
  },
  trustSafe: {
    en: 'Child-Safe Environment',
    hi: 'बाल-सुरक्षित वातावरण',
    sa: 'बालसुरक्षितवातावरणम्'
  },
  trustAuthentic: {
    en: 'Authentic Sanatan Foundation',
    hi: 'प्रामाणिक सनातन आधार',
    sa: 'प्रामाणिकसनातनाधारः'
  },

  // Parent Pain Section
  painHeadline: {
    en: 'Modern Education Builds Skills — But Leaves Children Rootless',
    hi: 'आधुनिक शिक्षा कौशल बनाती है — लेकिन बच्चों को जड़हीन छोड़ देती है',
    sa: 'आधुनिकशिक्षा कौशलानि निर्माति — किन्तु बालकान् मूलविहीनान् त्यजति'
  },
  painIntro: {
    en: "Today's children:",
    hi: 'आज के बच्चे:',
    sa: 'अद्यतनबालकाः:'
  },
  painPoint1: {
    en: 'Are constantly distracted and overstimulated',
    hi: 'निरंतर विचलित और अति-उत्तेजित रहते हैं',
    sa: 'निरन्तरं विचलिताः अतिउत्तेजिताश्च सन्ति'
  },
  painPoint2: {
    en: 'Know everything online, yet lack discipline and grounding',
    hi: 'ऑनलाइन सब जानते हैं, फिर भी अनुशासन और आधार की कमी है',
    sa: 'अन्तर्जाले सर्वं जानन्ति, तथापि अनुशासनम् आधारश्च न्यूनः'
  },
  painPoint3: {
    en: 'Have no daily spiritual anchor',
    hi: 'कोई दैनिक आध्यात्मिक आधार नहीं है',
    sa: 'न दैनिकाध्यात्मिकाधारः अस्ति'
  },
  painPoint4: {
    en: 'Ask big questions — but receive no clear Dharmic guidance',
    hi: 'बड़े सवाल पूछते हैं — लेकिन स्पष्ट धार्मिक मार्गदर्शन नहीं मिलता',
    sa: 'महान्तः प्रश्नान् पृच्छन्ति — किन्तु स्पष्टधार्मिकमार्गदर्शनं न लभन्ते'
  },
  painTransition: {
    en: 'Sanatan Dharma was designed to shape life itself — but our children are growing up disconnected from it.',
    hi: 'सनातन धर्म जीवन को आकार देने के लिए बनाया गया था — लेकिन हमारे बच्चे इससे कटकर बड़े हो रहे हैं।',
    sa: 'सनातनधर्मः जीवनमेव रूपयितुं निर्मितः — किन्तु अस्माकं बालकाः ततः विच्छिन्नाः वर्धन्ते।'
  },
  painSolution: {
    en: '👉 Bodhika restores these roots early, gently, and correctly.',
    hi: '👉 बोधिका इन जड़ों को जल्दी, धीरे-धीरे और सही तरीके से पुनर्स्थापित करती है।',
    sa: '👉 बोधिका एतानि मूलानि शीघ्रं मृदुतया सम्यक् च पुनः स्थापयति।'
  },

  // What is Bodhika Section
  whatIsHeadline: {
    en: 'What Exactly Is Bodhika? (And What It Is Not)',
    hi: 'बोधिका वास्तव में क्या है? (और यह क्या नहीं है)',
    sa: 'बोधिका वस्तुतः किम् अस्ति? (किं च नास्ति)'
  },
  whatIsNot1: {
    en: 'Bodhika is not a ritual class.',
    hi: 'बोधिका कर्मकांड की कक्षा नहीं है।',
    sa: 'बोधिका कर्मकाण्डकक्षा नास्ति।'
  },
  whatIsNot2: {
    en: 'It is not religious pressure.',
    hi: 'यह धार्मिक दबाव नहीं है।',
    sa: 'एतत् धार्मिकदबावः नास्ति।'
  },
  whatIsNot3: {
    en: 'It is not rote memorisation.',
    hi: 'यह रटंत विद्या नहीं है।',
    sa: 'एतत् कण्ठस्थीकरणं नास्ति।'
  },
  whatIsBody: {
    en: 'Bodhika is a guided Sanatan Dharma foundation where children learn:',
    hi: 'बोधिका एक मार्गदर्शित सनातन धर्म आधार है जहां बच्चे सीखते हैं:',
    sa: 'बोधिका मार्गदर्शितसनातनधर्माधारः अस्ति यत्र बालकाः शिक्षन्ते:'
  },
  whatIsPoint1: {
    en: 'Why we chant shlokas',
    hi: 'हम श्लोक क्यों पढ़ते हैं',
    sa: 'वयं श्लोकान् किमर्थं पठामः'
  },
  whatIsPoint2: {
    en: 'What mantras mean and how they apply to life',
    hi: 'मंत्रों का अर्थ क्या है और जीवन में कैसे लागू होते हैं',
    sa: 'मन्त्राणाम् अर्थः किं जीवने च कथं प्रयुज्यन्ते'
  },
  whatIsPoint3: {
    en: 'How Dharma guides daily decisions',
    hi: 'धर्म दैनिक निर्णयों का मार्गदर्शन कैसे करता है',
    sa: 'धर्मः दैनिकनिर्णयान् कथं मार्गयति'
  },
  whatIsPoint4: {
    en: 'How inner calm and discipline are built',
    hi: 'आंतरिक शांति और अनुशासन कैसे बनता है',
    sa: 'आन्तरिकशान्तिः अनुशासनं च कथं निर्मीयते'
  },
  whatIsClosing: {
    en: 'Through stories, reflection, discussion, and daily practice.',
    hi: 'कहानियों, चिंतन, चर्चा और दैनिक अभ्यास के माध्यम से।',
    sa: 'कथाभिः चिन्तनेन चर्चया दैनिकाभ्यासेन च।'
  },
  quickFact1: {
    en: '6-Month Live Program',
    hi: '6 महीने का लाइव कार्यक्रम',
    sa: '६-मासजीवन्तकार्यक्रमः'
  },
  quickFact2: {
    en: 'Live + Recorded Sessions',
    hi: 'लाइव + रिकॉर्डेड सत्र',
    sa: 'जीवन्तम् + अभिलिखितसत्राणि'
  },
  quickFact3: {
    en: 'Ages 6–12',
    hi: '6-12 वर्ष की आयु',
    sa: '६-१२ वर्षाणि'
  },
  quickFact4: {
    en: 'Mentor-led Small Groups',
    hi: 'मेंटर-नेतृत्व छोटे समूह',
    sa: 'गुरुनेतृत्वलघुसमूहाः'
  },

  // Transformation Section
  transformHeadline: {
    en: 'The Sanatan Transformation Parents Notice',
    hi: 'सनातन परिवर्तन जो माता-पिता देखते हैं',
    sa: 'सनातनपरिवर्तनं यत् पितरः पश्यन्ति'
  },
  beforeTitle: {
    en: 'BEFORE',
    hi: 'पहले',
    sa: 'पूर्वम्'
  },
  afterTitle: {
    en: 'AFTER',
    hi: 'बाद में',
    sa: 'अनन्तरम्'
  },
  before1: {
    en: 'Restless mind',
    hi: 'बेचैन मन',
    sa: 'अशान्तमनः'
  },
  after1: {
    en: 'Calm, grounded behaviour',
    hi: 'शांत, स्थिर व्यवहार',
    sa: 'शान्तः स्थिरव्यवहारः'
  },
  before2: {
    en: 'No daily discipline',
    hi: 'कोई दैनिक अनुशासन नहीं',
    sa: 'न दैनिकानुशासनम्'
  },
  after2: {
    en: 'Daily mantra & shloka practice',
    hi: 'दैनिक मंत्र और श्लोक अभ्यास',
    sa: 'दैनिकमन्त्रश्लोकाभ्यासः'
  },
  before3: {
    en: 'Weak respect for elders',
    hi: 'बड़ों के प्रति कमजोर सम्मान',
    sa: 'वृद्धेषु दुर्बलादरः'
  },
  after3: {
    en: 'Respectful actions rooted in Sanskar',
    hi: 'संस्कार में निहित सम्मानजनक कार्य',
    sa: 'संस्कारमूलितआदरपूर्णक्रियाः'
  },
  before4: {
    en: 'Disconnection from culture',
    hi: 'संस्कृति से कटाव',
    sa: 'संस्कृतेः विच्छेदः'
  },
  after4: {
    en: 'Clear understanding of Dharma',
    hi: 'धर्म की स्पष्ट समझ',
    sa: 'धर्मस्य स्पष्टज्ञानम्'
  },

  // Learning Section
  learnHeadline: {
    en: 'Sanatan Foundations Your Child Will Build',
    hi: 'सनातन आधार जो आपका बच्चा बनाएगा',
    sa: 'सनातनाधाराणि यानि भवतः सन्तानः निर्मास्यति'
  },
  learn1Title: {
    en: 'Sanskar & Character Building',
    hi: 'संस्कार और चरित्र निर्माण',
    sa: 'संस्कारः चरित्रनिर्माणं च'
  },
  learn2Title: {
    en: 'Shlokas & Mantras',
    hi: 'श्लोक और मंत्र',
    sa: 'श्लोकाः मन्त्राश्च'
  },
  learn2Subtitle: {
    en: 'Correct pronunciation, meaning & daily-life application',
    hi: 'सही उच्चारण, अर्थ और दैनिक जीवन में प्रयोग',
    sa: 'शुद्धोच्चारणम् अर्थः दैनिकजीवनप्रयोगश्च'
  },
  learn3Title: {
    en: 'Stories from Ramayana, Mahabharata & Bhagavad Gita',
    hi: 'रामायण, महाभारत और भगवद्गीता की कहानियां',
    sa: 'रामायणमहाभारतभगवद्गीताकथाः'
  },
  learn4Title: {
    en: 'Yoga, Pranayama & Mindfulness',
    hi: 'योग, प्राणायाम और माइंडफुलनेस',
    sa: 'योगः प्राणायामः मानसिकस्थिरता च'
  },
  learn5Title: {
    en: 'Respect for Parents, Elders & Gurus',
    hi: 'माता-पिता, बड़ों और गुरुओं के प्रति सम्मान',
    sa: 'पितृवृद्धगुरुआदरः'
  },
  learn6Title: {
    en: 'Indian Culture, Festivals & Dharmic Living',
    hi: 'भारतीय संस्कृति, त्योहार और धार्मिक जीवन',
    sa: 'भारतीयसंस्कृतिः उत्सवाः धार्मिकजीवनं च'
  },
  learnNote: {
    en: '👉 Detailed curriculum shared during counseling.',
    hi: '👉 विस्तृत पाठ्यक्रम परामर्श के दौरान साझा किया जाएगा।',
    sa: '👉 विस्तृतपाठ्यक्रमः परामर्शकाले साझीक्रियते।'
  },

  // Learning Experience Section
  expHeadline: {
    en: 'How Bodhika Is Taught (Pressure-Free)',
    hi: 'बोधिका कैसे पढ़ाई जाती है (दबाव-मुक्त)',
    sa: 'बोधिका कथं शिक्ष्यते (दबावमुक्तम्)'
  },
  exp1: {
    en: 'Live mentor-led sessions',
    hi: 'लाइव मेंटर-नेतृत्व सत्र',
    sa: 'जीवन्तगुरुनेतृत्वसत्राणि'
  },
  exp2: {
    en: 'Story-based learning (child-friendly)',
    hi: 'कहानी-आधारित शिक्षा (बाल-अनुकूल)',
    sa: 'कथाआधारितशिक्षणम् (बालोपयुक्तम्)'
  },
  exp3: {
    en: 'Reflection & discussion',
    hi: 'चिंतन और चर्चा',
    sa: 'चिन्तनं चर्चा च'
  },
  exp4: {
    en: 'Recordings for revision',
    hi: 'पुनरावृत्ति के लिए रिकॉर्डिंग',
    sa: 'पुनरावृत्त्यर्थम् अभिलेखाः'
  },
  exp5: {
    en: 'No exams • No competition • No force',
    hi: 'कोई परीक्षा नहीं • कोई प्रतिस्पर्धा नहीं • कोई दबाव नहीं',
    sa: 'न परीक्षा • न प्रतिस्पर्धा • न बलात्कारः'
  },

  // Pricing Section - UPDATED
  pricingHeadline: {
    en: 'Choose The Right Learning Experience For Your Child',
    hi: 'अपने बच्चे के लिए सही शिक्षण अनुभव चुनें',
    sa: 'स्वसन्ताने समुचितशिक्षणानुभवं चिनुत'
  },
  pricingSubline: {
    en: 'Same curriculum — Different attention levels',
    hi: 'समान पाठ्यक्रम — विभिन्न ध्यान स्तर',
    sa: 'समानपाठ्यक्रमः — विभिन्नावधानस्तराः'
  },
  focusedBatch: {
    en: '⭐ FOCUSED BATCH',
    hi: '⭐ फोकस्ड बैच',
    sa: '⭐ केन्द्रितवर्गः'
  },
  focusedRecommended: {
    en: 'MOST RECOMMENDED FOR SERIOUS PARENTS',
    hi: 'गंभीर माता-पिता के लिए सर्वाधिक अनुशंसित',
    sa: 'गम्भीरपितृभ्यः सर्वाधिकानुशंसितः'
  },
  focusedStudents: {
    en: '20 children only',
    hi: 'केवल 20 बच्चे',
    sa: 'केवलं २० बालकाः'
  },
  focusedFeature1: {
    en: 'Individual progress tracking',
    hi: 'व्यक्तिगत प्रगति ट्रैकिंग',
    sa: 'व्यक्तिगतप्रगतिअनुसरणम्'
  },
  focusedFeature2: {
    en: 'Higher mentor interaction',
    hi: 'अधिक मेंटर संवाद',
    sa: 'अधिकगुरुसंवादः'
  },
  focusedFeature3: {
    en: 'Limited seats',
    hi: 'सीमित सीटें',
    sa: 'सीमितासनानि'
  },
  focusedPrice: {
    en: '₹7,000',
    hi: '₹7,000',
    sa: '₹७,०००'
  },
  groupBatch: {
    en: 'GROUP BATCH',
    hi: 'ग्रुप बैच',
    sa: 'समूहवर्गः'
  },
  groupStudents: {
    en: '60+ students per batch',
    hi: '60+ छात्र प्रति बैच',
    sa: '६०+ छात्राः प्रतिवर्गम्'
  },
  groupFeature1: {
    en: 'Larger peer group',
    hi: 'बड़ा सहपाठी समूह',
    sa: 'विशालसहपाठिसमूहः'
  },
  groupFeature2: {
    en: 'Community learning',
    hi: 'सामुदायिक शिक्षा',
    sa: 'सामुदायिकशिक्षणम्'
  },
  groupPrice: {
    en: '₹3,000',
    hi: '₹3,000',
    sa: '₹३,०००'
  },
  perYear: {
    en: '/ 6 months',
    hi: '/ 6 माह',
    sa: '/ षण्मासम्'
  },
  talkToCounselor: {
    en: 'Talk to Counselor',
    hi: 'परामर्शदाता से बात करें',
    sa: 'परामर्शकेन सह वदत'
  },
  scholarshipNote: {
    en: '🎓 Scholarships available for genuinely needy families.',
    hi: '🎓 वास्तव में जरूरतमंद परिवारों के लिए छात्रवृत्ति उपलब्ध।',
    sa: '🎓 वस्तुतः आवश्यककुटुम्बेभ्यः छात्रवृत्तिः उपलभ्यते।'
  },

  // Testimonials Section
  testimonialsHeadline: {
    en: 'What Parents Are Saying',
    hi: 'माता-पिता क्या कह रहे हैं',
    sa: 'पितरः किं वदन्ति'
  },

  // Founder Section
  founderHeadline: {
    en: 'Why Bodhika Exists',
    hi: 'बोधिका क्यों अस्तित्व में है',
    sa: 'बोधिका किमर्थम् अस्तित्वे अस्ति'
  },
  founderMessage: {
    en: '"Sanatan Dharma is not about rituals or fear. It is about clarity, balance, and living rightly. Bodhika gives children this foundation before confusion takes over."',
    hi: '"सनातन धर्म अनुष्ठान या भय के बारे में नहीं है। यह स्पष्टता, संतुलन और सही जीवन जीने के बारे में है। बोधिका बच्चों को यह आधार देती है इससे पहले कि भ्रम हावी हो जाए।"',
    sa: '"सनातनधर्मः कर्मकाण्डस्य भयस्य वा विषये नास्ति। एतत् स्पष्टतायाः सन्तुलनस्य सम्यग्जीवनस्य च विषये अस्ति। बोधिका बालकेभ्यः एतम् आधारं ददाति भ्रमः प्राधान्यं लभेत पूर्वम्।"'
  },
  founderName: {
    en: '— Yogesh Bhardwaj',
    hi: '— योगेश भारद्वाज',
    sa: '— योगेशभारद्वाजः'
  },
  founderRole: {
    en: 'Founder, Shastrakulam',
    hi: 'संस्थापक, शास्त्रकुलम्',
    sa: 'संस्थापकः, शास्त्रकुलम्'
  },

  // Final CTA Section - UPDATED
  finalHeadline: {
    en: 'Give Your Child Strong Values — Before The World Shapes Them',
    hi: 'अपने बच्चे को मजबूत मूल्य दें — इससे पहले कि दुनिया उन्हें आकार दे',
    sa: 'स्वसन्तानाय दृढमूल्यानि ददातु — संसारः तान् रूपयेत् पूर्वम्'
  },
  finalBody: {
    en: 'March 2026 batch filling fast. Limited seats available.',
    hi: 'मार्च 2026 बैच तेजी से भर रहा है। सीमित सीटें उपलब्ध।',
    sa: 'मार्च २०२६ वर्गः शीघ्रं पूर्यते। सीमितासनानि उपलभ्यन्ते।'
  },
  finalCTASubtext: {
    en: 'Free guidance • Limited seats',
    hi: 'निःशुल्क मार्गदर्शन • सीमित सीटें',
    sa: 'निःशुल्कमार्गदर्शनम् • सीमितासनानि'
  }
};

// Testimonials data - UPDATED with specific parents
const testimonials = [
  {
    quote: {
      en: 'My child now wakes up early, chants shlokas daily and shows calm behavior at home. Discipline has improved a lot.',
      hi: 'मेरा बच्चा अब जल्दी उठता है, रोज श्लोक पढ़ता है और घर पर शांत व्यवहार दिखाता है। अनुशासन में बहुत सुधार हुआ है।',
      sa: 'मम सन्तानः इदानीं प्रातः उत्तिष्ठति, प्रतिदिनं श्लोकान् पठति गृहे च शान्तव्यवहारं दर्शयति। अनुशासने बहु सुधारः।'
    },
    name: 'Rajesh Sharma',
    detail: {
      en: 'Parent of 9-year-old',
      hi: '9 वर्षीय के अभिभावक',
      sa: '९-वर्षीयस्य पिता'
    },
    location: 'Delhi'
  },
  {
    quote: {
      en: 'Earlier my son was restless. After Bodhika he listens better and respects elders.',
      hi: 'पहले मेरा बेटा बेचैन था। बोधिका के बाद वह बेहतर सुनता है और बड़ों का सम्मान करता है।',
      sa: 'पूर्वं मम पुत्रः अशान्तः आसीत्। बोधिकानन्तरं सः श्रेष्ठं शृणोति वृद्धांश्च आदरति।'
    },
    name: 'Anita Verma',
    detail: {
      en: 'Parent of 8-year-old',
      hi: '8 वर्षीय के अभिभावक',
      sa: '८-वर्षीयस्य माता'
    },
    location: 'Pune'
  },
  {
    quote: {
      en: 'Finally a values-based program that teaches children without fear or pressure.',
      hi: 'आखिरकार एक मूल्य-आधारित कार्यक्रम जो बच्चों को बिना डर या दबाव के सिखाता है।',
      sa: 'अन्ततः मूल्याधारितकार्यक्रमं यत् बालकान् भयेन दबावेन वा विना शिक्षयति।'
    },
    name: 'Suresh Iyer',
    detail: {
      en: 'Parent of 10-year-old',
      hi: '10 वर्षीय के अभिभावक',
      sa: '१०-वर्षीयस्य पिता'
    },
    location: 'Bangalore'
  }
];

// ===============================
// SECTION 1: HERO - Enhanced Mobile First
// ===============================
const HeroSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Sacred Saffron → Warm Beige Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50/80 to-cream" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-saffron/25 via-transparent to-transparent" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-10 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-br from-saffron/30 to-orange-300/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-gradient-to-tr from-maroon/15 to-pink-300/10 rounded-full blur-3xl" />
      
      {/* Subtle Devanagari texture - very light */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ctext x='40' y='45' font-family='serif' font-size='24' fill='%23000' text-anchor='middle' dominant-baseline='middle'%3Eॐ%3C/text%3E%3C/svg%3E")`,
        backgroundSize: '80px 80px'
      }} />
      
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10 md:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Left: Text Content - Mobile First */}
          <motion.div 
            className="order-2 lg:order-1"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Age Badge */}
            <motion.div variants={fadeInUp}>
              <Badge className="mb-3 sm:mb-4 bg-gradient-to-r from-saffron to-orange-500 text-white border-0 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold shadow-lg shadow-saffron/25">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                Ages 6–12 Years
              </Badge>
            </motion.div>

            {/* Headline - Optimized for mobile */}
            <motion.h1 
              variants={fadeInUp}
              className="font-heading text-[1.65rem] leading-[1.2] sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold text-foreground mb-3 sm:mb-4 md:mb-5"
            >
              {t(translations.heroHeadline)}
            </motion.h1>

            {/* Sub-headline */}
            <motion.p 
              variants={fadeInUp}
              className="font-body text-sm sm:text-base md:text-lg text-muted-foreground mb-5 sm:mb-6 leading-relaxed"
            >
              {t(translations.heroSubheadline)}
            </motion.p>

            {/* Core Outcomes - 3 bullets now */}
            <motion.div variants={staggerContainer} className="grid grid-cols-1 gap-2 sm:gap-2.5 mb-5 sm:mb-6">
              {[translations.heroOutcome1, translations.heroOutcome2, translations.heroOutcome3].map((outcome, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeInUp}
                  className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 border border-saffron/20 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
                    <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
                  </div>
                  <span className="font-body text-foreground font-medium text-xs sm:text-sm leading-tight">{t(outcome)}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Urgency Badge - More prominent on mobile */}
            <motion.div 
              variants={scaleIn}
              className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-5 sm:mb-6 shadow-lg"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shrink-0 shadow-md">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <span className="font-heading font-bold text-red-700 text-sm sm:text-lg leading-tight">{t(translations.heroUrgency)}</span>
                </div>
                <p className="font-body text-[10px] sm:text-xs text-red-600/90 pl-11 sm:pl-0">{t(translations.heroUrgencySubtext)}</p>
              </div>
            </motion.div>

            {/* Primary CTA - Enroll Now */}
            <motion.div variants={fadeInUp} className="space-y-2.5">
              <a href="https://learn.shastrakulam.com/courses/Bodhika--Awakening-Young-Minds-10-students-batch-6953f67fba62d03beeceac42?rzpCashfreeRedirectToPreCheckoutFlow=true&newCheckoutFlowParams=%2Ft%2Fpublic%2Fpre-checkout%2Fsingle-checkout%3FcourseId%3D6953f67fba62d03beeceac42%26pid%3Dp1%26orderId%3DMKglO1771061728124466%26courseAmount%3D7000.0%26pg%3Dcashfree%26currencyCode%3DINR%26transactionId%3D699041e082baa04cc7f70275%26promoCode%3D&page=checkout&reqparams=pid%3Dp1&newCheckoutFlowRedirectIssue=true" target="_blank" rel="noopener noreferrer" className="w-full block">
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-saffron via-orange-500 to-orange-600 hover:from-saffron-dark hover:via-orange-600 hover:to-orange-700 text-white font-bold text-sm sm:text-base px-4 sm:px-6 py-5 sm:py-6 rounded-xl sm:rounded-2xl shadow-xl shadow-saffron/25 hover:shadow-2xl transition-all duration-300 active:scale-[0.98]"
              >
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                {t(translations.enrollNow)}
              </Button>
              </a>
              
              {/* Book Free Parent Orientation */}
              <a href="https://forms.gle/UKY2otTFrhdG9QrZA" target="_blank" rel="noopener noreferrer" className="block">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-maroon to-maroon-dark hover:from-maroon-dark hover:to-maroon text-white font-bold text-sm sm:text-base px-4 sm:px-6 py-4 sm:py-5 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  {t(translations.heroPrimaryCTA)}
                </Button>
              </a>
              
              {/* Talk to Counselor on WhatsApp */}
              <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer" className="block">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full border-2 border-green-500 bg-green-50 hover:bg-green-100 text-green-700 font-bold text-sm sm:text-base px-4 sm:px-6 py-4 sm:py-5 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {t(translations.heroSecondaryCTA)}
                </Button>
              </a>
            </motion.div>

            {/* CTA Subtext */}
            <motion.p 
              variants={fadeIn}
              className="text-center font-body text-xs sm:text-sm text-muted-foreground mt-3"
            >
              {t(translations.heroCTASubtext)}
            </motion.p>
          </motion.div>

          {/* Right: Image - Optimized for mobile */}
          <motion.div 
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-br from-saffron/30 to-maroon/20 rounded-2xl sm:rounded-3xl blur-xl" />
              
              <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white/60">
                <img 
                  src={onlineLearning} 
                  alt="Mentor teaching children in Sanatan Dharma class" 
                  className="w-full h-[200px] sm:h-[280px] md:h-[380px] lg:h-[450px] object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                
                {/* Floating Stats Card */}
                <motion.div 
                  className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto bg-white/95 backdrop-blur-md rounded-xl p-2.5 sm:p-3 shadow-xl border border-white/50"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-saffron to-maroon flex items-center justify-center shadow-md">
                      <Play className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-foreground text-xs sm:text-sm">100% Live Classes</p>
                      <p className="font-body text-[10px] sm:text-xs text-muted-foreground">With recordings for revision</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Strip - Mobile optimized grid */}
        <motion.div 
          className="mt-8 sm:mt-10 md:mt-14 pt-5 sm:pt-6 border-t border-saffron/15"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { icon: Video, text: translations.trustLive, color: 'from-blue-500 to-blue-600' },
              { icon: Download, text: translations.trustRecordings, color: 'from-purple-500 to-purple-600' },
              { icon: Shield, text: translations.trustSafe, color: 'from-emerald-500 to-emerald-600' },
              { icon: Star, text: translations.trustAuthentic, color: 'from-saffron to-maroon' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-3 shadow-sm border border-saffron/10">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-sm`}>
                  <item.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                </div>
                <span className="font-body text-[10px] sm:text-xs font-medium text-foreground leading-tight">{t(item.text)}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator for mobile */}
      <motion.div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center text-muted-foreground/60"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// ===============================
// SECTION 2: PARENT PAIN - Enhanced
// ===============================
const ParentPainSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  const painPoints = [
    translations.painPoint1,
    translations.painPoint2,
    translations.painPoint3,
    translations.painPoint4
  ];

  return (
    <section className="py-10 sm:py-14 md:py-20 bg-white relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-saffron/40 to-transparent" />
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-red-50/50 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-6 sm:mb-8">
            <Badge className="mb-3 sm:mb-4 bg-red-50 text-red-700 border-red-200 px-3 sm:px-4 py-1.5">
              The Challenge
            </Badge>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 leading-tight px-2">
              {t(translations.painHeadline)}
            </h2>
            <p className="font-body text-base sm:text-lg text-muted-foreground">{t(translations.painIntro)}</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8"
          >
            {painPoints.map((point, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                className="flex items-start gap-3 p-3 sm:p-4 bg-gradient-to-r from-red-50/90 to-orange-50/50 rounded-xl border border-red-100/80 shadow-sm"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <X className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" strokeWidth={3} />
                </div>
                <span className="font-body text-foreground text-sm sm:text-base">{t(point)}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-3 text-center px-2">
            <p className="font-body text-sm sm:text-base text-foreground/80 italic leading-relaxed">
              {t(translations.painTransition)}
            </p>
            <div className="inline-block bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 shadow-sm">
              <p className="font-body text-sm sm:text-base text-emerald-700 font-semibold">
                {t(translations.painSolution)}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ===============================
// SECTION 3: WHAT IS BODHIKA - Enhanced
// ===============================
const WhatIsBodhikaSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  const learningPoints = [
    translations.whatIsPoint1,
    translations.whatIsPoint2,
    translations.whatIsPoint3,
    translations.whatIsPoint4
  ];

  const quickFacts = [
    { icon: Calendar, text: translations.quickFact1, color: 'from-blue-500 to-blue-600' },
    { icon: Video, text: translations.quickFact2, color: 'from-purple-500 to-purple-600' },
    { icon: Users, text: translations.quickFact3, color: 'from-emerald-500 to-emerald-600' },
    { icon: GraduationCap, text: translations.quickFact4, color: 'from-saffron to-maroon' }
  ];

  return (
    <section className="py-10 sm:py-14 md:py-20 bg-gradient-to-b from-cream/30 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-0 w-64 h-64 bg-saffron/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-0 w-48 h-48 bg-maroon/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">
            {/* Image */}
            <motion.div variants={scaleIn} className="relative order-2 lg:order-1">
              <div className="absolute -inset-3 bg-gradient-to-br from-saffron/15 to-maroon/10 rounded-2xl sm:rounded-3xl blur-xl" />
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border-2 border-white/50">
                <img 
                  src={heroGurukul} 
                  alt="Children learning in traditional setting" 
                  className="w-full h-[220px] sm:h-[280px] md:h-[350px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div variants={staggerContainer} className="order-1 lg:order-2">
              <motion.div variants={fadeInUp}>
                <Badge className="mb-3 sm:mb-4 bg-saffron/10 text-saffron border-saffron/30 px-3 sm:px-4 py-1.5">
                  About the Program
                </Badge>
              </motion.div>
              
              <motion.h2 
                variants={fadeInUp}
                className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-5 leading-tight"
              >
                {t(translations.whatIsHeadline)}
              </motion.h2>

              {/* What it's NOT */}
              <motion.div variants={staggerContainer} className="space-y-2 mb-4 sm:mb-5">
                {[translations.whatIsNot1, translations.whatIsNot2, translations.whatIsNot3].map((item, idx) => (
                  <motion.p 
                    key={idx} 
                    variants={fadeInUp}
                    className="font-body text-muted-foreground text-sm sm:text-base flex items-center gap-2"
                  >
                    <span className="text-muted-foreground/60">✕</span> {t(item)}
                  </motion.p>
                ))}
              </motion.div>

              <motion.p variants={fadeInUp} className="font-body text-foreground font-medium mb-3 sm:mb-4 text-sm sm:text-base">
                {t(translations.whatIsBody)}
              </motion.p>

              {/* Learning Points */}
              <motion.div variants={staggerContainer} className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-5">
                {learningPoints.map((point, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={fadeInUp}
                    className="flex items-center gap-2.5 p-2.5 sm:p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-saffron/15 shadow-sm"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-saffron to-orange-500 flex items-center justify-center shrink-0">
                      <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
                    </div>
                    <span className="font-body text-foreground text-xs sm:text-sm">{t(point)}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.p variants={fadeIn} className="font-body text-muted-foreground italic text-sm sm:text-base">
                {t(translations.whatIsClosing)}
              </motion.p>
            </motion.div>
          </div>

          {/* Quick Facts Strip */}
          <motion.div 
            variants={fadeInUp}
            className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3"
          >
            {quickFacts.map((fact, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white rounded-xl p-3 sm:p-4 shadow-md border border-border/50 hover:shadow-lg transition-shadow">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${fact.color} flex items-center justify-center shrink-0 shadow-sm`}>
                  <fact.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <span className="font-body text-foreground font-medium text-[11px] sm:text-xs leading-tight">{t(fact.text)}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ===============================
// SECTION 4: TRANSFORMATION - Enhanced
// ===============================
const TransformationSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  const transformations = [
    { before: translations.before1, after: translations.after1 },
    { before: translations.before2, after: translations.after2 },
    { before: translations.before3, after: translations.after3 },
    { before: translations.before4, after: translations.after4 }
  ];

  return (
    <section className="py-10 sm:py-14 md:py-20 bg-white relative overflow-hidden">
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
              Real Results
            </Badge>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              {t(translations.transformHeadline)}
            </h2>
          </motion.div>

          {/* Mobile: Stacked cards, Desktop: Side by side */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {/* Before Card */}
            <motion.div variants={slideInLeft}>
              <Card className="border-2 border-red-200 shadow-lg overflow-hidden h-full bg-gradient-to-br from-red-50/50 to-white">
                <div className="h-1.5 bg-gradient-to-r from-red-400 to-red-500" />
                <CardContent className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-4 sm:mb-5">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center shadow-md">
                      <X className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <h3 className="font-heading font-bold text-red-700 text-base sm:text-lg">{t(translations.beforeTitle)}</h3>
                  </div>
                  <div className="space-y-2 sm:space-y-2.5">
                    {transformations.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 p-2.5 sm:p-3 bg-white/80 rounded-lg border border-red-100">
                        <X className="h-4 w-4 text-red-400 shrink-0" />
                        <span className="font-body text-foreground text-xs sm:text-sm">{t(item.before)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Arrow for mobile */}
            <div className="flex justify-center md:hidden">
              <motion.div 
                className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron to-maroon flex items-center justify-center shadow-lg"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="h-5 w-5 text-white" />
              </motion.div>
            </div>

            {/* After Card */}
            <motion.div variants={slideInRight}>
              <Card className="border-2 border-emerald-200 shadow-lg overflow-hidden h-full bg-gradient-to-br from-emerald-50/50 to-white">
                <div className="h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-500" />
                <CardContent className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-4 sm:mb-5">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shadow-md">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <h3 className="font-heading font-bold text-emerald-700 text-base sm:text-lg">{t(translations.afterTitle)}</h3>
                  </div>
                  <div className="space-y-2 sm:space-y-2.5">
                    {transformations.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 p-2.5 sm:p-3 bg-white/80 rounded-lg border border-emerald-100">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span className="font-body text-foreground text-xs sm:text-sm">{t(item.after)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ===============================
// SECTION 5: LEARNING - Enhanced
// ===============================
const LearningSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  const learningItems = [
    { title: translations.learn1Title, subtitle: null, symbol: '🙏', color: 'from-saffron to-orange-500' },
    { title: translations.learn2Title, subtitle: translations.learn2Subtitle, symbol: '📿', color: 'from-purple-500 to-purple-600' },
    { title: translations.learn3Title, subtitle: null, symbol: '📚', color: 'from-blue-500 to-blue-600' },
    { title: translations.learn4Title, subtitle: null, symbol: '🧘', color: 'from-emerald-500 to-emerald-600' },
    { title: translations.learn5Title, subtitle: null, symbol: '🙏', color: 'from-pink-500 to-rose-500' },
    { title: translations.learn6Title, subtitle: null, symbol: '🪔', color: 'from-maroon to-maroon-dark' }
  ];

  return (
    <section className="py-10 sm:py-14 md:py-20 bg-gradient-to-b from-cream/30 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-saffron/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-6 sm:mb-8">
            <Badge className="mb-3 sm:mb-4 bg-saffron/10 text-saffron border-saffron/30 px-3 sm:px-4 py-1.5">
              Curriculum Highlights
            </Badge>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              {t(translations.learnHeadline)}
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6"
          >
            {learningItems.map((item, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border bg-white hover:shadow-xl transition-all duration-300 h-full group overflow-hidden">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-xl sm:text-2xl">{item.symbol}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-semibold text-foreground text-sm sm:text-base leading-tight mb-1">
                          {t(item.title)}
                        </h3>
                        {item.subtitle && (
                          <p className="font-body text-[11px] sm:text-xs text-muted-foreground leading-snug">
                            {t(item.subtitle)}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            variants={fadeIn}
            className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-border/50 shadow-sm"
          >
            <p className="font-body text-muted-foreground text-sm">
              {t(translations.learnNote)}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ===============================
// SECTION 6: LEARNING EXPERIENCE - Enhanced
// ===============================
const LearningExperienceSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  const experiences = [
    { text: translations.exp1, icon: Video },
    { text: translations.exp2, icon: Book },
    { text: translations.exp3, icon: MessageCircle },
    { text: translations.exp4, icon: Download },
    { text: translations.exp5, icon: Award }
  ];

  return (
    <section className="py-10 sm:py-14 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-6 sm:mb-8">
            <Badge className="mb-3 sm:mb-4 bg-emerald-50 text-emerald-700 border-emerald-200 px-3 sm:px-4 py-1.5">
              Learning Format
            </Badge>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              {t(translations.expHeadline)}
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3"
          >
            {experiences.map((exp, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                className="flex items-center gap-3 p-3 sm:p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
                  <exp.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <span className="font-body text-foreground text-xs sm:text-sm font-medium">{t(exp.text)}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Class Format Block */}
          <ClassFormatBlock />
        </motion.div>
      </div>
    </section>
  );
};

// ===============================
// SECTION 7: BATCHES & PRICING - UPDATED
// ===============================
const PricingSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  return (
    <section id="pricing-section" className="py-10 sm:py-14 md:py-20 bg-gradient-to-b from-cream/30 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-saffron/10 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-6 sm:mb-8 md:mb-10">
            <Badge className="mb-3 sm:mb-4 bg-maroon/10 text-maroon border-maroon/30 px-3 sm:px-4 py-1.5">
              Pricing Plans
            </Badge>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3">
              {t(translations.pricingHeadline)}
            </h2>
            <p className="font-body text-muted-foreground text-sm sm:text-base mb-5 sm:mb-6">
              {t(translations.pricingSubline)}
            </p>
            <CountdownTimer />
          </motion.div>

          <div className="max-w-lg mx-auto">
            {/* Focused Batch - UPDATED with new badge */}
            <motion.div variants={scaleIn}>
              <Card className="border-2 border-saffron shadow-xl relative overflow-hidden h-full bg-white">
                {/* MOST RECOMMENDED badge */}
                <div className="absolute top-3 right-3 z-10">
                  <Badge className="bg-gradient-to-r from-saffron to-orange-500 text-white border-0 px-2 py-1 text-[9px] sm:text-[10px] font-bold shadow-lg leading-tight">
                    <Star className="h-2.5 w-2.5 mr-1" />
                    <span className="hidden sm:inline">{t(translations.focusedRecommended)}</span>
                    <span className="sm:hidden">RECOMMENDED</span>
                  </Badge>
                </div>
                
                <div className="h-1.5 bg-gradient-to-r from-saffron to-maroon" />
                
                <CardContent className="p-4 sm:p-5 md:p-6 pt-10 sm:pt-12">
                  <h3 className="font-heading text-base sm:text-lg font-bold text-maroon mb-1.5">
                    {t(translations.focusedBatch)}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-5">{t(translations.focusedStudents)}</p>
                  
                  <ul className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6">
                    <li className="flex items-center gap-2.5 p-2.5 sm:p-3 bg-saffron/10 rounded-lg">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-gradient-to-br from-saffron to-saffron-dark flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
                      </div>
                      <span className="font-body text-foreground text-xs sm:text-sm">{t(translations.focusedFeature1)}</span>
                    </li>
                    <li className="flex items-center gap-2.5 p-2.5 sm:p-3 bg-saffron/10 rounded-lg">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-gradient-to-br from-saffron to-saffron-dark flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
                      </div>
                      <span className="font-body text-foreground text-xs sm:text-sm">{t(translations.focusedFeature2)}</span>
                    </li>
                    <li className="flex items-center gap-2.5 p-2.5 sm:p-3 bg-saffron/10 rounded-lg">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-gradient-to-br from-saffron to-saffron-dark flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
                      </div>
                      <span className="font-body text-foreground text-xs sm:text-sm">{t(translations.focusedFeature3)}</span>
                    </li>
                  </ul>
                  
                  <div className="text-center mb-5">
                    <span className="font-heading text-3xl sm:text-4xl font-bold text-maroon">{t(translations.focusedPrice)}</span>
                    <span className="font-body text-muted-foreground text-xs sm:text-sm ml-1">{t(translations.perYear)}</span>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <a href="https://learn.shastrakulam.com/courses/Bodhika--Awakening-Young-Minds-10-students-batch-6953f67fba62d03beeceac42?rzpCashfreeRedirectToPreCheckoutFlow=true&newCheckoutFlowParams=%2Ft%2Fpublic%2Fpre-checkout%2Fsingle-checkout%3FcourseId%3D6953f67fba62d03beeceac42%26pid%3Dp1%26orderId%3DMKglO1771061728124466%26courseAmount%3D7000.0%26pg%3Dcashfree%26currencyCode%3DINR%26transactionId%3D699041e082baa04cc7f70275%26promoCode%3D&page=checkout&reqparams=pid%3Dp1&newCheckoutFlowRedirectIssue=true" target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button className="w-full bg-gradient-to-r from-saffron via-orange-500 to-orange-600 hover:from-saffron-dark hover:via-orange-600 hover:to-orange-700 text-white font-bold py-3 sm:py-4 rounded-xl shadow-lg text-xs sm:text-sm active:scale-[0.98] transition-all">
                        <GraduationCap className="h-4 w-4 mr-1.5" />
                        {t(translations.reserveSeat)}
                      </Button>
                    </a>
                    <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button variant="outline" className="w-full border-2 border-maroon/30 hover:bg-maroon/5 text-maroon font-bold py-3 sm:py-4 rounded-xl text-xs sm:text-sm active:scale-[0.98] transition-all">
                        <MessageCircle className="h-4 w-4 mr-1.5" />
                        {t(translations.talkToCounselor)}
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </div>

          {/* Scholarship Note */}
          <motion.div 
            variants={fadeInUp}
            className="text-center mt-5 sm:mt-6 md:mt-8 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-border shadow-md"
          >
            <p className="font-body text-emerald-700 font-semibold text-sm sm:text-base">{t(translations.scholarshipNote)}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ===============================
// SECTION 8: SOCIAL PROOF - UPDATED with specific testimonials
// ===============================
const TestimonialsSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  return (
    <section className="py-10 sm:py-14 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-6 sm:mb-8">
            <Badge className="mb-3 sm:mb-4 bg-purple-50 text-purple-700 border-purple-200 px-3 sm:px-4 py-1.5">
              Parent Testimonials
            </Badge>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              {t(translations.testimonialsHeadline)}
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
          >
            {testimonials.map((testimonial, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border bg-gradient-to-br from-cream/30 to-white shadow-md hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-4 sm:p-5">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-saffron/20 to-maroon/20 flex items-center justify-center mb-3 sm:mb-4">
                      <Quote className="h-4 w-4 sm:h-5 sm:w-5 text-saffron" />
                    </div>
                    <p className="font-body text-foreground italic mb-4 text-sm sm:text-base leading-relaxed">
                      "{t(testimonial.quote)}"
                    </p>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-maroon to-maroon-dark flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-md">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-foreground text-xs sm:text-sm">{testimonial.name}</p>
                        <p className="font-body text-[10px] sm:text-xs text-muted-foreground">
                          {t(testimonial.detail)} | {testimonial.location}
                        </p>
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

// ===============================
// SECTION 9: FOUNDER AUTHORITY - Enhanced
// ===============================
const FounderSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  return (
    <section className="py-10 sm:py-14 md:py-20 bg-gradient-to-b from-cream/30 to-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-6 sm:mb-8">
            <Badge className="mb-3 sm:mb-4 bg-maroon/10 text-maroon border-maroon/30 px-3 sm:px-4 py-1.5">
              From Our Founder
            </Badge>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              {t(translations.founderHeadline)}
            </h2>
          </motion.div>

          <motion.div variants={scaleIn}>
            <Card className="border-0 shadow-xl bg-white overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-saffron via-maroon to-saffron" />
              <CardContent className="p-5 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <div className="shrink-0">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-saffron/30 shadow-xl">
                      <img 
                        src={founderImage} 
                        alt="Yogesh Bhardwaj" 
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="font-body text-foreground italic text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
                      {t(translations.founderMessage)}
                    </p>
                    <p className="font-heading font-bold text-maroon text-base sm:text-lg">{t(translations.founderName)}</p>
                    <p className="font-body text-xs sm:text-sm text-muted-foreground">{t(translations.founderRole)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ===============================
// SECTION 10: FINAL CTA - UPDATED
// ===============================
const FinalCTASection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-maroon via-maroon-dark to-maroon text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-saffron/20 via-transparent to-transparent" />
      <div className="absolute top-0 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-saffron/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 sm:w-80 h-64 sm:h-80 bg-saffron/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight px-2">
              {t(translations.finalHeadline)}
            </h2>
          </motion.div>

          <motion.p 
            variants={fadeInUp}
            className="font-body text-sm sm:text-base md:text-lg text-cream/90 mb-6 sm:mb-8 leading-relaxed"
          >
            {t(translations.finalBody)}
          </motion.p>

          <motion.div variants={scaleIn} className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://forms.gle/UKY2otTFrhdG9QrZA" target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-saffron via-orange-500 to-orange-600 hover:from-saffron-dark hover:via-orange-600 hover:to-orange-700 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-[0.98]"
              >
                <Calendar className="h-5 w-5 mr-2" />
                {t(translations.bookFreeOrientation)}
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 ml-1" />
              </Button>
            </a>
            
            <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                {t(translations.heroCTAShort)}
              </Button>
            </a>
          </motion.div>

          <motion.p 
            variants={fadeIn}
            className="font-body text-xs sm:text-sm text-cream/70 mt-4 sm:mt-5"
          >
            {t(translations.finalCTASubtext)}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

// ===============================
// FLOATING ENROLL NOW BUTTON
// ===============================
const FloatingEnrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  useEffect(() => {
    const handleScroll = () => {
      const pricingSection = document.getElementById('pricing-section');
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect();
        // Hide when pricing section is visible
        setIsVisible(window.scrollY > 400 && rect.top > window.innerHeight);
      } else {
        setIsVisible(window.scrollY > 400);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div 
      className="fixed bottom-20 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <a href="https://learn.shastrakulam.com/courses/Bodhika--Awakening-Young-Minds-10-students-batch-6953f67fba62d03beeceac42?rzpCashfreeRedirectToPreCheckoutFlow=true&newCheckoutFlowParams=%2Ft%2Fpublic%2Fpre-checkout%2Fsingle-checkout%3FcourseId%3D6953f67fba62d03beeceac42%26pid%3Dp1%26orderId%3DMKglO1771061728124466%26courseAmount%3D7000.0%26pg%3Dcashfree%26currencyCode%3DINR%26transactionId%3D699041e082baa04cc7f70275%26promoCode%3D&page=checkout&reqparams=pid%3Dp1&newCheckoutFlowRedirectIssue=true" target="_blank" rel="noopener noreferrer">
      <Button 
        className="bg-gradient-to-r from-saffron via-orange-500 to-orange-600 hover:from-saffron-dark hover:via-orange-600 hover:to-orange-700 text-white font-bold px-6 py-4 rounded-full shadow-2xl text-sm md:text-base active:scale-[0.98] transition-all"
      >
        <Flame className="h-5 w-5 mr-2" />
        {t({ en: 'Enroll Now', hi: 'अभी नामांकन करें', sa: 'नामाङ्कनं कुरुत' })}
      </Button>
      </a>
    </motion.div>
  );
};

// ===============================
// MAIN PAGE COMPONENT - UPDATED SECTION ORDER
// ===============================
const BodhikaLanding = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  return (
    <Layout>
      <Helmet>
        <title>{t(translations.metaTitle)}</title>
        <meta name="description" content={t(translations.metaDescription)} />
        <meta property="og:title" content={t(translations.metaTitle)} />
        <meta property="og:description" content={t(translations.metaDescription)} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://shastrakulam.com/og-bodhika.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://shastrakulam.com/og-bodhika.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Helmet>

      <main className="overflow-hidden">
        <HeroSection />
        <ParentPainSection />
        <WhatIsBodhikaSection />
        <TransformationSection />
        <SyllabusSection />
        <ProgramStructureSection />
        <LearningSection />
        <LearningExperienceSection />
        <ValueStackSection />
        <PricingSection />
        <TestimonialsSection />
        <ObjectionCrusherFAQ />
        <FounderSection />
        <FinalCTASection />
        <FloatingEnrollButton />
      </main>
    </Layout>
  );
};

export default BodhikaLanding;
