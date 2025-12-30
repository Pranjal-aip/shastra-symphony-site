import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  Users, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Mail,
  Sparkles,
  BookOpen,
  Award,
  GraduationCap,
  Heart,
  Globe,
  Play,
  Zap,
  Target,
  Shield,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useAdmin } from '@/contexts/AdminContext';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useReferral } from '@/hooks/useReferral';
import { Loader2 } from 'lucide-react';
import CourseEnrollmentForm from '@/components/CourseEnrollmentForm';
import { Helmet } from 'react-helmet-async';

// Landing page specific translations
const landingTranslations = {
  enrollNow: {
    en: 'Enroll Now',
    hi: 'अभी नामांकन करें',
    sa: 'अधुना नामाङ्कनं कुरुत'
  },
  registerNow: {
    en: 'Register Now',
    hi: 'अभी पंजीकरण करें',
    sa: 'अधुना पञ्जीकरणं कुरुत'
  },
  whatsappContact: {
    en: 'Contact via WhatsApp',
    hi: 'व्हाट्सएप पर संपर्क करें',
    sa: 'व्हाट्सएप्प् द्वारा सम्पर्कं कुरुत'
  },
  limitedSeats: {
    en: 'Limited Seats Available!',
    hi: 'सीमित सीटें उपलब्ध!',
    sa: 'सीमितानि स्थानानि उपलब्धानि!'
  },
  whyChoose: {
    en: 'Why Choose This Course?',
    hi: 'इस पाठ्यक्रम को क्यों चुनें?',
    sa: 'एतं पाठ्यक्रमं किमर्थं वृणीमहे?'
  },
  expertTeachers: {
    en: 'Expert Teachers',
    hi: 'विशेषज्ञ शिक्षक',
    sa: 'विशेषज्ञाः आचार्याः'
  },
  expertTeachersDesc: {
    en: 'Learn from qualified gurus with deep knowledge of Shastras',
    hi: 'शास्त्रों के गहन ज्ञान वाले योग्य गुरुओं से सीखें',
    sa: 'शास्त्राणां गहनज्ञानयुक्तेभ्यः योग्येभ्यः गुरुभ्यः शिक्षां लभन्ताम्'
  },
  flexibleLearning: {
    en: 'Flexible Learning',
    hi: 'लचीला सीखना',
    sa: 'लचीलं शिक्षणम्'
  },
  flexibleLearningDesc: {
    en: 'Study at your own pace with personalized attention',
    hi: 'व्यक्तिगत ध्यान के साथ अपनी गति से अध्ययन करें',
    sa: 'व्यक्तिगतध्यानेन स्वगत्या अध्ययनं कुर्वन्तु'
  },
  certificate: {
    en: 'Certificate',
    hi: 'प्रमाणपत्र',
    sa: 'प्रमाणपत्रम्'
  },
  certificateDesc: {
    en: 'Receive recognition for your Vedic education journey',
    hi: 'अपनी वैदिक शिक्षा यात्रा के लिए मान्यता प्राप्त करें',
    sa: 'भवतां वैदिकशिक्षायात्रायाः मान्यतां प्राप्नुवन्तु'
  },
  courseDetails: {
    en: 'Course Details',
    hi: 'पाठ्यक्रम विवरण',
    sa: 'पाठ्यक्रमविवरणम्'
  },
  duration: {
    en: 'Duration',
    hi: 'अवधि',
    sa: 'कालावधिः'
  },
  level: {
    en: 'Level',
    hi: 'स्तर',
    sa: 'स्तरः'
  },
  category: {
    en: 'Category',
    hi: 'श्रेणी',
    sa: 'वर्गः'
  },
  price: {
    en: 'Price',
    hi: 'शुल्क',
    sa: 'शुल्कम्'
  },
  aboutCourse: {
    en: 'About This Course',
    hi: 'इस पाठ्यक्रम के बारे में',
    sa: 'अस्य पाठ्यक्रमस्य विषये'
  },
  joinFamily: {
    en: 'Join the Shastrakulam Family',
    hi: 'शास्त्रकुलम परिवार से जुड़ें',
    sa: 'शास्त्रकुलम्-परिवारे सम्मिलन्तु'
  },
  joinFamilyDesc: {
    en: 'Embrace ancient wisdom. Transform your life.',
    hi: 'प्राचीन ज्ञान को अपनाएं। अपना जीवन बदलें।',
    sa: 'प्राचीनं ज्ञानम् अङ्गीकुर्वन्तु। स्वजीवनं परिवर्तयन्तु।'
  },
  footerNote: {
    en: 'Shastrakulam - Preserving & Propagating Vedic Knowledge',
    hi: 'शास्त्रकुलम - वैदिक ज्ञान का संरक्षण और प्रसार',
    sa: 'शास्त्रकुलम् - वैदिकज्ञानस्य संरक्षणं प्रचारश्च'
  },
  courseNotFound: {
    en: 'Course Not Found',
    hi: 'पाठ्यक्रम नहीं मिला',
    sa: 'पाठ्यक्रमः न प्राप्तः'
  },
  backToCourses: {
    en: 'View All Courses',
    hi: 'सभी पाठ्यक्रम देखें',
    sa: 'सर्वान् पाठ्यक्रमान् पश्यन्तु'
  },
  popular: {
    en: 'Popular',
    hi: 'लोकप्रिय',
    sa: 'लोकप्रियः'
  },
  ageGroup: {
    en: 'Age Group',
    hi: 'आयु वर्ग',
    sa: 'आयुवर्गः'
  },
  startJourney: {
    en: 'Start Your Journey',
    hi: 'अपनी यात्रा शुरू करें',
    sa: 'स्वयात्रां आरभन्तु'
  },
  whatYouLearn: {
    en: "What You'll Learn",
    hi: 'आप क्या सीखेंगे',
    sa: 'भवान् किं शिक्षिष्यते'
  },
  trustedBy: {
    en: 'Trusted by 1000+ Students',
    hi: '1000+ विद्यार्थियों द्वारा विश्वसनीय',
    sa: '1000+ छात्रैः विश्वसनीयम्'
  },
  liveClasses: {
    en: 'Live Interactive Classes',
    hi: 'लाइव इंटरैक्टिव क्लासेस',
    sa: 'जीवन्तकक्षाः'
  },
  personalizedSupport: {
    en: 'Personalized Support',
    hi: 'व्यक्तिगत सहायता',
    sa: 'व्यक्तिगतसहायता'
  },
  lifetimeAccess: {
    en: 'Lifetime Access',
    hi: 'आजीवन पहुंच',
    sa: 'आजीवनप्रवेशः'
  }
};

const CourseLanding: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getCourseBySlug, loading } = useAdmin();
  const { language, setLanguage, t } = useLanguage();
  const { getReferralCode } = useReferral();
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const course = getCourseBySlug(slug || '');
  const referralCode = getReferralCode();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const languageOptions: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'sa', label: 'संस्कृत', flag: '🕉️' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-accent/10 to-background">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-primary/30 rounded-full animate-ping absolute inset-0" />
            <Loader2 className="h-20 w-20 animate-spin text-primary relative z-10" />
          </div>
          <p className="mt-6 text-lg font-medium text-muted-foreground animate-pulse">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <BookOpen className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
            {t(landingTranslations.courseNotFound)}
          </h1>
          <p className="text-muted-foreground mb-8">The course you're looking for doesn't exist or has been removed.</p>
          <Link to="/courses">
            <Button variant="saffron" size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-all">
              <ArrowRight className="h-5 w-5" />
              {t(landingTranslations.backToCourses)}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getAgeRange = () => {
    if (course.ageMin && course.ageMax) {
      return `${course.ageMin} - ${course.ageMax} years`;
    } else if (course.ageMin) {
      return `${course.ageMin}+ years`;
    } else if (course.ageMax) {
      return `Up to ${course.ageMax} years`;
    }
    return null;
  };

  const benefits = [
    {
      icon: GraduationCap,
      title: landingTranslations.expertTeachers,
      description: landingTranslations.expertTeachersDesc,
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Heart,
      title: landingTranslations.flexibleLearning,
      description: landingTranslations.flexibleLearningDesc,
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Award,
      title: landingTranslations.certificate,
      description: landingTranslations.certificateDesc,
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  const features = [
    { icon: Play, text: landingTranslations.liveClasses },
    { icon: Target, text: landingTranslations.personalizedSupport },
    { icon: Shield, text: landingTranslations.lifetimeAccess },
  ];

  return (
    <>
      <Helmet>
        <title>{t(course.title)} | Shastrakulam</title>
        <meta name="description" content={t(course.shortDescription)} />
        <meta property="og:title" content={`${t(course.title)} | Shastrakulam`} />
        <meta property="og:description" content={t(course.shortDescription)} />
        <meta property="og:image" content={course.thumbnail} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Language Switcher - Floating */}
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-card/95 backdrop-blur-md rounded-full px-4 py-2 shadow-2xl border border-border/50">
          <Globe className="h-4 w-4 text-primary" />
          {languageOptions.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                language === lang.code
                  ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg scale-105'
                  : 'hover:bg-muted hover:scale-105'
              }`}
            >
              {lang.flag}
            </button>
          ))}
        </div>

        {/* Hero Section - Stunning Visual Impact */}
        <section className="relative min-h-screen flex items-center pt-20 pb-16 md:pt-24 md:pb-24">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left - Content */}
              <div className={`order-2 lg:order-1 space-y-8 text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Trust Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium">
                  <CheckCircle2 className="h-4 w-4" />
                  {t(landingTranslations.trustedBy)}
                </div>

                {/* Badges Row */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  {course.isPopular && (
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white gap-1.5 px-4 py-1.5 text-sm shadow-lg animate-pulse">
                      <Star className="h-4 w-4 fill-current" />
                      {t(landingTranslations.popular)}
                    </Badge>
                  )}
                  <Badge variant="secondary" className="px-4 py-1.5 text-sm bg-primary/10 text-primary border-primary/20">
                    {course.category}
                  </Badge>
                  <Badge variant="outline" className="px-4 py-1.5 text-sm">
                    {course.level}
                  </Badge>
                </div>

                {/* Title with Gradient */}
                <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                    {t(course.title)}
                  </span>
                </h1>

                {/* Description */}
                <p className="font-body text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {t(course.shortDescription)}
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 shadow-sm">
                      <feature.icon className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">{t(feature.text)}</span>
                    </div>
                  ))}
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
                  {course.duration && (
                    <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border/50 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                      <Clock className="h-6 w-6 text-primary mb-2" />
                      <p className="text-xs text-muted-foreground">{t(landingTranslations.duration)}</p>
                      <p className="font-bold text-foreground">{course.duration}</p>
                    </div>
                  )}
                  <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border/50 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <Users className="h-6 w-6 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">{t(landingTranslations.level)}</p>
                    <p className="font-bold text-foreground">{course.level}</p>
                  </div>
                  {getAgeRange() && (
                    <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border/50 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                      <Sparkles className="h-6 w-6 text-primary mb-2" />
                      <p className="text-xs text-muted-foreground">{t(landingTranslations.ageGroup)}</p>
                      <p className="font-bold text-foreground">{getAgeRange()}</p>
                    </div>
                  )}
                  <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border/50 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <Calendar className="h-6 w-6 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">{t(landingTranslations.category)}</p>
                    <p className="font-bold text-foreground">{course.category}</p>
                  </div>
                </div>

                {/* Price Tag */}
                {course.price && (
                  <div className="flex items-center justify-center lg:justify-start gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-lg opacity-50" />
                      <div className="relative bg-gradient-to-r from-primary to-accent text-primary-foreground px-8 py-4 rounded-2xl shadow-2xl">
                        <p className="text-sm opacity-80">{t(landingTranslations.price)}</p>
                        <span className="font-heading text-4xl md:text-5xl font-bold">
                          {course.price}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Limited Seats - Urgency */}
                <div className="relative inline-flex items-center gap-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 text-red-600 dark:text-red-400 px-6 py-3 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 animate-pulse" />
                  <Zap className="h-5 w-5 animate-bounce relative z-10" />
                  <span className="font-bold text-lg relative z-10">{t(landingTranslations.limitedSeats)}</span>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                  <Button 
                    variant="saffron" 
                    size="lg" 
                    className="text-lg px-10 py-7 shadow-2xl hover:shadow-primary/25 transition-all group relative overflow-hidden"
                    onClick={() => setEnrollOpen(true)}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative flex items-center gap-2">
                      {t(landingTranslations.enrollNow)}
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </Button>
                  <a href="https://wa.me/919674916567" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg" className="text-lg px-10 py-7 w-full gap-3 border-2 hover:bg-primary/5">
                      <Phone className="h-5 w-5" />
                      {t(landingTranslations.whatsappContact)}
                    </Button>
                  </a>
                </div>
              </div>

              {/* Right - Image with Effects */}
              <div className={`order-1 lg:order-2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <div className="relative mx-auto max-w-lg lg:max-w-none">
                  {/* Decorative rings */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 rounded-[2rem] blur-2xl animate-pulse" />
                  <div className="absolute -inset-2 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-[2rem] animate-pulse" style={{ animationDelay: '500ms' }} />
                  
                  {/* Main Image Container */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 dark:border-white/10">
                    <img
                      src={course.thumbnail}
                      alt={t(course.title)}
                      className="w-full aspect-[4/3] object-cover transform hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    {/* Play button overlay (decorative) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl">
                        <Play className="h-8 w-8 text-primary ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Floating badges */}
                  {referralCode && (
                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-accent to-primary text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-2xl animate-bounce">
                      🎁 Referral: {referralCode}
                    </div>
                  )}
                  
                  {course.isPopular && (
                    <div className="absolute -top-4 -left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-2xl flex items-center gap-2">
                      <Star className="h-4 w-4 fill-current" />
                      Bestseller
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* Why Choose Section - Card Grid */}
        <section className="py-20 md:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
                ✨ Benefits
              </Badge>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t(landingTranslations.whyChoose)}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the best Vedic education with our carefully designed curriculum
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card 
                  key={index} 
                  className={`group border-none shadow-xl hover:shadow-2xl transition-all duration-500 bg-card overflow-hidden hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <CardContent className="pt-8 pb-8 px-8 text-center relative">
                    {/* Background gradient on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <benefit.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                      {t(benefit.title)}
                    </h3>
                    <p className="font-body text-muted-foreground text-lg leading-relaxed">
                      {t(benefit.description)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Course Details Section - Modern Layout */}
        {course.fullDescription && (
          <section className="py-20 md:py-32 bg-background relative">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 px-4 py-1.5">
                    📚 Course Overview
                  </Badge>
                  <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                    {t(landingTranslations.aboutCourse)}
                  </h2>
                </div>
                
                <div className="bg-gradient-to-br from-card via-card to-muted/30 rounded-3xl p-8 md:p-12 shadow-2xl border border-border/50 relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl" />
                  
                  <div className="relative z-10">
                    <div className="prose prose-lg max-w-none">
                      <p className="font-body text-muted-foreground leading-relaxed whitespace-pre-wrap text-lg md:text-xl">
                        {t(course.fullDescription)}
                      </p>
                    </div>

                    {/* Course Quick Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-border/50">
                      {course.duration && (
                        <div className="group text-center p-6 bg-gradient-to-br from-background to-muted/50 rounded-2xl border border-border/50 hover:shadow-lg transition-all hover:-translate-y-1">
                          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <Clock className="h-7 w-7 text-primary" />
                          </div>
                          <p className="font-body text-sm text-muted-foreground mb-1">{t(landingTranslations.duration)}</p>
                          <p className="font-heading text-xl font-bold text-foreground">{course.duration}</p>
                        </div>
                      )}
                      <div className="group text-center p-6 bg-gradient-to-br from-background to-muted/50 rounded-2xl border border-border/50 hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                          <Users className="h-7 w-7 text-accent" />
                        </div>
                        <p className="font-body text-sm text-muted-foreground mb-1">{t(landingTranslations.level)}</p>
                        <p className="font-heading text-xl font-bold text-foreground">{course.level}</p>
                      </div>
                      <div className="group text-center p-6 bg-gradient-to-br from-background to-muted/50 rounded-2xl border border-border/50 hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                          <BookOpen className="h-7 w-7 text-orange-500" />
                        </div>
                        <p className="font-body text-sm text-muted-foreground mb-1">{t(landingTranslations.category)}</p>
                        <p className="font-heading text-xl font-bold text-foreground">{course.category}</p>
                      </div>
                      {course.price && (
                        <div className="group text-center p-6 bg-gradient-to-br from-background to-muted/50 rounded-2xl border border-border/50 hover:shadow-lg transition-all hover:-translate-y-1">
                          <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <Award className="h-7 w-7 text-green-500" />
                          </div>
                          <p className="font-body text-sm text-muted-foreground mb-1">{t(landingTranslations.price)}</p>
                          <p className="font-heading text-xl font-bold text-foreground">{course.price}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Final CTA Section - High Impact */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMTZjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
                <Sparkles className="h-4 w-4" />
                Start Learning Today
              </div>
              
              <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6">
                {t(landingTranslations.joinFamily)}
              </h2>
              <p className="font-body text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
                {t(landingTranslations.joinFamilyDesc)}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 text-xl px-12 py-8 shadow-2xl hover:shadow-white/25 transition-all group"
                  onClick={() => setEnrollOpen(true)}
                >
                  {t(landingTranslations.startJourney)}
                  <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
                <a href="https://wa.me/919674916567" target="_blank" rel="noopener noreferrer">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-2 border-white text-white hover:bg-white/10 text-xl px-12 py-8 w-full"
                  >
                    <Phone className="mr-2 h-6 w-6" />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-card border-t border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="font-heading text-xl font-bold text-foreground mb-2">
                  {t(landingTranslations.footerNote)}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 text-muted-foreground">
                  <a href="mailto:info@shastrakulam.org" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Mail className="h-4 w-4" />
                    info@shastrakulam.org
                  </a>
                  <a href="tel:+919674916567" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Phone className="h-4 w-4" />
                    +91 96749 16567
                  </a>
                </div>
              </div>
              <Link to="/" className="group">
                <Button variant="outline" className="gap-2">
                  Visit Main Website
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </footer>
      </div>

      {/* Enrollment Form Modal */}
      {course && (
        <CourseEnrollmentForm
          open={enrollOpen}
          onOpenChange={setEnrollOpen}
          courseId={course.id}
          courseName={t(course.title)}
        />
      )}
    </>
  );
};

export default CourseLanding;