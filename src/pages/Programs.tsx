import React from 'react';
import Layout from '@/components/Layout';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home, BookOpen, Users } from 'lucide-react';

const Programs: React.FC = () => {
  return (
    <Layout>
      <section className="py-12 bg-hero-pattern">
        <div className="container mx-auto px-4">
          <SectionHeader title="Our Programs" subtitle="Full-time Gurukul education for holistic development." />
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-card rounded-2xl p-8 shadow-card border border-border space-y-6">
            <div className="flex items-center gap-4"><Home className="h-10 w-10 text-accent" /><h3 className="font-heading text-2xl font-bold">Full-time Gurukul Schooling</h3></div>
            <p className="font-body text-muted-foreground">Our residential gurukul offers a complete education experience combining modern academics with traditional Vedic learning. Students live in a home-like environment, learning Sanskrit, Shastras, yoga, and values alongside regular curriculum.</p>
            <ul className="space-y-2 font-body text-muted-foreground">
              <li>• Residential facility with modern amenities</li>
              <li>• Sanskrit immersion environment</li>
              <li>• Daily yoga, meditation, and prayers</li>
              <li>• Academic excellence with Vedic foundation</li>
            </ul>
            <Link to="/contact"><Button variant="saffron" size="lg">Inquire About Admission</Button></Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Programs;
