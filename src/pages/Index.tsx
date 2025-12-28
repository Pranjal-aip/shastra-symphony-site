import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Home, Sun, Users, Heart, Sparkles } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import SectionHeader from '@/components/SectionHeader';
import CourseCard from '@/components/CourseCard';
import BlogCard from '@/components/BlogCard';
import { useLanguage, translations } from '@/contexts/LanguageContext';
import { sampleCourses, sampleBlogPosts, testimonials } from '@/data/sampleData';
import heroIllustration from '@/assets/hero-illustration.jpg';

const Index: React.FC = () => {
  const { t } = useLanguage();
  const popularCourses = sampleCourses.filter((c) => c.isPopular);

  const whyUsPoints = [
    { icon: BookOpen, ...translations.whyUs.authentic },
    { icon: Users, ...translations.whyUs.childCentric },
    { icon: Sparkles, ...translations.whyUs.sanskrit },
    { icon: Sun, ...translations.whyUs.flexible },
    { icon: Home, ...translations.whyUs.homeLike },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-hero-pattern overflow-hidden">
        {/* Background lotus pattern */}
        <div className="absolute inset-0 bg-lotus-pattern opacity-50" />
        
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-up">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {t(translations.hero.headline)}
              </h1>
              <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                {t(translations.hero.subheadline)}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/courses">
                  <Button variant="hero" size="lg" className="group">
                    {t(translations.hero.exploreCourses)}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/919876543210?text=Hello! I would like to know more about Shastrakulam."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="hero-outline" size="lg">
                    {t(translations.hero.whatsappCta)}
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative rounded-3xl overflow-hidden shadow-elevated">
                <img
                  src={heroIllustration}
                  alt="Children learning with guru"
                  className="w-full h-auto"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
              </div>
              {/* Floating badge */}
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
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            title={t(translations.sections.popularCourses)}
            subtitle={t({
              en: 'Explore our most loved courses designed to ignite the love of learning in young minds.',
              hi: 'हमारे सबसे पसंदीदा पाठ्यक्रम देखें जो युवा मन में सीखने का प्यार जगाते हैं।',
              sa: 'अस्माकं प्रियतमाः पाठ्यक्रमाः अन्वेषयत ये तरुणमनसि ज्ञानप्रेमं जागरयन्ति।',
            })}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularCourses.map((course) => (
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

      {/* Programs Section */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <SectionHeader
            title={t(translations.sections.allPrograms)}
            subtitle={t({
              en: 'Choose the learning format that fits your family best.',
              hi: 'वह सीखने का प्रारूप चुनें जो आपके परिवार के लिए सबसे उपयुक्त हो।',
              sa: 'युष्माकं कुटुम्बाय उपयुक्तं शिक्षणप्रारूपं चिनुत।',
            })}
          />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                ...translations.programs.onlineCourses,
                link: '/courses',
                features: [
                  { en: 'Live & recorded classes', hi: 'लाइव और रिकॉर्डेड कक्षाएं', sa: 'प्रत्यक्षाः अभिलिखिताश्च कक्ष्याः' },
                  { en: 'Expert Acharyas', hi: 'विशेषज्ञ आचार्य', sa: 'विशेषज्ञाचार्याः' },
                  { en: 'Interactive sessions', hi: 'संवादात्मक सत्र', sa: 'संवादात्मकसत्राणि' },
                ],
              },
              {
                icon: Home,
                ...translations.programs.gurukul,
                link: '/programs',
                features: [
                  { en: 'Residential schooling', hi: 'आवासीय विद्यालय', sa: 'आवासीयविद्यालयः' },
                  { en: 'Traditional values', hi: 'पारंपरिक मूल्य', sa: 'पारम्परिकमूल्यानि' },
                  { en: 'Holistic development', hi: 'समग्र विकास', sa: 'समग्रविकासः' },
                ],
              },
              {
                icon: Sun,
                ...translations.programs.camps,
                link: '/camps',
                features: [
                  { en: 'Summer & winter camps', hi: 'ग्रीष्म और शीतकालीन शिविर', sa: 'ग्रीष्मशीतशिविराणि' },
                  { en: 'Immersive experiences', hi: 'गहन अनुभव', sa: 'गहनानुभवाः' },
                  { en: 'Cultural activities', hi: 'सांस्कृतिक गतिविधियां', sa: 'सांस्कृतिकक्रियाकलापाः' },
                ],
              },
            ].map((program, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-card hover-lift border border-border/50 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <program.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-heading text-2xl font-semibold text-card-foreground mb-3">
                  {t(program.title)}
                </h3>
                <p className="font-body text-muted-foreground mb-6">
                  {t(program.desc)}
                </p>
                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {t(feature)}
                    </li>
                  ))}
                </ul>
                <Link to={program.link}>
                  <Button variant="maroon-outline" className="w-full group/btn">
                    {t(translations.sections.knowMore)}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Shastrakulam Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            title={t(translations.sections.whyShastrakulam)}
            subtitle={t({
              en: 'What makes our approach to education unique and transformative.',
              hi: 'हमारी शिक्षा पद्धति को क्या अद्वितीय और परिवर्तनकारी बनाता है।',
              sa: 'अस्माकं शिक्षापद्धतिं किं अद्वितीयं परिवर्तनकारी च करोति।',
            })}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyUsPoints.map((point, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-card border border-border/50 hover-lift group"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <point.icon className="h-7 w-7 text-primary" />
                </div>
                <h4 className="font-heading text-lg font-semibold text-card-foreground mb-2">
                  {t(point.title)}
                </h4>
                <p className="font-body text-sm text-muted-foreground">
                  {t(point.desc)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t(translations.sections.testimonials)}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-primary-foreground/10 rounded-2xl p-8 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center font-heading font-bold text-accent-foreground">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold">{testimonial.name}</h4>
                    <p className="font-body text-sm text-primary-foreground/70">
                      {t(testimonial.role)}
                    </p>
                  </div>
                </div>
                <p className="font-body text-primary-foreground/90 leading-relaxed">
                  "{t(testimonial.content)}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            title={t(translations.sections.latestWisdom)}
            subtitle={t({
              en: 'Insights, stories, and guidance for your spiritual and educational journey.',
              hi: 'आपकी आध्यात्मिक और शैक्षिक यात्रा के लिए अंतर्दृष्टि, कहानियां और मार्गदर्शन।',
              sa: 'युष्माकं आध्यात्मिकशैक्षिकयात्रायै अन्तर्दृष्टयः कथाः मार्गदर्शनं च।',
            })}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleBlogPosts.map((post) => (
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

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-accent/10 via-background to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <Heart className="h-16 w-16 text-accent mx-auto" />
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {t({
                en: 'Begin Your Journey Today',
                hi: 'आज ही अपनी यात्रा शुरू करें',
                sa: 'अद्यैव स्वयात्रां आरभत',
              })}
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              {t({
                en: 'Join thousands of families who have chosen Shastrakulam for authentic, transformative education rooted in our timeless traditions.',
                hi: 'उन हज़ारों परिवारों से जुड़ें जिन्होंने हमारी शाश्वत परंपराओं में निहित प्रामाणिक, परिवर्तनकारी शिक्षा के लिए शास्त्रकुलम् को चुना है।',
                sa: 'तैः सहस्रैः कुटुम्बैः सह मिलत ये अस्माकं शाश्वतपरम्परासु निहितायाः प्रामाणिकपरिवर्तनकारीशिक्षायै शास्त्रकुलं चयनं कृतवन्तः।',
              })}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/courses">
                <Button variant="saffron" size="xl">
                  {t(translations.nav.enrollNow)}
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="maroon-outline" size="xl">
                  {t(translations.footer.contactUs)}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
