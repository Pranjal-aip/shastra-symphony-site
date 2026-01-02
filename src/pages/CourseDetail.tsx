import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, BookOpen, Star, ShoppingCart, Check } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAdmin } from '@/contexts/AdminContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Loader2 } from 'lucide-react';
import CourseEnrollmentForm from '@/components/CourseEnrollmentForm';
import { toast } from '@/hooks/use-toast';

const CourseDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getCourseBySlug, loading } = useAdmin();
  const { t } = useLanguage();
  const { addToCart, isInCart } = useCart();
  const [enrollOpen, setEnrollOpen] = useState(false);
  
  const course = getCourseBySlug(slug || '');
  const inCart = course ? isInCart(course.id) : false;

  const handleAddToCart = () => {
    if (course) {
      addToCart(course);
      toast({
        title: "Added to cart",
        description: `${t(course.title)} has been added to your cart.`,
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-8">The course you're looking for doesn't exist.</p>
          <Link to="/courses">
            <Button variant="saffron">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Kids': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Teens': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Adults': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Gurukul': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <Layout>
      <SEO 
        title={{
          en: course.title.en,
          hi: course.title.hi || course.title.en,
          sa: course.title.sa || course.title.en
        }}
        description={{
          en: course.shortDescription.en || '',
          hi: course.shortDescription.hi || course.shortDescription.en || '',
          sa: course.shortDescription.sa || course.shortDescription.en || ''
        }}
        image={course.thumbnail || ''}
        url={`/courses/${slug}`}
        type="product"
        keywords={`${course.category}, ${course.level}, Sanskrit course, Vedic education, Shastrakulam`}
      />
      {/* Hero Section */}
      <section className="py-12 bg-hero-pattern">
        <div className="container mx-auto px-4">
          <Link to="/courses" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={course.thumbnail}
                alt={t(course.title)}
                className="w-full h-auto aspect-video object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                {course.isPopular && (
                  <Badge className="bg-accent text-accent-foreground">
                    <Star className="mr-1 h-3 w-3" />
                    Popular
                  </Badge>
                )}
              </div>

              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                {t(course.title)}
              </h1>

              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                {t(course.shortDescription)}
              </p>

              <div className="flex flex-wrap gap-6 py-4 border-y border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span className="font-body">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  <span className="font-body">{course.level}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="h-5 w-5" />
                  <span className="font-body">{course.category}</span>
                </div>
              </div>

              {course.price && (
                <div className="space-y-4">
                  <p className="font-heading text-3xl font-bold text-primary">{course.price}</p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4">
                <Button variant="saffron" size="lg" onClick={() => setEnrollOpen(true)}>
                  Enroll Now
                </Button>
                <Button 
                  variant={inCart ? "secondary" : "outline"} 
                  size="lg" 
                  onClick={handleAddToCart}
                  disabled={inCart}
                >
                  {inCart ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <a href="https://wa.me/919674916567" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg">
                    Inquire via WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      {course.fullDescription && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">About This Course</h2>
              <div className="prose prose-lg max-w-none">
                <p className="font-body text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {t(course.fullDescription)}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Enrollment Form Dialog */}
      <CourseEnrollmentForm
        courseId={course.id}
        courseName={t(course.title)}
        open={enrollOpen}
        onOpenChange={setEnrollOpen}
      />
    </Layout>
  );
};

export default CourseDetail;
