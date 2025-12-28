import React from 'react';
import Layout from '@/components/Layout';
import SectionHeader from '@/components/SectionHeader';
import CourseCard from '@/components/CourseCard';
import { useAdmin } from '@/contexts/AdminContext';
import { Loader2 } from 'lucide-react';

const Courses: React.FC = () => {
  const { courses, loading } = useAdmin();

  return (
    <Layout>
      <section className="py-12 bg-hero-pattern">
        <div className="container mx-auto px-4">
          <SectionHeader title="Our Courses" subtitle="Explore our comprehensive range of courses rooted in Vedic wisdom." />
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
