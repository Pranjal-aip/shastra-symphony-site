import React from 'react';
import Layout from '@/components/Layout';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sun, Calendar } from 'lucide-react';

const Camps: React.FC = () => {
  return (
    <Layout>
      <section className="py-12 bg-hero-pattern">
        <div className="container mx-auto px-4">
          <SectionHeader title="Seasonal Camps" subtitle="Immersive short-term experiences for children and families." />
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border space-y-4">
              <Sun className="h-10 w-10 text-accent" />
              <h3 className="font-heading text-xl font-bold">Summer Sanskrit Camp</h3>
              <p className="font-body text-muted-foreground">2-week intensive camp with Sanskrit learning, yoga, cultural activities, and outdoor adventures.</p>
              <p className="font-body font-semibold text-primary">May - June 2025</p>
              <Link to="/contact"><Button variant="maroon-outline" className="w-full">Register Interest</Button></Link>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border space-y-4">
              <Calendar className="h-10 w-10 text-accent" />
              <h3 className="font-heading text-xl font-bold">Winter Retreat</h3>
              <p className="font-body text-muted-foreground">10-day spiritual retreat focusing on meditation, Gita study, and inner transformation.</p>
              <p className="font-body font-semibold text-primary">December 2025</p>
              <Link to="/contact"><Button variant="maroon-outline" className="w-full">Register Interest</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Camps;
