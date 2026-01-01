import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  scarcityText: {
    en: '⚠️ Strict Enrollment Limit: Only 70 seats available to ensure personalized guidance.',
    hi: '⚠️ सख्त नामांकन सीमा: व्यक्तिगत मार्गदर्शन सुनिश्चित करने के लिए केवल 70 सीटें उपलब्ध।',
    sa: '⚠️ कठोरनामाङ्कनसीमा: व्यक्तिगतमार्गदर्शनार्थं केवलं ७० आसनानि उपलब्धानि।'
  },
  seatsRemaining: {
    en: '12 Seats Remaining',
    hi: '12 सीटें शेष',
    sa: '१२ आसनानि शेषाणि'
  }
};

const ScarcityTopBar = () => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-gradient-to-r from-maroon-dark via-maroon to-maroon-dark text-cream py-2.5 px-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-center gap-4 text-sm font-body">
        <span className="hidden sm:inline">{t(translations.scarcityText)}</span>
        <span className="sm:hidden text-xs">⚠️ Only 70 seats • Personalized guidance</span>
        <span className="inline-flex items-center gap-1.5 bg-saffron text-white px-3 py-1 rounded-full font-semibold text-xs animate-pulse">
          <AlertTriangle className="h-3 w-3" />
          {t(translations.seatsRemaining)}
        </span>
      </div>
    </div>
  );
};

export default ScarcityTopBar;
