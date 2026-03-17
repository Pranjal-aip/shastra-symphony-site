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
  Clock, MapPin, IndianRupee, ArrowRight, ChevronRight, Flame
} from 'lucide-react';
import heroImage from '@/assets/gurukul-camp-2026.jpg';

const whyCards = [
  {
    icon: TreePine,
    title: 'Cultural Rooting & Identity Formation',
    desc: 'Immerse children in Bharatiya values, Vedic culture, and disciplined living, helping them develop a strong identity and pride in their heritage.',
    gradient: 'from-emerald-500/10 to-green-500/10',
  },
  {
    icon: Brain,
    title: 'Wisdom-Based Learning',
    desc: 'Vedic knowledge systems — Yoga, Vedic Mathematics, Basic Ayurveda, Dharma & Philosophy — creating a balanced worldview complementing modern education.',
    gradient: 'from-amber-500/10 to-orange-500/10',
  },
  {
    icon: Heart,
    title: 'Balanced Mind & Body',
    desc: 'Daily Yoga, Pranayama, and Mantra chanting develop focus, emotional strength, and inner stability in children.',
    gradient: 'from-rose-500/10 to-pink-500/10',
  },
  {
    icon: Users,
    title: 'Learning Together as a Family',
    desc: 'Parents are participants, not observers. Shared activities, joint sessions, and practical parenting insights create stronger bonding.',
    gradient: 'from-blue-500/10 to-indigo-500/10',
  },
  {
    icon: Sparkles,
    title: 'Rooted Yet Aware',
    desc: 'Children learn to stay grounded in Dharma, understand responsibilities, and develop clarity in thinking.',
    gradient: 'from-violet-500/10 to-purple-500/10',
  },
  {
    icon: Leaf,
    title: 'Natural & Satvik Living',
    desc: 'Peaceful natural environment encouraging digital detox, healthy routines, and connection with nature.',
    gradient: 'from-teal-500/10 to-cyan-500/10',
  },
];

const offerings = [
  { icon: '🗣️', title: 'Samskritam Sambhashanam', desc: 'Learning Sanskrit through games, songs & daily usage' },
  { icon: '🧘', title: 'Yoga & Mantra Sadhana', desc: 'Daily yogabhyasa, pranayama & Vedic chanting with meaning' },
  { icon: '🏹', title: 'Kshatra Training', desc: 'Traditional physical drills, Danda practice, discipline & strength' },
  { icon: '📖', title: 'Itihasa & Vedic Stories', desc: 'Ramayan & Mahabharat insights, value-based storytelling' },
  { icon: '🧠', title: 'Ganita (Vedic Mathematics)', desc: 'Ancient calculation techniques & logical thinking' },
  { icon: '🌌', title: 'Nakshatra & Nature Awareness', desc: 'Stars, time, observation-based learning' },
  { icon: '🧵', title: 'Creative Skills', desc: 'Craft, traditional art, puppet making & expression' },
  { icon: '🌿', title: 'Ayurveda for Children', desc: 'Simple wellness practices & understanding body' },
  { icon: '🐄', title: 'Gau Seva & Farming', desc: 'Understanding Gau, basic farming, living close to nature' },
  { icon: '🏞️', title: 'Nature Walks & Exploration', desc: 'Mindful observation, outdoor activities' },
  { icon: '🪔', title: 'Gurukul Life Experience', desc: 'Structured daily routine & discipline-based living' },
  { icon: '📿', title: 'Take-Home Practices', desc: 'Daily routines, dharmic practices & lifelong habits' },
];

const parentEngagement = [
  { icon: Brain, title: 'Parallel Learning Sessions', desc: 'Sessions on dharmic parenting, discipline building & Vedic lifestyle' },
  { icon: Users, title: 'Parent–Child Activities', desc: 'Joint chanting, shared seva & group activities' },
  { icon: Flame, title: 'Satsang with Acharyas', desc: 'Interactive discussions & guidance on parenting & family life' },
  { icon: TreePine, title: 'Gurukul Lifestyle Experience', desc: 'Experience simplicity, structured living & value-based environment' },
  { icon: BookOpen, title: 'Reflection & Takeaways', desc: 'Practical tools, home routines & long-term guidance' },
];

const schedule = [
  { time: '5:30 – 6:30 am', activity: 'Wake up & Hygiene' },
  { time: '6:30 – 7:00 am', activity: 'Sandhya & Agnihotra' },
  { time: '7:00 – 7:30 am', activity: 'Gau Seva' },
  { time: '7:30 – 8:30 am', activity: 'Yogabhyasa' },
  { time: '8:30 – 9:00 am', activity: 'Breakfast (Satvik)' },
  { time: '9:00 – 12:00 pm', activity: 'Session 1 – Learning Modules' },
  { time: '12:00 – 1:00 pm', activity: 'Lunch' },
  { time: '1:00 – 2:30 pm', activity: 'Session 2' },
  { time: '2:30 – 3:00 pm', activity: 'Yoganidra' },
  { time: '3:00 – 4:30 pm', activity: 'Session 3' },
  { time: '4:30 – 5:30 pm', activity: 'Session 4' },
  { time: '5:30 – 6:30 pm', activity: 'Kreeda (Games)' },
  { time: '6:30 – 8:00 pm', activity: 'Bhajan, Sandhya, Agnihotra' },
  { time: '8:00 pm onwards', activity: 'Dinner, Reflection, Discussions' },
];

const faqs = [
  { q: 'Where is the camp located?', a: 'At a peaceful natural Gurukul-style campus. Exact location will be shared after registration.' },
  { q: 'Can parents join?', a: 'Yes! Parents can participate in a structured parallel module designed for family transformation.' },
  { q: 'What kind of food is provided?', a: 'Simple, healthy satvik meals prepared with care and hygiene.' },
  { q: 'What about accommodation?', a: 'Clean, safe, Gurukul-style stay arrangements are included in the fee.' },
  { q: 'What is the age group?', a: 'Children aged 6–14 years. Activities are designed for different age cohorts within this range.' },
  { q: 'What is included in the fee?', a: 'Accommodation, food (Satvik), all sessions & materials are included. Fee ranges ₹12,000 – ₹18,000 per child.' },
];

const GurukulCamp2026: React.FC = () => {
  const { language } = useLanguage();

  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      <SEO
        title={{ en: 'Gurukul Residential Camp 2026 – Shastrakulam', hi: 'गुरुकुल आवासीय शिविर 2026', sa: 'गुरुकुलम् आवासीयशिविरम् 2026' }}
        description={{ en: 'Join the Shastrakulam Gurukul Residential Camp 2026 for children aged 6–14. Vedic learning, yoga, samskaras, nature-based living & parent participation.', hi: 'शास्त्रकुलम् गुरुकुल आवासीय शिविर 2026', sa: 'शास्त्रकुलम् गुरुकुलम् आवासीयशिविरम् 2026' }}
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
              🪔 Summer 2026 · Limited Seats
            </Badge>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Shastrakulam Gurukul<br />
              <span className="text-primary">Residential Camp</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              A holistic blend of <strong>Yoga • Vedic Learning • Nature-based Living • Physical Discipline • Arts • Samskaras</strong> for children aged 6–14 years with optional parent participation.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button variant="saffron" size="lg" onClick={scrollToRegister}>
                Register Now <ArrowRight className="h-5 w-5" />
              </Button>
              <Link to="/contact">
                <Button variant="maroon-outline" size="lg">
                  Have Questions?
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-accent" /> June 1–15, 2026</span>
              <span className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Ages 6–14</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Gurukul Campus</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY THIS CAMP ===== */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">🌿 Why This Camp?</h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">Give your child a foundation of Dharma, Discipline, and Direction</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyCards.map((c, i) => (
              <Card key={i} className="border-border/50 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                <CardContent className={`p-6 bg-gradient-to-br ${c.gradient} rounded-lg`}>
                  <c.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{c.title}</h3>
                  <p className="font-body text-muted-foreground text-sm">{c.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CHARACTER & LEADERSHIP ===== */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-6">🔥 Character & Leadership Development</h2>
          <p className="font-body text-muted-foreground mb-8">
            Through stories of great personalities, discipline-based activities, and responsibility-driven routines, children develop:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Courage', 'Responsibility', 'Leadership', 'Self-Discipline', 'Empathy'].map(v => (
              <Badge key={v} variant="outline" className="text-base px-5 py-2 border-primary/30 text-primary font-semibold">
                {v}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT THE CAMP OFFERS ===== */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">🪔 What Will the Camp Offer?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {offerings.map((o, i) => (
              <Card key={i} className="border-border/50 hover:shadow-card transition-shadow">
                <CardContent className="p-5">
                  <span className="text-3xl mb-3 block">{o.icon}</span>
                  <h3 className="font-heading font-bold text-foreground mb-1">{o.title}</h3>
                  <p className="font-body text-muted-foreground text-sm">{o.desc}</p>
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">👨‍👩‍👧‍👦 How Will Parents Be Engaged?</h2>
            <p className="font-body text-muted-foreground max-w-xl mx-auto">Parents are not just observers — they are participants. Strengthening emotional connection and mutual respect.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {parentEngagement.map((p, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border/50 shadow-soft">
                <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                  <p.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-1">{p.title}</h3>
                  <p className="font-body text-muted-foreground text-sm">{p.desc}</p>
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">🪔 Daily Schedule</h2>
          </div>
          <div className="space-y-0">
            {schedule.map((s, i) => (
              <div key={i} className={`flex items-center gap-4 p-4 ${i % 2 === 0 ? 'bg-card' : 'bg-background'} ${i === 0 ? 'rounded-t-2xl' : ''} ${i === schedule.length - 1 ? 'rounded-b-2xl' : ''} border-x border-b first:border-t border-border/50`}>
                <div className="flex-shrink-0 w-40">
                  <span className="font-body text-sm font-semibold text-primary flex items-center gap-2">
                    <Clock className="h-4 w-4" /> {s.time}
                  </span>
                </div>
                <span className="font-body text-foreground">{s.activity}</span>
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
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground">💰 Camp Fee</h2>
              </div>
              <CardContent className="p-8 space-y-6 text-center">
                <div>
                  <span className="font-heading text-4xl font-bold text-foreground">₹12,000 – ₹18,000</span>
                  <p className="font-body text-muted-foreground mt-1">per child</p>
                </div>
                <Badge variant="outline" className="text-sm px-4 py-1 border-accent/40 text-accent">
                  Parent Participation Option Available
                </Badge>
                <div className="text-left space-y-2 bg-secondary/30 rounded-xl p-5">
                  <p className="font-heading font-semibold text-foreground mb-3">Includes:</p>
                  {['Accommodation', 'Food (Satvik)', 'All sessions & materials'].map(item => (
                    <p key={item} className="flex items-center gap-2 font-body text-muted-foreground text-sm">
                      <ChevronRight className="h-4 w-4 text-accent flex-shrink-0" /> {item}
                    </p>
                  ))}
                </div>
                <a href="https://wa.me/919876543210?text=I%20am%20interested%20in%20Gurukul%20Camp%202026" target="_blank" rel="noopener noreferrer">
                  <Button variant="saffron" size="xl" className="w-full">
                    🚀 Register Now – Limited Seats <ArrowRight className="h-5 w-5" />
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">🪔 Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border/50 px-5 shadow-soft">
                <AccordionTrigger className="font-heading font-semibold text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground">
                  {f.a}
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
            Give Your Child a Foundation of<br />
            <span className="text-primary">Dharma, Discipline & Direction</span>
          </h2>
          <p className="font-body text-muted-foreground mb-8">
            Limited seats available. Register now and be part of a transformative Gurukul experience.
          </p>
          <Button variant="saffron" size="xl" onClick={scrollToRegister}>
            🚀 Register Now <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default GurukulCamp2026;
