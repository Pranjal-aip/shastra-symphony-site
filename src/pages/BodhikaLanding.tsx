import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
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
  ChevronRight
} from 'lucide-react';

// Import images
import heroGurukul from '@/assets/bodhika/hero-gurukul.jpg';
import onlineLearning from '@/assets/bodhika/online-learning.jpg';
import founderImage from '@/assets/bodhika/founder-yogesh.jpg';

// WhatsApp number for counselor
const WHATSAPP_NUMBER = '919674916567';
const WHATSAPP_COUNSELOR_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20want%20to%20know%20more%20about%20the%20Bodhika%20Sanatan%20Dharma%20program%20for%20my%20child.`;

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Translations - Updated with Sanatan focus
const translations = {
  // Meta
  metaTitle: {
    en: 'Bodhika - 1-Year Sanatan Dharma Program for Children | Shastrakulam',
    hi: 'बोधिका - बच्चों के लिए 1 वर्षीय सनातन धर्म कार्यक्रम | शास्त्रकुलम्',
    sa: 'बोधिका - बालकानां कृते एकवर्षीयं सनातनधर्मकार्यक्रमम् | शास्त्रकुलम्'
  },
  metaDescription: {
    en: 'Build Sanskar, self-discipline, emotional balance, and cultural confidence in children aged 6-12 through authentic Shastric wisdom. March 2026 batch - Only 70 seats.',
    hi: '6-12 वर्ष के बच्चों में संस्कार, आत्म-अनुशासन, भावनात्मक संतुलन और सांस्कृतिक आत्मविश्वास का निर्माण करें। मार्च 2026 बैच - केवल 70 सीटें।',
    sa: '६-१२ वर्षीयेषु बालकेषु संस्कारं आत्मानुशासनं भावनात्मकसन्तुलनं सांस्कृतिकात्मविश्वासं च निर्मातुं प्रामाणिकशास्त्रीयज्ञानेन।'
  },

  // Hero Section
  heroHeadline: {
    en: 'Is Your Child Growing Up Smart — But Losing Focus, Discipline & Sanatan Values?',
    hi: 'क्या आपका बच्चा होशियार तो है — लेकिन ध्यान, अनुशासन और सनातन संस्कार खो रहा है?',
    sa: 'किं भवतः सन्तानः मेधावी अस्ति — किन्तु ध्यानम् अनुशासनं सनातनसंस्कारांश्च त्यजति?'
  },
  heroSubheadline: {
    en: 'Bodhika is a 1-Year Live Sanatan Dharma program that builds Sanskar, self-discipline, emotional balance, and cultural confidence in children aged 6–12 — through authentic Shastric wisdom taught in a child-friendly, modern way.',
    hi: 'बोधिका एक 1 वर्षीय लाइव सनातन धर्म कार्यक्रम है जो 6-12 वर्ष के बच्चों में संस्कार, आत्म-अनुशासन, भावनात्मक संतुलन और सांस्कृतिक आत्मविश्वास का निर्माण करता है — प्रामाणिक शास्त्रीय ज्ञान के माध्यम से जो बाल-अनुकूल, आधुनिक तरीके से पढ़ाया जाता है।',
    sa: 'बोधिका एकवर्षीयं जीवन्तसनातनधर्मकार्यक्रमम् अस्ति यत् ६-१२ वर्षीयेषु बालकेषु संस्कारम् आत्मानुशासनं भावनात्मकसन्तुलनं सांस्कृतिकात्मविश्वासं च निर्माति — प्रामाणिकशास्त्रीयज्ञानेन यत् बालोपयुक्तआधुनिकप्रकारेण शिक्ष्यते।'
  },
  heroOutcome1: {
    en: 'Sanskar deeply rooted in Sanatan Dharma',
    hi: 'सनातन धर्म में गहराई से निहित संस्कार',
    sa: 'सनातनधर्मे गहनमूलितसंस्कारः'
  },
  heroOutcome2: {
    en: 'Respect for parents, elders & Gurus',
    hi: 'माता-पिता, बड़ों और गुरुओं के प्रति सम्मान',
    sa: 'पितृभ्यः वृद्धेभ्यः गुरुभ्यश्च आदरः'
  },
  heroOutcome3: {
    en: 'Calm, focused, disciplined behaviour',
    hi: 'शांत, एकाग्र, अनुशासित व्यवहार',
    sa: 'शान्तः एकाग्रः अनुशासितव्यवहारश्च'
  },
  heroOutcome4: {
    en: 'Daily practice of meaningful Shlokas & Mantras',
    hi: 'सार्थक श्लोकों और मंत्रों का दैनिक अभ्यास',
    sa: 'सार्थकश्लोकमन्त्राणां दैनिकाभ्यासः'
  },
  heroUrgency: {
    en: 'March 2026 Batch | Only 70 Children',
    hi: 'मार्च 2026 बैच | केवल 70 बच्चे',
    sa: 'मार्च २०२६ वर्गः | केवलं ७० बालकाः'
  },
  heroUrgencySubtext: {
    en: 'Small groups • Personal guidance • Admissions close when seats fill',
    hi: 'छोटे समूह • व्यक्तिगत मार्गदर्शन • सीटें भरने पर प्रवेश बंद',
    sa: 'लघुसमूहाः • व्यक्तिगतमार्गदर्शनम् • आसनपूर्णे प्रवेशः बन्धः'
  },
  heroCTA: {
    en: 'Talk to a Sanatan Education Counselor on WhatsApp',
    hi: 'WhatsApp पर सनातन शिक्षा परामर्शदाता से बात करें',
    sa: 'WhatsApp-द्वारा सनातनशिक्षापरामर्शकेन सह वदत'
  },
  heroCTASubtext: {
    en: 'Free guidance • No obligation • Limited seats',
    hi: 'निःशुल्क मार्गदर्शन • कोई बाध्यता नहीं • सीमित सीटें',
    sa: 'निःशुल्कमार्गदर्शनम् • न बाध्यता • सीमितासनानि'
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
    en: '12-Month Live Program',
    hi: '12 महीने का लाइव कार्यक्रम',
    sa: '१२-मासजीवन्तकार्यक्रमः'
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
    sa: 'रामायणमहाभारतभगवद्गीताभ्यः कथाः'
  },
  learn4Title: {
    en: 'Yoga, Pranayama & Mindfulness',
    hi: 'योग, प्राणायाम और माइंडफुलनेस',
    sa: 'योगः प्राणायामः सावधानता च'
  },
  learn5Title: {
    en: 'Respect for Parents, Elders & Gurus',
    hi: 'माता-पिता, बड़ों और गुरुओं के प्रति सम्मान',
    sa: 'पितृवृद्धगुरुषु आदरः'
  },
  learn6Title: {
    en: 'Indian Culture, Festivals & Dharmic Living',
    hi: 'भारतीय संस्कृति, त्योहार और धार्मिक जीवन',
    sa: 'भारतीयसंस्कृतिः उत्सवाः धार्मिकजीवनं च'
  },
  learnNote: {
    en: '👉 Detailed curriculum shared during counseling.',
    hi: '👉 विस्तृत पाठ्यक्रम परामर्श के दौरान साझा किया जाएगा।',
    sa: '👉 विस्तृतपाठ्यक्रमः परामर्शसमये प्रदास्यते।'
  },

  // Learning Experience Section
  expHeadline: {
    en: 'How Bodhika Is Taught (Pressure-Free)',
    hi: 'बोधिका कैसे पढ़ाई जाती है (दबाव-मुक्त)',
    sa: 'बोधिका कथं शिक्ष्यते (दबावरहितम्)'
  },
  exp1: {
    en: 'Live mentor-led sessions',
    hi: 'लाइव मेंटर-नेतृत्व वाले सत्र',
    sa: 'जीवन्तगुरुनेतृत्वसत्राणि'
  },
  exp2: {
    en: 'Story-based learning (child-friendly)',
    hi: 'कथा-आधारित शिक्षा (बाल-अनुकूल)',
    sa: 'कथाधारिताधिगमः (बालोपयुक्तः)'
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
    hi: 'कोई परीक्षा नहीं • कोई प्रतिस्पर्धा नहीं • कोई जबरदस्ती नहीं',
    sa: 'न परीक्षा • न प्रतिस्पर्धा • न बलात्कारः'
  },

  // Pricing Section
  pricingHeadline: {
    en: 'Choose the Right Batch for Your Child',
    hi: 'अपने बच्चे के लिए सही बैच चुनें',
    sa: 'स्वसन्तानाय उचितं वर्गं चिनुत'
  },
  focusedBatch: {
    en: 'FOCUSED SANATAN BATCH',
    hi: 'फोकस्ड सनातन बैच',
    sa: 'केन्द्रितसनातनवर्गः'
  },
  focusedRecommended: {
    en: 'Recommended',
    hi: 'अनुशंसित',
    sa: 'अनुशंसितम्'
  },
  focusedStudents: {
    en: '12 children only',
    hi: 'केवल 12 बच्चे',
    sa: 'केवलं १२ बालकाः'
  },
  focusedFeature1: {
    en: 'Deeper guidance & interaction',
    hi: 'गहन मार्गदर्शन और बातचीत',
    sa: 'गहनमार्गदर्शनम् परस्परक्रिया च'
  },
  focusedFeature2: {
    en: 'Individual progress tracking',
    hi: 'व्यक्तिगत प्रगति ट्रैकिंग',
    sa: 'व्यक्तिगतप्रगतिअनुसरणम्'
  },
  focusedPrice: {
    en: '₹15,000',
    hi: '₹15,000',
    sa: '₹१५,०००'
  },
  groupBatch: {
    en: 'GROUP SANATAN BATCH',
    hi: 'ग्रुप सनातन बैच',
    sa: 'समूहसनातनवर्गः'
  },
  groupFeature1: {
    en: 'Larger peer group',
    hi: 'बड़ा समकक्ष समूह',
    sa: 'बृहत्समानसमूहः'
  },
  groupFeature2: {
    en: 'Community learning',
    hi: 'सामुदायिक शिक्षा',
    sa: 'सामुदायिकाधिगमः'
  },
  groupPrice: {
    en: '₹6,000',
    hi: '₹6,000',
    sa: '₹६,०००'
  },
  perYear: {
    en: '/ year',
    hi: '/ वर्ष',
    sa: '/ वर्षम्'
  },
  talkToCounselor: {
    en: 'Talk to Counselor',
    hi: 'काउंसलर से बात करें',
    sa: 'परामर्शकेन सह वदत'
  },
  scholarshipNote: {
    en: '🎓 Scholarships available for genuinely needy families.',
    hi: '🎓 वास्तव में जरूरतमंद परिवारों के लिए छात्रवृत्ति उपलब्ध।',
    sa: '🎓 वास्तवआवश्यककुटुम्बेभ्यः छात्रवृत्तयः उपलब्धाः।'
  },

  // Testimonials Section
  testimonialsHeadline: {
    en: 'What Sanatan Parents Are Saying',
    hi: 'सनातन माता-पिता क्या कह रहे हैं',
    sa: 'सनातनपितरः किं वदन्ति'
  },

  // Founder Section
  founderHeadline: {
    en: 'Why Bodhika Exists',
    hi: 'बोधिका क्यों है',
    sa: 'बोधिका किमर्थम् अस्ति'
  },
  founderMessage: {
    en: '"Sanatan Dharma is not about rituals or fear. It is about clarity, balance, and living rightly. Bodhika gives children this foundation before confusion takes over."',
    hi: '"सनातन धर्म कर्मकांड या भय के बारे में नहीं है। यह स्पष्टता, संतुलन और सही जीवन जीने के बारे में है। बोधिका बच्चों को यह आधार देती है इससे पहले कि भ्रम हावी हो जाए।"',
    sa: '"सनातनधर्मः कर्मकाण्डभयविषये नास्ति। एतत् स्पष्टतायाः सन्तुलनस्य सम्यग्जीवनस्य च विषये अस्ति। बोधिका बालकेभ्यः एतम् आधारं ददाति भ्रान्तेः आधिक्यात् पूर्वम्।"'
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

  // Final CTA Section
  finalHeadline: {
    en: 'Give Your Child Strong Sanatan Roots — Before the World Shapes Them',
    hi: 'अपने बच्चे को मजबूत सनातन जड़ें दें — इससे पहले कि दुनिया उन्हें आकार दे',
    sa: 'स्वसन्तानाय दृढसनातनमूलानि ददातु — संसारः तान् रूपयेत् पूर्वम्'
  },
  finalBody: {
    en: 'March 2026 batch is filling fast.\nLimited seats • Small groups • Authentic Sanatan foundation',
    hi: 'मार्च 2026 बैच तेजी से भर रहा है।\nसीमित सीटें • छोटे समूह • प्रामाणिक सनातन आधार',
    sa: 'मार्च २०२६ वर्गः शीघ्रं पूर्यते।\nसीमितासनानि • लघुसमूहाः • प्रामाणिकसनातनाधारः'
  },
  finalCTASubtext: {
    en: 'Free guidance • Limited seats',
    hi: 'निःशुल्क मार्गदर्शन • सीमित सीटें',
    sa: 'निःशुल्कमार्गदर्शनम् • सीमितासनानि'
  }
};

// Testimonials data - Updated
const testimonials = [
  {
    quote: {
      en: 'My child now chants shlokas daily and understands their meaning.',
      hi: 'मेरा बच्चा अब रोज श्लोक पढ़ता है और उनका अर्थ समझता है।',
      sa: 'मम सन्तानः इदानीं प्रतिदिनं श्लोकान् पठति तेषाम् अर्थं च जानाति।'
    },
    name: 'Parent',
    location: 'Pune'
  },
  {
    quote: {
      en: 'There is calmness and discipline at home that wasn\'t there before.',
      hi: 'घर में एक शांति और अनुशासन है जो पहले नहीं था।',
      sa: 'गृहे शान्तिः अनुशासनं च अस्ति यत् पूर्वं नासीत्।'
    },
    name: 'Parent',
    location: 'Delhi'
  },
  {
    quote: {
      en: 'Finally a program that builds values through Sanatan wisdom.',
      hi: 'आखिरकार एक कार्यक्रम जो सनातन ज्ञान से मूल्यों का निर्माण करता है।',
      sa: 'अन्ततः एतादृशं कार्यक्रमं यत् सनातनज्ञानेन मूल्यानि निर्माति।'
    },
    name: 'Parent',
    location: 'Bangalore'
  }
];

// ===============================
// SECTION 1: HERO
// ===============================
const HeroSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Sacred Saffron → Warm Beige Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-saffron/40 via-saffron/20 to-cream" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-saffron/30 via-transparent to-transparent" />
      
      {/* Subtle Devanagari texture - very light */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-family='serif' font-size='30' fill='%23000' text-anchor='middle' dominant-baseline='middle'%3Eॐ%3C/text%3E%3C/svg%3E")`,
        backgroundSize: '120px 120px'
      }} />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-saffron/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-maroon/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div 
            className="order-2 lg:order-1"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Age Badge */}
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4 md:mb-6 bg-gradient-to-r from-saffron to-saffron-dark text-white border-0 px-4 py-2 text-sm font-medium shadow-lg">
                <Sparkles className="h-4 w-4 mr-2" />
                Ages 6–12 Years
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={fadeInUp}
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-foreground leading-[1.15] mb-4 md:mb-6"
            >
              {t(translations.heroHeadline)}
            </motion.h1>

            {/* Sub-headline */}
            <motion.p 
              variants={fadeInUp}
              className="font-body text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed"
            >
              {t(translations.heroSubheadline)}
            </motion.p>

            {/* Core Outcomes - 4 items now */}
            <motion.div variants={staggerContainer} className="space-y-2.5 md:space-y-3 mb-6 md:mb-8">
              {[translations.heroOutcome1, translations.heroOutcome2, translations.heroOutcome3, translations.heroOutcome4].map((outcome, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeInUp}
                  className="flex items-start gap-3 bg-white/70 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-saffron/20 shadow-sm"
                >
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 md:h-4.5 md:w-4.5 text-white" />
                  </div>
                  <span className="font-body text-foreground font-medium text-sm md:text-base">{t(outcome)}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Urgency Badge */}
            <motion.div 
              variants={scaleIn}
              className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-4 md:p-5 mb-6 md:mb-8 shadow-lg"
            >
              <div className="flex items-center gap-2 md:gap-3 mb-1">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                  <Calendar className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <span className="font-heading font-bold text-red-700 text-lg md:text-xl block">{t(translations.heroUrgency)}</span>
                  <p className="font-body text-xs md:text-sm text-red-600">{t(translations.heroUrgencySubtext)}</p>
                </div>
              </div>
            </motion.div>

            {/* Primary CTA */}
            <motion.div variants={fadeInUp} className="space-y-3 md:space-y-4">
              <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer" className="block">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-sm md:text-base px-5 md:px-8 py-5 md:py-7 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <MessageCircle className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3" />
                  <span className="leading-tight">{t(translations.heroCTA)}</span>
                  <ChevronRight className="h-5 w-5 ml-1 md:ml-2" />
                </Button>
              </a>
              <p className="font-body text-xs md:text-sm text-muted-foreground text-center sm:text-left">{t(translations.heroCTASubtext)}</p>
            </motion.div>
          </motion.div>

          {/* Right: Image - Calm child/mentor teaching */}
          <motion.div 
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-br from-saffron/40 to-maroon/30 rounded-3xl blur-xl" />
              
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
                <img 
                  src={onlineLearning} 
                  alt="Mentor teaching children in Sanatan Dharma class" 
                  className="w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[520px] object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                
                {/* Floating Stats Card */}
                <motion.div 
                  className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto bg-white/95 backdrop-blur-md rounded-xl md:rounded-2xl p-3 md:p-4 shadow-xl border border-white/50"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-saffron to-maroon flex items-center justify-center">
                      <Play className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-foreground text-sm md:text-base">100% Live Classes</p>
                      <p className="font-body text-xs md:text-sm text-muted-foreground">With recordings for revision</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Strip */}
        <motion.div 
          className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-saffron/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { icon: Video, text: translations.trustLive, color: 'from-blue-500 to-blue-600' },
              { icon: Download, text: translations.trustRecordings, color: 'from-purple-500 to-purple-600' },
              { icon: Shield, text: translations.trustSafe, color: 'from-green-500 to-green-600' },
              { icon: Star, text: translations.trustAuthentic, color: 'from-saffron to-maroon' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 md:gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-sm border border-saffron/10">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0`}>
                  <item.icon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <span className="font-body text-xs md:text-sm font-medium text-foreground">{t(item.text)}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ===============================
// SECTION 2: PARENT PAIN
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
    <section className="py-12 md:py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-saffron/30 to-transparent" />
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-8 md:mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
              {t(translations.painHeadline)}
            </h2>
            <p className="font-body text-lg md:text-xl text-muted-foreground">{t(translations.painIntro)}</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="space-y-3 md:space-y-4 mb-8 md:mb-10"
          >
            {painPoints.map((point, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-gradient-to-r from-red-50/80 to-orange-50/50 rounded-xl md:rounded-2xl border border-red-100"
              >
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="h-3.5 w-3.5 md:h-4 md:w-4 text-white" />
                </div>
                <span className="font-body text-foreground text-sm md:text-base lg:text-lg">{t(point)}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-4 text-center">
            <p className="font-body text-base md:text-lg text-foreground/80 italic max-w-3xl mx-auto">
              {t(translations.painTransition)}
            </p>
            <p className="font-body text-base md:text-lg text-green-700 font-semibold">
              {t(translations.painSolution)}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ===============================
// SECTION 3: WHAT IS BODHIKA
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
    { icon: Users, text: translations.quickFact3, color: 'from-green-500 to-green-600' },
    { icon: GraduationCap, text: translations.quickFact4, color: 'from-saffron to-maroon' }
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-cream/50 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-saffron/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-maroon/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
            <motion.div variants={scaleIn} className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-br from-saffron/20 to-maroon/10 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
                <img 
                  src={heroGurukul} 
                  alt="Children learning in traditional setting" 
                  className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div variants={staggerContainer} className="order-1 lg:order-2">
              <motion.div variants={fadeInUp}>
                <Badge className="mb-4 bg-saffron/10 text-saffron border-saffron/30 px-4 py-2">
                  About the Program
                </Badge>
              </motion.div>
              
              <motion.h2 
                variants={fadeInUp}
                className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6"
              >
                {t(translations.whatIsHeadline)}
              </motion.h2>

              {/* What it is NOT */}
              <motion.div variants={staggerContainer} className="space-y-2 mb-4 md:mb-6">
                {[translations.whatIsNot1, translations.whatIsNot2, translations.whatIsNot3].map((item, idx) => (
                  <motion.p 
                    key={idx}
                    variants={fadeInUp}
                    className="font-body text-maroon font-medium text-sm md:text-base flex items-center gap-2"
                  >
                    <span className="text-maroon">✗</span> {t(item)}
                  </motion.p>
                ))}
              </motion.div>

              <motion.p 
                variants={fadeInUp}
                className="font-body text-muted-foreground mb-4 md:mb-5 text-sm md:text-base"
              >
                {t(translations.whatIsBody)}
              </motion.p>

              <motion.ul variants={staggerContainer} className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                {learningPoints.map((point, idx) => (
                  <motion.li 
                    key={idx} 
                    variants={fadeInUp}
                    className="flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-saffron/10 shadow-sm"
                  >
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-saffron to-saffron-dark flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-body text-foreground text-sm md:text-base">{t(point)}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.p 
                variants={fadeInUp}
                className="font-body text-muted-foreground text-xs md:text-sm italic"
              >
                {t(translations.whatIsClosing)}
              </motion.p>
            </motion.div>
          </div>

          {/* Quick Fact Strip */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-10 md:mt-16"
          >
            {quickFacts.map((fact, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 text-center shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${fact.color} flex items-center justify-center mx-auto mb-3`}>
                  <fact.icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
                </div>
                <span className="font-body text-xs md:text-sm font-semibold text-foreground">{t(fact.text)}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ===============================
// SECTION 4: TRANSFORMATION
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
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-8 md:mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-red-100 to-green-100 text-foreground border-0 px-4 py-2">
              Real Results
            </Badge>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {t(translations.transformHeadline)}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {/* Before */}
            <motion.div variants={scaleIn}>
              <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-orange-50 shadow-xl overflow-hidden h-full">
                <div className="h-2 bg-gradient-to-r from-red-400 to-red-500" />
                <CardContent className="p-5 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center">
                      <X className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <h3 className="font-heading font-bold text-red-700 text-lg md:text-xl">{t(translations.beforeTitle)}</h3>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    {transformations.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
                        <X className="h-5 w-5 text-red-500 shrink-0" />
                        <span className="font-body text-foreground text-sm md:text-base">{t(item.before)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* After */}
            <motion.div variants={scaleIn}>
              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl overflow-hidden h-full">
                <div className="h-2 bg-gradient-to-r from-green-400 to-green-500" />
                <CardContent className="p-5 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center">
                      <Check className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <h3 className="font-heading font-bold text-green-700 text-lg md:text-xl">{t(translations.afterTitle)}</h3>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    {transformations.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
                        <Check className="h-5 w-5 text-green-600 shrink-0" />
                        <span className="font-body text-foreground text-sm md:text-base">{t(item.after)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Arrow indicator for mobile */}
          <div className="flex justify-center my-4 md:hidden">
            <ArrowRight className="h-8 w-8 text-saffron rotate-90" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ===============================
// SECTION 5: WHAT YOUR CHILD WILL LEARN
// ===============================
const LearningSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  const learningItems = [
    { icon: Heart, title: translations.learn1Title, color: 'from-saffron to-maroon', symbol: '🕉' },
    { icon: Music, title: translations.learn2Title, subtitle: translations.learn2Subtitle, color: 'from-purple-500 to-purple-600', symbol: '📿' },
    { icon: Book, title: translations.learn3Title, color: 'from-amber-500 to-amber-600', symbol: '📖' },
    { icon: Leaf, title: translations.learn4Title, color: 'from-green-500 to-green-600', symbol: '🧘' },
    { icon: Users, title: translations.learn5Title, color: 'from-pink-500 to-pink-600', symbol: '🙏' },
    { icon: Sparkles, title: translations.learn6Title, color: 'from-blue-500 to-blue-600', symbol: '🌱' }
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-cream/50 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-saffron/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-8 md:mb-12">
            <Badge className="mb-4 bg-saffron/10 text-saffron border-saffron/30 px-4 py-2">
              Curriculum Highlights
            </Badge>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {t(translations.learnHeadline)}
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-6 md:mb-8"
          >
            {learningItems.map((item, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
              >
                <Card className="border bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full group">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-2xl md:text-3xl">{item.symbol}</span>
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-foreground text-sm md:text-base lg:text-lg mb-1">
                          {t(item.title)}
                        </h3>
                        {item.subtitle && (
                          <p className="font-body text-xs md:text-sm text-muted-foreground">
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

          <motion.p 
            variants={fadeIn}
            className="text-center font-body text-muted-foreground text-sm md:text-base bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-border/50"
          >
            {t(translations.learnNote)}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

// ===============================
// SECTION 6: LEARNING EXPERIENCE
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
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-8 md:mb-12">
            <Badge className="mb-4 bg-green-100 text-green-700 border-green-200 px-4 py-2">
              Learning Format
            </Badge>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {t(translations.expHeadline)}
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
          >
            {experiences.map((exp, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                className="flex items-center gap-3 p-4 md:p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl md:rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shrink-0">
                  <exp.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <span className="font-body text-foreground text-sm md:text-base font-medium">{t(exp.text)}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ===============================
// SECTION 7: BATCHES & PRICING
// ===============================
const PricingSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  return (
    <section id="pricing-section" className="py-12 md:py-20 bg-gradient-to-b from-cream/50 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-saffron/10 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-8 md:mb-12">
            <Badge className="mb-4 bg-maroon/10 text-maroon border-maroon/30 px-4 py-2">
              Pricing Plans
            </Badge>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {t(translations.pricingHeadline)}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {/* Focused Batch - Recommended */}
            <motion.div variants={scaleIn}>
              <Card className="border-2 border-saffron shadow-2xl relative overflow-hidden h-full bg-white">
                {/* Recommended ribbon */}
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-saffron to-saffron-dark text-white text-xs font-bold px-6 py-2 transform rotate-0 rounded-bl-xl shadow-lg">
                    <Star className="h-3 w-3 inline mr-1" />
                    {t(translations.focusedRecommended)}
                  </div>
                </div>
                
                <div className="h-2 bg-gradient-to-r from-saffron to-maroon" />
                
                <CardContent className="p-5 md:p-8 pt-10 md:pt-12">
                  <h3 className="font-heading text-lg md:text-xl font-bold text-maroon mb-2">
                    {t(translations.focusedBatch)}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-4 md:mb-6">{t(translations.focusedStudents)}</p>
                  
                  <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                    <li className="flex items-center gap-3 p-3 bg-saffron/10 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-saffron to-saffron-dark flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-body text-foreground text-sm md:text-base">{t(translations.focusedFeature1)}</span>
                    </li>
                    <li className="flex items-center gap-3 p-3 bg-saffron/10 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-saffron to-saffron-dark flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-body text-foreground text-sm md:text-base">{t(translations.focusedFeature2)}</span>
                    </li>
                  </ul>
                  
                  <div className="text-center mb-6">
                    <span className="font-heading text-4xl md:text-5xl font-bold text-maroon">{t(translations.focusedPrice)}</span>
                    <span className="font-body text-muted-foreground text-sm md:text-base ml-1">{t(translations.perYear)}</span>
                  </div>
                  
                  <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-5 md:py-6 rounded-xl shadow-lg text-sm md:text-base">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      {t(translations.talkToCounselor)}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            {/* Group Batch */}
            <motion.div variants={scaleIn}>
              <Card className="border-2 border-border shadow-xl overflow-hidden h-full bg-white">
                <div className="h-2 bg-gradient-to-r from-slate-300 to-slate-400" />
                
                <CardContent className="p-5 md:p-8">
                  <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6">
                    {t(translations.groupBatch)}
                  </h3>
                  
                  <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                    <li className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-body text-foreground text-sm md:text-base">{t(translations.groupFeature1)}</span>
                    </li>
                    <li className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-body text-foreground text-sm md:text-base">{t(translations.groupFeature2)}</span>
                    </li>
                  </ul>
                  
                  <div className="text-center mb-6">
                    <span className="font-heading text-4xl md:text-5xl font-bold text-foreground">{t(translations.groupPrice)}</span>
                    <span className="font-body text-muted-foreground text-sm md:text-base ml-1">{t(translations.perYear)}</span>
                  </div>
                  
                  <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full border-2 border-foreground/20 hover:bg-muted font-bold py-5 md:py-6 rounded-xl text-sm md:text-base">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      {t(translations.talkToCounselor)}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Scholarship Note */}
          <motion.div 
            variants={fadeInUp}
            className="text-center mt-6 md:mt-10 bg-white rounded-2xl p-5 md:p-6 border border-border shadow-lg"
          >
            <p className="font-body text-green-700 font-semibold text-base md:text-lg">{t(translations.scholarshipNote)}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ===============================
// SECTION 8: SOCIAL PROOF
// ===============================
const TestimonialsSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-8 md:mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200 px-4 py-2">
              Parent Testimonials
            </Badge>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {t(translations.testimonialsHeadline)}
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-4 md:gap-6"
          >
            {testimonials.map((testimonial, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="border bg-gradient-to-br from-cream/50 to-white shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-5 md:p-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-saffron/20 to-maroon/20 flex items-center justify-center mb-4">
                      <Quote className="h-5 w-5 md:h-6 md:w-6 text-saffron" />
                    </div>
                    <p className="font-body text-foreground italic mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                      "{t(testimonial.quote)}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-maroon to-maroon-dark flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name[0]}
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-foreground text-sm md:text-base">— {testimonial.name}</p>
                        <p className="font-body text-xs md:text-sm text-muted-foreground">{testimonial.location}</p>
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
// SECTION 9: FOUNDER AUTHORITY
// ===============================
const FounderSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-cream/50 to-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-8 md:mb-10">
            <Badge className="mb-4 bg-maroon/10 text-maroon border-maroon/30 px-4 py-2">
              From Our Founder
            </Badge>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {t(translations.founderHeadline)}
            </h2>
          </motion.div>

          <motion.div variants={scaleIn}>
            <Card className="border-0 shadow-2xl bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-saffron via-maroon to-saffron" />
              <CardContent className="p-6 md:p-10">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                  <div className="shrink-0">
                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-saffron/30 shadow-xl">
                      <img 
                        src={founderImage} 
                        alt="Yogesh Bhardwaj" 
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="font-body text-foreground italic text-base md:text-lg lg:text-xl leading-relaxed mb-4 md:mb-6">
                      {t(translations.founderMessage)}
                    </p>
                    <p className="font-heading font-bold text-maroon text-lg">{t(translations.founderName)}</p>
                    <p className="font-body text-sm text-muted-foreground">{t(translations.founderRole)}</p>
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
// SECTION 10: FINAL CTA
// ===============================
const FinalCTASection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-maroon via-maroon-dark to-maroon text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-saffron/20 via-transparent to-transparent" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-saffron/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-saffron/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              {t(translations.finalHeadline)}
            </h2>
          </motion.div>

          <motion.p 
            variants={fadeInUp}
            className="font-body text-base md:text-lg lg:text-xl text-cream/90 mb-8 md:mb-10 whitespace-pre-line leading-relaxed"
          >
            {t(translations.finalBody)}
          </motion.p>

          <motion.div variants={scaleIn}>
            <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-sm md:text-base px-6 md:px-10 py-5 md:py-7 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1"
              >
                <MessageCircle className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3" />
                <span className="leading-tight">{t(translations.heroCTA)}</span>
                <ChevronRight className="h-5 w-5 ml-1 md:ml-2" />
              </Button>
            </a>
          </motion.div>

          <motion.p 
            variants={fadeIn}
            className="font-body text-sm text-cream/70 mt-4 md:mt-6"
          >
            {t(translations.finalCTASubtext)}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

// ===============================
// STICKY MOBILE FOOTER
// ===============================
const StickyMobileFooter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  useEffect(() => {
    const handleScroll = () => {
      const pricingSection = document.getElementById('pricing-section');
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect();
        // Hide when pricing section is visible
        setIsVisible(window.scrollY > 500 && rect.top > window.innerHeight);
      } else {
        setIsVisible(window.scrollY > 500);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-saffron/20 shadow-2xl z-50 p-3 md:hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      transition={{ duration: 0.3 }}
    >
      <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer" className="block">
        <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 rounded-xl shadow-lg text-sm">
          <MessageCircle className="h-5 w-5 mr-2" />
          Talk to Counselor on WhatsApp
        </Button>
      </a>
    </motion.div>
  );
};

// ===============================
// MAIN PAGE COMPONENT
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
      </Helmet>

      <main className="overflow-hidden">
        <HeroSection />
        <ParentPainSection />
        <WhatIsBodhikaSection />
        <TransformationSection />
        <LearningSection />
        <LearningExperienceSection />
        <PricingSection />
        <TestimonialsSection />
        <FounderSection />
        <FinalCTASection />
        <StickyMobileFooter />
      </main>
    </Layout>
  );
};

export default BodhikaLanding;
