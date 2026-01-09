import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
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
  Lightbulb,
  Sparkles,
  Star,
  Award,
  Zap
} from 'lucide-react';

// Import images
import heroGurukul from '@/assets/bodhika/hero-gurukul.jpg';
import heroCulture from '@/assets/bodhika/hero-culture.jpg';
import heroMeditation from '@/assets/bodhika/hero-meditation.jpg';

// Import floating button components (preserved as-is)
import StickyMobileFooter from '@/components/bodhika/StickyMobileFooter';
import BodhikaEnrollmentForm from '@/components/bodhika/BodhikaEnrollmentForm';

// WhatsApp Number
const WHATSAPP_NUMBER = '919674916567';

// Scroll helper
const scrollToPricing = () => {
  document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// ============================================
// SECTION 1: HERO SECTION
// ============================================
const HeroSection = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-maroon via-maroon-dark to-[#2a0a0a]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-saffron rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-maroon-light rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroGurukul} 
          alt="Children in a learning environment"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon/40 via-maroon/70 to-maroon" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 py-20">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl mx-auto text-center text-white space-y-8"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2">
            <Sparkles className="h-4 w-4 text-saffron" />
            <span className="text-sm font-medium text-cream">For Children Aged 6–12 Years</span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-cream"
          >
            A 1-Year Live Program to Build{' '}
            <span className="text-saffron">Focus, Discipline</span> & Indian Value-Based Understanding
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="font-body text-lg md:text-xl lg:text-2xl text-cream/85 max-w-3xl mx-auto leading-relaxed"
          >
            For parents who believe that education without values leads to information, not clarity or character.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="xl" 
              className="bg-saffron text-white hover:bg-saffron/90 font-semibold px-10 py-7 text-lg shadow-2xl shadow-saffron/30 rounded-xl group"
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I want to attend the free parent orientation for Bodhika.`, '_blank')}
            >
              Attend the Free Parent Orientation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-cream/40 text-cream hover:bg-cream/10 font-semibold px-8 py-6 rounded-xl"
              onClick={scrollToPricing}
            >
              View Batch Options
            </Button>
          </motion.div>
          
          <motion.p variants={fadeInUp} className="font-body text-sm text-cream/60">
            Orientation is for understanding the approach. Enrollment is optional.
          </motion.p>
        </motion.div>
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
    { icon: Calendar, label: '12 Months' },
    { icon: Video, label: '100% Live' },
    { icon: Users, label: 'Age 6–12' },
    { icon: Heart, label: 'Indian Values' },
    { icon: Target, label: '2 Batches' },
  ];
  
  return (
    <section className="py-8 bg-gradient-to-r from-maroon/5 via-saffron/5 to-maroon/5 border-y border-maroon/10">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-6 md:gap-12"
        >
          {infoItems.map((item, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeInUp}
              className="flex items-center gap-3 bg-background/80 backdrop-blur-sm px-5 py-3 rounded-xl shadow-sm border border-border"
            >
              <div className="w-10 h-10 rounded-full bg-maroon/10 flex items-center justify-center">
                <item.icon className="h-5 w-5 text-maroon" />
              </div>
              <span className="font-body text-sm font-semibold text-foreground">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <span className="inline-block bg-maroon/10 text-maroon px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Intentional Filtering
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Who This Program Is For
            </h2>
            <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
              This program is not for everyone. Please read carefully before considering enrollment.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* This IS for */}
            <motion.div variants={fadeInUp}>
              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100/50 shadow-lg shadow-green-100/50 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-green-800">
                      This Program IS For
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {isFor.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                        <span className="font-body text-sm text-green-900">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* This is NOT for */}
            <motion.div variants={fadeInUp}>
              <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-red-100/50 shadow-lg shadow-red-100/50 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                      <X className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-red-800">
                      This Program Is NOT For
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {isNotFor.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <X className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
                        <span className="font-body text-sm text-red-900">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 4: CORE PROBLEM SECTION
// ============================================
const ProblemSection = () => {
  return (
    <section className="py-20 bg-cream/40 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-saffron/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-maroon/5 rounded-full filter blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <span className="inline-block bg-saffron/10 text-saffron px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              The Challenge
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              What Modern Parents Face
            </h2>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-8 mb-12">
            <img 
              src={heroCulture} 
              alt="Children learning together"
              className="rounded-2xl shadow-2xl w-full h-64 md:h-auto object-cover"
            />
            <div className="space-y-5 font-body text-muted-foreground leading-relaxed flex flex-col justify-center">
              <p>
                Today's children are intelligent. They have access to information, screens, and opportunities. Yet many parents notice something <strong className="text-foreground">missing</strong>.
              </p>
              <p>
                Children react emotionally without understanding why. They struggle to focus. They know facts but lack the <strong className="text-foreground">internal compass</strong> to make decisions.
              </p>
              <p>
                Modern education excels at skills. But it rarely develops <strong className="text-foreground">clarity of thinking</strong>, emotional discipline, or a stable sense of right and wrong.
              </p>
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Card className="bg-maroon text-white shadow-2xl shadow-maroon/20 border-0">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-start gap-4">
                  <Lightbulb className="h-8 w-8 text-saffron shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold mb-3 text-cream">The Indian Approach</h3>
                    <p className="font-body text-cream/85 leading-relaxed">
                      Indian knowledge systems offer a different path — not as religious preaching, but as a <strong>developmental framework</strong>. A way to build clear thinking (buddhi), emotional regulation, and value anchoring through stories, reflection, and gradual habit formation. This is what Bodhika offers.
                    </p>
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

// ============================================
// SECTION 5: OUTCOMES SECTION
// ============================================
const OutcomesSection = () => {
  const outcomes = [
    {
      icon: Brain,
      title: "Clear Thinking (Buddhi)",
      description: "Children learn to think before reacting, developing the ability to analyze situations with clarity.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Shield,
      title: "Emotional Discipline",
      description: "Through stories and reflection, children develop the capacity to regulate their emotions thoughtfully.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: Compass,
      title: "Right-Wrong Discernment",
      description: "Understanding dharma in daily life — distinguishing what is appropriate in different situations.",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: Heart,
      title: "Value Anchoring",
      description: "Children develop an internal foundation of values that guides their decisions and relationships.",
      color: "from-rose-500 to-pink-600"
    },
    {
      icon: Eye,
      title: "Cultural Confidence",
      description: "A deep understanding of Indian traditions that allows children to engage with heritage with pride.",
      color: "from-purple-500 to-violet-600"
    }
  ];
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <span className="inline-block bg-maroon/10 text-maroon px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Transformation Over Time
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Your Child Will Develop Over One Year
            </h2>
            <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
              These outcomes cannot be achieved in short courses. They require time, repetition, and gradual deepening.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outcomes.map((outcome, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="border-border hover:border-maroon/30 transition-all duration-300 hover:shadow-xl group h-full bg-gradient-to-br from-background to-muted/30">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${outcome.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                      <outcome.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                      {outcome.title}
                    </h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">
                      {outcome.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
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
      description: "Real-time interaction with trained educators. No pre-recorded content — every class involves questions and engagement.",
      step: "01"
    },
    {
      icon: BookOpen,
      title: "Story-Based Learning",
      description: "Concepts taught through stories from Indian epics. Children absorb values through narrative, not lecture.",
      step: "02"
    },
    {
      icon: RefreshCw,
      title: "Reflection & Habit Formation",
      description: "Each session includes reflection prompts. Children connect learning with daily life, building habits gradually.",
      step: "03"
    },
    {
      icon: Users,
      title: "Parent Alignment Sessions",
      description: "Occasional sessions for parents to understand what children learn and how to support the process at home.",
      step: "04"
    }
  ];
  
  return (
    <section className="py-20 bg-gradient-to-br from-cream/40 via-background to-cream/40 relative">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <span className="inline-block bg-saffron/10 text-saffron px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Our Method
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              How the Program Works
            </h2>
            <p className="font-body text-muted-foreground text-lg">
              This is guided upbringing support, not content consumption.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {elements.map((element, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="border-border bg-background shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-5">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-saffron to-saffron/70 flex items-center justify-center shadow-lg">
                          <element.icon className="h-8 w-8 text-white" />
                        </div>
                        <span className="absolute -top-2 -right-2 w-7 h-7 bg-maroon text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                          {element.step}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                          {element.title}
                        </h3>
                        <p className="font-body text-muted-foreground text-sm leading-relaxed">
                          {element.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 7: TWO-BATCH COMPARISON
// ============================================
const BatchComparisonSection = () => {
  const [enrollFormOpen, setEnrollFormOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<'group' | 'focused'>('group');

  const handleEnrollClick = (batch: 'group' | 'focused') => {
    setSelectedBatch(batch);
    setEnrollFormOpen(true);
  };

  return (
    <section id="pricing-section" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <span className="inline-block bg-maroon/10 text-maroon px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Choose Your Batch
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Two Batch Options
            </h2>
            <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
              The ideology and curriculum are the same in both batches. Only the depth of interaction differs.
            </p>
          </motion.div>
          
          {/* Pricing Cards */}
          <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Group Batch */}
            <Card className="border-2 border-maroon/20 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-2 bg-maroon" />
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Group Live Batch</h3>
                  <p className="font-body text-muted-foreground text-sm">For parents seeking value-based education at accessible pricing</p>
                </div>
                
                <div className="mb-8">
                  <span className="font-heading text-5xl font-bold text-maroon">₹6,000</span>
                  <span className="font-body text-muted-foreground">/year</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {[
                    'Larger group sessions',
                    'Weekly live classes',
                    'Story-based curriculum',
                    'Standard parent updates',
                    'Group-based doubt resolution'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-maroon shrink-0" />
                      <span className="font-body text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  size="lg" 
                  className="w-full bg-maroon hover:bg-maroon/90 text-white font-semibold py-6 rounded-xl shadow-lg group-hover:shadow-xl transition-all"
                  onClick={() => handleEnrollClick('group')}
                >
                  Enroll in Group Batch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
            
            {/* Focused Batch */}
            <Card className="border-2 border-saffron/30 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group bg-gradient-to-br from-saffron/5 to-background">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-saffron to-saffron/70" />
              <div className="absolute top-6 right-6">
                <span className="bg-saffron text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3" /> RECOMMENDED
                </span>
              </div>
              <CardContent className="p-8 pt-14">
                <div className="mb-6">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Focused Live Batch</h3>
                  <p className="font-body text-muted-foreground text-sm">For parents wanting personalized attention and deeper engagement</p>
                </div>
                
                <div className="mb-8">
                  <span className="font-heading text-5xl font-bold text-saffron">₹15,000</span>
                  <span className="font-body text-muted-foreground">/year</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {[
                    'Small group (12 students max)',
                    'High interaction & personalization',
                    'Detailed parent guidance sessions',
                    'Priority doubt resolution',
                    'Individual progress tracking'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-saffron shrink-0" />
                      <span className="font-body text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  size="lg" 
                  className="w-full bg-saffron hover:bg-saffron/90 text-white font-semibold py-6 rounded-xl shadow-lg shadow-saffron/20 group-hover:shadow-xl transition-all"
                  onClick={() => handleEnrollClick('focused')}
                >
                  Enroll in Focused Batch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Direct Payment Links */}
          <motion.div variants={fadeInUp} className="text-center">
            <p className="font-body text-muted-foreground text-sm mb-4">
              Or proceed directly to payment:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline"
                className="border-maroon text-maroon hover:bg-maroon/5"
                onClick={() => {
                  window.location.href = `https://learn.shastrakulam.com/courses/Bodhika--Awakening-Young-Minds-695393a483bcbf4ec9283f27?page=checkout`;
                }}
              >
                Direct Payment – Group (₹6,000)
              </Button>
              <Button 
                variant="outline"
                className="border-saffron text-saffron hover:bg-saffron/5"
                onClick={() => {
                  window.location.href = `https://learn.shastrakulam.com/courses/Bodhika--Awakening-Young-Minds-10-students-batch-6953f67fba62d03beeceac42?page=checkout`;
                }}
              >
                Direct Payment – Focused (₹15,000)
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enrollment Form Dialog */}
      <BodhikaEnrollmentForm 
        batchType={selectedBatch}
        open={enrollFormOpen}
        onOpenChange={setEnrollFormOpen}
      />
    </section>
  );
};

// ============================================
// SECTION 8: WHY 1-YEAR PROGRAM
// ============================================
const WhyOneYearSection = () => {
  const reasons = [
    {
      icon: RefreshCw,
      title: "Sanskar forms slowly",
      description: "Values and character cannot be downloaded. They develop through repeated exposure and practice over extended periods."
    },
    {
      icon: Zap,
      title: "Habits require repetition",
      description: "A child cannot develop emotional discipline from a few sessions. These capacities grow through consistent practice."
    },
    {
      icon: GraduationCap,
      title: "Traditional wisdom",
      description: "The gurukul model understood that real learning takes time. We honor this by committing to a year-long journey."
    },
    {
      icon: Heart,
      title: "Trust builds gradually",
      description: "Children open up and engage deeply only when they feel safe. This trust develops over months, not days."
    }
  ];

  return (
    <section className="py-20 bg-cream/40">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <span className="inline-block bg-maroon/10 text-maroon px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              The Long View
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Why This Is a 1-Year Program
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {reasons.map((reason, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="border-border bg-background/80 backdrop-blur-sm shadow-md h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-maroon/10 flex items-center justify-center shrink-0">
                        <reason.icon className="h-6 w-6 text-maroon" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                          {reason.title}
                        </h3>
                        <p className="font-body text-muted-foreground text-sm leading-relaxed">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 9: ABOUT THE VISION
// ============================================
const VisionSection = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-saffron/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-maroon/5 rounded-full filter blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <span className="inline-block bg-saffron/10 text-saffron px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Our Philosophy
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              About Shastrakulam's Vision
            </h2>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-8 items-center">
            <img 
              src={heroMeditation} 
              alt="Meditation and inner peace"
              className="rounded-2xl shadow-2xl w-full h-72 object-cover"
            />
            <div className="space-y-5">
              <p className="font-body text-muted-foreground leading-relaxed">
                Shastrakulam exists to offer education that develops the <strong className="text-foreground">whole person</strong> — not just skills, but clarity; not just knowledge, but wisdom.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                We are not interested in religious conversion. We focus on the <strong className="text-foreground">developmental aspects</strong> of Indian knowledge systems — how they can help children think clearly, feel deeply, and act rightly.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                Our approach is long-term. We believe that when children are rooted in values, they become better students, friends, and eventually, better citizens.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 10: FINAL CTA
// ============================================
const FinalCTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-maroon via-maroon-dark to-[#2a0a0a] text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-saffron rounded-full filter blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-maroon-light rounded-full filter blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp}>
            <Award className="h-16 w-16 text-saffron mx-auto mb-6" />
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="font-heading text-3xl md:text-5xl font-bold mb-6 text-cream">
            Begin with the Free Parent Orientation
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="font-body text-lg md:text-xl text-cream/80 mb-10 leading-relaxed">
            This orientation is meant for clarity and alignment. There is no pressure to enroll. Attend, understand our approach, ask your questions, and then decide if this is right for your family.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="xl" 
              className="bg-saffron text-white hover:bg-saffron/90 font-semibold px-12 py-7 text-lg shadow-2xl shadow-saffron/30 rounded-xl group"
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I want to attend the free parent orientation for Bodhika.`, '_blank')}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Attend the Free Parent Orientation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-6 text-cream/70">
            <a href="tel:+919674916567" className="flex items-center gap-2 hover:text-cream transition-colors">
              <Phone className="h-5 w-5" />
              <span className="font-body">+91 96749 16567</span>
            </a>
          </motion.div>
        </motion.div>
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
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
    >
      <Button
        size="lg"
        className="bg-saffron hover:bg-saffron/90 text-white font-semibold px-8 py-4 rounded-full shadow-2xl shadow-saffron/30"
        onClick={scrollToPricing}
      >
        <Flame className="mr-2 h-5 w-5" />
        View Batch Options
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </motion.div>
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
