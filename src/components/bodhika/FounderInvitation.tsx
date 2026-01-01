import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import founderImage from '@/assets/bodhika/founder-yogesh.jpg';

const translations = {
  sectionTitle: {
    en: 'A Personal Note to the Seeker',
    hi: 'साधक को एक व्यक्तिगत संदेश',
    sa: 'साधकाय व्यक्तिगतः सन्देशः'
  },
  message: {
    en: `I built Bodhika because I saw too many brilliant minds drowning in information but starving for implementation. We don't need more books; we need a better way to live what we already know.

I am limiting this cohort to 70 people because I want to look at the names in this group and know that real transformation is happening for every single one of you.

If you feel the pull, don't let this be another "someday"—secure your seat, and let's begin the work.`,
    hi: `मैंने बोधिका इसलिए बनाई क्योंकि मैंने देखा कि बहुत सारे प्रतिभाशाली दिमाग जानकारी में डूब रहे थे लेकिन कार्यान्वयन के लिए तरस रहे थे। हमें और किताबों की जरूरत नहीं है; हमें जो पहले से जानते हैं उसे जीने का एक बेहतर तरीका चाहिए।

मैं इस समूह को 70 लोगों तक सीमित कर रहा हूं क्योंकि मैं इस समूह के नामों को देखना चाहता हूं और जानना चाहता हूं कि आप में से हर एक के लिए वास्तविक परिवर्तन हो रहा है।

यदि आप आकर्षण महसूस करते हैं, तो इसे "कभी" न होने दें—अपनी सीट सुरक्षित करें, और आइए काम शुरू करें।`,
    sa: `अहं बोधिकां निर्मितवान् यतः अहं बहून् प्रतिभाशालिनः मनांसि सूचनासु निमग्नान् किन्तु कार्यान्वयनार्थं क्षुधितान् दृष्टवान्। वयं अधिकानि पुस्तकानि न आवश्यकुर्मः; वयं यत् पूर्वमेव जानीमः तत् जीवितुं श्रेष्ठं मार्गम् आवश्यकुर्मः।

अहं एतं समूहं सप्ततिजनेषु सीमयामि यतः अहं अस्मिन् समूहे नामानि द्रष्टुं ज्ञातुं च इच्छामि यत् भवतां प्रत्येकस्य कृते वास्तविकं परिवर्तनं भवति।

यदि भवान् आकर्षणम् अनुभवति, एतत् "कदाचित्" मा भवतु—स्वासनं सुरक्षितं कुर्यात्, कार्यम् आरभामहे च।`
  },
  signature: {
    en: '—Yogesh Bhardwaj',
    hi: '—योगेश भारद्वाज',
    sa: '—योगेशभारद्वाजः'
  },
  role: {
    en: 'Founder, Shastrakulam',
    hi: 'संस्थापक, शास्त्रकुलम्',
    sa: 'संस्थापकः, शास्त्रकुलम्'
  }
};

const FounderInvitation = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-b from-cream/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            {t(translations.sectionTitle)}
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl overflow-hidden bg-gradient-to-br from-amber-50/80 via-cream to-orange-50/50">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-3 gap-0">
                {/* Founder Image */}
                <div className="relative bg-gradient-to-br from-maroon to-maroon-dark p-8 flex flex-col items-center justify-center">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-saffron/30 shadow-xl">
                      <img 
                        src={founderImage} 
                        alt="Yogesh Bhardwaj - Founder of Shastrakulam"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    {/* Decorative ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-saffron/20 scale-110" />
                  </div>
                  
                  <div className="mt-6 text-center text-white">
                    <p className="font-heading font-bold text-lg">{t(translations.signature).replace('—', '')}</p>
                    <p className="font-body text-sm text-cream/80">{t(translations.role)}</p>
                  </div>
                </div>
                
                {/* Message Content */}
                <div className="md:col-span-2 p-8 md:p-12 relative">
                  {/* Quote Icon */}
                  <Quote className="absolute top-6 left-6 h-10 w-10 text-saffron/20 rotate-180" />
                  
                  <div className="relative z-10">
                    <div className="font-body text-foreground/90 leading-relaxed whitespace-pre-line text-base md:text-lg">
                      {t(translations.message)}
                    </div>
                    
                    {/* Handwritten-style signature */}
                    <div className="mt-8 pt-6 border-t border-saffron/20">
                      <p 
                        className="text-2xl text-maroon font-heading italic"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {t(translations.signature)}
                      </p>
                      <p className="font-body text-sm text-muted-foreground mt-1">
                        {t(translations.role)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FounderInvitation;
