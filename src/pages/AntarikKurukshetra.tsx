import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  Clock,
  Video,
  PlayCircle,
  Languages,
  Users,
  Calendar,
  Swords,
  Heart,
  Brain,
  Sparkles,
  Shield,
  Flame,
  BookOpen,
  Compass,
  Award,
  ArrowRight,
  CheckCircle2,
  Quote,
} from 'lucide-react';

const ENROLL_LINK = 'https://learn.shastrakulam.com';

const features = [
  { icon: Clock, label: 'अवधि', value: '1 घंटा' },
  { icon: Video, label: 'प्रकार', value: 'वीडियो' },
  { icon: PlayCircle, label: 'सत्र', value: '1 सत्र' },
  { icon: Calendar, label: 'प्रति सप्ताह', value: '1' },
  { icon: Languages, label: 'भाषा', value: 'हिन्दी' },
  { icon: Users, label: 'पात्रता', value: 'सभी के लिए' },
];

const innerBattles = [
  {
    pandava: 'सत्य',
    kaurava: 'असत्य',
    icon: Shield,
  },
  {
    pandava: 'करुणा',
    kaurava: 'क्रोध',
    icon: Heart,
  },
  {
    pandava: 'धैर्य',
    kaurava: 'लोभ',
    icon: Brain,
  },
  {
    pandava: 'आत्मसंयम',
    kaurava: 'अहंकार',
    icon: Flame,
  },
];

const victories = [
  'जब हम अपने क्रोध पर नियंत्रण पाते हैं — वह विजय है',
  'जब हम लोभ के बजाय संतोष चुनते हैं — वह विजय है',
  'जब हम सही निर्णय लेते हैं, भले ही वह कठिन हो — वह विजय है',
];

const paths = [
  { icon: BookOpen, title: 'नियमित स्वाध्याय', desc: 'शास्त्रों का नियमित अध्ययन मन को दिशा देता है।' },
  { icon: Users, title: 'सत्संग', desc: 'सही संगति आत्मा को शुद्ध और मन को स्थिर करती है।' },
  { icon: Brain, title: 'ध्यान व आत्मचिंतन', desc: 'भीतर झाँकना ही वास्तविक यात्रा का आरम्भ है।' },
  { icon: Sparkles, title: 'विश्वास व समर्पण', desc: 'भगवान पर विश्वास भीतर के युद्ध में सबसे बड़ा बल है।' },
];

const AntarikKurukshetra: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>आंतरिक कुरुक्षेत्र — मन का युद्ध जीतें | Shastrakulam</title>
        <meta
          name="description"
          content="भगवद्गीता के माध्यम से अपने भीतर के कुरुक्षेत्र को समझें और मन के युद्ध को जीतें। 1 घंटे का विशेष वीडियो पाठ्यक्रम — हिन्दी में।"
        />
        <link rel="canonical" href="https://shastrakulam.com/courses/antarik-kurukshetra" />
      </Helmet>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/95 via-primary to-primary/90 text-primary-foreground">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white,transparent_50%),radial-gradient(circle_at_80%_70%,white,transparent_45%)]" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-accent text-accent-foreground border-0 mb-6 text-sm px-4 py-1.5">
                <Swords className="h-3.5 w-3.5 mr-1.5" />
                विशेष वीडियो पाठ्यक्रम
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              आंतरिक कुरुक्षेत्र
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-heading text-xl md:text-2xl text-accent font-medium"
            >
              मन का युद्ध जीतो — जग जीत लो
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-base md:text-lg text-primary-foreground/85 max-w-2xl mx-auto leading-relaxed"
            >
              महाभारत का कुरुक्षेत्र केवल एक ऐतिहासिक युद्धभूमि नहीं है — यह हमारे भीतर हर क्षण
              चल रहे संघर्ष का प्रतीक है। आइए, इस आंतरिक युद्ध को समझें और जीतें।
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3 pt-4"
            >
              <a href={ENROLL_LINK} target="_blank" rel="noopener noreferrer">
                <Button variant="saffron" size="lg" className="text-base">
                  अभी नामांकन करें
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#about">
                <Button variant="hero-outline" size="lg" className="text-base bg-primary-foreground/5 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                  और जानें
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
              {features.map((f, i) => (
                <div
                  key={i}
                  className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 rounded-xl p-3 text-center"
                >
                  <f.icon className="h-5 w-5 mx-auto mb-1.5 text-accent" />
                  <p className="text-[11px] uppercase tracking-wider text-primary-foreground/70 font-body">
                    {f.label}
                  </p>
                  <p className="font-heading text-sm font-semibold mt-0.5">{f.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ ABOUT / WHERE IS THE BATTLE ============ */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">यह युद्ध कहाँ होता है?</Badge>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">
                बाहर नहीं, <span className="text-primary">भीतर</span> है यह युद्ध
              </h2>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                हर दिन, हर क्षण हमारे मन में एक आंतरिक कुरुक्षेत्र सक्रिय रहता है —
                जहाँ सही और गलत, धर्म और अधर्म, संयम और आसक्ति के बीच युद्ध चलता है।
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {innerBattles.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className="border-border/60 hover:shadow-elevated transition-all">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <b.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 flex items-center justify-between gap-4">
                        <div className="text-center">
                          <p className="text-xs uppercase text-muted-foreground font-body">पांडव</p>
                          <p className="font-heading text-lg font-semibold text-primary">{b.pandava}</p>
                        </div>
                        <Swords className="h-5 w-5 text-accent" />
                        <div className="text-center">
                          <p className="text-xs uppercase text-muted-foreground font-body">कौरव</p>
                          <p className="font-heading text-lg font-semibold text-foreground/70">{b.kaurava}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <p className="text-center font-body text-muted-foreground italic">
              यही हमारे अंदर के <span className="text-primary font-semibold not-italic">पांडव और कौरव</span> हैं।
            </p>
          </div>
        </div>
      </section>

      {/* ============ ARJUNA SECTION ============ */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">अर्जुन की स्थिति</Badge>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                अर्जुन की उलझन — <br />
                <span className="text-primary">हमारी ही उलझन</span>
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                जैसे अर्जुन भ्रमित और कमजोर महसूस कर रहे थे, वैसे ही हम भी जीवन के निर्णयों में
                अक्सर उलझ जाते हैं।
              </p>
              <div className="space-y-3">
                {['क्या सही है?', 'क्या आसान है?', 'क्या मेरे लिए लाभदायक है?'].map((q, i) => (
                  <div key={i} className="flex items-center gap-3 bg-background rounded-lg p-4 border border-border/50">
                    <Compass className="h-5 w-5 text-accent shrink-0" />
                    <p className="font-heading font-medium text-foreground">{q}</p>
                  </div>
                ))}
              </div>
              <p className="font-body text-muted-foreground mt-6 italic">
                इस भ्रम में हम कभी-कभी अपने ही धर्म से पीछे हट जाते हैं।
              </p>
            </div>

            <Card className="bg-gradient-to-br from-primary to-primary/85 text-primary-foreground border-0 shadow-elevated">
              <CardContent className="p-8 md:p-10">
                <Quote className="h-10 w-10 text-accent mb-4" />
                <h3 className="font-heading text-2xl font-bold mb-4">
                  कृष्ण का मार्गदर्शन
                </h3>
                <p className="font-body text-primary-foreground/90 mb-6 leading-relaxed">
                  भगवान कृष्ण का संदेश हमें सिखाता है कि —
                </p>
                <ul className="space-y-4">
                  {[
                    'अपने कर्तव्य से पीछे न हटें',
                    'सही के लिए खड़े रहें, चाहे परिस्थिति कठिन क्यों न हो',
                    'अपने मन को ज्ञान और साधना से स्थिर करें',
                  ].map((line, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="font-body text-primary-foreground/95">{line}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ============ VICTORIES ============ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4">सच्ची विजय</Badge>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              आंतरिक कुरुक्षेत्र को जीतना ही <span className="text-primary">सच्ची विजय</span> है
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
                <Card className="h-full border-accent/20 hover:border-accent/50 transition-all hover:shadow-saffron">
                  <CardContent className="p-6 text-center">
                    <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Award className="h-7 w-7 text-accent" />
                    </div>
                    <p className="font-body text-foreground leading-relaxed">{v}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW TO WIN ============ */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4">मार्ग</Badge>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              कैसे जीतें यह युद्ध?
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              चार सरल साधन — जो मन को स्थिर और आत्मा को बलवान बनाते हैं
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
                <Card className="h-full bg-background border-border/60 hover:shadow-elevated hover:-translate-y-1 transition-all">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <p.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                      {p.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {p.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SAR / ESSENCE ============ */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_40%,white,transparent_50%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Sparkles className="h-10 w-10 text-accent mx-auto" />
            <h2 className="font-heading text-3xl md:text-5xl font-bold">सार</h2>
            <div className="space-y-4 font-heading text-xl md:text-2xl leading-relaxed">
              <p>कुरुक्षेत्र बाहर नहीं, <span className="text-accent">हमारे भीतर</span> है।</p>
              <p>विजय पाने के लिए हमें अपने <span className="text-accent">मन को जीतना</span> होगा।</p>
              <p className="font-bold text-2xl md:text-3xl pt-4">
                जब मन जीता — <span className="text-accent">तो जग जीता।</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-accent/10 via-background to-primary/5 border-accent/30 shadow-elevated">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <Swords className="h-12 w-12 text-accent mx-auto" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                अपने भीतर के युद्ध को जीतने की यात्रा आरम्भ करें
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                1 घंटे का यह विशेष वीडियो पाठ्यक्रम आपको गीता के माध्यम से अपने आंतरिक
                कुरुक्षेत्र को समझने और जीतने का मार्ग दिखाएगा।
              </p>

              <div className="flex flex-wrap justify-center gap-6 py-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> 1 घंटा</span>
                <span className="flex items-center gap-2"><Video className="h-4 w-4 text-accent" /> वीडियो पाठ्यक्रम</span>
                <span className="flex items-center gap-2"><Languages className="h-4 w-4 text-accent" /> हिन्दी</span>
                <span className="flex items-center gap-2"><Users className="h-4 w-4 text-accent" /> सभी के लिए</span>
              </div>

              <a href={ENROLL_LINK} target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button variant="saffron" size="xl">
                  अभी नामांकन करें
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
