import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  BookOpen,
  Users,
  Heart,
  Star,
  Sparkles,
  MessageCircle,
  Flame,
  Mic,
  Feather,
  Compass,
  Award,
  ArrowRight,
  Play,
  Quote,
  ChevronRight,
  Phone,
  CheckCircle2,
  Calendar,
  Clock,
  Shield,
  Gift,
  Video,
  Image as ImageIcon,
} from 'lucide-react';

// Components
import { StickyHeader } from '@/components/bodhika/StickyHeader';
import { StickyMobileCTA } from '@/components/bodhika/StickyMobileCTA';
import { PillarCard } from '@/components/bodhika/PillarCard';
import { ProblemSolutionCard } from '@/components/bodhika/ProblemSolutionCard';
import { RoadmapTimeline } from '@/components/bodhika/RoadmapTimeline';
import { EnrollmentBox } from '@/components/bodhika/EnrollmentBox';

// Images
import heroGurukul from '@/assets/bodhika/hero-gurukul.jpg';
import onlineLearning from '@/assets/bodhika/online-learning.jpg';
import shastrakulamLogo from '@/assets/shastrakulam-logo.png';

const WHATSAPP_NUMBER = '919674916567';

// Translations
const t = {
  // Header
  joinNextBatch: 'Join Next Batch',
  
  // Hero
  heroHeadline: 'Give Your Child the Gift of Their Heritage Before the World Changes Them.',
  heroSubheadline: "A 1-Year Live Program in Sanatan Values, Sanskrit & Character Building",
  heroBadge: 'Starting March 2026 • Limited to 15 Seats',
  heroCTA: 'Secure Your Child\'s Spot',
  heroTrust: 'Trusted by 500+ families across India',
  
  // Pain Points (PAS)
  pasTitle: 'The Reality Modern Parents Face',
  pasProblemTitle: 'The Screen Addiction & Cultural Disconnect',
  pasProblems: [
    'Children spending 4+ hours daily on screens and social media',
    'No connection to their roots, traditions, or heritage',
    'Increasing anxiety, stress, and lack of focus',
    'Values are being shaped by internet, not family',
    'Identity crisis: "Who am I beyond this phone?"',
  ],
  pasSolutionTitle: 'The Bodhika Root System',
  pasSolutions: [
    'Weekly live classes that become the highlight of their week',
    'Deep connection with Ramayana, Mahabharata, and Gita',
    'Sanskrit speaking skills that build confidence',
    'A community of like-minded families and children',
    'Values and Sanskar that stay for life',
  ],
  
  // 4 Pillars
  pillarsTitle: 'The 4 Pillars of Bodhika',
  pillarsSubtitle: 'A holistic curriculum designed to build character, not just knowledge',
  pillar1: { 
    title: 'Vāchaka', 
    subtitle: 'Spoken Sanskrit', 
    benefit: 'Builds confidence & connects to roots' 
  },
  pillar2: { 
    title: 'Itihāsa', 
    subtitle: 'Epic Stories & History', 
    benefit: 'Teaches values through stories' 
  },
  pillar3: { 
    title: 'Shāstra', 
    subtitle: 'Sacred Wisdom', 
    benefit: 'Life principles from Vedas & Gita' 
  },
  pillar4: { 
    title: 'Sanskāra', 
    subtitle: 'Character Building', 
    benefit: 'Moral foundations for life' 
  },
  
  // Roadmap
  roadmapTitle: 'The Transformation Journey',
  roadmapSubtitle: 'Month by month, watch your child grow in confidence and character',
  roadmap: [
    { month: 'Month 1-2', title: 'Foundation', description: 'Basic Sanskrit greetings, introduction to epics, and building the learning rhythm.' },
    { month: 'Month 3-4', title: 'Deep Dive', description: 'Ramayana stories, shloka recitation, and understanding dharmic values.' },
    { month: 'Month 5-6', title: 'Integration', description: 'Mahabharata wisdom, Sanskrit conversations, and practical application of values.' },
    { month: 'Month 7-9', title: 'Mastery', description: 'Bhagavad Gita teachings, confident Sanskrit speaking, and character demonstration.' },
    { month: 'Month 10-12', title: 'Celebration', description: 'Showcase learning, receive certificate, and join the alumni community.' },
  ],
  
  // Social Proof
  socialProofTitle: 'What Parents are Saying about Bodhika',
  socialProofSubtitle: 'Real transformations from real families',
  testimonials: [
    {
      quote: 'My son now greets his grandparents in Sanskrit. The joy on their faces is priceless. Bodhika has given him roots.',
      author: 'Priya S.',
      location: 'Mumbai',
    },
    {
      quote: 'She was always on her phone. Now she looks forward to Bodhika classes. She even teaches us shlokas!',
      author: 'Rajesh K.',
      location: 'Bangalore',
    },
    {
      quote: 'The values he is learning are exactly what we wanted. He respects elders, speaks truth, and takes responsibility.',
      author: 'Anita M.',
      location: 'Delhi',
    },
  ],
  
  // Pricing
  pricingTitle: 'Enroll Today',
  pricingSubtitle: 'Investment in your child\'s character for life',
  price: '₹13,000',
  priceSubtext: 'for the complete 12-month program',
  pricingFeatures: [
    'Weekly live classes with expert mentors',
    'Full recordings of every session',
    'Personal attention in small batches',
    'Certificate upon completion',
    'Access to parent community',
    'Holiday intensive sessions',
  ],
  bonus1: { title: 'Audio Guide: Daily Shlokas', value: '₹1,999' },
  bonus2: { title: 'Parenting Masterclass', value: '₹2,999' },
  scarcityBadge: '🔥 Limited to 15 Seats for March Batch',
  enrollCTA: 'Secure My Child\'s Spot Now',
  
  // FAQ
  faqTitle: 'Questions Parents Ask',
  faqSubtitle: 'Get answers to common concerns',
  faqs: [
    {
      question: 'How much time commitment is needed?',
      answer: 'During school months: 2 classes per week (1 hour each). During holidays: 3-4 classes per week for intensive learning. Classes are held on weekends, so it doesn\'t interfere with school work.',
    },
    {
      question: 'My child doesn\'t know any Sanskrit. Can they still join?',
      answer: 'Absolutely! We start from zero. The natural speaking method means your child learns Sanskrit the way they learned their mother tongue—through conversation, not grammar drills. Most children speak basic Sanskrit within 2 months.',
    },
    {
      question: 'What if my child misses a session?',
      answer: 'Every session is recorded and available for replay. You can watch missed classes anytime. We also have a catch-up system where mentors help children who need extra support.',
    },
    {
      question: 'Is this only for religious families?',
      answer: 'Bodhika teaches universal values—truth, respect, discipline, courage, compassion. While rooted in Sanatan traditions, these are values every parent wants their child to have, regardless of religious practice.',
    },
    {
      question: 'What age group is this for?',
      answer: 'Bodhika is designed for children aged 8-17 years. We have separate batches for different age groups to ensure age-appropriate content and peer interaction.',
    },
  ],
  
  // Final CTA
  finalCTATitle: 'The March 2026 Batch is Filling Up',
  finalCTASubtitle: 'Don\'t let your child miss this opportunity to connect with their heritage.',
  talkToUs: 'Talk to Us on WhatsApp',
  scholarship: 'Scholarships available for deserving families',
};

// Scroll to enrollment section
const scrollToEnrollment = () => {
  const element = document.getElementById('enrollment');
  element?.scrollIntoView({ behavior: 'smooth' });
};

// WhatsApp link
const getWhatsAppLink = (message: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

// Hero Section
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-32 md:pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Content - 60% */}
          <div className="lg:col-span-3 text-center lg:text-left">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-6 px-4 py-2 font-body text-sm">
              <Flame className="h-4 w-4 mr-2" />
              {t.heroBadge}
            </Badge>
            
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              {t.heroHeadline}
            </h1>
            
            <p className="font-body text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              {t.heroSubheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                onClick={scrollToEnrollment}
              >
                {t.heroCTA}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/5 font-semibold px-8 py-6"
                asChild
              >
                <a href={getWhatsAppLink('Hi! I want to know more about Bodhika for my child.')}>
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {t.talkToUs}
                </a>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                  ))}
                </div>
                <span className="font-body">{t.heroTrust}</span>
              </div>
            </div>
          </div>
          
          {/* Image - 40% */}
          <div className="lg:col-span-2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={heroGurukul}
                alt="Child learning in Bodhika"
                className="w-full aspect-[4/3] object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-accent/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 text-accent-foreground ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 md:left-auto md:-right-4 bg-card rounded-xl p-4 shadow-card border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                  <Video className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground">100% Live</p>
                  <p className="font-body text-xs text-muted-foreground">+ Recordings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// PAS (Problem-Agitation-Solution) Section
const PASSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.pasTitle}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          <ProblemSolutionCard
            type="problem"
            title={t.pasProblemTitle}
            points={t.pasProblems}
          />
          <ProblemSolutionCard
            type="solution"
            title={t.pasSolutionTitle}
            points={t.pasSolutions}
          />
        </div>
      </div>
    </section>
  );
};

// Four Pillars Section
const PillarsSection = () => {
  const pillars = [
    { ...t.pillar1, icon: Mic, color: 'madder' as const },
    { ...t.pillar2, icon: BookOpen, color: 'gold' as const },
    { ...t.pillar3, icon: Feather, color: 'madder' as const },
    { ...t.pillar4, icon: Heart, color: 'gold' as const },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">
            <Compass className="h-3 w-3 mr-1" />
            Curriculum
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.pillarsTitle}
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.pillarsSubtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {pillars.map((pillar, idx) => (
            <PillarCard
              key={idx}
              icon={pillar.icon}
              title={pillar.title}
              subtitle={pillar.subtitle}
              benefit={pillar.benefit}
              color={pillar.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Roadmap Section
const RoadmapSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
            <Calendar className="h-3 w-3 mr-1" />
            Program Roadmap
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.roadmapTitle}
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.roadmapSubtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <RoadmapTimeline items={t.roadmap} />
        </div>
      </div>
    </section>
  );
};

// Social Proof Section
const SocialProofSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">
            <Star className="h-3 w-3 mr-1" />
            Testimonials
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.socialProofTitle}
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.socialProofSubtitle}
          </p>
        </div>

        {/* Video Testimonials Placeholder */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          {[1, 2, 3].map((_, idx) => (
            <div
              key={idx}
              className="aspect-video bg-muted rounded-xl flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors border border-border"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Play className="h-8 w-8 text-primary ml-1" />
                </div>
                <p className="font-body text-sm text-muted-foreground">Video Testimonial {idx + 1}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Text Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {t.testimonials.map((testimonial, idx) => (
            <Card key={idx} className="bg-card border-border hover-lift">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-accent/30 mb-4" />
                <p className="font-body text-foreground mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-heading font-bold text-primary">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-foreground">{testimonial.author}</p>
                    <p className="font-body text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* WhatsApp Screenshots Placeholder */}
        <div className="mt-12 text-center">
          <p className="font-body text-sm text-muted-foreground mb-6">WhatsApp messages from parents</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {[1, 2, 3].map((_, idx) => (
              <div
                key={idx}
                className="w-48 h-64 bg-muted rounded-xl flex items-center justify-center border border-border"
              >
                <div className="text-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="font-body text-xs text-muted-foreground">Screenshot {idx + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Enrollment Section
const EnrollmentSection = () => {
  return (
    <section id="enrollment" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
            <Award className="h-3 w-3 mr-1" />
            Enrollment
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.pricingTitle}
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            {t.pricingSubtitle}
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <EnrollmentBox
            price={t.price}
            priceSubtext={t.priceSubtext}
            ctaText={t.enrollCTA}
            onCTAClick={() => window.open(getWhatsAppLink('Hi! I want to enroll my child in Bodhika March 2026 batch.'), '_blank')}
            features={t.pricingFeatures}
            bonuses={[t.bonus1, t.bonus2]}
            scarcityText={t.scarcityBadge}
          />
        </div>

        {/* Scholarship */}
        <div className="text-center mt-8">
          <a
            href={getWhatsAppLink('Hi! I want to inquire about scholarship for Bodhika.')}
            className="inline-flex items-center gap-2 font-body text-primary hover:text-primary/80 underline underline-offset-4"
          >
            <Gift className="h-4 w-4" />
            {t.scholarship}
          </a>
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">
            <MessageCircle className="h-3 w-3 mr-1" />
            FAQ
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.faqTitle}
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            {t.faqSubtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {t.faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-card"
              >
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

// Final CTA Section
const FinalCTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Flame className="h-6 w-6 animate-pulse" />
          <Flame className="h-8 w-8" />
          <Flame className="h-6 w-6 animate-pulse" />
        </div>
        
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {t.finalCTATitle}
        </h2>
        
        <p className="font-body text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          {t.finalCTASubtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6 shadow-lg"
            onClick={scrollToEnrollment}
          >
            {t.heroCTA}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 py-6"
            asChild
          >
            <a href={getWhatsAppLink('Hi! I have questions about Bodhika.')}>
              <Phone className="mr-2 h-5 w-5" />
              {t.talkToUs}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Footer
const BodhikaFooter = () => {
  return (
    <footer className="py-8 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={shastrakulamLogo} alt="Shastrakulam" className="h-8 w-auto invert" />
            <span className="font-heading font-bold">Bodhika by Shastrakulam</span>
          </div>
          
          <p className="font-body text-sm text-background/70">
            © 2026 Shastrakulam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main Page Component
const BodhikaLanding: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Bodhika - Give Your Child the Gift of Heritage | Shastrakulam</title>
        <meta
          name="description"
          content="A 1-Year Live Program in Sanatan Values, Sanskrit & Character Building for children aged 8-17. Join March 2026 batch. Limited seats."
        />
        <meta property="og:title" content="Bodhika - Give Your Child the Gift of Heritage | Shastrakulam" />
        <meta
          property="og:description"
          content="A 1-Year Live Program in Sanatan Values, Sanskrit & Character Building for children aged 8-17."
        />
      </Helmet>

      <StickyHeader ctaText={t.joinNextBatch} onCTAClick={scrollToEnrollment} />

      <main className="pb-20 md:pb-0">
        <HeroSection />
        <PASSection />
        <PillarsSection />
        <RoadmapSection />
        <SocialProofSection />
        <EnrollmentSection />
        <FAQSection />
        <FinalCTASection />
      </main>

      <BodhikaFooter />

      <StickyMobileCTA text={t.enrollCTA} onClick={scrollToEnrollment} />
    </>
  );
};

export default BodhikaLanding;
