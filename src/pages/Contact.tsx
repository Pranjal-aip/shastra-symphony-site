import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { useLanguage, translations } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const contactTranslations = {
  title: {
    en: 'Contact Us',
    hi: 'संपर्क करें',
    sa: 'सम्पर्कं कुरुत'
  },
  subtitle: {
    en: "We'd love to hear from you. Reach out for any queries.",
    hi: 'हम आपसे सुनना चाहते हैं। किसी भी प्रश्न के लिए संपर्क करें।',
    sa: 'भवतः श्रोतुम् इच्छामः। कस्यापि प्रश्नस्य कृते सम्पर्कं कुरुत।'
  },
  getInTouch: {
    en: 'Get in Touch',
    hi: 'संपर्क में रहें',
    sa: 'सम्पर्के तिष्ठत'
  },
  yourName: {
    en: 'Your Name',
    hi: 'आपका नाम',
    sa: 'भवतः नाम'
  },
  yourEmail: {
    en: 'Your Email',
    hi: 'आपका ईमेल',
    sa: 'भवतः ईमेल'
  },
  yourMessage: {
    en: 'Your Message',
    hi: 'आपका संदेश',
    sa: 'भवतः सन्देशः'
  },
  sendMessage: {
    en: 'Send Message',
    hi: 'संदेश भेजें',
    sa: 'सन्देशं प्रेषयत'
  },
  sending: {
    en: 'Sending...',
    hi: 'भेज रहे हैं...',
    sa: 'प्रेषयति...'
  },
  successTitle: {
    en: 'Message Sent!',
    hi: 'संदेश भेजा गया!',
    sa: 'सन्देशः प्रेषितः!'
  },
  successMessage: {
    en: 'Thank you for contacting us. We will get back to you soon.',
    hi: 'संपर्क करने के लिए धन्यवाद। हम जल्द ही आपसे संपर्क करेंगे।',
    sa: 'सम्पर्कार्थं धन्यवादाः। शीघ्रमेव भवन्तं सम्पर्क्ष्यामः।'
  },
  errorTitle: {
    en: 'Error',
    hi: 'त्रुटि',
    sa: 'दोषः'
  },
  errorMessage: {
    en: 'Failed to send message. Please try again.',
    hi: 'संदेश भेजने में विफल। कृपया पुनः प्रयास करें।',
    sa: 'सन्देशप्रेषणे विफलः। पुनः प्रयत्नं कुरुत।'
  },
  requiredFields: {
    en: 'Please fill in all fields.',
    hi: 'कृपया सभी फ़ील्ड भरें।',
    sa: 'कृपया सर्वाणि क्षेत्राणि पूरयत।'
  }
};

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: t(contactTranslations.errorTitle),
        description: t(contactTranslations.requiredFields),
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim()
        });

      if (error) throw error;

      toast({
        title: t(contactTranslations.successTitle),
        description: t(contactTranslations.successMessage)
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: t(contactTranslations.errorTitle),
        description: t(contactTranslations.errorMessage),
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-12 bg-hero-pattern">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title={t(contactTranslations.title)} 
            subtitle={t(contactTranslations.subtitle)} 
          />
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <h3 className="font-heading text-2xl font-bold text-foreground">
                {t(contactTranslations.getInTouch)}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <span className="font-body">
                    Main Campus, Shastrakulam<br />
                    NH334, Badheri, Uttar Pradesh<br />
                    PIN: 251307
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-accent" />
                  <span className="font-body">+91 96749 16567</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-accent" />
                  <span className="font-body">info@shastrakulam.org</span>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-2xl shadow-card border border-border">
              <Input 
                placeholder={t(contactTranslations.yourName)} 
                className="font-body" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                maxLength={100}
              />
              <Input 
                type="email" 
                placeholder={t(contactTranslations.yourEmail)} 
                className="font-body" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                maxLength={255}
              />
              <Textarea 
                placeholder={t(contactTranslations.yourMessage)} 
                rows={5} 
                className="font-body" 
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                maxLength={1000}
              />
              <Button variant="saffron" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    {t(contactTranslations.sending)}
                  </>
                ) : (
                  t(contactTranslations.sendMessage)
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
