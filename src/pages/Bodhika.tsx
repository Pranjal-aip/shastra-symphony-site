import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  BookOpen, 
  Users, 
  Clock, 
  Award, 
  Heart, 
  Star, 
  CheckCircle2, 
  Sparkles,
  GraduationCap,
  Target,
  MessageCircle,
  Download,
  Shield,
  Flame,
  Brain,
  Smile,
  Eye,
  Lightbulb,
  Trophy,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Quote,
  ChevronDown,
  Play,
  Zap,
  Crown,
  Gift,
  Video,
  Radio
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const bodhikaTranslations = {
  // Hero Section
  heroTitle: {
    en: "Bodhika",
    hi: "बोधिका",
    sa: "बोधिका"
  },
  heroSubtitle: {
    en: "Awakening Young Minds",
    hi: "युवा मनों को जागृत करना",
    sa: "युवमनसां प्रबोधनम्"
  },
  heroTagline: {
    en: "One-Year Certificate Course in Sanatan Values & Wisdom for Kids & Teens",
    hi: "बच्चों और किशोरों के लिए सनातन मूल्य और ज्ञान में एक वर्षीय प्रमाणपत्र पाठ्यक्रम",
    sa: "बालानां किशोराणां च कृते सनातनमूल्येषु ज्ञाने च एकवर्षीयं प्रमाणपत्रपाठ्यक्रमम्"
  },
  heroMessage: {
    en: "Build character. Instill values. Shape a brighter future.",
    hi: "चरित्र निर्माण करें। मूल्य स्थापित करें। उज्जवल भविष्य का निर्माण करें।",
    sa: "चरित्रं निर्माणयत। मूल्यानि स्थापयत। उज्ज्वलं भविष्यं रचयत।"
  },
  enrollNow: {
    en: "Enroll Now",
    hi: "अभी नामांकन करें",
    sa: "अधुना नामाङ्कनं कुरु"
  },
  downloadBrochure: {
    en: "Download Brochure",
    hi: "ब्रोशर डाउनलोड करें",
    sa: "विवरणिकां अवतारयतु"
  },
  byShastrakulam: {
    en: "By Shastrakulam",
    hi: "शास्त्रकुलम द्वारा",
    sa: "शास्त्रकुलमेन"
  },
  limitedSeats: {
    en: "Limited Seats",
    hi: "सीमित सीटें",
    sa: "सीमितस्थानानि"
  },
  scholarshipsAvailable: {
    en: "Scholarships Available",
    hi: "छात्रवृत्ति उपलब्ध",
    sa: "छात्रवृत्तयः उपलब्धाः"
  },

  // Why Bodhika Section
  whyBodhikaTitle: {
    en: "Why Bodhika?",
    hi: "बोधिका क्यों?",
    sa: "बोधिका किमर्थम्?"
  },
  whyBodhikaSubtitle: {
    en: "The Challenge Parents Face Today",
    hi: "आज माता-पिता के सामने चुनौती",
    sa: "अद्य पितृमातृणां समक्षं आह्वानम्"
  },
  problem1: {
    en: "Children losing touch with cultural roots and values",
    hi: "बच्चे सांस्कृतिक जड़ों और मूल्यों से दूर हो रहे हैं",
    sa: "बालाः सांस्कृतिकमूलेभ्यः मूल्येभ्यश्च विमुखाः भवन्ति"
  },
  problem2: {
    en: "Excessive screen time and digital distractions",
    hi: "अत्यधिक स्क्रीन टाइम और डिजिटल विकर्षण",
    sa: "अत्यधिकं पटलसमयं आंकिकविक्षेपाश्च"
  },
  problem3: {
    en: "Stress, anxiety, and lack of inner peace",
    hi: "तनाव, चिंता और आंतरिक शांति की कमी",
    sa: "तनावः चिन्ता आन्तरिकशान्त्यभावश्च"
  },
  problem4: {
    en: "Weak discipline and scattered focus",
    hi: "कमजोर अनुशासन और बिखरा हुआ ध्यान",
    sa: "दुर्बलम् अनुशासनं विकीर्णं ध्यानं च"
  },
  promiseTitle: {
    en: "Bodhika Transforms Your Child",
    hi: "बोधिका आपके बच्चे को रूपांतरित करती है",
    sa: "बोधिका भवतः बालं परिवर्तयति"
  },
  promise1: {
    en: "Strong moral foundation & samskaras",
    hi: "मजबूत नैतिक आधार और संस्कार",
    sa: "दृढं नैतिकाधारं संस्काराश्च"
  },
  promise2: {
    en: "Deep cultural pride & identity",
    hi: "गहरा सांस्कृतिक गौरव और पहचान",
    sa: "गभीरं सांस्कृतिकगौरवं स्वत्वं च"
  },
  promise3: {
    en: "Better discipline, focus & confidence",
    hi: "बेहतर अनुशासन, ध्यान और आत्मविश्वास",
    sa: "उत्तमम् अनुशासनं ध्यानम् आत्मविश्वासश्च"
  },
  promise4: {
    en: "Inner clarity & emotional balance",
    hi: "आंतरिक स्पष्टता और भावनात्मक संतुलन",
    sa: "आन्तरिकं स्पष्टत्वं भावात्मकं सन्तुलनं च"
  },

  // About Section
  aboutTitle: {
    en: "About the Course",
    hi: "पाठ्यक्रम के बारे में",
    sa: "पाठ्यक्रमस्य विषये"
  },
  aboutDesc1: {
    en: "Bodhika is a joyful and value-rich one-year learning journey designed for kids and teens to introduce them to the essence of Sanatan Dharma in a simple, engaging, and age-appropriate way.",
    hi: "बोधिका बच्चों और किशोरों के लिए डिज़ाइन की गई एक आनंदमय और मूल्य-समृद्ध एक वर्षीय सीखने की यात्रा है जो उन्हें सनातन धर्म के सार से सरल, आकर्षक और आयु-उपयुक्त तरीके से परिचित कराती है।",
    sa: "बोधिका बालानां किशोराणां च कृते निर्मिता एका आनन्दपूर्णा मूल्यसमृद्धा एकवर्षीया शिक्षायात्रा अस्ति या तान् सनातनधर्मस्य सारेण सरलेन आकर्षकेण च प्रकारेण परिचयति।"
  },
  aboutHighlight1: {
    en: "Inspiring stories from Ramayana & Mahabharata",
    hi: "रामायण और महाभारत की प्रेरणादायक कहानियां",
    sa: "रामायणमहाभारतयोः प्रेरणादायककथाः"
  },
  aboutHighlight2: {
    en: "Simple teachings from Vedas & Bhagavad Gita",
    hi: "वेदों और भगवद्गीता की सरल शिक्षाएं",
    sa: "वेदानां भगवद्गीतायाश्च सरलोपदेशाः"
  },
  aboutHighlight3: {
    en: "Shlokas, games, activities & creative projects",
    hi: "श्लोक, खेल, गतिविधियां और रचनात्मक परियोजनाएं",
    sa: "श्लोकाः क्रीडाः क्रियाः सृजनात्मकपरियोजनाश्च"
  },
  aboutHighlight4: {
    en: "Values: truth, respect, discipline, compassion, courage",
    hi: "मूल्य: सत्य, सम्मान, अनुशासन, करुणा, साहस",
    sa: "मूल्यानि: सत्यं सम्मानं अनुशासनं करुणा साहसं च"
  },
  aboutEmphasis: {
    en: "Not just knowledge, but shaping good human beings — confident, thoughtful, and grounded in dharmic living.",
    hi: "केवल ज्ञान नहीं, बल्कि अच्छे इंसान बनाना — आत्मविश्वासी, विचारशील और धार्मिक जीवन में स्थापित।",
    sa: "केवलं ज्ञानं न, अपि तु सुमानवनिर्माणम् — आत्मविश्वासिनः विचारशीलाः धार्मिकजीवने प्रतिष्ठिताश्च।"
  },

  // What Your Child Will Learn
  learnTitle: {
    en: "What Your Child Will Learn",
    hi: "आपका बच्चा क्या सीखेगा",
    sa: "भवतः बालः किं शिक्षते"
  },
  learn1Title: { en: "Strong Moral Values", hi: "मजबूत नैतिक मूल्य", sa: "दृढनैतिकमूल्यानि" },
  learn1Desc: { en: "Deep-rooted samskaras that last a lifetime", hi: "जीवन भर चलने वाले गहरे संस्कार", sa: "जीवनपर्यन्तं स्थायिनः गभीराः संस्काराः" },
  learn2Title: { en: "Cultural Pride & Identity", hi: "सांस्कृतिक गौरव और पहचान", sa: "सांस्कृतिकगौरवं स्वत्वं च" },
  learn2Desc: { en: "Connection with rich Indian heritage", hi: "समृद्ध भारतीय विरासत से जुड़ाव", sa: "समृद्धभारतीयपरम्परया सम्बन्धः" },
  learn3Title: { en: "Focus & Discipline", hi: "ध्यान और अनुशासन", sa: "ध्यानम् अनुशासनं च" },
  learn3Desc: { en: "Mental clarity and structured thinking", hi: "मानसिक स्पष्टता और संरचित सोच", sa: "मानसिकस्पष्टता संरचितचिन्तनं च" },
  learn4Title: { en: "Confidence & Communication", hi: "आत्मविश्वास और संवाद", sa: "आत्मविश्वासः सम्भाषणं च" },
  learn4Desc: { en: "Express thoughts with clarity and conviction", hi: "स्पष्टता और विश्वास के साथ विचार व्यक्त करें", sa: "स्पष्टतया विश्वासेन च विचारान् प्रकटयतु" },
  learn5Title: { en: "Positive Habits & Mindset", hi: "सकारात्मक आदतें और मानसिकता", sa: "सकारात्मकाः अभ्यासाः मानसिकता च" },
  learn5Desc: { en: "Daily routines rooted in wisdom", hi: "ज्ञान में निहित दैनिक दिनचर्या", sa: "ज्ञाने प्रतिष्ठिता दैनिकदिनचर्या" },
  learn6Title: { en: "Joy of Learning & Curiosity", hi: "सीखने का आनंद और जिज्ञासा", sa: "शिक्षणस्य आनन्दः जिज्ञासा च" },
  learn6Desc: { en: "Natural love for knowledge and exploration", hi: "ज्ञान और खोज के लिए स्वाभाविक प्रेम", sa: "ज्ञानस्य अन्वेषणस्य च स्वाभाविकं प्रेम" },

  // Course Details
  detailsTitle: {
    en: "Course Details",
    hi: "पाठ्यक्रम विवरण",
    sa: "पाठ्यक्रमविवरणम्"
  },
  duration: { en: "Duration", hi: "अवधि", sa: "अवधिः" },
  durationValue: { en: "1 Year", hi: "1 वर्ष", sa: "एकं वर्षम्" },
  schedule: { en: "Schedule", hi: "अनुसूची", sa: "अनुसूची" },
  scheduleValue: { en: "2 days/week, 3-4 days in holidays", hi: "सप्ताह में 2 दिन, छुट्टियों में 3-4 दिन", sa: "सप्ताहे २ दिनानि, अवकाशेषु ३-४ दिनानि" },
  certificate: { en: "Certificate", hi: "प्रमाणपत्र", sa: "प्रमाणपत्रम्" },
  certificateValue: { en: "On completion", hi: "पूर्ण होने पर", sa: "समापने" },
  ageGroup: { en: "Age Group", hi: "आयु वर्ग", sa: "आयुवर्गः" },
  ageValue: { en: "8-17 years", hi: "8-17 वर्ष", sa: "८-१७ वर्षाणि" },
  mode: { en: "Mode", hi: "मोड", sa: "प्रकारः" },
  modeValue: { en: "Live Online Classes", hi: "लाइव ऑनलाइन कक्षाएं", sa: "जीवन्त ऑनलाइन कक्षाः" },
  liveClasses: { en: "Live Interactive Classes", hi: "लाइव इंटरैक्टिव कक्षाएं", sa: "जीवन्तपरस्परक्रियाकक्षाः" },
  liveClassesValue: { en: "Real-time with mentors", hi: "संरक्षकों के साथ रियल-टाइम", sa: "संरक्षकैः सह वास्तविकसमये" },

  // Video Section
  videoTitle: {
    en: "Watch How Bodhika Transforms Lives",
    hi: "देखें बोधिका कैसे जीवन बदलती है",
    sa: "पश्यत बोधिका कथं जीवनानि परिवर्तयति"
  },
  videoSubtitle: {
    en: "A glimpse into our joyful learning journey",
    hi: "हमारी आनंदमय सीखने की यात्रा की एक झलक",
    sa: "अस्माकम् आनन्दप्रदशिक्षणयात्रायाः एका झलकः"
  },
  watchVideo: {
    en: "Watch Video",
    hi: "वीडियो देखें",
    sa: "वीडियो पश्यतु"
  },

  // Batch Options
  batchTitle: {
    en: "Choose Your Batch",
    hi: "अपना बैच चुनें",
    sa: "स्वस्य समूहं चिनुत"
  },
  batchSubtitle: {
    en: "Two learning options designed for different needs",
    hi: "विभिन्न आवश्यकताओं के लिए डिज़ाइन किए गए दो शिक्षण विकल्प",
    sa: "विभिन्नावश्यकतानां कृते निर्मितौ द्वौ शिक्षणविकल्पौ"
  },
  regularBatch: {
    en: "Regular Batch",
    hi: "नियमित बैच",
    sa: "नियमितसमूहः"
  },
  regularBatchSize: {
    en: "50-60 students",
    hi: "50-60 छात्र",
    sa: "५०-६० छात्राः"
  },
  regularBatchFee: {
    en: "₹6,000",
    hi: "₹6,000",
    sa: "₹६,०००"
  },
  regularBatchDesc: {
    en: "per student for the full year",
    hi: "पूरे वर्ष के लिए प्रति छात्र",
    sa: "पूर्णवर्षस्य कृते प्रतिछात्रम्"
  },
  regularFeature1: { en: "Weekly Live Classes with mentors", hi: "संरक्षकों के साथ साप्ताहिक लाइव कक्षाएं", sa: "संरक्षकैः सह साप्ताहिकजीवन्तकक्षाः" },
  regularFeature2: { en: "Energetic peer interactions", hi: "ऊर्जावान सहपाठी संवाद", sa: "ऊर्जापूर्णाः सहपाठिसम्भाषणाः" },
  regularFeature3: { en: "Interactive activities & Q&A", hi: "इंटरैक्टिव गतिविधियां और प्रश्नोत्तर", sa: "परस्परक्रियाः क्रियाः प्रश्नोत्तराणि च" },
  regularFeature4: { en: "Community building", hi: "समुदाय निर्माण", sa: "समुदायनिर्माणम्" },
  premiumBatch: {
    en: "Premium Small Batch",
    hi: "प्रीमियम छोटा बैच",
    sa: "प्रीमियं लघुसमूहः"
  },
  premiumBatchSize: {
    en: "12 students only",
    hi: "केवल 12 छात्र",
    sa: "केवलं १२ छात्राः"
  },
  premiumBatchFee: {
    en: "₹13,000",
    hi: "₹13,000",
    sa: "₹१३,०००"
  },
  premiumBatchDesc: {
    en: "per student for the full year",
    hi: "पूरे वर्ष के लिए प्रति छात्र",
    sa: "पूर्णवर्षस्य कृते प्रतिछात्रम्"
  },
  premiumFeature1: { en: "Personal attention from mentors", hi: "संरक्षकों से व्यक्तिगत ध्यान", sa: "संरक्षकेभ्यः व्यक्तिगतध्यानम्" },
  premiumFeature2: { en: "Deeper discussions & Q&A", hi: "गहन चर्चाएं और प्रश्नोत्तर", sa: "गभीरचर्चाः प्रश्नोत्तराणि च" },
  premiumFeature3: { en: "Customized learning pace", hi: "अनुकूलित सीखने की गति", sa: "अनुकूलिता शिक्षणगतिः" },
  premiumFeature4: { en: "More interaction & feedback", hi: "अधिक बातचीत और प्रतिक्रिया", sa: "अधिकसम्भाषणं प्रतिक्रिया च" },
  recommended: { en: "Recommended", hi: "अनुशंसित", sa: "अनुशंसितम्" },
  mostPopular: { en: "Most Popular", hi: "सबसे लोकप्रिय", sa: "अत्यन्तं लोकप्रियम्" },

  // Scholarships
  scholarshipTitle: {
    en: "Scholarships Available",
    hi: "छात्रवृत्ति उपलब्ध",
    sa: "छात्रवृत्तयः उपलब्धाः"
  },
  scholarshipDesc: {
    en: "No child should be denied wisdom due to financial limits. Scholarships available for needy and deserving students.",
    hi: "किसी भी बच्चे को आर्थिक सीमाओं के कारण ज्ञान से वंचित नहीं रहना चाहिए। जरूरतमंद और योग्य छात्रों के लिए छात्रवृत्ति उपलब्ध।",
    sa: "कोऽपि बालः आर्थिकसीमाभिः कारणेन ज्ञानात् वञ्चितः न भवेत्। आवश्यकानां योग्यानां च छात्राणां कृते छात्रवृत्तयः उपलब्धाः।"
  },
  applyScholarship: {
    en: "Apply for Scholarship",
    hi: "छात्रवृत्ति के लिए आवेदन करें",
    sa: "छात्रवृत्त्यर्थं आवेदनं कुरुत"
  },

  // Why Shastrakulam
  whyShastrakulamTitle: {
    en: "Why Shastrakulam?",
    hi: "शास्त्रकुलम क्यों?",
    sa: "शास्त्रकुलं किमर्थम्?"
  },
  shastra1: { en: "Gurukul-inspired value education", hi: "गुरुकुल-प्रेरित मूल्य शिक्षा", sa: "गुरुकुलप्रेरिता मूल्यशिक्षा" },
  shastra2: { en: "Experienced & dedicated mentors", hi: "अनुभवी और समर्पित संरक्षक", sa: "अनुभविनः समर्पिताश्च संरक्षकाः" },
  shastra3: { en: "Thousands of learners impacted", hi: "हजारों शिक्षार्थी प्रभावित", sa: "सहस्राणि शिक्षार्थिनः प्रभाविताः" },
  shastra4: { en: "Focus on holistic growth – IQ, EQ & values", hi: "समग्र विकास पर ध्यान – IQ, EQ और मूल्य", sa: "समग्रविकासे ध्यानम् – बुद्धि भावना मूल्यानि च" },
  shastra5: { en: "Trusted name in Sanatan education", hi: "सनातन शिक्षा में विश्वसनीय नाम", sa: "सनातनशिक्षायां विश्वसनीयं नाम" },

  // Testimonials
  testimonialsTitle: {
    en: "What Parents & Students Say",
    hi: "माता-पिता और छात्र क्या कहते हैं",
    sa: "पितृमातरः छात्राश्च किं वदन्ति"
  },
  testimonial1: {
    en: "\"My daughter has become more disciplined and respectful. The stories from our scriptures have given her a strong moral foundation.\"",
    hi: "\"मेरी बेटी अधिक अनुशासित और सम्मानजनक हो गई है। हमारे शास्त्रों की कहानियों ने उसे मजबूत नैतिक आधार दिया है।\"",
    sa: "\"मम पुत्री अधिकम् अनुशासिता सम्मानयुक्ता च जाता। अस्माकं शास्त्राणां कथाः तस्यै दृढं नैतिकाधारं दत्तवत्यः।\""
  },
  testimonial1Author: { en: "Priya Sharma, Parent", hi: "प्रिया शर्मा, अभिभावक", sa: "प्रिया शर्मा, अभिभावक" },
  testimonial2: {
    en: "\"I love learning shlokas and the stories of our heroes. It makes me proud of being Indian!\"",
    hi: "\"मुझे श्लोक सीखना और हमारे नायकों की कहानियां पसंद हैं। इससे मुझे भारतीय होने पर गर्व होता है!\"",
    sa: "\"अहं श्लोकशिक्षणं अस्माकं नायकानां कथाश्च प्रियास्मि। एतेन अहं भारतीयत्वे गर्वान्वितः अस्मि!\""
  },
  testimonial2Author: { en: "Arjun, Age 12, Student", hi: "अर्जुन, आयु 12, छात्र", sa: "अर्जुनः, आयुः १२, छात्रः" },
  testimonial3: {
    en: "\"Bodhika has transformed my son. He's calmer, more focused, and has developed a beautiful connection with our traditions.\"",
    hi: "\"बोधिका ने मेरे बेटे को बदल दिया है। वह शांत, अधिक केंद्रित है और हमारी परंपराओं के साथ एक सुंदर संबंध विकसित किया है।\"",
    sa: "\"बोधिका मम पुत्रं परिवर्तितवती। सः शान्तः एकाग्रः च अस्ति अस्माकं परम्पराभिः सह सुन्दरं सम्बन्धं विकसितवान् च।\""
  },
  testimonial3Author: { en: "Rajesh Verma, Parent", hi: "राजेश वर्मा, अभिभावक", sa: "राजेशः वर्मा, अभिभावकः" },
  testimonial4: {
    en: "\"The mentors are amazing! They make learning so fun and I've made great friends in my batch.\"",
    hi: "\"संरक्षक अद्भुत हैं! वे सीखने को इतना मजेदार बनाते हैं और मैंने अपने बैच में बहुत अच्छे दोस्त बनाए हैं।\"",
    sa: "\"संरक्षकाः अद्भुताः! ते शिक्षणं एवं आनन्दप्रदं कुर्वन्ति अहं च स्वसमूहे उत्तमानि मित्राणि कृतवान्।\""
  },
  testimonial4Author: { en: "Ananya, Age 14, Student", hi: "अनन्या, आयु 14, छात्र", sa: "अनन्या, आयुः १४, छात्रा" },

  // FAQ
  faqTitle: {
    en: "Frequently Asked Questions",
    hi: "अक्सर पूछे जाने वाले प्रश्न",
    sa: "प्रायः पृच्छ्यमानाः प्रश्नाः"
  },
  faq1Q: { en: "Who can join Bodhika?", hi: "बोधिका में कौन शामिल हो सकता है?", sa: "बोधिकायां कः सम्मिलितुं शक्नोति?" },
  faq1A: { en: "Children and teens aged 8-17 years can join. No prior knowledge of Sanskrit or scriptures is required.", hi: "8-17 वर्ष की आयु के बच्चे और किशोर शामिल हो सकते हैं। संस्कृत या शास्त्रों का कोई पूर्व ज्ञान आवश्यक नहीं है।", sa: "८-१७ वर्षीयाः बालाः किशोराश्च सम्मिलितुं शक्नुवन्ति। संस्कृतस्य शास्त्राणां वा पूर्वज्ञानं नापेक्षितम्।" },
  faq2Q: { en: "Is prior knowledge of scriptures needed?", hi: "क्या शास्त्रों का पूर्व ज्ञान आवश्यक है?", sa: "किं शास्त्राणां पूर्वज्ञानम् आवश्यकम्?" },
  faq2A: { en: "No, the course is designed for beginners. We start from basics and make learning simple and enjoyable.", hi: "नहीं, पाठ्यक्रम शुरुआती लोगों के लिए डिज़ाइन किया गया है। हम मूल बातों से शुरू करते हैं और सीखने को सरल और आनंददायक बनाते हैं।", sa: "न, पाठ्यक्रमः प्रारम्भकानां कृते निर्मितः। वयं मूलेभ्यः प्रारभामहे शिक्षणं च सरलम् आनन्दप्रदं कुर्मः।" },
  faq3Q: { en: "Is it online or offline?", hi: "क्या यह ऑनलाइन या ऑफलाइन है?", sa: "किम् एतत् ऑनलाइन अथवा ऑफलाइन?" },
  faq3A: { en: "We offer flexible options: Online, Offline (at select locations), and Hybrid modes. Choose what works best for your child.", hi: "हम लचीले विकल्प प्रदान करते हैं: ऑनलाइन, ऑफलाइन (चुनिंदा स्थानों पर), और हाइब्रिड मोड। चुनें जो आपके बच्चे के लिए सबसे अच्छा काम करता है।", sa: "वयं लचीलान् विकल्पान् प्रदामः: ऑनलाइन, ऑफलाइन (चयनितस्थानेषु), मिश्रितप्रकाराश्च। भवतः बालाय यत् श्रेष्ठं तत् चिनुत।" },
  faq4Q: { en: "What are the class timings?", hi: "कक्षा का समय क्या है?", sa: "कक्षायाः समयः कः?" },
  faq4A: { en: "Classes are held on weekends. Specific timings are shared upon enrollment based on batch allocation.", hi: "कक्षाएं सप्ताहांत पर आयोजित की जाती हैं। विशिष्ट समय बैच आवंटन के आधार पर नामांकन पर साझा किया जाता है।", sa: "कक्षाः सप्ताहान्ते आयोज्यन्ते। विशिष्टाः समयाः समूहनियोजनानुसारं नामाङ्कने सूच्यन्ते।" },
  faq5Q: { en: "What is the language of teaching?", hi: "शिक्षण की भाषा क्या है?", sa: "शिक्षणस्य भाषा का?" },
  faq5A: { en: "Primary instruction is in Hindi with simple Sanskrit shlokas. English support is available for understanding.", hi: "प्राथमिक शिक्षा हिंदी में सरल संस्कृत श्लोकों के साथ है। समझने के लिए अंग्रेजी सहायता उपलब्ध है।", sa: "प्राथमिकशिक्षणं हिन्दीभाषायां सरलसंस्कृतश्लोकैः सह। अवबोधनार्थम् आङ्ग्लसाहाय्यम् उपलब्धम्।" },
  faq6Q: { en: "Is the certificate valid?", hi: "क्या प्रमाणपत्र वैध है?", sa: "किं प्रमाणपत्रं वैधम्?" },
  faq6A: { en: "Yes, students receive an official Certificate of Completion from Shastrakulam, recognizing their year-long learning journey.", hi: "हां, छात्रों को शास्त्रकुलम से आधिकारिक पूर्णता प्रमाणपत्र मिलता है, जो उनकी वर्ष भर की सीखने की यात्रा को मान्यता देता है।", sa: "आम्, छात्राः शास्त्रकुलमतः आधिकारिकं समापनप्रमाणपत्रं प्राप्नुवन्ति यत् तेषां वर्षपर्यन्तशिक्षणयात्रां मान्यताप्राप्तां करोति।" },
  faq7Q: { en: "How to apply for scholarship?", hi: "छात्रवृत्ति के लिए आवेदन कैसे करें?", sa: "छात्रवृत्त्यर्थम् आवेदनं कथं करणीयम्?" },
  faq7A: { en: "Contact us via WhatsApp or email with your scholarship application. We review each case individually and support deserving students.", hi: "व्हाट्सएप या ईमेल के माध्यम से अपने छात्रवृत्ति आवेदन के साथ हमसे संपर्क करें। हम प्रत्येक मामले की व्यक्तिगत रूप से समीक्षा करते हैं और योग्य छात्रों का समर्थन करते हैं।", sa: "व्हाट्सएप ईमेलद्वारा वा स्वछात्रवृत्त्यावेदनेन सह अस्मान् सम्पर्कयतु। वयं प्रत्येकं प्रकरणं व्यक्तिगतरूपेण समीक्षामहे योग्यच्छात्रान् समर्थयामश्च।" },

  // Enrollment Form
  enrollmentTitle: {
    en: "Secure Your Child's Seat",
    hi: "अपने बच्चे की सीट सुरक्षित करें",
    sa: "स्वबालस्य स्थानं सुरक्षितं कुरुत"
  },
  enrollmentSubtitle: {
    en: "Limited seats. Admissions on first-come basis.",
    hi: "सीमित सीटें। पहले आओ पहले पाओ के आधार पर प्रवेश।",
    sa: "सीमितस्थानानि। प्रथमागतप्राथम्येन प्रवेशाः।"
  },
  childName: { en: "Child's Name", hi: "बच्चे का नाम", sa: "बालस्य नाम" },
  childAge: { en: "Child's Age", hi: "बच्चे की आयु", sa: "बालस्य आयुः" },
  parentName: { en: "Parent's Name", hi: "अभिभावक का नाम", sa: "अभिभावकस्य नाम" },
  phone: { en: "Phone Number", hi: "फ़ोन नंबर", sa: "दूरभाषसङ्ख्या" },
  email: { en: "Email", hi: "ईमेल", sa: "ईमेल" },
  city: { en: "City", hi: "शहर", sa: "नगरम्" },
  selectBatch: { en: "Select Batch", hi: "बैच चुनें", sa: "समूहं चिनुत" },
  regular: { en: "Regular (₹6,000)", hi: "नियमित (₹6,000)", sa: "नियमितम् (₹६,०००)" },
  premium: { en: "Premium (₹13,000)", hi: "प्रीमियम (₹13,000)", sa: "प्रीमियम् (₹१३,०००)" },
  message: { en: "Any message or questions?", hi: "कोई संदेश या प्रश्न?", sa: "कश्चित् सन्देशः प्रश्नः वा?" },
  submitEnrollment: { en: "Secure My Child's Seat Now", hi: "अभी मेरे बच्चे की सीट सुरक्षित करें", sa: "अधुनैव मम बालस्य स्थानं सुरक्षयतु" },

  // Final CTA
  finalCtaTitle: {
    en: "Give Your Child the Gift of Values, Wisdom & Strong Roots",
    hi: "अपने बच्चे को मूल्यों, ज्ञान और मजबूत जड़ों का उपहार दें",
    sa: "स्वबालाय मूल्यानां ज्ञानस्य दृढमूलानां च उपहारं यच्छतु"
  },
  finalCtaDesc: {
    en: "Join Bodhika today and help your child grow into a confident, conscious, and compassionate human being.",
    hi: "आज ही बोधिका में शामिल हों और अपने बच्चे को एक आत्मविश्वासी, सचेत और दयालु इंसान बनने में मदद करें।",
    sa: "अद्यैव बोधिकायां सम्मिलत स्वबालं आत्मविश्वासिनं सचेतनं करुणामयं च मानवं भवितुं साहाय्यं कुरुत।"
  },
  inquireWhatsApp: {
    en: "Inquire via WhatsApp",
    hi: "व्हाट्सएप पर पूछताछ करें",
    sa: "व्हाट्सएप्-माध्यमेन पृच्छतु"
  },

  // Footer
  footerTagline: {
    en: "Let's change the world by transforming ourselves.",
    hi: "आइए खुद को बदलकर दुनिया को बदलें।",
    sa: "आत्मानं परिवर्त्य विश्वं परिवर्तयामः।"
  }
};

const Bodhika: React.FC = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    parentName: '',
    phone: '',
    email: '',
    city: '',
    batch: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = (key: keyof typeof bodhikaTranslations) => {
    return bodhikaTranslations[key][language as 'en' | 'hi' | 'sa'] || bodhikaTranslations[key].en;
  };

  const whatsappNumber = "919674916567";
  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in the Bodhika course. Please share more details.`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('course_enrollments').insert({
        course_id: 'bodhika-main',
        student_name: formData.childName,
        age: parseInt(formData.childAge) || null,
        email: formData.email,
        phone: formData.phone,
        message: `Parent: ${formData.parentName}, City: ${formData.city}, Batch: ${formData.batch}. ${formData.message}`,
        status: 'pending'
      });

      if (error) throw error;

      toast.success(language === 'hi' ? 'आपका आवेदन सफलतापूर्वक जमा हो गया!' : language === 'sa' ? 'भवतः आवेदनं सफलतया प्रेषितम्!' : 'Your application has been submitted successfully!');
      setFormData({ childName: '', childAge: '', parentName: '', phone: '', email: '', city: '', batch: '', message: '' });
    } catch (error) {
      toast.error(language === 'hi' ? 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।' : language === 'sa' ? 'किञ्चित् त्रुटिः। पुनः प्रयत्नं कुरुत।' : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToEnrollment = () => {
    document.getElementById('enrollment-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const learningCards = [
    { icon: Heart, title: t('learn1Title'), desc: t('learn1Desc') },
    { icon: Flame, title: t('learn2Title'), desc: t('learn2Desc') },
    { icon: Target, title: t('learn3Title'), desc: t('learn3Desc') },
    { icon: MessageCircle, title: t('learn4Title'), desc: t('learn4Desc') },
    { icon: Lightbulb, title: t('learn5Title'), desc: t('learn5Desc') },
    { icon: Sparkles, title: t('learn6Title'), desc: t('learn6Desc') },
  ];

  const testimonials = [
    { quote: t('testimonial1'), author: t('testimonial1Author') },
    { quote: t('testimonial2'), author: t('testimonial2Author') },
    { quote: t('testimonial3'), author: t('testimonial3Author') },
    { quote: t('testimonial4'), author: t('testimonial4Author') },
  ];

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
    { q: t('faq5Q'), a: t('faq5A') },
    { q: t('faq6Q'), a: t('faq6A') },
    { q: t('faq7Q'), a: t('faq7A') },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        {/* Animated Backgrounds */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-amber-300/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-br from-yellow-300/15 to-orange-300/15 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 md:right-20 text-orange-200 text-6xl md:text-9xl font-display opacity-30 animate-float">ॐ</div>
        <div className="absolute bottom-32 left-10 md:left-20 text-amber-200 text-5xl md:text-8xl font-display opacity-25 animate-float delay-700">श्री</div>
        <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-orange-400 rounded-full opacity-40 animate-ping"></div>
        <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-amber-400 rounded-full opacity-30 animate-ping delay-300"></div>

        {/* Mandala Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8 animate-fade-in">
              <Badge className="bg-orange-600 text-white px-4 py-2 text-sm font-medium shadow-lg">
                {t('byShastrakulam')}
              </Badge>
              <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-medium shadow-lg">
                <Radio className="w-3 h-3 mr-1" />
                {language === 'hi' ? 'लाइव कक्षाएं' : language === 'sa' ? 'जीवन्तकक्षाः' : 'Live Classes'}
              </Badge>
              <Badge variant="outline" className="border-orange-500 text-orange-700 px-4 py-2 text-sm">
                <Clock className="w-3 h-3 mr-1" />
                {t('limitedSeats')}
              </Badge>
              <Badge variant="outline" className="border-amber-500 text-amber-700 px-4 py-2 text-sm">
                <Gift className="w-3 h-3 mr-1" />
                {t('scholarshipsAvailable')}
              </Badge>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent mb-4 animate-fade-in leading-tight">
              {t('heroTitle')}
            </h1>

            <p className="font-display text-2xl sm:text-3xl md:text-4xl text-amber-700 mb-4 animate-fade-in delay-100">
              {t('heroSubtitle')}
            </p>

            <p className="font-body text-base sm:text-lg md:text-xl text-orange-800/80 mb-6 animate-fade-in delay-150 max-w-3xl mx-auto">
              {t('heroTagline')}
            </p>

            <p className="font-display text-lg sm:text-xl md:text-2xl text-orange-700 italic mb-10 animate-fade-in delay-200">
              "{t('heroMessage')}"
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-300">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-7 text-lg font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 rounded-full"
                onClick={scrollToEnrollment}
              >
                <GraduationCap className="mr-2 h-6 w-6" />
                {t('enrollNow')}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-orange-500 text-orange-700 hover:bg-orange-500 hover:text-white px-8 py-7 text-lg font-semibold transition-all rounded-full"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                <Download className="mr-2 h-5 w-5" />
                {t('downloadBrochure')}
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
              <ChevronDown className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Bodhika Section */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-orange-800 mb-4 lotus-underline inline-block">
              {t('whyBodhikaTitle')}
            </h2>
            <p className="font-body text-lg text-orange-700/80 mt-8">
              {t('whyBodhikaSubtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Problems */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 shadow-lg border border-red-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-display text-2xl text-red-700">{language === 'hi' ? 'चुनौतियां' : language === 'sa' ? 'आह्वानानि' : 'The Challenges'}</h3>
              </div>
              <div className="space-y-4">
                {[t('problem1'), t('problem2'), t('problem3'), t('problem4')].map((problem, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
                    <span className="text-red-500 mt-1">✗</span>
                    <p className="font-body text-red-800">{problem}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div className="bg-gradient-to-br from-green-50 to-amber-50 rounded-3xl p-8 shadow-lg border border-green-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-display text-2xl text-green-700">{t('promiseTitle')}</h3>
              </div>
              <div className="space-y-4">
                {[t('promise1'), t('promise2'), t('promise3'), t('promise4')].map((promise, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="font-body text-green-800">{promise}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Course */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-10 right-10 text-orange-300 text-[150px] font-display">॥</div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="font-display text-4xl md:text-5xl text-orange-800 text-center mb-12 lotus-underline inline-block w-full">
            <span className="inline-block">{t('aboutTitle')}</span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-3xl overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <p className="font-body text-lg text-foreground/90 leading-relaxed mb-8">
                  {t('aboutDesc1')}
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {[t('aboutHighlight1'), t('aboutHighlight2'), t('aboutHighlight3'), t('aboutHighlight4')].map((highlight, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-orange-50 rounded-2xl">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <p className="font-body text-orange-800 font-medium">{highlight}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-6 border-l-4 border-orange-500">
                  <p className="font-display text-xl text-orange-800 italic">
                    ✨ {t('aboutEmphasis')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Your Child Will Learn */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl text-orange-800 text-center mb-16 lotus-underline inline-block w-full">
            <span className="inline-block">{t('learnTitle')}</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {learningCards.map((card, i) => (
              <Card key={i} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-orange-50 rounded-2xl overflow-hidden hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display text-xl text-orange-800 mb-2">{card.title}</h3>
                  <p className="font-body text-foreground/70">{card.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-20 bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 text-white text-[200px] font-display">॥</div>
          <div className="absolute bottom-0 right-1/4 text-white text-[200px] font-display">॥</div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="font-display text-4xl md:text-5xl text-center mb-16">
            {t('detailsTitle')}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
            {[
              { icon: Calendar, label: t('duration'), value: t('durationValue') },
              { icon: Radio, label: t('liveClasses'), value: t('liveClassesValue') },
              { icon: Clock, label: t('schedule'), value: t('scheduleValue') },
              { icon: Award, label: t('certificate'), value: t('certificateValue') },
              { icon: Users, label: t('ageGroup'), value: t('ageValue') },
              { icon: Video, label: t('mode'), value: t('modeValue') },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors">
                <item.icon className="w-10 h-10 mx-auto mb-3 text-amber-200" />
                <p className="font-body text-amber-200 text-sm mb-2">{item.label}</p>
                <p className="font-display text-lg">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl text-orange-800 mb-4 lotus-underline inline-block">
              {t('videoTitle')}
            </h2>
            <p className="font-body text-lg text-orange-700/80 mt-8">
              {t('videoSubtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-orange-100 to-amber-100 group">
              {/* Video Placeholder - Replace with actual YouTube embed */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform cursor-pointer mb-4">
                  <Play className="w-10 h-10 text-white ml-1" fill="white" />
                </div>
                <p className="font-body text-orange-700 text-lg">{t('watchVideo')}</p>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-6 left-6 text-orange-300 text-4xl font-display opacity-30">ॐ</div>
              <div className="absolute bottom-6 right-6 text-amber-300 text-3xl font-display opacity-30">श्री</div>
              
              {/* You can replace this with an actual YouTube embed like:
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                title="Bodhika Course Introduction"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              */}
            </div>

            {/* Video Features */}
            <div className="grid sm:grid-cols-3 gap-6 mt-8">
              {[
                { icon: Radio, text: language === 'hi' ? 'लाइव इंटरैक्टिव कक्षाएं' : language === 'sa' ? 'जीवन्तपरस्परक्रियाकक्षाः' : 'Live Interactive Classes' },
                { icon: Users, text: language === 'hi' ? 'अनुभवी संरक्षक' : language === 'sa' ? 'अनुभविनः संरक्षकाः' : 'Expert Mentors' },
                { icon: Heart, text: language === 'hi' ? 'आनंदमय शिक्षण' : language === 'sa' ? 'आनन्दप्रदं शिक्षणम्' : 'Joyful Learning' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-md">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="font-body font-medium text-orange-800">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Batch Options */}
      <section className="py-20 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-orange-800 mb-4 lotus-underline inline-block">
              {t('batchTitle')}
            </h2>
            <p className="font-body text-lg text-orange-700/80 mt-8">
              {t('batchSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Regular Batch */}
            <Card className="relative bg-white rounded-3xl shadow-xl border-2 border-orange-200 hover:border-orange-400 transition-all overflow-hidden group hover:-translate-y-2">
              <div className="absolute top-4 right-4">
                <Badge className="bg-orange-100 text-orange-700">{t('mostPopular')}</Badge>
              </div>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl text-orange-800 mb-2">{t('regularBatch')}</h3>
                <p className="font-body text-orange-600 mb-4">{t('regularBatchSize')}</p>
                
                <div className="mb-6">
                  <span className="font-display text-5xl text-orange-600">{t('regularBatchFee')}</span>
                  <p className="font-body text-foreground/60 text-sm mt-1">{t('regularBatchDesc')}</p>
                </div>

                <div className="space-y-3 mb-8">
                  {[t('regularFeature1'), t('regularFeature2'), t('regularFeature3'), t('regularFeature4')].map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="font-body text-foreground/80">{f}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-6 rounded-xl font-semibold text-lg"
                  onClick={scrollToEnrollment}
                >
                  {t('enrollNow')}
                </Button>
              </CardContent>
            </Card>

            {/* Premium Batch */}
            <Card className="relative bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl shadow-xl border-2 border-amber-400 hover:border-amber-500 transition-all overflow-hidden group hover:-translate-y-2">
              <div className="absolute top-4 right-4">
                <Badge className="bg-amber-500 text-white">
                  <Crown className="w-3 h-3 mr-1" />
                  {t('recommended')}
                </Badge>
              </div>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl text-amber-800 mb-2">{t('premiumBatch')}</h3>
                <p className="font-body text-amber-600 mb-4">{t('premiumBatchSize')}</p>
                
                <div className="mb-6">
                  <span className="font-display text-5xl text-amber-600">{t('premiumBatchFee')}</span>
                  <p className="font-body text-foreground/60 text-sm mt-1">{t('premiumBatchDesc')}</p>
                </div>

                <div className="space-y-3 mb-8">
                  {[t('premiumFeature1'), t('premiumFeature2'), t('premiumFeature3'), t('premiumFeature4')].map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-amber-500" />
                      <span className="font-body text-foreground/80">{f}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white py-6 rounded-xl font-semibold text-lg"
                  onClick={scrollToEnrollment}
                >
                  {t('enrollNow')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Scholarship Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Gift className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
            <h2 className="font-display text-3xl md:text-4xl mb-4">{t('scholarshipTitle')}</h2>
            <p className="font-body text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              {t('scholarshipDesc')}
            </p>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-6 text-lg rounded-full"
              onClick={() => window.open(whatsappUrl, '_blank')}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              {t('applyScholarship')}
            </Button>
          </div>
        </div>
      </section>

      {/* Why Shastrakulam */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl text-orange-800 text-center mb-16 lotus-underline inline-block w-full">
            <span className="inline-block">{t('whyShastrakulamTitle')}</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {[
              { icon: BookOpen, text: t('shastra1') },
              { icon: Users, text: t('shastra2') },
              { icon: Trophy, text: t('shastra3') },
              { icon: Brain, text: t('shastra4') },
              { icon: Shield, text: t('shastra5') },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-orange-50 rounded-full px-6 py-4 shadow-md hover:shadow-lg transition-shadow">
                <item.icon className="w-6 h-6 text-orange-600" />
                <span className="font-body font-medium text-orange-800">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl text-orange-800 text-center mb-16 lotus-underline inline-block w-full">
            <span className="inline-block">{t('testimonialsTitle')}</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="bg-white rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <Quote className="w-10 h-10 text-orange-300 mb-4" />
                  <p className="font-body text-foreground/80 italic mb-6 text-lg leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <p className="font-display text-orange-700">{testimonial.author}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl text-orange-800 text-center mb-16 lotus-underline inline-block w-full">
            <span className="inline-block">{t('faqTitle')}</span>
          </h2>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-orange-50 rounded-2xl border-0 overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 font-display text-lg text-orange-800 hover:text-orange-600 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 font-body text-foreground/80">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section id="enrollment-section" className="py-20 bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-white text-[150px] font-display">ॐ</div>
          <div className="absolute bottom-20 right-10 text-white text-[120px] font-display">श्री</div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <GraduationCap className="w-16 h-16 mx-auto mb-4 text-amber-200" />
              <h2 className="font-display text-3xl md:text-4xl mb-2">{t('enrollmentTitle')}</h2>
              <p className="font-body text-amber-200">{t('enrollmentSubtitle')}</p>
            </div>

            <Card className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border-0">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="childName" className="text-orange-800">{t('childName')}</Label>
                      <Input
                        id="childName"
                        value={formData.childName}
                        onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                        required
                        className="mt-1 border-orange-200 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="childAge" className="text-orange-800">{t('childAge')}</Label>
                      <Input
                        id="childAge"
                        type="number"
                        min="8"
                        max="17"
                        value={formData.childAge}
                        onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                        required
                        className="mt-1 border-orange-200 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="parentName" className="text-orange-800">{t('parentName')}</Label>
                    <Input
                      id="parentName"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      required
                      className="mt-1 border-orange-200 focus:border-orange-500"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-orange-800">{t('phone')}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="mt-1 border-orange-200 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-orange-800">{t('email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="mt-1 border-orange-200 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-orange-800">{t('city')}</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                        className="mt-1 border-orange-200 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="batch" className="text-orange-800">{t('selectBatch')}</Label>
                      <Select value={formData.batch} onValueChange={(value) => setFormData({ ...formData, batch: value })}>
                        <SelectTrigger className="mt-1 border-orange-200 focus:border-orange-500">
                          <SelectValue placeholder={t('selectBatch')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="regular">{t('regular')}</SelectItem>
                          <SelectItem value="premium">{t('premium')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-orange-800">{t('message')}</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1 border-orange-200 focus:border-orange-500"
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-6 rounded-xl font-bold text-lg shadow-lg"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin">⏳</span>
                        {language === 'hi' ? 'जमा हो रहा है...' : language === 'sa' ? 'प्रेष्यते...' : 'Submitting...'}
                      </span>
                    ) : (
                      <>
                        <GraduationCap className="mr-2 h-5 w-5" />
                        {t('submitEnrollment')}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-amber-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 text-orange-300 text-[200px] font-display">ॐ</div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="w-16 h-16 mx-auto mb-6 text-orange-500" />
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-orange-800 mb-6 leading-tight">
              {t('finalCtaTitle')}
            </h2>
            <p className="font-body text-xl text-orange-700/80 mb-10 max-w-2xl mx-auto">
              {t('finalCtaDesc')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-10 py-7 text-xl font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 rounded-full"
                onClick={scrollToEnrollment}
              >
                <GraduationCap className="mr-2 h-6 w-6" />
                {t('enrollNow')}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-orange-500 text-orange-700 hover:bg-orange-500 hover:text-white px-10 py-7 text-xl font-semibold transition-all rounded-full"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                <MessageCircle className="mr-2 h-6 w-6" />
                {t('inquireWhatsApp')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Bodhika;
