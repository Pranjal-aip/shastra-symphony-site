import React from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Sun, TreePine, BookOpen, Heart, Users, Calendar, Sparkles, 
  Music, Dumbbell, Brain, Star, Leaf, Paintbrush, Baby,
  Clock, MapPin, IndianRupee, ArrowRight, ChevronRight, Flame,
  Shield, Swords, Globe, Scale
} from 'lucide-react';
import heroImage from '@/assets/gurukul-camp-2026.jpg';

type T3 = { en: string; hi: string; sa: string };

const tx = {
  heroBadge: { en: '🪔 Summer 2026 · Limited Seats', hi: '🪔 ग्रीष्म 2026 · सीमित सीटें', sa: '🪔 ग्रीष्मकालः 2026 · सीमितानि आसनानि' } as T3,
  heroTitle1: { en: 'Shastrakulam Gurukul', hi: 'शास्त्रकुलम् गुरुकुल', sa: 'शास्त्रकुलम् गुरुकुलम्' } as T3,
  heroTitle2: { en: 'Residential Camp', hi: 'आवासीय शिविर', sa: 'आवासीयशिविरम्' } as T3,
  heroDesc: {
    en: 'A holistic blend of Yoga • Vedic Learning • Nature-based Living • Physical Discipline • Arts • Samskaras for children aged 6–14 years with optional parent participation.',
    hi: '6–14 वर्ष के बच्चों के लिए योग • वैदिक शिक्षा • प्रकृति-आधारित जीवन • शारीरिक अनुशासन • कला • संस्कार का समग्र मिश्रण, माता-पिता की वैकल्पिक भागीदारी के साथ।',
    sa: '६–१४ वर्षीयेभ्यः बालकेभ्यः योगः • वैदिकशिक्षा • प्रकृतिनिष्ठजीवनम् • शारीरिकानुशासनम् • कलाः • संस्काराः इति समग्रं मिश्रणम्, पितृभागीदारीसहितम्।'
  } as T3,
  registerNow: { en: 'Register Now', hi: 'अभी पंजीकरण करें', sa: 'अधुना पञ्जीकरणं कुरुत' } as T3,
  haveQuestions: { en: 'Have Questions?', hi: 'प्रश्न हैं?', sa: 'प्रश्नाः सन्ति?' } as T3,
  dateLabel: { en: 'June 1–15, 2026', hi: 'जून 1–15, 2026', sa: 'जून 1–15, 2026' } as T3,
  agesLabel: { en: 'Ages 6–14', hi: 'आयु 6–14', sa: 'वयः ६–१४' } as T3,
  campusLabel: { en: 'Gurukul Campus', hi: 'गुरुकुल परिसर', sa: 'गुरुकुलपरिसरः' } as T3,

  whyTitle: { en: '🌿 Why This Camp?', hi: '🌿 यह शिविर क्यों?', sa: '🌿 इदं शिविरं किमर्थम्?' } as T3,
  whySubtitle: {
    en: 'Give your child a foundation of Dharma, Discipline, and Direction',
    hi: 'अपने बच्चे को धर्म, अनुशासन और दिशा की नींव दें',
    sa: 'स्वबालकाय धर्मानुशासनदिशानां आधारं प्रयच्छत'
  } as T3,

  offerTitle: { en: '🔥 What Will the Camp Offer?', hi: '🔥 शिविर में क्या मिलेगा?', sa: '🔥 शिविरे किं प्राप्स्यते?' } as T3,
  coreModulesTitle: { en: '🪔 Core Gurukul Modules', hi: '🪔 मुख्य गुरुकुल विभाग', sa: '🪔 मुख्यगुरुकुलविभागाः' } as T3,
  physicalTitle: { en: '⚔️ Physical & Kshatra Training', hi: '⚔️ शारीरिक एवं क्षात्र प्रशिक्षण', sa: '⚔️ शारीरिकक्षात्रप्रशिक्षणम्' } as T3,
  lifeSkillsTitle: { en: '🌱 Jeevan Kaushal (Life Skills)', hi: '🌱 जीवन कौशल', sa: '🌱 जीवनकौशलम्' } as T3,

  parentTitle: { en: '👨‍👩‍👧‍👦 How Will Parents Be Engaged?', hi: '👨‍👩‍👧‍👦 माता-पिता कैसे शामिल होंगे?', sa: '👨‍👩‍👧‍👦 पितरौ कथं सहभागिनौ भविष्यतः?' } as T3,
  parentSubtitle: {
    en: 'Parents are not just observers — they are participants. Strengthening emotional connection and mutual respect.',
    hi: 'माता-पिता केवल दर्शक नहीं — वे सहभागी हैं। भावनात्मक संबंध और पारस्परिक सम्मान को मजबूत करना।',
    sa: 'पितरौ केवलं द्रष्टारौ न — सहभागिनौ स्तः। भावनात्मकसम्बन्धस्य पारस्परिकसम्मानस्य च सुदृढीकरणम्।'
  } as T3,

  scheduleTitle: { en: '🪔 Daily Schedule', hi: '🪔 दैनिक कार्यक्रम', sa: '🪔 दैनिककार्यक्रमः' } as T3,

  feeTitle: { en: '💰 Camp Fee', hi: '💰 शिविर शुल्क', sa: '💰 शिविरशुल्कम्' } as T3,
  perChild: { en: 'per child', hi: 'प्रति बालक', sa: 'प्रतिबालकम्' } as T3,
  parentOption: { en: 'Parent Participation Option Available', hi: 'माता-पिता की भागीदारी का विकल्प उपलब्ध', sa: 'पितृभागीदारीविकल्पः उपलब्धः' } as T3,
  includes: { en: 'Includes:', hi: 'शामिल है:', sa: 'अन्तर्गतम्:' } as T3,
  limitedSeats: { en: '🚀 Register Now – Limited Seats', hi: '🚀 अभी पंजीकरण करें – सीमित सीटें', sa: '🚀 अधुना पञ्जीकरणं कुरुत – सीमितानि आसनानि' } as T3,

  faqTitle: { en: '🪔 Frequently Asked Questions', hi: '🪔 अक्सर पूछे जाने वाले प्रश्न', sa: '🪔 प्रायः पृच्छ्यमानाः प्रश्नाः' } as T3,

  ctaTitle1: { en: 'Give Your Child a Foundation of', hi: 'अपने बच्चे को दें', sa: 'स्वबालकाय प्रयच्छत' } as T3,
  ctaTitle2: { en: 'Dharma, Discipline & Direction', hi: 'धर्म, अनुशासन और दिशा की नींव', sa: 'धर्मानुशासनदिशानां आधारम्' } as T3,
  ctaDesc: {
    en: 'Limited seats available. Register now and be part of a transformative Gurukul experience.',
    hi: 'सीमित सीटें उपलब्ध हैं। अभी पंजीकरण करें और एक परिवर्तनकारी गुरुकुल अनुभव का हिस्सा बनें।',
    sa: 'सीमितानि आसनानि उपलब्धानि। अधुना पञ्जीकरणं कुरुत परिवर्तनात्मकगुरुकुलानुभवस्य भागिनः भवत।'
  } as T3,
};

const whyCards = [
  {
    icon: Shield,
    title: { en: '🔱 Samskara Nirman (Character Formation)', hi: '🔱 संस्कार निर्माण (चरित्र निर्माण)', sa: '🔱 संस्कारनिर्माणम् (चरित्रनिर्माणम्)' } as T3,
    desc: {
      en: 'Building Discipline (Anushasan), Respect (Maryada), and Duty (Kartavya) as the foundation of a child\'s character.',
      hi: 'अनुशासन, मर्यादा और कर्तव्य को बच्चे के चरित्र की नींव के रूप में निर्मित करना।',
      sa: 'अनुशासनं मर्यादा कर्तव्यं च बालकस्य चरित्रस्य आधारत्वेन निर्मातुम्।'
    } as T3,
    gradient: 'from-amber-500/10 to-orange-500/10',
  },
  {
    icon: BookOpen,
    title: { en: '🧠 Vedic Wisdom for Life', hi: '🧠 जीवन के लिए वैदिक ज्ञान', sa: '🧠 जीवनार्थं वैदिकज्ञानम्' } as T3,
    desc: {
      en: 'Children learn foundations of Dharma, Vedic principles of right living, and practical application of values in daily life.',
      hi: 'बच्चे धर्म की नींव, सम्यक् जीवन के वैदिक सिद्धांत और दैनिक जीवन में मूल्यों का व्यावहारिक अनुप्रयोग सीखते हैं।',
      sa: 'बालकाः धर्मस्य आधारान् सम्यग्जीवनस्य वैदिकसिद्धान्तान् दैनिकजीवने मूल्यानां प्रायोगिकानुप्रयोगं च शिक्षन्ते।'
    } as T3,
    gradient: 'from-emerald-500/10 to-green-500/10',
  },
  {
    icon: Heart,
    title: { en: '🧘 Sharir + Man + Buddhi Santulan', hi: '🧘 शरीर + मन + बुद्धि संतुलन', sa: '🧘 शरीरमनोबुद्धिसन्तुलनम्' } as T3,
    desc: {
      en: 'Balanced development — Body (Sharir) for physical strength, Mind (Man) for emotional stability, Intellect (Buddhi) for right thinking.',
      hi: 'संतुलित विकास — शरीर (शारीरिक बल), मन (भावनात्मक स्थिरता), बुद्धि (सम्यक् चिंतन)।',
      sa: 'सन्तुलितविकासः — शरीरं (शारीरिकबलम्), मनः (भावनात्मकस्थिरता), बुद्धिः (सम्यक्चिन्तनम्)।'
    } as T3,
    gradient: 'from-rose-500/10 to-pink-500/10',
  },
  {
    icon: Swords,
    title: { en: '🏹 Kshatra + Brahma Gunas', hi: '🏹 क्षात्र + ब्रह्म गुण', sa: '🏹 क्षात्रब्रह्मगुणाः' } as T3,
    desc: {
      en: 'Development of Courage, Strength, Discipline alongside Knowledge, Logic, and Clarity — the warrior-scholar balance.',
      hi: 'साहस, बल, अनुशासन के साथ-साथ ज्ञान, तर्क और स्पष्टता का विकास — योद्धा-विद्वान् संतुलन।',
      sa: 'साहसबलानुशासनैः सह ज्ञानतर्कस्पष्टतानां विकासः — योद्धाविद्वत्सन्तुलनम्।'
    } as T3,
    gradient: 'from-blue-500/10 to-indigo-500/10',
  },
  {
    icon: Globe,
    title: { en: '🌍 Identity & Cultural Rooting', hi: '🌍 पहचान एवं सांस्कृतिक जड़ें', sa: '🌍 पहचाना सांस्कृतिकमूलनिर्माणं च' } as T3,
    desc: {
      en: 'Helping children understand Bharatiya identity, develop pride in their heritage, and live with dharmic awareness.',
      hi: 'बच्चों को भारतीय पहचान समझने, अपनी विरासत पर गर्व करने और धार्मिक जागरूकता के साथ जीने में सहायता।',
      sa: 'बालकान् भारतीयपहचानं ज्ञातुं स्वपरम्परायां गौरवं प्राप्तुं धार्मिकजागरूकतया जीवितुं च सहायता।'
    } as T3,
    gradient: 'from-violet-500/10 to-purple-500/10',
  },
];

// Core Gurukul Modules
const coreModules = [
  { icon: '🕉️', title: { en: 'Vedic Life Education', hi: 'वैदिक जीवन शिक्षा', sa: 'वैदिकजीवनशिक्षा' } as T3, items: { en: ['Sandhya & Agnihotra practice', 'Mantra uchcharan with meaning', 'Introduction to Vedas & Satyarth Prakash', 'Daily dharmic conduct (Aachar)'], hi: ['सन्ध्या एवं अग्निहोत्र अभ्यास', 'अर्थ सहित मंत्र उच्चारण', 'वेद एवं सत्यार्थ प्रकाश का परिचय', 'दैनिक धार्मिक आचरण (आचार)'], sa: ['सन्ध्याग्निहोत्राभ्यासः', 'अर्थसहितमन्त्रोच्चारणम्', 'वेदसत्यार्थप्रकाशपरिचयः', 'दैनिकधार्मिकाचारः'] } },
  { icon: '🧠', title: { en: 'Buddhi Vikas (Intellectual Training)', hi: 'बुद्धि विकास (बौद्धिक प्रशिक्षण)', sa: 'बुद्धिविकासः (बौद्धिकप्रशिक्षणम्)' } as T3, items: { en: ['Vedic Mathematics', 'Logic & reasoning games', 'Debate & Shastrarth basics'], hi: ['वैदिक गणित', 'तर्क एवं रीज़निंग खेल', 'शास्त्रार्थ एवं वाद-विवाद की मूल बातें'], sa: ['वैदिकगणितम्', 'तर्कयुक्तिक्रीडाः', 'शास्त्रार्थवादविवादमूलानि'] } },
  { icon: '🗣️', title: { en: 'Samskritam Sambhashanam', hi: 'संस्कृतम् सम्भाषणम्', sa: 'संस्कृतम् सम्भाषणम्' } as T3, items: { en: ['Learn Sanskrit through games & activities', 'Daily conversational Sanskrit', 'Shloka memorization'], hi: ['खेल एवं गतिविधियों से संस्कृत सीखना', 'दैनिक संस्कृत सम्भाषण', 'श्लोक कण्ठस्थीकरण'], sa: ['क्रीडाक्रियाभिः संस्कृतशिक्षणम्', 'दैनिकसंस्कृतसम्भाषणम्', 'श्लोककण्ठस्थीकरणम्'] } },
];

// Physical & Kshatra Training
const physicalModules = [
  { icon: '🏹', title: { en: 'Kshatra Vidya', hi: 'क्षात्र विद्या', sa: 'क्षात्रविद्या' } as T3, items: { en: ['Traditional physical drills', 'Danda (stick training)', 'Basic self-defense techniques', 'Strength & stamina building'], hi: ['पारंपरिक शारीरिक अभ्यास', 'दंड (लाठी प्रशिक्षण)', 'बुनियादी आत्मरक्षा तकनीक', 'बल एवं सहनशक्ति निर्माण'], sa: ['पारम्परिकशारीरिकाभ्यासाः', 'दण्डप्रशिक्षणम्', 'मूलभूतात्मरक्षातकनीकाः', 'बलसहनशक्तिनिर्माणम्'] } },
  { icon: '🧘', title: { en: 'Yogabhyas', hi: 'योगाभ्यास', sa: 'योगाभ्यासः' } as T3, items: { en: ['Asana, Pranayama', 'Dhyaan (age-appropriate)', 'Yogic discipline'], hi: ['आसन, प्राणायाम', 'ध्यान (आयु-उपयुक्त)', 'योगिक अनुशासन'], sa: ['आसनम् प्राणायामः', 'ध्यानम् (वयोनुकूलम्)', 'योगिकानुशासनम्'] } },
];

// Life Skills
const lifeSkillModules = [
  { icon: '🌾', title: { en: 'Practical Living', hi: 'व्यावहारिक जीवन', sa: 'व्यावहारिकजीवनम्' } as T3, items: { en: ['Gau Seva & cow-based ecosystem', 'Basic farming exposure', 'Simple satvik cooking'], hi: ['गौ सेवा एवं गो-आधारित पारिस्थितिकी', 'बुनियादी कृषि परिचय', 'सरल सात्विक पाककला'], sa: ['गौसेवा गोआधारितपारिस्थितिकी', 'मूलभूतकृषिपरिचयः', 'सरलसात्त्विकपाककला'] } },
  { icon: '🎨', title: { en: 'Creative Expression', hi: 'रचनात्मक अभिव्यक्ति', sa: 'सृजनात्मकाभिव्यक्तिः' } as T3, items: { en: ['Ramayan & Mahabharat storytelling', 'Role play / enactments', 'Bhajan & music', 'Craft (puppet making, traditional arts)'], hi: ['रामायण एवं महाभारत कथावाचन', 'रोल प्ले / अभिनय', 'भजन एवं संगीत', 'शिल्प (कठपुतली निर्माण, पारंपरिक कला)'], sa: ['रामायणमहाभारतकथावाचनम्', 'अभिनयः', 'भजनसंगीतम्', 'शिल्पम् (कठपुतलीनिर्माणम् पारम्परिककलाः)'] } },
  { icon: '🏞️', title: { en: 'Nature & Heritage', hi: 'प्रकृति एवं विरासत', sa: 'प्रकृतिः परम्परा च' } as T3, items: { en: ['Nature walks & observation', 'Nakshatra & nature awareness', 'Environmental connection'], hi: ['प्रकृति भ्रमण एवं अवलोकन', 'नक्षत्र एवं प्रकृति जागरूकता', 'पर्यावरणीय जुड़ाव'], sa: ['प्रकृतिभ्रमणम् अवलोकनम्', 'नक्षत्रप्रकृतिजागरूकता', 'पर्यावरणसम्बन्धः'] } },
];

const parentEngagement = [
  { icon: Brain, title: { en: 'Parallel Learning Sessions', hi: 'समानांतर शिक्षा सत्र', sa: 'समानान्तरशिक्षासत्राणि' } as T3, desc: { en: 'Sessions on dharmic parenting, discipline building & Vedic lifestyle', hi: 'धार्मिक पालन-पोषण, अनुशासन निर्माण एवं वैदिक जीवनशैली पर सत्र', sa: 'धार्मिकपालनपोषणे अनुशासननिर्माणे वैदिकजीवनशैल्यां च सत्राणि' } as T3 },
  { icon: Users, title: { en: 'Parent–Child Activities', hi: 'माता-पिता–बच्चे गतिविधियाँ', sa: 'पितृ-बालक-क्रियाः' } as T3, desc: { en: 'Joint chanting, shared seva & group activities', hi: 'संयुक्त पाठ, साझा सेवा एवं सामूहिक गतिविधियाँ', sa: 'संयुक्तपाठः साझासेवा सामूहिकक्रियाश्च' } as T3 },
  { icon: Flame, title: { en: 'Satsang with Acharyas', hi: 'आचार्यों के साथ सत्संग', sa: 'आचार्यैः सह सत्सङ्गः' } as T3, desc: { en: 'Interactive discussions & guidance on parenting & family life', hi: 'पालन-पोषण एवं पारिवारिक जीवन पर संवादात्मक चर्चा और मार्गदर्शन', sa: 'पालनपोषणे पारिवारिकजीवने च संवादात्मकचर्चा मार्गदर्शनं च' } as T3 },
  { icon: TreePine, title: { en: 'Gurukul Lifestyle Experience', hi: 'गुरुकुल जीवनशैली अनुभव', sa: 'गुरुकुलजीवनशैल्यनुभवः' } as T3, desc: { en: 'Experience simplicity, structured living & value-based environment', hi: 'सरलता, संरचित जीवन एवं मूल्य-आधारित वातावरण का अनुभव', sa: 'सरलता संरचितजीवनं मूल्याधारितवातावरणं चानुभवत' } as T3 },
  { icon: BookOpen, title: { en: 'Reflection & Takeaways', hi: 'चिंतन एवं सीख', sa: 'चिन्तनं गृहनयनीयानि च' } as T3, desc: { en: 'Practical tools, home routines & long-term guidance', hi: 'व्यावहारिक उपकरण, गृह दिनचर्या एवं दीर्घकालिक मार्गदर्शन', sa: 'व्यावहारिकोपकरणानि गृहदिनचर्या दीर्घकालिकमार्गदर्शनं च' } as T3 },
];

const schedule = [
  { time: { en: '5:30 – 6:30 am', hi: '5:30 – 6:30 प्रातः', sa: '5:30 – 6:30 प्रातः' } as T3, activity: { en: 'Wake up & Hygiene', hi: 'जागरण एवं स्वच्छता', sa: 'जागरणं स्वच्छता च' } as T3 },
  { time: { en: '6:30 – 7:00 am', hi: '6:30 – 7:00 प्रातः', sa: '6:30 – 7:00 प्रातः' } as T3, activity: { en: 'Sandhya & Agnihotra', hi: 'सन्ध्या एवं अग्निहोत्र', sa: 'सन्ध्या अग्निहोत्रं च' } as T3 },
  { time: { en: '7:00 – 7:30 am', hi: '7:00 – 7:30 प्रातः', sa: '7:00 – 7:30 प्रातः' } as T3, activity: { en: 'Gau Seva', hi: 'गौ सेवा', sa: 'गौसेवा' } as T3 },
  { time: { en: '7:30 – 8:30 am', hi: '7:30 – 8:30 प्रातः', sa: '7:30 – 8:30 प्रातः' } as T3, activity: { en: 'Yogabhyasa', hi: 'योगाभ्यास', sa: 'योगाभ्यासः' } as T3 },
  { time: { en: '8:30 – 9:00 am', hi: '8:30 – 9:00 प्रातः', sa: '8:30 – 9:00 प्रातः' } as T3, activity: { en: 'Breakfast (Satvik)', hi: 'नाश्ता (सात्विक)', sa: 'प्रातराशः (सात्त्विकः)' } as T3 },
  { time: { en: '9:00 – 12:00 pm', hi: '9:00 – 12:00 अपराह्न', sa: '9:00 – 12:00 अपराह्णः' } as T3, activity: { en: 'Session 1 – Learning Modules', hi: 'सत्र 1 – शिक्षण मॉड्यूल', sa: 'सत्रम् 1 – शिक्षणविभागाः' } as T3 },
  { time: { en: '12:00 – 1:00 pm', hi: '12:00 – 1:00 अपराह्न', sa: '12:00 – 1:00 अपराह्णः' } as T3, activity: { en: 'Lunch', hi: 'दोपहर का भोजन', sa: 'मध्याह्नभोजनम्' } as T3 },
  { time: { en: '1:00 – 2:30 pm', hi: '1:00 – 2:30 अपराह्न', sa: '1:00 – 2:30 अपराह्णः' } as T3, activity: { en: 'Session 2', hi: 'सत्र 2', sa: 'सत्रम् 2' } as T3 },
  { time: { en: '2:30 – 3:00 pm', hi: '2:30 – 3:00 अपराह्न', sa: '2:30 – 3:00 अपराह्णः' } as T3, activity: { en: 'Yoganidra', hi: 'योगनिद्रा', sa: 'योगनिद्रा' } as T3 },
  { time: { en: '3:00 – 4:30 pm', hi: '3:00 – 4:30 अपराह्न', sa: '3:00 – 4:30 अपराह्णः' } as T3, activity: { en: 'Session 3', hi: 'सत्र 3', sa: 'सत्रम् 3' } as T3 },
  { time: { en: '4:30 – 5:30 pm', hi: '4:30 – 5:30 अपराह्न', sa: '4:30 – 5:30 अपराह्णः' } as T3, activity: { en: 'Session 4', hi: 'सत्र 4', sa: 'सत्रम् 4' } as T3 },
  { time: { en: '5:30 – 6:30 pm', hi: '5:30 – 6:30 सायं', sa: '5:30 – 6:30 सायम्' } as T3, activity: { en: 'Kreeda (Games)', hi: 'क्रीड़ा (खेल)', sa: 'क्रीडा (खेलाः)' } as T3 },
  { time: { en: '6:30 – 8:00 pm', hi: '6:30 – 8:00 सायं', sa: '6:30 – 8:00 सायम्' } as T3, activity: { en: 'Bhajan, Sandhya, Agnihotra', hi: 'भजन, सन्ध्या, अग्निहोत्र', sa: 'भजनम् सन्ध्या अग्निहोत्रं च' } as T3 },
  { time: { en: '8:00 pm onwards', hi: '8:00 सायं से आगे', sa: '8:00 सायम् अनन्तरम्' } as T3, activity: { en: 'Dinner, Reflection, Discussions', hi: 'रात्रि भोजन, चिंतन, चर्चा', sa: 'रात्रिभोजनम् चिन्तनम् चर्चा च' } as T3 },
];

const includesItems = [
  { en: 'Accommodation', hi: 'आवास', sa: 'आवासः' },
  { en: 'Food (Satvik)', hi: 'भोजन (सात्विक)', sa: 'भोजनम् (सात्त्विकम्)' },
  { en: 'All sessions & materials', hi: 'सभी सत्र एवं सामग्री', sa: 'सर्वसत्राणि सामग्री च' },
];

const faqs = [
  { q: { en: 'Where is the camp located?', hi: 'शिविर कहाँ है?', sa: 'शिविरं कुत्र अस्ति?' } as T3, a: { en: 'At a peaceful natural Gurukul-style campus. Exact location will be shared after registration.', hi: 'एक शांत प्राकृतिक गुरुकुल-शैली परिसर में। सटीक स्थान पंजीकरण के बाद साझा किया जाएगा।', sa: 'शान्ते प्राकृतिके गुरुकुलशैलीपरिसरे। सम्यक् स्थानं पञ्जीकरणानन्तरं सूचयिष्यते।' } as T3 },
  { q: { en: 'Can parents join?', hi: 'क्या माता-पिता शामिल हो सकते हैं?', sa: 'किं पितरौ सहभागिनौ भवितुं शक्नुतः?' } as T3, a: { en: 'Yes! Parents can participate in a structured parallel module designed for family transformation.', hi: 'हाँ! माता-पिता पारिवारिक परिवर्तन के लिए बनाए गए संरचित समानांतर मॉड्यूल में भाग ले सकते हैं।', sa: 'आम्! पितरौ पारिवारिकपरिवर्तनार्थं निर्मिते संरचिते समानान्तरविभागे भागं ग्रहीतुं शक्नुवन्ति।' } as T3 },
  { q: { en: 'What kind of food is provided?', hi: 'किस प्रकार का भोजन दिया जाता है?', sa: 'कीदृशं भोजनं प्रदीयते?' } as T3, a: { en: 'Simple, healthy satvik meals prepared with care and hygiene.', hi: 'सरल, स्वस्थ सात्विक भोजन देखभाल और स्वच्छता के साथ तैयार किया जाता है।', sa: 'सरलं स्वस्थं सात्त्विकभोजनं यत्नेन स्वच्छतया च सज्जीक्रियते।' } as T3 },
  { q: { en: 'What about accommodation?', hi: 'आवास के बारे में क्या?', sa: 'आवासविषये किम्?' } as T3, a: { en: 'Clean, safe, Gurukul-style stay arrangements are included in the fee.', hi: 'स्वच्छ, सुरक्षित, गुरुकुल-शैली आवास व्यवस्था शुल्क में शामिल है।', sa: 'स्वच्छः सुरक्षितः गुरुकुलशैल्यावासव्यवस्था शुल्के अन्तर्गता अस्ति।' } as T3 },
  { q: { en: 'What is the age group?', hi: 'आयु वर्ग क्या है?', sa: 'वयोवर्गः कः?' } as T3, a: { en: 'Children aged 6–14 years. Activities are designed for different age cohorts within this range.', hi: '6–14 वर्ष के बच्चे। इस सीमा के भीतर विभिन्न आयु समूहों के लिए गतिविधियाँ बनाई गई हैं।', sa: '६–१४ वर्षीयाः बालकाः। अस्मिन् परिधौ विविधवयोवर्गेभ्यः क्रियाः निर्मिताः।' } as T3 },
  { q: { en: 'What is included in the fee?', hi: 'शुल्क में क्या शामिल है?', sa: 'शुल्के किं किम् अन्तर्गतम्?' } as T3, a: { en: 'Accommodation, food (Satvik), all sessions & materials are included. Fee ranges ₹12,000 – ₹18,000 per child.', hi: 'आवास, भोजन (सात्विक), सभी सत्र और सामग्री शामिल हैं। शुल्क ₹12,000 – ₹18,000 प्रति बालक।', sa: 'आवासः भोजनम् (सात्त्विकम्) सर्वसत्राणि सामग्री च अन्तर्गतानि। शुल्कम् ₹12,000 – ₹18,000 प्रतिबालकम्।' } as T3 },
];

const GurukulCamp2026: React.FC = () => {
  const { t } = useLanguage();

  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      <SEO
        title={{ en: 'Gurukul Residential Camp 2026 – Shastrakulam', hi: 'गुरुकुल आवासीय शिविर 2026 – शास्त्रकुलम्', sa: 'गुरुकुलम् आवासीयशिविरम् 2026 – शास्त्रकुलम्' }}
        description={{ en: 'Join the Shastrakulam Gurukul Residential Camp 2026 for children aged 6–14. Vedic learning, yoga, samskaras, nature-based living & parent participation.', hi: 'शास्त्रकुलम् गुरुकुल आवासीय शिविर 2026 में शामिल हों। 6–14 वर्ष के बच्चों के लिए वैदिक शिक्षा, योग, संस्कार और प्रकृति-आधारित जीवन।', sa: 'शास्त्रकुलम् गुरुकुलम् आवासीयशिविरम् 2026 सहभागिनः भवत। ६–१४ वर्षीयबालकेभ्यः वैदिकशिक्षा योगः संस्काराः प्रकृतिनिष्ठजीवनं च।' }}
        keywords="gurukul camp, vedic camp for kids, residential camp India, yoga camp children, samskara camp, shastrakulam"
        url="/camps/gurukul-2026"
      />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Gurukul Camp" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl space-y-6">
            <Badge variant="outline" className="bg-accent/20 text-accent border-accent/40 text-sm px-4 py-1">
              {t(tx.heroBadge)}
            </Badge>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {t(tx.heroTitle1)}<br />
              <span className="text-primary">{t(tx.heroTitle2)}</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              {t(tx.heroDesc)}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button variant="saffron" size="lg" onClick={scrollToRegister}>
                {t(tx.registerNow)} <ArrowRight className="h-5 w-5" />
              </Button>
              <Link to="/contact">
                <Button variant="maroon-outline" size="lg">
                  {t(tx.haveQuestions)}
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-accent" /> {t(tx.dateLabel)}</span>
              <span className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> {t(tx.agesLabel)}</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> {t(tx.campusLabel)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY THIS CAMP ===== */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">{t(tx.whyTitle)}</h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">{t(tx.whySubtitle)}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyCards.map((c, i) => (
              <Card key={i} className="border-border/50 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                <CardContent className={`p-6 bg-gradient-to-br ${c.gradient} rounded-lg`}>
                  <c.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{t(c.title)}</h3>
                  <p className="font-body text-muted-foreground text-sm">{t(c.desc)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CHARACTER & LEADERSHIP ===== */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-6">{t(tx.characterTitle)}</h2>
          <p className="font-body text-muted-foreground mb-8">{t(tx.characterDesc)}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {characterValues.map((v, i) => (
              <Badge key={i} variant="outline" className="text-base px-5 py-2 border-primary/30 text-primary font-semibold">
                {t(v)}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT THE CAMP OFFERS ===== */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">{t(tx.offerTitle)}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {offerings.map((o, i) => (
              <Card key={i} className="border-border/50 hover:shadow-card transition-shadow">
                <CardContent className="p-5">
                  <span className="text-3xl mb-3 block">{o.icon}</span>
                  <h3 className="font-heading font-bold text-foreground mb-1">{t(o.title)}</h3>
                  <p className="font-body text-muted-foreground text-sm">{t(o.desc)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PARENT ENGAGEMENT ===== */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">{t(tx.parentTitle)}</h2>
            <p className="font-body text-muted-foreground max-w-xl mx-auto">{t(tx.parentSubtitle)}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {parentEngagement.map((p, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border/50 shadow-soft">
                <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                  <p.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-1">{t(p.title)}</h3>
                  <p className="font-body text-muted-foreground text-sm">{t(p.desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DAILY SCHEDULE ===== */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">{t(tx.scheduleTitle)}</h2>
          </div>
          <div className="space-y-0">
            {schedule.map((s, i) => (
              <div key={i} className={`flex items-center gap-4 p-4 ${i % 2 === 0 ? 'bg-card' : 'bg-background'} ${i === 0 ? 'rounded-t-2xl' : ''} ${i === schedule.length - 1 ? 'rounded-b-2xl' : ''} border-x border-b first:border-t border-border/50`}>
                <div className="flex-shrink-0 w-44">
                  <span className="font-body text-sm font-semibold text-primary flex items-center gap-2">
                    <Clock className="h-4 w-4" /> {t(s.time)}
                  </span>
                </div>
                <span className="font-body text-foreground">{t(s.activity)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="register" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <Card className="border-2 border-primary/30 shadow-elevated overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-center">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground">{t(tx.feeTitle)}</h2>
              </div>
              <CardContent className="p-8 space-y-6 text-center">
                <div>
                  <span className="font-heading text-4xl font-bold text-foreground">₹12,000 – ₹18,000</span>
                  <p className="font-body text-muted-foreground mt-1">{t(tx.perChild)}</p>
                </div>
                <Badge variant="outline" className="text-sm px-4 py-1 border-accent/40 text-accent">
                  {t(tx.parentOption)}
                </Badge>
                <div className="text-left space-y-2 bg-secondary/30 rounded-xl p-5">
                  <p className="font-heading font-semibold text-foreground mb-3">{t(tx.includes)}</p>
                  {includesItems.map((item, i) => (
                    <p key={i} className="flex items-center gap-2 font-body text-muted-foreground text-sm">
                      <ChevronRight className="h-4 w-4 text-accent flex-shrink-0" /> {t(item)}
                    </p>
                  ))}
                </div>
                <a href="https://wa.me/919876543210?text=I%20am%20interested%20in%20Gurukul%20Camp%202026" target="_blank" rel="noopener noreferrer">
                  <Button variant="saffron" size="xl" className="w-full">
                    {t(tx.limitedSeats)} <ArrowRight className="h-5 w-5" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== FAQs ===== */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">{t(tx.faqTitle)}</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border/50 px-5 shadow-soft">
                <AccordionTrigger className="font-heading font-semibold text-foreground hover:no-underline">
                  {t(f.q)}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground">
                  {t(f.a)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t(tx.ctaTitle1)}<br />
            <span className="text-primary">{t(tx.ctaTitle2)}</span>
          </h2>
          <p className="font-body text-muted-foreground mb-8">{t(tx.ctaDesc)}</p>
          <Button variant="saffron" size="xl" onClick={scrollToRegister}>
            🚀 {t(tx.registerNow)} <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default GurukulCamp2026;
