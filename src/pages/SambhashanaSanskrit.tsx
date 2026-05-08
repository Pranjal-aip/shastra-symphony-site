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
} from 'lucide-react';
import heroImage from '@/assets/sanskrit-course-hero.jpg';

const ENROLL_LINK = 'https://learn.shastrakulam.com/courses/Sanskrit-Sambhashan-69fdad295f6900c59577d5b0';

// ---------------- translations ----------------
const tr = {
  navBadge: { en: 'New Batch · June 2026', hi: 'नया बैच · जून 2026', sa: 'नूतनः गणः · जून २०२६' },
  heroTitle: {
    en: 'Fluent Sanskrit Conversations for Every Family',
    hi: 'हर परिवार के लिए धाराप्रवाह संस्कृत संवाद',
    sa: 'प्रत्येकं कुटुम्बाय सरला संस्कृतसम्भाषणम्',
  },
  heroSub: {
    en: 'Learn to speak Sanskrit naturally through simple daily conversations — no grammar stress, perfect for beginners of all ages.',
    hi: 'सरल दैनिक संवादों के माध्यम से स्वाभाविक रूप से संस्कृत बोलना सीखें — व्याकरण का तनाव नहीं, हर आयु के लिए उपयुक्त।',
    sa: 'सरलैः दैनिकसंवादैः सहजतया संस्कृतं वक्तुं शिक्षध्वम् — न व्याकरणक्लेशः, सर्वायुर्यानां कृते उत्तमम्।',
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

  materialsTitle: { en: 'Materials & Support', hi: 'सामग्री और सहयोग', sa: 'सामग्री समर्थनं च' },
  materials: [
    {
      icon: Video,
      t: { en: 'Recorded sessions', hi: 'रिकॉर्डेड सत्र', sa: 'अभिलिखितसत्राणि' },
      d: { en: 'Watch anytime, anywhere.', hi: 'कभी भी, कहीं भी देखें।', sa: 'यदा कुत्र वा पश्यत।' },
    },
    {
      icon: BookOpen,
      t: { en: 'Practice materials', hi: 'अभ्यास सामग्री', sa: 'अभ्याससामग्री' },
      d: {
        en: 'Useful phrases and sentence patterns.',
        hi: 'उपयोगी वाक्यांश और वाक्य पैटर्न।',
        sa: 'उपयोगि वाक्यानि वाक्यप्रतिमानानि च।',
      },
    },
    {
      icon: GraduationCap,
      t: { en: 'Teacher guidance', hi: 'शिक्षक मार्गदर्शन', sa: 'आचार्यमार्गदर्शनम्' },
      d: {
        en: 'Build and practise real conversations.',
        hi: 'वास्तविक संवाद बनाएं और अभ्यास करें।',
        sa: 'वास्तविकसंवादान् निर्मीयताम् अभ्यस्यताम् च।',
      },
    },
  ],
  materialsNote: {
    en: 'Note: Due to a large number of participants, live interaction opportunities may be limited.',
    hi: 'सूचना: प्रतिभागियों की अधिक संख्या के कारण, लाइव संवाद के अवसर सीमित हो सकते हैं।',
    sa: 'सूचना: बहूनां सहभागिनां कारणात् सजीवसंवादावसराः सीमिताः स्युः।',
  },

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
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showSticky, setShowSticky] = useState(false);
  const targetDate = new Date('2026-06-01T08:00:00+05:30');

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const submitLead = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim().slice(0, 80);
    const cleanPhone = phone.trim().replace(/[^0-9+]/g, '').slice(0, 20);
    if (cleanName.length < 2 || cleanPhone.length < 8) {
      toast({ title: 'Please enter your name and a valid WhatsApp number.' });
      return;
    }
    const msg = `Hi! I'm ${cleanName} (${cleanPhone}). Please reserve my seat in the Spoken Sanskrit course starting June.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
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
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(var(--primary))] leading-tight mb-4">
                {t(tr.heroTitle)}
              </h1>
              <p className="font-body text-base sm:text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
                {t(tr.heroSub)}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button size="lg" variant="saffron" onClick={() => scrollTo('lead-form')} className="text-base">
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
            <Button size="lg" variant="saffron" onClick={() => scrollTo('lead-form')}>
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
              <p className="text-sm text-muted-foreground line-through">{t(tr.actualValue)}: ₹999</p>
              <p className="font-heading text-4xl sm:text-5xl font-bold text-[hsl(var(--primary))] mt-2">{t(tr.payRange)}</p>
              <p className="text-sm text-muted-foreground mt-1">{t(tr.todayLabel)} · Pay What You Want</p>
              <p className="font-body text-base text-foreground mt-6 max-w-lg mx-auto italic">
                “{t(tr.contributionLine)}”
              </p>
              <Button size="lg" variant="saffron" className="mt-6" onClick={() => scrollTo('lead-form')}>
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

      {/* LEAD FORM + FINAL CTA */}
      <section id="lead-form" className="py-14 md:py-20 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary))]/90 text-primary-foreground">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{t(tr.finalTitle)}</h2>
          <p className="text-primary-foreground/80 mb-8">{t(tr.formSub)}</p>

          <Card className="bg-white text-foreground max-w-xl mx-auto">
            <CardContent className="p-6 sm:p-8">
              <h3 className="font-heading text-xl font-bold text-[hsl(var(--primary))] mb-4 flex items-center justify-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[hsl(var(--accent))]" /> {t(tr.formTitle)}
              </h3>
              <form onSubmit={submitLead} className="space-y-4 text-left">
                <div>
                  <Label htmlFor="lead-name">{t(tr.name)}</Label>
                  <Input id="lead-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} required />
                </div>
                <div>
                  <Label htmlFor="lead-phone">{t(tr.whatsapp)}</Label>
                  <Input id="lead-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={20} required />
                </div>
                <Button type="submit" variant="saffron" size="lg" className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" /> {t(tr.submit)}
                </Button>
              </form>
            </CardContent>
          </Card>
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
              <Button size="sm" variant="saffron" onClick={() => scrollTo('lead-form')}>
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
