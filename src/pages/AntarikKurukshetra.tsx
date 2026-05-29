import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Clock, Video, PlayCircle, Languages, Users, Calendar,
  Swords, Heart, Brain, Sparkles, Shield, Flame, BookOpen,
  Compass, Award, ArrowRight, CheckCircle2, Quote,
} from 'lucide-react';

const ENROLL_LINK = 'https://learn.shastrakulam.com';

// ---------------- translations ----------------
const tr = {
  badge: { en: 'Special Video Course', hi: 'विशेष वीडियो पाठ्यक्रम', sa: 'विशिष्टः चलच्चित्रपाठ्यक्रमः' },
  heroTitle: { en: 'The Inner Kurukshetra', hi: 'आंतरिक कुरुक्षेत्र', sa: 'आन्तरं कुरुक्षेत्रम्' },
  heroTagline: {
    en: 'Win the battle of the mind — conquer the world',
    hi: 'मन का युद्ध जीतो — जग जीत लो',
    sa: 'मनसः युद्धं जयत — जगत् जयत',
  },
  heroSub: {
    en: 'The Kurukshetra of the Mahabharata is not just a historical battlefield — it is a symbol of the struggle that runs within us every moment. Come, understand and win this inner war.',
    hi: 'महाभारत का कुरुक्षेत्र केवल एक ऐतिहासिक युद्धभूमि नहीं है — यह हमारे भीतर हर क्षण चल रहे संघर्ष का प्रतीक है। आइए, इस आंतरिक युद्ध को समझें और जीतें।',
    sa: 'महाभारतस्य कुरुक्षेत्रं केवलं ऐतिहासिकं रणक्षेत्रं न — एतत् अस्माकम् अन्तरे प्रतिक्षणं प्रवर्तमानस्य संग्रामस्य प्रतीकम्। एहि, एनम् आन्तरं युद्धं विज्ञाय जयाम।',
  },
  enroll: { en: 'Enroll Now', hi: 'अभी नामांकन करें', sa: 'अद्यैव नामाङ्कयत' },
  learnMore: { en: 'Learn More', hi: 'और जानें', sa: 'अधिकं ज्ञायताम्' },

  // features
  fDur: { label: { en: 'Duration', hi: 'अवधि', sa: 'अवधिः' }, value: { en: '1 Hour', hi: '1 घंटा', sa: '१ होरा' } },
  fType: { label: { en: 'Format', hi: 'प्रकार', sa: 'प्रकारः' }, value: { en: 'Video', hi: 'वीडियो', sa: 'चलच्चित्रम्' } },
  fSess: { label: { en: 'Sessions', hi: 'सत्र', sa: 'सत्राणि' }, value: { en: '1 Session', hi: '1 सत्र', sa: '१ सत्रम्' } },
  fWk: { label: { en: 'Per Week', hi: 'प्रति सप्ताह', sa: 'प्रति सप्ताहम्' }, value: { en: '1', hi: '1', sa: '१' } },
  fLang: { label: { en: 'Language', hi: 'भाषा', sa: 'भाषा' }, value: { en: 'Hindi', hi: 'हिन्दी', sa: 'हिन्दी' } },
  fElig: { label: { en: 'Eligibility', hi: 'पात्रता', sa: 'योग्यता' }, value: { en: 'Open For All', hi: 'सभी के लिए', sa: 'सर्वेभ्यः' } },

  // about
  aboutBadge: { en: 'Where is this battle?', hi: 'यह युद्ध कहाँ होता है?', sa: 'इदं युद्धं कुत्र भवति?' },
  aboutTitle: {
    en: 'Not outside — this war is within',
    hi: 'बाहर नहीं, भीतर है यह युद्ध',
    sa: 'बहिः न, अन्तरे एव एतत् युद्धम्',
  },
  aboutDesc: {
    en: 'Every day, every moment, an inner Kurukshetra is active in our mind — where right and wrong, dharma and adharma, restraint and attachment do battle.',
    hi: 'हर दिन, हर क्षण हमारे मन में एक आंतरिक कुरुक्षेत्र सक्रिय रहता है — जहाँ सही और गलत, धर्म और अधर्म, संयम और आसक्ति के बीच युद्ध चलता है।',
    sa: 'प्रतिदिनं प्रतिक्षणं अस्माकं मनसि आन्तरं कुरुक्षेत्रं सक्रियं भवति — यत्र सम्यक् असम्यक्, धर्मः अधर्मः, संयमः आसक्तिश्च मध्ये युद्धं प्रवर्तते।',
  },
  pandava: { en: 'Pandava', hi: 'पांडव', sa: 'पाण्डवः' },
  kaurava: { en: 'Kaurava', hi: 'कौरव', sa: 'कौरवः' },
  pandavaKauravaNote: {
    en: 'These are the Pandavas and Kauravas within us.',
    hi: 'यही हमारे अंदर के पांडव और कौरव हैं।',
    sa: 'एते एव अस्माकम् अन्तःस्थाः पाण्डवाः कौरवाश्च।',
  },

  // arjuna
  arjBadge: { en: "Arjuna's Dilemma", hi: 'अर्जुन की स्थिति', sa: 'अर्जुनस्य स्थितिः' },
  arjTitle: {
    en: "Arjuna's confusion — is our confusion",
    hi: 'अर्जुन की उलझन — हमारी ही उलझन',
    sa: 'अर्जुनस्य संमोहः — अस्माकमेव संमोहः',
  },
  arjDesc: {
    en: 'Just as Arjuna felt confused and weak, we too get entangled in life’s decisions.',
    hi: 'जैसे अर्जुन भ्रमित और कमजोर महसूस कर रहे थे, वैसे ही हम भी जीवन के निर्णयों में अक्सर उलझ जाते हैं।',
    sa: 'यथा अर्जुनः संमोहितः दुर्बलश्च आसीत्, तथैव वयमपि जीवननिर्णयेषु प्रायः संमुह्यामः।',
  },
  arjNote: {
    en: 'In this confusion we sometimes retreat from our own dharma.',
    hi: 'इस भ्रम में हम कभी-कभी अपने ही धर्म से पीछे हट जाते हैं।',
    sa: 'अस्मिन् सम्मोहे वयं कदाचित् स्वधर्मात् अपि अपगच्छामः।',
  },
  q1: { en: 'What is right?', hi: 'क्या सही है?', sa: 'किं सम्यक्?' },
  q2: { en: 'What is easy?', hi: 'क्या आसान है?', sa: 'किं सुलभम्?' },
  q3: { en: 'What benefits me?', hi: 'क्या मेरे लिए लाभदायक है?', sa: 'किं मम हितकरम्?' },

  krishnaTitle: { en: "Krishna's Guidance", hi: 'कृष्ण का मार्गदर्शन', sa: 'कृष्णस्य मार्गदर्शनम्' },
  krishnaIntro: {
    en: 'The message of Bhagavan Krishna teaches us —',
    hi: 'भगवान कृष्ण का संदेश हमें सिखाता है कि —',
    sa: 'भगवतः कृष्णस्य सन्देशः अस्मान् शिक्षयति —',
  },
  k1: {
    en: 'Do not retreat from your duty',
    hi: 'अपने कर्तव्य से पीछे न हटें',
    sa: 'स्वकर्तव्यात् मा अपगच्छ',
  },
  k2: {
    en: 'Stand for what is right, however hard the circumstances',
    hi: 'सही के लिए खड़े रहें, चाहे परिस्थिति कठिन क्यों न हो',
    sa: 'सम्यक्कार्ये तिष्ठ, परिस्थितिः कथमपि कठिना भवतु',
  },
  k3: {
    en: 'Steady your mind through knowledge and sadhana',
    hi: 'अपने मन को ज्ञान और साधना से स्थिर करें',
    sa: 'ज्ञानेन साधनया च मनः स्थिरीकुरु',
  },

  // victories
  vBadge: { en: 'True Victory', hi: 'सच्ची विजय', sa: 'सत्यविजयः' },
  vTitle: {
    en: 'Conquering the inner Kurukshetra is the true victory',
    hi: 'आंतरिक कुरुक्षेत्र को जीतना ही सच्ची विजय है',
    sa: 'आन्तरस्य कुरुक्षेत्रस्य जयः एव सत्यविजयः',
  },
  v1: {
    en: 'When we gain mastery over anger — that is victory',
    hi: 'जब हम अपने क्रोध पर नियंत्रण पाते हैं — वह विजय है',
    sa: 'यदा वयं क्रोधं नियन्त्रयामः — सः विजयः',
  },
  v2: {
    en: 'When we choose contentment over greed — that is victory',
    hi: 'जब हम लोभ के बजाय संतोष चुनते हैं — वह विजय है',
    sa: 'यदा वयं लोभस्य स्थाने सन्तोषं वृणुमः — सः विजयः',
  },
  v3: {
    en: 'When we choose the right decision, however hard — that is victory',
    hi: 'जब हम सही निर्णय लेते हैं, भले ही वह कठिन हो — वह विजय है',
    sa: 'यदा वयं सम्यक्निर्णयं कुर्मः, कठिनोऽपि सः — सः विजयः',
  },

  // paths
  pBadge: { en: 'The Path', hi: 'मार्ग', sa: 'मार्गः' },
  pTitle: { en: 'How to win this war?', hi: 'कैसे जीतें यह युद्ध?', sa: 'कथम् एतत् युद्धं जयाम?' },
  pSub: {
    en: 'Four simple practices that steady the mind and strengthen the soul',
    hi: 'चार सरल साधन — जो मन को स्थिर और आत्मा को बलवान बनाते हैं',
    sa: 'चत्वारि सरलानि साधनानि — यानि मनः स्थिरयन्ति आत्मानं च बलवन्तं कुर्वन्ति',
  },
  p1t: { en: 'Daily Svadhyaya', hi: 'नियमित स्वाध्याय', sa: 'नियमितं स्वाध्यायः' },
  p1d: {
    en: 'Regular study of the shastras gives direction to the mind.',
    hi: 'शास्त्रों का नियमित अध्ययन मन को दिशा देता है।',
    sa: 'शास्त्राणां नियमितम् अध्ययनं मनसे दिशां ददाति।',
  },
  p2t: { en: 'Satsang', hi: 'सत्संग', sa: 'सत्सङ्गः' },
  p2d: {
    en: 'The right company purifies the soul and steadies the mind.',
    hi: 'सही संगति आत्मा को शुद्ध और मन को स्थिर करती है।',
    sa: 'सम्यक्सङ्गतिः आत्मानं शोधयति मनश्च स्थिरयति।',
  },
  p3t: { en: 'Meditation & Reflection', hi: 'ध्यान व आत्मचिंतन', sa: 'ध्यानं आत्मचिन्तनं च' },
  p3d: {
    en: 'Turning inward is the beginning of the real journey.',
    hi: 'भीतर झाँकना ही वास्तविक यात्रा का आरम्भ है।',
    sa: 'अन्तर्मुखता एव वास्तविकस्य यात्रायाः आरम्भः।',
  },
  p4t: { en: 'Faith & Surrender', hi: 'विश्वास व समर्पण', sa: 'विश्वासः समर्पणं च' },
  p4d: {
    en: 'Faith in the Divine is the greatest strength in the inner war.',
    hi: 'भगवान पर विश्वास भीतर के युद्ध में सबसे बड़ा बल है।',
    sa: 'भगवति विश्वासः आन्तरयुद्धे सर्वोच्चं बलम्।',
  },

  // sar
  sar: { en: 'The Essence', hi: 'सार', sa: 'सारम्' },
  sar1: {
    en: 'Kurukshetra is not outside —',
    hi: 'कुरुक्षेत्र बाहर नहीं,',
    sa: 'कुरुक्षेत्रं बहिः न,',
  },
  sar1b: { en: 'it is within us.', hi: 'हमारे भीतर है।', sa: 'अस्माकम् अन्तरे एव।' },
  sar2: {
    en: 'To win, we must',
    hi: 'विजय पाने के लिए हमें',
    sa: 'विजयाय वयम्',
  },
  sar2b: { en: 'conquer the mind.', hi: 'अपने मन को जीतना होगा।', sa: 'मनः जेतुं अर्हामः।' },
  sar3a: { en: 'When the mind is won —', hi: 'जब मन जीता —', sa: 'यदा मनः जितम् —' },
  sar3b: { en: 'the world is won.', hi: 'तो जग जीता।', sa: 'तदा जगत् जितम्।' },

  // final
  ctaTitle: {
    en: 'Begin the journey of winning your inner war',
    hi: 'अपने भीतर के युद्ध को जीतने की यात्रा आरम्भ करें',
    sa: 'स्वान्तर्युद्धस्य जयस्य यात्रां प्रारभस्व',
  },
  ctaSub: {
    en: 'This 1-hour special video course will show you the path to understanding and winning your inner Kurukshetra — through the Gita.',
    hi: '1 घंटे का यह विशेष वीडियो पाठ्यक्रम आपको गीता के माध्यम से अपने आंतरिक कुरुक्षेत्र को समझने और जीतने का मार्ग दिखाएगा।',
    sa: 'एकहोरामितः अयं विशिष्टः चलच्चित्रपाठ्यक्रमः भवते गीतया स्वान्तरकुरुक्षेत्रस्य ज्ञानस्य जयस्य च मार्गं दर्शयिष्यति।',
  },
};

const AntarikKurukshetra: React.FC = () => {
  const { t } = useLanguage();

  const features = [tr.fDur, tr.fType, tr.fSess, tr.fWk, tr.fLang, tr.fElig];
  const featureIcons = [Clock, Video, PlayCircle, Calendar, Languages, Users];

  const battles = [
    { p: { en: 'Truth', hi: 'सत्य', sa: 'सत्यम्' }, k: { en: 'Untruth', hi: 'असत्य', sa: 'असत्यम्' }, icon: Shield },
    { p: { en: 'Compassion', hi: 'करुणा', sa: 'करुणा' }, k: { en: 'Anger', hi: 'क्रोध', sa: 'क्रोधः' }, icon: Heart },
    { p: { en: 'Patience', hi: 'धैर्य', sa: 'धैर्यम्' }, k: { en: 'Greed', hi: 'लोभ', sa: 'लोभः' }, icon: Brain },
    { p: { en: 'Self-restraint', hi: 'आत्मसंयम', sa: 'आत्मसंयमः' }, k: { en: 'Ego', hi: 'अहंकार', sa: 'अहङ्कारः' }, icon: Flame },
  ];

  const victories = [tr.v1, tr.v2, tr.v3];
  const paths = [
    { icon: BookOpen, t: tr.p1t, d: tr.p1d },
    { icon: Users, t: tr.p2t, d: tr.p2d },
    { icon: Brain, t: tr.p3t, d: tr.p3d },
    { icon: Sparkles, t: tr.p4t, d: tr.p4d },
  ];
  const questions = [tr.q1, tr.q2, tr.q3];
  const krishnaPoints = [tr.k1, tr.k2, tr.k3];

  return (
    <Layout>
      <Helmet>
        <title>{t(tr.heroTitle)} — {t(tr.heroTagline)} | Shastrakulam</title>
        <meta name="description" content={t(tr.heroSub).slice(0, 155)} />
        <link rel="canonical" href="https://shastrakulam.com/courses/antarik-kurukshetra" />
      </Helmet>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden text-primary-foreground min-h-[88vh] flex items-center bg-gradient-to-br from-primary via-primary to-[hsl(var(--maroon-dark))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--accent)/0.30),transparent_55%),radial-gradient(circle_at_80%_80%,hsl(var(--accent)/0.22),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(hsl(var(--accent))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--accent))_1px,transparent_1px)] [background-size:60px_60px]" />

        <div className="container mx-auto px-4 py-20 md:py-24 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="bg-accent text-accent-foreground border-0 mb-4 text-sm px-4 py-1.5">
                <Swords className="h-3.5 w-3.5 mr-1.5" />
                {t(tr.badge)}
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-2xl"
            >
              {t(tr.heroTitle)}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-heading text-xl md:text-2xl text-accent font-medium drop-shadow-lg"
            >
              {t(tr.heroTagline)}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-base md:text-lg text-primary-foreground/95 max-w-2xl mx-auto leading-relaxed"
            >
              {t(tr.heroSub)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3 pt-4"
            >
              <a href={ENROLL_LINK} target="_blank" rel="noopener noreferrer">
                <Button variant="saffron" size="lg" className="text-base">
                  {t(tr.enroll)}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#about">
                <Button size="lg" className="text-base bg-primary-foreground/10 hover:bg-primary-foreground/20 border-2 border-primary-foreground/40 text-primary-foreground">
                  {t(tr.learnMore)}
                </Button>
              </a>
            </motion.div>

            {/* Feature Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-10 max-w-4xl mx-auto"
            >
              {features.map((f, i) => {
                const Icon = featureIcons[i];
                return (
                  <div
                    key={i}
                    className="bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 rounded-xl p-3 text-center"
                  >
                    <Icon className="h-5 w-5 mx-auto mb-1.5 text-accent" />
                    <p className="text-[11px] uppercase tracking-wider text-primary-foreground/75 font-body">
                      {t(f.label)}
                    </p>
                    <p className="font-heading text-sm font-semibold mt-0.5">{t(f.value)}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/25 to-primary/25 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl shadow-elevated aspect-square overflow-hidden bg-gradient-to-br from-primary via-[hsl(var(--maroon-dark))] to-primary text-primary-foreground flex items-center justify-center p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--accent)/0.35),transparent_55%),radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.25),transparent_50%)]" />
                <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(hsl(var(--accent))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--accent))_1px,transparent_1px)] [background-size:40px_40px]" />
                <div className="relative text-center space-y-6">
                  <Swords className="h-16 w-16 mx-auto text-accent" strokeWidth={1.5} />
                  <p className="font-heading text-3xl md:text-4xl leading-snug">
                    {t(tr.pandava)} <span className="text-accent">×</span> {t(tr.kaurava)}
                  </p>
                  <div className="h-px w-24 bg-accent/60 mx-auto" />
                  <p className="font-body text-sm md:text-base text-primary-foreground/80 italic max-w-xs mx-auto">
                    {t(tr.pandavaKauravaNote)}
                  </p>
                </div>
              </div>
            </motion.div>

            <div>
              <Badge variant="secondary" className="mb-4">{t(tr.aboutBadge)}</Badge>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {t(tr.aboutTitle)}
              </h2>
              <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
                {t(tr.aboutDesc)}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                {battles.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <Card className="border-border/60 hover:shadow-card hover:border-accent/40 transition-all">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <b.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 flex items-center justify-between gap-2 min-w-0">
                          <div className="text-center min-w-0">
                            <p className="text-[10px] uppercase text-muted-foreground font-body truncate">{t(tr.pandava)}</p>
                            <p className="font-heading text-sm font-semibold text-primary truncate">{t(b.p)}</p>
                          </div>
                          <Swords className="h-4 w-4 text-accent shrink-0" />
                          <div className="text-center min-w-0">
                            <p className="text-[10px] uppercase text-muted-foreground font-body truncate">{t(tr.kaurava)}</p>
                            <p className="font-heading text-sm font-semibold text-foreground/70 truncate">{t(b.k)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ARJUNA + KRISHNA ============ */}
      <section className="py-20 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--accent)/0.08),transparent_60%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">{t(tr.arjBadge)}</Badge>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t(tr.arjTitle)}
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                {t(tr.arjDesc)}
              </p>
              <div className="space-y-3">
                {questions.map((q, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-center gap-3 bg-background rounded-lg p-4 border border-border/50 hover:border-accent/50 transition-colors"
                  >
                    <Compass className="h-5 w-5 text-accent shrink-0" />
                    <p className="font-heading font-medium text-foreground">{t(q)}</p>
                  </motion.div>
                ))}
              </div>
              <p className="font-body text-muted-foreground mt-6 italic">
                {t(tr.arjNote)}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <Card className="bg-gradient-to-br from-primary via-[hsl(var(--maroon-dark))] to-primary text-primary-foreground border-0 shadow-elevated overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,hsl(var(--accent)/0.30),transparent_55%)]" />
                <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(hsl(var(--accent))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--accent))_1px,transparent_1px)] [background-size:40px_40px]" />
                <CardContent className="p-8 md:p-10 -mt-2">
                  <Quote className="h-10 w-10 text-accent mb-4" />
                  <h3 className="font-heading text-2xl font-bold mb-3">
                    {t(tr.krishnaTitle)}
                  </h3>
                  <p className="font-body text-primary-foreground/90 mb-6 leading-relaxed">
                    {t(tr.krishnaIntro)}
                  </p>
                  <ul className="space-y-4">
                    {krishnaPoints.map((line, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="font-body text-primary-foreground/95">{t(line)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ VICTORIES ============ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4">{t(tr.vBadge)}</Badge>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              {t(tr.vTitle)}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {victories.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full border-accent/20 hover:border-accent/60 transition-all hover:shadow-saffron hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mx-auto mb-4 border border-accent/30">
                      <Award className="h-7 w-7 text-accent" />
                    </div>
                    <p className="font-body text-foreground leading-relaxed">{t(v)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PATHS ============ */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4">{t(tr.pBadge)}</Badge>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              {t(tr.pTitle)}
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              {t(tr.pSub)}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {paths.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="h-full bg-background border-border/60 hover:shadow-elevated hover:-translate-y-1 hover:border-primary/40 transition-all group">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <p.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                      {t(p.t)}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {t(p.d)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SAR ============ */}
      <section className="py-24 text-primary-foreground relative overflow-hidden bg-gradient-to-br from-primary via-[hsl(var(--maroon-dark))] to-primary">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--accent)/0.28),transparent_55%),radial-gradient(circle_at_75%_70%,hsl(var(--accent)/0.18),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(hsl(var(--accent))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--accent))_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Sparkles className="h-10 w-10 text-accent mx-auto" />
            <h2 className="font-heading text-3xl md:text-5xl font-bold">{t(tr.sar)}</h2>
            <div className="space-y-4 font-heading text-xl md:text-2xl leading-relaxed">
              <p>{t(tr.sar1)} <span className="text-accent">{t(tr.sar1b)}</span></p>
              <p>{t(tr.sar2)} <span className="text-accent">{t(tr.sar2b)}</span></p>
              <p className="font-bold text-2xl md:text-3xl pt-4">
                {t(tr.sar3a)} <span className="text-accent">{t(tr.sar3b)}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-accent/10 via-background to-primary/5 border-accent/30 shadow-elevated overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <Swords className="h-12 w-12 text-accent mx-auto" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                {t(tr.ctaTitle)}
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                {t(tr.ctaSub)}
              </p>

              <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 py-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> {t(tr.fDur.value)}</span>
                <span className="flex items-center gap-2"><Video className="h-4 w-4 text-accent" /> {t(tr.fType.value)}</span>
                <span className="flex items-center gap-2"><Languages className="h-4 w-4 text-accent" /> {t(tr.fLang.value)}</span>
                <span className="flex items-center gap-2"><Users className="h-4 w-4 text-accent" /> {t(tr.fElig.value)}</span>
              </div>

              <a href={ENROLL_LINK} target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button variant="saffron" size="xl">
                  {t(tr.enroll)}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default AntarikKurukshetra;
