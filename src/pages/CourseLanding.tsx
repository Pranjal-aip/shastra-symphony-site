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
  Globe
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
  }
};

const CourseLanding: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getCourseBySlug, loading } = useAdmin();
  const { language, setLanguage, t } = useLanguage();
  const { getReferralCode } = useReferral();
  const [enrollOpen, setEnrollOpen] = useState(false);
  
  const course = getCourseBySlug(slug || '');
  const referralCode = getReferralCode();

  // Track that this is a landing page visit
  useEffect(() => {
    // Referral tracking is handled by useReferral hook automatically
  }, []);

  const languageOptions: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'sa', label: 'संस्कृत', flag: '🕉️' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4">
        <div className="text-center max-w-md">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
            {t(landingTranslations.courseNotFound)}
          </h1>
          <Link to="/courses">
            <Button variant="saffron" size="lg" className="gap-2">
              <ArrowRight className="h-4 w-4" />
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
    },
    {
      icon: Heart,
      title: landingTranslations.flexibleLearning,
      description: landingTranslations.flexibleLearningDesc,
    },
    {
      icon: Award,
      title: landingTranslations.certificate,
      description: landingTranslations.certificateDesc,
    },
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

      <div className="min-h-screen bg-background">
        {/* Language Switcher - Top Right */}
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg border border-border">
          <Globe className="h-4 w-4 text-muted-foreground" />
          {languageOptions.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-2 py-1 rounded-full text-sm transition-all ${
                language === lang.code
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              {lang.flag}
            </button>
          ))}
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-background pt-8 pb-16 md:pt-12 md:pb-24">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left - Content */}
              <div className="order-2 lg:order-1 space-y-6 text-center lg:text-left">
                {/* Badges */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                  {course.isPopular && (
                    <Badge className="bg-accent text-accent-foreground gap-1 animate-pulse">
                      <Star className="h-3 w-3 fill-current" />
                      {t(landingTranslations.popular)}
                    </Badge>
                  )}
                  <Badge variant="secondary">{course.category}</Badge>
                  <Badge variant="outline">{course.level}</Badge>
                </div>

                {/* Title */}
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  {t(course.title)}
                </h1>

                {/* Description */}
                <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {t(course.shortDescription)}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 py-4">
                  {course.duration && (
                    <div className="flex items-center gap-2 text-foreground">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="font-body font-medium">{course.duration}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-foreground">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="font-body font-medium">{course.level}</span>
                  </div>
                  {getAgeRange() && (
                    <div className="flex items-center gap-2 text-foreground">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <span className="font-body font-medium">{getAgeRange()}</span>
                    </div>
                  )}
                </div>

                {/* Price */}
                {course.price && (
                  <div className="py-4">
                    <span className="font-heading text-4xl md:text-5xl font-bold text-primary">
                      {course.price}
                    </span>
                  </div>
                )}

                {/* Limited Seats Badge */}
                <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span className="font-body font-semibold">{t(landingTranslations.limitedSeats)}</span>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                  <Button 
                    variant="saffron" 
                    size="lg" 
                    className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all group"
                    onClick={() => setEnrollOpen(true)}
                  >
                    {t(landingTranslations.enrollNow)}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <a href="https://wa.me/919674916567" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg" className="text-lg px-8 py-6 w-full gap-2">
                      <Phone className="h-5 w-5" />
                      {t(landingTranslations.whatsappContact)}
                    </Button>
                  </a>
                </div>
              </div>

              {/* Right - Image */}
              <div className="order-1 lg:order-2">
                <div className="relative mx-auto max-w-lg lg:max-w-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl rotate-3 opacity-20" />
                  <img
                    src={course.thumbnail}
                    alt={t(course.title)}
                    className="relative rounded-3xl shadow-2xl w-full aspect-video object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  {referralCode && (
                    <div className="absolute -bottom-3 -right-3 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Referral: {referralCode}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              {t(landingTranslations.whyChoose)}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card">
                  <CardContent className="pt-8 pb-6 px-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <benefit.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                      {t(benefit.title)}
                    </h3>
                    <p className="font-body text-muted-foreground">
                      {t(benefit.description)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Course Details Section */}
        {course.fullDescription && (
          <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-foreground mb-8">
                  {t(landingTranslations.aboutCourse)}
                </h2>
                <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                  <div className="prose prose-lg max-w-none">
                    <p className="font-body text-muted-foreground leading-relaxed whitespace-pre-wrap text-lg">
                      {t(course.fullDescription)}
                    </p>
                  </div>

                  {/* Course Quick Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-border">
                    {course.duration && (
                      <div className="text-center p-4 bg-muted/50 rounded-xl">
                        <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <p className="font-body text-sm text-muted-foreground">{t(landingTranslations.duration)}</p>
                        <p className="font-heading font-bold text-foreground">{course.duration}</p>
                      </div>
                    )}
                    <div className="text-center p-4 bg-muted/50 rounded-xl">
                      <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="font-body text-sm text-muted-foreground">{t(landingTranslations.level)}</p>
                      <p className="font-heading font-bold text-foreground">{course.level}</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-xl">
                      <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="font-body text-sm text-muted-foreground">{t(landingTranslations.category)}</p>
                      <p className="font-heading font-bold text-foreground">{course.category}</p>
                    </div>
                    {course.price && (
                      <div className="text-center p-4 bg-muted/50 rounded-xl">
                        <Award className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <p className="font-body text-sm text-muted-foreground">{t(landingTranslations.price)}</p>
                        <p className="font-heading font-bold text-primary">{course.price}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Final CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              {t(landingTranslations.joinFamily)}
            </h2>
            <p className="font-body text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              {t(landingTranslations.joinFamilyDesc)}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all group"
                onClick={() => setEnrollOpen(true)}
              >
                {t(landingTranslations.registerNow)}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <a href="https://wa.me/919674916567" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-10 py-6 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 w-full gap-2"
                >
                  <Phone className="h-5 w-5" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-background border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <p className="font-body text-muted-foreground">
              {t(landingTranslations.footerNote)}
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <a href="mailto:shastrakulam@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://wa.me/919674916567" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-5 w-5" />
              </a>
            </div>
            <Link to="/" className="inline-block mt-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                Visit Shastrakulam Website
              </Button>
            </Link>
          </div>
        </footer>

        {/* Enrollment Form Dialog */}
        <CourseEnrollmentForm
          courseId={course.id}
          courseName={t(course.title)}
          open={enrollOpen}
          onOpenChange={setEnrollOpen}
        />
      </div>
    </>
  );
};

export default CourseLanding;
