import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Shield, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  title: {
    en: 'Clarity Guarantee',
    hi: 'स्पष्टता गारंटी',
    sa: 'स्पष्टताप्रतिज्ञा'
  },
  description: {
    en: "We don't just sell courses; we facilitate shifts. If you don't feel a measurable increase in your mental clarity within 7 days, we will provide a 1-on-1 diagnostic session to help you bridge your gap.",
    hi: 'हम सिर्फ कोर्स नहीं बेचते; हम परिवर्तन की सुविधा प्रदान करते हैं। यदि आप 7 दिनों के भीतर अपनी मानसिक स्पष्टता में मापने योग्य वृद्धि महसूस नहीं करते हैं, तो हम आपके अंतर को पाटने में मदद के लिए 1-on-1 निदान सत्र प्रदान करेंगे।',
    sa: 'वयं केवलं पाठ्यक्रमान् न विक्रीणीमः; वयं परिवर्तनानि सुकराणि कुर्मः। यदि भवान् सप्तदिनेषु स्वमानसिकस्पष्टतायां मापनीयवृद्धिं नानुभवति, तर्हि वयं भवतः अन्तरं पूरयितुं एकैकनिदानसत्रं प्रदास्यामः।'
  },
  badge: {
    en: 'Your Peace of Mind',
    hi: 'आपकी मानसिक शांति',
    sa: 'भवतः मानसशान्तिः'
  }
};

interface RiskReversalCardProps {
  className?: string;
}

const RiskReversalCard = ({ className = '' }: RiskReversalCardProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className={`border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 shadow-xl overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row items-stretch">
          {/* Wax Seal Icon Section */}
          <div className="bg-gradient-to-br from-maroon to-maroon-dark p-8 flex flex-col items-center justify-center text-white md:w-48">
            <div className="relative">
              {/* Wax Seal Effect */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-700 via-red-800 to-red-900 shadow-xl flex items-center justify-center border-4 border-red-600 relative">
                <div className="absolute inset-2 rounded-full border-2 border-amber-400/30" />
                <Award className="h-10 w-10 text-amber-200" />
              </div>
              {/* Ribbon */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-6 bg-maroon-dark" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 50% 70%, 20% 100%)' }} />
            </div>
            <p className="mt-4 text-xs font-body text-cream/80 text-center">{t(translations.badge)}</p>
          </div>
          
          {/* Content Section */}
          <div className="p-8 flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-amber-600" />
              <h3 className="font-heading text-2xl font-bold text-foreground">
                {t(translations.title)}
              </h3>
            </div>
            
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              {t(translations.description)}
            </p>
            
            <div className="flex items-center gap-2 text-sm text-green-700 font-medium">
              <CheckCircle2 className="h-4 w-4" />
              <span className="font-body">No questions asked • Full support</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskReversalCard;
