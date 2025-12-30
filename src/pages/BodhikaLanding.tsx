import React, { useState, useEffect, useRef } from 'react';
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

// Import images
import heroGurukul from '@/assets/bodhika/hero-gurukul.jpg';
import heroSanskrit from '@/assets/bodhika/hero-sanskrit.jpg';
import heroCulture from '@/assets/bodhika/hero-culture.jpg';
import heroMeditation from '@/assets/bodhika/hero-meditation.jpg';
import gitaScene from '@/assets/bodhika/gita-scene.jpg';
import ramayanaScene from '@/assets/bodhika/ramayana-scene.jpg';
import mahabharataScene from '@/assets/bodhika/mahabharata-scene.jpg';
import omDivine from '@/assets/bodhika/om-divine.jpg';
import vedasTexts from '@/assets/bodhika/vedas-texts.jpg';
import sanskarScene from '@/assets/bodhika/sanskar-scene.jpg';
import mantrasScene from '@/assets/bodhika/mantras-scene.jpg';
import onlineLearning from '@/assets/bodhika/online-learning.jpg';
import videoThumbnail from '@/assets/bodhika/video-thumbnail.jpg';

// Import components
import { HeroCarousel } from '@/components/bodhika/HeroCarousel';
import { SacredTextCard } from '@/components/bodhika/SacredTextCard';
import { CulturalDivider } from '@/components/bodhika/CulturalDivider';
import { LearningOutcomeCard } from '@/components/bodhika/LearningOutcomeCard';
import { TestimonialCard } from '@/components/bodhika/TestimonialCard';

// Scroll helper
const scrollToPricing = () => {
  document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroGurukul} 
          alt="Children learning in traditional Gurukul setting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon/95 via-maroon/80 to-transparent" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 opacity-10">
          <img src={omDivine} alt="" className="w-full h-full object-contain rounded-full" />
        </div>
        <div className="absolute bottom-40 left-10 w-20 h-20 opacity-15">
          <Sun className="w-full h-full text-saffron" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 animate-fade-in">
            <Badge className="bg-saffron/20 text-white border-saffron/30 backdrop-blur-sm px-4 py-2 text-sm font-body">
              1-Year Live Online Program for Kids & Teens
            </Badge>
            
            <div className="border-l-4 border-saffron pl-6">
              <p className="text-cream/90 font-body text-lg mb-2 tracking-wide">
                A Transformational Journey in Sanatan Dharma
              </p>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
                Bodhika
              </h1>
            </div>
            
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-cream">
              Root Your Child in Sanatan Dharma
            </h2>
            
            <p className="font-body text-lg md:text-xl text-cream/85 max-w-xl leading-relaxed">
              Live online classes with recordings • Values • Culture • Sanskrit
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-saffron text-white hover:bg-saffron/90 font-semibold px-8 py-6 text-lg shadow-lg"
                onClick={scrollToPricing}
              >
                Enroll My Child Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-cream text-cream hover:bg-cream/10 font-semibold px-8 py-6 text-lg"
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
                <div key={idx} className="flex items-center gap-2 text-cream/90">
                  <div className="w-10 h-10 rounded-full bg-saffron/20 flex items-center justify-center backdrop-blur-sm">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="font-body text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right - Hero Carousel */}
          <div className="relative hidden lg:block">
            <HeroCarousel />
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
    <section className="py-8 bg-maroon">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-cream">
              <div className="w-12 h-12 rounded-full bg-saffron/20 flex items-center justify-center">
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
          <Badge className="bg-saffron/10 text-saffron border-saffron/20 mb-4">About the Course</Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground lotus-underline inline-block">
            What is Bodhika?
          </h2>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="relative">
              <img 
                src={mantrasScene} 
                alt="Children chanting mantras"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-saffron text-white p-4 rounded-xl shadow-lg">
                <Sparkles className="h-8 w-8" />
              </div>
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              <p className="font-body text-lg md:text-xl text-foreground leading-relaxed">
                <span className="font-semibold text-maroon">Bodhika</span> is a structured, child-friendly Sanatan Dharma learning journey that builds <span className="text-saffron font-semibold">character, clarity, culture, and confidence</span> through live guidance and timeless wisdom.
              </p>
              <p className="font-body text-muted-foreground">
                Give your child the true essence of our ancient traditions in a modern, engaging format that they will love.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: "1000+", label: "Students" },
                  { number: "50+", label: "Live Sessions" },
                  { number: "12", label: "Months" },
                  { number: "100%", label: "Recorded" },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-cream/50 rounded-xl p-4 text-center">
                    <div className="font-heading text-2xl font-bold text-maroon">{stat.number}</div>
                    <div className="font-body text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Video Section Component  
const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-maroon via-maroon to-maroon-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-saffron/20 text-saffron border-saffron/30 mb-4">Watch & Learn</Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Discover the Bodhika Journey
          </h2>
          <p className="font-body text-lg text-cream/80 max-w-2xl mx-auto">
            See how our live classes transform children's understanding of Sanatan Dharma
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            {!isPlaying ? (
              <>
                <img 
                  src={videoThumbnail} 
                  alt="Course Introduction Video"
                  className="w-full aspect-video object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                
                {/* Play Button */}
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative">
                    {/* Pulse Animation */}
                    <div className="absolute inset-0 bg-saffron rounded-full animate-ping opacity-25" />
                    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-saffron rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </button>

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  10:30
                </div>
              </>
            ) : (
              <div className="aspect-video bg-black flex items-center justify-center relative">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Bodhika Course Introduction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            )}
          </div>

          {/* Video Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { icon: "🎯", text: "Course Overview" },
              { icon: "👨‍🏫", text: "Meet Teachers" },
              { icon: "📚", text: "Curriculum Peek" },
              { icon: "🌟", text: "Student Stories" }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Sacred Texts & Wisdom Section
const SacredTextsSection = () => {
  const sacredTexts = [
    {
      image: ramayanaScene,
      title: "Ramayana",
      subtitle: "Epic of Dharma",
      description: "Learn about Lord Rama's journey, dharma, family values, and the triumph of good over evil."
    },
    {
      image: mahabharataScene,
      title: "Mahabharata",
      subtitle: "Epic of Wisdom",
      description: "Explore the epic tales of Pandavas, Krishna's wisdom, and lessons on duty and righteousness."
    },
    {
      image: gitaScene,
      title: "Bhagavad Gita",
      subtitle: "Song of the Divine",
      description: "Understand Krishna's timeless teachings on life, karma, dharma, and spiritual wisdom."
    },
    {
      image: omDivine,
      title: "Does God Exist?",
      subtitle: "Spiritual Inquiry",
      description: "Age-appropriate discussions on spirituality, faith, and understanding the divine."
    },
    {
      image: vedasTexts,
      title: "Sacred Texts",
      subtitle: "Vedic Knowledge",
      description: "Introduction to Vedas, Upanishads, Puranas, and other sacred scriptures."
    },
    {
      image: sanskarScene,
      title: "16 Sanskars",
      subtitle: "Life Ceremonies",
      description: "Learning the purpose, values, and relevance of the 16 Sanskars in shaping life."
    },
  ];
  
  return (
    <section className="py-20 bg-gradient-to-b from-background to-cream/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-maroon/10 text-maroon border-maroon/20 mb-4">
            Sacred Wisdom
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Explore Timeless Scriptures & Values
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Your child will explore the great epics, sacred texts, and timeless values that form the foundation of Sanatan Dharma
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sacredTexts.map((item, idx) => (
            <SacredTextCard 
              key={idx}
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
            />
          ))}
        </div>
        
        <CulturalDivider variant="om" className="mt-16" />
        
        {/* Visual Quote */}
        <div className="max-w-3xl mx-auto mt-8">
          <Card className="border-0 shadow-elevated bg-gradient-to-br from-saffron/5 to-maroon/5 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <img src={omDivine} alt="" className="w-full h-full object-cover" />
            </div>
            <CardContent className="p-8 md:p-10 text-center relative z-10">
              <Quote className="h-10 w-10 text-saffron/40 mx-auto mb-4" />
              <p className="font-heading text-xl md:text-2xl text-foreground italic mb-4">
                "धर्मो रक्षति रक्षितः"
              </p>
              <p className="font-body text-muted-foreground">
                Dharma protects those who protect it — This ancient wisdom guides our entire curriculum
              </p>
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
      image: vedasTexts,
      title: "Deep Teaching of Sanatan Dharma",
      description: "Clear, age-appropriate and in-depth understanding of Sanatan Dharma—its philosophy, principles, duties, and way of life."
    },
    {
      icon: Globe,
      image: heroCulture,
      title: "Indian Culture & Traditions",
      description: "Deep understanding of Indian culture, festivals, rituals, and traditions with meaning, relevance, and cultural pride."
    },
    {
      icon: Award,
      image: sanskarScene,
      title: "16 Sanskars (Shodasha Samskāra)",
      description: "Learning the purpose, values, and relevance of the 16 Sanskars and how they shape a balanced and disciplined life."
    },
    {
      icon: Music,
      image: mantrasScene,
      title: "Mantras & Shlokas",
      description: "Learning important mantras and shlokas with correct pronunciation, meaning, and daily-life application."
    },
    {
      icon: Heart,
      image: ramayanaScene,
      title: "Moral Values & Character Building",
      description: "Strong moral foundation including truth, discipline, compassion, respect, responsibility, and ethical living."
    },
    {
      icon: Feather,
      image: mahabharataScene,
      title: "Story-Based Wisdom",
      description: "Powerful stories that teach life lessons, emotional intelligence, courage, and right decision-making."
    },
    {
      icon: Mic,
      image: heroSanskrit,
      title: "Spoken Sanskrit",
      description: "Ability to speak basic Sanskrit confidently using daily-use words, sentences, and simple conversations."
    },
    {
      icon: Brain,
      image: heroMeditation,
      title: "Mindfulness & Inner Strength",
      description: "Practices that develop focus, calmness, emotional balance, self-awareness, and confidence."
    },
  ];
  
  return (
    <section className="py-20 bg-hero-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-saffron/10 text-saffron border-saffron/20 mb-4">
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
            <LearningOutcomeCard 
              key={idx}
              icon={item.icon}
              image={item.image}
              title={item.title}
              description={item.description}
              index={idx}
            />
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
            <Badge className="bg-saffron/10 text-saffron border-saffron/20 mb-4">Learning Experience</Badge>
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
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-cream/50 hover:bg-cream transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-saffron to-maroon flex items-center justify-center shrink-0">
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
            <img 
              src={onlineLearning} 
              alt="Children learning online"
              className="w-full rounded-2xl shadow-2xl"
            />
            
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
            
            {/* Stats Card */}
            <div className="absolute -top-4 -right-4 bg-saffron text-white rounded-2xl p-4 shadow-lg">
              <div className="text-center">
                <div className="font-heading text-2xl font-bold">2x</div>
                <div className="font-body text-xs">Weekly Live</div>
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
    <section className="py-20 bg-gradient-to-br from-maroon to-maroon-dark text-white overflow-hidden relative">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <img src={heroSanskrit} alt="" className="w-full h-full object-cover" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-saffron/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <Mic className="h-5 w-5" />
            <span className="font-body">Special Focus</span>
          </div>
          
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            संस्कृतभाषणम्
          </h2>
          <h3 className="font-heading text-2xl md:text-3xl font-semibold mb-8 text-cream">
            Spoken Sanskrit
          </h3>
          
          <p className="font-body text-lg md:text-xl text-cream/80 mb-12 max-w-2xl mx-auto">
            Your child will learn to speak Sanskrit naturally and confidently, connecting with our ancient language in daily life.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Lightbulb, title: "Natural Speaking Method", desc: "Learn through conversation, not just grammar" },
              { icon: Star, title: "Confidence-Based Learning", desc: "Build speaking confidence step by step" },
              { icon: Target, title: "Daily Sanskrit Usage", desc: "Practical phrases for everyday use" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-saffron flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h4 className="font-heading text-lg font-semibold mb-2">{item.title}</h4>
                <p className="font-body text-sm text-cream/70">{item.desc}</p>
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
    { title: "Foundations of Dharma", icon: BookOpen, description: "Understanding the core principles", image: vedasTexts },
    { title: "Culture & Sanskars", icon: Globe, description: "16 Sanskars and traditions", image: sanskarScene },
    { title: "Mantras & Shlokas", icon: Music, description: "Sacred chants with meaning", image: mantrasScene },
    { title: "Sanskrit Speaking", icon: Mic, description: "Conversational Sanskrit", image: heroSanskrit },
    { title: "Life Wisdom & Values", icon: Heart, description: "Stories and moral teachings", image: gitaScene },
  ];
  
  return (
    <section className="py-20 bg-hero-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-saffron/10 text-saffron border-saffron/20 mb-4">Course Modules</Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Course Structure
          </h2>
        </div>
        
        {/* Module Cards */}
        <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {modules.map((module, idx) => (
            <div key={idx} className="group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="h-32 overflow-hidden relative">
                  <img 
                    src={module.image} 
                    alt={module.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon/80 to-transparent" />
                  <div className="absolute bottom-2 left-2 w-8 h-8 bg-saffron rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{idx + 1}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-saffron to-maroon flex items-center justify-center mb-3">
                    <module.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-heading text-sm font-semibold text-foreground mb-1">{module.title}</h3>
                  <p className="font-body text-xs text-muted-foreground">{module.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const PricingSection = () => {
  return (
    <section id="pricing-section" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-saffron/10 text-saffron border-saffron/20 mb-4">
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
          <Card className="border-2 border-border shadow-card hover-lift overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <img src={heroGurukul} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="bg-cream/50 p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-saffron/10 text-saffron">Group Batch</Badge>
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-body text-muted-foreground">50-60 students per batch</p>
            </div>
            <CardContent className="p-6 relative z-10">
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
              
              <Button className="w-full bg-saffron hover:bg-saffron/90 text-white">
                Enroll in Group Batch
              </Button>
            </CardContent>
          </Card>
          
          {/* Focused Batch */}
          <Card className="border-2 border-saffron shadow-elevated hover-lift overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <img src={mantrasScene} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-4 right-4 z-20">
              <Badge className="bg-saffron text-white border-0">Recommended</Badge>
            </div>
            <div className="bg-gradient-to-r from-saffron to-maroon p-6 text-white relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-white/20 text-white border-white/30">Focused Batch</Badge>
                <GraduationCap className="h-6 w-6" />
              </div>
              <p className="font-body text-white/90">12 students per batch</p>
            </div>
            <CardContent className="p-6 relative z-10">
              <div className="mb-6">
                <span className="font-heading text-4xl font-bold text-foreground">₹13,000</span>
                <span className="font-body text-muted-foreground">/year</span>
              </div>
              
              <ul className="space-y-3 mb-6">
                {[
                  "Personalized attention",
                  "Small group learning",
                  "Deeper discussions",
                  "Individual progress tracking",
                  "Full class recordings",
                  "Priority doubt resolution",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-saffron shrink-0" />
                    <span className="font-body text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="w-full bg-maroon hover:bg-maroon/90 text-white">
                Enroll in Focused Batch
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

// Trust Section
const TrustSection = () => {
  const trustPoints = [
    { icon: GraduationCap, title: "Educator-Designed Curriculum", desc: "Created by experienced educators in Vedic studies" },
    { icon: Shield, title: "Child-Safe Environment", desc: "Secure and monitored learning space" },
    { icon: Heart, title: "Value-Based Education", desc: "Focus on character and moral development" },
    { icon: Target, title: "Long-Term Character Growth", desc: "Building foundations that last a lifetime" },
  ];
  
  return (
    <section className="py-20 bg-cream/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-maroon/10 text-maroon border-maroon/20 mb-4">Why Parents Trust Us</Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Built for Your Child's Growth
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((item, idx) => (
            <Card key={idx} className="border-0 shadow-card hover-lift bg-white group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-saffron/20 to-maroon/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="h-8 w-8 text-maroon" />
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
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      quote: "My daughter now wakes up excited for her Bodhika classes. She's learning Sanskrit and loves sharing stories from Ramayana at dinner time!"
    },
    {
      name: "Rajesh Kumar",
      location: "Bangalore, Karnataka",
      quote: "The way they teach complex concepts in simple, engaging ways is remarkable. My son's understanding of our culture has deepened beautifully."
    },
    {
      name: "Sunita Patel",
      location: "Ahmedabad, Gujarat",
      quote: "Finally, a program that gives my children roots in Sanatan Dharma while being modern and engaging. The recordings are a blessing!"
    },
  ];
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-saffron/10 text-saffron border-saffron/20 mb-4">Parent Testimonials</Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            What Parents Say
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((item, idx) => (
            <TestimonialCard 
              key={idx}
              name={item.name}
              location={item.location}
              quote={item.quote}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Final CTA Section
const FinalCTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroGurukul} 
          alt="Children learning"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon/95 to-maroon/80" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Give Your Child Roots Before Wings
        </h2>
        <p className="font-body text-lg md:text-xl text-cream/80 mb-8 max-w-2xl mx-auto">
          Enroll now and give your child the gift of timeless wisdom, strong values, and cultural pride
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-saffron hover:bg-saffron/90 text-white font-semibold px-10 py-6 text-lg shadow-lg"
            onClick={scrollToPricing}
          >
            Enroll My Child Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-cream text-cream hover:bg-cream/10 font-semibold px-10 py-6 text-lg"
          >
            <Phone className="mr-2 h-5 w-5" />
            Talk to Us
          </Button>
        </div>
        
        <p className="font-body text-cream/70 mt-6">
          Live Classes + Recordings Included • Limited Seats
        </p>
      </div>
    </section>
  );
};

// Sticky Enroll Button
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-up">
      <Button
        size="lg"
        className="bg-saffron hover:bg-saffron/90 text-white font-semibold px-8 py-4 rounded-full shadow-2xl"
        onClick={scrollToPricing}
      >
        <Flame className="mr-2 h-5 w-5" />
        Enroll Now
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};

// Main Page Component
const BodhikaLanding = () => {
  return (
    <Layout>
      <Helmet>
        <title>Bodhika - Sanatan Dharma Course for Children | Shastrakulam</title>
        <meta name="description" content="Bodhika is a 1-year live online program teaching Sanatan Dharma, Sanskrit, moral values, and Indian culture to children through engaging classes and stories." />
        <meta name="keywords" content="Sanatan Dharma course, children education, Sanskrit learning, Indian culture, Vedic education, online learning, Ramayana, Mahabharata, Bhagavad Gita" />
      </Helmet>
      
      <HeroSection />
      <HighlightStrip />
      <AboutSection />
      <VideoSection />
      <SacredTextsSection />
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
  );
};

export default BodhikaLanding;
