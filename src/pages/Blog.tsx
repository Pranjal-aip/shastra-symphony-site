import React from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import SectionHeader from '@/components/SectionHeader';
import BlogCard from '@/components/BlogCard';
import { useAdmin } from '@/contexts/AdminContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2 } from 'lucide-react';

const seoData = {
  title: {
    en: 'Vedic Wisdom Blog | Sanskrit, Spirituality & Indian Culture',
    hi: 'वैदिक ज्ञान ब्लॉग | संस्कृत, आध्यात्मिकता और भारतीय संस्कृति',
    sa: 'वैदिकज्ञानपत्रिका | संस्कृतं आध्यात्मिकता भारतीयसंस्कृतिश्च'
  },
  description: {
    en: 'Explore insightful articles on Sanskrit learning, Vedic wisdom, parenting with Indian values, Ramayana & Mahabharata stories, and spiritual guidance for modern life.',
    hi: 'संस्कृत सीखने, वैदिक ज्ञान, भारतीय मूल्यों के साथ पालन-पोषण, रामायण और महाभारत की कहानियों और आधुनिक जीवन के लिए आध्यात्मिक मार्गदर्शन पर लेख पढ़ें।',
    sa: 'संस्कृतशिक्षणविषये वैदिकज्ञानविषये भारतीयमूल्यैः सह पोषणविषये रामायणमहाभारतकथासु आधुनिकजीवनार्थम् आध्यात्मिकमार्गदर्शने च लेखान् पठत।'
  }
};

const blogTranslations = {
  title: {
    en: 'Wisdom Blog',
    hi: 'ज्ञान ब्लॉग',
    sa: 'ज्ञानपत्रिका'
  },
  subtitle: {
    en: 'Insights, stories, and guidance for your spiritual journey.',
    hi: 'आपकी आध्यात्मिक यात्रा के लिए अंतर्दृष्टि, कहानियाँ और मार्गदर्शन।',
    sa: 'भवतः आध्यात्मिकयात्रायै अन्तर्दृष्टयः, कथाः, मार्गदर्शनं च।'
  },
  noPosts: {
    en: 'No blog posts available yet.',
    hi: 'अभी तक कोई ब्लॉग पोस्ट उपलब्ध नहीं है।',
    sa: 'अद्यापि कोऽपि ब्लॉगलेखः उपलब्धः नास्ति।'
  }
};

const Blog: React.FC = () => {
  const { blogPosts, loading } = useAdmin();
  const { language } = useLanguage();

  const t = (obj: { en: string; hi: string; sa: string }) => obj[language] || obj.en;

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' }
  ];

  return (
    <Layout>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords="Sanskrit blog, Vedic wisdom articles, parenting Indian values, spiritual guidance, Ramayana stories, Bhagavad Gita lessons, Mahabharata teachings, Hindu philosophy, Sanatan Dharma blog, Indian culture articles, Sanskrit learning tips"
        url="/blog"
        breadcrumbs={breadcrumbs}
      />
      <section className="py-12 bg-hero-pattern">
        <div className="container mx-auto px-4">
          <SectionHeader title={t(blogTranslations.title)} subtitle={t(blogTranslations.subtitle)} />
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-body">{t(blogTranslations.noPosts)}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
