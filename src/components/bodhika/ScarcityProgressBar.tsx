import React from 'react';
import { Users, Flame } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  joinOthers: {
    en: 'Join 58 others who have already secured their spot',
    hi: '58 अन्य लोगों के साथ जुड़ें जिन्होंने पहले ही अपनी सीट सुरक्षित कर ली है',
    sa: '५८ अन्यैः सह मिलित ये स्वस्थानं सुरक्षितं कृतवन्तः'
  },
  spotsLeft: {
    en: '12 spots left!',
    hi: '12 स्थान शेष!',
    sa: '१२ स्थानानि शेषाणि!'
  }
};

interface ScarcityProgressBarProps {
  className?: string;
}

const ScarcityProgressBar = ({ className = '' }: ScarcityProgressBarProps) => {
  const { t } = useLanguage();
  
  return (
    <div className={`bg-cream/50 border border-border rounded-xl p-4 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-saffron/20 flex items-center justify-center">
          <Users className="h-4 w-4 text-saffron" />
        </div>
        <span className="font-body text-sm text-foreground font-medium">
          {t(translations.joinOthers)}
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="relative">
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-saffron to-maroon rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: '83%' }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-muted-foreground font-body">58/70 enrolled</span>
          <span className="text-xs font-semibold text-red-600 font-body flex items-center gap-1">
            <Flame className="h-3 w-3" />
            {t(translations.spotsLeft)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScarcityProgressBar;
