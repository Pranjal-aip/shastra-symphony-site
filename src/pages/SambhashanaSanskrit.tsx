import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  CheckCircle2,
  MessageCircle,
  Users,
  Clock,
  Sparkles,
  Calendar,
  Video,
  Headphones,
  BookOpen,
  Heart,
  ArrowRight,
  Flame,
  Star,
  Globe,
  GraduationCap,
  PlayCircle,
  ShieldCheck,
  HandHeart,
} from 'lucide-react';
import heroImage from '@/assets/sanskrit-course-hero.jpg';

const ENROLL_LINK = 'https://learn.shastrakulam.com/courses/Sanskrit-Sambhashan-69fdad295f6900c59577d5b0';

const SPONSORS: { name: string; amount: number }[] = [
  { name: 'Tika Nand Vidyarthi', amount: 2000 },
  { name: 'Harkishan', amount: 500 },
  { name: 'Kanhaiya Aary', amount: 500 },
  { name: 'Sachin Kumar', amount: 1000 },
  { name: 'Bhuneshwar Kumar Naik', amount: 500 },
  { name: 'Sonu Kumar', amount: 200 },
  { name: 'Amit Tomar', amount: 200 },
  { name: 'Arula Dange', amount: 500 },
  { name: 'Dheeraj', amount: 200 },
  { name: 'Avinash Kumar', amount: 1000 },
  { name: 'Vikas Kumar', amount: 500 },
  { name: 'Rajesh B. Pandya', amount: 200 },
  { name: 'Bhoomika Mishra', amount: 500 },
  { name: 'Deepti Soni', amount: 2000 },
  { name: 'Bhanja Kishore Sahoo', amount: 500 },
  { name: 'Lalita Trivedi', amount: 200 },
  { name: 'Harish Kumar', amount: 200 },
  { name: 'Sewa Ram', amount: 500 },
  { name: 'Raghavendra Pratap Singh', amount: 500 },
  { name: 'Bharti Jain', amount: 200 },
  { name: 'Yogesh Kumar', amount: 500 },
  { name: 'Aavya Annya Kumari', amount: 200 },
  { name: 'Pritam Kumar', amount: 2000 },
  { name: 'Ambika Chauhan', amount: 200 },
  { name: 'Bhupinder Dhir', amount: 200 },
  { name: 'Manish Kumar', amount: 200 },
  { name: 'Rajkumar Verma', amount: 500 },
  { name: 'Puneet', amount: 500 },
  { name: 'Alka Rawal', amount: 500 },
  { name: 'Manoj S Kajale', amount: 200 },
  { name: 'Jitendra Kumar', amount: 500 },
  { name: 'Rajesh Kumar', amount: 200 },
  { name: 'Brajesh Kumar', amount: 2000 },
  { name: 'Ayushi Farmania', amount: 500 },
  { name: 'Akshat', amount: 200 },
].sort((a, b) => b.amount - a.amount);

// ---------------- translations ----------------
const tr = {
  navBadge: { en: 'New Batch · June 2026', hi: 'नया बैच · जून 2026', sa: 'नूतनः गणः · जून २०२६' },
  heroTitle: {
    en: 'Fluent Sanskrit Conversations',
    hi: 'धाराप्रवाह संस्कृत संवाद',
    sa: 'प्रवाहिणी संस्कृतसम्भाषणम्',
  },
  heroTagline: {
    en: 'Speak Sanskrit Naturally & Confidently',
    hi: 'संस्कृत स्वाभाविक रूप से और आत्मविश्वास से बोलें',
    sa: 'संस्कृतं सहजतया आत्मविश्वासेन च वदत',
  },
  heroSub: {
    en: 'No Grammar Burden • Practical Conversations • Beginner Friendly',
    hi: 'व्याकरण का बोझ नहीं • व्यावहारिक संवाद • शुरुआती के लिए उपयुक्त',
    sa: 'न व्याकरणभारः • व्यावहारिकसम्भाषणम् • आरम्भकमित्रम्',
  },
  enrollNow: { en: 'Enroll Now', hi: 'अभी नामांकन करें', sa: 'अद्यैव नामाङ्कयत' },
  joinDemo: { en: 'Join Free Demo Class', hi: 'मुफ्त डेमो क्लास में शामिल हों', sa: 'निःशुल्कं प्रदर्शनवर्गं प्राप्नुत' },
  trust1: { en: 'Beginner Friendly', hi: 'शुरुआती के लिए', sa: 'आरम्भकाणां कृते' },
  trust2: { en: 'For All Age Groups', hi: 'सभी आयु वर्ग', sa: 'सर्वायुर्यानां कृते' },
  trust3: { en: 'Live + Recorded Access', hi: 'लाइव + रिकॉर्डेड एक्सेस', sa: 'सजीव + अभिलिखित प्रवेशः' },

  aboutTitle: { en: 'About the Course', hi: 'पाठ्यक्रम के बारे में', sa: 'पाठ्यक्रमविषये' },
  aboutDesc: {
    en: 'This course introduces Sambhashana Sanskrit (spoken Sanskrit) — a practical approach focused on real conversations, not memorising grammar rules.',
    hi: 'यह पाठ्यक्रम सम्भाषण संस्कृत (बोलचाल की संस्कृत) का परिचय देता है — व्याकरण रटने के बजाय वास्तविक संवाद पर केंद्रित।',
    sa: 'अयं पाठ्यक्रमः सम्भाषणसंस्कृतस्य परिचयं ददाति — व्याकरणनियमस्मरणस्य स्थाने वास्तविकसंवादे केन्द्रितः।',
  },
  about1: { en: 'Daily-use words and expressions', hi: 'रोज़मर्रा के शब्द और वाक्यांश', sa: 'दैनिकोपयोगि शब्दाः वाक्यानि च' },
  about2: { en: 'Real-life conversations', hi: 'वास्तविक जीवन के संवाद', sa: 'वास्तविकजीवनसंवादाः' },
  about3: { en: 'Simple sentence construction', hi: 'सरल वाक्य निर्माण', sa: 'सरलवाक्यरचना' },
  about4: { en: 'Basic verb usage for communication', hi: 'संवाद के लिए मूल क्रिया प्रयोग', sa: 'सम्प्रेषणाय मूलक्रियाप्रयोगः' },

  gainTitle: { en: 'What You Will Gain', hi: 'आप क्या प्राप्त करेंगे', sa: 'भवन्तः किं प्राप्स्यन्ति' },
  gain: [
    {
      icon: MessageCircle,
      t: { en: 'Speak with confidence', hi: 'आत्मविश्वास से बोलें', sa: 'आत्मविश्वासेन वदत' },
      d: {
        en: 'Hold simple Sanskrit conversations without hesitation.',
        hi: 'बिना झिझक सरल संस्कृत संवाद करें।',
        sa: 'अहैतुकं सरलं संस्कृतसम्भाषणं कुरुत।',
      },
    },
    {
      icon: Sparkles,
      t: { en: 'Build sentences naturally', hi: 'स्वाभाविक रूप से वाक्य बनाएं', sa: 'सहजतया वाक्यानि रचयत' },
      d: {
        en: 'Construct sentences without relying on grammar rules.',
        hi: 'व्याकरण नियमों पर निर्भर हुए बिना वाक्य बनाएं।',
        sa: 'व्याकरणनियमान् विना वाक्यानि रचयत।',
      },
    },
    {
      icon: Headphones,
      t: { en: 'Listen & speak fluently', hi: 'सुनें और धाराप्रवाह बोलें', sa: 'शृणुत प्रवाहेण च वदत' },
      d: {
        en: 'Improve listening and speaking through practical usage.',
        hi: 'व्यावहारिक प्रयोग से सुनना और बोलना सुधारें।',
        sa: 'व्यावहारिकप्रयोगेण श्रवणं भाषणं च वर्धयत।',
      },
    },
    {
      icon: BookOpen,
      t: { en: 'Strong foundation', hi: 'मजबूत आधार', sa: 'दृढं नींवम्' },
      d: {
        en: 'A solid base for continued Sanskrit learning.',
        hi: 'आगे की संस्कृत शिक्षा के लिए ठोस आधार।',
        sa: 'अग्रे संस्कृताध्ययनाय दृढाधारः।',
      },
    },
  ],

  materialsTitle: { en: 'What You Get', hi: 'आपको क्या मिलेगा', sa: 'भवन्तः किं प्राप्स्यन्ति' },
  materials: [
    {
      icon: Video,
      t: { en: 'Recorded online sessions', hi: 'रिकॉर्डेड ऑनलाइन सत्र', sa: 'अभिलिखितानि सत्राणि' },
      d: { en: 'Lifetime access to revisit anytime.', hi: 'आजीवन कभी भी पुनः देखें।', sa: 'आजीवनं यदा कदा अपि पश्यत।' },
    },
    {
      icon: BookOpen,
      t: { en: 'Practice materials & sentence patterns', hi: 'अभ्यास सामग्री और वाक्य पैटर्न', sa: 'अभ्याससामग्री वाक्यप्रतिमानानि च' },
      d: { en: 'Useful phrases for daily practice.', hi: 'दैनिक अभ्यास के लिए उपयोगी वाक्यांश।', sa: 'दैनिकाभ्यासाय उपयोगि वाक्यानि।' },
    },
    {
      icon: MessageCircle,
      t: { en: 'Guided conversation-building exercises', hi: 'मार्गदर्शित संवाद-निर्माण अभ्यास', sa: 'मार्गदर्शिताः संवादनिर्माणाभ्यासाः' },
      d: { en: 'Step-by-step practice to build dialogues.', hi: 'संवाद बनाने का चरणबद्ध अभ्यास।', sa: 'संवादनिर्माणस्य क्रमिकाभ्यासः।' },
    },
    {
      icon: GraduationCap,
      t: { en: 'Structured learning support', hi: 'संरचित शिक्षण सहयोग', sa: 'संरचितं शिक्षणसमर्थनम्' },
      d: { en: 'Clear path from beginner to confident speaker.', hi: 'शुरुआती से आत्मविश्वासी वक्ता तक स्पष्ट मार्ग।', sa: 'आरम्भकात् आत्मविश्वासिवक्तृत्वं प्रति स्पष्टमार्गः।' },
    },
  ],
  materialsNote: {
    en: 'Note: Due to a large number of participants, live interaction opportunities may be limited.',
    hi: 'सूचना: प्रतिभागियों की अधिक संख्या के कारण, लाइव संवाद के अवसर सीमित हो सकते हैं।',
    sa: 'सूचना: बहूनां सहभागिनां कारणात् सजीवसंवादावसराः सीमिताः स्युः।',
  },

  // Course Effort
  effortTitle: { en: 'Course Effort', hi: 'पाठ्यक्रम परिश्रम', sa: 'पाठ्यक्रमप्रयासः' },
  effortSub: {
    en: '35–40 Hours Total Learning Experience · Live Sessions + Self Study + Assessments',
    hi: '35–40 घंटे का कुल अनुभव · लाइव सत्र + स्व-अध्ययन + मूल्यांकन',
    sa: '३५–४० होराः समग्रशिक्षणानुभवः · सजीवसत्राणि + स्वाध्यायः + मूल्याङ्कनम्',
  },
  effortLectures: { en: 'Lectures', hi: 'व्याख्यान', sa: 'व्याख्यानानि' },
  effortLecturesV: { en: '20 hours', hi: '20 घंटे', sa: '२० होराः' },
  effortSelf: { en: 'Self-Study', hi: 'स्व-अध्ययन', sa: 'स्वाध्यायः' },
  effortSelfV: { en: '12 hours', hi: '12 घंटे', sa: '१२ होराः' },
  effortAssess: { en: 'Assessments', hi: 'मूल्यांकन', sa: 'मूल्याङ्कनम्' },
  effortAssessV: { en: '8 hours', hi: '8 घंटे', sa: '८ होराः' },
  effortTotal: {
    en: '~40 hours of learner-effort across live sessions, recorded class material, and prescribed assessments.',
    hi: 'लगभग 40 घंटे का शिक्षार्थी प्रयास — लाइव सत्र, रिकॉर्डेड सामग्री और निर्धारित मूल्यांकन सहित।',
    sa: 'प्रायः ४० होराः शिक्षार्थिप्रयासः — सजीवसत्राणि, अभिलिखितसामग्री, निर्दिष्टमूल्याङ्कनं च समाविष्टम्।',
  },
  effortTag1: { en: 'Online Live Classes', hi: 'ऑनलाइन लाइव कक्षाएं', sa: 'सजीवाः अन्तर्जालवर्गाः' },
  effortTag2: { en: 'Suitable for All Age Groups', hi: 'सभी आयु वर्ग के लिए उपयुक्त', sa: 'सर्वायुर्याणां कृते योग्यम्' },
  effortTag3: { en: 'Limited Interaction Due to Large Participation', hi: 'अधिक प्रतिभागिता के कारण सीमित संवाद', sa: 'अधिकसहभागितायाः कारणात् सीमितः संवादः' },

  eligibilityTitle: { en: 'Who Can Join', hi: 'कौन शामिल हो सकता है', sa: 'के सम्मेलितुं शक्नुवन्ति' },
  elig: [
    { en: 'Anyone interested in spoken Sanskrit', hi: 'बोलचाल संस्कृत में रुचि रखने वाला कोई भी', sa: 'सम्भाषणसंस्कृते रुचिः यस्य कस्य अपि' },
    { en: 'No prior knowledge required', hi: 'पूर्व ज्ञान आवश्यक नहीं', sa: 'पूर्वज्ञानं नापेक्ष्यते' },
    { en: 'No grammar background needed', hi: 'व्याकरण पृष्ठभूमि आवश्यक नहीं', sa: 'व्याकरणपूर्वज्ञानं न आवश्यकम्' },
  ],

  detailsTitle: { en: 'Course Details', hi: 'पाठ्यक्रम विवरण', sa: 'पाठ्यक्रमविवरणम्' },
  startsLabel: { en: 'Starts', hi: 'आरंभ', sa: 'आरम्भः' },
  startsValue: { en: 'June 2026', hi: 'जून 2026', sa: 'जून २०२६' },
  modeLabel: { en: 'Mode', hi: 'माध्यम', sa: 'माध्यमम्' },
  modeValue: { en: 'Live Online + Recordings', hi: 'लाइव ऑनलाइन + रिकॉर्डिंग', sa: 'सजीव ऑनलाइन + अभिलेखाः' },
  audienceLabel: { en: 'For', hi: 'किनके लिए', sa: 'केषां कृते' },
  audienceValue: { en: 'All age groups', hi: 'सभी आयु वर्ग', sa: 'सर्वायुर्याः' },
  timeLabel: { en: 'Class Time', hi: 'कक्षा समय', sa: 'वर्गसमयः' },
  timeValue: { en: '8:00 PM (IST) · Starting June 2026', hi: 'रात्रि 8:00 बजे (IST) · जून 2026 से आरंभ', sa: 'रात्रौ ८:०० वादने (IST) · जून २०२६ तः आरम्भः' },

  pricingTitle: { en: 'Pay What You Want', hi: 'जो चाहें भुगतान करें', sa: 'यथेच्छं दीयताम्' },
  actualValue: { en: 'Actual Value', hi: 'वास्तविक मूल्य', sa: 'वास्तविकमूल्यम्' },
  todayLabel: { en: 'Today', hi: 'आज', sa: 'अद्य' },
  payRange: { en: '₹0 – ₹999+', hi: '₹0 – ₹999+', sa: '₹० – ₹९९९+' },
  contributionLine: {
    en: 'Your contribution supports spreading Sanskrit education to more learners.',
    hi: 'आपका योगदान अधिक शिक्षार्थियों तक संस्कृत शिक्षा पहुँचाने में सहायता करता है।',
    sa: 'भवतः योगदानं अधिकशिक्षार्थिनां प्रति संस्कृतशिक्षाप्रसारे साहाय्यं करोति।',
  },
  secureSeat: { en: 'Secure Your Seat Now', hi: 'अभी अपनी सीट सुरक्षित करें', sa: 'अद्यैव स्वस्थानं सुरक्षितं कुरुत' },

  urgencyTitle: { en: 'Limited Seats — Next Batch Starts in June', hi: 'सीमित सीटें — अगला बैच जून में शुरू', sa: 'सीमितस्थानानि — आगामि गणः जून-मासे आरभ्यते' },
  countdownStart: { en: 'Course Starts In', hi: 'कोर्स शुरू होने में', sa: 'पाठ्यक्रमः आरभ्यते' },
  days: { en: 'Days', hi: 'दिन', sa: 'दिनानि' },
  hours: { en: 'Hours', hi: 'घंटे', sa: 'होराः' },
  minutes: { en: 'Minutes', hi: 'मिनट', sa: 'निमेषाः' },
  seconds: { en: 'Seconds', hi: 'सेकंड', sa: 'क्षणाः' },

  trustTitle: { en: 'Why Shastrakulam', hi: 'शास्त्रकुलम् क्यों', sa: 'किमर्थं शास्त्रकुलम्' },
  trustItems: [
    {
      icon: Heart,
      t: { en: 'Rooted in Bharatiya tradition', hi: 'भारतीय परंपरा में निहित', sa: 'भारतीयपरम्परायां प्रतिष्ठितम्' },
    },
    {
      icon: Sparkles,
      t: { en: 'Practical & modern teaching', hi: 'व्यावहारिक और आधुनिक शिक्षण', sa: 'व्यावहारिकं आधुनिकं च अध्यापनम्' },
    },
    {
      icon: Users,
      t: { en: 'Growing learning community', hi: 'बढ़ता हुआ शिक्षण समुदाय', sa: 'वर्धमानः शिक्षासमुदायः' },
    },
  ],

  faqTitle: { en: 'Frequently Asked Questions', hi: 'अक्सर पूछे जाने वाले प्रश्न', sa: 'सामान्यप्रश्नाः' },
  faqs: [
    {
      q: { en: 'Is Sanskrit difficult to learn?', hi: 'क्या संस्कृत कठिन है?', sa: 'किं संस्कृतं कठिनम्?' },
      a: {
        en: 'Not at all. We teach through everyday conversation, not heavy grammar.',
        hi: 'बिल्कुल नहीं। हम भारी व्याकरण के बजाय रोज़मर्रा की बातचीत के माध्यम से सिखाते हैं।',
        sa: 'न एव। वयं गुरुव्याकरणस्य स्थाने दैनिकसंवादैः अध्यापयामः।',
      },
    },
    {
      q: { en: 'Will I really be able to speak?', hi: 'क्या मैं सचमुच बोल पाऊंगा?', sa: 'किम् अहं वस्तुतः वक्तुं शक्ष्यामि?' },
      a: {
        en: 'Yes. The entire focus is practical speaking from day one.',
        hi: 'हाँ। पूरा ध्यान पहले दिन से व्यावहारिक बोलने पर है।',
        sa: 'आम्। प्रथमदिनात् एव व्यावहारिकभाषणे केन्द्रितम्।',
      },
    },
    {
      q: { en: 'What if I miss a class?', hi: 'अगर मैं क्लास मिस कर दूँ?', sa: 'यदि वर्गं त्यजामि तर्हि?' },
      a: {
        en: 'All sessions are recorded — watch anytime.',
        hi: 'सभी सत्र रिकॉर्ड किए जाते हैं — कभी भी देखें।',
        sa: 'सर्वाणि सत्राणि अभिलिख्यन्ते — यदा कदा अपि पश्यत।',
      },
    },
    {
      q: { en: 'Is it truly beginner friendly?', hi: 'क्या यह वास्तव में शुरुआती के लिए है?', sa: 'किं वस्तुतः आरम्भकाणां कृते?' },
      a: { en: '100% yes. No prior knowledge needed.', hi: '100% हाँ। पूर्व ज्ञान आवश्यक नहीं।', sa: 'आम्, १००%। पूर्वज्ञानं न आवश्यकम्।' },
    },
  ],

  finalTitle: {
    en: 'Start Speaking Sanskrit With Your Family Today',
    hi: 'आज ही अपने परिवार के साथ संस्कृत बोलना शुरू करें',
    sa: 'अद्यैव स्वकुटुम्बेन सह संस्कृतं वक्तुं प्रारभध्वम्',
  },

  formTitle: { en: 'Reserve Your Spot', hi: 'अपनी सीट बुक करें', sa: 'स्वस्थानं आरक्षयत' },
  formSub: { en: 'Get a WhatsApp confirmation within minutes.', hi: 'कुछ ही मिनटों में व्हाट्सएप पर पुष्टि पाएं।', sa: 'क्षणैः व्हाट्सऍप्-द्वारा पुष्टिं प्राप्नुत।' },
  name: { en: 'Your Name', hi: 'आपका नाम', sa: 'भवतः नाम' },
  whatsapp: { en: 'WhatsApp Number', hi: 'व्हाट्सएप नंबर', sa: 'व्हाट्सऍप्-संख्या' },
  submit: { en: 'Send via WhatsApp', hi: 'व्हाट्सएप पर भेजें', sa: 'व्हाट्सऍप्-द्वारा प्रेषयत' },

  testimonialsTitle: { en: 'Loved by Learners', hi: 'शिक्षार्थियों द्वारा पसंद किया गया', sa: 'शिक्षार्थिभिः रुचितम्' },
  testimonials: [
    {
      n: 'Priya S.',
      r: { en: 'My kids and I started speaking simple Sanskrit at home in just 2 weeks!', hi: 'मेरे बच्चे और मैं केवल 2 हफ्तों में घर पर सरल संस्कृत बोलने लगे!', sa: 'मम बालाः अहं च केवलं द्विसप्ताहैः गृहे सरलं संस्कृतं वक्तुं प्रारब्धवन्तः!' },
    },
    {
      n: 'Rahul M.',
      r: { en: 'Finally a course that focuses on speaking, not memorising grammar.', hi: 'अंततः एक कोर्स जो व्याकरण रटने के बजाय बोलने पर केंद्रित है।', sa: 'अन्ततः एकः पाठ्यक्रमः यः व्याकरणस्मरणस्य स्थाने भाषणे केन्द्रितः।' },
    },
    {
      n: 'Anjali V.',
      r: { en: 'Warm teachers, simple lessons, and beautiful cultural connection.', hi: 'मधुर शिक्षक, सरल पाठ, और सुंदर सांस्कृतिक जुड़ाव।', sa: 'स्निग्धाः आचार्याः, सरलाः पाठाः, सुन्दरः सांस्कृतिकसम्बन्धश्च।' },
    },
  ],
};

// ---------------- Countdown ----------------
const CountdownTo: React.FC<{ target: Date }> = ({ target }) => {
  const { t } = useLanguage();
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff / 3600000) % 24),
      m: Math.floor((diff / 60000) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calc());
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  const Unit = ({ v, l }: { v: number; l: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary))]/80 text-primary-foreground font-heading text-2xl sm:text-3xl md:text-4xl font-bold w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 rounded-xl flex items-center justify-center shadow-lg">
        {String(v).padStart(2, '0')}
      </div>
      <span className="text-[10px] sm:text-xs mt-2 text-muted-foreground font-body">{l}</span>
    </div>
  );
  return (
    <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
      <Unit v={time.d} l={t(tr.days)} />
      <Unit v={time.h} l={t(tr.hours)} />
      <Unit v={time.m} l={t(tr.minutes)} />
      <Unit v={time.s} l={t(tr.seconds)} />
    </div>
  );
};

// ---------------- Page ----------------
const SambhashanaSanskrit: React.FC = () => {
  const { t, language } = useLanguage();
  const [showSticky, setShowSticky] = useState(false);
  const targetDate = new Date('2026-06-01T20:00:00+05:30');

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goEnroll = () => {
    window.open(ENROLL_LINK, '_blank', 'noopener,noreferrer');
  };

  return (
    <Layout>
      <Helmet>
        <title>Spoken Sanskrit Course (Sambhashana) — June Batch | Shastrakulam</title>
        <meta
          name="description"
          content="Learn to speak Sanskrit naturally — Sambhashana Sanskrit course for all ages. Live online + recordings. New batch starts June. Pay what you want."
        />
        <link rel="canonical" href="https://shastrakulam.com/courses/spoken-sanskrit" />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(35_100%_97%)] via-white to-[hsl(35_100%_97%)]">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, hsl(var(--accent)) 0, transparent 40%), radial-gradient(circle at 80% 60%, hsl(var(--primary)) 0, transparent 40%)' }} />
        <div className="container mx-auto px-4 py-10 md:py-20 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="bg-[hsl(var(--accent))]/15 text-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/20 border-[hsl(var(--accent))]/30 mb-4">
                <Flame className="h-3 w-3 mr-1" /> {t(tr.navBadge)}
              </Badge>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(var(--primary))] leading-tight mb-3">
                {t(tr.heroTitle)}
              </h1>
              <p className="font-heading text-lg sm:text-xl md:text-2xl text-[hsl(var(--accent))] font-semibold mb-3">
                {t(tr.heroTagline)}
              </p>
              <p className="font-body text-sm sm:text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
                {t(tr.heroSub)}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button size="lg" variant="saffron" onClick={() => goEnroll()} className="text-base">
                  {t(tr.enrollNow)} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                {[tr.trust1, tr.trust2, tr.trust3].map((b, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[hsl(var(--accent))]" />
                    <span>{t(b)}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-[hsl(var(--accent))]/20">
                <img
                  src={heroImage}
                  alt="Indian family learning Sanskrit together in a serene Gurukul setting"
                  width={1536}
                  height={1024}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/30 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl px-4 py-3 hidden sm:flex items-center gap-2 border border-[hsl(var(--accent))]/20">
                <Star className="h-4 w-4 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
                <span className="text-sm font-semibold">4.9 / 5 from learners</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--primary))] text-center mb-3">
            {t(tr.aboutTitle)}
          </h2>
          <p className="font-body text-center text-muted-foreground max-w-3xl mx-auto mb-10 text-base sm:text-lg">
            {t(tr.aboutDesc)}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[tr.about1, tr.about2, tr.about3, tr.about4].map((x, i) => (
              <Card key={i} className="border-[hsl(var(--accent))]/15 hover:shadow-md transition">
                <CardContent className="p-5 flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[hsl(var(--accent))] flex-shrink-0 mt-0.5" />
                  <span className="font-body">{t(x)}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* GAINS */}
      <section className="py-14 md:py-20 bg-[hsl(35_100%_97%)]">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--primary))] text-center mb-10">
            {t(tr.gainTitle)}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tr.gain.map((g, i) => {
              const Icon = g.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Card className="h-full border-[hsl(var(--accent))]/20 hover:shadow-lg transition">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[hsl(var(--accent))]/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-[hsl(var(--accent))]" />
                      </div>
                      <h3 className="font-heading font-semibold text-lg mb-2 text-[hsl(var(--primary))]">{t(g.t)}</h3>
                      <p className="text-sm text-muted-foreground">{t(g.d)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--primary))] text-center mb-10">
            {t(tr.materialsTitle)}
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {tr.materials.map((m, i) => {
              const Icon = m.icon;
              return (
                <Card key={i} className="border-[hsl(var(--accent))]/15">
                  <CardContent className="p-6">
                    <Icon className="h-7 w-7 text-[hsl(var(--accent))] mb-3" />
                    <h3 className="font-heading font-semibold text-lg text-[hsl(var(--primary))]">{t(m.t)}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t(m.d)}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-6 italic">{t(tr.materialsNote)}</p>
        </div>
      </section>

      {/* COURSE EFFORT */}
      <section className="py-14 md:py-20 bg-gradient-to-b from-white to-[hsl(35_100%_97%)]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <Badge className="bg-[hsl(var(--accent))]/15 text-[hsl(var(--accent))] border-[hsl(var(--accent))]/30 mb-3">
              <Clock className="h-3 w-3 mr-1" /> 35–40 hrs
            </Badge>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--primary))] mb-3">
              {t(tr.effortTitle)}
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">{t(tr.effortSub)}</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-6">
            {[
              { icon: PlayCircle, t: tr.effortLectures, v: tr.effortLecturesV, color: 'from-[hsl(var(--accent))] to-[hsl(var(--accent))]/70' },
              { icon: BookOpen, t: tr.effortSelf, v: tr.effortSelfV, color: 'from-[hsl(var(--primary))] to-[hsl(var(--primary))]/70' },
              { icon: ShieldCheck, t: tr.effortAssess, v: tr.effortAssessV, color: 'from-emerald-500 to-emerald-600' },
            ].map((it, i) => {
              const Icon = it.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <Card className="border-[hsl(var(--accent))]/20 hover:shadow-lg transition h-full">
                    <CardContent className="p-6 text-center">
                      <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${it.color} flex items-center justify-center shadow-md`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="font-heading font-bold text-lg text-[hsl(var(--primary))]">{t(it.t)}</h3>
                      <p className="font-heading text-2xl font-bold text-[hsl(var(--accent))] mt-1">{t(it.v)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <Card className="border-[hsl(var(--accent))]/20 bg-white">
            <CardContent className="p-5 sm:p-6">
              <p className="text-sm sm:text-base text-foreground text-center mb-4">{t(tr.effortTotal)}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[tr.effortTag1, tr.effortTag2, tr.effortTag3].map((tag, i) => (
                  <Badge key={i} variant="secondary" className="bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border-[hsl(var(--primary))]/20 px-3 py-1.5">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> {t(tag)}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ELIGIBILITY + DETAILS */}
      <section className="py-14 md:py-20 bg-[hsl(35_100%_97%)]">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 max-w-5xl">
          <Card className="border-[hsl(var(--accent))]/20">
            <CardContent className="p-6 sm:p-8">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[hsl(var(--primary))] mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" /> {t(tr.eligibilityTitle)}
              </h3>
              <ul className="space-y-3">
                {tr.elig.map((e, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[hsl(var(--accent))] flex-shrink-0 mt-0.5" />
                    <span>{t(e)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-[hsl(var(--accent))]/20">
            <CardContent className="p-6 sm:p-8">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[hsl(var(--primary))] mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5" /> {t(tr.detailsTitle)}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3"><Calendar className="h-5 w-5 text-[hsl(var(--accent))]" /><span><strong>{t(tr.startsLabel)}:</strong> {t(tr.startsValue)}</span></div>
                <div className="flex items-center gap-3"><Video className="h-5 w-5 text-[hsl(var(--accent))]" /><span><strong>{t(tr.modeLabel)}:</strong> {t(tr.modeValue)}</span></div>
                <div className="flex items-center gap-3"><Globe className="h-5 w-5 text-[hsl(var(--accent))]" /><span><strong>{t(tr.audienceLabel)}:</strong> {t(tr.audienceValue)}</span></div>
                <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-[hsl(var(--accent))]" /><span><strong>{t(tr.timeLabel)}:</strong> {t(tr.timeValue)}</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* URGENCY + COUNTDOWN */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary))]/85 text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <Badge className="bg-[hsl(var(--accent))] text-accent-foreground mb-4"><Flame className="h-3 w-3 mr-1" /> {t(tr.urgencyTitle)}</Badge>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-8">{t(tr.countdownStart)}</h2>
          <CountdownTo target={targetDate} />
          <div className="mt-8">
            <Button size="lg" variant="saffron" onClick={() => goEnroll()}>
              {t(tr.secureSeat)} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing-section" className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--primary))] text-center mb-10">
            {t(tr.pricingTitle)}
          </h2>
          <Card className="border-2 border-[hsl(var(--accent))]/30 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[hsl(var(--accent))]/10 to-[hsl(var(--primary))]/5 p-6 sm:p-10 text-center">
              <p className="font-body text-base text-foreground max-w-lg mx-auto italic">
                “{t(tr.contributionLine)}”
              </p>
              <Button size="lg" variant="saffron" className="mt-6" onClick={() => goEnroll()}>
                {t(tr.secureSeat)} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-14 md:py-20 bg-[hsl(35_100%_97%)]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--primary))] text-center mb-10">
            {t(tr.trustTitle)}
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {tr.trustItems.map((it, i) => {
              const Icon = it.icon;
              return (
                <Card key={i} className="border-[hsl(var(--accent))]/20 text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-[hsl(var(--primary))]" />
                    </div>
                    <p className="font-heading font-semibold">{t(it.t)}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--primary))] text-center mb-10">
            {t(tr.testimonialsTitle)}
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {tr.testimonials.map((tm, i) => (
              <Card key={i} className="border-[hsl(var(--accent))]/15">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground italic mb-3">“{t(tm.r)}”</p>
                  <p className="text-sm font-semibold text-[hsl(var(--primary))]">— {tm.n}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20 bg-[hsl(35_100%_97%)]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--primary))] text-center mb-10">
            {t(tr.faqTitle)}
          </h2>
          <Accordion type="single" collapsible className="bg-white rounded-xl px-6 shadow-sm border border-[hsl(var(--accent))]/15">
            {tr.faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-heading">{t(f.q)}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{t(f.a)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-[hsl(var(--accent))]/10 via-background to-[hsl(var(--primary))]/5">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--accent))]/15 text-[hsl(var(--accent))] text-xs font-semibold mb-4">
            <HandHeart className="h-4 w-4" /> {t({ en: 'With Gratitude', hi: 'कृतज्ञता सहित', sa: 'कृतज्ञतापूर्वकम्' })}
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--primary))] mb-3">
            {t({ en: 'Our Generous Sponsors', hi: 'हमारे उदार प्रायोजक', sa: 'अस्माकं उदाराः प्रायोजकाः' })}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {t({
              en: 'Heartfelt thanks to those whose contributions make Sanskrit accessible to all.',
              hi: 'उन सभी का हार्दिक धन्यवाद जिनके योगदान से संस्कृत सबके लिए सुलभ बनी है।',
              sa: 'येषां योगदानेन संस्कृतं सर्वेषां कृते सुलभं भवति तेभ्यः हार्दिकं धन्यवादम्।',
            })}
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" variant="saffron" className="gap-2">
                <Users className="h-5 w-5" />
                {t({ en: 'View Sponsors', hi: 'प्रायोजक देखें', sa: 'प्रायोजकान् पश्यत' })}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl text-[hsl(var(--primary))] flex items-center gap-2">
                  <HandHeart className="h-6 w-6 text-[hsl(var(--accent))]" />
                  {t({ en: 'Our Sponsors', hi: 'हमारे प्रायोजक', sa: 'अस्माकं प्रायोजकाः' })}
                </DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                {t({
                  en: 'With deep gratitude to every contributor supporting this Sanskrit journey.',
                  hi: 'इस संस्कृत यात्रा का समर्थन करने वाले प्रत्येक योगदानकर्ता के प्रति गहरी कृतज्ञता।',
                  sa: 'अस्य संस्कृतयात्रायाः समर्थकेभ्यः सर्वेभ्यः गभीरा कृतज्ञता।',
                })}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {SPONSORS.map((name, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[hsl(var(--accent))]/5 border border-[hsl(var(--accent))]/15 hover:bg-[hsl(var(--accent))]/10 transition-colors"
                  >
                    <Heart className="h-3.5 w-3.5 text-[hsl(var(--accent))] flex-shrink-0" />
                    <span className="text-sm font-body text-foreground capitalize truncate">{name}</span>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary))]/90 text-primary-foreground">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{t(tr.finalTitle)}</h2>
          <p className="text-primary-foreground/80 mb-8">{t(tr.timeValue)}</p>
          <Button size="lg" variant="saffron" onClick={goEnroll} className="text-base">
            {t(tr.enrollNow)} <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* STICKY CTA */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-[hsl(var(--primary))] border-t border-[hsl(var(--accent))]/30 p-3 shadow-2xl md:hidden"
          >
            <div className="container mx-auto flex items-center justify-between gap-3">
              <div className="text-primary-foreground text-xs font-body">
                <Flame className="inline h-3 w-3 text-[hsl(var(--accent))] mr-1" />
                {t(tr.urgencyTitle)}
              </div>
              <Button size="sm" variant="saffron" onClick={() => goEnroll()}>
                {t(tr.enrollNow)} <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default SambhashanaSanskrit;
