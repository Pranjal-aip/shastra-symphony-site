import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface CourseSchema {
  name: string;
  description: string;
  provider?: string;
  duration?: string;
  price?: string;
  currency?: string;
  image?: string;
  level?: string;
  language?: string[];
}

interface SEOProps {
  title: {
    en: string;
    hi?: string;
    sa?: string;
  };
  description: {
    en: string;
    hi?: string;
    sa?: string;
  };
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'course';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
  };
  course?: CourseSchema;
  breadcrumbs?: BreadcrumbItem[];
  faq?: FAQItem[];
  structuredData?: object;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = '/og-default.jpg',
  url,
  type = 'website',
  article,
  course,
  breadcrumbs,
  faq,
  structuredData,
  noindex = false,
}) => {
  const { language } = useLanguage();
  
  const currentTitle = title[language] || title.en;
  const currentDescription = description[language] || description.en;
  const fullTitle = `${currentTitle} | Shastrakulam`;
  const baseUrl = 'https://shastrakulam.com';
  const currentUrl = url ? `${baseUrl}${url}` : baseUrl;
  
  // Ensure image URL is absolute for social media platforms
  const getAbsoluteImageUrl = (img: string) => {
    if (!img) return `${baseUrl}/og-default.jpg`;
    if (img.startsWith('http')) return img;
    if (img.startsWith('/')) return `${baseUrl}${img}`;
    return `${baseUrl}/${img}`;
  };
  
  const absoluteImageUrl = getAbsoluteImageUrl(image);
  
  // Article structured data (per-route, for blog posts)
  const articleSchema = type === 'article' && article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": currentTitle,
    "description": currentDescription,
    "image": absoluteImageUrl,
    "datePublished": article.publishedTime,
    "dateModified": article.modifiedTime || article.publishedTime,
    "author": {
      "@type": "Person",
      "name": article.author || "Shastrakulam"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Shastrakulam",
      "logo": {
        "@type": "ImageObject",
        "url": "https://storage.googleapis.com/gpt-engineer-file-uploads/q7GFho7FFRXCbUcp2yLkc2QG3Kq2/uploads/1766976733180-logo_final-removebg-preview.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "articleSection": article.section
  } : null;

  // Course structured data
  const courseSchema = course ? {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.name,
    "description": course.description,
    "provider": {
      "@type": "Organization",
      "name": course.provider || "Shastrakulam",
      "sameAs": baseUrl
    },
    "image": course.image ? getAbsoluteImageUrl(course.image) : absoluteImageUrl,
    "courseMode": "Online",
    "isAccessibleForFree": false,
    "offers": course.price ? {
      "@type": "Offer",
      "price": course.price.replace(/[^0-9]/g, ''),
      "priceCurrency": course.currency || "INR",
      "availability": "https://schema.org/InStock"
    } : undefined,
    "educationalLevel": course.level || "Beginner",
    "inLanguage": course.language || ["en", "hi", "sa"],
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online",
      "duration": course.duration
    }
  } : null;

  // Breadcrumb structured data
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${baseUrl}${item.url}`
    }))
  } : null;

  // FAQ structured data
  const faqSchema = faq && faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  // Combine all structured data (Organization/LocalBusiness/WebSite live in index.html
  // sitewide — keep only per-route schemas here to avoid duplication on every page).
  const allSchemas = [
    structuredData,
    articleSchema,
    courseSchema,
    breadcrumbSchema,
    faqSchema
  ].filter(Boolean);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={language === 'en' ? 'en' : language === 'hi' ? 'hi' : 'sa'} />
      <title>{fullTitle}</title>
      <meta name="description" content={currentDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Shastrakulam" />
      <link rel="canonical" href={currentUrl} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Google Site Verification - Add your verification code */}
      <meta name="google-site-verification" content="your-verification-code" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#7A2639" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Open Graph */}
      <meta property="og:type" content={type === 'course' ? 'website' : type} />
      <meta property="og:site_name" content="Shastrakulam" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={currentDescription} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content={currentTitle} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:locale" content={language === 'en' ? 'en_US' : language === 'hi' ? 'hi_IN' : 'sa_IN'} />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="hi_IN" />
      
      {/* Article-specific Open Graph */}
      {type === 'article' && article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          <meta property="article:publisher" content="https://www.facebook.com/shastrakulam" />
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@shastrakulam" />
      <meta name="twitter:creator" content="@shastrakulam" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={currentDescription} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      <meta name="twitter:image:alt" content={currentTitle} />
      
      {/* Structured Data - Multiple schemas */}
      {allSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
