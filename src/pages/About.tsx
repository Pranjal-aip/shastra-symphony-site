import React from 'react';
import Layout from '@/components/Layout';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <Layout>
      <section className="py-12 bg-hero-pattern">
        <div className="container mx-auto px-4">
          <SectionHeader title="About Shastrakulam" subtitle="Nurturing minds through timeless wisdom and Sanskrit traditions." />
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg mx-auto font-body text-muted-foreground space-y-6">
            <p>Shastrakulam is a premier institution dedicated to reviving the ancient gurukul tradition of holistic education. We blend timeless Vedic wisdom with modern pedagogical methods to create transformative learning experiences.</p>
            <p>Our mission is to nurture well-rounded individuals who are rooted in their cultural heritage while being prepared for the modern world. Through Sanskrit, Shastras, yoga, and values-based education, we help students discover their true potential.</p>
            <h3 className="font-heading text-2xl font-bold text-foreground">Our Vision</h3>
            <p>To be the leading center for authentic Vedic education, creating a generation of enlightened individuals who carry forward the wisdom of our ancestors.</p>
          </div>
          <div className="text-center mt-12">
            <Link to="/contact"><Button variant="saffron" size="lg">Get in Touch</Button></Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
