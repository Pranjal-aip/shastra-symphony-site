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
    en: 'Sanskrit & Vedic Courses Online | Bhagavad Gita, Upanishads, Vedas Classes',
    hi: 'ऑनलाइन संस्कृत और वैदिक पाठ्यक्रम | भगवद्गीता, उपनिषद, वेद कक्षाएं',
    sa: 'अन्तर्जाले संस्कृतवैदिकपाठ्यक्रमाः | भगवद्गीता उपनिषदः वेदकक्षाः'
  },
  description: {
    en: 'Learn Sanskrit, Bhagavad Gita, Upanishads, Vedas, Puranas & Indian philosophy online. Live classes with expert Acharyas for kids & adults. Certificate courses available!',
    hi: 'संस्कृत, भगवद्गीता, उपनिषद, वेद, पुराण और भारतीय दर्शन ऑनलाइन सीखें। बच्चों और वयस्कों के लिए विशेषज्ञ आचार्यों के साथ लाइव कक्षाएं।',
    sa: 'संस्कृतं भगवद्गीतां उपनिषदः वेदान् पुराणानि भारतीयदर्शनं च अन्तर्जाले अधिगच्छत। प्रमाणिताचार्यैः सह जीवन्तकक्षाः।'
  }
};

const courseFAQs = [
  {
    question: 'What age groups are your Sanskrit courses suitable for?',
    answer: 'Our courses are designed for children aged 6-17 and adults. We have beginner, intermediate, and advanced levels to suit all learners for Sanskrit, Bhagavad Gita, Upanishads, and Vedic studies.'
  },
  {
    question: 'Can I learn Bhagavad Gita and Upanishads online?',
    answer: 'Yes! We offer comprehensive courses on Bhagavad Gita, Upanishads, Vedas, and Puranas. All classes are live with expert Acharyas and include shloka learning, meaning, and practical application.'
  },
  {
    question: 'Are the classes live or pre-recorded?',
    answer: 'All our classes are 100% live with expert Acharyas. Recordings are provided for revision after each session.'
  },
  {
    question: 'What is the duration of Sanskrit and Vedic courses?',
    answer: 'Course duration varies from 3 months to 1 year. Our flagship Bodhika program is a comprehensive 1-year course covering Sanskrit, Bhagavad Gita, Upanishads, Vedas, Puranas, and Indian philosophy.'
  },
  {
    question: 'Do you provide certificates after course completion?',
    answer: 'Yes, all students receive a certificate upon successful completion of their course from Shastrakulam, recognized for authentic Vedic education.'
  },
  {
    question: 'What topics are covered in Indian philosophy courses?',
    answer: 'Our courses cover Sanatan Dharma, Bhagavad Gita teachings, Upanishadic wisdom, Vedic mantras, Purana stories, dharmic values, and practical application of ancient wisdom in modern life.'
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
        keywords="Sanskrit courses online, learn Sanskrit online India, Vedic education courses, Bhagavad Gita classes online, Upanishad course online, Vedas classes, Purana education, Indian philosophy for kids, Vedic mathematics course, yoga classes for kids, Sanskrit for beginners, online gurukul, Sanatan Dharma courses, Indian culture education, Gita shloka learning, Sanskrit grammar course, Vedic scripture classes, learn Upanishads, Vedas for children, dharmic values course"
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