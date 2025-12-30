import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Home, Sun, Users, Heart, Sparkles } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import SectionHeader from '@/components/SectionHeader';
import CourseCard from '@/components/CourseCard';
import BlogCard from '@/components/BlogCard';
import { useLanguage, translations } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { testimonials } from '@/data/sampleData';
import heroIllustration from '@/assets/hero-illustration.jpg';

const seoData = {
  title: {
    en: 'Holistic Education Based on Sanskar, Shastra & Sanskrit',
    hi: 'संस्कार, शास्त्र और संस्कृत पर आधारित समग्र शिक्षा',
    sa: 'संस्कारशास्त्रसंस्कृताधारिता समग्रशिक्षा'
  },
  description: {
    en: 'Shastrakulam offers authentic Vedic education through Sanskrit courses, full-time gurukul schooling, and immersive camps for children and seekers worldwide.',
    hi: 'शास्त्रकुलम संस्कृत पाठ्यक्रमों, पूर्णकालिक गुरुकुल शिक्षा और बच्चों और साधकों के लिए गहन शिविरों के माध्यम से प्रामाणिक वैदिक शिक्षा प्रदान करता है।',
    sa: 'शास्त्रकुलं संस्कृतपाठ्यक्रमैः पूर्णकालिकगुरुकुलशिक्षया बालानां साधकानां च कृते गहनशिविरैश्च प्रामाणिकां वैदिकशिक्षां प्रददाति।'
  }
};

const Index: React.FC = () => {
  const { t } = useLanguage();
  const { courses, blogPosts, loading } = useAdmin();
  
  const popularCourses = courses.filter((c) => c.isPopular);
  const homeCourses = courses.filter((c) => c.showOnHome);
  const homeBlogs = blogPosts.filter((b) => b.showOnHome).slice(0, 4);

  const whyUsPoints = [
    { icon: BookOpen, ...translations.whyUs.authentic },
    { icon: Users, ...translations.whyUs.childCentric },
    { icon: Sparkles, ...translations.whyUs.sanskrit },
    { icon: Sun, ...translations.whyUs.flexible },
    { icon: Home, ...translations.whyUs.homeLike },
  ];

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Shastrakulam",
    "url": "https://shastrakulam.org",
    "description": seoData.description.en,
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://shastrakulam.org/courses?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Layout>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords="Sanskrit, Vedic education, Gurukul, Sanskrit courses, Bhagavad Gita, yoga, Indian culture, Sanatan Dharma, online Sanskrit learning"
        url="/"
        structuredData={homeSchema}
      />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-hero-pattern overflow-hidden">
        <div className="absolute inset-0 bg-lotus-pattern opacity-50" />
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-up">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {t(translations.hero.headline)}
              </h1>
              <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                {t(translations.hero.subheadline)}
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://learn.shastrakulam.com/courses/Bodhika--Awakening-Young-Minds-695393a483bcbf4ec9283f27" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="hero" size="lg" className="group">
                    {t(translations.hero.exploreCourses)}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
                <a href="https://wa.me/919674916567" target="_blank" rel="noopener noreferrer">
                  <Button variant="hero-outline" size="lg">
                    {t(translations.hero.whatsappCta)}
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative rounded-3xl overflow-hidden shadow-elevated">
                <img src={heroIllustration} alt="Children learning with guru" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-6 shadow-card border border-border animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-heading text-2xl font-bold text-foreground">500+</p>
                    <p className="font-body text-sm text-muted-foreground">Happy Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      {popularCourses.length > 0 && (
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeader
              title={t(translations.sections.popularCourses)}
              subtitle={t({ en: 'Explore our most loved courses.', hi: 'हमारे सबसे पसंदीदा पाठ्यक्रम।', sa: 'अस्माकं प्रियतमाः पाठ्यक्रमाः।' })}
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {popularCourses.slice(0, 4).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/courses">
                <Button variant="maroon-outline" size="lg" className="group">
                  View All Courses
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Shastrakulam Section */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <SectionHeader
            title={t(translations.sections.whyShastrakulam)}
            subtitle={t({ en: 'What makes our approach unique.', hi: 'हमारी पद्धति को क्या अद्वितीय बनाता है।', sa: 'अस्माकं पद्धतिं किं अद्वितीयं करोति।' })}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyUsPoints.map((point, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-card border border-border/50 hover-lift group">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <point.icon className="h-7 w-7 text-primary" />
                </div>
                <h4 className="font-heading text-lg font-semibold text-card-foreground mb-2">{t(point.title)}</h4>
                <p className="font-body text-sm text-muted-foreground">{t(point.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t(translations.sections.testimonials)}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-primary-foreground/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center font-heading font-bold text-accent-foreground">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold">{testimonial.name}</h4>
                    <p className="font-body text-sm text-primary-foreground/70">{t(testimonial.role)}</p>
                  </div>
                </div>
                <p className="font-body text-primary-foreground/90 leading-relaxed">"{t(testimonial.content)}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      {homeBlogs.length > 0 && (
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeader
              title={t(translations.sections.latestWisdom)}
              subtitle={t({ en: 'Insights for your journey.', hi: 'आपकी यात्रा के लिए अंतर्दृष्टि।', sa: 'युष्माकं यात्रायै अन्तर्दृष्टयः।' })}
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {homeBlogs.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/blog">
                <Button variant="maroon-outline" size="lg" className="group">
                  View All Posts
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-accent/10 via-background to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <Heart className="h-16 w-16 text-accent mx-auto" />
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {t({ en: 'Begin Your Journey Today', hi: 'आज ही अपनी यात्रा शुरू करें', sa: 'अद्यैव स्वयात्रां आरभत' })}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/courses">
                <Button variant="saffron" size="xl">{t(translations.nav.enrollNow)}</Button>
              </Link>
              <Link to="/contact">
                <Button variant="maroon-outline" size="xl">{t(translations.footer.contactUs)}</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
