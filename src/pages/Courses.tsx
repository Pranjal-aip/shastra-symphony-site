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
    en: 'Sanskrit & Vedic Courses Online | Learn from Expert Acharyas',
    hi: 'ऑनलाइन संस्कृत और वैदिक पाठ्यक्रम | विशेषज्ञ आचार्यों से सीखें',
    sa: 'अन्तर्जाले संस्कृतवैदिकपाठ्यक्रमाः | विशेषज्ञाचार्येभ्यः अधिगच्छत'
  },
  description: {
    en: 'Explore authentic Sanskrit courses, Bhagavad Gita classes, Vedic mathematics, yoga for kids & adults. Live interactive sessions with certified Acharyas. Enroll now!',
    hi: 'प्रामाणिक संस्कृत पाठ्यक्रम, भगवद्गीता कक्षाएं, वैदिक गणित, बच्चों और वयस्कों के लिए योग। प्रमाणित आचार्यों के साथ लाइव इंटरैक्टिव सत्र। अभी नामांकन करें!',
    sa: 'प्रामाणिकसंस्कृतपाठ्यक्रमान्, भगवद्गीताकक्षाः, वैदिकगणितम्, बालकेभ्यः वयस्केभ्यश्च योगम् अन्वेषयत। प्रमाणिताचार्यैः सह जीवन्तपरस्परक्रियासत्राणि।'
  }
};

const courseFAQs = [
  {
    question: 'What age groups are your Sanskrit courses suitable for?',
    answer: 'Our courses are designed for children aged 6-16 and adults. We have beginner, intermediate, and advanced levels to suit all learners.'
  },
  {
    question: 'Are the classes live or pre-recorded?',
    answer: 'All our classes are 100% live with expert Acharyas. Recordings are provided for revision after each session.'
  },
  {
    question: 'What is the duration of Sanskrit courses?',
    answer: 'Course duration varies from 3 months to 1 year depending on the program. Our flagship Bodhika program is a comprehensive 1-year course.'
  },
  {
    question: 'Do you provide certificates after course completion?',
    answer: 'Yes, all students receive a certificate upon successful completion of their course from Shastrakulam.'
  }
];

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

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Courses', url: '/courses' }
  ];

  return (
    <Layout>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords="Sanskrit courses online, learn Sanskrit online India, Vedic education courses, Bhagavad Gita classes online, Vedic mathematics course, yoga classes for kids, Sanskrit for beginners, online gurukul, Sanatan Dharma courses, Indian culture education"
        url="/courses"
        breadcrumbs={breadcrumbs}
        faq={courseFAQs}
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