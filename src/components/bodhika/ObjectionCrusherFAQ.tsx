import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
const translations = {
  sectionTitle: {
    en: 'Frequently Asked Questions',
    hi: 'अक्सर पूछे जाने वाले प्रश्न',
    sa: 'प्रायः पृच्छ्यमानाः प्रश्नाः'
  },
  subtitle: {
    en: 'Everything you need to know before joining',
    hi: 'शामिल होने से पहले आपको जो कुछ भी जानने की जरूरत है',
    sa: 'सम्मिलनात् पूर्वं भवद्भ्यः ज्ञातव्यं सर्वम्'
  },
  faq1Q: {
    en: 'What language are classes conducted in?',
    hi: 'कक्षाएं किस भाषा में संचालित होती हैं?',
    sa: 'कक्षाः कया भाषया सञ्चाल्यन्ते?'
  },
  faq1A: {
    en: 'Classes are conducted in simple Hindi + English mix so children easily understand concepts.',
    hi: 'कक्षाएं सरल हिंदी + अंग्रेजी मिश्रण में आयोजित की जाती हैं ताकि बच्चे आसानी से अवधारणाओं को समझ सकें।',
    sa: 'कक्षाः सरलहिन्दी + आंग्लभाषामिश्रणेन सञ्चाल्यन्ते येन बालकाः सुलभतया अवधारणाः अवगच्छन्ति।'
  },
  faq2Q: {
    en: 'Are recordings available?',
    hi: 'क्या रिकॉर्डिंग उपलब्ध है?',
    sa: 'किम् अभिलेखाः उपलभ्यन्ते?'
  },
  faq2A: {
    en: 'Yes. All live sessions are recorded and provided for revision.',
    hi: 'हां। सभी लाइव सत्र रिकॉर्ड किए जाते हैं और पुनरावृत्ति के लिए प्रदान किए जाते हैं।',
    sa: 'आम्। सर्वाणि प्रत्यक्षसत्राणि अभिलिख्यन्ते पुनरावृत्त्यर्थं च प्रदीयन्ते।'
  },
  faq3Q: {
    en: 'What if my child misses a class?',
    hi: 'अगर मेरा बच्चा कक्षा छोड़ दे तो क्या होगा?',
    sa: 'यदि मम सन्तानः कक्षां त्यजति तर्हि किम्?'
  },
  faq3A: {
    en: 'Your child can watch the recording and also receive mentor guidance for missed topics.',
    hi: 'आपका बच्चा रिकॉर्डिंग देख सकता है और छूटे हुए विषयों के लिए मेंटर मार्गदर्शन भी प्राप्त कर सकता है।',
    sa: 'भवतः सन्तानः अभिलेखं द्रष्टुं शक्नोति त्यक्तविषयेषु च गुरुमार्गदर्शनम् अपि प्राप्नोति।'
  },
  faq4Q: {
    en: 'Will this affect school studies?',
    hi: 'क्या इससे स्कूल की पढ़ाई प्रभावित होगी?',
    sa: 'किम् एतेन विद्यालयाध्ययनं प्रभावितं भविष्यति?'
  },
  faq4A: {
    en: 'No. Bodhika improves focus, discipline and learning habits which often help school performance.',
    hi: 'नहीं। बोधिका ध्यान, अनुशासन और सीखने की आदतों में सुधार करती है जो अक्सर स्कूल प्रदर्शन में मदद करती हैं।',
    sa: 'न। बोधिका ध्यानम् अनुशासनं शिक्षणाभ्यासांश्च सुधारयति ये प्रायः विद्यालयप्रदर्शने साहाय्यं कुर्वन्ति।'
  },
  faq5Q: {
    en: 'Is this suitable for beginners with no background?',
    hi: 'क्या यह बिना किसी पृष्ठभूमि के शुरुआती लोगों के लिए उपयुक्त है?',
    sa: 'किम् एतत् पृष्ठभूमिविहीनानां नवागतानां कृते उपयुक्तम्?'
  },
  faq5A: {
    en: 'Yes. Bodhika is designed for absolute beginners. No prior knowledge is required.',
    hi: 'हां। बोधिका पूर्ण शुरुआती लोगों के लिए डिज़ाइन की गई है। कोई पूर्व ज्ञान आवश्यक नहीं है।',
    sa: 'आम्। बोधिका पूर्णनवागतानां कृते निर्मिता। न पूर्वज्ञानम् आवश्यकम्।'
  },
  faq6Q: {
    en: 'Is there any exam or pressure?',
    hi: 'क्या कोई परीक्षा या दबाव है?',
    sa: 'किम् काचित् परीक्षा दबावो वा अस्ति?'
  },
  faq6A: {
    en: 'No exams. No competition. No force. Learning is experience-based.',
    hi: 'कोई परीक्षा नहीं। कोई प्रतिस्पर्धा नहीं। कोई दबाव नहीं। सीखना अनुभव-आधारित है।',
    sa: 'न परीक्षा। न प्रतिस्पर्धा। न बलात्कारः। अधिगमः अनुभवाधारितः।'
  }
};
const ObjectionCrusherFAQ = () => {
  const {
    t
  } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [{
    q: t(translations.faq1Q),
    a: t(translations.faq1A)
  }, {
    q: t(translations.faq2Q),
    a: t(translations.faq2A)
  }, {
    q: t(translations.faq3Q),
    a: t(translations.faq3A)
  }, {
    q: t(translations.faq4Q),
    a: t(translations.faq4A)
  }, {
    q: t(translations.faq5Q),
    a: t(translations.faq5A)
  }, {
    q: t(translations.faq6Q),
    a: t(translations.faq6A)
  }];
  return <section className="py-10 sm:py-14 md:py-20 bg-cream/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <Badge className="bg-saffron/10 text-saffron border-saffron/20 mb-3 sm:mb-4 px-3 sm:px-4 py-1.5">
            <HelpCircle className="h-3 w-3 mr-1" />
            FAQ
          </Badge>
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3">
            {t(translations.sectionTitle)}
          </h2>
          <p className="font-body text-muted-foreground text-sm sm:text-base">
            {t(translations.subtitle)}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          {faqs.map((faq, idx) => <div key={idx} className="border border-border rounded-xl overflow-hidden bg-card shadow-sm">
              <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full p-4 sm:p-5 md:p-6 flex items-center justify-between text-left hover:bg-cream/50 transition-colors">there any exam or pressure?<span className="font-heading font-semibold text-foreground pr-4 text-sm sm:text-base leading-tight">
                  {faq.q}
                </span>
                <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform shrink-0", openIndex === idx && "rotate-180")} />
              </button>
              
              <div className={cn("overflow-hidden transition-all duration-300", openIndex === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
                <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-0">
                  <p className="font-body text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default ObjectionCrusherFAQ;