import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage, translations } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import logo from '@/assets/shastrakulam-logo.png';

const loginTranslations = {
  login: { en: 'Login', hi: 'लॉगिन', sa: 'प्रवेशः' },
  logout: { en: 'Logout', hi: 'लॉगआउट', sa: 'निर्गमनम्' },
};

const donateTranslations = {
  donate: { en: 'Donate', hi: 'दान करें', sa: 'दानम्' },
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: translations.nav.home },
    { path: '/courses', label: translations.nav.courses },
    { path: '/programs', label: translations.nav.programs },
    { path: '/camps', label: translations.nav.camps },
    { path: '/blog', label: translations.nav.blog },
    { path: '/about', label: translations.nav.about },
    { path: '/contact', label: translations.nav.contact },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-soft'
          : 'bg-background/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo - the new logo includes text, so we show it larger */}
          <Link to="/" className="flex items-center group">
            <img
              src={logo}
              alt="Shastrakulam"
              className="h-16 md:h-20 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg font-body text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-primary bg-secondary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {t(link.label)}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Link to="/donate" className="hidden md:block">
              <Button variant="maroon-outline" size="sm" className="gap-2">
                <Heart className="h-4 w-4" />
                {t(donateTranslations.donate)}
              </Button>
            </Link>
            
            {/* Login/Logout Button */}
            {user ? (
              <Button variant="outline" size="sm" className="gap-2" onClick={() => signOut()}>
                <LogOut className="h-4 w-4" />
                {t(loginTranslations.logout)}
              </Button>
            ) : (
              <Link to="/admin/login" className="hidden sm:block">
                <Button variant="outline" size="sm" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  {t(loginTranslations.login)}
                </Button>
              </Link>
            )}
            
            <Link to="/courses" className="hidden sm:block">
              <Button variant="saffron" size="default">
                {t(translations.nav.enrollNow)}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-body text-base font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-primary bg-secondary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {t(link.label)}
                </Link>
              ))}
                <Link
                  to="/donate"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg font-body text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-2"
                >
                  <Heart className="h-4 w-4" />
                  Donate
                </Link>
                
                {/* Mobile Login/Logout */}
                {user ? (
                  <button
                    onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                    className="px-4 py-3 rounded-lg font-body text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    {t(loginTranslations.logout)}
                  </button>
                ) : (
                  <Link
                    to="/admin/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg font-body text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-2"
                  >
                    <LogIn className="h-4 w-4" />
                    {t(loginTranslations.login)}
                  </Link>
                )}
                
                <Link
                  to="/courses"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-2"
                >
                  <Button variant="saffron" className="w-full">
                    {t(translations.nav.enrollNow)}
                  </Button>
                </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
