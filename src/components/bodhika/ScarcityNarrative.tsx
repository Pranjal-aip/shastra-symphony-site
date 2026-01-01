import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Lock, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  title: {
    en: 'Why We Limit Seats',
    hi: 'हम सीटें क्यों सीमित करते हैं',
    sa: 'वयं आसनानि किमर्थं सीमयामः'
  },
  description: {
    en: 'Bodhika is not a mass-enrollment course. We limit each cohort to maintain the sanctity of the transmission and allow for direct, personal interaction with every child.',
    hi: 'बोधिका एक सामूहिक-नामांकन पाठ्यक्रम नहीं है। हम प्रसारण की पवित्रता बनाए रखने और हर बच्चे के साथ प्रत्यक्ष, व्यक्तिगत संपर्क की अनुमति देने के लिए प्रत्येक समूह को सीमित करते हैं।',
    sa: 'बोधिका जननामाङ्कनपाठ्यक्रमः न। वयं प्रसारणस्य पवित्रतां रक्षितुं प्रत्येकबालकेन सह प्रत्यक्षव्यक्तिगतसंवादं च अनुमन्तुं प्रत्येकं समूहं सीमयामः।'
  },
  point1: {
    en: 'Deep, personal guidance for every child',
    hi: 'हर बच्चे के लिए गहरा, व्यक्तिगत मार्गदर्शन',
    sa: 'प्रत्येकबालकाय गहनं व्यक्तिगतं मार्गदर्शनम्'
  },
  point2: {
    en: 'Sacred learning environment maintained',
    hi: 'पवित्र सीखने का वातावरण बनाए रखा',
    sa: 'पवित्राधिगमवातावरणं रक्षितम्'
  },
  point3: {
    en: 'Quality over quantity, always',
    hi: 'हमेशा मात्रा से अधिक गुणवत्ता',
    sa: 'सर्वदा मात्रातः गुणवत्ता'
  }
};

const ScarcityNarrative = () => {
  const { t } = useLanguage();
  
  const points = [
    { icon: Users, text: t(translations.point1) },
    { icon: Lock, text: t(translations.point2) },
    { icon: Heart, text: t(translations.point3) },
  ];
  
  return (
    <Card className="border-2 border-maroon/20 bg-gradient-to-br from-maroon/5 to-saffron/5 shadow-lg">
      <CardContent className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-maroon flex items-center justify-center shadow-lg">
            <Lock className="h-7 w-7 text-white" />
          </div>
          <div>
            <Badge className="bg-red-100 text-red-700 border-red-200 mb-1">Exclusive</Badge>
            <h3 className="font-heading text-xl font-bold text-foreground">
              {t(translations.title)}
            </h3>
          </div>
        </div>
        
        <p className="font-body text-muted-foreground leading-relaxed mb-6">
          {t(translations.description)}
        </p>
        
        <div className="space-y-3">
          {points.map((point, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-saffron/20 flex items-center justify-center">
                <point.icon className="h-4 w-4 text-saffron" />
              </div>
              <span className="font-body text-sm text-foreground">{point.text}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScarcityNarrative;
