import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, translations } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';
import logo from '@/assets/shastrakulam-logo.png';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  const quickLinks = [
    { path: '/', label: translations.nav.home },
    { path: '/courses', label: translations.nav.courses },
    { path: '/bodhika', label: { en: 'Bodhika Program', hi: 'बोधिका कार्यक्रम', sa: 'बोधिका कार्यक्रमः' } },
    { path: '/programs', label: translations.nav.programs },
    { path: '/camps', label: translations.nav.camps },
    { path: '/blog', label: translations.nav.blog },
    { path: '/about', label: translations.nav.about },
    { path: '/contact', label: { en: 'Contact', hi: 'संपर्क', sa: 'सम्पर्कः' } },
    { path: '/donate', label: { en: 'Donate', hi: 'दान करें', sa: 'दानं कुरुत' } },
  ];

  const courseLinks = [
    { path: '/learn-sanskrit', label: { en: 'Learn Sanskrit', hi: 'संस्कृत सीखें', sa: 'संस्कृतं अधिगच्छत' } },
    { path: '/bhagavad-gita-classes', label: { en: 'Bhagavad Gita Classes', hi: 'भगवद्गीता कक्षाएं', sa: 'भगवद्गीताकक्षाः' } },
    { path: '/vedic-education', label: { en: 'Vedic Education', hi: 'वैदिक शिक्षा', sa: 'वैदिकशिक्षा' } },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img
                src={logo}
                alt="Shastrakulam"
                className="h-20 w-auto bg-white rounded-xl p-2"
              />
            </Link>
            <p className="font-body text-primary-foreground/80 leading-relaxed">
              {t(translations.footer.tagline)}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">
              {t(translations.footer.quickLinks)}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-body text-primary-foreground/80 hover:text-accent transition-colors duration-200"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Courses */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">
              {t({ en: 'Popular Courses', hi: 'लोकप्रिय पाठ्यक्रम', sa: 'लोकप्रियपाठ्यक्रमाः' })}
            </h4>
            <ul className="space-y-3">
              {courseLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-body text-primary-foreground/80 hover:text-accent transition-colors duration-200"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/courses"
                  className="font-body text-accent hover:text-accent/80 transition-colors duration-200 font-semibold"
                >
                  {t({ en: 'View All Courses →', hi: 'सभी पाठ्यक्रम देखें →', sa: 'सर्वान् पाठ्यक्रमान् पश्यत →' })}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">
              {t(translations.footer.contactUs)}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="font-body text-primary-foreground/80 text-sm">
                  Main Campus, Shastrakulam<br />
                  NH334, Badheri, Uttar Pradesh<br />
                  PIN: 251307
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <a
                  href="tel:+919674916567"
                  className="font-body text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  +91 96749 16567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <a
                  href="mailto:info@shastrakulam.org"
                  className="font-body text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  info@shastrakulam.org
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter & Donate */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">
              {t(translations.footer.newsletter)}
            </h4>
            <p className="font-body text-primary-foreground/80 text-sm mb-4">
              Stay updated with our latest courses and events.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder={t(translations.footer.enterEmail)}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                required
              />
              <Button
                type="submit"
                variant="saffron"
                className="w-full"
              >
                {t(translations.footer.subscribe)}
              </Button>
            </form>
            <Link to="/donate" className="block mt-4">
              <Button variant="outline" className="w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2">
                <Heart className="h-4 w-4" />
                Support Our Mission
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-body text-primary-foreground/60">
            <p>
              © {new Date().getFullYear()} Shastrakulam. {t(translations.footer.rights)}
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
