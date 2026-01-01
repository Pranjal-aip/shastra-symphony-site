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
    en: 'Why only limited seats?',
    hi: 'सीमित सीटें क्यों?',
    sa: 'सीमितानि आसनानि किमर्थम्?'
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
  faq4Q: {
    en: 'What age group is Bodhika suitable for?',
    hi: 'बोधिका किस आयु वर्ग के लिए उपयुक्त है?',
    sa: 'बोधिका कस्मै वयोवर्गाय उपयुक्ता?'
  },
  faq4A: {
    en: "Bodhika is designed for children aged 6-16 years. Our curriculum adapts to different developmental stages, ensuring age-appropriate content and engagement methods for each child.",
    hi: 'बोधिका 6-16 वर्ष की आयु के बच्चों के लिए डिज़ाइन किया गया है। हमारा पाठ्यक्रम विभिन्न विकासात्मक चरणों के अनुसार अनुकूलित होता है, प्रत्येक बच्चे के लिए आयु-उपयुक्त सामग्री और जुड़ाव के तरीके सुनिश्चित करता है।',
    sa: '६-१६ वर्षीयानां बालानां कृते बोधिका निर्मिता। अस्माकं पाठ्यक्रमः विविधविकासस्तरेषु अनुकूलते, प्रत्येकं बालकाय वयसि उचितां सामग्रीं संलग्नताप्रकारांश्च सुनिश्चितयति।'
  },
  faq5Q: {
    en: 'Are classes live or pre-recorded?',
    hi: 'कक्षाएं लाइव हैं या पूर्व-रिकॉर्डेड?',
    sa: 'कक्षाः प्रत्यक्षाः वा पूर्वाभिलिखिताः वा?'
  },
  faq5A: {
    en: "All our classes are 100% LIVE with real-time interaction. We believe transformation happens through direct connection, not passive consumption. Your child can ask questions, participate in discussions, and receive immediate guidance.",
    hi: 'हमारी सभी कक्षाएं वास्तविक समय की बातचीत के साथ 100% लाइव हैं। हमारा मानना है कि परिवर्तन प्रत्यक्ष संबंध से होता है, निष्क्रिय उपभोग से नहीं। आपका बच्चा सवाल पूछ सकता है, चर्चाओं में भाग ले सकता है, और तत्काल मार्गदर्शन प्राप्त कर सकता है।',
    sa: 'अस्माकं सर्वाः कक्षाः प्रत्यक्षसंवादेन सह १००% प्रत्यक्षाः। वयं मन्यामहे परिवर्तनं प्रत्यक्षसम्बन्धेन भवति, निष्क्रियोपभोगेन न। भवतः सन्तानः प्रश्नान् पृच्छितुं चर्चासु भागं ग्रहीतुं तात्कालिकं मार्गदर्शनं प्राप्तुं च शक्नोति।'
  },
  faq6Q: {
    en: 'What if my child misses a class?',
    hi: 'अगर मेरा बच्चा कक्षा छोड़ दे तो क्या होगा?',
    sa: 'यदि मम सन्तानः कक्षां त्यजति तर्हि किम्?'
  },
  faq6A: {
    en: "We understand life happens. If your child misses a class, they'll have access to the session recording for a limited time. However, we encourage live attendance as the real magic happens in the moment of learning together.",
    hi: 'हम समझते हैं कि जीवन में कुछ भी हो सकता है। यदि आपका बच्चा कक्षा छोड़ देता है, तो उनके पास सीमित समय के लिए सत्र रिकॉर्डिंग तक पहुंच होगी। हालांकि, हम लाइव उपस्थिति को प्रोत्साहित करते हैं क्योंकि असली जादू एक साथ सीखने के क्षण में होता है।',
    sa: 'वयं अवगच्छामः जीवने किमपि भवितुम् अर्हति। यदि भवतः सन्तानः कक्षां त्यजति, तेषां समीपे सीमितकालाय सत्राभिलेखः भविष्यति। तथापि वयं प्रत्यक्षोपस्थितिं प्रोत्साहयामः यतः वास्तविकं माधुर्यं सहाध्ययनस्य क्षणे भवति।'
  },
  faq7Q: {
    en: 'Is there a refund policy?',
    hi: 'क्या वापसी नीति है?',
    sa: 'किम् प्रतिदाननीतिः अस्ति?'
  },
  faq7A: {
    en: "We offer a 7-day Clarity Guarantee. If you don't see a measurable shift in your child's engagement and clarity within the first 7 days, we'll personally work with you to address any gaps—your transformation is our commitment.",
    hi: 'हम 7-दिवसीय स्पष्टता गारंटी प्रदान करते हैं। यदि आप पहले 7 दिनों के भीतर अपने बच्चे की व्यस्तता और स्पष्टता में मापनीय बदलाव नहीं देखते हैं, तो हम व्यक्तिगत रूप से किसी भी अंतर को दूर करने के लिए आपके साथ काम करेंगे—आपका परिवर्तन हमारी प्रतिबद्धता है।',
    sa: 'वयं ७-दिवसीयं स्पष्टताप्रत्याभूतिं प्रयच्छामः। यदि भवान् प्रथमेषु ७ दिनेषु भवतः सन्तानस्य संलग्नतायां स्पष्टतायां च मापनीयं परिवर्तनं न पश्यति, वयं व्यक्तिगतरूपेण भवता सह कार्यं करिष्यामः—भवतः परिवर्तनम् अस्माकं प्रतिबद्धता।'
  },
  faq8Q: {
    en: 'What technology/device is needed?',
    hi: 'कौन सी तकनीक/उपकरण की आवश्यकता है?',
    sa: 'का प्रौद्योगिकी/उपकरणं आवश्यकम्?'
  },
  faq8A: {
    en: "A laptop, tablet, or smartphone with stable internet connection and Zoom installed is all you need. We recommend a larger screen for better engagement, but it's not mandatory.",
    hi: 'स्थिर इंटरनेट कनेक्शन और Zoom इंस्टॉल के साथ एक लैपटॉप, टैबलेट, या स्मार्टफोन आपको बस इतना ही चाहिए। हम बेहतर जुड़ाव के लिए एक बड़ी स्क्रीन की सलाह देते हैं, लेकिन यह अनिवार्य नहीं है।',
    sa: 'स्थिरान्तर्जालसम्बन्धेन Zoom-स्थापनेन च सह लैपटॉप्, टैबलेट्, वा स्मार्टफोनं भवद्भ्यः पर्याप्तम्। श्रेष्ठसंलग्नताय बृहत्तरं पटलं शंसामः, किन्तु अनिवार्यं नास्ति।'
  },
};

const ObjectionCrusherFAQ = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    { q: t(translations.faq1Q), a: t(translations.faq1A) },
    { q: t(translations.faq2Q), a: t(translations.faq2A) },
    { q: t(translations.faq3Q), a: t(translations.faq3A) },
    { q: t(translations.faq4Q), a: t(translations.faq4A) },
    { q: t(translations.faq5Q), a: t(translations.faq5A) },
    { q: t(translations.faq6Q), a: t(translations.faq6A) },
    { q: t(translations.faq7Q), a: t(translations.faq7A) },
    { q: t(translations.faq8Q), a: t(translations.faq8A) },
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
