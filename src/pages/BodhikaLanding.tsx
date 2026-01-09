import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  BookOpen, 
  Users, 
  Clock, 
  Award, 
  Heart, 
  Star, 
  CheckCircle2, 
  Sparkles,
  GraduationCap,
  MessageCircle,
  Download,
  Shield,
  Flame,
  Brain,
  Smile,
  Eye,
  Lightbulb,
  Calendar,
  Phone,
  Quote,
  Play,
  Video,
  Radio,
  ChevronRight,
  ArrowRight,
  Target,
  Mic,
  BookMarked,
  Feather,
  Compass,
  Sun,
  Moon,
  Music,
  Palette,
  Globe,
  Leaf,
  Hand,
  TreePine,
  Zap,
  Footprints,
  Languages,
  X,
  Check
} from 'lucide-react';

// Import images
import heroGurukul from '@/assets/bodhika/hero-gurukul.jpg';
import heroSanskrit from '@/assets/bodhika/hero-sanskrit.jpg';
import heroCulture from '@/assets/bodhika/hero-culture.jpg';
import heroMeditation from '@/assets/bodhika/hero-meditation.jpg';
import gitaScene from '@/assets/bodhika/gita-scene.jpg';
import ramayanaScene from '@/assets/bodhika/ramayana-scene.jpg';
import mahabharataScene from '@/assets/bodhika/mahabharata-scene.jpg';
import omDivine from '@/assets/bodhika/om-divine.jpg';
import vedasTexts from '@/assets/bodhika/vedas-texts.jpg';
import sanskarScene from '@/assets/bodhika/sanskar-scene.jpg';
import mantrasScene from '@/assets/bodhika/mantras-scene.jpg';
import onlineLearning from '@/assets/bodhika/online-learning.jpg';
import videoThumbnail from '@/assets/bodhika/video-thumbnail.jpg';
import founderYogesh from '@/assets/bodhika/founder-yogesh.jpg';

// Import components
import { HeroCarousel } from '@/components/bodhika/HeroCarousel';
import { SacredTextCard } from '@/components/bodhika/SacredTextCard';
import { CulturalDivider } from '@/components/bodhika/CulturalDivider';
import { LearningOutcomeCard } from '@/components/bodhika/LearningOutcomeCard';
import { TestimonialCard } from '@/components/bodhika/TestimonialCard';
import ScarcityTopBar from '@/components/bodhika/ScarcityTopBar';
import ScarcityProgressBar from '@/components/bodhika/ScarcityProgressBar';
import RiskReversalCard from '@/components/bodhika/RiskReversalCard';
import ObjectionCrusherFAQ from '@/components/bodhika/ObjectionCrusherFAQ';
import FounderInvitation from '@/components/bodhika/FounderInvitation';
import StickyMobileFooter from '@/components/bodhika/StickyMobileFooter';
import ScarcityNarrative from '@/components/bodhika/ScarcityNarrative';
import FloatingScarcityBadge from '@/components/bodhika/FloatingScarcityBadge';

// Constants
const WHATSAPP_NUMBER = "919674916567";

// Translations
const bodhikaTranslations = {
  // Hero Section - Updated for 6-12 age group
  heroBadge: {
    en: 'For Children Aged 6–12 Years',
    hi: '6-12 वर्ष के बच्चों के लिए',
    sa: '६-१२ वर्षीयबालकेभ्यः'
  },
  heroTitle: { en: 'Bodhika', hi: 'बोधिका', sa: 'बोधिका' },
  heroTagline: {
    en: 'A 1-Year Live Program to Build Focus, Discipline & Indian Value-Based Understanding',
    hi: 'ध्यान, अनुशासन और भारतीय मूल्य-आधारित समझ विकसित करने के लिए 1 वर्षीय लाइव कार्यक्रम',
    sa: 'एकाग्रतां अनुशासनं भारतीयमूल्याधारितावबोधं च विकासयितुं एकवर्षीयं जीवन्तकार्यक्रमम्'
  },
  heroDesc: {
    en: 'For parents who believe that education without values leads to information, not clarity or character.',
    hi: 'उन माता-पिता के लिए जो मानते हैं कि बिना मूल्यों के शिक्षा केवल जानकारी देती है, स्पष्टता या चरित्र नहीं।',
    sa: 'तेषां पितृभ्यः ये मन्यन्ते यत् मूल्यहीनशिक्षा सूचनां ददाति न तु स्पष्टतां चरित्रं वा।'
  },
  attendOrientation: { en: 'Attend the Free Parent Orientation', hi: 'निःशुल्क अभिभावक अभिविन्यास में भाग लें', sa: 'निःशुल्कपितृअभिविन्यासे भागं गृह्णात' },
  viewBatchOptions: { en: 'View Batch Options', hi: 'बैच विकल्प देखें', sa: 'वर्गविकल्पान् पश्यत' },
  scholarshipNote: { en: 'Scholarship for Needy Families', hi: 'जरूरतमंद परिवारों के लिए छात्रवृत्ति', sa: 'आवश्यककुटुम्बेभ्यः छात्रवृत्तयः' },
  orientationNote: { en: 'Orientation is for understanding the approach. Enrollment is optional.', hi: 'अभिविन्यास दृष्टिकोण समझने के लिए है। नामांकन वैकल्पिक है।', sa: 'अभिविन्यासः दृष्टिकोणावबोधार्थम्। नामाङ्कनं वैकल्पिकम्।' },
  
  // Highlight Strip
  monthsLearning: { en: '12 Months', hi: '12 महीने', sa: '१२ मासाः' },
  liveInteractive: { en: '100% Live', hi: '100% लाइव', sa: '१००% जीवन्तम्' },
  ageGroup: { en: 'Age 6–12', hi: 'आयु 6-12', sa: 'आयुः ६-१२' },
  indianValues: { en: 'Indian Values', hi: 'भारतीय मूल्य', sa: 'भारतीयमूल्यानि' },
  twoBatches: { en: '2 Batches', hi: '2 बैच', sa: '२ वर्गौ' },
  intentionalFiltering: { en: 'Intentional Filtering', hi: 'जानबूझकर छनाई', sa: 'जानबूझकरछनानम्' },

  // Who This Program Is For Section
  whoIsItFor: { en: 'Who This Program Is For', hi: 'यह कार्यक्रम किसके लिए है', sa: 'एतत् कार्यक्रमः कस्मै' },
  notForEveryone: { en: 'This program is not for everyone. Please read carefully before considering enrollment.', hi: 'यह कार्यक्रम सभी के लिए नहीं है। नामांकन पर विचार करने से पहले कृपया ध्यान से पढ़ें।', sa: 'एतत् कार्यक्रमः सर्वेभ्यः न। नामाङ्कनविचारात् पूर्वं कृपया सावधानतया पठत।' },
  programIsFor: { en: 'This Program IS For', hi: 'यह कार्यक्रम इनके लिए है', sa: 'एतत् कार्यक्रमः एतेभ्यः' },
  programIsNotFor: { en: 'This Program Is NOT For', hi: 'यह कार्यक्रम इनके लिए नहीं है', sa: 'एतत् कार्यक्रमः एतेभ्यः न' },
  
  isFor1: { en: 'Parents who want their children to understand the meaning behind Indian traditions, not just follow rituals', hi: 'माता-पिता जो चाहते हैं कि उनके बच्चे भारतीय परंपराओं के अर्थ को समझें, न कि केवल रीति-रिवाजों का पालन करें', sa: 'पितरः ये इच्छन्ति यत् तेषां सन्तानाः भारतीयपरम्पराणाम् अर्थं अवगच्छन्तु न तु केवलं रीतिरिवाजान् अनुसरन्तु' },
  isFor2: { en: 'Parents who feel modern schooling develops skills but not clarity of thinking or internal discipline', hi: 'माता-पिता जो महसूस करते हैं कि आधुनिक स्कूली शिक्षा कौशल विकसित करती है लेकिन सोचने की स्पष्टता या आंतरिक अनुशासन नहीं', sa: 'पितरः ये अनुभवन्ति यत् आधुनिकविद्यालयशिक्षा कौशलं विकासयति किन्तु चिन्तनस्पष्टतां आन्तरिकानुशासनं वा न' },
  isFor3: { en: 'Parents seeking a structured, long-term approach to values — not weekend crash courses', hi: 'माता-पिता जो मूल्यों के लिए एक संरचित, दीर्घकालिक दृष्टिकोण खोज रहे हैं — सप्ताहांत के त्वरित पाठ्यक्रम नहीं', sa: 'पितरः ये मूल्येभ्यः संरचितं दीर्घकालिकं दृष्टिकोणं अन्विष्यन्ति — सप्ताहान्तत्वरितपाठ्यक्रमान् न' },
  isFor4: { en: 'Parents who value emotional regulation, right-wrong discernment, and cultural confidence', hi: 'माता-पिता जो भावनात्मक नियंत्रण, सही-गलत की पहचान और सांस्कृतिक आत्मविश्वास को महत्व देते हैं', sa: 'पितरः ये भावनात्मकनियन्त्रणं सत्यासत्यविवेकं सांस्कृतिकात्मविश्वासं च मान्यन्ते' },
  isFor5: { en: 'Parents willing to support their child\'s learning through occasional parent alignment sessions', hi: 'माता-पिता जो कभी-कभी अभिभावक संरेखण सत्रों के माध्यम से अपने बच्चे की शिक्षा का समर्थन करने को तैयार हैं', sa: 'पितरः ये कदाचित् पितृसंरेखणसत्रैः स्वसन्तानस्य शिक्षां समर्थयितुं सिद्धाः' },
  
  notFor1: { en: 'Parents looking for quick results or instant transformation', hi: 'त्वरित परिणाम या तत्काल परिवर्तन की तलाश में माता-पिता', sa: 'त्वरितफलं तत्क्षणपरिवर्तनं वा अन्विष्यन्तः पितरः' },
  notFor2: { en: 'Parents who want religious preaching rather than developmental education', hi: 'माता-पिता जो विकासात्मक शिक्षा के बजाय धार्मिक उपदेश चाहते हैं', sa: 'पितरः ये विकासात्मकशिक्षायाः स्थाने धार्मिकप्रवचनम् इच्छन्ति' },
  notFor3: { en: 'Parents who expect content consumption without habit formation or reflection', hi: 'माता-पिता जो आदत निर्माण या चिंतन के बिना सामग्री उपभोग की अपेक्षा करते हैं', sa: 'पितरः ये स्वभावनिर्माणं चिन्तनं विना विषयोपभोगं प्रतीक्षन्ते' },
  notFor4: { en: 'Parents unwilling to participate in occasional parent sessions', hi: 'माता-पिता जो कभी-कभी अभिभावक सत्रों में भाग लेने को तैयार नहीं हैं', sa: 'पितरः ये कदाचित् पितृसत्रेषु भागं ग्रहीतुं न इच्छन्ति' },
  notFor5: { en: 'Parents seeking entertainment-based learning without discipline or depth', hi: 'माता-पिता जो अनुशासन या गहराई के बिना मनोरंजन-आधारित शिक्षा की तलाश में हैं', sa: 'पितरः ये अनुशासनं गाम्भीर्यं विना मनोरञ्जनाधारितशिक्षां अन्विष्यन्ति' },

  // The Challenge Section
  theChallenge: { en: 'The Challenge', hi: 'चुनौती', sa: 'आव्हानम्' },
  whatParentsFace: { en: 'What Modern Parents Face', hi: 'आधुनिक माता-पिता क्या सामना करते हैं', sa: 'आधुनिकपितरः किं सम्मुखीकुर्वन्ति' },
  challengeDesc1: { en: 'Today\'s children are intelligent. They have access to information, screens, and opportunities. Yet many parents notice something missing.', hi: 'आज के बच्चे बुद्धिमान हैं। उनके पास जानकारी, स्क्रीन और अवसरों तक पहुंच है। फिर भी कई माता-पिता कुछ कमी महसूस करते हैं।', sa: 'अद्यतनबालकाः बुद्धिमन्तः। तेषां सूचनायाः पटलानाम् अवसराणां च प्राप्तिः अस्ति। तथापि बहवः पितरः किञ्चित् न्यूनं अनुभवन्ति।' },
  challengeDesc2: { en: 'Children react emotionally without understanding why. They struggle to focus. They know facts but lack the internal compass.', hi: 'बच्चे बिना समझे भावनात्मक रूप से प्रतिक्रिया करते हैं। वे ध्यान केंद्रित करने में संघर्ष करते हैं। वे तथ्य जानते हैं लेकिन आंतरिक दिशा सूचक का अभाव है।', sa: 'बालकाः विना अवगमं भावनात्मकतया प्रतिक्रियां कुर्वन्ति। ते एकाग्रतायां संघर्षन्ति। ते तथ्यानि जानन्ति किन्तु आन्तरिकदिशासूचकस्य अभावः।' },
  challengeDesc3: { en: 'Modern education excels at skills. But it rarely develops clarity of thinking, emotional discipline, or a stable sense of right and wrong.', hi: 'आधुनिक शिक्षा कौशल में उत्कृष्ट है। लेकिन यह शायद ही कभी सोचने की स्पष्टता, भावनात्मक अनुशासन, या सही और गलत की स्थिर समझ विकसित करती है।', sa: 'आधुनिकशिक्षा कौशले उत्कृष्टा। किन्तु एषा विरलं चिन्तनस्पष्टतां भावनात्मिकानुशासनं सत्यासत्यस्य स्थिरावबोधं वा विकासयति।' },
  
  indianApproach: { en: 'The Indian Approach', hi: 'भारतीय दृष्टिकोण', sa: 'भारतीयदृष्टिकोणः' },
  indianApproachDesc: { en: 'Indian knowledge systems offer a different path — not as religious preaching, but as a developmental framework. A way to build clear thinking (buddhi), emotional regulation, and value anchoring through stories, reflection, and gradual habit formation. This is what Bodhika offers.', hi: 'भारतीय ज्ञान प्रणालियाँ एक अलग मार्ग प्रदान करती हैं — धार्मिक उपदेश के रूप में नहीं, बल्कि एक विकासात्मक ढांचे के रूप में। कहानियों, चिंतन और क्रमिक आदत निर्माण के माध्यम से स्पष्ट सोच (बुद्धि), भावनात्मक नियंत्रण और मूल्य स्थापना का एक तरीका। यही बोधिका प्रदान करती है।', sa: 'भारतीयज्ञानप्रणाल्यः भिन्नं मार्गं प्रददति — धार्मिकप्रवचनरूपेण न, किन्तु विकासात्मकढाञ्चरूपेण। कथाभिः चिन्तनेन क्रमिकस्वभावनिर्माणेन च स्पष्टचिन्तनं (बुद्धिं) भावनात्मिकनियन्त्रणं मूल्यस्थापनां च निर्मातुं मार्गः। एतत् बोधिका प्रददाति।' },

  // Transformation Section
  transformationTitle: { en: 'Transformation Over Time', hi: 'समय के साथ परिवर्तन', sa: 'कालेन परिवर्तनम्' },
  transformationSubtitle: { en: 'What Your Child Will Develop Over One Year', hi: 'एक वर्ष में आपका बच्चा क्या विकसित करेगा', sa: 'एकवर्षे भवतः सन्तानः किं विकासयिष्यति' },
  transformationNote: { en: 'These outcomes cannot be achieved in short courses. They require time, repetition, and gradual deepening.', hi: 'इन परिणामों को छोटे पाठ्यक्रमों में प्राप्त नहीं किया जा सकता। इनके लिए समय, दोहराव और क्रमिक गहराई की आवश्यकता है।', sa: 'एतानि फलानि लघुपाठ्यक्रमेषु प्राप्तुं न शक्यन्ते। एतेभ्यः समयः पुनरावृत्तिः क्रमिकगाम्भीर्यं च आवश्यकम्।' },
  
  clearThinking: { en: 'Clear Thinking (Buddhi)', hi: 'स्पष्ट सोच (बुद्धि)', sa: 'स्पष्टचिन्तनम् (बुद्धिः)' },
  clearThinkingDesc: { en: 'Children learn to think before reacting, developing the ability to analyze situations with clarity.', hi: 'बच्चे प्रतिक्रिया करने से पहले सोचना सीखते हैं, स्थितियों का स्पष्टता से विश्लेषण करने की क्षमता विकसित करते हैं।', sa: 'बालकाः प्रतिक्रियायाः पूर्वं चिन्तयितुं शिक्षन्ते, स्थितीनां स्पष्टतया विश्लेषणस्य क्षमतां विकासयन्ति।' },
  
  emotionalDiscipline: { en: 'Emotional Discipline', hi: 'भावनात्मक अनुशासन', sa: 'भावनात्मिकानुशासनम्' },
  emotionalDisciplineDesc: { en: 'Through stories and reflection, children develop the capacity to regulate their emotions thoughtfully.', hi: 'कहानियों और चिंतन के माध्यम से, बच्चे विचारपूर्वक अपनी भावनाओं को नियंत्रित करने की क्षमता विकसित करते हैं।', sa: 'कथाभिः चिन्तनेन च, बालकाः विचारपूर्वकं स्वभावनाः नियन्तुं क्षमतां विकासयन्ति।' },
  
  rightWrongDiscernment: { en: 'Right-Wrong Discernment', hi: 'सही-गलत की पहचान', sa: 'सत्यासत्यविवेकः' },
  rightWrongDiscernmentDesc: { en: 'Understanding dharma in daily life — distinguishing what is appropriate in different situations.', hi: 'दैनिक जीवन में धर्म को समझना — विभिन्न स्थितियों में क्या उचित है यह पहचानना।', sa: 'दैनन्दिनजीवने धर्मावबोधः — विभिन्नस्थितिषु किम् उचितं इति विवेचनम्।' },
  
  valueAnchoring: { en: 'Value Anchoring', hi: 'मूल्य स्थापना', sa: 'मूल्यस्थापना' },
  valueAnchoringDesc: { en: 'Children develop an internal foundation of values that guides their decisions and relationships.', hi: 'बच्चे मूल्यों की एक आंतरिक नींव विकसित करते हैं जो उनके निर्णयों और संबंधों का मार्गदर्शन करती है।', sa: 'बालकाः मूल्यानाम् आन्तरिकम् आधारं विकासयन्ति यः तेषां निर्णयान् सम्बन्धान् च मार्गदर्शयति।' },
  
  culturalConfidence: { en: 'Cultural Confidence', hi: 'सांस्कृतिक आत्मविश्वास', sa: 'सांस्कृतिकात्मविश्वासः' },
  culturalConfidenceDesc: { en: 'A deep understanding of Indian traditions that allows children to engage with heritage with pride.', hi: 'भारतीय परंपराओं की गहरी समझ जो बच्चों को गर्व के साथ विरासत से जुड़ने की अनुमति देती है।', sa: 'भारतीयपरम्पराणां गहनावबोधः येन बालकाः गौरवेण पैतृकेन सह संयोजयितुं शक्नुवन्ति।' },

  // Dharmik Gurukul Approach Section
  gurukulApproach: { en: 'The Dhārmik Gurukul Approach', hi: 'धार्मिक गुरुकुल दृष्टिकोण', sa: 'धार्मिकगुरुकुलदृष्टिकोणः' },
  whatChildWillLearn: { en: 'What Your Child Will Learn', hi: 'आपका बच्चा क्या सीखेगा', sa: 'भवतः सन्तानः किम् अधिगमिष्यति' },
  gurukulDesc: { en: 'Bodhika follows a Dhārmik Gurukul approach, where learning is introduced gradually and age-appropriately through stories, reflection, discipline, and guided discussion. These are not taught as separate subjects, but as part of a continuous upbringing process.', hi: 'बोधिका धार्मिक गुरुकुल दृष्टिकोण का अनुसरण करती है, जहाँ कहानियों, चिंतन, अनुशासन और मार्गदर्शित चर्चा के माध्यम से सीखना धीरे-धीरे और आयु-उपयुक्त तरीके से पेश किया जाता है। इन्हें अलग-अलग विषयों के रूप में नहीं, बल्कि निरंतर पालन-पोषण प्रक्रिया के हिस्से के रूप में पढ़ाया जाता है।', sa: 'बोधिका धार्मिकगुरुकुलदृष्टिकोणम् अनुसरति, यत्र कथाभिः चिन्तनेन अनुशासनेन मार्गदर्शितचर्चया च अधिगमः क्रमशः आयुयोग्यतया च प्रस्तूयते। एते पृथक्विषयरूपेण न शिक्ष्यन्ते, किन्तु निरन्तरपालनप्रक्रियायाः भागरूपेण।' },
  
  learningArea1: { en: 'Character, Values & Sanskār', hi: 'चरित्र, मूल्य और संस्कार', sa: 'चरित्रं मूल्यानि संस्काराश्च' },
  learningArea2: { en: 'Mindfulness, Focus & Inner Strength', hi: 'सचेतनता, एकाग्रता और आंतरिक शक्ति', sa: 'सचेतनता एकाग्रता आन्तरिकबलं च' },
  learningArea3: { en: 'Story-Based Dhārmik Wisdom', hi: 'कहानी-आधारित धार्मिक ज्ञान', sa: 'कथाधारितधार्मिकज्ञानम्' },
  learningArea3Sub: { en: '(Ramayana, Mahabharata, Gita as life stories)', hi: '(रामायण, महाभारत, गीता जीवन कहानियों के रूप में)', sa: '(रामायणं महाभारतं गीता च जीवनकथारूपेण)' },
  learningArea4: { en: 'Sanskrit, Shlokas & Sound Awareness', hi: 'संस्कृत, श्लोक और ध्वनि जागरूकता', sa: 'संस्कृतं श्लोकाः ध्वनिजागरूकता च' },
  learningArea5: { en: 'Dhārmik Living, Culture & Traditions', hi: 'धार्मिक जीवन, संस्कृति और परंपराएं', sa: 'धार्मिकजीवनं संस्कृतिः परम्पराश्च' },
  learningArea6: { en: 'Yoga, Reflection & Inner Balance', hi: 'योग, चिंतन और आंतरिक संतुलन', sa: 'योगः चिन्तनम् आन्तरिकसन्तुलनं च' },
  
  viewDetailedAreas: { en: 'View detailed learning areas covered over the year', hi: 'वर्ष भर में कवर किए गए विस्तृत शिक्षण क्षेत्र देखें', sa: 'वर्षपर्यन्तं आवृतानि विस्तृतशिक्षणक्षेत्राणि पश्यत' },
  orientationExplanation: { en: 'Detailed explanation of how these are taught is shared in the Free Parent Orientation.', hi: 'इन्हें कैसे पढ़ाया जाता है इसकी विस्तृत व्याख्या निःशुल्क अभिभावक अभिविन्यास में साझा की जाती है।', sa: 'एतानि कथं शिक्ष्यन्ते इति विस्तृतव्याख्या निःशुल्कपितृअभिविन्यासे प्रकाश्यते।' },

  // Batch Options Section
  chooseBatch: { en: 'Choose Your Batch', hi: 'अपना बैच चुनें', sa: 'स्ववर्गं चिनुत' },
  twoBatchOptions: { en: 'Two Batch Options', hi: 'दो बैच विकल्प', sa: 'द्वौ वर्गविकल्पौ' },
  batchIdeologyNote: { en: 'The ideology and curriculum are the same in both batches. Only the depth of interaction differs.', hi: 'दोनों बैचों में विचारधारा और पाठ्यक्रम समान हैं। केवल बातचीत की गहराई में अंतर है।', sa: 'उभयोः वर्गयोः विचारधारा पाठ्यक्रमश्च समानौ। संवादगाम्भीर्ये एव भेदः।' },
  
  groupBatch: { en: 'Group Live Batch', hi: 'ग्रुप लाइव बैच', sa: 'समूहजीवन्तवर्गः' },
  groupBatchDesc: { en: 'For parents seeking value-based education at accessible pricing', hi: 'सुलभ मूल्य निर्धारण पर मूल्य-आधारित शिक्षा चाहने वाले माता-पिता के लिए', sa: 'सुलभमूल्ये मूल्याधारितशिक्षाम् इच्छद्भ्यः पितृभ्यः' },
  groupPrice: { en: '₹6,000/year', hi: '₹6,000/वर्ष', sa: '₹६,०००/वर्षम्' },
  groupFeature1: { en: 'Larger group sessions', hi: 'बड़े समूह सत्र', sa: 'वृहत्समूहसत्राणि' },
  groupFeature2: { en: 'Weekly live classes', hi: 'साप्ताहिक लाइव कक्षाएं', sa: 'साप्ताहिकजीवन्तकक्षाः' },
  groupFeature3: { en: 'Story-based curriculum', hi: 'कहानी-आधारित पाठ्यक्रम', sa: 'कथाधारितपाठ्यक्रमः' },
  groupFeature4: { en: 'Standard parent updates', hi: 'मानक अभिभावक अपडेट', sa: 'मानकपितृअद्यतनानि' },
  groupFeature5: { en: 'Group-based doubt resolution', hi: 'समूह-आधारित संदेह समाधान', sa: 'समूहाधारितसंशयसमाधानम्' },
  enrollGroupBatch: { en: 'Enroll in Group Batch', hi: 'ग्रुप बैच में नामांकन करें', sa: 'समूहवर्गे नामाङ्कयत' },
  
  focusedBatch: { en: 'Focused Live Batch', hi: 'फोकस्ड लाइव बैच', sa: 'केन्द्रितजीवन्तवर्गः' },
  focusedBatchDesc: { en: 'For parents wanting personalized attention and deeper engagement', hi: 'व्यक्तिगत ध्यान और गहरी सहभागिता चाहने वाले माता-पिता के लिए', sa: 'व्यक्तिगतावधानं गहनसहभागितां च इच्छद्भ्यः पितृभ्यः' },
  focusedPrice: { en: '₹15,000/year', hi: '₹15,000/वर्ष', sa: '₹१५,०००/वर्षम्' },
  focusedFeature1: { en: 'Small group (12 students max)', hi: 'छोटा समूह (अधिकतम 12 छात्र)', sa: 'लघुसमूहः (अधिकतं १२ छात्राः)' },
  focusedFeature2: { en: 'High interaction & personalization', hi: 'उच्च बातचीत और वैयक्तिकरण', sa: 'उच्चसंवादः वैयक्तिकरणं च' },
  focusedFeature3: { en: 'Detailed parent guidance sessions', hi: 'विस्तृत अभिभावक मार्गदर्शन सत्र', sa: 'विस्तृतपितृमार्गदर्शनसत्राणि' },
  focusedFeature4: { en: 'Priority doubt resolution', hi: 'प्राथमिकता संदेह समाधान', sa: 'प्राथमिकतासंशयसमाधानम्' },
  focusedFeature5: { en: 'Individual progress tracking', hi: 'व्यक्तिगत प्रगति ट्रैकिंग', sa: 'व्यक्तिगतप्रगतिअनुसरणम्' },
  enrollFocusedBatch: { en: 'Enroll in Focused Batch', hi: 'फोकस्ड बैच में नामांकन करें', sa: 'केन्द्रितवर्गे नामाङ्कयत' },
  recommended: { en: 'RECOMMENDED', hi: 'अनुशंसित', sa: 'अनुशंसितम्' },
  
  directPaymentGroup: { en: 'Direct Payment – Group (₹6,000)', hi: 'सीधा भुगतान – ग्रुप (₹6,000)', sa: 'प्रत्यक्षभुगतानं – समूहः (₹६,०००)' },
  directPaymentFocused: { en: 'Direct Payment – Focused (₹15,000)', hi: 'सीधा भुगतान – फोकस्ड (₹15,000)', sa: 'प्रत्यक्षभुगतानं – केन्द्रितः (₹१५,०००)' },
  orProceedToPayment: { en: 'Or proceed directly to payment:', hi: 'या सीधे भुगतान के लिए आगे बढ़ें:', sa: 'अथवा प्रत्यक्षं भुगतानार्थं प्रगच्छत:' },

  // Why 1-Year Section
  longView: { en: 'The Long View', hi: 'दीर्घकालिक दृष्टि', sa: 'दीर्घकालिकदृष्टिः' },
  whyOneYear: { en: 'Why This Is a 1-Year Program', hi: 'यह 1 वर्षीय कार्यक्रम क्यों है', sa: 'एतत् एकवर्षीयकार्यक्रमः किमर्थम्' },
  
  sanskarFormsSlowly: { en: 'Sanskar forms slowly', hi: 'संस्कार धीरे-धीरे बनता है', sa: 'संस्कारः शनैः निर्मीयते' },
  sanskarFormsDesc: { en: 'Values and character cannot be downloaded. They develop through repeated exposure and practice over extended periods.', hi: 'मूल्य और चरित्र डाउनलोड नहीं किए जा सकते। वे विस्तारित अवधि में बार-बार संपर्क और अभ्यास के माध्यम से विकसित होते हैं।', sa: 'मूल्यानि चरित्रं च अवतारयितुं न शक्यन्ते। ते दीर्घकालपर्यन्तं पुनः पुनः सम्पर्केण अभ्यासेन च विकसन्ति।' },
  
  habitsRequireRepetition: { en: 'Habits require repetition', hi: 'आदतों के लिए दोहराव की आवश्यकता है', sa: 'स्वभावाः पुनरावृत्तिम् अपेक्षन्ते' },
  habitsRequireDesc: { en: 'A child cannot develop emotional discipline from a few sessions. These capacities grow through consistent practice.', hi: 'एक बच्चा कुछ सत्रों से भावनात्मक अनुशासन विकसित नहीं कर सकता। ये क्षमताएं निरंतर अभ्यास से बढ़ती हैं।', sa: 'बालकः कतिपयसत्रेभ्यः भावनात्मिकानुशासनं विकासयितुं न शक्नोति। एताः क्षमताः निरन्तराभ्यासेन वर्धन्ते।' },
  
  traditionalWisdom: { en: 'Traditional wisdom', hi: 'पारंपरिक ज्ञान', sa: 'परम्परागतज्ञानम्' },
  traditionalWisdomDesc: { en: 'The gurukul model understood that real learning takes time. We honor this by committing to a year-long journey.', hi: 'गुरुकुल मॉडल ने समझा कि वास्तविक सीखने में समय लगता है। हम एक साल की यात्रा के प्रति प्रतिबद्ध होकर इसका सम्मान करते हैं।', sa: 'गुरुकुलप्रतिरूपः अवगतं यत् वास्तविकाधिगमः समयं गृह्णाति। वयं वर्षपर्यन्तयात्रायां प्रतिबद्धाः भूत्वा एतत् सम्मानयामः।' },
  
  trustBuildsGradually: { en: 'Trust builds gradually', hi: 'विश्वास धीरे-धीरे बनता है', sa: 'विश्वासः शनैः निर्मीयते' },
  trustBuildsDesc: { en: 'Children open up and engage deeply only when they feel safe. This trust develops over months, not days.', hi: 'बच्चे तभी खुलते हैं और गहराई से जुड़ते हैं जब वे सुरक्षित महसूस करते हैं। यह विश्वास दिनों में नहीं, महीनों में विकसित होता है।', sa: 'बालकाः तदैव उद्घाटयन्ति गहनतया संयोजयन्ति च यदा ते सुरक्षितम् अनुभवन्ति। एषः विश्वासः दिनेषु न, मासेषु विकसति।' },

  // Shastrakulam Vision Section
  ourPhilosophy: { en: 'Our Philosophy', hi: 'हमारा दर्शन', sa: 'अस्माकं दर्शनम्' },
  shastrakulamVision: { en: 'About Shastrakulam\'s Vision', hi: 'शास्त्रकुलम के दृष्टिकोण के बारे में', sa: 'शास्त्रकुलम्-दृष्टिकोणविषये' },
  visionDesc1: { en: 'Shastrakulam exists to offer education that develops the whole person — not just skills, but clarity; not just knowledge, but wisdom.', hi: 'शास्त्रकुलम उस शिक्षा को प्रदान करने के लिए मौजूद है जो पूरे व्यक्ति को विकसित करती है — न केवल कौशल, बल्कि स्पष्टता; न केवल ज्ञान, बल्कि बुद्धिमत्ता।', sa: 'शास्त्रकुलम् तां शिक्षां प्रदातुं विद्यते या सम्पूर्णं व्यक्तिं विकासयति — न केवलं कौशलं किन्तु स्पष्टतां; न केवलं ज्ञानं किन्तु प्रज्ञाम्।' },
  visionDesc2: { en: 'We are not interested in religious conversion. We focus on the developmental aspects of Indian knowledge systems — how they can help children think clearly, feel deeply, and act rightly.', hi: 'हम धार्मिक रूपांतरण में रुचि नहीं रखते। हम भारतीय ज्ञान प्रणालियों के विकासात्मक पहलुओं पर ध्यान केंद्रित करते हैं — कैसे वे बच्चों को स्पष्ट सोचने, गहराई से महसूस करने और सही तरीके से कार्य करने में मदद कर सकते हैं।', sa: 'वयं धार्मिकपरिवर्तने रुचिं न धरामः। वयं भारतीयज्ञानप्रणालीनां विकासात्मकपक्षेषु ध्यानं केन्द्रीकुर्मः — कथं ते बालकान् स्पष्टं चिन्तयितुं गहनम् अनुभवितुं सम्यक् कर्तुं च साहाय्यं कर्तुं शक्नुवन्ति।' },
  visionDesc3: { en: 'Our approach is long-term. We believe that when children are rooted in values, they become better students, friends, and eventually, better citizens.', hi: 'हमारा दृष्टिकोण दीर्घकालिक है। हम मानते हैं कि जब बच्चे मूल्यों में निहित होते हैं, तो वे बेहतर छात्र, मित्र और अंततः बेहतर नागरिक बनते हैं।', sa: 'अस्माकं दृष्टिकोणः दीर्घकालिकः। वयं मन्यामहे यत् यदा बालकाः मूल्येषु निहिताः भवन्ति तदा ते श्रेष्ठतराः छात्राः मित्राणि अन्ते च श्रेष्ठतराः नागरिकाः भवन्ति।' },

  // Final CTA
  beginWithOrientation: { en: 'Begin with the Free Parent Orientation', hi: 'निःशुल्क अभिभावक अभिविन्यास से शुरू करें', sa: 'निःशुल्कपितृअभिविन्यासेन आरभध्वम्' },
  orientationCTADesc: { en: 'This orientation is meant for clarity and alignment. There is no pressure to enroll. Attend, understand our approach, ask your questions, and then decide if this is right for your family.', hi: 'यह अभिविन्यास स्पष्टता और संरेखण के लिए है। नामांकन का कोई दबाव नहीं है। भाग लें, हमारे दृष्टिकोण को समझें, अपने प्रश्न पूछें, और फिर तय करें कि यह आपके परिवार के लिए सही है या नहीं।', sa: 'एतत् अभिविन्यासः स्पष्टतायै संरेखणाय च। नामाङ्कनस्य दबावः नास्ति। भागं गृह्णात, अस्माकं दृष्टिकोणं अवगच्छत, स्वप्रश्नान् पृच्छत, ततः निर्णयत यत् एतत् भवतः कुटुम्बाय उचितं वा।' },
  
  whatsappContact: { en: '+91 96749 16567', hi: '+91 96749 16567', sa: '+91 96749 16567' },
  
  // Scholarship
  scholarshipBadge: { en: 'Scholarship for Needy Families', hi: 'जरूरतमंद परिवारों के लिए छात्रवृत्ति', sa: 'आवश्यककुटुम्बेभ्यः छात्रवृत्तिः' },
  applyForScholarship: { en: 'Apply for Scholarship', hi: 'छात्रवृत्ति के लिए आवेदन करें', sa: 'छात्रवृत्त्यर्थम् आवेदयत' },
};

// Helper function to scroll to pricing
const scrollToPricing = () => {
  document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
};

// Hero Section Component
const HeroSection = () => {
  const { language } = useLanguage();
  const t = (obj: { en: string; hi: string; sa: string }) => obj[language as keyof typeof obj] || obj.en;
  
  return (
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-cream via-background to-saffron/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-9xl font-heading text-maroon">ॐ</div>
        <div className="absolute bottom-20 right-10 text-8xl font-heading text-saffron">श्री</div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Age Badge */}
          <Badge className="bg-maroon/10 text-maroon border-maroon/20 mb-6 px-6 py-2 text-lg">
            <Users className="h-4 w-4 mr-2" />
            {t(bodhikaTranslations.heroBadge)}
          </Badge>
          
          {/* Main Title */}
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-maroon mb-6">
            {t(bodhikaTranslations.heroTitle)}
          </h1>
          
          {/* Tagline */}
          <p className="font-heading text-xl md:text-2xl lg:text-3xl text-foreground font-semibold mb-6 leading-relaxed">
            {t(bodhikaTranslations.heroTagline)}
          </p>
          
          {/* Description */}
          <p className="font-body text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto italic">
            {t(bodhikaTranslations.heroDesc)}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button 
              size="lg" 
              className="bg-saffron hover:bg-saffron/90 text-white font-semibold px-8 py-6 text-lg shadow-lg"
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I want to attend the Free Parent Orientation for Bodhika.`, '_blank')}
            >
              {t(bodhikaTranslations.attendOrientation)}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-maroon text-maroon hover:bg-maroon/10 font-semibold px-8 py-6 text-lg"
              onClick={scrollToPricing}
            >
              {t(bodhikaTranslations.viewBatchOptions)}
            </Button>
          </div>
          
          {/* Scholarship Note */}
          <Badge className="bg-green-100 text-green-700 border-green-200 px-4 py-2 mb-4">
            <Award className="h-4 w-4 mr-2 inline" />
            {t(bodhikaTranslations.scholarshipNote)}
          </Badge>
          
          {/* Orientation Note */}
          <p className="font-body text-sm text-muted-foreground">
            {t(bodhikaTranslations.orientationNote)}
          </p>
        </div>
      </div>
    </section>
  );
};

// Highlight Strip Component
const HighlightStrip = () => {
  const { language } = useLanguage();
  const t = (obj: { en: string; hi: string; sa: string }) => obj[language as keyof typeof obj] || obj.en;
  
  const highlights = [
    { icon: Calendar, label: t(bodhikaTranslations.monthsLearning) },
    { icon: Video, label: t(bodhikaTranslations.liveInteractive) },
    { icon: Users, label: t(bodhikaTranslations.ageGroup) },
    { icon: Heart, label: t(bodhikaTranslations.indianValues) },
    { icon: GraduationCap, label: t(bodhikaTranslations.twoBatches) },
    { icon: Target, label: t(bodhikaTranslations.intentionalFiltering) },
  ];
  
  return (
    <section className="py-8 bg-maroon">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-cream">
              <div className="w-10 h-10 rounded-full bg-saffron/20 flex items-center justify-center">
                <item.icon className="h-5 w-5" />
              </div>
              <span className="font-body font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Who This Program Is For Section
const WhoIsItForSection = () => {
  const { language } = useLanguage();
  const t = (obj: { en: string; hi: string; sa: string }) => obj[language as keyof typeof obj] || obj.en;
  
  const isForList = [
    t(bodhikaTranslations.isFor1),
    t(bodhikaTranslations.isFor2),
    t(bodhikaTranslations.isFor3),
    t(bodhikaTranslations.isFor4),
    t(bodhikaTranslations.isFor5),
  ];
  
  const notForList = [
    t(bodhikaTranslations.notFor1),
    t(bodhikaTranslations.notFor2),
    t(bodhikaTranslations.notFor3),
    t(bodhikaTranslations.notFor4),
    t(bodhikaTranslations.notFor5),
  ];
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-maroon/10 text-maroon border-maroon/20 mb-4">
            <Target className="h-3 w-3 mr-1" />
            {t(bodhikaTranslations.whoIsItFor)}
          </Badge>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(bodhikaTranslations.notForEveryone)}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* IS For */}
          <Card className="border-2 border-green-200 bg-green-50/50">
            <CardContent className="p-8">
              <h3 className="font-heading text-xl font-bold text-green-700 mb-6 flex items-center gap-2">
                <Check className="h-6 w-6" />
                {t(bodhikaTranslations.programIsFor)}
              </h3>
              <ul className="space-y-4">
                {isForList.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="font-body text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {/* NOT For */}
          <Card className="border-2 border-red-200 bg-red-50/50">
            <CardContent className="p-8">
              <h3 className="font-heading text-xl font-bold text-red-700 mb-6 flex items-center gap-2">
                <X className="h-6 w-6" />
                {t(bodhikaTranslations.programIsNotFor)}
              </h3>
              <ul className="space-y-4">
                {notForList.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <span className="font-body text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// The Challenge Section
const ChallengeSection = () => {
  const { language } = useLanguage();
  const t = (obj: { en: string; hi: string; sa: string }) => obj[language as keyof typeof obj] || obj.en;
  
  return (
    <section className="py-20 bg-gradient-to-br from-cream via-background to-cream/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-saffron/10 text-saffron border-saffron/20 mb-4">
              {t(bodhikaTranslations.theChallenge)}
            </Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              {t(bodhikaTranslations.whatParentsFace)}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* The Challenge */}
            <div className="space-y-6">
              <p className="font-body text-lg text-foreground leading-relaxed">
                {t(bodhikaTranslations.challengeDesc1)}
              </p>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                {t(bodhikaTranslations.challengeDesc2)}
              </p>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                {t(bodhikaTranslations.challengeDesc3)}
              </p>
            </div>
            
            {/* The Indian Approach */}
            <Card className="border-2 border-saffron bg-gradient-to-br from-saffron/5 to-maroon/5">
              <CardContent className="p-8">
                <h3 className="font-heading text-xl font-bold text-maroon mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-saffron" />
                  {t(bodhikaTranslations.indianApproach)}
                </h3>
                <p className="font-body text-foreground leading-relaxed">
                  {t(bodhikaTranslations.indianApproachDesc)}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

// Transformation Section
const TransformationSection = () => {
  const { language } = useLanguage();
  const t = (obj: { en: string; hi: string; sa: string }) => obj[language as keyof typeof obj] || obj.en;
  
  const outcomes = [
    { icon: Brain, title: t(bodhikaTranslations.clearThinking), desc: t(bodhikaTranslations.clearThinkingDesc) },
    { icon: Heart, title: t(bodhikaTranslations.emotionalDiscipline), desc: t(bodhikaTranslations.emotionalDisciplineDesc) },
    { icon: Eye, title: t(bodhikaTranslations.rightWrongDiscernment), desc: t(bodhikaTranslations.rightWrongDiscernmentDesc) },
    { icon: Shield, title: t(bodhikaTranslations.valueAnchoring), desc: t(bodhikaTranslations.valueAnchoringDesc) },
    { icon: Star, title: t(bodhikaTranslations.culturalConfidence), desc: t(bodhikaTranslations.culturalConfidenceDesc) },
  ];
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-saffron/10 text-saffron border-saffron/20 mb-4">
            {t(bodhikaTranslations.transformationTitle)}
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t(bodhikaTranslations.transformationSubtitle)}
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto italic">
            {t(bodhikaTranslations.transformationNote)}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {outcomes.map((item, idx) => (
            <Card key={idx} className="border shadow-card hover-lift">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-saffron to-maroon flex items-center justify-center mb-4">
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Gurukul Approach Section
const GurukulApproachSection = () => {
  const { language } = useLanguage();
  const t = (obj: { en: string; hi: string; sa: string }) => obj[language as keyof typeof obj] || obj.en;
  
  const learningAreas = [
    { icon: Heart, title: t(bodhikaTranslations.learningArea1) },
    { icon: Brain, title: t(bodhikaTranslations.learningArea2) },
    { icon: BookOpen, title: t(bodhikaTranslations.learningArea3), sub: t(bodhikaTranslations.learningArea3Sub) },
    { icon: Mic, title: t(bodhikaTranslations.learningArea4) },
    { icon: Globe, title: t(bodhikaTranslations.learningArea5) },
    { icon: Leaf, title: t(bodhikaTranslations.learningArea6) },
  ];
  
  return (
    <section className="py-20 bg-gradient-to-br from-maroon via-maroon-dark to-maroon text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-saffron/20 text-saffron border-saffron/30 mb-4">
            {t(bodhikaTranslations.gurukulApproach)}
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t(bodhikaTranslations.whatChildWillLearn)}
          </h2>
          <p className="font-body text-lg text-cream/80 max-w-3xl mx-auto">
            {t(bodhikaTranslations.gurukulDesc)}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {learningAreas.map((item, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-saffron flex items-center justify-center mb-4">
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-1">{item.title}</h3>
              {item.sub && <p className="font-body text-sm text-cream/70">{item.sub}</p>}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="font-body text-cream/80 mb-6 italic">
            {t(bodhikaTranslations.orientationExplanation)}
          </p>
          <Button 
            size="lg" 
            className="bg-saffron hover:bg-saffron/90 text-white font-semibold"
            onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I want to attend the Free Parent Orientation for Bodhika.`, '_blank')}
          >
            {t(bodhikaTranslations.attendOrientation)}
          </Button>
        </div>
      </div>
    </section>
  );
};

// Graphy Product IDs
const GRAPHY_CHECKOUT_CONFIG = {
  group: {
    productId: 'Bodhika--Awakening-Young-Minds-695393a483bcbf4ec9283f27',
    courseId: '695393a483bcbf4ec9283f27',
    amount: '6000.0'
  },
  focused: {
    productId: 'Bodhika--Awakening-Young-Minds-10-students-batch-6953f67fba62d03beeceac42',
    courseId: '6953f67fba62d03beeceac42',
    amount: '15000.0'
  }
};

// Pricing Section
const PricingSection = () => {
  const { language } = useLanguage();
  const t = (obj: { en: string; hi: string; sa: string }) => obj[language as keyof typeof obj] || obj.en;

  const handleEnrollClick = (batchType: 'group' | 'focused') => {
    const config = GRAPHY_CHECKOUT_CONFIG[batchType];
    const checkoutParams = `/t/public/pre-checkout/single-checkout?courseId=${config.courseId}&pid=null&orderId=ANaml${Date.now()}&courseAmount=${config.amount}&pg=cashfree&currencyCode=INR&transactionId=${config.courseId}`;
    const checkoutUrl = `https://learn.shastrakulam.com/courses/${config.productId}?page=checkout&rzpCashfreeRedirectToPreCheckoutFlow=true&newCheckoutFlowRedirectIssue=true&newCheckoutFlowParams=${encodeURIComponent(checkoutParams)}`;
    window.location.href = checkoutUrl;
  };
  
  return (
    <section id="pricing-section" className="py-20 bg-cream/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-saffron/10 text-saffron border-saffron/20 mb-4">
            {t(bodhikaTranslations.chooseBatch)}
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t(bodhikaTranslations.twoBatchOptions)}
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            {t(bodhikaTranslations.batchIdeologyNote)}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
          {/* Group Batch */}
          <Card className="border-2 border-border shadow-card hover-lift">
            <CardContent className="p-0">
              <div className="bg-cream/50 p-6">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">{t(bodhikaTranslations.groupBatch)}</h3>
                <p className="font-body text-sm text-muted-foreground">{t(bodhikaTranslations.groupBatchDesc)}</p>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <span className="font-heading text-4xl font-bold text-foreground">₹6,000</span>
                  <span className="font-body text-muted-foreground">/year</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {[
                    t(bodhikaTranslations.groupFeature1),
                    t(bodhikaTranslations.groupFeature2),
                    t(bodhikaTranslations.groupFeature3),
                    t(bodhikaTranslations.groupFeature4),
                    t(bodhikaTranslations.groupFeature5),
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                      <span className="font-body text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full bg-saffron hover:bg-saffron/90 text-white"
                  onClick={() => handleEnrollClick('group')}
                >
                  {t(bodhikaTranslations.enrollGroupBatch)}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Focused Batch */}
          <Card className="border-2 border-saffron shadow-elevated hover-lift relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge className="bg-saffron text-white border-0">{t(bodhikaTranslations.recommended)}</Badge>
            </div>
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-saffron to-maroon p-6 text-white">
                <h3 className="font-heading text-xl font-bold mb-2">{t(bodhikaTranslations.focusedBatch)}</h3>
                <p className="font-body text-sm text-cream/90">{t(bodhikaTranslations.focusedBatchDesc)}</p>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <span className="font-heading text-4xl font-bold text-foreground">₹15,000</span>
                  <span className="font-body text-muted-foreground">/year</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {[
                    t(bodhikaTranslations.focusedFeature1),
                    t(bodhikaTranslations.focusedFeature2),
                    t(bodhikaTranslations.focusedFeature3),
                    t(bodhikaTranslations.focusedFeature4),
                    t(bodhikaTranslations.focusedFeature5),
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-saffron shrink-0" />
                      <span className="font-body text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full bg-maroon hover:bg-maroon/90 text-white"
                  onClick={() => handleEnrollClick('focused')}
                >
                  {t(bodhikaTranslations.enrollFocusedBatch)}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Direct Payment Links */}
        <div className="text-center">
          <p className="font-body text-sm text-muted-foreground mb-4">{t(bodhikaTranslations.orProceedToPayment)}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline"
              onClick={() => handleEnrollClick('group')}
            >
              {t(bodhikaTranslations.directPaymentGroup)}
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleEnrollClick('focused')}
            >
              {t(bodhikaTranslations.directPaymentFocused)}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Why One Year Section
const WhyOneYearSection = () => {
  const { language } = useLanguage();
  const t = (obj: { en: string; hi: string; sa: string }) => obj[language as keyof typeof obj] || obj.en;
  
  const reasons = [
    { icon: Feather, title: t(bodhikaTranslations.sanskarFormsSlowly), desc: t(bodhikaTranslations.sanskarFormsDesc) },
    { icon: Zap, title: t(bodhikaTranslations.habitsRequireRepetition), desc: t(bodhikaTranslations.habitsRequireDesc) },
    { icon: BookMarked, title: t(bodhikaTranslations.traditionalWisdom), desc: t(bodhikaTranslations.traditionalWisdomDesc) },
    { icon: Heart, title: t(bodhikaTranslations.trustBuildsGradually), desc: t(bodhikaTranslations.trustBuildsDesc) },
  ];
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-maroon/10 text-maroon border-maroon/20 mb-4">
            {t(bodhikaTranslations.longView)}
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            {t(bodhikaTranslations.whyOneYear)}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {reasons.map((item, idx) => (
            <Card key={idx} className="border shadow-card">
              <CardContent className="p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-saffron/20 to-maroon/20 flex items-center justify-center shrink-0">
                  <item.icon className="h-6 w-6 text-maroon" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Shastrakulam Vision Section
const VisionSection = () => {
  const { language } = useLanguage();
  const t = (obj: { en: string; hi: string; sa: string }) => obj[language as keyof typeof obj] || obj.en;
  
  return (
    <section className="py-20 bg-gradient-to-br from-cream via-background to-cream/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="bg-saffron/10 text-saffron border-saffron/20 mb-4">
            {t(bodhikaTranslations.ourPhilosophy)}
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
            {t(bodhikaTranslations.shastrakulamVision)}
          </h2>
          
          <div className="space-y-6 text-left">
            <p className="font-body text-lg text-foreground leading-relaxed">
              {t(bodhikaTranslations.visionDesc1)}
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              {t(bodhikaTranslations.visionDesc2)}
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              {t(bodhikaTranslations.visionDesc3)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Final CTA Section
const FinalCTASection = () => {
  const { language } = useLanguage();
  const t = (obj: { en: string; hi: string; sa: string }) => obj[language as keyof typeof obj] || obj.en;
  
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={heroGurukul} 
          alt="Children learning"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon/95 to-maroon/80" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {t(bodhikaTranslations.beginWithOrientation)}
        </h2>
        <p className="font-body text-lg md:text-xl text-cream/80 mb-8 max-w-3xl mx-auto">
          {t(bodhikaTranslations.orientationCTADesc)}
        </p>
        
        <Button 
          size="lg" 
          className="bg-saffron hover:bg-saffron/90 text-white font-semibold px-10 py-6 text-lg shadow-lg mb-6"
          onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I want to attend the Free Parent Orientation for Bodhika.`, '_blank')}
        >
          {t(bodhikaTranslations.attendOrientation)}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        <p className="font-body text-cream flex items-center justify-center gap-2">
          <Phone className="h-5 w-5" />
          {t(bodhikaTranslations.whatsappContact)}
        </p>
      </div>
    </section>
  );
};

// Main Page Component
const BodhikaLanding = () => {
  return (
    <>
      <Layout>
        <Helmet>
          <title>Bodhika - 1-Year Live Program for Children 6-12 | Focus, Discipline & Indian Values | Shastrakulam</title>
          <meta name="description" content="Bodhika is a 1-year live program for children aged 6-12 to build focus, discipline, and Indian value-based understanding. For parents who believe education without values leads to information, not clarity or character." />
          <meta name="keywords" content="children education, Indian values, dharmic education, focus discipline, character building, Sanskrit learning, Sanatan Dharma, online learning, gurukul approach" />
        </Helmet>
        
        <HeroSection />
        <HighlightStrip />
        <WhoIsItForSection />
        <ChallengeSection />
        <TransformationSection />
        <GurukulApproachSection />
        <PricingSection />
        <WhyOneYearSection />
        <VisionSection />
        <FinalCTASection />
        <StickyMobileFooter />
      </Layout>
    </>
  );
};

export default BodhikaLanding;
