import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  BookOpen, 
  Users, 
  Clock, 
  CheckCircle2, 
  X,
  Calendar,
  Phone,
  ArrowRight,
  Flame,
  Video,
  Heart,
  Target,
  Brain,
  Shield,
  MessageCircle,
  GraduationCap,
  Compass,
  Eye,
  RefreshCw,
  Lightbulb,
  Sparkles,
  Star,
  Award,
  Zap
} from 'lucide-react';

// Import images
import heroGurukul from '@/assets/bodhika/hero-gurukul.jpg';
import heroCulture from '@/assets/bodhika/hero-culture.jpg';
import heroMeditation from '@/assets/bodhika/hero-meditation.jpg';

// Import floating button components (preserved as-is)
import StickyMobileFooter from '@/components/bodhika/StickyMobileFooter';
import BodhikaEnrollmentForm from '@/components/bodhika/BodhikaEnrollmentForm';

// WhatsApp Number
const WHATSAPP_NUMBER = '919674916567';

// Scroll helper
const scrollToPricing = () => {
  document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// ============================================
// ALL PAGE TRANSLATIONS
// ============================================
const pageTranslations = {
  // Hero Section
  hero: {
    badge: {
      en: 'For Children Aged 6–12 Years',
      hi: '6-12 वर्ष के बच्चों के लिए',
      sa: '६-१२ वर्षीयबालकेभ्यः'
    },
    headline: {
      en: 'A 1-Year Live Program to Build',
      hi: '1-वर्षीय लाइव कार्यक्रम',
      sa: 'एकवर्षीयं प्रत्यक्षकार्यक्रमम्'
    },
    headlineHighlight: {
      en: 'Focus, Discipline',
      hi: 'एकाग्रता, अनुशासन',
      sa: 'एकाग्रता, अनुशासनम्'
    },
    headlineEnd: {
      en: '& Indian Value-Based Understanding',
      hi: 'और भारतीय मूल्य-आधारित समझ विकसित करने के लिए',
      sa: 'भारतीयमूल्याधारितबोधश्च'
    },
    subheadline: {
      en: 'For parents who believe that education without values leads to information, not clarity or character.',
      hi: 'उन माता-पिता के लिए जो मानते हैं कि मूल्यों के बिना शिक्षा जानकारी देती है, स्पष्टता या चरित्र नहीं।',
      sa: 'येषां पितॄणां विश्वासः यत् मूल्यैः विना शिक्षा सूचनां ददाति न तु स्पष्टतां चरित्रं वा।'
    },
    ctaPrimary: {
      en: 'Attend the Free Parent Orientation',
      hi: 'नि:शुल्क अभिभावक उन्मुखीकरण में भाग लें',
      sa: 'निःशुल्कपितृउन्मुखीकरणे भागं गृह्णातु'
    },
    ctaSecondary: {
      en: 'View Batch Options',
      hi: 'बैच विकल्प देखें',
      sa: 'समूहविकल्पान् पश्यतु'
    },
    ctaNote: {
      en: 'Orientation is for understanding the approach. Enrollment is optional.',
      hi: 'उन्मुखीकरण दृष्टिकोण को समझने के लिए है। नामांकन वैकल्पिक है।',
      sa: 'उन्मुखीकरणं दृष्टिकोणबोधाय। नामाङ्कनम् ऐच्छिकम्।'
    },
    scholarshipBtn: {
      en: 'Scholarship for Needy Families',
      hi: 'जरूरतमंद परिवारों के लिए छात्रवृत्ति',
      sa: 'आवश्यककुटुम्बेभ्यः छात्रवृत्तिः'
    },
    scholarshipMsg: {
      en: 'Hi! I am interested in applying for a scholarship for Bodhika program.',
      hi: 'नमस्ते! मैं बोधिका कार्यक्रम की छात्रवृत्ति के लिए आवेदन करने में रुचि रखता/रखती हूं।',
      sa: 'नमस्ते! अहं बोधिकाकार्यक्रमस्य छात्रवृत्त्यर्थम् आवेदनार्थं इच्छामि।'
    }
  },
  // Program Info Strip
  programInfo: {
    duration: { en: '12 Months', hi: '12 महीने', sa: '१२ मासाः' },
    mode: { en: '100% Live', hi: '100% लाइव', sa: '१००% प्रत्यक्षम्' },
    age: { en: 'Age 6–12', hi: 'आयु 6-12', sa: 'आयुः ६-१२' },
    values: { en: 'Indian Values', hi: 'भारतीय मूल्य', sa: 'भारतीयमूल्यानि' },
    batches: { en: '2 Batches', hi: '2 बैच', sa: '२ समूहौ' }
  },
  // Filtering Section
  filtering: {
    badge: { en: 'Intentional Filtering', hi: 'जानबूझकर छानबीन', sa: 'जानबूझकरछानबीनम्' },
    title: { en: 'Who This Program Is For', hi: 'यह कार्यक्रम किसके लिए है', sa: 'एषः कार्यक्रमः कस्मै' },
    subtitle: {
      en: 'This program is not for everyone. Please read carefully before considering enrollment.',
      hi: 'यह कार्यक्रम सभी के लिए नहीं है। नामांकन पर विचार करने से पहले कृपया ध्यान से पढ़ें।',
      sa: 'एषः कार्यक्रमः सर्वेभ्यः नास्ति। नामाङ्कनात् पूर्वं कृपया सावधानतया पठतु।'
    },
    isForTitle: { en: 'This Program IS For', hi: 'यह कार्यक्रम इनके लिए है', sa: 'एषः कार्यक्रमः एतेभ्यः' },
    isNotForTitle: { en: 'This Program Is NOT For', hi: 'यह कार्यक्रम इनके लिए नहीं है', sa: 'एषः कार्यक्रमः एतेभ्यः नास्ति' },
    isFor: [
      { en: 'Parents who want their children to understand the meaning behind Indian traditions, not just follow rituals', hi: 'माता-पिता जो चाहते हैं कि उनके बच्चे भारतीय परंपराओं के पीछे के अर्थ को समझें, न कि केवल रीति-रिवाजों का पालन करें', sa: 'ये पितरः इच्छन्ति यत् तेषां बालकाः भारतीयपरम्पराणाम् अर्थं बुध्यन्ते न तु केवलं रीतिरिवाजान् अनुसरन्ति' },
      { en: 'Parents who feel modern schooling develops skills but not clarity of thinking or internal discipline', hi: 'माता-पिता जो महसूस करते हैं कि आधुनिक स्कूली शिक्षा कौशल विकसित करती है लेकिन सोच की स्पष्टता या आंतरिक अनुशासन नहीं', sa: 'ये पितरः अनुभवन्ति यत् आधुनिकविद्यालयशिक्षा कौशलानि विकसयति किन्तु न चिन्तनस्य स्पष्टतां न आन्तरिकम् अनुशासनम्' },
      { en: 'Parents seeking a structured, long-term approach to values — not weekend crash courses', hi: 'माता-पिता जो मूल्यों के लिए एक संरचित, दीर्घकालिक दृष्टिकोण चाहते हैं — सप्ताहांत क्रैश कोर्स नहीं', sa: 'ये पितरः मूल्यानां कृते संरचितं दीर्घकालिकं दृष्टिकोणम् इच्छन्ति — सप्ताहान्तक्रैशपाठ्यक्रमान् न' },
      { en: 'Parents who value emotional regulation, right-wrong discernment, and cultural confidence', hi: 'माता-पिता जो भावनात्मक नियंत्रण, सही-गलत की समझ और सांस्कृतिक आत्मविश्वास को महत्व देते हैं', sa: 'ये पितरः भावनात्मकनियन्त्रणं धर्माधर्मविवेकं सांस्कृतिकआत्मविश्वासं च बहुमन्यन्ते' },
      { en: 'Parents willing to support their child\'s learning through occasional parent alignment sessions', hi: 'माता-पिता जो कभी-कभार अभिभावक संरेखण सत्रों के माध्यम से अपने बच्चे की शिक्षा का समर्थन करने के लिए तैयार हैं', sa: 'ये पितरः कदाचित् पितृसंरेखणसत्राणां माध्यमेन स्वबालकस्य शिक्षणस्य समर्थनार्थम् उद्यताः' }
    ],
    isNotFor: [
      { en: 'Parents looking for quick results or instant transformation', hi: 'माता-पिता जो त्वरित परिणाम या तुरंत परिवर्तन चाहते हैं', sa: 'ये पितरः त्वरितफलानि तात्कालिकपरिवर्तनं वा इच्छन्ति' },
      { en: 'Parents who want religious preaching rather than developmental education', hi: 'माता-पिता जो विकासात्मक शिक्षा के बजाय धार्मिक उपदेश चाहते हैं', sa: 'ये पितरः विकासात्मकशिक्षणात् धार्मिकोपदेशम् इच्छन्ति' },
      { en: 'Parents who expect content consumption without habit formation or reflection', hi: 'माता-पिता जो आदत निर्माण या चिंतन के बिना सामग्री उपभोग की अपेक्षा करते हैं', sa: 'ये पितरः आदतनिर्माणं चिन्तनं विना सामग्रीउपभोगम् अपेक्षन्ते' },
      { en: 'Parents unwilling to participate in occasional parent sessions', hi: 'माता-पिता जो कभी-कभार अभिभावक सत्रों में भाग लेने के लिए तैयार नहीं हैं', sa: 'ये पितरः कदाचित् पितृसत्रेषु भागं ग्रहीतुम् अनुद्यताः' },
      { en: 'Parents seeking entertainment-based learning without discipline or depth', hi: 'माता-पिता जो अनुशासन या गहराई के बिना मनोरंजन-आधारित शिक्षा चाहते हैं', sa: 'ये पितरः अनुशासनं गहनतां विना मनोरञ्जनाधारितशिक्षणम् इच्छन्ति' }
    ]
  },
  // Problem Section
  problem: {
    badge: { en: 'The Challenge', hi: 'चुनौती', sa: 'आह्वानम्' },
    title: { en: 'What Modern Parents Face', hi: 'आधुनिक माता-पिता किन समस्याओं का सामना करते हैं', sa: 'आधुनिकपितरः काः समस्याः अभिमुखीकुर्वन्ति' },
    para1: {
      en: 'Today\'s children are intelligent. They have access to information, screens, and opportunities. Yet many parents notice something',
      hi: 'आज के बच्चे बुद्धिमान हैं। उनके पास जानकारी, स्क्रीन और अवसरों तक पहुंच है। फिर भी कई माता-पिता कुछ',
      sa: 'अद्यत्वे बालकाः बुद्धिमन्तः। तेषां सूचनाः पटलानि अवसराः च उपलब्धाः। तथापि बहवः पितरः किञ्चित्'
    },
    missing: { en: 'missing', hi: 'कमी', sa: 'न्यूनताम्' },
    para2: {
      en: 'Children react emotionally without understanding why. They struggle to focus. They know facts but lack the',
      hi: 'बच्चे बिना समझे भावनात्मक रूप से प्रतिक्रिया करते हैं। उन्हें ध्यान केंद्रित करने में कठिनाई होती है। वे तथ्य जानते हैं लेकिन उनमें',
      sa: 'बालकाः कारणं अबोधयित्वा भावनात्मकतया प्रतिक्रियां कुर्वन्ति। ते एकाग्रतायां कष्टं अनुभवन्ति। ते तथ्यानि जानन्ति किन्तु तेषाम्'
    },
    internalCompass: { en: 'internal compass', hi: 'आंतरिक दिशासूचक की कमी है', sa: 'आन्तरिकदिक्सूचकः न्यूनः' },
    para3: {
      en: 'Modern education excels at skills. But it rarely develops',
      hi: 'आधुनिक शिक्षा कौशल में उत्कृष्ट है। लेकिन यह शायद ही कभी विकसित करती है',
      sa: 'आधुनिकशिक्षा कौशलेषु उत्कृष्टा। किन्तु एषा विरलं विकसयति'
    },
    clarity: { en: 'clarity of thinking', hi: 'सोच की स्पष्टता', sa: 'चिन्तनस्य स्पष्टताम्' },
    para3End: { en: ', emotional discipline, or a stable sense of right and wrong.', hi: ', भावनात्मक अनुशासन, या सही और गलत की स्थिर समझ।', sa: ', भावनात्मकम् अनुशासनं वा धर्माधर्मस्य स्थिरं ज्ञानम्।' },
    approachTitle: { en: 'The Indian Approach', hi: 'भारतीय दृष्टिकोण', sa: 'भारतीयदृष्टिकोणः' },
    approachText: {
      en: 'Indian knowledge systems offer a different path — not as religious preaching, but as a developmental framework. A way to build clear thinking (buddhi), emotional regulation, and value anchoring through stories, reflection, and gradual habit formation. This is what Bodhika offers.',
      hi: 'भारतीय ज्ञान प्रणालियाँ एक अलग मार्ग प्रदान करती हैं — धार्मिक उपदेश के रूप में नहीं, बल्कि एक विकासात्मक ढांचे के रूप में। कथाओं, चिंतन और क्रमिक आदत निर्माण के माध्यम से स्पष्ट सोच (बुद्धि), भावनात्मक नियंत्रण और मूल्य स्थापना का एक तरीका। यही बोधिका प्रदान करती है।',
      sa: 'भारतीयज्ञानप्रणाल्यः भिन्नं मार्गं प्रयच्छन्ति — धार्मिकोपदेशरूपेण न किन्तु विकासात्मकसंरचनारूपेण। कथाभिः चिन्तनेन क्रमिकादतनिर्माणेन च स्पष्टचिन्तनस्य (बुद्धेः) भावनात्मकनियन्त्रणस्य मूल्यस्थापनस्य च मार्गः। एतत् बोधिका प्रयच्छति।'
    },
    devFramework: { en: 'developmental framework', hi: 'विकासात्मक ढांचा', sa: 'विकासात्मकसंरचना' }
  },
  // Outcomes Section
  outcomes: {
    badge: { en: 'Transformation Over Time', hi: 'समय के साथ परिवर्तन', sa: 'कालान्तरे परिवर्तनम्' },
    title: { en: 'What Your Child Will Develop Over One Year', hi: 'आपका बच्चा एक वर्ष में क्या विकसित करेगा', sa: 'एकस्मिन् वर्षे तव बालकः किं विकसयिष्यति' },
    subtitle: {
      en: 'These outcomes cannot be achieved in short courses. They require time, repetition, and gradual deepening.',
      hi: 'ये परिणाम छोटे पाठ्यक्रमों में प्राप्त नहीं किए जा सकते। इनके लिए समय, पुनरावृत्ति और क्रमिक गहनता की आवश्यकता होती है।',
      sa: 'एतानि फलानि लघुपाठ्यक्रमेषु प्राप्तुं न शक्यन्ते। एतेभ्यः कालः पुनरावृत्तिः क्रमिकगहनता च आवश्यकाः।'
    },
    items: [
      {
        title: { en: 'Clear Thinking (Buddhi)', hi: 'स्पष्ट सोच (बुद्धि)', sa: 'स्पष्टचिन्तनम् (बुद्धिः)' },
        description: { en: 'Children learn to think before reacting, developing the ability to analyze situations with clarity.', hi: 'बच्चे प्रतिक्रिया करने से पहले सोचना सीखते हैं, स्थितियों का स्पष्टता से विश्लेषण करने की क्षमता विकसित करते हैं।', sa: 'बालकाः प्रतिक्रियायाः पूर्वं चिन्तयितुं शिक्षन्ते, स्थितीनां स्पष्टतया विश्लेषणक्षमतां विकसयन्ति।' }
      },
      {
        title: { en: 'Emotional Discipline', hi: 'भावनात्मक अनुशासन', sa: 'भावनात्मकम् अनुशासनम्' },
        description: { en: 'Through stories and reflection, children develop the capacity to regulate their emotions thoughtfully.', hi: 'कथाओं और चिंतन के माध्यम से, बच्चे विचारपूर्वक अपनी भावनाओं को नियंत्रित करने की क्षमता विकसित करते हैं।', sa: 'कथाभिः चिन्तनेन च बालकाः विचारपूर्वकं स्वभावनाः नियन्त्रयितुं क्षमतां विकसयन्ति।' }
      },
      {
        title: { en: 'Right-Wrong Discernment', hi: 'सही-गलत की समझ', sa: 'धर्माधर्मविवेकः' },
        description: { en: 'Understanding dharma in daily life — distinguishing what is appropriate in different situations.', hi: 'दैनिक जीवन में धर्म को समझना — विभिन्न स्थितियों में क्या उचित है यह पहचानना।', sa: 'दैनिकजीवने धर्मस्य बोधः — विभिन्नस्थितिषु किम् उचितम् इति विवेचनम्।' }
      },
      {
        title: { en: 'Value Anchoring', hi: 'मूल्य स्थापना', sa: 'मूल्यस्थापनम्' },
        description: { en: 'Children develop an internal foundation of values that guides their decisions and relationships.', hi: 'बच्चे मूल्यों की एक आंतरिक नींव विकसित करते हैं जो उनके निर्णयों और संबंधों का मार्गदर्शन करती है।', sa: 'बालकाः मूल्यानाम् आन्तरिकम् आधारं विकसयन्ति यः तेषां निर्णयान् सम्बन्धांश्च मार्गदर्शयति।' }
      },
      {
        title: { en: 'Cultural Confidence', hi: 'सांस्कृतिक आत्मविश्वास', sa: 'सांस्कृतिक आत्मविश्वासः' },
        description: { en: 'A deep understanding of Indian traditions that allows children to engage with heritage with pride.', hi: 'भारतीय परंपराओं की गहरी समझ जो बच्चों को गर्व के साथ विरासत से जुड़ने की अनुमति देती है।', sa: 'भारतीयपरम्पराणां गहनबोधः येन बालकाः गौरवेण पैतृकसम्पदा सह सम्बध्यन्ते।' }
      }
    ]
  },
  // Batch Comparison Section
  batch: {
    badge: { en: 'Choose Your Batch', hi: 'अपना बैच चुनें', sa: 'स्वसमूहं चिनुत' },
    title: { en: 'Two Batch Options', hi: 'दो बैच विकल्प', sa: 'द्वौ समूहविकल्पौ' },
    subtitle: {
      en: 'The ideology and curriculum are the same in both batches. Only the depth of interaction differs.',
      hi: 'दोनों बैचों में विचारधारा और पाठ्यक्रम समान है। केवल बातचीत की गहराई भिन्न है।',
      sa: 'उभयोः समूहयोः विचारधारा पाठ्यक्रमश्च समानौ। केवलं परस्परक्रियायाः गहनता भिद्यते।'
    },
    groupTitle: { en: 'Group Live Batch', hi: 'ग्रुप लाइव बैच', sa: 'समूहप्रत्यक्षसमूहः' },
    groupDesc: { en: 'For parents seeking value-based education at accessible pricing', hi: 'सुलभ मूल्य पर मूल्य-आधारित शिक्षा चाहने वाले माता-पिता के लिए', sa: 'सुलभमूल्ये मूल्याधारितशिक्षाम् इच्छद्भ्यः पितृभ्यः' },
    groupPrice: { en: '₹6,000', hi: '₹6,000', sa: '₹६,०००' },
    perYear: { en: '/year', hi: '/वर्ष', sa: '/वर्षम्' },
    groupFeatures: [
      { en: 'Larger group sessions', hi: 'बड़े समूह सत्र', sa: 'वृहत्समूहसत्राणि' },
      { en: 'Weekly live classes', hi: 'साप्ताहिक लाइव कक्षाएं', sa: 'साप्ताहिकप्रत्यक्षकक्षाः' },
      { en: 'Story-based curriculum', hi: 'कथा-आधारित पाठ्यक्रम', sa: 'कथाधारितपाठ्यक्रमः' },
      { en: 'Standard parent updates', hi: 'मानक अभिभावक अपडेट', sa: 'मानकपितृअद्यतनानि' },
      { en: 'Group-based doubt resolution', hi: 'समूह-आधारित संदेह समाधान', sa: 'समूहाधारितसंशयनिवारणम्' }
    ],
    groupCTA: { en: 'Enroll in Group Batch', hi: 'ग्रुप बैच में नामांकन करें', sa: 'समूहसमूहे नामाङ्कनं कुरुत' },
    focusedTitle: { en: 'Focused Live Batch', hi: 'फोकस्ड लाइव बैच', sa: 'केन्द्रितप्रत्यक्षसमूहः' },
    focusedDesc: { en: 'For parents wanting personalized attention and deeper engagement', hi: 'व्यक्तिगत ध्यान और गहरी भागीदारी चाहने वाले माता-पिता के लिए', sa: 'व्यक्तिगतध्यानं गहनभागीदारीं च इच्छद्भ्यः पितृभ्यः' },
    focusedPrice: { en: '₹15,000', hi: '₹15,000', sa: '₹१५,०००' },
    recommended: { en: 'RECOMMENDED', hi: 'अनुशंसित', sa: 'अनुशंसितः' },
    focusedFeatures: [
      { en: 'Small group (12 students max)', hi: 'छोटा समूह (अधिकतम 12 छात्र)', sa: 'लघुसमूहः (अधिकतमं १२ छात्राः)' },
      { en: 'High interaction & personalization', hi: 'उच्च बातचीत और वैयक्तिकरण', sa: 'उच्चपरस्परक्रिया वैयक्तिकरणं च' },
      { en: 'Detailed parent guidance sessions', hi: 'विस्तृत अभिभावक मार्गदर्शन सत्र', sa: 'विस्तृतपितृमार्गदर्शनसत्राणि' },
      { en: 'Priority doubt resolution', hi: 'प्राथमिकता संदेह समाधान', sa: 'प्राथमिकतासंशयनिवारणम्' },
      { en: 'Individual progress tracking', hi: 'व्यक्तिगत प्रगति ट्रैकिंग', sa: 'वैयक्तिकप्रगतिअनुसरणम्' }
    ],
    focusedCTA: { en: 'Enroll in Focused Batch', hi: 'फोकस्ड बैच में नामांकन करें', sa: 'केन्द्रितसमूहे नामाङ्कनं कुरुत' },
    directPayment: { en: 'Or proceed directly to payment:', hi: 'या सीधे भुगतान के लिए आगे बढ़ें:', sa: 'अथवा सीधं भुगतानाय अग्रे गच्छतु:' },
    directGroup: { en: 'Direct Payment – Group (₹6,000)', hi: 'सीधा भुगतान – ग्रुप (₹6,000)', sa: 'प्रत्यक्षभुगतानम् – समूहः (₹६,०००)' },
    directFocused: { en: 'Direct Payment – Focused (₹15,000)', hi: 'सीधा भुगतान – फोकस्ड (₹15,000)', sa: 'प्रत्यक्षभुगतानम् – केन्द्रितः (₹१५,०००)' },
    scholarshipBtn: { en: 'Scholarship for Needy Families', hi: 'जरूरतमंद परिवारों के लिए छात्रवृत्ति', sa: 'आवश्यककुटुम्बेभ्यः छात्रवृत्तिः' },
    scholarshipMsg: { en: 'Hi! I am interested in applying for a scholarship for Bodhika program for my child.', hi: 'नमस्ते! मैं अपने बच्चे के लिए बोधिका कार्यक्रम की छात्रवृत्ति के लिए आवेदन करने में रुचि रखता/रखती हूं।', sa: 'नमस्ते! अहं मम बालकाय बोधिकाकार्यक्रमस्य छात्रवृत्त्यर्थम् आवेदनार्थं इच्छामि।' }
  },
  // Why One Year Section
  whyOneYear: {
    badge: { en: 'The Long View', hi: 'दीर्घकालिक दृष्टिकोण', sa: 'दीर्घकालिकदृष्टिकोणः' },
    title: { en: 'Why This Is a 1-Year Program', hi: 'यह 1-वर्षीय कार्यक्रम क्यों है', sa: 'एषः एकवर्षीयः कार्यक्रमः किमर्थम्' },
    reasons: [
      {
        title: { en: 'Sanskar forms slowly', hi: 'संस्कार धीरे-धीरे बनते हैं', sa: 'संस्कारः मन्दं मन्दं निर्मीयते' },
        description: { en: 'Values and character cannot be downloaded. They develop through repeated exposure and practice over extended periods.', hi: 'मूल्य और चरित्र डाउनलोड नहीं किए जा सकते। वे विस्तारित अवधि में बार-बार संपर्क और अभ्यास के माध्यम से विकसित होते हैं।', sa: 'मूल्यानि चरित्रं च अवतारयितुं न शक्यन्ते। तानि दीर्घकालं यावत् पुनः पुनः सम्पर्केण अभ्यासेन च विकसन्ते।' }
      },
      {
        title: { en: 'Habits require repetition', hi: 'आदतों के लिए पुनरावृत्ति आवश्यक है', sa: 'आदताः पुनरावृत्तिम् अपेक्षन्ते' },
        description: { en: 'A child cannot develop emotional discipline from a few sessions. These capacities grow through consistent practice.', hi: 'एक बच्चा कुछ सत्रों से भावनात्मक अनुशासन विकसित नहीं कर सकता। ये क्षमताएं निरंतर अभ्यास से बढ़ती हैं।', sa: 'एकः बालकः कतिपयसत्रेभ्यः भावनात्मकम् अनुशासनं विकसयितुं न शक्नोति। एताः क्षमताः सातत्येन अभ्यासेन वर्धन्ते।' }
      },
      {
        title: { en: 'Traditional wisdom', hi: 'पारंपरिक ज्ञान', sa: 'पारम्परिकप्रज्ञा' },
        description: { en: 'The gurukul model understood that real learning takes time. We honor this by committing to a year-long journey.', hi: 'गुरुकुल मॉडल समझता था कि वास्तविक शिक्षा में समय लगता है। हम एक वर्ष की यात्रा के प्रति प्रतिबद्ध होकर इसका सम्मान करते हैं।', sa: 'गुरुकुलप्रतिमानं अवबुध्यते यत् वास्तविकं शिक्षणं कालम् अपेक्षते। वयं एकवर्षीययात्रायां प्रतिबद्धतया एतत् सम्मानयामः।' }
      },
      {
        title: { en: 'Trust builds gradually', hi: 'विश्वास धीरे-धीरे बनता है', sa: 'विश्वासः क्रमशः निर्मीयते' },
        description: { en: 'Children open up and engage deeply only when they feel safe. This trust develops over months, not days.', hi: 'बच्चे तभी खुलते हैं और गहराई से जुड़ते हैं जब वे सुरक्षित महसूस करते हैं। यह विश्वास महीनों में विकसित होता है, दिनों में नहीं।', sa: 'बालकाः तदैव उद्घाटयन्ति गहनतया सम्बध्यन्ते च यदा ते सुरक्षिताः अनुभवन्ति। एषः विश्वासः मासेषु विकसते न तु दिनेषु।' }
      }
    ]
  },
  // Vision Section
  vision: {
    badge: { en: 'Our Philosophy', hi: 'हमारा दर्शन', sa: 'अस्माकं दर्शनम्' },
    title: { en: 'About Shastrakulam\'s Vision', hi: 'शास्त्रकुलम के दृष्टिकोण के बारे में', sa: 'शास्त्रकुलस्य दृष्टिकोणविषये' },
    para1: {
      en: 'Shastrakulam exists to offer education that develops the',
      hi: 'शास्त्रकुलम ऐसी शिक्षा प्रदान करने के लिए अस्तित्व में है जो विकसित करती है',
      sa: 'शास्त्रकुलं तादृशीं शिक्षां प्रदातुम् अस्तित्वे अस्ति या विकसयति'
    },
    wholePerson: { en: 'whole person', hi: 'संपूर्ण व्यक्तित्व', sa: 'सम्पूर्णव्यक्तित्वम्' },
    para1End: { en: ' — not just skills, but clarity; not just knowledge, but wisdom.', hi: ' — न केवल कौशल, बल्कि स्पष्टता; न केवल ज्ञान, बल्कि प्रज्ञा।', sa: ' — न केवलं कौशलानि किन्तु स्पष्टता; न केवलं ज्ञानं किन्तु प्रज्ञा।' },
    para2: {
      en: 'We are not interested in religious conversion. We focus on the',
      hi: 'हम धार्मिक परिवर्तन में रुचि नहीं रखते। हम',
      sa: 'वयं धार्मिकपरिवर्तने रुचिं न धारयामः। वयं'
    },
    devAspects: { en: 'developmental aspects', hi: 'विकासात्मक पहलुओं', sa: 'विकासात्मकपक्षेषु' },
    para2End: { en: ' of Indian knowledge systems — how they can help children think clearly, feel deeply, and act rightly.', hi: ' पर ध्यान केंद्रित करते हैं — वे बच्चों को स्पष्ट रूप से सोचने, गहराई से महसूस करने और सही ढंग से कार्य करने में कैसे मदद कर सकते हैं।', sa: ' ध्यानं धारयामः — ते बालकान् स्पष्टतया चिन्तयितुं गहनतया अनुभवितुं सम्यक् कर्तुं च कथं सहायाः भवन्ति।' },
    para3: {
      en: 'Our approach is long-term. We believe that when children are rooted in values, they become better students, friends, and eventually, better citizens.',
      hi: 'हमारा दृष्टिकोण दीर्घकालिक है। हमारा मानना है कि जब बच्चे मूल्यों में निहित होते हैं, तो वे बेहतर छात्र, मित्र और अंततः बेहतर नागरिक बनते हैं।',
      sa: 'अस्माकं दृष्टिकोणः दीर्घकालिकः। वयं विश्वसिमः यत् यदा बालकाः मूल्येषु निहिताः तदा ते उत्तमछात्राः मित्राणि अन्ततः उत्तमनागरिकाः च भवन्ति।'
    }
  },
  // Final CTA Section
  finalCTA: {
    title: { en: 'Begin with the Free Parent Orientation', hi: 'नि:शुल्क अभिभावक उन्मुखीकरण से शुरू करें', sa: 'निःशुल्कपितृउन्मुखीकरणेन आरभत' },
    subtitle: {
      en: 'This orientation is meant for clarity and alignment. There is no pressure to enroll. Attend, understand our approach, ask your questions, and then decide if this is right for your family.',
      hi: 'यह उन्मुखीकरण स्पष्टता और संरेखण के लिए है। नामांकन का कोई दबाव नहीं है। भाग लें, हमारे दृष्टिकोण को समझें, अपने प्रश्न पूछें, और फिर तय करें कि यह आपके परिवार के लिए सही है या नहीं।',
      sa: 'एतत् उन्मुखीकरणं स्पष्टतायै संरेखणाय च। नामाङ्कनस्य कोऽपि दबावः नास्ति। भागं गृह्णातु अस्माकं दृष्टिकोणं बोधतु स्वप्रश्नान् पृच्छतु ततः निर्णयतु यत् एतत् तव कुटुम्बाय उचितं वा न वा।'
    },
    ctaButton: { en: 'Attend the Free Parent Orientation', hi: 'नि:शुल्क अभिभावक उन्मुखीकरण में भाग लें', sa: 'निःशुल्कपितृउन्मुखीकरणे भागं गृह्णातु' },
    phone: { en: '+91 96749 16567', hi: '+91 96749 16567', sa: '+९१ ९६७४९ १६५६७' }
  },
  // Sticky Button
  stickyButton: { en: 'View Batch Options', hi: 'बैच विकल्प देखें', sa: 'समूहविकल्पान् पश्यतु' }
};

// ============================================
// SECTION 1: HERO SECTION
// ============================================
const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-maroon via-maroon-dark to-[#2a0a0a]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-saffron rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-maroon-light rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroGurukul} 
          alt="Children in a learning environment"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon/40 via-maroon/70 to-maroon" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 py-20">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl mx-auto text-center text-white space-y-6 md:space-y-8"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 md:px-5 py-2">
            <Sparkles className="h-4 w-4 text-saffron" />
            <span className="text-xs md:text-sm font-medium text-cream">{t(pageTranslations.hero.badge)}</span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="font-heading text-2xl md:text-4xl lg:text-6xl font-bold leading-tight text-cream px-2"
          >
            {t(pageTranslations.hero.headline)}{' '}
            <span className="text-saffron">{t(pageTranslations.hero.headlineHighlight)}</span>{' '}
            {t(pageTranslations.hero.headlineEnd)}
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="font-body text-base md:text-xl lg:text-2xl text-cream/85 max-w-3xl mx-auto leading-relaxed px-4"
          >
            {t(pageTranslations.hero.subheadline)}
          </motion.p>
          
          <motion.div variants={fadeInUp} className="pt-6 md:pt-8 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
            <Button 
              size="lg" 
              className="bg-saffron text-white hover:bg-saffron/90 font-semibold px-6 md:px-10 py-6 md:py-7 text-sm md:text-lg shadow-2xl shadow-saffron/30 rounded-xl group w-full sm:w-auto"
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I want to attend the free parent orientation for Bodhika.`, '_blank')}
            >
              {t(pageTranslations.hero.ctaPrimary)}
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-cream/40 text-cream hover:bg-cream/10 font-semibold px-6 md:px-8 py-5 md:py-6 rounded-xl w-full sm:w-auto"
              onClick={scrollToPricing}
            >
              {t(pageTranslations.hero.ctaSecondary)}
            </Button>
          </motion.div>
          
          {/* Scholarship Button */}
          <motion.div variants={fadeInUp}>
            <Button 
              variant="ghost"
              className="text-cream/80 hover:text-cream hover:bg-white/10 font-medium text-sm"
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t(pageTranslations.hero.scholarshipMsg))}`, '_blank')}
            >
              <Heart className="mr-2 h-4 w-4" />
              {t(pageTranslations.hero.scholarshipBtn)}
            </Button>
          </motion.div>
          
          <motion.p variants={fadeInUp} className="font-body text-xs md:text-sm text-cream/60 px-4">
            {t(pageTranslations.hero.ctaNote)}
          </motion.p>
        </motion.div>
      </div>
      
      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L60 73.3C120 66.7 240 53.3 360 46.7C480 40 600 40 720 43.3C840 46.7 960 53.3 1080 56.7C1200 60 1320 60 1380 60L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};

// ============================================
// SECTION 2: PROGRAM INFO STRIP
// ============================================
const ProgramInfoStrip = () => {
  const { t } = useLanguage();
  const infoItems = [
    { icon: Calendar, label: pageTranslations.programInfo.duration },
    { icon: Video, label: pageTranslations.programInfo.mode },
    { icon: Users, label: pageTranslations.programInfo.age },
    { icon: Heart, label: pageTranslations.programInfo.values },
    { icon: Target, label: pageTranslations.programInfo.batches },
  ];
  
  return (
    <section className="py-6 md:py-8 bg-gradient-to-r from-maroon/5 via-saffron/5 to-maroon/5 border-y border-maroon/10">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-3 md:gap-6 lg:gap-12"
        >
          {infoItems.map((item, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeInUp}
              className="flex items-center gap-2 md:gap-3 bg-background/80 backdrop-blur-sm px-3 md:px-5 py-2 md:py-3 rounded-xl shadow-sm border border-border"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-maroon/10 flex items-center justify-center">
                <item.icon className="h-4 w-4 md:h-5 md:w-5 text-maroon" />
              </div>
              <span className="font-body text-xs md:text-sm font-semibold text-foreground">{t(item.label)}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 3: CLEAR FILTERING SECTION
// ============================================
const FilteringSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-10 md:mb-14">
            <span className="inline-block bg-maroon/10 text-maroon px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold mb-4">
              {t(pageTranslations.filtering.badge)}
            </span>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground mb-4">
              {t(pageTranslations.filtering.title)}
            </h2>
            <p className="font-body text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto px-4">
              {t(pageTranslations.filtering.subtitle)}
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            <motion.div variants={fadeInUp}>
              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100/50 shadow-lg h-full">
                <CardContent className="p-5 md:p-8">
                  <div className="flex items-center gap-3 mb-5 md:mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-500 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <h3 className="font-heading text-lg md:text-xl font-bold text-green-800">
                      {t(pageTranslations.filtering.isForTitle)}
                    </h3>
                  </div>
                  <ul className="space-y-3 md:space-y-4">
                    {pageTranslations.filtering.isFor.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 md:gap-3">
                        <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-600 mt-0.5 shrink-0" />
                        <span className="font-body text-xs md:text-sm text-green-900">{t(item)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-red-100/50 shadow-lg h-full">
                <CardContent className="p-5 md:p-8">
                  <div className="flex items-center gap-3 mb-5 md:mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-500 flex items-center justify-center">
                      <X className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <h3 className="font-heading text-lg md:text-xl font-bold text-red-800">
                      {t(pageTranslations.filtering.isNotForTitle)}
                    </h3>
                  </div>
                  <ul className="space-y-3 md:space-y-4">
                    {pageTranslations.filtering.isNotFor.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 md:gap-3">
                        <X className="h-4 w-4 md:h-5 md:w-5 text-red-600 mt-0.5 shrink-0" />
                        <span className="font-body text-xs md:text-sm text-red-900">{t(item)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 4: CORE PROBLEM SECTION
// ============================================
const ProblemSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 md:py-20 bg-cream/40 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 md:w-72 h-48 md:h-72 bg-saffron/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 md:w-72 h-48 md:h-72 bg-maroon/5 rounded-full filter blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-4xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-8 md:mb-12">
            <span className="inline-block bg-saffron/10 text-saffron px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold mb-4">
              {t(pageTranslations.problem.badge)}
            </span>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground">
              {t(pageTranslations.problem.title)}
            </h2>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            <img src={heroCulture} alt="Children learning" className="rounded-2xl shadow-2xl w-full h-48 md:h-auto object-cover" />
            <div className="space-y-4 md:space-y-5 font-body text-sm md:text-base text-muted-foreground leading-relaxed flex flex-col justify-center">
              <p>{t(pageTranslations.problem.para1)} <strong className="text-foreground">{t(pageTranslations.problem.missing)}</strong>.</p>
              <p>{t(pageTranslations.problem.para2)} <strong className="text-foreground">{t(pageTranslations.problem.internalCompass)}</strong>.</p>
              <p>{t(pageTranslations.problem.para3)} <strong className="text-foreground">{t(pageTranslations.problem.clarity)}</strong>{t(pageTranslations.problem.para3End)}</p>
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Card className="bg-maroon text-white shadow-2xl border-0">
              <CardContent className="p-5 md:p-10">
                <div className="flex items-start gap-3 md:gap-4">
                  <Lightbulb className="h-6 w-6 md:h-8 md:w-8 text-saffron shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg md:text-xl font-bold mb-2 md:mb-3 text-cream">{t(pageTranslations.problem.approachTitle)}</h3>
                    <p className="font-body text-sm md:text-base text-cream/85 leading-relaxed">{t(pageTranslations.problem.approachText)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 5: OUTCOMES SECTION
// ============================================
const OutcomesSection = () => {
  const { t } = useLanguage();
  const iconList = [Brain, Shield, Compass, Heart, Eye];
  const colorList = ["from-blue-500 to-indigo-600", "from-emerald-500 to-teal-600", "from-amber-500 to-orange-600", "from-rose-500 to-pink-600", "from-purple-500 to-violet-600"];
  
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-5xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-10 md:mb-14">
            <span className="inline-block bg-maroon/10 text-maroon px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold mb-4">
              {t(pageTranslations.outcomes.badge)}
            </span>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
              {t(pageTranslations.outcomes.title)}
            </h2>
            <p className="font-body text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto px-4">
              {t(pageTranslations.outcomes.subtitle)}
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {pageTranslations.outcomes.items.map((outcome, idx) => {
              const IconComp = iconList[idx];
              return (
                <motion.div key={idx} variants={fadeInUp}>
                  <Card className="border-border hover:border-maroon/30 transition-all hover:shadow-xl group h-full">
                    <CardContent className="p-5 md:p-6">
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${colorList[idx]} flex items-center justify-center mb-4 md:mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                        <IconComp className="h-6 w-6 md:h-7 md:w-7 text-white" />
                      </div>
                      <h3 className="font-heading text-base md:text-lg font-bold text-foreground mb-2 md:mb-3">{t(outcome.title)}</h3>
                      <p className="font-body text-muted-foreground text-xs md:text-sm leading-relaxed">{t(outcome.description)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 6: WHAT WILL BE TAUGHT AT BODHIKA
// ============================================

// Translations for What Will Be Taught section
const whatWillBeTaughtTranslations = {
  badge: {
    en: 'The Gurukul Approach',
    hi: 'गुरुकुल दृष्टिकोण',
    sa: 'गुरुकुलपद्धतिः'
  },
  title: {
    en: 'What Will Be Taught at Bodhika',
    hi: 'बोधिका में क्या सिखाया जाएगा',
    sa: 'बोधिकायां किम् अध्यापयिष्यते'
  },
  subtitle: {
    en: 'Learning in the Tradition of an Online Gurukul',
    hi: 'ऑनलाइन गुरुकुल की परंपरा में शिक्षा',
    sa: 'अन्तर्जालगुरुकुलपरम्परायां शिक्षणम्'
  },
  introPara: {
    en: 'Bodhika is not subject-based learning. It follows the traditional Gurukul approach where education unfolds gradually through guidance, discipline, stories, and reflection. There is no syllabus to complete or curriculum to rush through. Instead, children absorb values and develop clarity naturally — the way Indian education has always worked.',
    hi: 'बोधिका विषय-आधारित शिक्षा नहीं है। यह पारंपरिक गुरुकुल दृष्टिकोण का अनुसरण करती है जहाँ शिक्षा मार्गदर्शन, अनुशासन, कथाओं और चिंतन के माध्यम से धीरे-धीरे प्रकट होती है। पूरा करने के लिए कोई पाठ्यक्रम या जल्दबाजी में पूरा करने के लिए कोई पाठ्यचर्या नहीं है। इसके बजाय, बच्चे स्वाभाविक रूप से मूल्यों को आत्मसात करते हैं और स्पष्टता विकसित करते हैं।',
    sa: 'बोधिका विषयाधारितशिक्षणं नास्ति। एषा पारम्परिकगुरुकुलपद्धतिम् अनुसरति यत्र शिक्षणं मार्गदर्शनेन अनुशासनेन कथाभिः चिन्तनेन च क्रमशः प्रकटते। पूर्तिकरणार्थं न कश्चित् पाठ्यक्रमः अस्ति। बालकाः स्वाभाविकतया मूल्यानि आत्मसात् कुर्वन्ति स्पष्टतां च विकसयन्ति।'
  },
  notSubjectBased: {
    en: 'not subject-based learning',
    hi: 'विषय-आधारित शिक्षा नहीं',
    sa: 'विषयाधारितशिक्षणं नास्ति'
  },
  guidanceHighlight: {
    en: 'guidance, discipline, stories, and reflection',
    hi: 'मार्गदर्शन, अनुशासन, कथाएँ और चिंतन',
    sa: 'मार्गदर्शनं अनुशासनं कथाः चिन्तनं च'
  },
  coreLearningTitle: {
    en: 'Core Learning Areas',
    hi: 'मुख्य शिक्षण क्षेत्र',
    sa: 'मुख्यशिक्षणक्षेत्राणि'
  },
  learningAreas: [
    {
      icon: 'Brain',
      title: { en: 'Training the Mind (Buddhi & Manas)', hi: 'मन का प्रशिक्षण (बुद्धि और मनस्)', sa: 'मनसः प्रशिक्षणम् (बुद्धिः मनश्च)' },
      points: [
        { en: 'Guided to pause before reacting impulsively', hi: 'आवेगपूर्ण प्रतिक्रिया से पहले रुकने का मार्गदर्शन', sa: 'आवेगपूर्णप्रतिक्रियायाः पूर्वं विरमितुं मार्गदर्शनम्' },
        { en: 'Observing thoughts and emotions with awareness', hi: 'जागरूकता से विचारों और भावनाओं का अवलोकन', sa: 'जागरूकतया विचाराणां भावानां च अवलोकनम्' },
        { en: 'Developing clarity over impulse through practice', hi: 'अभ्यास से आवेग पर स्पष्टता विकसित करना', sa: 'अभ्यासेन आवेगात् स्पष्टतां विकसनम्' },
        { en: 'Inner discipline rooted in understanding, not fear-based obedience', hi: 'समझ में निहित आंतरिक अनुशासन, भय-आधारित आज्ञाकारिता नहीं', sa: 'बोधे निहितम् आन्तरिकम् अनुशासनं न तु भयाधारितानुवर्तनम्' }
      ],
      color: 'from-indigo-500 to-blue-600'
    },
    {
      icon: 'BookOpen',
      title: { en: 'Learning Through Indian Stories (Itihasa Method)', hi: 'भारतीय कथाओं से सीखना (इतिहास पद्धति)', sa: 'भारतीयकथाभिः शिक्षणम् (इतिहासपद्धतिः)' },
      points: [
        { en: 'Stories from Ramayana and Mahabharata', hi: 'रामायण और महाभारत की कथाएँ', sa: 'रामायणमहाभारतयोः कथाः' },
        { en: 'Indian historical and cultural narratives', hi: 'भारतीय ऐतिहासिक और सांस्कृतिक आख्यान', sa: 'भारतीयैतिहासिकसांस्कृतिकाख्यानानि' },
        { en: 'Stories used as life situations for understanding right vs wrong', hi: 'सही और गलत को समझने के लिए जीवन स्थितियों के रूप में कथाएँ', sa: 'धर्माधर्मबोधाय जीवनस्थितिरूपेण कथाः' },
        { en: 'Not taught as religion, but as practical wisdom', hi: 'धर्म के रूप में नहीं, बल्कि व्यावहारिक ज्ञान के रूप में', sa: 'मतरूपेण न तु व्यावहारिकप्रज्ञारूपेण' }
      ],
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: 'Compass',
      title: { en: 'Understanding Dharma in Daily Life', hi: 'दैनिक जीवन में धर्म को समझना', sa: 'दैनिकजीवने धर्मस्य बोधः' },
      points: [
        { en: 'Dharma as clarity in action, not blind rule-following', hi: 'धर्म कर्म में स्पष्टता के रूप में, अंधा नियम-पालन नहीं', sa: 'धर्मः कर्मणि स्पष्टतारूपेण न तु अन्धनियमानुसरणम्' },
        { en: 'Responsibility in everyday situations', hi: 'दैनिक स्थितियों में जिम्मेदारी', sa: 'दैनिकस्थितिषु उत्तरदायित्वम्' },
        { en: 'Conscious decision-making in real-life contexts', hi: 'वास्तविक जीवन संदर्भों में सचेत निर्णय लेना', sa: 'वास्तविकजीवनसन्दर्भेषु सचेतनिर्णयकरणम्' },
        { en: 'Developing an internal compass for choices', hi: 'विकल्पों के लिए आंतरिक दिशासूचक विकसित करना', sa: 'विकल्पानां कृते आन्तरिकदिक्सूचकं विकसनम्' }
      ],
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: 'RefreshCw',
      title: { en: 'Sanskar & Habit Formation', hi: 'संस्कार और आदत निर्माण', sa: 'संस्कारः आदतनिर्माणं च' },
      points: [
        { en: 'Discipline through consistent repetition', hi: 'निरंतर पुनरावृत्ति के माध्यम से अनुशासन', sa: 'सातत्येन पुनरावृत्त्या अनुशासनम्' },
        { en: 'Building routine, respect, patience, and self-control', hi: 'दिनचर्या, सम्मान, धैर्य और आत्म-नियंत्रण का निर्माण', sa: 'दिनचर्यायाः सम्मानस्य धैर्यस्य आत्मनियन्त्रणस्य च निर्माणम्' },
        { en: 'Habit formation as the foundation of character', hi: 'चरित्र की नींव के रूप में आदत निर्माण', sa: 'चरित्रस्य आधाररूपेण आदतनिर्माणम्' },
        { en: 'Not moral preaching, but embodied practice', hi: 'नैतिक उपदेश नहीं, बल्कि मूर्त अभ्यास', sa: 'नैतिकोपदेशः न तु मूर्तिमत् अभ्यासः' }
      ],
      color: 'from-rose-500 to-pink-600'
    },
    {
      icon: 'Heart',
      title: { en: 'Cultural Awareness & Rooted Identity', hi: 'सांस्कृतिक जागरूकता और जड़ित पहचान', sa: 'सांस्कृतिकजागरूकता मूलितपरिचयश्च' },
      points: [
        { en: 'Introduction to Indian traditions and customs', hi: 'भारतीय परंपराओं और रीति-रिवाजों का परिचय', sa: 'भारतीयपरम्पराणां रीतिरिवाजानां च परिचयः' },
        { en: 'Understanding the meaning behind practices', hi: 'प्रथाओं के पीछे के अर्थ को समझना', sa: 'प्रथानां पृष्ठभागे अर्थस्य बोधः' },
        { en: 'Building cultural confidence without arrogance', hi: 'अहंकार के बिना सांस्कृतिक आत्मविश्वास का निर्माण', sa: 'दर्पं विना सांस्कृतिकआत्मविश्वासस्य निर्माणम्' },
        { en: 'Connection to heritage with clarity and pride', hi: 'स्पष्टता और गर्व के साथ विरासत से जुड़ाव', sa: 'स्पष्टतया गौरवेण च पैतृकसम्पदा सह सम्बन्धः' }
      ],
      color: 'from-purple-500 to-violet-600'
    },
    {
      icon: 'Eye',
      title: { en: 'Reflection, Stillness & Inner Balance', hi: 'चिंतन, स्थिरता और आंतरिक संतुलन', sa: 'चिन्तनं स्थिरता आन्तरिकसन्तुलनं च' },
      points: [
        { en: 'Simple reflection practices suited for children', hi: 'बच्चों के लिए उपयुक्त सरल चिंतन अभ्यास', sa: 'बालकानां कृते उपयुक्ताः सरलचिन्तनाभ्यासाः' },
        { en: 'Quiet observation as a skill', hi: 'कौशल के रूप में शांत अवलोकन', sa: 'कौशलरूपेण शान्तम् अवलोकनम्' },
        { en: 'Comfort with stillness for improved focus', hi: 'बेहतर एकाग्रता के लिए स्थिरता में आराम', sa: 'उन्नतैकाग्रतायै स्थिरतायां सुखम्' },
        { en: 'Emotional balance through inner awareness', hi: 'आंतरिक जागरूकता के माध्यम से भावनात्मक संतुलन', sa: 'आन्तरिकजागरूकतया भावनात्मकसन्तुलनम्' }
      ],
      color: 'from-cyan-500 to-sky-600'
    }
  ],
  differenceTitle: {
    en: 'How This Differs from Regular Online Courses',
    hi: 'यह सामान्य ऑनलाइन पाठ्यक्रमों से कैसे अलग है',
    sa: 'एतत् सामान्यान्तर्जालपाठ्यक्रमेभ्यः कथं भिद्यते'
  },
  differences: [
    { en: 'No passive video consumption — every class is live and interactive', hi: 'निष्क्रिय वीडियो उपभोग नहीं — हर कक्षा लाइव और इंटरैक्टिव है', sa: 'निष्क्रियचलचित्रोपभोगः नास्ति — प्रत्येका कक्षा प्रत्यक्षा परस्परक्रियात्मका च' },
    { en: 'No exams, grades, or academic pressure', hi: 'कोई परीक्षा, ग्रेड या शैक्षणिक दबाव नहीं', sa: 'न परीक्षाः न श्रेण्यः न शैक्षिकदबावः' },
    { en: 'No moral lectures or religious sermons', hi: 'कोई नैतिक व्याख्यान या धार्मिक प्रवचन नहीं', sa: 'न नैतिकव्याख्यानानि न धार्मिकप्रवचनानि' },
    { en: 'Learning happens through presence, guidance, and long-term discipline', hi: 'शिक्षण उपस्थिति, मार्गदर्शन और दीर्घकालिक अनुशासन के माध्यम से होता है', sa: 'शिक्षणम् उपस्थित्या मार्गदर्शनेन दीर्घकालिकानुशासनेन च भवति' }
  ],
  parentNoteTitle: {
    en: 'A Note for Parents',
    hi: 'माता-पिता के लिए एक नोट',
    sa: 'पितृभ्यः टिप्पणी'
  },
  parentNoteText: {
    en: 'This learning cannot be rushed. It cannot be reduced to a syllabus or measured by tests. Like in traditional Gurukuls, knowledge and values unfold slowly over time through consistent exposure, guided reflection, and gradual habit formation. If you seek quick results, this is not the right program. But if you value depth over speed, Bodhika is designed for you.',
    hi: 'इस शिक्षा में जल्दबाजी नहीं की जा सकती। इसे पाठ्यक्रम में संक्षिप्त नहीं किया जा सकता या परीक्षाओं से मापा नहीं जा सकता। पारंपरिक गुरुकुलों की तरह, ज्ञान और मूल्य निरंतर संपर्क, निर्देशित चिंतन और क्रमिक आदत निर्माण के माध्यम से धीरे-धीरे प्रकट होते हैं। यदि आप त्वरित परिणाम चाहते हैं, तो यह सही कार्यक्रम नहीं है। लेकिन अगर आप गति से अधिक गहराई को महत्व देते हैं, तो बोधिका आपके लिए बनाई गई है।',
    sa: 'एतत् शिक्षणं त्वरितं कर्तुं न शक्यते। एतत् पाठ्यक्रमे संक्षिप्तं कर्तुं वा परीक्षाभिः मातुं वा न शक्यते। पारम्परिकगुरुकुलेषु इव ज्ञानं मूल्यानि च सातत्येन सम्पर्केण निर्दिष्टचिन्तनेन क्रमिकादतनिर्माणेन च कालान्तरे मन्दं मन्दं प्रकटन्ते। यदि त्वं त्वरितफलानि इच्छसि तर्हि एषः उचितः कार्यक्रमः नास्ति। किन्तु यदि त्वं गत्यतः गहनतां बहुमन्यसे तर्हि बोधिका तुभ्यम् एव निर्मिता।'
  },
  cannotBeRushed: {
    en: 'cannot be rushed',
    hi: 'जल्दबाजी नहीं की जा सकती',
    sa: 'त्वरितं कर्तुं न शक्यते'
  },
  closingCTA: {
    en: 'To understand how this is delivered practically, attend the Free Parent Orientation.',
    hi: 'यह व्यावहारिक रूप से कैसे दिया जाता है, यह समझने के लिए नि:शुल्क अभिभावक उन्मुखीकरण में भाग लें।',
    sa: 'एतत् व्यावहारिकरूपेण कथं प्रदीयते इति ज्ञातुं निःशुल्कपितृउन्मुखीकरणे भागं गृह्णातु।'
  },
  ctaButton: {
    en: 'Attend the Free Parent Orientation',
    hi: 'नि:शुल्क अभिभावक उन्मुखीकरण में भाग लें',
    sa: 'निःशुल्कपितृउन्मुखीकरणे भागं गृह्णातु'
  },
  ctaNote: {
    en: 'The orientation explains structure and expectations. Enrollment is optional.',
    hi: 'उन्मुखीकरण संरचना और अपेक्षाओं की व्याख्या करता है। नामांकन वैकल्पिक है।',
    sa: 'उन्मुखीकरणं संरचनाम् अपेक्षाश्च व्याख्याति। नामाङ्कनं ऐच्छिकम्।'
  },
  scholarshipButton: {
    en: 'Scholarship for Needy Families',
    hi: 'जरूरतमंद परिवारों के लिए छात्रवृत्ति',
    sa: 'आवश्यककुटुम्बेभ्यः छात्रवृत्तिः'
  },
  scholarshipMessage: {
    en: 'Hi! I am interested in applying for a scholarship for Bodhika program for my child.',
    hi: 'नमस्ते! मैं अपने बच्चे के लिए बोधिका कार्यक्रम की छात्रवृत्ति के लिए आवेदन करने में रुचि रखता/रखती हूं।',
    sa: 'नमस्ते! अहं मम बालकाय बोधिकाकार्यक्रमस्य छात्रवृत्त्यर्थम् आवेदनार्थं इच्छामि।'
  }
};

// Icon mapping for dynamic rendering
const iconMap = {
  Brain,
  BookOpen,
  Compass,
  RefreshCw,
  Heart,
  Eye
};

const WhatWillBeTaughtSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-cream/40 via-background to-cream/40 relative overflow-hidden">
      {/* Animated decorative elements */}
      <div className="absolute top-10 md:top-20 right-0 w-48 md:w-96 h-48 md:h-96 bg-gradient-to-br from-saffron/10 to-saffron/5 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-10 md:bottom-20 left-0 w-48 md:w-96 h-48 md:h-96 bg-gradient-to-br from-maroon/10 to-maroon/5 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 md:w-64 h-32 md:h-64 bg-gradient-to-br from-amber-200/10 to-orange-200/5 rounded-full filter blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-10 md:mb-14">
            <motion.span 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-saffron/20 to-amber-400/20 text-saffron px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold mb-4 border border-saffron/30 shadow-lg shadow-saffron/10"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
              {t(whatWillBeTaughtTranslations.badge)}
            </motion.span>
            <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
              {t(whatWillBeTaughtTranslations.title)}
            </h2>
            <p className="font-body text-muted-foreground text-base md:text-lg italic">
              {t(whatWillBeTaughtTranslations.subtitle)}
            </p>
          </motion.div>
          
          {/* Intro Paragraph */}
          <motion.div variants={fadeInUp} className="max-w-4xl mx-auto mb-12 md:mb-16">
            <Card className="bg-gradient-to-br from-maroon via-maroon-dark to-[#3a0a0a] text-white border-0 shadow-2xl shadow-maroon/30 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/10 rounded-full filter blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-saffron/5 rounded-full filter blur-xl" />
              <CardContent className="p-6 md:p-10 relative">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-saffron/20 flex items-center justify-center shrink-0">
                    <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-saffron" />
                  </div>
                  <p className="font-body text-cream/90 leading-relaxed text-sm md:text-base lg:text-lg">
                    {t(whatWillBeTaughtTranslations.introPara)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Core Learning Areas */}
          <motion.div variants={fadeInUp} className="mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-8 md:mb-10">
              <div className="h-px flex-1 max-w-16 md:max-w-24 bg-gradient-to-r from-transparent to-maroon/30" />
              <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground text-center">
                {t(whatWillBeTaughtTranslations.coreLearningTitle)}
              </h3>
              <div className="h-px flex-1 max-w-16 md:max-w-24 bg-gradient-to-l from-transparent to-maroon/30" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {whatWillBeTaughtTranslations.learningAreas.map((area, idx) => {
                const IconComponent = iconMap[area.icon as keyof typeof iconMap];
                return (
                  <motion.div 
                    key={idx} 
                    variants={fadeInUp}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Card className="border border-border/50 bg-background/80 backdrop-blur-sm hover:border-maroon/40 transition-all duration-300 hover:shadow-2xl hover:shadow-maroon/10 group h-full">
                      <CardContent className="p-5 md:p-6">
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${area.color} flex items-center justify-center mb-4 md:mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                          <IconComponent className="h-6 w-6 md:h-7 md:w-7 text-white" />
                        </div>
                        <h4 className="font-heading text-base md:text-lg font-bold text-foreground mb-3 md:mb-4 leading-tight">
                          {t(area.title)}
                        </h4>
                        <ul className="space-y-2 md:space-y-2.5">
                          {area.points.map((point, pidx) => (
                            <li key={pidx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                              <span className="font-body text-xs md:text-sm text-muted-foreground leading-relaxed">{t(point)}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          
          {/* How This Differs Block */}
          <motion.div variants={fadeInUp} className="mb-12 md:mb-16">
            <Card className="border-2 border-saffron/30 bg-gradient-to-br from-saffron/5 via-amber-50/50 to-background shadow-xl shadow-saffron/10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-saffron/5 rounded-full filter blur-2xl" />
              <CardContent className="p-6 md:p-10 relative">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 md:mb-8">
                  <motion.div 
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-saffron to-amber-500 flex items-center justify-center shadow-lg shadow-saffron/30"
                    whileHover={{ rotate: 180, transition: { duration: 0.5 } }}
                  >
                    <Lightbulb className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  </motion.div>
                  <h3 className="font-heading text-lg md:text-xl lg:text-2xl font-bold text-foreground">
                    {t(whatWillBeTaughtTranslations.differenceTitle)}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {whatWillBeTaughtTranslations.differences.map((diff, idx) => (
                    <motion.div 
                      key={idx} 
                      className="flex items-start gap-3 bg-background/70 backdrop-blur-sm rounded-xl p-4 border border-border/50 hover:border-saffron/30 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-saffron mt-0.5 shrink-0" />
                      <span className="font-body text-xs md:text-sm text-foreground leading-relaxed">{t(diff)}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Parent Note */}
          <motion.div variants={fadeInUp} className="mb-10 md:mb-14">
            <Card className="border border-maroon/20 bg-gradient-to-br from-cream/70 via-cream/50 to-background shadow-lg overflow-hidden relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-maroon via-maroon/70 to-maroon/40" />
              <CardContent className="p-6 md:p-8 pl-6 md:pl-10">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-maroon/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="h-6 w-6 text-maroon" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg md:text-xl font-bold text-foreground mb-3">
                      {t(whatWillBeTaughtTranslations.parentNoteTitle)}
                    </h4>
                    <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed">
                      {t(whatWillBeTaughtTranslations.parentNoteText)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Closing CTA */}
          <motion.div variants={fadeInUp} className="text-center space-y-6">
            <p className="font-body text-foreground text-base md:text-lg max-w-2xl mx-auto">
              {t(whatWillBeTaughtTranslations.closingCTA)}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-saffron to-amber-500 text-white hover:from-saffron/90 hover:to-amber-500/90 font-semibold px-6 md:px-10 py-5 md:py-7 text-sm md:text-base shadow-xl shadow-saffron/25 rounded-xl group w-full sm:w-auto"
                  onClick={() => window.open(`https://wa.me/919674916567?text=Hi! I want to attend the free parent orientation for Bodhika.`, '_blank')}
                >
                  <MessageCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  {t(whatWillBeTaughtTranslations.ctaButton)}
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              
              {/* Scholarship Button */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="outline"
                  size="lg" 
                  className="border-2 border-maroon/50 text-maroon hover:bg-maroon/5 font-semibold px-6 md:px-8 py-5 md:py-7 text-sm md:text-base rounded-xl group w-full sm:w-auto"
                  onClick={() => window.open(`https://wa.me/919674916567?text=${encodeURIComponent(t(whatWillBeTaughtTranslations.scholarshipMessage))}`, '_blank')}
                >
                  <Heart className="mr-2 h-4 w-4 md:h-5 md:w-5 text-maroon" />
                  {t(whatWillBeTaughtTranslations.scholarshipButton)}
                </Button>
              </motion.div>
            </div>
            
            <p className="font-body text-muted-foreground text-xs md:text-sm">
              {t(whatWillBeTaughtTranslations.ctaNote)}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 7: TWO-BATCH COMPARISON
// ============================================
const BatchComparisonSection = () => {
  const [enrollFormOpen, setEnrollFormOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<'group' | 'focused'>('group');

  const handleEnrollClick = (batch: 'group' | 'focused') => {
    setSelectedBatch(batch);
    setEnrollFormOpen(true);
  };

  return (
    <section id="pricing-section" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <span className="inline-block bg-maroon/10 text-maroon px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Choose Your Batch
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Two Batch Options
            </h2>
            <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
              The ideology and curriculum are the same in both batches. Only the depth of interaction differs.
            </p>
          </motion.div>
          
          {/* Pricing Cards */}
          <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Group Batch */}
            <Card className="border-2 border-maroon/20 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-2 bg-maroon" />
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Group Live Batch</h3>
                  <p className="font-body text-muted-foreground text-sm">For parents seeking value-based education at accessible pricing</p>
                </div>
                
                <div className="mb-8">
                  <span className="font-heading text-5xl font-bold text-maroon">₹6,000</span>
                  <span className="font-body text-muted-foreground">/year</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {[
                    'Larger group sessions',
                    'Weekly live classes',
                    'Story-based curriculum',
                    'Standard parent updates',
                    'Group-based doubt resolution'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-maroon shrink-0" />
                      <span className="font-body text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  size="lg" 
                  className="w-full bg-maroon hover:bg-maroon/90 text-white font-semibold py-6 rounded-xl shadow-lg group-hover:shadow-xl transition-all"
                  onClick={() => handleEnrollClick('group')}
                >
                  Enroll in Group Batch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
            
            {/* Focused Batch */}
            <Card className="border-2 border-saffron/30 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group bg-gradient-to-br from-saffron/5 to-background">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-saffron to-saffron/70" />
              <div className="absolute top-6 right-6">
                <span className="bg-saffron text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3" /> RECOMMENDED
                </span>
              </div>
              <CardContent className="p-8 pt-14">
                <div className="mb-6">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Focused Live Batch</h3>
                  <p className="font-body text-muted-foreground text-sm">For parents wanting personalized attention and deeper engagement</p>
                </div>
                
                <div className="mb-8">
                  <span className="font-heading text-5xl font-bold text-saffron">₹15,000</span>
                  <span className="font-body text-muted-foreground">/year</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {[
                    'Small group (12 students max)',
                    'High interaction & personalization',
                    'Detailed parent guidance sessions',
                    'Priority doubt resolution',
                    'Individual progress tracking'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-saffron shrink-0" />
                      <span className="font-body text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  size="lg" 
                  className="w-full bg-saffron hover:bg-saffron/90 text-white font-semibold py-6 rounded-xl shadow-lg shadow-saffron/20 group-hover:shadow-xl transition-all"
                  onClick={() => handleEnrollClick('focused')}
                >
                  Enroll in Focused Batch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Direct Payment Links */}
          <motion.div variants={fadeInUp} className="text-center">
            <p className="font-body text-muted-foreground text-sm mb-4">
              Or proceed directly to payment:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline"
                className="border-maroon text-maroon hover:bg-maroon/5"
                onClick={() => {
                  window.location.href = `https://learn.shastrakulam.com/courses/Bodhika--Awakening-Young-Minds-695393a483bcbf4ec9283f27?page=checkout`;
                }}
              >
                Direct Payment – Group (₹6,000)
              </Button>
              <Button 
                variant="outline"
                className="border-saffron text-saffron hover:bg-saffron/5"
                onClick={() => {
                  window.location.href = `https://learn.shastrakulam.com/courses/Bodhika--Awakening-Young-Minds-10-students-batch-6953f67fba62d03beeceac42?page=checkout`;
                }}
              >
                Direct Payment – Focused (₹15,000)
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enrollment Form Dialog */}
      <BodhikaEnrollmentForm 
        batchType={selectedBatch}
        open={enrollFormOpen}
        onOpenChange={setEnrollFormOpen}
      />
    </section>
  );
};

// ============================================
// SECTION 8: WHY 1-YEAR PROGRAM
// ============================================
const WhyOneYearSection = () => {
  const reasons = [
    {
      icon: RefreshCw,
      title: "Sanskar forms slowly",
      description: "Values and character cannot be downloaded. They develop through repeated exposure and practice over extended periods."
    },
    {
      icon: Zap,
      title: "Habits require repetition",
      description: "A child cannot develop emotional discipline from a few sessions. These capacities grow through consistent practice."
    },
    {
      icon: GraduationCap,
      title: "Traditional wisdom",
      description: "The gurukul model understood that real learning takes time. We honor this by committing to a year-long journey."
    },
    {
      icon: Heart,
      title: "Trust builds gradually",
      description: "Children open up and engage deeply only when they feel safe. This trust develops over months, not days."
    }
  ];

  return (
    <section className="py-20 bg-cream/40">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <span className="inline-block bg-maroon/10 text-maroon px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              The Long View
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Why This Is a 1-Year Program
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {reasons.map((reason, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="border-border bg-background/80 backdrop-blur-sm shadow-md h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-maroon/10 flex items-center justify-center shrink-0">
                        <reason.icon className="h-6 w-6 text-maroon" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                          {reason.title}
                        </h3>
                        <p className="font-body text-muted-foreground text-sm leading-relaxed">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 9: ABOUT THE VISION
// ============================================
const VisionSection = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-saffron/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-maroon/5 rounded-full filter blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <span className="inline-block bg-saffron/10 text-saffron px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Our Philosophy
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              About Shastrakulam's Vision
            </h2>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-8 items-center">
            <img 
              src={heroMeditation} 
              alt="Meditation and inner peace"
              className="rounded-2xl shadow-2xl w-full h-72 object-cover"
            />
            <div className="space-y-5">
              <p className="font-body text-muted-foreground leading-relaxed">
                Shastrakulam exists to offer education that develops the <strong className="text-foreground">whole person</strong> — not just skills, but clarity; not just knowledge, but wisdom.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                We are not interested in religious conversion. We focus on the <strong className="text-foreground">developmental aspects</strong> of Indian knowledge systems — how they can help children think clearly, feel deeply, and act rightly.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                Our approach is long-term. We believe that when children are rooted in values, they become better students, friends, and eventually, better citizens.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 10: FINAL CTA
// ============================================
const FinalCTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-maroon via-maroon-dark to-[#2a0a0a] text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-saffron rounded-full filter blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-maroon-light rounded-full filter blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp}>
            <Award className="h-16 w-16 text-saffron mx-auto mb-6" />
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="font-heading text-3xl md:text-5xl font-bold mb-6 text-cream">
            Begin with the Free Parent Orientation
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="font-body text-lg md:text-xl text-cream/80 mb-10 leading-relaxed">
            This orientation is meant for clarity and alignment. There is no pressure to enroll. Attend, understand our approach, ask your questions, and then decide if this is right for your family.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="xl" 
              className="bg-saffron text-white hover:bg-saffron/90 font-semibold px-12 py-7 text-lg shadow-2xl shadow-saffron/30 rounded-xl group"
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I want to attend the free parent orientation for Bodhika.`, '_blank')}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Attend the Free Parent Orientation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-6 text-cream/70">
            <a href="tel:+919674916567" className="flex items-center gap-2 hover:text-cream transition-colors">
              <Phone className="h-5 w-5" />
              <span className="font-body">+91 96749 16567</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// STICKY ENROLL BUTTON (PRESERVED AS-IS)
// ============================================
const StickyEnrollButton = () => {
  const [visible, setVisible] = useState(false);
  const [hiddenNearPricing, setHiddenNearPricing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const pricingSection = document.getElementById('pricing-section');
      
      // Show after scrolling 500px
      setVisible(scrollY > 500);
      
      // Hide when near pricing section
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect();
        const isNearPricing = rect.top < window.innerHeight && rect.bottom > 0;
        setHiddenNearPricing(isNearPricing);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible || hiddenNearPricing) return null;

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
    >
      <Button
        size="lg"
        className="bg-saffron hover:bg-saffron/90 text-white font-semibold px-8 py-4 rounded-full shadow-2xl shadow-saffron/30"
        onClick={scrollToPricing}
      >
        <Flame className="mr-2 h-5 w-5" />
        View Batch Options
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </motion.div>
  );
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================
const BodhikaLanding = () => {
  return (
    <>
      <Layout>
        <Helmet>
          <title>Bodhika – 1-Year Live Program for Children | Focus, Discipline & Indian Values | Shastrakulam</title>
          <meta name="description" content="Bodhika is a 1-year live program for children aged 6-12 that builds focus, discipline, and Indian value-based understanding through weekly live classes and story-based learning." />
          <meta name="keywords" content="children education, Indian values, focus discipline, character building, live classes, 6-12 years, sanskar, cultural education" />
        </Helmet>
        
        <HeroSection />
        <ProgramInfoStrip />
        <FilteringSection />
        <ProblemSection />
        <OutcomesSection />
        <WhatWillBeTaughtSection />
        <BatchComparisonSection />
        <WhyOneYearSection />
        <VisionSection />
        <FinalCTASection />
        
        {/* Floating buttons preserved */}
        <StickyEnrollButton />
        <StickyMobileFooter />
      </Layout>
    </>
  );
};

export default BodhikaLanding;
