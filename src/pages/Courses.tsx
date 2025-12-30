import React from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import SectionHeader from '@/components/SectionHeader';
import CourseCard from '@/components/CourseCard';
import { useAdmin } from '@/contexts/AdminContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2 } from 'lucide-react';

const seoData = {
  title: {
    en: 'Sanskrit & Vedic Courses Online',
    hi: 'ऑनलाइन संस्कृत और वैदिक पाठ्यक्रम',
    sa: 'अन्तर्जाले संस्कृतवैदिकपाठ्यक्रमाः'
  },
  description: {
    en: 'Explore authentic Sanskrit courses, Bhagavad Gita classes, Vedic mathematics, yoga, and more. Learn from expert Acharyas with live interactive sessions.',
    hi: 'प्रामाणिक संस्कृत पाठ्यक्रम, भगवद्गीता कक्षाएं, वैदिक गणित, योग और बहुत कुछ। विशेषज्ञ आचार्यों से लाइव इंटरैक्टिव सत्रों के साथ सीखें।',
    sa: 'प्रामाणिकसंस्कृतपाठ्यक्रमान्, भगवद्गीताकक्षाः, वैदिकगणितम्, योगं च अन्वेषयत। विशेषज्ञाचार्येभ्यः जीवन्तपरस्परक्रियासत्रैः सह अधिगच्छत।'
  }
};

const coursesTranslations = {
  pageTitle: {
    en: 'Our Courses',
    hi: 'हमारे पाठ्यक्रम',
    sa: 'अस्माकं पाठ्यक्रमाः'
  },
  pageSubtitle: {
    en: 'Explore our comprehensive range of courses rooted in Vedic wisdom.',
    hi: 'वैदिक ज्ञान में निहित हमारे व्यापक पाठ्यक्रमों का अन्वेषण करें।',
    sa: 'वैदिकज्ञाने निहितान् अस्माकं व्यापकपाठ्यक्रमान् अन्वेषयत।'
  }
};

const Courses: React.FC = () => {
  const { courses, loading } = useAdmin();
  const { t } = useLanguage();

  return (
    <Layout>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords="Sanskrit courses online, Vedic education, Bhagavad Gita classes, learn Sanskrit, yoga classes for kids"
        url="/courses"
      />
      <section className="py-12 bg-hero-pattern">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title={t(coursesTranslations.pageTitle)} 
            subtitle={t(coursesTranslations.pageSubtitle)} 
          />
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Courses;