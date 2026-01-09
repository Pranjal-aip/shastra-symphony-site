import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  BookOpen, 
  Users, 
  Clock, 
  CheckCircle2, 
  X,
  Calendar,
  Phone,
  ArrowRight,
  Flame,
  Video,
  Heart,
  Target,
  Brain,
  Shield,
  MessageCircle,
  GraduationCap,
  Compass,
  Eye,
  RefreshCw,
  Lightbulb
} from 'lucide-react';

// Import images
import heroGurukul from '@/assets/bodhika/hero-gurukul.jpg';

// Import floating button components (preserved as-is)
import StickyMobileFooter from '@/components/bodhika/StickyMobileFooter';

// WhatsApp Number
const WHATSAPP_NUMBER = '919674916567';

// Scroll helper
const scrollToPricing = () => {
  document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
};

// ============================================
// SECTION 1: HERO SECTION
// ============================================
const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-maroon via-maroon-dark to-maroon">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroGurukul} 
          alt="Children in a learning environment"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon/60 via-maroon/80 to-maroon" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center text-white space-y-8">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-cream">
            A 1-Year Live Program to Build Focus, Discipline & Indian Value-Based Understanding in Children (6–12 Years)
          </h1>
          
          <p className="font-body text-lg md:text-xl text-cream/80 max-w-3xl mx-auto leading-relaxed">
            For parents who believe that education without values leads to information, not clarity or character.
          </p>
          
          <div className="pt-6">
            <Button 
              size="lg" 
              className="bg-saffron text-white hover:bg-saffron/90 font-semibold px-10 py-6 text-lg shadow-xl"
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I want to attend the free parent orientation for Bodhika.`, '_blank')}
            >
              Attend the Free Parent Orientation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="font-body text-sm text-cream/60 mt-4">
              Orientation is for understanding the approach. Enrollment is optional.
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L60 73.3C120 66.7 240 53.3 360 46.7C480 40 600 40 720 43.3C840 46.7 960 53.3 1080 56.7C1200 60 1320 60 1380 60L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};

// ============================================
// SECTION 2: PROGRAM INFO STRIP
// ============================================
const ProgramInfoStrip = () => {
  const infoItems = [
    { icon: Calendar, label: 'Duration: 12 Months' },
    { icon: Video, label: 'Mode: 100% Live' },
    { icon: Users, label: 'Age Group: 6–12 Years' },
    { icon: Heart, label: 'Foundation: Indian Knowledge & Sanskar' },
    { icon: Target, label: 'Two Batches: Group Live & Focused Live' },
  ];
  
  return (
    <section className="py-6 bg-maroon/5 border-y border-maroon/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {infoItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-foreground">
              <item.icon className="h-5 w-5 text-maroon" />
              <span className="font-body text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 3: CLEAR FILTERING SECTION
// ============================================
const FilteringSection = () => {
  const isFor = [
    "Parents who want their children to understand the meaning behind Indian traditions, not just follow rituals",
    "Parents who feel modern schooling develops skills but not clarity of thinking or internal discipline",
    "Parents seeking a structured, long-term approach to values — not weekend crash courses",
    "Parents who value emotional regulation, right-wrong discernment, and cultural confidence",
    "Parents willing to support their child's learning through occasional parent alignment sessions"
  ];
  
  const isNotFor = [
    "Parents looking for quick results or instant transformation",
    "Parents who want religious preaching rather than developmental education",
    "Parents who expect content consumption without habit formation or reflection",
    "Parents unwilling to participate in occasional parent sessions",
    "Parents seeking entertainment-based learning without discipline or depth"
  ];
  
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            Who This Program Is For
          </h2>
          <p className="font-body text-muted-foreground text-center mb-12">
            This program is not for everyone. Please read carefully before considering enrollment.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* This IS for */}
            <Card className="border-green-200 bg-green-50/50">
              <CardContent className="p-6">
                <h3 className="font-heading text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  This Program IS For
                </h3>
                <ul className="space-y-3">
                  {isFor.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-1 shrink-0" />
                      <span className="font-body text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* This is NOT for */}
            <Card className="border-red-200 bg-red-50/50">
              <CardContent className="p-6">
                <h3 className="font-heading text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
                  <X className="h-5 w-5" />
                  This Program Is NOT For
                </h3>
                <ul className="space-y-3">
                  {isNotFor.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <X className="h-4 w-4 text-red-600 mt-1 shrink-0" />
                      <span className="font-body text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 4: CORE PROBLEM SECTION
// ============================================
const ProblemSection = () => {
  return (
    <section className="py-16 bg-cream/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            The Challenge Modern Parents Face
          </h2>
          
          <div className="space-y-6 font-body text-muted-foreground leading-relaxed">
            <p>
              Today's children are intelligent. They have access to information, screens, and opportunities that previous generations never had. Yet many parents notice something missing.
            </p>
            
            <p>
              Children react emotionally without understanding why. They struggle to focus for extended periods. They know facts but lack the internal compass to make decisions. They consume content but rarely reflect on it.
            </p>
            
            <p>
              Modern education excels at developing skills and providing information. But it rarely develops clarity of thinking, emotional discipline, or a stable sense of right and wrong.
            </p>
            
            <p>
              Indian knowledge systems offer a different approach — not as religious preaching, but as a developmental framework. A way to build clear thinking (buddhi), emotional regulation, and value anchoring through stories, reflection, and gradual habit formation.
            </p>
            
            <p className="font-medium text-foreground">
              This is what Bodhika offers: a structured, year-long journey that doesn't rush children but allows understanding to develop naturally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 5: OUTCOMES SECTION
// ============================================
const OutcomesSection = () => {
  const outcomes = [
    {
      icon: Brain,
      title: "Clear Thinking (Buddhi)",
      description: "Children learn to think before reacting, developing the ability to analyze situations with clarity rather than emotional impulse."
    },
    {
      icon: Shield,
      title: "Emotional Discipline",
      description: "Through stories and reflection, children develop the capacity to regulate their emotions and respond thoughtfully to challenges."
    },
    {
      icon: Compass,
      title: "Right-Wrong Discernment",
      description: "Understanding dharma in daily life — the ability to distinguish what is appropriate in different situations, not as rigid rules but as living wisdom."
    },
    {
      icon: Heart,
      title: "Value Anchoring",
      description: "Children develop an internal foundation of values that guides their decisions, relationships, and sense of self."
    },
    {
      icon: Eye,
      title: "Cultural Confidence",
      description: "A deep understanding of Indian traditions that allows children to engage with their heritage with pride, not confusion or disconnection."
    }
  ];
  
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            What Your Child Will Gradually Develop Over One Year
          </h2>
          <p className="font-body text-muted-foreground text-center mb-12">
            These outcomes cannot be achieved in short courses. They require time, repetition, and gradual deepening.
          </p>
          
          <div className="space-y-6">
            {outcomes.map((outcome, idx) => (
              <Card key={idx} className="border-border hover:border-maroon/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-maroon/10 flex items-center justify-center shrink-0">
                      <outcome.icon className="h-6 w-6 text-maroon" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                        {outcome.title}
                      </h3>
                      <p className="font-body text-muted-foreground">
                        {outcome.description}
                      </p>
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

// ============================================
// SECTION 6: HOW THE PROGRAM WORKS
// ============================================
const HowItWorksSection = () => {
  const elements = [
    {
      icon: Video,
      title: "Weekly Live Classes",
      description: "Children attend live sessions with trained educators. No pre-recorded content — every class involves real-time interaction, questions, and engagement."
    },
    {
      icon: BookOpen,
      title: "Story-Based Learning",
      description: "Concepts are taught through stories from Indian epics and traditions. Children absorb values through narrative, not lecture or memorization."
    },
    {
      icon: RefreshCw,
      title: "Reflection & Habit Formation",
      description: "Each session includes reflection prompts. Children are guided to connect learning with their daily life, building habits gradually over months."
    },
    {
      icon: Users,
      title: "Parent Alignment Sessions",
      description: "Occasional sessions for parents to understand what children are learning and how to support the process at home. This is a partnership."
    }
  ];
  
  return (
    <section className="py-16 bg-cream/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            How the Program Works
          </h2>
          <p className="font-body text-muted-foreground text-center mb-12">
            This is guided upbringing support, not content consumption.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {elements.map((element, idx) => (
              <Card key={idx} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-saffron/10 flex items-center justify-center">
                      <element.icon className="h-5 w-5 text-saffron" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {element.title}
                    </h3>
                  </div>
                  <p className="font-body text-muted-foreground text-sm">
                    {element.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 7: TWO-BATCH COMPARISON
// ============================================
const BatchComparisonSection = () => {
  return (
    <section id="pricing-section" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            Two Batch Options
          </h2>
          <p className="font-body text-muted-foreground text-center mb-12">
            The ideology and curriculum are the same in both batches. Only the depth of interaction differs.
          </p>
          
          {/* Comparison Table */}
          <Card className="border shadow-sm overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-maroon text-white">
                  <tr>
                    <th className="text-left p-4 font-heading font-semibold">Feature</th>
                    <th className="text-center p-4 font-heading font-semibold">Group Live Batch</th>
                    <th className="text-center p-4 font-heading font-semibold">Focused Live Batch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-background hover:bg-muted/30">
                    <td className="p-4 font-body text-foreground">Batch Size</td>
                    <td className="p-4 text-center font-body text-muted-foreground">Larger group</td>
                    <td className="p-4 text-center font-body text-foreground font-medium">Small group (12 students)</td>
                  </tr>
                  <tr className="bg-muted/10 hover:bg-muted/30">
                    <td className="p-4 font-body text-foreground">Interaction Level</td>
                    <td className="p-4 text-center font-body text-muted-foreground">Limited interaction</td>
                    <td className="p-4 text-center font-body text-foreground font-medium">High interaction</td>
                  </tr>
                  <tr className="bg-background hover:bg-muted/30">
                    <td className="p-4 font-body text-foreground">Parent Guidance</td>
                    <td className="p-4 text-center font-body text-muted-foreground">Standard updates</td>
                    <td className="p-4 text-center font-body text-foreground font-medium">Detailed parent guidance</td>
                  </tr>
                  <tr className="bg-muted/10 hover:bg-muted/30">
                    <td className="p-4 font-body text-foreground">Doubt Resolution</td>
                    <td className="p-4 text-center font-body text-muted-foreground">Group-based</td>
                    <td className="p-4 text-center font-body text-foreground font-medium">Priority attention</td>
                  </tr>
                  <tr className="bg-background hover:bg-muted/30">
                    <td className="p-4 font-body text-foreground font-semibold">Annual Fee</td>
                    <td className="p-4 text-center font-heading text-xl font-bold text-maroon">₹6,000/year</td>
                    <td className="p-4 text-center font-heading text-xl font-bold text-saffron">₹15,000/year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-maroon hover:bg-maroon/90 text-white font-semibold px-8 py-6"
              onClick={() => {
                const checkoutUrl = `https://learn.shastrakulam.com/courses/Bodhika--Awakening-Young-Minds-695393a483bcbf4ec9283f27?page=checkout`;
                window.location.href = checkoutUrl;
              }}
            >
              Enroll in Group Live Batch – ₹6,000
            </Button>
            <Button 
              size="lg" 
              className="bg-saffron hover:bg-saffron/90 text-white font-semibold px-8 py-6"
              onClick={() => {
                const checkoutUrl = `https://learn.shastrakulam.com/courses/Bodhika--Awakening-Young-Minds-10-students-batch-6953f67fba62d03beeceac42?page=checkout`;
                window.location.href = checkoutUrl;
              }}
            >
              Enroll in Focused Live Batch – ₹15,000
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 8: WHY 1-YEAR PROGRAM
// ============================================
const WhyOneYearSection = () => {
  return (
    <section className="py-16 bg-cream/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            Why This Is a 1-Year Program
          </h2>
          
          <div className="space-y-6 font-body text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">Sanskar forms slowly.</strong> Values and character cannot be downloaded or installed. They develop through repeated exposure, reflection, and practice over extended periods.
            </p>
            
            <p>
              <strong className="text-foreground">Habits require repetition.</strong> A child cannot develop emotional discipline or clear thinking from a few sessions. These capacities grow through consistent practice week after week, month after month.
            </p>
            
            <p>
              <strong className="text-foreground">Indian education never rushed children.</strong> The traditional gurukul model understood that real learning takes time. Students lived with teachers for years, not weeks. While we cannot replicate that fully, we honor this understanding by committing to a year-long journey.
            </p>
            
            <p>
              <strong className="text-foreground">Trust builds gradually.</strong> Children open up and engage deeply only when they feel safe with their teachers and peers. This trust develops over months, not days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 9: ABOUT THE VISION
// ============================================
const VisionSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            About Shastrakulam's Vision
          </h2>
          
          <div className="space-y-6 font-body text-muted-foreground leading-relaxed">
            <p>
              Shastrakulam exists to offer education that develops the whole person — not just skills, but clarity; not just knowledge, but wisdom; not just success, but character.
            </p>
            
            <p>
              We are not interested in religious conversion or sectarian promotion. We focus on the developmental aspects of Indian knowledge systems — how they can help children think clearly, feel deeply, and act rightly.
            </p>
            
            <p>
              Our approach is long-term. We understand that meaningful transformation takes time, and we are committed to walking with families on this journey rather than offering quick fixes.
            </p>
            
            <p>
              We believe that when children are rooted in values, they become better students, better friends, better family members, and eventually, better citizens.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 10: FINAL CTA
// ============================================
const FinalCTASection = () => {
  return (
    <section className="py-20 bg-maroon text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-cream">
            Begin with the Free Parent Orientation
          </h2>
          
          <p className="font-body text-lg text-cream/80 mb-8">
            This orientation is meant for clarity and alignment. There is no pressure to enroll. Attend, understand our approach, ask your questions, and then decide if this is right for your family.
          </p>
          
          <Button 
            size="lg" 
            className="bg-saffron text-white hover:bg-saffron/90 font-semibold px-10 py-6 text-lg shadow-xl"
            onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I want to attend the free parent orientation for Bodhika.`, '_blank')}
          >
            Attend the Free Parent Orientation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <p className="font-body text-sm text-cream/60 mt-6">
            Or call us directly: <a href="tel:+919674916567" className="underline hover:text-cream">+91 96749 16567</a>
          </p>
        </div>
      </div>
    </section>
  );
};

// ============================================
// STICKY ENROLL BUTTON (PRESERVED AS-IS)
// ============================================
const StickyEnrollButton = () => {
  const [visible, setVisible] = useState(false);
  const [hiddenNearPricing, setHiddenNearPricing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const pricingSection = document.getElementById('pricing-section');
      
      // Show after scrolling 500px
      setVisible(scrollY > 500);
      
      // Hide when near pricing section
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect();
        const isNearPricing = rect.top < window.innerHeight && rect.bottom > 0;
        setHiddenNearPricing(isNearPricing);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible || hiddenNearPricing) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-up hidden md:block">
      <Button
        size="lg"
        className="bg-saffron hover:bg-saffron/90 text-white font-semibold px-8 py-4 rounded-full shadow-2xl"
        onClick={scrollToPricing}
      >
        <Flame className="mr-2 h-5 w-5" />
        View Batch Options
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================
const BodhikaLanding = () => {
  return (
    <>
      <Layout>
        <Helmet>
          <title>Bodhika – 1-Year Live Program for Children | Focus, Discipline & Indian Values | Shastrakulam</title>
          <meta name="description" content="Bodhika is a 1-year live program for children aged 6-12 that builds focus, discipline, and Indian value-based understanding through weekly live classes and story-based learning." />
          <meta name="keywords" content="children education, Indian values, focus discipline, character building, live classes, 6-12 years, sanskar, cultural education" />
        </Helmet>
        
        <HeroSection />
        <ProgramInfoStrip />
        <FilteringSection />
        <ProblemSection />
        <OutcomesSection />
        <HowItWorksSection />
        <BatchComparisonSection />
        <WhyOneYearSection />
        <VisionSection />
        <FinalCTASection />
        
        {/* Floating buttons preserved */}
        <StickyEnrollButton />
        <StickyMobileFooter />
      </Layout>
    </>
  );
};

export default BodhikaLanding;
