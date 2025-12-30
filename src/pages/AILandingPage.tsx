import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Check, 
  Clock, 
  Users, 
  Award, 
  BookOpen,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import CourseEnrollmentForm from '@/components/CourseEnrollmentForm';
import WhatsAppButton from '@/components/WhatsAppButton';

interface LandingPageData {
  id: string;
  course_name: string;
  slug: string;
  course_category: string;
  course_duration: string;
  course_mode: string;
  languages: string[];
  target_audience: string[];
  number_of_modules: number;
  weekly_hours: number;
  certificate_provided: boolean;
  batches: Array<{
    name: string;
    size: number;
    price: number;
    isHighlighted: boolean;
  }>;
  scholarship_available: boolean;
  limited_seats_badge: boolean;
  institution_name: string;
  instructor_name: string | null;
  years_of_experience: number | null;
  total_students_taught: number | null;
  recognitions: string | null;
  generated_content: any;
}

const AILandingPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const [pageData, setPageData] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) return;
      
      try {
        const { data, error } = await supabase
          .from('ai_landing_pages')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (error) throw error;
        if (!data) throw new Error('Page not found');
        
        setPageData(data as LandingPageData);
      } catch (err: any) {
        console.error('Error fetching page:', err);
        setError(err.message || 'Failed to load page');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  const getText = (obj: any): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    const lang = language === 'hi' ? 'hi' : language === 'sa' ? 'sa' : 'en';
    return obj[lang] || obj.en || '';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-6">The landing page you're looking for doesn't exist or has been unpublished.</p>
        <Link to="/">
          <Button>Go to Homepage</Button>
        </Link>
      </div>
    );
  }

  const content = pageData.generated_content;

  return (
    <>
      <Helmet>
        <title>{pageData.course_name} | {pageData.institution_name}</title>
        <meta name="description" content={getText(content?.hero?.subheadline)} />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        {content?.hero && (
          <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-background py-16 md:py-24 px-6">
            <div className="max-w-5xl mx-auto text-center space-y-6">
              {pageData.limited_seats_badge && (
                <Badge className="bg-destructive text-destructive-foreground animate-pulse text-sm px-4 py-1">
                  {getText(content.hero.urgencyBadge) || 'Limited Seats Available!'}
                </Badge>
              )}
              <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {getText(content.hero.headline)}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                {getText(content.hero.subheadline)}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8" onClick={() => setIsEnrollOpen(true)}>
                  {getText(content.hero.primaryCta)}
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8" asChild>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    {getText(content.hero.secondaryCta)}
                  </a>
                </Button>
              </div>
              {/* Quick Stats */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>{pageData.course_duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>{pageData.number_of_modules} Modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>{pageData.course_mode}</span>
                </div>
                {pageData.certificate_provided && (
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <span>Certificate Included</span>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Course Purpose */}
        {content?.coursePurpose && (
          <section className="py-16 px-6 bg-muted/30">
            <div className="max-w-5xl mx-auto space-y-8">
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-center">
                {getText(content.coursePurpose.title)}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-destructive/10 p-8 rounded-2xl border border-destructive/20">
                  <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">😟</span>
                  </div>
                  <h3 className="font-semibold text-lg text-destructive mb-3">The Problem</h3>
                  <p className="text-muted-foreground">{getText(content.coursePurpose.problem)}</p>
                </div>
                <div className="bg-yellow-500/10 p-8 rounded-2xl border border-yellow-500/20">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">🤔</span>
                  </div>
                  <h3 className="font-semibold text-lg text-yellow-600 mb-3">The Gap</h3>
                  <p className="text-muted-foreground">{getText(content.coursePurpose.gap)}</p>
                </div>
                <div className="bg-primary/10 p-8 rounded-2xl border border-primary/20">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="font-semibold text-lg text-primary mb-3">The Solution</h3>
                  <p className="text-muted-foreground">{getText(content.coursePurpose.solution)}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Who Should Join */}
        {content?.whoShouldJoin && (
          <section className="py-16 px-6">
            <div className="max-w-5xl mx-auto space-y-8">
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-center">
                {getText(content.whoShouldJoin.title)}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.whoShouldJoin.cards?.map((card: any, index: number) => (
                  <div key={index} className="bg-card border rounded-2xl p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-3xl">
                        {index === 0 ? '👧' : index === 1 ? '🧑' : index === 2 ? '👨‍👩‍👧' : '📚'}
                      </span>
                    </div>
                    <h3 className="font-semibold text-xl mb-2">{getText(card.audience)}</h3>
                    <p className="text-sm text-muted-foreground">{getText(card.description)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* What You Will Learn */}
        {content?.whatYouWillLearn && (
          <section className="py-16 px-6 bg-muted/30">
            <div className="max-w-5xl mx-auto space-y-8">
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-center">
                {getText(content.whatYouWillLearn.title)}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {content.whatYouWillLearn.modules?.map((module: any, index: number) => (
                  <div key={index} className="bg-card border rounded-2xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                      <h3 className="font-semibold text-lg">{getText(module.title)}</h3>
                    </div>
                    <ul className="space-y-3">
                      {module.benefits?.map((benefit: any, bIndex: number) => (
                        <li key={bIndex} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{getText(benefit)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Course Structure */}
        {content?.courseStructure && (
          <section className="py-16 px-6">
            <div className="max-w-5xl mx-auto space-y-8">
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-center">
                {getText(content.courseStructure.title)}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {content.courseStructure.duration && (
                  <div className="bg-card border rounded-xl p-5 text-center">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground mb-1">Duration</p>
                    <p className="font-semibold">{getText(content.courseStructure.duration)}</p>
                  </div>
                )}
                {content.courseStructure.weeklyFormat && (
                  <div className="bg-card border rounded-xl p-5 text-center">
                    <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground mb-1">Weekly</p>
                    <p className="font-semibold">{getText(content.courseStructure.weeklyFormat)}</p>
                  </div>
                )}
                {content.courseStructure.mode && (
                  <div className="bg-card border rounded-xl p-5 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground mb-1">Mode</p>
                    <p className="font-semibold">{getText(content.courseStructure.mode)}</p>
                  </div>
                )}
                {content.courseStructure.language && (
                  <div className="bg-card border rounded-xl p-5 text-center">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground mb-1">Language</p>
                    <p className="font-semibold">{getText(content.courseStructure.language)}</p>
                  </div>
                )}
                {content.courseStructure.certificate && (
                  <div className="bg-card border rounded-xl p-5 text-center">
                    <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground mb-1">Certificate</p>
                    <p className="font-semibold">{getText(content.courseStructure.certificate)}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Pricing */}
        {content?.pricing && pageData.batches && (
          <section className="py-16 px-6 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
            <div className="max-w-5xl mx-auto space-y-8">
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-center">
                {getText(content.pricing.title)}
              </h2>
              <div className={`grid gap-8 ${
                pageData.batches.length === 1 ? 'max-w-md mx-auto' : 
                pageData.batches.length === 2 ? 'md:grid-cols-2 max-w-2xl mx-auto' : 
                'md:grid-cols-3'
              }`}>
                {pageData.batches.map((batch, index) => (
                  <div 
                    key={index} 
                    className={`bg-card border-2 rounded-3xl p-8 text-center relative transform transition-all hover:scale-105 ${
                      batch.isHighlighted ? 'border-primary shadow-2xl' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {batch.isHighlighted && (
                      <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-6 py-1">
                        Most Popular
                      </Badge>
                    )}
                    <h3 className="font-semibold text-xl mb-4">{batch.name}</h3>
                    <p className="text-5xl font-bold text-primary mb-2">
                      ₹{batch.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">{batch.size} seats per batch</p>
                    <Button 
                      className="w-full text-lg py-6" 
                      variant={batch.isHighlighted ? 'default' : 'outline'}
                      onClick={() => {
                        setSelectedBatch(batch.name);
                        setIsEnrollOpen(true);
                      }}
                    >
                      Enroll Now
                    </Button>
                  </div>
                ))}
              </div>
              {pageData.scholarship_available && content.pricing.scholarshipNote && (
                <p className="text-center text-muted-foreground italic">
                  {getText(content.pricing.scholarshipNote)}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Why Choose Us */}
        {content?.whyChooseUs && (
          <section className="py-16 px-6">
            <div className="max-w-5xl mx-auto space-y-8">
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-center">
                {getText(content.whyChooseUs.title)}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {content.whyChooseUs.points?.map((point: any, index: number) => (
                  <div key={index} className="flex items-start gap-4 p-6 bg-card border rounded-2xl hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <Check className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{getText(point.title)}</h3>
                      <p className="text-muted-foreground">{getText(point.description)}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Trust Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {pageData.years_of_experience && (
                  <div className="text-center">
                    <p className="text-4xl font-bold text-primary">{pageData.years_of_experience}+</p>
                    <p className="text-sm text-muted-foreground">Years Experience</p>
                  </div>
                )}
                {pageData.total_students_taught && (
                  <div className="text-center">
                    <p className="text-4xl font-bold text-primary">{pageData.total_students_taught.toLocaleString()}+</p>
                    <p className="text-sm text-muted-foreground">Students Taught</p>
                  </div>
                )}
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">{pageData.number_of_modules}</p>
                  <p className="text-sm text-muted-foreground">Modules</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">{pageData.languages.length}</p>
                  <p className="text-sm text-muted-foreground">Languages</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        {content?.faqs && (
          <section className="py-16 px-6 bg-muted/30">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-center">
                {getText(content.faqs.title)}
              </h2>
              <Accordion type="single" collapsible className="space-y-3">
                {content.faqs.questions?.map((faq: any, index: number) => (
                  <AccordionItem 
                    key={index} 
                    value={`faq-${index}`}
                    className="bg-card border rounded-xl px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                      {getText(faq.question)}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {getText(faq.answer)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        )}

        {/* Final CTA */}
        {content?.finalCta && (
          <section className="py-20 px-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="font-heading text-2xl md:text-5xl font-bold">
                {getText(content.finalCta.headline)}
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                {getText(content.finalCta.paragraph)}
              </p>
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-xl px-12 py-6"
                onClick={() => setIsEnrollOpen(true)}
              >
                {getText(content.finalCta.buttonText)}
              </Button>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="py-8 px-6 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {pageData.institution_name}. All rights reserved.
          </p>
        </footer>

        {/* WhatsApp Button */}
        <WhatsAppButton />

        {/* Enrollment Form */}
        <CourseEnrollmentForm
          isOpen={isEnrollOpen}
          onClose={() => {
            setIsEnrollOpen(false);
            setSelectedBatch(null);
          }}
          course={{
            id: pageData.id,
            slug: pageData.slug,
            title: { en: pageData.course_name, hi: pageData.course_name, sa: pageData.course_name },
            shortDescription: { en: getText(content?.hero?.subheadline) || '', hi: '', sa: '' },
            thumbnail: '/placeholder.svg',
            category: pageData.course_category,
            level: 'All Ages',
            duration: pageData.course_duration,
            price: pageData.batches[0]?.price?.toString() || '',
            isPopular: false,
            showOnHome: false
          }}
        />
      </div>
    </>
  );
};

export default AILandingPage;
