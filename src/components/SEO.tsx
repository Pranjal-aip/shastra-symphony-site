import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

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
  type?: 'website' | 'article' | 'product';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
  };
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
    if (!img) return 'https://lovable.dev/opengraph-image-p98pqg.png';
    if (img.startsWith('http')) return img;
    if (img.startsWith('/')) return `${baseUrl}${img}`;
    return `${baseUrl}/${img}`;
  };
  
  const absoluteImageUrl = getAbsoluteImageUrl(image);
  
  // Default organization structured data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Shastrakulam",
    "alternateName": "शास्त्रकुलम्",
    "url": baseUrl,
    "logo": "https://storage.googleapis.com/gpt-engineer-file-uploads/q7GFho7FFRXCbUcp2yLkc2QG3Kq2/uploads/1766976733180-logo_final-removebg-preview.png",
    "description": "Authentic Vedic education through Sanskrit courses, full-time gurukul schooling, and immersive camps for children and seekers.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "NH334, Badheri",
      "addressLocality": "Badheri",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "251307",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-96749-16567",
      "contactType": "customer service",
      "email": "info@shastrakulam.com",
      "availableLanguage": ["English", "Hindi", "Sanskrit"]
    },
    "sameAs": [
      "https://www.instagram.com/shastrakulam",
      "https://www.youtube.com/@shastrakulam",
      "https://www.facebook.com/shastrakulam"
    ]
  };

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
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#7A2639" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Shastrakulam" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={currentDescription} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:locale" content={language === 'en' ? 'en_US' : language === 'hi' ? 'hi_IN' : 'sa_IN'} />
      
      {/* Article-specific Open Graph */}
      {type === 'article' && article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@shastrakulam" />
      <meta name="twitter:creator" content="@shastrakulam" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={currentDescription} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || organizationSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
