import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const translations = {
  sectionTitle: {
    en: 'Questions? Answered.',
    hi: 'प्रश्न? उत्तर दिए गए।',
    sa: 'प्रश्नाः? उत्तराणि।'
  },
  subtitle: {
    en: 'Everything you need to know before joining',
    hi: 'शामिल होने से पहले आपको जो कुछ भी जानने की जरूरत है',
    sa: 'सम्मिलनात् पूर्वं भवद्भ्यः ज्ञातव्यं सर्वम्'
  },
  faq1Q: {
    en: 'Why only 70 seats?',
    hi: 'केवल 70 सीटें क्यों?',
    sa: 'केवलं सप्ततिः आसनानि किमर्थम्?'
  },
  faq1A: {
    en: "Deep Shastric learning requires a focused environment. We limit the cohort to ensure the quality of the energy and the depth of the interaction. Every child deserves personal attention, and we refuse to compromise on that.",
    hi: 'गहन शास्त्रीय शिक्षा के लिए एक केंद्रित वातावरण की आवश्यकता होती है। हम ऊर्जा की गुणवत्ता और बातचीत की गहराई सुनिश्चित करने के लिए समूह को सीमित करते हैं। हर बच्चा व्यक्तिगत ध्यान का हकदार है, और हम इससे समझौता करने से इनकार करते हैं।',
    sa: 'गहनशास्त्राधिगमाय एकाग्रवातावरणम् आवश्यकम्। ऊर्जायाः गुणवत्तां संवादस्य च गहनतां सुनिश्चितुं वयं समूहं सीमयामः। प्रत्येकबालकः व्यक्तिगतावधानम् अर्हति, वयं तस्मिन् समझौतं न कुर्मः।'
  },
  faq2Q: {
    en: 'I am a beginner. Is this for me?',
    hi: 'मैं शुरुआती हूं। क्या यह मेरे लिए है?',
    sa: 'अहं नवागतः। किम् एतत् मम कृते?'
  },
  faq2A: {
    en: "Yes. Bodhika is designed to take your child from 'scattered' to 'structured,' regardless of their starting point. We meet each child where they are and guide them step-by-step on this transformative journey.",
    hi: 'हां। बोधिका आपके बच्चे को "बिखरे हुए" से "संरचित" तक ले जाने के लिए डिज़ाइन किया गया है, उनके शुरुआती बिंदु की परवाह किए बिना। हम प्रत्येक बच्चे से वहां मिलते हैं जहां वे हैं और इस परिवर्तनकारी यात्रा में उन्हें कदम-दर-कदम मार्गदर्शन करते हैं।',
    sa: 'आम्। बोधिका भवतः सन्तानं "विक्षिप्तात्" "संरचितम्" प्रति नेतुं निर्मिता, तेषाम् आरम्भबिन्दोः निरपेक्षम्। वयं प्रत्येकं बालकं यत्र सः अस्ति तत्र मिलामः अस्मिन् परिवर्तनात्मकयात्रायां पदे पदे मार्गदर्शयामः च।'
  },
  faq3Q: {
    en: 'How much time is required daily?',
    hi: 'दैनिक कितना समय चाहिए?',
    sa: 'दैनिकं कियत्कालः आवश्यकः?'
  },
  faq3A: {
    en: "We focus on integration, not just more study. 20-30 minutes of intentional practice is all you need to see the shift. Quality over quantity—this is the Shastric way of learning that creates lasting transformation.",
    hi: 'हम एकीकरण पर ध्यान केंद्रित करते हैं, न कि केवल अधिक अध्ययन पर। बदलाव देखने के लिए आपको बस 20-30 मिनट के जानबूझकर अभ्यास की जरूरत है। मात्रा से अधिक गुणवत्ता—यह शास्त्रीय सीखने का तरीका है जो स्थायी परिवर्तन बनाता है।',
    sa: 'वयं एकीकरणे ध्यानं दद्मः, न केवलं अधिकाध्ययने। परिवर्तनं द्रष्टुं २०-३० निमेषाणां सोद्देश्याभ्यासः पर्याप्तः। मात्रातः गुणवत्ता श्रेष्ठा—एतत् शास्त्रीयाधिगमस्य मार्गः यः स्थायिपरिवर्तनं रचयति।'
  },
};

const ObjectionCrusherFAQ = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    { q: t(translations.faq1Q), a: t(translations.faq1A) },
    { q: t(translations.faq2Q), a: t(translations.faq2A) },
    { q: t(translations.faq3Q), a: t(translations.faq3A) },
  ];
  
  return (
    <section className="py-20 bg-cream/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-saffron/10 text-saffron border-saffron/20 mb-4">
            <HelpCircle className="h-3 w-3 mr-1" />
            FAQ
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            {t(translations.sectionTitle)}
          </h2>
          <p className="font-body text-muted-foreground">
            {t(translations.subtitle)}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-border rounded-xl overflow-hidden bg-card shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-cream/50 transition-colors"
              >
                <span className="font-heading font-semibold text-foreground pr-4">
                  {faq.q}
                </span>
                <ChevronDown 
                  className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                    openIndex === idx && "rotate-180"
                  )} 
                />
              </button>
              
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="px-6 pb-6 pt-0">
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ObjectionCrusherFAQ;
