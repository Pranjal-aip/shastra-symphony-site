import React from 'react';
import Layout from '@/components/Layout';
import SectionHeader from '@/components/SectionHeader';
import CourseCard from '@/components/CourseCard';
import { sampleCourses } from '@/data/sampleData';

const Courses: React.FC = () => {
  return (
    <Layout>
      <section className="py-12 bg-hero-pattern">
        <div className="container mx-auto px-4">
          <SectionHeader title="Our Courses" subtitle="Explore our comprehensive range of courses rooted in Vedic wisdom." />
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Courses;
