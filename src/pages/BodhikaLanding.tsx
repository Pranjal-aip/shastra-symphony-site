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
const WHATSAPP_COUNSELOR_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20want%20to%20know%20more%20about%20the%20Bodhika%20program%20for%20my%20child.`;

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

// Translations
const translations = {
  // Meta
  metaTitle: {
    en: 'Bodhika - 1-Year Sanatan Dharma Program for Children | Shastrakulam',
    hi: 'बोधिका - बच्चों के लिए 1 वर्षीय सनातन धर्म कार्यक्रम | शास्त्रकुलम्',
    sa: 'बोधिका - बालकानां कृते एकवर्षीयं सनातनधर्मकार्यक्रमम् | शास्त्रकुलम्'
  },
  metaDescription: {
    en: 'Help your child aged 6-12 develop focus, discipline, values and cultural confidence through live Sanatan Dharma classes. March 2026 batch - Only 70 seats.',
    hi: '6-12 वर्ष के अपने बच्चे को लाइव सनातन धर्म कक्षाओं के माध्यम से ध्यान, अनुशासन, मूल्य और सांस्कृतिक आत्मविश्वास विकसित करने में मदद करें।',
    sa: '६-१२ वर्षीयं स्वसन्तानं जीवन्तसनातनधर्मकक्षाभिः ध्यानम् अनुशासनं मूल्यानि सांस्कृतिकात्मविश्वासं च विकसयितुं साहाय्यं कुरुत।'
  },

  // Hero Section
  heroHeadline: {
    en: 'Is Your Child Growing Up Smart — But Losing Focus, Discipline & Values?',
    hi: 'क्या आपका बच्चा होशियार तो है — लेकिन ध्यान, अनुशासन और संस्कार खो रहा है?',
    sa: 'किं भवतः सन्तानः मेधावी अस्ति — किन्तु ध्यानम् अनुशासनं संस्कारांश्च त्यजति?'
  },
  heroSubheadline: {
    en: 'Bodhika is a 1-Year Live Sanatan Dharma Program that helps children aged 6–12 become calm, disciplined, respectful, and culturally confident — without pressure, exams, or screen addiction.',
    hi: 'बोधिका एक 1 वर्षीय लाइव सनातन धर्म कार्यक्रम है जो 6-12 वर्ष के बच्चों को शांत, अनुशासित, सम्मानजनक और सांस्कृतिक रूप से आत्मविश्वासी बनने में मदद करता है — बिना दबाव, परीक्षा या स्क्रीन की लत के।',
    sa: 'बोधिका एकवर्षीयं जीवन्तसनातनधर्मकार्यक्रमम् अस्ति यत् ६-१२ वर्षीयान् बालकान् शान्तान् अनुशासितान् आदरशीलान् सांस्कृतिकात्मविश्वासिनश्च भवितुं साहाय्यं करोति।'
  },
  heroOutcome1: {
    en: 'Strong moral values & respectful behaviour',
    hi: 'मजबूत नैतिक मूल्य और सम्मानजनक व्यवहार',
    sa: 'दृढनैतिकमूल्यानि आदरपूर्णव्यवहारश्च'
  },
  heroOutcome2: {
    en: 'Better focus, emotional balance & self-control',
    hi: 'बेहतर ध्यान, भावनात्मक संतुलन और आत्म-नियंत्रण',
    sa: 'उत्तमं ध्यानं भावनात्मकसन्तुलनम् आत्मनियन्त्रणं च'
  },
  heroOutcome3: {
    en: 'Natural spoken Sanskrit & pride in Indian culture',
    hi: 'स्वाभाविक संस्कृत बोलना और भारतीय संस्कृति में गर्व',
    sa: 'स्वाभाविकसंस्कृतभाषणं भारतीयसंस्कृतौ गर्वश्च'
  },
  heroUrgency: {
    en: 'March 2026 Batch | Only 70 Seats',
    hi: 'मार्च 2026 बैच | केवल 70 सीटें',
    sa: 'मार्च २०२६ वर्गः | केवलं ७० आसनानि'
  },
  heroUrgencySubtext: {
    en: 'Small batches to ensure personal guidance',
    hi: 'व्यक्तिगत मार्गदर्शन के लिए छोटे बैच',
    sa: 'व्यक्तिगतमार्गदर्शनाय लघुवर्गाः'
  },
  heroCTA: {
    en: 'Talk to a Parent Counselor on WhatsApp',
    hi: 'WhatsApp पर पैरेंट काउंसलर से बात करें',
    sa: 'WhatsApp-द्वारा पितृपरामर्शकेन सह वदत'
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
    en: 'Recordings Available',
    hi: 'रिकॉर्डिंग उपलब्ध',
    sa: 'अभिलेखाः उपलब्धाः'
  },
  trustSafe: {
    en: 'Child-Safe Environment',
    hi: 'बाल-सुरक्षित वातावरण',
    sa: 'बालसुरक्षितवातावरणम्'
  },
  trustTrusted: {
    en: 'Trusted by Parents Across India',
    hi: 'पूरे भारत के माता-पिता द्वारा विश्वसनीय',
    sa: 'सम्पूर्णभारते पितृभिः विश्वसितम्'
  },

  // Parent Pain Section
  painHeadline: {
    en: 'Does This Sound Like Your Child?',
    hi: 'क्या यह आपके बच्चे जैसा लगता है?',
    sa: 'किम् एतत् भवतः सन्तानमिव श्रूयते?'
  },
  painPoint1: {
    en: 'Easily distracted, addicted to mobile or YouTube',
    hi: 'आसानी से विचलित, मोबाइल या YouTube की लत',
    sa: 'सुखेन विचलितः, चलदूरवाण्याः YouTube-स्य वा आसक्तः'
  },
  painPoint2: {
    en: 'Knows everything online, but lacks discipline & respect',
    hi: 'ऑनलाइन सब जानता है, लेकिन अनुशासन और सम्मान की कमी',
    sa: 'अन्तर्जाले सर्वं जानाति, किन्तु अनुशासनम् आदरश्च न्यूनः'
  },
  painPoint3: {
    en: 'Struggles to sit calmly or focus for long',
    hi: 'लंबे समय तक शांत बैठने या ध्यान केंद्रित करने में कठिनाई',
    sa: 'दीर्घकालं शान्तम् उपविष्टुं ध्यानं वा कर्तुं कठिनम्'
  },
  painPoint4: {
    en: 'Has no connection to Indian culture or values',
    hi: 'भारतीय संस्कृति या मूल्यों से कोई जुड़ाव नहीं',
    sa: 'भारतीयसंस्कृत्या मूल्यैः वा न सम्बन्धः'
  },
  painPoint5: {
    en: 'Asks big questions — but gets no clear guidance',
    hi: 'बड़े सवाल पूछता है — लेकिन स्पष्ट मार्गदर्शन नहीं मिलता',
    sa: 'महान्तः प्रश्नान् पृच्छति — किन्तु स्पष्टमार्गदर्शनं न लभते'
  },
  painTransition: {
    en: 'Modern education builds skills — but ignores character. That\'s where Bodhika comes in.',
    hi: 'आधुनिक शिक्षा कौशल बनाती है — लेकिन चरित्र को नजरअंदाज करती है। यहीं बोधिका आती है।',
    sa: 'आधुनिकशिक्षा कौशलानि निर्माति — किन्तु चरित्रम् उपेक्षते। अत्र बोधिका आगच्छति।'
  },

  // What is Bodhika Section
  whatIsHeadline: {
    en: 'What Exactly Is Bodhika?',
    hi: 'बोधिका वास्तव में क्या है?',
    sa: 'बोधिका वस्तुतः किम् अस्ति?'
  },
  whatIsIntro: {
    en: 'Bodhika is not just a Sanskrit or shloka class.',
    hi: 'बोधिका सिर्फ संस्कृत या श्लोक की कक्षा नहीं है।',
    sa: 'बोधिका केवलं संस्कृतश्लोककक्षा नास्ति।'
  },
  whatIsBody: {
    en: 'It is a guided character-building journey where children learn:',
    hi: 'यह एक मार्गदर्शित चरित्र-निर्माण यात्रा है जहां बच्चे सीखते हैं:',
    sa: 'एषा मार्गदर्शितचरित्रनिर्माणयात्रा अस्ति यत्र बालकाः शिक्षन्ते:'
  },
  whatIsPoint1: {
    en: 'How to think clearly',
    hi: 'स्पष्ट रूप से कैसे सोचें',
    sa: 'स्पष्टं चिन्तयितुम्'
  },
  whatIsPoint2: {
    en: 'How to act responsibly',
    hi: 'जिम्मेदारी से कैसे कार्य करें',
    sa: 'उत्तरदायित्वेन कर्तुम्'
  },
  whatIsPoint3: {
    en: 'How to respect elders',
    hi: 'बड़ों का सम्मान कैसे करें',
    sa: 'वृद्धान् आदर्तुम्'
  },
  whatIsPoint4: {
    en: 'How to stay calm in a noisy world',
    hi: 'शोर भरी दुनिया में शांत कैसे रहें',
    sa: 'कोलाहलपूर्णे संसारे शान्तं स्थातुम्'
  },
  whatIsClosing: {
    en: 'All through age-appropriate Sanatan Dharma teachings, stories, and live interaction.',
    hi: 'सब कुछ आयु-उपयुक्त सनातन धर्म शिक्षाओं, कहानियों और लाइव बातचीत के माध्यम से।',
    sa: 'सर्वं आयुउपयुक्तसनातनधर्मशिक्षाभिः कथाभिः जीवन्तसंवादेन च।'
  },
  quickFact1: {
    en: '12-Month Program',
    hi: '12 महीने का कार्यक्रम',
    sa: '१२-मासकार्यक्रमः'
  },
  quickFact2: {
    en: '100% Live + Recordings',
    hi: '100% लाइव + रिकॉर्डिंग',
    sa: '१००% जीवन्तम् + अभिलेखाः'
  },
  quickFact3: {
    en: 'Ages 6–12',
    hi: '6-12 वर्ष की आयु',
    sa: '६-१२ वर्षाणि'
  },
  quickFact4: {
    en: 'Mentor-led small groups',
    hi: 'मार्गदर्शक-नेतृत्व छोटे समूह',
    sa: 'मार्गदर्शकनेतृत्वलघुसमूहाः'
  },

  // Transformation Section
  transformHeadline: {
    en: 'The Transformation Parents Notice',
    hi: 'माता-पिता जो परिवर्तन देखते हैं',
    sa: 'पितरः यत् परिवर्तनं पश्यन्ति'
  },
  beforeTitle: {
    en: 'BEFORE BODHIKA',
    hi: 'बोधिका से पहले',
    sa: 'बोधिकातः पूर्वम्'
  },
  afterTitle: {
    en: 'AFTER BODHIKA',
    hi: 'बोधिका के बाद',
    sa: 'बोधिकातः अनन्तरम्'
  },
  before1: {
    en: 'Easily distracted',
    hi: 'आसानी से विचलित',
    sa: 'सुखेन विचलितः'
  },
  after1: {
    en: 'Calm & emotionally balanced',
    hi: 'शांत और भावनात्मक रूप से संतुलित',
    sa: 'शान्तः भावनात्मकसन्तुलितश्च'
  },
  before2: {
    en: 'Argumentative or restless',
    hi: 'तर्कशील या बेचैन',
    sa: 'वादप्रियः अशान्तः वा'
  },
  after2: {
    en: 'Respectful to parents & elders',
    hi: 'माता-पिता और बड़ों का सम्मान करने वाला',
    sa: 'पितृभ्यः वृद्धेभ्यश्च आदरशीलः'
  },
  before3: {
    en: 'No daily discipline',
    hi: 'दैनिक अनुशासन नहीं',
    sa: 'दैनिकानुशासनं नास्ति'
  },
  after3: {
    en: 'Clear sense of right & wrong',
    hi: 'सही और गलत की स्पष्ट समझ',
    sa: 'उचितानुचितयोः स्पष्टज्ञानम्'
  },
  before4: {
    en: 'Weak connection to culture',
    hi: 'संस्कृति से कमजोर जुड़ाव',
    sa: 'संस्कृत्या दुर्बलसम्बन्धः'
  },
  after4: {
    en: 'Confidence in culture & values',
    hi: 'संस्कृति और मूल्यों में आत्मविश्वास',
    sa: 'संस्कृतौ मूल्येषु च आत्मविश्वासः'
  },

  // Learning Section
  learnHeadline: {
    en: 'What Your Child Will Learn (In Simple Terms)',
    hi: 'आपका बच्चा क्या सीखेगा (सरल शब्दों में)',
    sa: 'भवतः सन्तानः किं शिक्षिष्यते (सरलशब्देषु)'
  },
  learn1Title: {
    en: 'Mindfulness & Focus',
    hi: 'माइंडफुलनेस और ध्यान',
    sa: 'सावधानता ध्यानं च'
  },
  learn2Title: {
    en: 'Spoken Sanskrit (Daily Use)',
    hi: 'बोलचाल की संस्कृत (दैनिक उपयोग)',
    sa: 'संस्कृतभाषणम् (दैनिकप्रयोगः)'
  },
  learn3Title: {
    en: 'Stories from Ramayana, Mahabharata & Gita',
    hi: 'रामायण, महाभारत और गीता की कहानियां',
    sa: 'रामायणमहाभारतगीताभ्यः कथाः'
  },
  learn4Title: {
    en: 'Respect, Gratitude & Discipline',
    hi: 'सम्मान, कृतज्ञता और अनुशासन',
    sa: 'आदरः कृतज्ञता अनुशासनं च'
  },
  learn5Title: {
    en: 'Basic Yoga & Breathing',
    hi: 'बुनियादी योग और प्राणायाम',
    sa: 'मूलयोगः प्राणायामश्च'
  },
  learn6Title: {
    en: 'Values, Culture & Environmental Respect',
    hi: 'मूल्य, संस्कृति और पर्यावरण सम्मान',
    sa: 'मूल्यानि संस्कृतिः पर्यावरणादरश्च'
  },
  learnNote: {
    en: '👉 Full detailed syllabus shared after counseling.',
    hi: '👉 पूर्ण विस्तृत पाठ्यक्रम परामर्श के बाद साझा किया जाएगा।',
    sa: '👉 पूर्णविस्तृतपाठ्यक्रमः परामर्शानन्तरं प्रदास्यते।'
  },

  // Learning Experience Section
  expHeadline: {
    en: 'How the Learning Happens',
    hi: 'सीखना कैसे होता है',
    sa: 'अधिगमः कथं भवति'
  },
  exp1: {
    en: 'Live mentor-led classes',
    hi: 'लाइव मेंटर-नेतृत्व वाली कक्षाएं',
    sa: 'जीवन्तगुरुनेतृत्वकक्षाः'
  },
  exp2: {
    en: 'Interactive discussions & doubts',
    hi: 'इंटरैक्टिव चर्चा और संदेह समाधान',
    sa: 'परस्परक्रियात्मकचर्चाः संशयसमाधानं च'
  },
  exp3: {
    en: 'Recordings for revision',
    hi: 'पुनरावृत्ति के लिए रिकॉर्डिंग',
    sa: 'पुनरावृत्त्यर्थम् अभिलेखाः'
  },
  exp4: {
    en: 'Child-friendly pace',
    hi: 'बाल-अनुकूल गति',
    sa: 'बालोपयुक्तगतिः'
  },
  exp5: {
    en: 'No exams, no pressure',
    hi: 'कोई परीक्षा नहीं, कोई दबाव नहीं',
    sa: 'न परीक्षा, न दबावः'
  },

  // Pricing Section
  pricingHeadline: {
    en: 'Choose the Right Batch for Your Child',
    hi: 'अपने बच्चे के लिए सही बैच चुनें',
    sa: 'स्वसन्तानाय उचितं वर्गं चिनुत'
  },
  focusedBatch: {
    en: 'FOCUSED BATCH',
    hi: 'फोकस्ड बैच',
    sa: 'केन्द्रितवर्गः'
  },
  focusedRecommended: {
    en: 'Recommended',
    hi: 'अनुशंसित',
    sa: 'अनुशंसितम्'
  },
  focusedStudents: {
    en: '12 students only',
    hi: 'केवल 12 छात्र',
    sa: 'केवलं १२ छात्राः'
  },
  focusedFeature1: {
    en: 'Personal attention',
    hi: 'व्यक्तिगत ध्यान',
    sa: 'व्यक्तिगतावधानम्'
  },
  focusedFeature2: {
    en: 'Detailed progress tracking',
    hi: 'विस्तृत प्रगति ट्रैकिंग',
    sa: 'विस्तृतप्रगतिअनुसरणम्'
  },
  focusedPrice: {
    en: '₹15,000',
    hi: '₹15,000',
    sa: '₹१५,०००'
  },
  groupBatch: {
    en: 'GROUP BATCH',
    hi: 'ग्रुप बैच',
    sa: 'समूहवर्गः'
  },
  groupFeature1: {
    en: 'Larger group',
    hi: 'बड़ा समूह',
    sa: 'बृहत्समूहः'
  },
  groupFeature2: {
    en: 'Interactive learning',
    hi: 'इंटरैक्टिव लर्निंग',
    sa: 'परस्परक्रियात्मकाधिगमः'
  },
  groupFeature3: {
    en: 'Community experience',
    hi: 'समुदाय अनुभव',
    sa: 'समुदायानुभवः'
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
    en: '🎓 Scholarships available for needy families',
    hi: '🎓 जरूरतमंद परिवारों के लिए छात्रवृत्ति उपलब्ध',
    sa: '🎓 आवश्यककुटुम्बेभ्यः छात्रवृत्तयः उपलब्धाः'
  },
  scholarshipSubnote: {
    en: '(Discuss privately on WhatsApp)',
    hi: '(WhatsApp पर निजी तौर पर चर्चा करें)',
    sa: '(WhatsApp-द्वारा निजीरूपेण चर्चयत)'
  },

  // Testimonials Section
  testimonialsHeadline: {
    en: 'What Parents Are Saying',
    hi: 'माता-पिता क्या कह रहे हैं',
    sa: 'पितरः किं वदन्ति'
  },

  // Founder Section
  founderHeadline: {
    en: 'A Note from the Founder',
    hi: 'संस्थापक का एक संदेश',
    sa: 'संस्थापकात् सन्देशः'
  },
  founderMessage: {
    en: '"I built Bodhika after seeing children overloaded with information but lacking direction. Sanatan Dharma is not about rituals — it\'s about living wisely. That\'s what we teach here."',
    hi: '"मैंने बोधिका उन बच्चों को देखकर बनाई जो जानकारी से भरे हुए थे लेकिन दिशा की कमी थी। सनातन धर्म कर्मकांड के बारे में नहीं है — यह बुद्धिमानी से जीने के बारे में है। यही हम यहां सिखाते हैं।"',
    sa: '"अहं बोधिकां निर्मितवान् बालकान् दृष्ट्वा ये सूचनाभिः पूर्णाः आसन् किन्तु दिशाविहीनाः। सनातनधर्मः कर्मकाण्डविषये नास्ति — एतत् बुद्धिमत्तया जीवितुम् अस्ति। एतदेव वयम् अत्र शिक्षयामः।"'
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
    en: 'Give Your Child Roots Before Wings',
    hi: 'पंख देने से पहले अपने बच्चे को जड़ें दें',
    sa: 'पक्षात् पूर्वं स्वसन्तानाय मूलानि ददातु'
  },
  finalBody: {
    en: 'March 2026 batch is filling fast.\nSmall groups. Personal guidance. Real transformation.',
    hi: 'मार्च 2026 बैच तेजी से भर रहा है।\nछोटे समूह। व्यक्तिगत मार्गदर्शन। वास्तविक परिवर्तन।',
    sa: 'मार्च २०२६ वर्गः शीघ्रं पूर्यते।\nलघुसमूहाः। व्यक्तिगतमार्गदर्शनम्। वास्तविकपरिवर्तनम्।'
  },
  finalCTASubtext: {
    en: 'Free guidance • Limited seats',
    hi: 'निःशुल्क मार्गदर्शन • सीमित सीटें',
    sa: 'निःशुल्कमार्गदर्शनम् • सीमितासनानि'
  }
};

// Testimonials data
const testimonials = [
  {
    quote: {
      en: 'My daughter now wakes up excited for class and speaks Sanskrit phrases at home.',
      hi: 'मेरी बेटी अब कक्षा के लिए उत्साहित होकर जागती है और घर पर संस्कृत वाक्यांश बोलती है।',
      sa: 'मम पुत्री इदानीं कक्षार्थम् उत्साहिता जागर्ति गृहे च संस्कृतवाक्यांशान् वदति।'
    },
    name: 'Priya Sharma',
    location: 'Mumbai'
  },
  {
    quote: {
      en: 'Finally a program that builds values without forcing religion.',
      hi: 'आखिरकार एक ऐसा कार्यक्रम जो धर्म को थोपे बिना मूल्यों का निर्माण करता है।',
      sa: 'अन्ततः एतादृशं कार्यक्रमं यत् धर्मं विना आरोप्य मूल्यानि निर्माति।'
    },
    name: 'Rajesh Kumar',
    location: 'Bangalore'
  },
  {
    quote: {
      en: 'My son has become more focused and respectful. The transformation is visible.',
      hi: 'मेरा बेटा अधिक एकाग्र और सम्मानजनक हो गया है। परिवर्तन दिखाई दे रहा है।',
      sa: 'मम पुत्रः अधिकं एकाग्रः आदरशीलश्च अभवत्। परिवर्तनं दृश्यते।'
    },
    name: 'Anita Desai',
    location: 'Delhi'
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
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-saffron/30 via-cream to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-saffron/20 via-transparent to-transparent" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-saffron/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-maroon/5 rounded-full blur-3xl" />
      
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
              <Badge className="mb-4 md:mb-6 bg-gradient-to-r from-saffron to-saffron-light text-white border-0 px-4 py-2 text-sm font-medium shadow-lg">
                <Sparkles className="h-4 w-4 mr-2" />
                Ages 6–12 Years
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={fadeInUp}
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-4 md:mb-6"
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

            {/* Core Outcomes */}
            <motion.div variants={staggerContainer} className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              {[translations.heroOutcome1, translations.heroOutcome2, translations.heroOutcome3].map((outcome, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeInUp}
                  className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-green-100 shadow-sm"
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-white" />
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
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                  <Calendar className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <span className="font-heading font-bold text-red-700 text-lg md:text-xl block">{t(translations.heroUrgency)}</span>
                  <p className="font-body text-sm text-red-600">{t(translations.heroUrgencySubtext)}</p>
                </div>
              </div>
            </motion.div>

            {/* Primary CTA */}
            <motion.div variants={fadeInUp} className="space-y-3 md:space-y-4">
              <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer" className="block">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-base md:text-lg px-6 md:px-10 py-6 md:py-7 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <MessageCircle className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3" />
                  {t(translations.heroCTA)}
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </a>
              <p className="font-body text-xs md:text-sm text-muted-foreground text-center sm:text-left">{t(translations.heroCTASubtext)}</p>
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div 
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-br from-saffron/30 to-maroon/20 rounded-3xl blur-xl" />
              
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
                <img 
                  src={onlineLearning} 
                  alt="Mentor teaching children online" 
                  className="w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px] object-cover"
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
          className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { icon: Video, text: translations.trustLive, color: 'from-blue-500 to-blue-600' },
              { icon: Download, text: translations.trustRecordings, color: 'from-purple-500 to-purple-600' },
              { icon: Shield, text: translations.trustSafe, color: 'from-green-500 to-green-600' },
              { icon: Star, text: translations.trustTrusted, color: 'from-saffron to-saffron-dark' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 md:gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-sm border border-white/50">
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
    { text: translations.painPoint1, icon: Phone },
    { text: translations.painPoint2, icon: Brain },
    { text: translations.painPoint3, icon: Clock },
    { text: translations.painPoint4, icon: Heart },
    { text: translations.painPoint5, icon: MessageCircle }
  ];

  return (
    <section className="py-12 md:py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-200 to-transparent" />
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-8 md:mb-12">
            <Badge className="mb-4 bg-red-100 text-red-700 border-red-200 px-4 py-2">
              For Parents
            </Badge>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {t(translations.painHeadline)}
            </h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-3 md:space-y-4 mb-8 md:mb-12">
            {painPoints.map((point, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl md:rounded-2xl border border-red-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center shrink-0 shadow-md">
                  <point.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <p className="font-body text-foreground text-sm md:text-base lg:text-lg pt-2">{t(point.text)}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Transition Line */}
          <motion.div 
            variants={scaleIn}
            className="bg-gradient-to-br from-cream to-saffron/10 rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-saffron/20 shadow-xl"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-saffron to-maroon flex items-center justify-center shrink-0">
                <Sparkles className="h-6 w-6 md:h-7 md:w-7 text-white" />
              </div>
              <p className="font-body text-base md:text-lg lg:text-xl text-foreground leading-relaxed">
                {t(translations.painTransition)}
              </p>
            </div>
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

  const points = [
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

              <motion.p 
                variants={fadeInUp}
                className="font-body text-lg md:text-xl text-maroon font-semibold mb-3 md:mb-4"
              >
                {t(translations.whatIsIntro)}
              </motion.p>

              <motion.p 
                variants={fadeInUp}
                className="font-body text-muted-foreground mb-4 md:mb-6 text-sm md:text-base"
              >
                {t(translations.whatIsBody)}
              </motion.p>

              <motion.ul variants={staggerContainer} className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                {points.map((point, idx) => (
                  <motion.li 
                    key={idx} 
                    variants={fadeInUp}
                    className="flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-saffron/10 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-saffron to-saffron-dark flex items-center justify-center shrink-0">
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
    { icon: Brain, title: translations.learn1Title, color: 'from-purple-500 to-purple-600' },
    { icon: MessageCircle, title: translations.learn2Title, color: 'from-blue-500 to-blue-600' },
    { icon: Book, title: translations.learn3Title, color: 'from-amber-500 to-amber-600' },
    { icon: Heart, title: translations.learn4Title, color: 'from-pink-500 to-pink-600' },
    { icon: Leaf, title: translations.learn5Title, color: 'from-green-500 to-green-600' },
    { icon: Sparkles, title: translations.learn6Title, color: 'from-saffron to-maroon' }
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
            className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8"
          >
            {learningItems.map((item, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
              >
                <Card className="border bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full group">
                  <CardContent className="p-4 md:p-6 text-center">
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="h-7 w-7 md:h-8 md:w-8 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-foreground text-sm md:text-base lg:text-lg">
                      {t(item.title)}
                    </h3>
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
    { text: translations.exp2, icon: MessageCircle },
    { text: translations.exp3, icon: Download },
    { text: translations.exp4, icon: Smile },
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
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-maroon mb-2">
                    {t(translations.focusedBatch)}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-4 md:mb-6">{t(translations.focusedStudents)}</p>
                  
                  <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                    <li className="flex items-center gap-3 p-3 bg-saffron/10 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-saffron to-saffron-dark flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-body text-sm md:text-base text-foreground">{t(translations.focusedFeature1)}</span>
                    </li>
                    <li className="flex items-center gap-3 p-3 bg-saffron/10 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-saffron to-saffron-dark flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-body text-sm md:text-base text-foreground">{t(translations.focusedFeature2)}</span>
                    </li>
                  </ul>

                  <div className="mb-6 md:mb-8 text-center">
                    <span className="font-heading text-4xl md:text-5xl font-bold text-maroon">{t(translations.focusedPrice)}</span>
                    <span className="font-body text-muted-foreground text-lg">{t(translations.perYear)}</span>
                  </div>

                  <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-gradient-to-r from-maroon to-maroon-dark hover:from-maroon-dark hover:to-maroon text-white py-5 md:py-6 text-base md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      {t(translations.talkToCounselor)}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            {/* Group Batch */}
            <motion.div variants={scaleIn}>
              <Card className="border shadow-xl h-full bg-white">
                <div className="h-2 bg-gradient-to-r from-green-400 to-green-500" />
                
                <CardContent className="p-5 md:p-8">
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">
                    {t(translations.groupBatch)}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-4 md:mb-6">{t(translations.groupFeature1)}</p>
                  
                  <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                    <li className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-body text-sm md:text-base text-foreground">{t(translations.groupFeature2)}</span>
                    </li>
                    <li className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-body text-sm md:text-base text-foreground">{t(translations.groupFeature3)}</span>
                    </li>
                  </ul>

                  <div className="mb-6 md:mb-8 text-center">
                    <span className="font-heading text-4xl md:text-5xl font-bold text-foreground">{t(translations.groupPrice)}</span>
                    <span className="font-body text-muted-foreground text-lg">{t(translations.perYear)}</span>
                  </div>

                  <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-5 md:py-6 text-base md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
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
            <p className="font-body text-green-700 font-semibold text-base md:text-lg mb-1">{t(translations.scholarshipNote)}</p>
            <p className="font-body text-sm text-muted-foreground">{t(translations.scholarshipSubnote)}</p>
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
                        <p className="font-heading font-semibold text-foreground text-sm md:text-base">{testimonial.name}</p>
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
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
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
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-base md:text-lg px-8 md:px-12 py-6 md:py-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1"
              >
                <MessageCircle className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3" />
                {t(translations.heroCTA)}
                <ChevronRight className="h-5 w-5 ml-2" />
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
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t shadow-2xl z-50 p-3 md:hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      transition={{ duration: 0.3 }}
    >
      <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer" className="block">
        <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 rounded-xl shadow-lg">
          <MessageCircle className="h-5 w-5 mr-2" />
          {t(translations.heroCTA)}
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
