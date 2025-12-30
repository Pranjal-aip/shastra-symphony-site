import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import NotificationPopup from '@/components/NotificationPopup';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useReferral } from '@/hooks/useReferral';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Track referral visits
  useReferral();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <NotificationPopup currentPath={location.pathname} />
      
      {/* Floating language switcher for mobile */}
      {isMobile && (
        <div className="fixed bottom-20 left-4 z-50 shadow-lg rounded-lg">
          <LanguageSwitcher />
        </div>
      )}
    </div>
  );
};

export default Layout;
