import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
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
  Music
} from 'lucide-react';

// Import images
import heroGurukul from '@/assets/bodhika/hero-gurukul.jpg';
import onlineLearning from '@/assets/bodhika/online-learning.jpg';
import founderImage from '@/assets/bodhika/founder-yogesh.jpg';

// WhatsApp number for counselor
const WHATSAPP_NUMBER = '919674916567';
const WHATSAPP_COUNSELOR_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20want%20to%20know%20more%20about%20the%20Bodhika%20program%20for%20my%20child.`;

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
  }
];

// Graphy checkout config
const GRAPHY_CHECKOUT_CONFIG = {
  group: {
    productId: 'Bodhika--Awakening-Young-Minds-695393a483bcbf4ec9283f27',
    courseId: '695393a483bcbf4ec9283f27',
    amount: '6000.0'
  },
  focused: {
    productId: 'Bodhika--Awakening-Young-Minds-10-students-batch-6953f67fba62d03beeceac42',
    courseId: '6953f67fba62d03beeceac42',
    amount: '15000.0'
  }
};

// ===============================
// SECTION 1: HERO
// ===============================
const HeroSection = () => {
  const { language } = useLanguage();
  const t = (obj: Record<string, string>) => obj[language] || obj.en;

  return (
    <section className="relative bg-gradient-to-br from-saffron/20 via-cream to-background py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
            {/* Headline */}
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              {t(translations.heroHeadline)}
            </h1>

            {/* Sub-headline */}
            <p className="font-body text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              {t(translations.heroSubheadline)}
            </p>

            {/* Core Outcomes */}
            <div className="space-y-3 mb-8">
              {[translations.heroOutcome1, translations.heroOutcome2, translations.heroOutcome3].map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                  <span className="font-body text-foreground font-medium">{t(outcome)}</span>
                </div>
              ))}
            </div>

            {/* Urgency Badge */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-5 w-5 text-red-600" />
                <span className="font-heading font-bold text-red-700">{t(translations.heroUrgency)}</span>
              </div>
              <p className="font-body text-sm text-red-600">{t(translations.heroUrgencySubtext)}</p>
            </div>

            {/* Primary CTA */}
            <div className="space-y-3">
              <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer" className="block">
                <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-8 py-6">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {t(translations.heroCTA)}
                </Button>
              </a>
              <p className="font-body text-sm text-muted-foreground">{t(translations.heroCTASubtext)}</p>
            </div>
          </div>

          {/* Right: Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={onlineLearning} 
                alt="Mentor teaching children online" 
                className="w-full h-auto object-cover"
              />
              {/* Age Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                <span className="font-heading font-bold text-maroon">Ages 6–12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Strip */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              { icon: Video, text: translations.trustLive },
              { icon: Download, text: translations.trustRecordings },
              { icon: Shield, text: translations.trustSafe },
              { icon: Star, text: translations.trustTrusted }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <item.icon className="h-5 w-5 text-green-600" />
                <span className="font-body text-sm text-foreground">{t(item.text)}</span>
              </div>
            ))}
          </div>
        </div>
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
    translations.painPoint4,
    translations.painPoint5
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-10">
            {t(translations.painHeadline)}
          </h2>

          <div className="space-y-4 mb-10 text-left">
            {painPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-red-50/50 rounded-xl border border-red-100">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <span className="text-red-600 font-bold">!</span>
                </div>
                <p className="font-body text-foreground">{t(point)}</p>
              </div>
            ))}
          </div>

          {/* Transition Line */}
          <div className="bg-cream rounded-xl p-6 border border-saffron/20">
            <p className="font-body text-lg text-foreground italic">
              {t(translations.painTransition)}
            </p>
          </div>
        </div>
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
    { icon: Calendar, text: translations.quickFact1 },
    { icon: Video, text: translations.quickFact2 },
    { icon: Users, text: translations.quickFact3 },
    { icon: GraduationCap, text: translations.quickFact4 }
  ];

  return (
    <section className="py-16 md:py-20 bg-cream/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="relative">
              <img 
                src={heroGurukul} 
                alt="Children learning in traditional setting" 
                className="w-full rounded-2xl shadow-xl"
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t(translations.whatIsHeadline)}
              </h2>

              <p className="font-body text-lg text-foreground font-medium mb-4">
                {t(translations.whatIsIntro)}
              </p>

              <p className="font-body text-muted-foreground mb-6">
                {t(translations.whatIsBody)}
              </p>

              <ul className="space-y-3 mb-6">
                {points.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-saffron shrink-0" />
                    <span className="font-body text-foreground">{t(point)}</span>
                  </li>
                ))}
              </ul>

              <p className="font-body text-muted-foreground text-sm">
                {t(translations.whatIsClosing)}
              </p>
            </div>
          </div>

          {/* Quick Fact Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {quickFacts.map((fact, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 text-center shadow-sm border border-border">
                <fact.icon className="h-6 w-6 text-maroon mx-auto mb-2" />
                <span className="font-body text-sm font-medium text-foreground">{t(fact.text)}</span>
              </div>
            ))}
          </div>
        </div>
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
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            {t(translations.transformHeadline)}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <Card className="border-2 border-red-200 bg-red-50/30">
              <CardContent className="p-6">
                <h3 className="font-heading font-bold text-red-700 mb-6 text-center">{t(translations.beforeTitle)}</h3>
                <div className="space-y-4">
                  {transformations.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <X className="h-5 w-5 text-red-500 shrink-0" />
                      <span className="font-body text-foreground">{t(item.before)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* After */}
            <Card className="border-2 border-green-200 bg-green-50/30">
              <CardContent className="p-6">
                <h3 className="font-heading font-bold text-green-700 mb-6 text-center">{t(translations.afterTitle)}</h3>
                <div className="space-y-4">
                  {transformations.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-600 shrink-0" />
                      <span className="font-body text-foreground">{t(item.after)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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
    { icon: Brain, title: translations.learn1Title },
    { icon: MessageCircle, title: translations.learn2Title },
    { icon: Book, title: translations.learn3Title },
    { icon: Heart, title: translations.learn4Title },
    { icon: Leaf, title: translations.learn5Title },
    { icon: Sparkles, title: translations.learn6Title }
  ];

  return (
    <section className="py-16 md:py-20 bg-cream/50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            {t(translations.learnHeadline)}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            {learningItems.map((item, idx) => (
              <Card key={idx} className="border bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-saffron to-maroon flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground text-sm md:text-base">
                    {t(item.title)}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center font-body text-muted-foreground">
            {t(translations.learnNote)}
          </p>
        </div>
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
    translations.exp1,
    translations.exp2,
    translations.exp3,
    translations.exp4,
    translations.exp5
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
            {t(translations.expHeadline)}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {experiences.map((exp, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-cream/50 rounded-xl">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                <span className="font-body text-foreground">{t(exp)}</span>
              </div>
            ))}
          </div>
        </div>
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
    <section id="pricing-section" className="py-16 md:py-20 bg-cream/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            {t(translations.pricingHeadline)}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Focused Batch - Recommended */}
            <Card className="border-2 border-saffron shadow-xl relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge className="bg-saffron text-white border-0">
                  <Star className="h-3 w-3 mr-1" />
                  {t(translations.focusedRecommended)}
                </Badge>
              </div>
              <CardContent className="p-6 pt-8">
                <h3 className="font-heading text-xl font-bold text-maroon mb-2">
                  {t(translations.focusedBatch)}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-4">{t(translations.focusedStudents)}</p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-saffron" />
                    <span className="font-body text-sm text-foreground">{t(translations.focusedFeature1)}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-saffron" />
                    <span className="font-body text-sm text-foreground">{t(translations.focusedFeature2)}</span>
                  </li>
                </ul>

                <div className="mb-6">
                  <span className="font-heading text-3xl font-bold text-foreground">{t(translations.focusedPrice)}</span>
                  <span className="font-body text-muted-foreground">{t(translations.perYear)}</span>
                </div>

                <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full bg-maroon hover:bg-maroon/90 text-white">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {t(translations.talkToCounselor)}
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Group Batch */}
            <Card className="border shadow-lg">
              <CardContent className="p-6 pt-8">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  {t(translations.groupBatch)}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-4">{t(translations.groupFeature1)}</p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="font-body text-sm text-foreground">{t(translations.groupFeature2)}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="font-body text-sm text-foreground">{t(translations.groupFeature3)}</span>
                  </li>
                </ul>

                <div className="mb-6">
                  <span className="font-heading text-3xl font-bold text-foreground">{t(translations.groupPrice)}</span>
                  <span className="font-body text-muted-foreground">{t(translations.perYear)}</span>
                </div>

                <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full bg-saffron hover:bg-saffron/90 text-white">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {t(translations.talkToCounselor)}
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Scholarship Note */}
          <div className="text-center mt-8">
            <p className="font-body text-green-700 font-medium">{t(translations.scholarshipNote)}</p>
            <p className="font-body text-sm text-muted-foreground">{t(translations.scholarshipSubnote)}</p>
          </div>
        </div>
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
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            {t(translations.testimonialsHeadline)}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="border bg-cream/30">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-saffron/30 mb-4" />
                  <p className="font-body text-foreground italic mb-4">
                    "{t(testimonial.quote)}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-maroon flex items-center justify-center text-white font-bold">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-foreground text-sm">{testimonial.name}</p>
                      <p className="font-body text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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
    <section className="py-16 md:py-20 bg-cream/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
            {t(translations.founderHeadline)}
          </h2>

          <Card className="border-0 shadow-xl bg-white">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="shrink-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-saffron/30">
                    <img 
                      src={founderImage} 
                      alt="Yogesh Bhardwaj" 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                <div>
                  <p className="font-body text-foreground italic text-lg leading-relaxed mb-4">
                    {t(translations.founderMessage)}
                  </p>
                  <p className="font-heading font-bold text-maroon">{t(translations.founderName)}</p>
                  <p className="font-body text-sm text-muted-foreground">{t(translations.founderRole)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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
    <section className="py-16 md:py-20 bg-gradient-to-br from-maroon to-maroon-dark text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t(translations.finalHeadline)}
          </h2>

          <p className="font-body text-lg text-cream/90 mb-8 whitespace-pre-line">
            {t(translations.finalBody)}
          </p>

          <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-8 py-6">
              <MessageCircle className="h-5 w-5 mr-2" />
              {t(translations.heroCTA)}
            </Button>
          </a>

          <p className="font-body text-sm text-cream/70 mt-4">{t(translations.finalCTASubtext)}</p>
        </div>
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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 p-3 md:hidden">
      <a href={WHATSAPP_COUNSELOR_LINK} target="_blank" rel="noopener noreferrer" className="block">
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold">
          <MessageCircle className="h-4 w-4 mr-2" />
          {t(translations.heroCTA)}
        </Button>
      </a>
    </div>
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
      </Helmet>

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
    </Layout>
  );
};

export default BodhikaLanding;
