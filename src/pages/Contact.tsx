import React from 'react';
import Layout from '@/components/Layout';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <Layout>
      <section className="py-12 bg-hero-pattern">
        <div className="container mx-auto px-4">
          <SectionHeader title="Contact Us" subtitle="We'd love to hear from you. Reach out for any queries." />
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <h3 className="font-heading text-2xl font-bold text-foreground">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4"><MapPin className="h-6 w-6 text-accent" /><span className="font-body">123 Vedic Lane, Vrindavan, UP 281121</span></div>
                <div className="flex items-center gap-4"><Phone className="h-6 w-6 text-accent" /><span className="font-body">+91 98765 43210</span></div>
                <div className="flex items-center gap-4"><Mail className="h-6 w-6 text-accent" /><span className="font-body">info@shastrakulam.org</span></div>
              </div>
            </div>
            <form className="space-y-6 bg-card p-8 rounded-2xl shadow-card border border-border">
              <Input placeholder="Your Name" className="font-body" />
              <Input type="email" placeholder="Your Email" className="font-body" />
              <Textarea placeholder="Your Message" rows={5} className="font-body" />
              <Button variant="saffron" className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
