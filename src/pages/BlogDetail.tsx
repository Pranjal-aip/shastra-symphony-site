import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAdmin } from '@/contexts/AdminContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2 } from 'lucide-react';

const blogDetailTranslations = {
  postNotFound: {
    en: 'Post Not Found',
    hi: 'पोस्ट नहीं मिली',
    sa: 'लेखः न प्राप्तः'
  },
  postNotFoundDesc: {
    en: "The blog post you're looking for doesn't exist.",
    hi: 'जिस ब्लॉग पोस्ट को आप खोज रहे हैं वह मौजूद नहीं है।',
    sa: 'यं ब्लॉगलेखं भवान् अन्विष्यति स विद्यते न।'
  },
  backToBlog: {
    en: 'Back to Blog',
    hi: 'ब्लॉग पर वापस',
    sa: 'ब्लॉगं प्रति प्रत्यागमनम्'
  },
  shareOnWhatsApp: {
    en: 'Share on WhatsApp',
    hi: 'व्हाट्सएप पर शेयर करें',
    sa: 'व्हाट्सएप् द्वारा साझयतु'
  },
  loading: {
    en: 'Loading...',
    hi: 'लोड हो रहा है...',
    sa: 'आह्वयति...'
  }
};

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getBlogPostBySlug, loading } = useAdmin();
  const { t, language } = useLanguage();

  const tl = (obj: { en: string; hi: string; sa: string }) => obj[language] || obj.en;
  
  const post = getBlogPostBySlug(slug || '');

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">{tl(blogDetailTranslations.postNotFound)}</h1>
          <p className="text-muted-foreground mb-8">{tl(blogDetailTranslations.postNotFoundDesc)}</p>
          <Link to="/blog">
            <Button variant="saffron">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {tl(blogDetailTranslations.backToBlog)}
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title={{
          en: post.title.en,
          hi: post.title.hi || post.title.en,
          sa: post.title.sa || post.title.en
        }}
        description={{
          en: post.excerpt.en || '',
          hi: post.excerpt.hi || post.excerpt.en || '',
          sa: post.excerpt.sa || post.excerpt.en || ''
        }}
        image={post.thumbnail || ''}
        url={`/blog/${slug}`}
        type="article"
        article={{
          publishedTime: post.date,
          author: post.author,
          section: post.category
        }}
      />
      {/* Hero Section */}
      <section className="py-12 bg-hero-pattern">
        <div className="container mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {tl(blogDetailTranslations.backToBlog)}
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">{post.category}</Badge>
            
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t(post.title)}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="font-body">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="font-body">{post.date}</span>
                </div>
              </div>
              <a 
                href={`https://wa.me/?text=${encodeURIComponent(`${t(post.title)} - https://share.shastrakulam.com/blog/${slug}?lang=${language}`)}`}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  {tl(blogDetailTranslations.shareOnWhatsApp)}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto -mt-4">
            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={post.thumbnail}
                alt={t(post.title)}
                className="w-full h-auto aspect-video object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Excerpt */}
            <p className="font-body text-xl text-muted-foreground leading-relaxed mb-8 pb-8 border-b border-border italic">
              {t(post.excerpt)}
            </p>

            {/* Full Content */}
            {post.content && (
              <div className="prose prose-lg max-w-none">
                <p className="font-body text-foreground leading-relaxed whitespace-pre-wrap">
                  {t(post.content)}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetail;
