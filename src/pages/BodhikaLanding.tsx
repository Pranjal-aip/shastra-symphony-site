import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  MessageCircle, 
  Users, 
  Clock, 
  Award, 
  Heart, 
  Star, 
  Brain, 
  Book, 
  Calendar,
  Video,
  Play,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  Sparkles,
  Globe,
  BookOpen,
  Compass,
  Flower2,
  Sun,
  Flame,
  Shield,
  Target
} from 'lucide-react';

// Import images
import heroGurukul from '@/assets/bodhika/hero-gurukul.jpg';
import onlineLearning from '@/assets/bodhika/online-learning.jpg';
import founderImage from '@/assets/bodhika/founder-yogesh.jpg';
import gitaScene from '@/assets/bodhika/gita-scene.jpg';
import ramayanaScene from '@/assets/bodhika/ramayana-scene.jpg';
import mahabharataScene from '@/assets/bodhika/mahabharata-scene.jpg';
import vedasTexts from '@/assets/bodhika/vedas-texts.jpg';
import mantrasScene from '@/assets/bodhika/mantras-scene.jpg';
import sanskarScene from '@/assets/bodhika/sanskar-scene.jpg';
import heroMeditation from '@/assets/bodhika/hero-meditation.jpg';

// WhatsApp number for counselor
const WHATSAPP_NUMBER = '919674916567';
const WHATSAPP_COUNSELOR_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20want%20to%20know%20more%20about%20the%20Bodhika%20Sanatan%20Dharma%20program%20for%20my%20child.`;

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

// Course carousel images with titles
const courseModules = [
  { image: vedasTexts, title: 'Sacred Texts', titleSa: 'सनातन ग्रन्थ' },
  { image: ramayanaScene, title: 'Epic Stories', titleSa: 'महाकाव्य कथाएं' },
  { image: gitaScene, title: 'Gita Wisdom', titleSa: 'गीता ज्ञान' },
  { image: mantrasScene, title: 'Shloka Chanting', titleSa: 'श्लोक पाठ' },
  { image: sanskarScene, title: 'Values & Sanskar', titleSa: 'मूल्य संस्कार' },
  { image: mahabharataScene, title: 'Dharmic Living', titleSa: 'धर्म जीवन' },
];

// Translations
const translations = {
  metaTitle: {
    en: 'Bodhika - 1-Year Sanatan Dharma Program for Children | Shastrakulam',
    hi: 'बोधिका - बच्चों के लिए 1 वर्षीय सनातन धर्म कार्यक्रम | शास्त्रकुलम्',
    sa: 'बोधिका - बालकानां कृते एकवर्षीयं सनातनधर्मकार्यक्रमम् | शास्त्रकुलम्'
  },
  metaDescription: {
    en: 'Build Sanskar, self-discipline, emotional balance, and cultural confidence in children aged 6-12 through authentic Shastric wisdom. March 2026 batch - Only 70 seats.',
    hi: '6-12 वर्ष के बच्चों में संस्कार, आत्म-अनुशासन, भावनात्मक संतुलन और सांस्कृतिक आत्मविश्वास का निर्माण करें।',
    sa: '६-१२ वर्षीयेषु बालकेषु संस्कारं आत्मानुशासनं भावनात्मकसन्तुलनं च निर्मातुं प्रामाणिकशास्त्रीयज्ञानेन।'
  },
  heroSubtitle: {
    en: 'A Shastrakulam Initiative',
    hi: 'एक शास्त्रकुलम पहल',
    sa: 'शास्त्रकुलम-उद्यमः'
  },
  heroTitle: {
    en: 'Bodhika',
    hi: 'बोधिका',
    sa: 'बोधिका'
  },
  heroTagline: {
    en: 'Awakening the Light of Dharma',
    hi: 'धर्म के प्रकाश को जागृत करना',
    sa: 'धर्मज्योतिः प्रबोधनम्'
  },
  heroDescription: {
    en: 'A one-year transformative journey for children aged 6-12, rooted in timeless Vedic wisdom and designed for the modern world.',
    hi: '6-12 वर्ष के बच्चों के लिए एक वर्ष की परिवर्तनकारी यात्रा, शाश्वत वैदिक ज्ञान में निहित और आधुनिक दुनिया के लिए डिज़ाइन की गई।',
    sa: '६-१२ वर्षीयबालकानां कृते एकवर्षीया परिवर्तनयात्रा, सनातनवैदिकज्ञाने प्रतिष्ठिता।'
  },
  batchInfo: {
    en: 'March 2026 • Limited 70 Seats',
    hi: 'मार्च 2026 • सीमित 70 सीटें',
    sa: 'मार्च २०२६ • ७० आसनानि'
  },
  applyNow: {
    en: 'Enroll Your Child',
    hi: 'अभी नामांकन करें',
    sa: 'नामाङ्कनं कुरुत'
  },
  talkToCounselor: {
    en: 'Talk to Counselor',
    hi: 'परामर्शदाता से बात करें',
    sa: 'परामर्शकेन सह वदत'
  },
  // Quick Info
  ageGroup: {
    en: 'Age',
    hi: 'आयु',
    sa: 'आयुः'
  },
  ageValue: {
    en: '6-12 yrs',
    hi: '6-12 वर्ष',
    sa: '६-१२ वर्षाणि'
  },
  duration: {
    en: 'Duration',
    hi: 'अवधि',
    sa: 'कालः'
  },
  durationValue: {
    en: '12 Months',
    hi: '12 महीने',
    sa: '१२ मासाः'
  },
  schedule: {
    en: 'Schedule',
    hi: 'समय',
    sa: 'समयः'
  },
  scheduleValue: {
    en: 'Weekends',
    hi: 'सप्ताहांत',
    sa: 'सप्ताहान्ते'
  },
  mode: {
    en: 'Mode',
    hi: 'माध्यम',
    sa: 'प्रकारः'
  },
  modeValue: {
    en: 'Live Online',
    hi: 'लाइव ऑनलाइन',
    sa: 'प्रत्यक्षम्'
  },
  // Problem Section
  problemTitle: {
    en: 'The Challenge Parents Face Today',
    hi: 'आज माता-पिता के सामने चुनौती',
    sa: 'अद्य पितृमातृणां समक्षं आह्वानम्'
  },
  problem1: {
    en: 'Children losing touch with cultural roots',
    hi: 'बच्चे सांस्कृतिक जड़ों से दूर हो रहे हैं',
    sa: 'बालाः सांस्कृतिकमूलेभ्यः विमुखाः'
  },
  problem2: {
    en: 'Excessive screen time & digital distractions',
    hi: 'अत्यधिक स्क्रीन टाइम और डिजिटल विकर्षण',
    sa: 'अत्यधिकं पटलसमयम् आंकिकविक्षेपाश्च'
  },
  problem3: {
    en: 'Stress, anxiety & lack of inner peace',
    hi: 'तनाव, चिंता और आंतरिक शांति की कमी',
    sa: 'तनावः चिन्ता आन्तरिकशान्त्यभावश्च'
  },
  problem4: {
    en: 'Weak discipline and scattered focus',
    hi: 'कमजोर अनुशासन और बिखरा हुआ ध्यान',
    sa: 'दुर्बलम् अनुशासनं विकीर्णं ध्यानं च'
  },
  // Solution Section
  solutionTitle: {
    en: 'Bodhika Transforms Your Child',
    hi: 'बोधिका आपके बच्चे को रूपांतरित करती है',
    sa: 'बोधिका भवतः बालं परिवर्तयति'
  },
  solution1: {
    en: 'Strong moral foundation & samskaras',
    hi: 'मजबूत नैतिक आधार और संस्कार',
    sa: 'दृढं नैतिकाधारं संस्काराश्च'
  },
  solution2: {
    en: 'Deep cultural pride & identity',
    hi: 'गहरा सांस्कृतिक गौरव और पहचान',
    sa: 'गभीरं सांस्कृतिकगौरवं स्वत्वं च'
  },
  solution3: {
    en: 'Better discipline, focus & confidence',
    hi: 'बेहतर अनुशासन, ध्यान और आत्मविश्वास',
    sa: 'उत्तमम् अनुशासनं ध्यानम् आत्मविश्वासश्च'
  },
  solution4: {
    en: 'Inner clarity & emotional balance',
    hi: 'आंतरिक स्पष्टता और भावनात्मक संतुलन',
    sa: 'आन्तरिकं स्पष्टत्वं भावात्मकं सन्तुलनं च'
  },
  // Demo Section
  demoTitle: {
    en: 'See Our Teaching in Action',
    hi: 'हमारी शिक्षण पद्धति देखें',
    sa: 'अस्माकं शिक्षणपद्धतिं पश्यत'
  },
  demoDescription: {
    en: 'Our approach blends storytelling, interactive activities, and shloka chanting to make learning joyful and memorable.',
    hi: 'हमारा दृष्टिकोण कहानी, गतिविधियों और श्लोक पाठ को मिलाकर सीखने को आनंदमय बनाता है।',
    sa: 'अस्माकं दृष्टिकोणः कथाभिः क्रियाभिः श्लोकपाठेन च शिक्षणम् आनन्दप्रदं करोति।'
  },
  // Guru Section
  guruTitle: {
    en: 'Your Guide on This Journey',
    hi: 'इस यात्रा में आपके मार्गदर्शक',
    sa: 'अस्याः यात्रायाः मार्गदर्शकः'
  },
  guruName: {
    en: 'Yogesh Bhardwaj',
    hi: 'योगेश भारद्वाज',
    sa: 'योगेशभारद्वाजः'
  },
  guruDescription: {
    en: 'Founder of Shastrakulam, Yogesh ji is a passionate educator with deep roots in Shastric wisdom. His mastery spans the Purāṇas, Itihāsas, and the timeless teachings of the Bhagavadgītā. He brings years of experience in teaching young learners with an engaging, age-appropriate approach.',
    hi: 'शास्त्रकुलम के संस्थापक, योगेश जी शास्त्रीय ज्ञान में गहरी जड़ों वाले उत्साही शिक्षक हैं। उनकी महारत पुराणों, इतिहासों और भगवद्गीता तक फैली है।',
    sa: 'शास्त्रकुलमस्य संस्थापकः योगेशमहाभागः शास्त्रीयज्ञाने गहनमूलितः उत्साही शिक्षकः अस्ति।'
  },
  // Curriculum Section
  curriculumTitle: {
    en: 'What Your Child Will Explore',
    hi: 'आपका बच्चा क्या सीखेगा',
    sa: 'भवतः सन्तानः किं शिक्ष्यते'
  },
  curriculum1Title: {
    en: 'Dharma Kathā',
    hi: 'धर्म कथा',
    sa: 'धर्मकथा'
  },
  curriculum1Subtitle: {
    en: 'Divine Stories & Characters',
    hi: 'दिव्य कहानियां और चरित्र',
    sa: 'दिव्यकथाः पात्राणि च'
  },
  curriculum1Includes: {
    en: 'Stories of Ganesha, Krishna, Hanuman, Prahlāda, Dhruva • Rāmāyaṇa and Mahābhārata epics • Daśāvatāra tales',
    hi: 'गणेश, कृष्ण, हनुमान, प्रह्लाद, ध्रुव की कहानियां • रामायण और महाभारत • दशावतार',
    sa: 'गणेश-कृष्ण-हनुमान-प्रह्लाद-ध्रुवकथाः • रामायणमहाभारतम् • दशावतारकथाः'
  },
  curriculum2Title: {
    en: 'Grantha Parichaya',
    hi: 'ग्रन्थ परिचय',
    sa: 'ग्रन्थपरिचयः'
  },
  curriculum2Subtitle: {
    en: 'Sacred Texts Introduction',
    hi: 'पवित्र ग्रन्थ परिचय',
    sa: 'पवित्रग्रन्थपरिचयः'
  },
  curriculum2Includes: {
    en: 'Overview of Vedas, Purāṇas, Rāmāyaṇa, Mahābhārata, Bhagavad Gītā • Selected shlokas with meanings',
    hi: 'वेद, पुराण, रामायण, महाभारत, भगवद्गीता का परिचय • अर्थ सहित श्लोक',
    sa: 'वेदपुराणरामायणमहाभारतभगवद्गीताविषये • अर्थसहितश्लोकाः'
  },
  curriculum3Title: {
    en: 'Jñāna Vijñāna',
    hi: 'ज्ञान विज्ञान',
    sa: 'ज्ञानविज्ञानम्'
  },
  curriculum3Subtitle: {
    en: 'Ancient Sciences & Cosmic Knowledge',
    hi: 'प्राचीन विज्ञान और ब्रह्मांडीय ज्ञान',
    sa: 'प्राचीनविज्ञानं ब्रह्माण्डज्ञानं च'
  },
  curriculum3Includes: {
    en: 'Basics of Jyotiṣa — Rāśi, Nakṣatra, Tithi • Concept of 4 Yugas • Cosmic order through stories',
    hi: 'ज्योतिष मूल बातें — राशि, नक्षत्र, तिथि • 4 युग • कथाओं से ब्रह्मांडीय व्यवस्था',
    sa: 'ज्योतिषमूलतत्त्वानि — राशयः नक्षत्राणि • चतुर्युगाः • कथाभिः ब्रह्माण्डव्यवस्था'
  },
  curriculum4Title: {
    en: 'Saṃskāra & Śraddhā',
    hi: 'संस्कार और श्रद्धा',
    sa: 'संस्कारः श्रद्धा च'
  },
  curriculum4Subtitle: {
    en: 'Values, Virtues & Devotion',
    hi: 'मूल्य, गुण और भक्ति',
    sa: 'मूल्यानि गुणाः भक्तिश्च'
  },
  curriculum4Includes: {
    en: 'Daily shloka practice • Character stories from Rāmāyaṇa & Bhāgavata • Reflection on virtues',
    hi: 'दैनिक श्लोक अभ्यास • रामायण व भागवत से चरित्र कथाएं • गुणों पर चिंतन',
    sa: 'दैनिकश्लोकाभ्यासः • रामायणभागवतकथाः • गुणचिन्तनम्'
  },
  // Benefits Section
  whyTitle: {
    en: 'Why Your Child Needs This',
    hi: 'आपके बच्चे को यह क्यों चाहिए',
    sa: 'भवतः सन्तानाय किमर्थम्'
  },
  benefit1Title: {
    en: 'Strong Saṃskāras',
    hi: 'मजबूत संस्कार',
    sa: 'दृढसंस्काराः'
  },
  benefit1Desc: {
    en: 'Honesty, respect, kindness through stories',
    hi: 'कहानियों से ईमानदारी, सम्मान, दया',
    sa: 'कथाभिः सत्यं आदरं दयां च'
  },
  benefit2Title: {
    en: 'Bhāratīya Roots',
    hi: 'भारतीय जड़ें',
    sa: 'भारतीयमूलानि'
  },
  benefit2Desc: {
    en: 'Connection with epics, deities & festivals',
    hi: 'महाकाव्य, देवताओं और त्योहारों से जुड़ाव',
    sa: 'महाकाव्यैः देवैः उत्सवैश्च सम्बन्धः'
  },
  benefit3Title: {
    en: 'Focus & Confidence',
    hi: 'ध्यान और आत्मविश्वास',
    sa: 'ध्यानम् आत्मविश्वासश्च'
  },
  benefit3Desc: {
    en: 'Chanting and reflection build calm minds',
    hi: 'पाठ और चिंतन से शांत मन',
    sa: 'पाठचिन्तनाभ्यां शान्तमनः'
  },
  benefit4Title: {
    en: 'Daily Discipline',
    hi: 'दैनिक अनुशासन',
    sa: 'दैनिकानुशासनम्'
  },
  benefit4Desc: {
    en: 'Builds steady routines & responsibility',
    hi: 'स्थिर दिनचर्या और जिम्मेदारी',
    sa: 'स्थिरदिनचर्या उत्तरदायित्वं च'
  },
  // Pricing Section
  pricingTitle: {
    en: 'Choose Your Plan',
    hi: 'अपनी योजना चुनें',
    sa: 'स्वयोजनां चिनुत'
  },
  focusedBatch: {
    en: 'Focused Batch',
    hi: 'फोकस्ड बैच',
    sa: 'केन्द्रितवर्गः'
  },
  focusedDesc: {
    en: 'Small groups (12 students) for personalized attention',
    hi: 'व्यक्तिगत ध्यान के लिए छोटे समूह (12 छात्र)',
    sa: 'व्यक्तिगतध्यानार्थं लघुसमूहाः (१२ छात्राः)'
  },
  focusedPrice: {
    en: '₹15,000',
    hi: '₹15,000',
    sa: '₹१५,०००'
  },
  groupBatch: {
    en: 'Group Batch',
    hi: 'ग्रुप बैच',
    sa: 'समूहवर्गः'
  },
  groupDesc: {
    en: 'Learn together in a vibrant community',
    hi: 'जीवंत समुदाय में साथ सीखें',
    sa: 'सजीवसमुदाये सह शिक्षध्वम्'
  },
  groupPrice: {
    en: '₹6,000',
    hi: '₹6,000',
    sa: '₹६,०००'
  },
  pricingFeature1: {
    en: '48 Live Classes',
    hi: '48 लाइव कक्षाएं',
    sa: '४८ प्रत्यक्षकक्षाः'
  },
  pricingFeature2: {
    en: '1-year access',
    hi: '1 वर्ष एक्सेस',
    sa: 'एकवर्षप्रवेशः'
  },
  pricingFeature3: {
    en: 'Community access',
    hi: 'कम्युनिटी एक्सेस',
    sa: 'समुदायप्रवेशः'
  },
  pricingFeature4: {
    en: 'Certificate',
    hi: 'प्रमाणपत्र',
    sa: 'प्रमाणपत्रम्'
  },
  pricingFeature5: {
    en: 'WhatsApp support',
    hi: 'WhatsApp सपोर्ट',
    sa: 'WhatsApp-साहाय्यम्'
  },
  recommended: {
    en: 'Recommended',
    hi: 'अनुशंसित',
    sa: 'अनुशंसितः'
  },
  perYear: {
    en: '/year',
    hi: '/वर्ष',
    sa: '/वर्षम्'
  },
  // Contact Section
  contactTitle: {
    en: 'Ready to Begin?',
    hi: 'शुरू करने के लिए तैयार?',
    sa: 'आरम्भाय सज्जाः?'
  },
  contactSubtitle: {
    en: 'Connect with us on WhatsApp',
    hi: 'WhatsApp पर हमसे जुड़ें',
    sa: 'WhatsApp-द्वारा अस्माभिः सह युज्यध्वम्'
  },
  // Footer quote
  footerQuote: {
    en: 'तमसो मा ज्योतिर्गमय।',
    hi: 'तमसो मा ज्योतिर्गमय।',
    sa: 'तमसो मा ज्योतिर्गमय।'
  },
  footerQuoteMeaning: {
    en: 'Lead me from darkness to light.',
    hi: 'मुझे अंधकार से प्रकाश की ओर ले चलो।',
    sa: 'अन्धकारात् प्रकाशं प्रति मां नय।'
  }
};

// ===============================
// HERO SECTION
// ===============================
const HeroSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % courseModules.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % courseModules.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + courseModules.length) % courseModules.length);

  return (
    <section className="relative min-h-[85vh] bg-gradient-to-br from-background via-secondary/30 to-background overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm font-medium border-primary/30 text-primary">
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                {t(translations.heroSubtitle)}
              </Badge>
            </motion.div>
            
            {/* Main Title */}
            <motion.h1 
              variants={fadeInUp}
              className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold mb-3"
            >
              <span className="text-primary">बोधिका</span>
            </motion.h1>
            
            <motion.h2 
              variants={fadeInUp}
              className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground/90 mb-4"
            >
              {t(translations.heroTagline)}
            </motion.h2>

            {/* Description */}
            <motion.p 
              variants={fadeInUp}
              className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl"
            >
              {t(translations.heroDescription)}
            </motion.p>

            {/* Batch Info */}
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-2 mb-8"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
              </span>
              <span className="font-body text-sm font-semibold text-foreground">{t(translations.batchInfo)}</span>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  {t(translations.applyNow)}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline"
                  size="lg"
                  className="font-semibold text-base px-6 py-6 rounded-xl border-2"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {t(translations.talkToCounselor)}
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - Image Carousel */}
          <motion.div 
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Main Slide */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img 
                    src={courseModules[currentSlide].image} 
                    alt={courseModules[currentSlide].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-accent font-body text-sm font-semibold uppercase tracking-wider mb-1">
                      Module {currentSlide + 1}
                    </p>
                    <h3 className="text-white font-heading text-2xl font-bold">
                      {courseModules[currentSlide].title}
                    </h3>
                    <p className="text-white/80 font-heading text-lg">
                      {courseModules[currentSlide].titleSa}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/95 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-background transition-all z-10 border border-border"
              >
                <ChevronLeft className="w-6 h-6 text-foreground" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/95 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-background transition-all z-10 border border-border"
              >
                <ChevronRight className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Carousel Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {courseModules.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-primary/30 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ===============================
// QUICK INFO STRIP
// ===============================
const QuickInfoStrip = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  const infoItems = [
    { icon: Users, label: translations.ageGroup, value: translations.ageValue },
    { icon: Clock, label: translations.duration, value: translations.durationValue },
    { icon: Calendar, label: translations.schedule, value: translations.scheduleValue },
    { icon: Video, label: translations.mode, value: translations.modeValue },
  ];

  return (
    <section className="bg-primary py-6">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {infoItems.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              className="flex items-center gap-3 justify-center md:justify-start"
            >
              <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                <item.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-primary-foreground/70 text-xs uppercase tracking-wide">{t(item.label)}</p>
                <p className="text-primary-foreground font-semibold text-sm">{t(item.value)}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ===============================
// PROBLEM-SOLUTION SECTION
// ===============================
const ProblemSolutionSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  const problems = [
    translations.problem1,
    translations.problem2,
    translations.problem3,
    translations.problem4,
  ];

  const solutions = [
    { icon: Shield, text: translations.solution1 },
    { icon: Heart, text: translations.solution2 },
    { icon: Target, text: translations.solution3 },
    { icon: Sun, text: translations.solution4 },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Problems */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-8"
            >
              {t(translations.problemTitle)}
            </motion.h2>
            <div className="space-y-4">
              {problems.map((problem, idx) => (
                <motion.div 
                  key={idx}
                  variants={fadeInUp}
                  className="flex items-start gap-4 p-4 rounded-xl bg-destructive/5 border border-destructive/10"
                >
                  <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-destructive text-sm font-bold">✗</span>
                  </div>
                  <p className="font-body text-foreground/80">{t(problem)}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-8"
            >
              {t(translations.solutionTitle)}
            </motion.h2>
            <div className="space-y-4">
              {solutions.map((solution, idx) => (
                <motion.div 
                  key={idx}
                  variants={fadeInUp}
                  className="flex items-start gap-4 p-4 rounded-xl bg-accent/5 border border-accent/20"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shrink-0">
                    <solution.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-body text-foreground font-medium pt-2">{t(solution.text)}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ===============================
// VIDEO DEMO SECTION
// ===============================
const VideoDemoSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t(translations.demoTitle)}
            </h2>
            <p className="font-body text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              {t(translations.demoDescription)}
            </p>
          </motion.div>

          {/* Video Container */}
          <motion.div 
            variants={fadeInUp}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-background"
          >
            {!isPlaying ? (
              <div className="relative w-full h-full group cursor-pointer" onClick={() => setIsPlaying(true)}>
                <img 
                  src={heroMeditation}
                  alt="Demo class thumbnail"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="text-white text-sm font-medium">Watch Demo Class</span>
                </div>
              </div>
            ) : (
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/JAT8puZv2gs?autoplay=1"
                title="Demo Class"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ===============================
// MEET THE GURU SECTION
// ===============================
const GuruSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-center font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-12"
          >
            {t(translations.guruTitle)}
          </motion.h2>

          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            {/* Guru Image */}
            <motion.div 
              variants={fadeInUp}
              className="md:col-span-2 relative mx-auto"
            >
              <div className="absolute -inset-3 bg-gradient-to-br from-accent/30 to-primary/20 rounded-3xl blur-xl opacity-60" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-background aspect-[3/4] max-w-xs">
                <img 
                  src={founderImage} 
                  alt="Yogesh Bhardwaj" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>

            {/* Guru Info */}
            <motion.div variants={staggerContainer} className="md:col-span-3">
              <motion.h3 
                variants={fadeInUp}
                className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-4"
              >
                {t(translations.guruName)}
              </motion.h3>
              
              <motion.p 
                variants={fadeInUp}
                className="font-body text-muted-foreground text-base leading-relaxed mb-6"
              >
                {t(translations.guruDescription)}
              </motion.p>

              {/* Credentials */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <Award className="w-4 h-4 mr-2" />
                  Founder, Shastrakulam
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Shastric Education Expert
                </Badge>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ===============================
// CURRICULUM SECTION
// ===============================
const CurriculumSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  const curriculumItems = [
    { 
      icon: BookOpen, 
      title: translations.curriculum1Title, 
      subtitle: translations.curriculum1Subtitle,
      includes: translations.curriculum1Includes,
      gradient: 'from-orange-500 to-amber-500'
    },
    { 
      icon: Book, 
      title: translations.curriculum2Title, 
      subtitle: translations.curriculum2Subtitle,
      includes: translations.curriculum2Includes,
      gradient: 'from-primary to-primary/70'
    },
    { 
      icon: Compass, 
      title: translations.curriculum3Title, 
      subtitle: translations.curriculum3Subtitle,
      includes: translations.curriculum3Includes,
      gradient: 'from-blue-600 to-blue-500'
    },
    { 
      icon: Heart, 
      title: translations.curriculum4Title, 
      subtitle: translations.curriculum4Subtitle,
      includes: translations.curriculum4Includes,
      gradient: 'from-rose-500 to-pink-500'
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-center font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-12"
          >
            {t(translations.curriculumTitle)}
          </motion.h2>

          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {curriculumItems.map((item, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow bg-card overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shrink-0 shadow-lg`}>
                        <item.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-xl font-bold text-foreground">
                          {t(item.title)}
                        </h3>
                        <p className="font-body text-sm text-muted-foreground mb-3">
                          {t(item.subtitle)}
                        </p>
                        <p className="font-body text-sm text-foreground/80 leading-relaxed">
                          {t(item.includes)}
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
// BENEFITS SECTION
// ===============================
const BenefitsSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  const benefits = [
    { icon: Flower2, title: translations.benefit1Title, desc: translations.benefit1Desc, color: 'bg-accent' },
    { icon: Globe, title: translations.benefit2Title, desc: translations.benefit2Desc, color: 'bg-primary' },
    { icon: Brain, title: translations.benefit3Title, desc: translations.benefit3Desc, color: 'bg-blue-600' },
    { icon: Flame, title: translations.benefit4Title, desc: translations.benefit4Desc, color: 'bg-emerald-600' },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-center font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-12"
          >
            {t(translations.whyTitle)}
          </motion.h2>

          <motion.div 
            variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-6"
          >
            {benefits.map((item, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                className="flex gap-4 p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center shrink-0 shadow-lg`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1">
                    {t(item.title)}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {t(item.desc)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ===============================
// PRICING SECTION
// ===============================
const PricingSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  const features = [
    translations.pricingFeature1,
    translations.pricingFeature2,
    translations.pricingFeature3,
    translations.pricingFeature4,
    translations.pricingFeature5,
  ];

  return (
    <section id="pricing-section" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-center font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-12"
          >
            {t(translations.pricingTitle)}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Group Batch */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border-2 border-border shadow-lg bg-card overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                    {t(translations.groupBatch)}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-6">
                    {t(translations.groupDesc)}
                  </p>
                  
                  <div className="mb-6">
                    <span className="font-heading text-4xl font-bold text-foreground">{t(translations.groupPrice)}</span>
                    <span className="text-muted-foreground text-sm">{t(translations.perYear)}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-body text-foreground">{t(feature)}</span>
                      </li>
                    ))}
                  </ul>

                  <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full font-bold py-5 rounded-xl border-2">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      {t(translations.talkToCounselor)}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            {/* Focused Batch - Recommended */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border-2 border-accent shadow-xl bg-card overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent to-primary" />
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-accent to-primary text-white border-0">
                  <Star className="w-3 h-3 mr-1" />
                  {t(translations.recommended)}
                </Badge>
                <CardContent className="p-6 pt-10">
                  <h3 className="font-heading text-xl font-bold text-primary mb-2">
                    {t(translations.focusedBatch)}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-6">
                    {t(translations.focusedDesc)}
                  </p>
                  
                  <div className="mb-6">
                    <span className="font-heading text-4xl font-bold text-primary">{t(translations.focusedPrice)}</span>
                    <span className="text-muted-foreground text-sm">{t(translations.perYear)}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                        <span className="font-body text-foreground">{t(feature)}</span>
                      </li>
                    ))}
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      <span className="font-body text-foreground font-semibold">Personal attention (12 students)</span>
                    </li>
                  </ul>

                  <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-5 rounded-xl shadow-lg">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      {t(translations.talkToCounselor)}
                    </Button>
                  </a>
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
// CONTACT CTA SECTION
// ===============================
const ContactSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  return (
    <section className="py-16 md:py-20 bg-primary">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {t(translations.contactTitle)}
          </h2>
          <p className="font-body text-primary-foreground/80 text-lg mb-8">
            {t(translations.contactSubtitle)}
          </p>
          <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer">
            <Button 
              size="lg" 
              className="bg-white hover:bg-white/90 text-primary font-bold px-10 py-6 rounded-xl shadow-xl text-lg"
            >
              <MessageCircle className="w-6 h-6 mr-2" />
              +91-9674916567
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// ===============================
// FOOTER QUOTE SECTION
// ===============================
const FooterQuote = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  return (
    <section className="py-12 bg-foreground text-center">
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="font-heading text-3xl sm:text-4xl text-accent mb-2">
          {t(translations.footerQuote)}
        </p>
        <p className="font-body text-background/60 text-sm">
          {t(translations.footerQuoteMeaning)}
        </p>
      </motion.div>
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
      className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border shadow-2xl z-50 p-3 safe-area-inset-bottom md:hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      transition={{ duration: 0.25 }}
    >
      <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer" className="block">
        <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg text-sm">
          <MessageCircle className="h-5 w-5 mr-2" />
          {t(translations.talkToCounselor)}
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
    <>
      <Helmet>
        <title>{t(translations.metaTitle)}</title>
        <meta name="description" content={t(translations.metaDescription)} />
        <meta property="og:title" content={t(translations.metaTitle)} />
        <meta property="og:description" content={t(translations.metaDescription)} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Layout>
        <HeroSection />
        <QuickInfoStrip />
        <ProblemSolutionSection />
        <VideoDemoSection />
        <GuruSection />
        <CurriculumSection />
        <BenefitsSection />
        <PricingSection />
        <ContactSection />
        <FooterQuote />
        <StickyMobileFooter />
      </Layout>
    </>
  );
};

export default BodhikaLanding;
