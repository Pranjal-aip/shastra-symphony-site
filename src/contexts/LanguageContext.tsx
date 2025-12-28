import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'sa';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (translations: Translations) => string;
}

interface Translations {
  en: string;
  hi: string;
  sa: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const languageLabels: Record<Language, string> = {
  en: 'English',
  hi: 'हिन्दी',
  sa: 'संस्कृतम्',
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('shastrakulam-language');
    return (stored as Language) || 'en';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('shastrakulam-language', lang);
  }, []);

  const t = useCallback((translations: Translations): string => {
    return translations[language] || translations.en;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Common translations
export const translations = {
  nav: {
    home: { en: 'Home', hi: 'होम', sa: 'गृहम्' },
    courses: { en: 'Courses', hi: 'पाठ्यक्रम', sa: 'पाठ्यक्रमाः' },
    blog: { en: 'Blog', hi: 'ब्लॉग', sa: 'लेखाः' },
    about: { en: 'About', hi: 'परिचय', sa: 'परिचयः' },
    programs: { en: 'Programs', hi: 'कार्यक्रम', sa: 'कार्यक्रमाः' },
    camps: { en: 'Camps', hi: 'शिविर', sa: 'शिविराणि' },
    contact: { en: 'Contact', hi: 'संपर्क', sa: 'सम्पर्कः' },
    enrollNow: { en: 'Enroll Now', hi: 'नामांकन करें', sa: 'नामाङ्कनम्' },
  },
  hero: {
    headline: {
      en: 'Shastrakulam – Holistic Education Based on Sanskar, Shastra & Sanskrit',
      hi: 'शास्त्रकुलम् – संस्कार, शास्त्र और संस्कृत पर आधारित समग्र शिक्षा',
      sa: 'शास्त्रकुलम् – संस्कारशास्त्रसंस्कृतनिष्ठा समग्रशिक्षा',
    },
    subheadline: {
      en: 'Offering Sanskrit-centric courses, full-time gurukul schooling, and immersive camps for children and seekers of all ages.',
      hi: 'बच्चों और साधकों के लिए संस्कृत-केंद्रित पाठ्यक्रम, पूर्णकालिक गुरुकुल विद्यालय और शिविर।',
      sa: 'बालकेभ्यः साधकेभ्यश्च संस्कृतकेन्द्रितपाठ्यक्रमाः पूर्णकालिकगुरुकुलविद्यालयाः शिविराणि च।',
    },
    exploreCourses: { en: 'Explore Courses', hi: 'पाठ्यक्रम देखें', sa: 'पाठ्यक्रमान् पश्यत' },
    whatsappCta: { en: 'Talk on WhatsApp', hi: 'WhatsApp पर बात करें', sa: 'WhatsApp माध्यमेन वार्ता' },
  },
  sections: {
    popularCourses: { en: 'Popular Courses', hi: 'लोकप्रिय पाठ्यक्रम', sa: 'प्रसिद्धपाठ्यक्रमाः' },
    allPrograms: { en: 'Our Programs', hi: 'हमारे कार्यक्रम', sa: 'अस्माकं कार्यक्रमाः' },
    whyShastrakulam: { en: 'Why Shastrakulam?', hi: 'शास्त्रकुलम् क्यों?', sa: 'शास्त्रकुलं किमर्थम्?' },
    latestWisdom: { en: 'Latest Wisdom', hi: 'नवीनतम ज्ञान', sa: 'नूतनज्ञानम्' },
    testimonials: { en: 'What Parents & Students Say', hi: 'अभिभावक और छात्र क्या कहते हैं', sa: 'पितरः छात्राश्च किं वदन्ति' },
    viewDetails: { en: 'View Details', hi: 'विवरण देखें', sa: 'विवरणं पश्यत' },
    readMore: { en: 'Read More', hi: 'और पढ़ें', sa: 'अधिकं पठत' },
    knowMore: { en: 'Know More', hi: 'और जानें', sa: 'अधिकं जानीत' },
  },
  programs: {
    onlineCourses: {
      title: { en: 'Online Courses', hi: 'ऑनलाइन पाठ्यक्रम', sa: 'अन्तर्जालपाठ्यक्रमाः' },
      desc: {
        en: 'Learn Sanskrit, Shastras, and Vedic wisdom from home with expert guidance.',
        hi: 'विशेषज्ञ मार्गदर्शन में घर बैठे संस्कृत, शास्त्र और वैदिक ज्ञान सीखें।',
        sa: 'गृहात् एव विशेषज्ञमार्गदर्शनेन संस्कृतं शास्त्राणि वैदिकज्ञानं च अधिगच्छत।',
      },
    },
    gurukul: {
      title: { en: 'Full-time Gurukul', hi: 'पूर्णकालिक गुरुकुल', sa: 'पूर्णकालिकगुरुकुलम्' },
      desc: {
        en: 'Immersive residential education in a traditional, home-like environment.',
        hi: 'पारंपरिक, घर जैसे वातावरण में पूर्ण आवासीय शिक्षा।',
        sa: 'पारम्परिकगृहतुल्यवातावरणे पूर्णावासीयशिक्षा।',
      },
    },
    camps: {
      title: { en: 'Seasonal Camps', hi: 'सत्रीय शिविर', sa: 'ऋतुशिविराणि' },
      desc: {
        en: 'Short-term workshops and camps for Sanskrit, yoga, and cultural immersion.',
        hi: 'संस्कृत, योग और सांस्कृतिक विसर्जन के लिए अल्पकालिक कार्यशालाएं।',
        sa: 'संस्कृतयोगसंस्कृतिनिमज्जनार्थम् अल्पकालिककार्यशालाः।',
      },
    },
  },
  whyUs: {
    authentic: {
      title: { en: 'Authentic Vedic Curriculum', hi: 'प्रामाणिक वैदिक पाठ्यक्रम', sa: 'प्रामाणिकवैदिकपाठ्यक्रमः' },
      desc: { en: 'Rooted in scriptures with modern pedagogy', hi: 'शास्त्रों में निहित, आधुनिक शिक्षण पद्धति', sa: 'शास्त्रेषु निहितः आधुनिकशिक्षणपद्धत्या सह' },
    },
    childCentric: {
      title: { en: 'Child-Centric Pedagogy', hi: 'बाल-केंद्रित शिक्षण', sa: 'बालकेन्द्रितशिक्षणम्' },
      desc: { en: 'Joyful, activity-based learning', hi: 'आनंदमय, गतिविधि-आधारित शिक्षा', sa: 'आनन्दमयी क्रियाधारितशिक्षा' },
    },
    sanskrit: {
      title: { en: 'Sanskrit Immersion', hi: 'संस्कृत विसर्जन', sa: 'संस्कृतनिमज्जनम्' },
      desc: { en: 'Learn to speak, read, and think in Sanskrit', hi: 'संस्कृत में बोलना, पढ़ना और सोचना सीखें', sa: 'संस्कृते वक्तुं पठितुं चिन्तयितुं च शिक्षध्वम्' },
    },
    flexible: {
      title: { en: 'Online + Camps', hi: 'ऑनलाइन + शिविर', sa: 'अन्तर्जालं शिविराणि च' },
      desc: { en: 'Flexible formats for every family', hi: 'हर परिवार के लिए लचीले विकल्प', sa: 'सर्वेषां कुटुम्बानां कृते लचीलाः विकल्पाः' },
    },
    homeLike: {
      title: { en: 'Home-like Gurukul', hi: 'घर जैसा गुरुकुल', sa: 'गृहतुल्यं गुरुकुलम्' },
      desc: { en: 'Nurturing environment for holistic growth', hi: 'समग्र विकास के लिए पोषक वातावरण', sa: 'समग्रविकासार्थं पोषकवातावरणम्' },
    },
  },
  footer: {
    tagline: {
      en: 'Nurturing minds through timeless wisdom and Sanskrit traditions.',
      hi: 'शाश्वत ज्ञान और संस्कृत परंपराओं के माध्यम से मन का पोषण।',
      sa: 'शाश्वतज्ञानेन संस्कृतपरम्पराभिश्च मनसः पोषणम्।',
    },
    quickLinks: { en: 'Quick Links', hi: 'त्वरित लिंक', sa: 'द्रुतसम्पर्काः' },
    contactUs: { en: 'Contact Us', hi: 'संपर्क करें', sa: 'सम्पर्कं कुरुत' },
    newsletter: { en: 'Newsletter', hi: 'समाचार पत्र', sa: 'समाचारपत्रम्' },
    subscribe: { en: 'Subscribe', hi: 'सदस्यता लें', sa: 'सदस्यतां गृह्णातु' },
    enterEmail: { en: 'Enter your email', hi: 'अपना ईमेल दर्ज करें', sa: 'स्व ईमेल प्रविशतु' },
    rights: { en: 'All rights reserved.', hi: 'सर्वाधिकार सुरक्षित।', sa: 'सर्वाधिकाराः सुरक्षिताः।' },
  },
};
