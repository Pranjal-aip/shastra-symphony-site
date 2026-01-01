import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { X, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  sectionTitle: {
    en: 'The Bridge: From Information to Transformation',
    hi: 'पुल: जानकारी से परिवर्तन तक',
    sa: 'सेतुः: सूचनातः परिवर्तनम् प्रति'
  },
  trapTitle: {
    en: 'The Information Trap',
    hi: 'सूचना जाल',
    sa: 'सूचनापाशः'
  },
  pathTitle: {
    en: 'The Bodhika Path',
    hi: 'बोधिका मार्ग',
    sa: 'बोधिकामार्गः'
  },
  trap1: {
    en: 'Overwhelmed by endless, disconnected data',
    hi: 'अंतहीन, असंबद्ध डेटा से अभिभूत',
    sa: 'अनन्तविच्छिन्नदत्तांशैः अभिभूताः'
  },
  trap2: {
    en: 'Knowledge stays as theory, never reaching the heart',
    hi: 'ज्ञान सिद्धांत के रूप में रहता है, हृदय तक नहीं पहुंचता',
    sa: 'ज्ञानं सिद्धान्तरूपेण तिष्ठति, हृदयं न प्राप्नोति'
  },
  trap3: {
    en: "Spiritual 'burnout' from lack of direction",
    hi: 'दिशा की कमी से आध्यात्मिक थकान',
    sa: 'दिशाभावात् आध्यात्मिकक्लान्तिः'
  },
  trap4: {
    en: "Feeling 'stuck' despite years of study",
    hi: 'वर्षों के अध्ययन के बावजूद "अटका हुआ" महसूस करना',
    sa: 'वर्षाणाम् अध्ययनमपि "स्तब्धम्" इति अनुभवः'
  },
  path1: {
    en: 'Laser-sharp mental clarity and focus',
    hi: 'तीक्ष्ण मानसिक स्पष्टता और फोकस',
    sa: 'तीक्ष्णमानसिकस्पष्टता एकाग्रता च'
  },
  path2: {
    en: 'Wisdom integrated into daily Samskaras (habits)',
    hi: 'दैनिक संस्कारों (आदतों) में एकीकृत ज्ञान',
    sa: 'दैनन्दिनसंस्कारेषु एकीकृतं ज्ञानम्'
  },
  path3: {
    en: 'Calm, decisive life-direction based on Shastric truth',
    hi: 'शास्त्रीय सत्य पर आधारित शांत, निर्णायक जीवन-दिशा',
    sa: 'शास्त्रीयसत्ये आधारितः शान्तः निर्णायकः जीवनमार्गः'
  },
  path4: {
    en: 'Direct, lived experience of the teachings',
    hi: 'शिक्षाओं का प्रत्यक्ष, जीवंत अनुभव',
    sa: 'शिक्षाणां प्रत्यक्षः जीवन्तानुभवः'
  }
};

const TransformationTable = () => {
  const { t } = useLanguage();
  
  const trapItems = [
    t(translations.trap1),
    t(translations.trap2),
    t(translations.trap3),
    t(translations.trap4),
  ];
  
  const pathItems = [
    t(translations.path1),
    t(translations.path2),
    t(translations.path3),
    t(translations.path4),
  ];
  
  return (
    <section className="py-20 bg-gradient-to-b from-background to-cream/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-maroon/10 text-maroon border-maroon/20 mb-4">
            <Sparkles className="h-3 w-3 mr-1" />
            The Transformation
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            {t(translations.sectionTitle)}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* The Information Trap */}
          <Card className="border-2 border-red-200 bg-red-50/50 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <X className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-heading text-xl font-bold text-red-800">
                  {t(translations.trapTitle)}
                </h3>
              </div>
              
              <ul className="space-y-4">
                {trapItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="h-4 w-4 text-red-500" />
                    </div>
                    <span className="font-body text-red-900/80">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {/* The Bodhika Path */}
          <Card className="border-2 border-green-200 bg-green-50/50 shadow-lg relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge className="bg-green-600 text-white border-0">
                Recommended
              </Badge>
            </div>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-heading text-xl font-bold text-green-800">
                  {t(translations.pathTitle)}
                </h3>
              </div>
              
              <ul className="space-y-4">
                {pathItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="font-body text-green-900/80">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Arrow indicator on desktop */}
        <div className="hidden md:flex justify-center mt-8">
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="font-body text-sm">Move from confusion</span>
            <ArrowRight className="h-5 w-5 text-saffron" />
            <span className="font-body text-sm font-semibold text-saffron">to clarity</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationTable;
