import React from 'react';
import Layout from '@/components/Layout';
import SectionHeader from '@/components/SectionHeader';
import CourseCard from '@/components/CourseCard';
import { useAdmin } from '@/contexts/AdminContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2 } from 'lucide-react';

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