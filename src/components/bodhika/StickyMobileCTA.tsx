import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface StickyMobileCTAProps {
  text: string;
  onClick: () => void;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ text, onClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-md border-t border-border shadow-elevated md:hidden">
      <Button
        size="lg"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base py-6"
        onClick={onClick}
      >
        {text}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};
