import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
  MessageCircle,
  Download,
  Shield,
  Flame,
  Brain,
  Smile,
  Eye,
  Lightbulb,
  Calendar,
  Phone,
  Quote,
  Play,
  Video,
  Radio,
  ChevronRight,
  ArrowRight,
  Target,
  Mic,
  BookMarked,
  Feather,
  Compass,
  Sun,
  Moon,
  Music,
  Palette,
  Globe
} from 'lucide-react';

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(25,85%,50%)] via-[hsl(30,80%,55%)] to-[hsl(35,75%,60%)]" />
      
      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 border-4 border-white/30 rounded-full" />
        <div className="absolute top-1/4 right-20 w-60 h-60 border-4 border-white/20 rounded-full" />
        <div className="absolute bottom-20 left-1/4 w-32 h-32 border-4 border-white/25 rounded-full" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 animate-fade-in">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm font-body">
              1-Year Live Online Program for Kids & Teens
            </Badge>
            
            <div className="border-l-4 border-white/50 pl-6">
              <p className="text-white/90 font-body text-lg mb-2 tracking-wide">
                A Transformational Journey in Sanatan Dharma
              </p>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Bodhika
              </h1>
            </div>
            
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-white/95">
              Root Your Child in Sanatan Dharma
            </h2>
            
            <p className="font-body text-lg md:text-xl text-white/85 max-w-xl leading-relaxed">
              Live online classes with recordings • Values • Culture • Sanskrit
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-white text-[hsl(25,85%,45%)] hover:bg-white/90 font-semibold px-8 py-6 text-lg shadow-lg"
              >
                Enroll My Child Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                Book Free Counseling
              </Button>
            </div>
            
            {/* Trust Icons */}
            <div className="flex flex-wrap gap-6 pt-6">
              {[
                { icon: Video, label: "Live Classes" },
                { icon: Download, label: "Recorded Access" },
                { icon: Smile, label: "Child-Friendly" },
                { icon: Calendar, label: "1-Year Program" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-white/90">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="font-body text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right - Illustrated Cards */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {/* Feature Cards with illustrations */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(25,85%,50%)] to-[hsl(35,75%,55%)] rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Deep Dharma</h3>
                <p className="font-body text-sm text-muted-foreground">Understanding the eternal wisdom</p>
              </div>
              
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300 mt-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(340,65%,30%)] to-[hsl(340,50%,45%)] rounded-xl flex items-center justify-center mb-4">
                  <Mic className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Spoken Sanskrit</h3>
                <p className="font-body text-sm text-muted-foreground">Learn the sacred language</p>
              </div>
              
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(145,60%,35%)] to-[hsl(145,50%,45%)] rounded-xl flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Moral Values</h3>
                <p className="font-body text-sm text-muted-foreground">Building strong character</p>
              </div>
              
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300 mt-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(220,70%,50%)] to-[hsl(220,60%,60%)] rounded-xl flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Indian Culture</h3>
                <p className="font-body text-sm text-muted-foreground">Celebrating our heritage</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};

// Highlight Strip Component
const HighlightStrip = () => {
  const highlights = [
    { icon: Calendar, label: "12 Months Learning" },
    { icon: Video, label: "Live Interactive Classes" },
    { icon: Download, label: "Class Recordings" },
    { icon: BookOpen, label: "Deep Sanatan Dharma" },
    { icon: Mic, label: "Spoken Sanskrit" },
    { icon: Heart, label: "Moral & Cultural Education" },
  ];
  
  return (
    <section className="py-8 bg-[hsl(340,65%,30%)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
                <item.icon className="h-6 w-6" />
              </div>
              <span className="font-body font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-secondary text-secondary-foreground mb-4">About the Course</Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground lotus-underline inline-block">
            What is Bodhika?
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-elevated bg-gradient-to-br from-secondary/30 to-background">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[hsl(25,85%,50%)] to-[hsl(35,75%,55%)] flex items-center justify-center shrink-0">
                  <Sparkles className="h-16 w-16 text-white" />
                </div>
                <div>
                  <p className="font-body text-lg md:text-xl text-foreground leading-relaxed">
                    <span className="font-semibold text-primary">Bodhika</span> is a structured, child-friendly Sanatan Dharma learning journey that builds <span className="text-[hsl(25,85%,45%)] font-semibold">character, clarity, culture, and confidence</span> through live guidance and timeless wisdom.
                  </p>
                  <p className="font-body text-muted-foreground mt-4">
                    Give your child the true essence of our ancient traditions in a modern, engaging format that they will love.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Learning Outcomes Section
const LearningSection = () => {
  const learningOutcomes = [
    {
      icon: BookMarked,
      title: "Deep Teaching of Sanatan Dharma",
      description: "Clear, age-appropriate and in-depth understanding of Sanatan Dharma—its philosophy, principles, duties, and way of life.",
      color: "from-[hsl(25,85%,50%)] to-[hsl(35,75%,55%)]"
    },
    {
      icon: Globe,
      title: "Indian Culture & Traditions",
      description: "Deep understanding of Indian culture, festivals, rituals, and traditions with meaning, relevance, and cultural pride.",
      color: "from-[hsl(340,65%,30%)] to-[hsl(340,50%,45%)]"
    },
    {
      icon: Award,
      title: "16 Sanskars (Shodasha Samskāra)",
      description: "Learning the purpose, values, and relevance of the 16 Sanskars and how they shape a balanced and disciplined life.",
      color: "from-[hsl(220,70%,50%)] to-[hsl(220,60%,60%)]"
    },
    {
      icon: Music,
      title: "Mantras & Shlokas",
      description: "Learning important mantras and shlokas with correct pronunciation, meaning, and daily-life application.",
      color: "from-[hsl(145,60%,35%)] to-[hsl(145,50%,45%)]"
    },
    {
      icon: Heart,
      title: "Moral Values & Character Building",
      description: "Strong moral foundation including truth, discipline, compassion, respect, responsibility, and ethical living.",
      color: "from-[hsl(280,60%,45%)] to-[hsl(280,50%,55%)]"
    },
    {
      icon: Feather,
      title: "Story-Based Wisdom",
      description: "Powerful stories that teach life lessons, emotional intelligence, courage, and right decision-making.",
      color: "from-[hsl(200,70%,45%)] to-[hsl(200,60%,55%)]"
    },
    {
      icon: Mic,
      title: "Spoken Sanskrit",
      description: "Ability to speak basic Sanskrit confidently using daily-use words, sentences, and simple conversations.",
      color: "from-[hsl(30,85%,45%)] to-[hsl(40,80%,50%)]"
    },
    {
      icon: Brain,
      title: "Mindfulness & Inner Strength",
      description: "Practices that develop focus, calmness, emotional balance, self-awareness, and confidence.",
      color: "from-[hsl(170,60%,40%)] to-[hsl(170,50%,50%)]"
    },
  ];
  
  return (
    <section className="py-20 bg-hero-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-[hsl(25,85%,50%)]/10 text-[hsl(25,85%,45%)] border-[hsl(25,85%,50%)]/20 mb-4">
            Learning Outcomes
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Your Child Will Learn
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive curriculum designed to nurture every aspect of your child's spiritual and moral development
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningOutcomes.map((item, idx) => (
            <Card 
              key={idx} 
              className="border-0 shadow-card hover-lift bg-card group cursor-pointer overflow-hidden"
            >
              <CardContent className="p-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Live + Recorded Section
const LearningExperienceSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <Badge className="bg-secondary text-secondary-foreground mb-4">Learning Experience</Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Live + Recorded Learning Experience
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-8">
              The best of both worlds - interactive live sessions with expert mentors, plus recordings for revision and flexibility.
            </p>
            
            <div className="space-y-4">
              {[
                { icon: Radio, label: "Live mentor-led classes", desc: "Real-time interaction and guidance" },
                { icon: MessageCircle, label: "Interactive discussions & doubts", desc: "Get your questions answered instantly" },
                { icon: Download, label: "Class recordings for every session", desc: "Never miss a class, revise anytime" },
                { icon: Clock, label: "Learn at your own pace", desc: "Flexible learning schedule" },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[hsl(25,85%,50%)] to-[hsl(35,75%,55%)] flex items-center justify-center shrink-0">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground">{item.label}</h4>
                    <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[hsl(25,85%,50%)] to-[hsl(340,65%,35%)] rounded-3xl p-8 md:p-12 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="h-8 w-8" />
                </div>
                <div>
                  <p className="font-body text-white/80 text-sm">Experience</p>
                  <h3 className="font-heading text-2xl font-bold">Live Learning</h3>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-body text-sm">Weekly Live Sessions</span>
                    <Badge className="bg-white/20 text-white border-0">2 Days/Week</Badge>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-white rounded-full" />
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-body text-sm">Holiday Sessions</span>
                    <Badge className="bg-white/20 text-white border-0">3-4 Days</Badge>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-white rounded-full" />
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm">Recording Access</span>
                    <Badge className="bg-green-400/30 text-green-100 border-0">Unlimited</Badge>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-elevated border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground">Recording Available</p>
                  <p className="font-heading font-semibold text-foreground">Every Session</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Sanskrit Highlight Section
const SanskritSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[hsl(340,65%,30%)] to-[hsl(340,70%,22%)] text-white overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(25,85%,50%)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <Mic className="h-5 w-5" />
            <span className="font-body">Special Focus</span>
          </div>
          
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            संस्कृतभाषणम्
          </h2>
          <h3 className="font-heading text-2xl md:text-3xl font-semibold mb-8 text-white/90">
            Spoken Sanskrit
          </h3>
          
          <p className="font-body text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Your child will learn to speak Sanskrit naturally and confidently, connecting with our ancient language in daily life.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Lightbulb, title: "Natural Speaking Method", desc: "Learn through conversation, not just grammar" },
              { icon: Star, title: "Confidence-Based Learning", desc: "Build speaking confidence step by step" },
              { icon: Target, title: "Daily Sanskrit Usage", desc: "Practical phrases for everyday use" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-[hsl(25,85%,50%)] flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h4 className="font-heading text-lg font-semibold mb-2">{item.title}</h4>
                <p className="font-body text-sm text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Course Structure Section
const CourseStructureSection = () => {
  const modules = [
    { title: "Foundations of Dharma", icon: BookOpen, description: "Understanding the core principles" },
    { title: "Culture & Sanskars", icon: Globe, description: "16 Sanskars and traditions" },
    { title: "Mantras & Shlokas", icon: Music, description: "Sacred chants with meaning" },
    { title: "Sanskrit Speaking", icon: Mic, description: "Conversational Sanskrit" },
    { title: "Life Wisdom & Values", icon: Heart, description: "Stories and moral teachings" },
  ];
  
  return (
    <section className="py-20 bg-hero-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">Course Modules</Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Course Structure
          </h2>
        </div>
        
        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[hsl(25,85%,50%)] via-[hsl(340,65%,35%)] to-[hsl(340,65%,30%)]" />
            
            {modules.map((module, idx) => (
              <div 
                key={idx} 
                className={`relative flex items-center mb-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <Card className="border-0 shadow-card hover-lift inline-block w-full md:w-auto">
                    <CardContent className="p-6">
                      <div className={`flex items-center gap-4 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(25,85%,50%)] to-[hsl(340,65%,35%)] flex items-center justify-center shrink-0">
                          <module.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className={idx % 2 === 0 ? 'md:text-right' : ''}>
                          <h3 className="font-heading text-lg font-semibold text-foreground">{module.title}</h3>
                          <p className="font-body text-sm text-muted-foreground">{module.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Circle */}
                <div className="absolute left-4 md:left-1/2 w-5 h-5 rounded-full bg-[hsl(25,85%,50%)] border-4 border-background transform -translate-x-1/2 z-10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const PricingSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-[hsl(25,85%,50%)]/10 text-[hsl(25,85%,45%)] border-[hsl(25,85%,50%)]/20 mb-4">
            Batch & Pricing
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Choose Your Batch
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Two learning options designed for different needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Group Batch */}
          <Card className="border-2 border-border shadow-card hover-lift overflow-hidden">
            <div className="bg-secondary p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-primary/10 text-primary">Group Batch</Badge>
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-body text-muted-foreground">50-60 students per batch</p>
            </div>
            <CardContent className="p-6">
              <div className="mb-6">
                <span className="font-heading text-4xl font-bold text-foreground">₹6,000</span>
                <span className="font-body text-muted-foreground">/year</span>
              </div>
              
              <ul className="space-y-3 mb-6">
                {[
                  "Weekly Live Classes with mentors",
                  "Energetic peer interactions",
                  "Interactive activities & Q&A",
                  "Community building",
                  "Full class recordings",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="font-body text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="w-full" variant="maroon-outline" size="lg">
                Enroll Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          
          {/* Focused Batch */}
          <Card className="border-2 border-[hsl(25,85%,50%)] shadow-elevated hover-lift overflow-hidden relative">
            <div className="absolute top-0 right-0 bg-[hsl(25,85%,50%)] text-white px-4 py-1 text-sm font-body rounded-bl-lg">
              Recommended
            </div>
            <div className="bg-gradient-to-br from-[hsl(25,85%,50%)] to-[hsl(35,75%,55%)] p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-white/20 text-white border-white/30">Focused Batch</Badge>
                <Star className="h-6 w-6" />
              </div>
              <p className="font-body text-white/80">12 students only</p>
            </div>
            <CardContent className="p-6">
              <div className="mb-6">
                <span className="font-heading text-4xl font-bold text-foreground">₹13,000</span>
                <span className="font-body text-muted-foreground">/year</span>
              </div>
              
              <ul className="space-y-3 mb-6">
                {[
                  "Personal attention from mentors",
                  "Deeper engagement & feedback",
                  "Personalized doubt clearing",
                  "Individual progress tracking",
                  "Priority scheduling",
                  "Full class recordings",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[hsl(25,85%,50%)] shrink-0" />
                    <span className="font-body text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="w-full" variant="saffron" size="lg">
                Enroll Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Scholarship Badge */}
        <div className="text-center mt-8">
          <Badge className="bg-green-100 text-green-700 border-green-200 px-6 py-2">
            <Award className="h-4 w-4 mr-2 inline" />
            Scholarships available for needy families
          </Badge>
        </div>
      </div>
    </section>
  );
};

// Parent Trust Section
const TrustSection = () => {
  const trustPoints = [
    { icon: GraduationCap, title: "Educator-Designed Curriculum", desc: "Created by experienced educators and scholars" },
    { icon: Shield, title: "Child-Safe Environment", desc: "Secure and monitored online learning space" },
    { icon: Heart, title: "Value-Based Education", desc: "Focus on character building and ethics" },
    { icon: Target, title: "Long-Term Character Growth", desc: "Skills and values that last a lifetime" },
  ];
  
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">Why Parents Trust Us</Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Built for Parents, Designed for Children
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((item, idx) => (
            <Card key={idx} className="border-0 shadow-card text-center hover-lift">
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(25,85%,50%)] to-[hsl(340,65%,35%)] flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "My son has become more disciplined and connected to our culture. The Sanskrit speaking skills are amazing!",
      name: "Priya Sharma",
      role: "Parent of 10-year-old",
    },
    {
      quote: "The live classes keep my daughter engaged. She looks forward to every session and loves the stories.",
      name: "Rajesh Patel",
      role: "Parent of 12-year-old",
    },
    {
      quote: "Finally, a program that teaches dharma in a way children can understand and love. Highly recommended!",
      name: "Ananya Gupta",
      role: "Parent of 8-year-old",
    },
  ];
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-secondary text-secondary-foreground mb-4">Testimonials</Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            What Parents Say
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((item, idx) => (
            <Card key={idx} className="border-0 shadow-card hover-lift">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-[hsl(25,85%,50%)]/30 mb-4" />
                <p className="font-body text-foreground italic mb-6">"{item.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(25,85%,50%)] to-[hsl(340,65%,35%)] flex items-center justify-center text-white font-heading font-bold">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground">{item.name}</p>
                    <p className="font-body text-sm text-muted-foreground">{item.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Final CTA Section
const FinalCTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[hsl(25,85%,50%)] via-[hsl(30,80%,52%)] to-[hsl(340,65%,35%)] text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-60 h-60 border-4 border-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-80 h-80 border-4 border-white rounded-full" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 border-4 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Give Your Child Roots Before Wings
          </h2>
          <p className="font-body text-xl text-white/90 mb-8">
            Join thousands of parents who are giving their children the gift of timeless wisdom and strong values.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-white text-[hsl(25,85%,45%)] hover:bg-white/90 font-semibold px-10 py-6 text-lg shadow-lg"
            >
              Enroll My Child Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-semibold px-10 py-6 text-lg"
            >
              <Phone className="mr-2 h-5 w-5" />
              Talk to Us
            </Button>
          </div>
          
          <p className="font-body text-white/80">
            Live Classes + Recordings Included
          </p>
          
          <div className="flex justify-center gap-6 mt-8">
            {[
              { icon: Video, label: "Live Classes" },
              { icon: Download, label: "Recordings" },
              { icon: Award, label: "Certificate" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-white/90">
                <item.icon className="h-5 w-5" />
                <span className="font-body text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Sticky Enroll Button
const StickyEnrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto z-50 animate-fade-in">
      <Button 
        size="lg" 
        variant="saffron"
        className="w-full md:w-auto shadow-lg font-semibold"
      >
        Enroll Now
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

// Main Page Component
const BodhikaLanding: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Bodhika - Root Your Child in Sanatan Dharma | Shastrakulam</title>
        <meta name="description" content="Bodhika is a 1-year live online program for kids and teens to learn Sanatan Dharma, Indian culture, Sanskrit speaking, and moral values. Enroll now!" />
        <meta name="keywords" content="Bodhika, Sanatan Dharma, Sanskrit, Indian culture, kids education, teens learning, values, morals" />
      </Helmet>
      
      <Layout>
        <HeroSection />
        <HighlightStrip />
        <AboutSection />
        <LearningSection />
        <LearningExperienceSection />
        <SanskritSection />
        <CourseStructureSection />
        <PricingSection />
        <TrustSection />
        <TestimonialsSection />
        <FinalCTASection />
        <StickyEnrollButton />
      </Layout>
    </>
  );
};

export default BodhikaLanding;
