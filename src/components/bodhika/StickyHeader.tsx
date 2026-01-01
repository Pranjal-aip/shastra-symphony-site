import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import shastrakulamLogo from '@/assets/shastrakulam-logo.png';

interface StickyHeaderProps {
  ctaText: string;
  onCTAClick: () => void;
}

export const StickyHeader: React.FC<StickyHeaderProps> = ({ ctaText, onCTAClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-soft py-3'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={shastrakulamLogo}
            alt="Shastrakulam"
            className="h-10 md:h-12 w-auto"
          />
          <div className="hidden sm:block">
            <span className="font-heading text-lg font-bold text-primary">Bodhika</span>
          </div>
        </div>

        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          onClick={onCTAClick}
        >
          {ctaText}
        </Button>
      </div>
    </header>
  );
};
