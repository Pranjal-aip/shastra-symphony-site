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
  Shield, 
  Brain, 
  Book, 
  Calendar,
  Quote,
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
  Moon
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
  { image: vedasTexts, title: 'SANĀTANA GRANTHA INTRO', titleHi: 'सनातन ग्रन्थ परिचय' },
  { image: ramayanaScene, title: 'STORIES FROM EPICS', titleHi: 'महाकाव्य कथाएं' },
  { image: gitaScene, title: 'BHAGAVAD GITA WISDOM', titleHi: 'भगवद्गीता ज्ञान' },
  { image: mantrasScene, title: 'DAILY SHLOKA CHANTING', titleHi: 'दैनिक श्लोक पाठ' },
  { image: sanskarScene, title: 'SANSKAR & VALUES', titleHi: 'संस्कार और मूल्य' },
  { image: mahabharataScene, title: 'DHARMIC LIVING', titleHi: 'धार्मिक जीवन' },
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
    en: 'The Foundational Program in Sanātana Dharma for Children',
    hi: 'बच्चों के लिए सनातन धर्म का मूलभूत कार्यक्रम',
    sa: 'बालकानां कृते सनातनधर्मस्य मूलभूतकार्यक्रमम्'
  },
  heroTitle: {
    en: 'Bodhika',
    hi: 'बोधिका',
    sa: 'बोधिका'
  },
  heroTagline: {
    en: 'The Seed of Dharma',
    hi: 'धर्म का बीज',
    sa: 'धर्मबीजम्'
  },
  batchInfo: {
    en: 'March 2026 Batch • Only 70 Seats',
    hi: 'मार्च 2026 बैच • केवल 70 सीटें',
    sa: 'मार्च २०२६ वर्गः • केवलं ७० आसनानि'
  },
  applyNow: {
    en: 'APPLY NOW',
    hi: 'अभी आवेदन करें',
    sa: 'अधुना आवेदनं कुरुत'
  },
  talkToCounselor: {
    en: 'Talk to Counselor',
    hi: 'परामर्शदाता से बात करें',
    sa: 'परामर्शकेन सह वदत'
  },
  // Quick Info
  ageGroup: {
    en: 'Age Group',
    hi: 'आयु वर्ग',
    sa: 'आयुवर्गः'
  },
  ageValue: {
    en: '6-12 years',
    hi: '6-12 वर्ष',
    sa: '६-१२ वर्षाणि'
  },
  duration: {
    en: 'Course Duration',
    hi: 'पाठ्यक्रम अवधि',
    sa: 'पाठ्यक्रमकालः'
  },
  durationValue: {
    en: '12 Months',
    hi: '12 महीने',
    sa: '१२ मासाः'
  },
  schedule: {
    en: 'Class Schedule',
    hi: 'कक्षा समय',
    sa: 'कक्षासमयः'
  },
  scheduleValue: {
    en: 'Sat & Sun',
    hi: 'शनि और रवि',
    sa: 'शनि-रविवासरौ'
  },
  mode: {
    en: 'Mode of Learning',
    hi: 'शिक्षा का माध्यम',
    sa: 'शिक्षाप्रकारः'
  },
  modeValue: {
    en: 'Live Online Classes',
    hi: 'लाइव ऑनलाइन कक्षाएं',
    sa: 'प्रत्यक्षाभिकक्षाः'
  },
  // Journey Section
  journeyTitle: {
    en: 'A Joyful Journey into Sanātan Wisdom!',
    hi: 'सनातन ज्ञान की आनंदमय यात्रा!',
    sa: 'सनातनज्ञानस्य आनन्दमययात्रा!'
  },
  // Demo Section
  demoTitle: {
    en: 'Experience the Joyful Way We Teach!',
    hi: 'अनुभव करें हमारी आनंदमय शिक्षण पद्धति!',
    sa: 'अस्माकं आनन्दमयशिक्षणपद्धतिम् अनुभवत!'
  },
  demoDescription: {
    en: 'Our teacher follows a gentle, story-based approach that keeps children curious and comfortable while introducing them to the depth of Sanātana Dharma.',
    hi: 'हमारे शिक्षक एक कोमल, कहानी-आधारित दृष्टिकोण का पालन करते हैं जो बच्चों को सनातन धर्म की गहराई से परिचित कराते हुए उन्हें जिज्ञासु और सहज रखता है।',
    sa: 'अस्माकं गुरवः मृदुकथाआधारितदृष्टिकोणम् अनुसरन्ति यत् बालकान् सनातनधर्मस्य गहनतया परिचाययन्ति।'
  },
  // Guru Section
  guruTitle: {
    en: 'Meet the Guru',
    hi: 'गुरु से मिलें',
    sa: 'गुरुं मिलत'
  },
  guruName: {
    en: 'Yogesh Bhardwaj',
    hi: 'योगेश भारद्वाज',
    sa: 'योगेशभारद्वाजः'
  },
  guruDescription: {
    en: 'A passionate educator with deep roots in Shastric wisdom, Yogesh ji brings the radiance of scholarship and devotion together. His mastery spans the Purāṇas, Itihāsas, and the timeless wisdom of the Bhagavadgītā. He brings valuable experience in teaching young learners in an engaging, age-appropriate manner.',
    hi: 'शास्त्रीय ज्ञान में गहरी जड़ों वाले एक उत्साही शिक्षक, योगेश जी विद्वत्ता और भक्ति की चमक को एक साथ लाते हैं। उनकी महारत पुराणों, इतिहासों और भगवद्गीता के शाश्वत ज्ञान तक फैली हुई है।',
    sa: 'शास्त्रीयज्ञाने गहनमूलितः उत्साही शिक्षकः योगेशमहाभागः विद्वत्तायाः भक्तेश्च तेजसा सह आगच्छति।'
  },
  guruCredential1: {
    en: 'Founder, Shastrakulam',
    hi: 'संस्थापक, शास्त्रकुलम्',
    sa: 'संस्थापकः, शास्त्रकुलम्'
  },
  guruCredential2: {
    en: 'Expert in Sanatan Education',
    hi: 'सनातन शिक्षा विशेषज्ञ',
    sa: 'सनातनशिक्षाविशेषज्ञः'
  },
  // Curriculum Section
  curriculumTitle: {
    en: 'What Your Child Will Learn!',
    hi: 'आपका बच्चा क्या सीखेगा!',
    sa: 'भवतः सन्तानः किं शिक्ष्यते!'
  },
  // Curriculum Items
  curriculum1Title: {
    en: 'Dharma Kathā — Divine Stories & Characters',
    hi: 'धर्म कथा — दिव्य कहानियां और चरित्र',
    sa: 'धर्मकथा — दिव्यकथाः पात्राणि च'
  },
  curriculum1Includes: {
    en: 'Stories of Ganesha, Krishna, Hanuman, Prahlāda, Dhruva, Harishchandra • Rāmāyaṇam and Mahābhārata storytelling • Daśāvatāra Kathās',
    hi: 'गणेश, कृष्ण, हनुमान, प्रह्लाद, ध्रुव, हरिश्चन्द्र की कहानियां • रामायण और महाभारत कथाएं • दशावतार कथाएं',
    sa: 'गणेश-कृष्ण-हनुमान-प्रह्लाद-ध्रुव-हरिश्चन्द्रकथाः • रामायणमहाभारतकथाः • दशावतारकथाः'
  },
  curriculum2Title: {
    en: 'Grantha Parichaya — Sacred Texts of Sanātana Dharma',
    hi: 'ग्रन्थ परिचय — सनातन धर्म के पवित्र ग्रन्थ',
    sa: 'ग्रन्थपरिचयः — सनातनधर्मस्य पवित्रग्रन्थाः'
  },
  curriculum2Includes: {
    en: 'Overview of Vedas, Purāṇas, Rāmāyaṇa, Mahābhārata, and Bhagavad Gītā • Selected shlokas from sacred texts • Insights from Dharmasamhitā',
    hi: 'वेद, पुराण, रामायण, महाभारत और भगवद्गीता का परिचय • पवित्र ग्रंथों से चुनिंदा श्लोक • धर्मसंहिता से अंतर्दृष्टि',
    sa: 'वेदपुराणरामायणमहाभारतभगवद्गीताविषये • पवित्रग्रन्थेभ्यः श्लोकाः • धर्मसंहितातः ज्ञानम्'
  },
  curriculum3Title: {
    en: 'Jñāna Vijñāna — Ancient Sciences & Cosmic Knowledge',
    hi: 'ज्ञान विज्ञान — प्राचीन विज्ञान और ब्रह्मांडीय ज्ञान',
    sa: 'ज्ञानविज्ञानम् — प्राचीनविज्ञानं ब्रह्माण्डज्ञानं च'
  },
  curriculum3Includes: {
    en: 'Basics of Jyotiṣa — 12 Rāśi, 27 Nakṣatra, Tithi, Pakṣa • Concept of 4 Yugas — Satya, Tretā, Dvāpara, Kali • Understanding Cosmic Order through stories',
    hi: 'ज्योतिष की मूल बातें — 12 राशि, 27 नक्षत्र, तिथि, पक्ष • 4 युगों की अवधारणा • कथाओं के माध्यम से ब्रह्मांडीय व्यवस्था को समझना',
    sa: 'ज्योतिषमूलतत्त्वानि — द्वादशराशयः सप्तविंशतिनक्षत्राणि • चतुर्युगधारणा • कथाभिः ब्रह्माण्डव्यवस्थाज्ञानम्'
  },
  curriculum4Title: {
    en: 'Saṃskāra & Śraddhā — Values, Virtues & Bhakti',
    hi: 'संस्कार और श्रद्धा — मूल्य, गुण और भक्ति',
    sa: 'संस्कारः श्रद्धा च — मूल्यानि गुणाः भक्तिश्च'
  },
  curriculum4Includes: {
    en: 'Shloka chanting & meanings from Bhagavad Gītā • Stories showing devotion and character • Reflection on virtues from Rāmāyaṇa and Bhāgavata Purāṇa',
    hi: 'भगवद्गीता से श्लोक पाठ और अर्थ • भक्ति और चरित्र दर्शाने वाली कहानियां • रामायण और भागवत पुराण से गुणों पर चिंतन',
    sa: 'भगवद्गीतातः श्लोकपाठः अर्थाश्च • भक्तिचरित्रदर्शककथाः • रामायणभागवतपुराणतः गुणचिन्तनम्'
  },
  // Why Section
  whyTitle: {
    en: 'Why Your Child Needs This Course!',
    hi: 'आपके बच्चे को यह कोर्स क्यों चाहिए!',
    sa: 'भवतः सन्तानाय एषः पाठ्यक्रमः किमर्थं आवश्यकः!'
  },
  benefit1Title: {
    en: 'Strong Saṃskāras',
    hi: 'मजबूत संस्कार',
    sa: 'दृढसंस्काराः'
  },
  benefit1Desc: {
    en: 'Teaches honesty, respect, and kindness through stories.',
    hi: 'कहानियों के माध्यम से ईमानदारी, सम्मान और दयालुता सिखाता है।',
    sa: 'कथाभिः सत्यं आदरं दयां च शिक्षयति।'
  },
  benefit2Title: {
    en: 'Bhāratīya Roots',
    hi: 'भारतीय जड़ें',
    sa: 'भारतीयमूलानि'
  },
  benefit2Desc: {
    en: "Introduces India's epics, deities, and festivals joyfully.",
    hi: 'भारत के महाकाव्यों, देवताओं और त्योहारों से आनंदपूर्वक परिचित कराता है।',
    sa: 'भारतस्य महाकाव्यानि देवान् उत्सवांश्च आनन्देन परिचाययति।'
  },
  benefit3Title: {
    en: 'Focus & Confidence',
    hi: 'एकाग्रता और आत्मविश्वास',
    sa: 'एकाग्रता आत्मविश्वासश्च'
  },
  benefit3Desc: {
    en: 'Chanting and reflection build calm, steady minds.',
    hi: 'पाठ और चिंतन से शांत, स्थिर मन बनता है।',
    sa: 'पाठश्चिन्तनं च शान्तस्थिरमनांसि निर्मातः।'
  },
  benefit4Title: {
    en: 'Daily Discipline',
    hi: 'दैनिक अनुशासन',
    sa: 'दैनिकानुशासनम्'
  },
  benefit4Desc: {
    en: 'Builds steady routines and responsible habits.',
    hi: 'स्थिर दिनचर्या और जिम्मेदार आदतें बनाता है।',
    sa: 'स्थिरदिनचर्यां उत्तरदायिनीमादतीश्च निर्माति।'
  },
  // Pricing Section
  pricingTitle: {
    en: 'OUR PRICING PLANS',
    hi: 'हमारी मूल्य योजनाएं',
    sa: 'अस्माकं मूल्ययोजनाः'
  },
  focusedBatch: {
    en: 'Focused Batch',
    hi: 'फोकस्ड बैच',
    sa: 'केन्द्रितवर्गः'
  },
  focusedDesc: {
    en: 'Smaller groups for deeper, personalized guidance.',
    hi: 'गहन, व्यक्तिगत मार्गदर्शन के लिए छोटे समूह।',
    sa: 'गहनव्यक्तिगतमार्गदर्शनार्थं लघुसमूहाः।'
  },
  focusedPrice: {
    en: '₹ 15,000',
    hi: '₹ 15,000',
    sa: '₹ १५,०००'
  },
  groupBatch: {
    en: 'Group Batch',
    hi: 'ग्रुप बैच',
    sa: 'समूहवर्गः'
  },
  groupDesc: {
    en: 'Learn together in a community environment.',
    hi: 'सामुदायिक वातावरण में साथ सीखें।',
    sa: 'सामुदायिकवातावरणे सह शिक्षध्वम्।'
  },
  groupPrice: {
    en: '₹ 6,000',
    hi: '₹ 6,000',
    sa: '₹ ६,०००'
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
    en: 'Completion certificate',
    hi: 'पूर्णता प्रमाणपत्र',
    sa: 'पूर्णताप्रमाणपत्रम्'
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
  // Contact Section
  contactTitle: {
    en: 'Still Have Questions?',
    hi: 'अभी भी प्रश्न हैं?',
    sa: 'अद्यापि प्रश्नाः सन्ति?'
  },
  contactCTA: {
    en: 'WhatsApp us on +91-9674916567',
    hi: 'हमें WhatsApp करें +91-9674916567',
    sa: 'अस्मान् WhatsApp-द्वारा सम्पर्कयत +91-9674916567'
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
// HERO SECTION - Shikshanam Inspired
// ===============================
const HeroSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % courseModules.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % courseModules.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + courseModules.length) % courseModules.length);

  return (
    <section className="relative min-h-[90vh] bg-[#FAF7F2] overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ctext x='30' y='35' font-family='serif' font-size='20' fill='%23000' text-anchor='middle'%3Eॐ%3C/text%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />
      
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="order-2 lg:order-1"
          >
            {/* Subtitle */}
            <motion.p 
              variants={fadeInUp}
              className="text-maroon/80 font-body text-sm sm:text-base uppercase tracking-wide mb-4"
            >
              {t(translations.heroSubtitle)}
            </motion.p>
            
            {/* Decorative line */}
            <motion.div variants={fadeInUp} className="w-20 h-0.5 bg-gradient-to-r from-maroon to-saffron mb-6" />
            
            {/* Sanskrit Title */}
            <motion.h1 
              variants={fadeInUp}
              className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-maroon-dark mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              बोधिका
            </motion.h1>
            
            {/* English Title */}
            <motion.h2 
              variants={fadeInUp}
              className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3"
            >
              {t(translations.heroTagline)}
            </motion.h2>

            {/* Batch Info */}
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-saffron/10 border border-saffron/30 rounded-full px-4 py-2 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-saffron"></span>
              </span>
              <span className="font-body text-sm text-maroon font-medium">{t(translations.batchInfo)}</span>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={fadeInUp}>
              <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-maroon to-maroon-dark hover:from-maroon-dark hover:to-maroon text-white font-bold text-base px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  {t(translations.applyNow)}
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
            <div className="relative flex gap-4 justify-center items-center">
              {/* Previous Slide (partial) */}
              <div className="hidden md:block w-48 h-64 relative overflow-hidden rounded-2xl shadow-lg opacity-60 transform -translate-x-4">
                <img 
                  src={courseModules[(currentSlide - 1 + courseModules.length) % courseModules.length].image} 
                  alt="" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Main Slide */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-72 sm:w-80 h-96 sm:h-[420px] rounded-2xl overflow-hidden shadow-2xl"
                >
                  <img 
                    src={courseModules[currentSlide].image} 
                    alt={courseModules[currentSlide].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Title Overlay */}
                  <div className="absolute top-4 left-0 right-0 flex justify-center">
                    <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                      <span className="text-white font-heading text-sm font-semibold tracking-wide">
                        {courseModules[currentSlide].title}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Next Slide (partial) */}
              <div className="hidden md:block w-48 h-64 relative overflow-hidden rounded-2xl shadow-lg opacity-60 transform translate-x-4">
                <img 
                  src={courseModules[(currentSlide + 1) % courseModules.length].image} 
                  alt="" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all z-10"
              >
                <ChevronLeft className="w-5 h-5 text-maroon" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all z-10"
              >
                <ChevronRight className="w-5 h-5 text-maroon" />
              </button>
            </div>

            {/* Carousel Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {courseModules.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-6 bg-maroon' : 'bg-maroon/30'
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
    <section className="bg-[#4A3728] py-8 md:py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2 
          className="text-center text-white text-2xl sm:text-3xl font-heading font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t(translations.journeyTitle)}
        </motion.h2>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {infoItems.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/15 transition-all"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-saffron/20 rounded-full flex items-center justify-center">
                <item.icon className="w-6 h-6 text-saffron" />
              </div>
              <h4 className="text-saffron text-sm font-semibold mb-1">{t(item.label)}</h4>
              <p className="text-white font-heading text-lg">{t(item.value)}</p>
            </motion.div>
          ))}
        </motion.div>
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
    <section className="py-16 md:py-20 bg-[#FAF7F2]">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            variants={fadeInUp}
            className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            {t(translations.demoTitle)}
          </motion.h2>

          {/* Video Container */}
          <motion.div 
            variants={fadeInUp}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl mt-8 mb-6"
          >
            {!isPlaying ? (
              <div className="relative w-full h-full">
                <img 
                  src={onlineLearning}
                  alt="Demo class thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                  >
                    <Play className="w-8 h-8 text-maroon ml-1" fill="currentColor" />
                  </button>
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

          <motion.p 
            variants={fadeInUp}
            className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            <strong className="text-foreground">{t(translations.demoDescription)}</strong>
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-6">
            <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-8 py-5 rounded-full shadow-lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                {t(translations.talkToCounselor)}
              </Button>
            </a>
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
    <section className="py-16 md:py-20 bg-white">
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

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Guru Image */}
            <motion.div 
              variants={fadeInUp}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-saffron/20 to-maroon/10 rounded-3xl blur-xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src={founderImage} 
                  alt="Yogesh Bhardwaj" 
                  className="w-full h-[400px] object-cover object-top"
                />
              </div>
            </motion.div>

            {/* Guru Info */}
            <motion.div variants={staggerContainer}>
              <motion.h3 
                variants={fadeInUp}
                className="font-heading text-3xl md:text-4xl font-bold text-maroon mb-4"
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
              <motion.div variants={fadeInUp} className="space-y-3">
                <div className="flex items-center gap-3 bg-saffron/10 rounded-lg p-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron to-maroon flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-body font-semibold text-foreground">{t(translations.guruCredential1)}</span>
                </div>
                <div className="flex items-center gap-3 bg-maroon/10 rounded-lg p-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-maroon to-maroon-dark flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-body font-semibold text-foreground">{t(translations.guruCredential2)}</span>
                </div>
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
      includes: translations.curriculum1Includes,
      color: 'from-orange-400 to-orange-600'
    },
    { 
      icon: Book, 
      title: translations.curriculum2Title, 
      includes: translations.curriculum2Includes,
      color: 'from-maroon to-maroon-dark'
    },
    { 
      icon: Compass, 
      title: translations.curriculum3Title, 
      includes: translations.curriculum3Includes,
      color: 'from-blue-500 to-blue-700'
    },
    { 
      icon: Heart, 
      title: translations.curriculum4Title, 
      includes: translations.curriculum4Includes,
      color: 'from-pink-500 to-rose-600'
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#FAF7F2]">
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
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow bg-white overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${item.color}`} />
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-lg`}>
                        <item.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                          {t(item.title)}
                        </h3>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed">
                          <span className="font-semibold text-foreground">Includes: </span>
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
// WHY YOUR CHILD NEEDS THIS SECTION
// ===============================
const BenefitsSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  const benefits = [
    { icon: Flower2, title: translations.benefit1Title, desc: translations.benefit1Desc, color: 'bg-saffron' },
    { icon: Globe, title: translations.benefit2Title, desc: translations.benefit2Desc, color: 'bg-maroon' },
    { icon: Brain, title: translations.benefit3Title, desc: translations.benefit3Desc, color: 'bg-blue-600' },
    { icon: Sun, title: translations.benefit4Title, desc: translations.benefit4Desc, color: 'bg-emerald-600' },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
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
                className="flex gap-4 p-6 rounded-2xl bg-gradient-to-br from-cream to-white border border-border/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center shrink-0 shadow-lg`}>
                  <item.icon className="w-7 h-7 text-white" />
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
    <section id="pricing-section" className="py-16 md:py-20 bg-[#FAF7F2]">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <Badge className="bg-maroon/10 text-maroon border-maroon/30 px-4 py-1.5 mb-4">
              Learn with Shastrakulam
            </Badge>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              {t(translations.pricingTitle)}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Group Batch */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border-2 border-border shadow-lg bg-white overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-slate-400 to-slate-500" />
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                    {t(translations.groupBatch)}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-6">
                    {t(translations.groupDesc)}
                  </p>
                  
                  <div className="text-center mb-6">
                    <span className="font-heading text-4xl font-bold text-foreground">{t(translations.groupPrice)}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
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
              <Card className="h-full border-2 border-saffron shadow-xl bg-white overflow-hidden relative">
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-saffron to-orange-500 text-white border-0">
                  <Star className="w-3 h-3 mr-1" />
                  {t(translations.recommended)}
                </Badge>
                <div className="h-2 bg-gradient-to-r from-saffron to-maroon" />
                <CardContent className="p-6 pt-10">
                  <h3 className="font-heading text-xl font-bold text-maroon mb-2">
                    {t(translations.focusedBatch)}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-6">
                    {t(translations.focusedDesc)}
                  </p>
                  
                  <div className="text-center mb-6">
                    <span className="font-heading text-4xl font-bold text-maroon">{t(translations.focusedPrice)}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-saffron" />
                        <span className="font-body text-foreground">{t(feature)}</span>
                      </li>
                    ))}
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-saffron" />
                      <span className="font-body text-foreground font-semibold">Personal attention (12 students only)</span>
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
    <section className="py-12 md:py-16 bg-[#4A3728]">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-heading text-xl text-cream/80 mb-2">{t(translations.contactTitle)}</h3>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-6">
            {t(translations.contactCTA)}
          </h2>
          <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold px-8 py-6 rounded-full shadow-xl">
              <MessageCircle className="w-6 h-6 mr-2" />
              {t(translations.applyNow)}
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
    <section className="py-12 bg-maroon-dark text-center">
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="font-heading text-3xl sm:text-4xl text-saffron mb-2">
          {t(translations.footerQuote)}
        </p>
        <p className="font-body text-cream/70 text-sm">
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
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-saffron/20 shadow-2xl z-50 p-3 safe-area-inset-bottom md:hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      transition={{ duration: 0.25 }}
    >
      <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer" className="block">
        <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg text-sm">
          <MessageCircle className="h-5 w-5 mr-2" />
          {t(translations.talkToCounselor)} on WhatsApp
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
        <QuickInfoStrip />
        <VideoDemoSection />
        <GuruSection />
        <CurriculumSection />
        <BenefitsSection />
        <PricingSection />
        <ContactSection />
        <FooterQuote />
        <StickyMobileFooter />
      </main>
    </Layout>
  );
};

export default BodhikaLanding;
