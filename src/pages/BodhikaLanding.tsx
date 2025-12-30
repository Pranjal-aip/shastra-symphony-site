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
  Languages
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

// Import components
import { HeroCarousel } from '@/components/bodhika/HeroCarousel';
import { SacredTextCard } from '@/components/bodhika/SacredTextCard';
import { CulturalDivider } from '@/components/bodhika/CulturalDivider';
import { LearningOutcomeCard } from '@/components/bodhika/LearningOutcomeCard';
import { TestimonialCard } from '@/components/bodhika/TestimonialCard';

// Translations
const bodhikaTranslations = {
  // Hero Section
  heroBadge: {
    en: '1-Year Live Online Program for Kids & Teens',
    hi: 'बच्चों और किशोरों के लिए 1 वर्षीय लाइव ऑनलाइन कार्यक्रम',
    sa: 'बालकानां युवानां च कृते एकवर्षीयं जीवन्त-अन्तर्जालकार्यक्रमम्'
  },
  heroSubtitle: {
    en: 'A Transformational Journey in Sanatan Dharma',
    hi: 'सनातन धर्म में एक परिवर्तनकारी यात्रा',
    sa: 'सनातनधर्मे परिवर्तनात्मिका यात्रा'
  },
  heroTitle: { en: 'Bodhika', hi: 'बोधिका', sa: 'बोधिका' },
  heroTagline: {
    en: 'Root Your Child in Sanatan Dharma',
    hi: 'अपने बच्चे को सनातन धर्म में जड़ दें',
    sa: 'स्वसन्तानं सनातनधर्मे प्रतिष्ठापयत'
  },
  heroDesc: {
    en: 'Live online classes with recordings • Values • Culture • Sanskrit',
    hi: 'रिकॉर्डिंग के साथ लाइव ऑनलाइन कक्षाएं • संस्कार • संस्कृति • संस्कृत',
    sa: 'अभिलेखसहिताः जीवन्त-अन्तर्जालकक्षाः • संस्काराः • संस्कृतिः • संस्कृतम्'
  },
  enrollNow: { en: 'Enroll My Child Now', hi: 'अभी नामांकन करें', sa: 'अधुना नामाङ्कनं कुरुत' },
  bookCounseling: { en: 'Book Free Counseling', hi: 'निःशुल्क परामर्श बुक करें', sa: 'निःशुल्कपरामर्शं प्राप्नुत' },
  liveClasses: { en: 'Live Classes', hi: 'लाइव कक्षाएं', sa: 'जीवन्तकक्षाः' },
  recordedAccess: { en: 'Recorded Access', hi: 'रिकॉर्डेड एक्सेस', sa: 'अभिलिखितप्राप्तिः' },
  childFriendly: { en: 'Child-Friendly', hi: 'बाल-अनुकूल', sa: 'बालोपयुक्तम्' },
  oneYearProgram: { en: '1-Year Program', hi: '1 वर्षीय कार्यक्रम', sa: 'एकवर्षीयकार्यक्रमः' },

  // Highlight Strip
  monthsLearning: { en: '12 Months Learning', hi: '12 महीने का अध्ययन', sa: '१२ मासानाम् अध्ययनम्' },
  liveInteractive: { en: '100% Live Sessions + Recording', hi: '100% लाइव सेशन + रिकॉर्डिंग', sa: '१००% जीवन्तसत्राणि + अभिलेखः' },
  classRecordings: { en: 'Class Recordings', hi: 'कक्षा रिकॉर्डिंग', sa: 'कक्षाभिलेखाः' },
  deepSanatan: { en: 'Deep Sanatan Dharma', hi: 'गहन सनातन धर्म', sa: 'गहनसनातनधर्मः' },
  spokenSanskrit: { en: 'Spoken Sanskrit', hi: 'बोलचाल की संस्कृत', sa: 'संस्कृतभाषणम्' },
  moralEducation: { en: 'Moral & Cultural Education', hi: 'नैतिक और सांस्कृतिक शिक्षा', sa: 'नैतिकसांस्कृतिकशिक्षा' },

  // About Section
  aboutCourse: { en: 'About the Course', hi: 'पाठ्यक्रम के बारे में', sa: 'पाठ्यक्रमविषये' },
  whatIsBodhika: { en: 'What is Bodhika?', hi: 'बोधिका क्या है?', sa: 'बोधिका किम्?' },
  aboutDesc1: {
    en: 'Bodhika is a structured, child-friendly Sanatan Dharma learning journey that builds character, clarity, culture, and confidence through live guidance and timeless wisdom.',
    hi: 'बोधिका एक संरचित, बाल-अनुकूल सनातन धर्म शिक्षा यात्रा है जो लाइव मार्गदर्शन और शाश्वत ज्ञान के माध्यम से चरित्र, स्पष्टता, संस्कृति और आत्मविश्वास का निर्माण करती है।',
    sa: 'बोधिका संरचितम् बालोपयुक्तं सनातनधर्मशिक्षायात्रा अस्ति या जीवन्तमार्गदर्शनेन शाश्वतज्ञानेन च चरित्रं स्पष्टतां संस्कृतिम् आत्मविश्वासं च निर्माति।'
  },
  aboutDesc2: {
    en: 'Give your child the true essence of our ancient traditions in a modern, engaging format that they will love.',
    hi: 'अपने बच्चे को हमारी प्राचीन परंपराओं का सच्चा सार एक आधुनिक, आकर्षक प्रारूप में दें जो उन्हें पसंद आएगा।',
    sa: 'स्वसन्तानाय अस्माकं प्राचीनपरम्पराणां वास्तविकं सारं आधुनिके आकर्षके प्रारूपे ददातु यत् तेभ्यः रोचिष्यते।'
  },
  liveSessions: { en: '100% Live + Recording', hi: '100% लाइव + रिकॉर्डिंग', sa: '१००% जीवन्तम् + अभिलेखः' },
  months: { en: 'Months', hi: 'महीने', sa: 'मासाः' },
  recorded: { en: 'Recorded', hi: 'रिकॉर्डेड', sa: 'अभिलिखितम्' },

  // Video Section
  watchLearn: { en: 'Watch & Learn', hi: 'देखें और सीखें', sa: 'पश्यत अधिगच्छत च' },
  discoverJourney: { en: 'Discover the Bodhika Journey', hi: 'बोधिका यात्रा की खोज करें', sa: 'बोधिकायात्रां अन्वेषयत' },
  videoDesc: {
    en: 'See how our live classes transform children\'s understanding of Sanatan Dharma',
    hi: 'देखें कि हमारी लाइव कक्षाएं बच्चों की सनातन धर्म की समझ को कैसे बदलती हैं',
    sa: 'पश्यत कथम् अस्माकं जीवन्तकक्षाः बालकानां सनातनधर्मावबोधं परिवर्तयन्ति'
  },
  courseOverview: { en: 'Course Overview', hi: 'पाठ्यक्रम अवलोकन', sa: 'पाठ्यक्रमावलोकनम्' },
  meetTeachers: { en: 'Meet Teachers', hi: 'शिक्षकों से मिलें', sa: 'शिक्षकान् मिलत' },
  curriculumPeek: { en: 'Curriculum Peek', hi: 'पाठ्यक्रम झलक', sa: 'पाठ्यक्रमदर्शनम्' },
  studentStories: { en: 'Student Stories', hi: 'छात्र कहानियां', sa: 'छात्रकथाः' },

  // Sacred Texts Section
  sacredWisdom: { en: 'Sacred Wisdom', hi: 'पवित्र ज्ञान', sa: 'पावनज्ञानम्' },
  exploreScriptures: { en: 'Explore Timeless Scriptures & Values', hi: 'शाश्वत शास्त्रों और मूल्यों का अन्वेषण करें', sa: 'शाश्वतशास्त्राणि मूल्यानि च अन्वेषयत' },
  scripturesDesc: {
    en: 'Your child will explore the great epics, sacred texts, and timeless values that form the foundation of Sanatan Dharma',
    hi: 'आपका बच्चा महान महाकाव्यों, पवित्र ग्रंथों और शाश्वत मूल्यों का अन्वेषण करेगा जो सनातन धर्म की नींव हैं',
    sa: 'भवतः सन्तानः महाकाव्यानि पवित्रग्रन्थान् शाश्वतमूल्यानि च अन्वेषयिष्यति ये सनातनधर्मस्य आधाराः सन्ति'
  },
  dharmaQuote: { en: 'Dharma protects those who protect it — This ancient wisdom guides our entire curriculum', hi: 'धर्मो रक्षति रक्षितः — यह प्राचीन ज्ञान हमारे पूरे पाठ्यक्रम का मार्गदर्शन करता है', sa: 'धर्मो रक्षति रक्षितः — एतत् प्राचीनज्ञानम् अस्माकं सम्पूर्णपाठ्यक्रमं मार्गदर्शयति' },

  // Learning Outcomes Section
  learningOutcomes: { en: 'Learning Outcomes', hi: 'सीखने के परिणाम', sa: 'अधिगमफलानि' },
  whatChildWillLearn: { en: 'What Your Child Will Learn', hi: 'आपका बच्चा क्या सीखेगा', sa: 'भवतः सन्तानः किम् अधिगमिष्यति' },
  learningDesc: {
    en: 'A comprehensive curriculum designed to nurture every aspect of your child\'s spiritual and moral development',
    hi: 'आपके बच्चे के आध्यात्मिक और नैतिक विकास के हर पहलू को पोषित करने के लिए डिज़ाइन किया गया व्यापक पाठ्यक्रम',
    sa: 'भवतः सन्तानस्य आध्यात्मिकनैतिकविकासस्य प्रत्येकं पक्षं पोषयितुं निर्मितः व्यापकपाठ्यक्रमः'
  },

  // Learning Experience Section
  learningExperience: { en: 'Learning Experience', hi: 'सीखने का अनुभव', sa: 'अधिगमानुभवः' },
  liveRecordedExperience: { en: 'Live + Recorded Learning Experience', hi: 'लाइव + रिकॉर्डेड सीखने का अनुभव', sa: 'जीवन्त + अभिलिखित अधिगमानुभवः' },
  experienceDesc: {
    en: 'The best of both worlds - interactive live sessions with expert mentors, plus recordings for revision and flexibility.',
    hi: 'दोनों दुनियाओं का सर्वश्रेष्ठ - विशेषज्ञ मार्गदर्शकों के साथ इंटरैक्टिव लाइव सत्र, साथ ही पुनरावृत्ति और लचीलेपन के लिए रिकॉर्डिंग।',
    sa: 'उभयोः लोकयोः श्रेष्ठम् - विशेषज्ञमार्गदर्शकैः सह परस्परक्रियात्मकानि जीवन्तसत्राणि, पुनरावृत्त्यर्थं लचीलतार्थं च अभिलेखाः।'
  },
  liveMentorClasses: { en: 'Live mentor-led classes', hi: 'लाइव मेंटर-नेतृत्व वाली कक्षाएं', sa: 'जीवन्तगुरुनेतृत्वकक्षाः' },
  realTimeInteraction: { en: 'Real-time interaction and guidance', hi: 'वास्तविक समय में संपर्क और मार्गदर्शन', sa: 'वास्तविककालसंवादः मार्गदर्शनं च' },
  interactiveDiscussions: { en: 'Interactive discussions & doubts', hi: 'इंटरैक्टिव चर्चा और संदेह', sa: 'परस्परक्रियात्मकचर्चाः संशयाश्च' },
  questionsAnswered: { en: 'Get your questions answered instantly', hi: 'अपने प्रश्नों का तुरंत उत्तर पाएं', sa: 'भवतां प्रश्नानाम् उत्तराणि तत्क्षणं प्राप्नुत' },
  classRecordingsEvery: { en: 'Class recordings for every session', hi: 'हर सत्र के लिए कक्षा रिकॉर्डिंग', sa: 'प्रत्येकसत्रस्य कृते कक्षाभिलेखाः' },
  neverMissClass: { en: 'Never miss a class, revise anytime', hi: 'कोई कक्षा न छूटे, कभी भी दोहराएं', sa: 'कक्षां न त्यजत, कदापि पुनरावर्तयत' },
  learnAtPace: { en: 'Learn at your own pace', hi: 'अपनी गति से सीखें', sa: 'स्वगत्या अधिगच्छत' },
  flexibleSchedule: { en: 'Flexible learning schedule', hi: 'लचीला सीखने का कार्यक्रम', sa: 'लचीलः अधिगमकार्यक्रमः' },
  recordingAvailable: { en: 'Recording Available', hi: 'रिकॉर्डिंग उपलब्ध', sa: 'अभिलेखः उपलब्धः' },
  everySession: { en: 'Every Session', hi: 'हर सत्र', sa: 'प्रत्येकसत्रम्' },
  weeklyLive: { en: 'Weekly Live', hi: 'साप्ताहिक लाइव', sa: 'साप्ताहिकजीवन्तम्' },

  // Sanskrit Section
  specialFocus: { en: 'Special Focus', hi: 'विशेष फोकस', sa: 'विशेषकेन्द्रम्' },
  sanskritTitle: { en: 'Spoken Sanskrit', hi: 'बोलचाल की संस्कृत', sa: 'संस्कृतभाषणम्' },
  sanskritDesc: {
    en: 'Your child will learn to speak Sanskrit naturally and confidently, connecting with our ancient language in daily life.',
    hi: 'आपका बच्चा स्वाभाविक और आत्मविश्वास से संस्कृत बोलना सीखेगा, दैनिक जीवन में हमारी प्राचीन भाषा से जुड़ेगा।',
    sa: 'भवतः सन्तानः स्वाभाविकतया आत्मविश्वासेन च संस्कृतं वक्तुं शिक्षिष्यते, दैनन्दिनजीवने अस्माकं प्राचीनभाषया सह संयोक्ष्यते।'
  },
  naturalMethod: { en: 'Natural Speaking Method', hi: 'प्राकृतिक बोलने की विधि', sa: 'स्वाभाविकभाषणविधिः' },
  learnConversation: { en: 'Learn through conversation, not just grammar', hi: 'बातचीत के माध्यम से सीखें, सिर्फ व्याकरण नहीं', sa: 'संवादेन अधिगच्छत, न केवलं व्याकरणेन' },
  confidenceBased: { en: 'Confidence-Based Learning', hi: 'आत्मविश्वास-आधारित शिक्षा', sa: 'आत्मविश्वासाधारितशिक्षा' },
  buildConfidence: { en: 'Build speaking confidence step by step', hi: 'कदम दर कदम बोलने का आत्मविश्वास बनाएं', sa: 'पदे पदे भाषणात्मविश्वासं निर्मात' },
  dailyUsage: { en: 'Daily Sanskrit Usage', hi: 'दैनिक संस्कृत उपयोग', sa: 'दैनिकसंस्कृतप्रयोगः' },
  practicalPhrases: { en: 'Practical phrases for everyday use', hi: 'दैनिक उपयोग के लिए व्यावहारिक वाक्यांश', sa: 'दैनन्दिनप्रयोगार्थं व्यावहारिकवाक्यांशाः' },

  // Pricing Section
  batchPricing: { en: 'Batch & Pricing', hi: 'बैच और मूल्य', sa: 'वर्गः मूल्यं च' },
  chooseBatch: { en: 'Choose Your Batch', hi: 'अपना बैच चुनें', sa: 'स्ववर्गं चिनुत' },
  pricingDesc: { en: 'Two learning options designed for different needs', hi: 'विभिन्न आवश्यकताओं के लिए डिज़ाइन किए गए दो सीखने के विकल्प', sa: 'विभिन्नावश्यकताभ्यः निर्मितौ द्वौ अधिगमविकल्पौ' },
  groupBatch: { en: 'Group Batch', hi: 'ग्रुप बैच', sa: 'समूहवर्गः' },
  studentsPerBatch: { en: '50-60 students per batch', hi: 'प्रति बैच 50-60 छात्र', sa: 'प्रतिवर्गं ५०-६० छात्राः' },
  focusedBatch: { en: 'Focused Batch', hi: 'फोकस्ड बैच', sa: 'केन्द्रितवर्गः' },
  focusedStudents: { en: '12 students per batch', hi: 'प्रति बैच 12 छात्र', sa: 'प्रतिवर्गं १२ छात्राः' },
  recommended: { en: 'Recommended', hi: 'अनुशंसित', sa: 'अनुशंसितम्' },
  yearlyFee: { en: '/year', hi: '/वर्ष', sa: '/वर्षम्' },
  weeklyLiveClasses: { en: 'Weekly Live Classes with mentors', hi: 'मार्गदर्शकों के साथ साप्ताहिक लाइव कक्षाएं', sa: 'मार्गदर्शकैः सह साप्ताहिकजीवन्तकक्षाः' },
  peerInteractions: { en: 'Energetic peer interactions', hi: 'ऊर्जावान साथी बातचीत', sa: 'ऊर्जावत्सहपाठिसंवादाः' },
  interactiveActivities: { en: 'Interactive activities & Q&A', hi: 'इंटरैक्टिव गतिविधियां और प्रश्नोत्तर', sa: 'परस्परक्रियात्मकक्रियाः प्रश्नोत्तराणि च' },
  communityBuilding: { en: 'Community building', hi: 'समुदाय निर्माण', sa: 'समुदायनिर्माणम्' },
  fullRecordings: { en: 'Full class recordings', hi: 'पूर्ण कक्षा रिकॉर्डिंग', sa: 'पूर्णकक्षाभिलेखाः' },
  personalizedAttention: { en: 'Personalized attention', hi: 'व्यक्तिगत ध्यान', sa: 'व्यक्तिगतावधानम्' },
  smallGroupLearning: { en: 'Small group learning', hi: 'छोटे समूह में सीखना', sa: 'लघुसमूहाधिगमः' },
  deeperDiscussions: { en: 'Deeper discussions', hi: 'गहन चर्चा', sa: 'गहनचर्चाः' },
  progressTracking: { en: 'Individual progress tracking', hi: 'व्यक्तिगत प्रगति ट्रैकिंग', sa: 'व्यक्तिगतप्रगतिअनुसरणम्' },
  priorityDoubt: { en: 'Priority doubt resolution', hi: 'प्राथमिकता संदेह समाधान', sa: 'प्राथमिकतासंशयसमाधानम्' },
  enrollGroup: { en: 'Enroll in Group Batch', hi: 'ग्रुप बैच में नामांकन करें', sa: 'समूहवर्गे नामाङ्कनं कुरुत' },
  enrollFocused: { en: 'Enroll in Focused Batch', hi: 'फोकस्ड बैच में नामांकन करें', sa: 'केन्द्रितवर्गे नामाङ्कनं कुरुत' },
  scholarshipBadge: { en: 'Scholarships available for needy families', hi: 'जरूरतमंद परिवारों के लिए छात्रवृत्ति उपलब्ध', sa: 'आवश्यककुटुम्बेभ्यः छात्रवृत्तयः उपलब्धाः' },

  // Trust Section
  whyTrust: { en: 'Why Parents Trust Us', hi: 'माता-पिता हम पर क्यों भरोसा करते हैं', sa: 'पितरः अस्मान् किमर्थं विश्वसन्ति' },
  builtForGrowth: { en: "Built for Your Child's Growth", hi: 'आपके बच्चे के विकास के लिए बनाया गया', sa: 'भवतः सन्तानस्य विकासार्थं निर्मितम्' },
  educatorDesigned: { en: 'Educator-Designed Curriculum', hi: 'शिक्षक-डिज़ाइन पाठ्यक्रम', sa: 'शिक्षकनिर्मितपाठ्यक्रमः' },
  educatorDesc: { en: 'Created by experienced educators in Vedic studies', hi: 'वैदिक अध्ययन में अनुभवी शिक्षकों द्वारा बनाया गया', sa: 'वैदिकाध्ययने अनुभविशिक्षकैः निर्मितः' },
  childSafe: { en: 'Child-Safe Environment', hi: 'बाल-सुरक्षित वातावरण', sa: 'बालसुरक्षितवातावरणम्' },
  childSafeDesc: { en: 'Secure and monitored learning space', hi: 'सुरक्षित और निगरानी वाला सीखने का स्थान', sa: 'सुरक्षितं निरीक्षितं च अधिगमस्थानम्' },
  valueBased: { en: 'Value-Based Education', hi: 'मूल्य-आधारित शिक्षा', sa: 'मूल्याधारितशिक्षा' },
  valueBasedDesc: { en: 'Focus on character and moral development', hi: 'चरित्र और नैतिक विकास पर ध्यान', sa: 'चरित्रनैतिकविकासे ध्यानम्' },
  longTerm: { en: 'Long-Term Character Growth', hi: 'दीर्घकालिक चरित्र विकास', sa: 'दीर्घकालिकचरित्रविकासः' },
  longTermDesc: { en: 'Building foundations that last a lifetime', hi: 'जीवन भर चलने वाली नींव बनाना', sa: 'जीवनपर्यन्तं स्थायिनः आधाराः निर्मीयन्ते' },

  // Testimonials Section
  parentTestimonials: { en: 'Parent Testimonials', hi: 'अभिभावक प्रशंसापत्र', sa: 'पितृप्रशंसापत्राणि' },
  whatParentsSay: { en: 'What Parents Say', hi: 'माता-पिता क्या कहते हैं', sa: 'पितरः किं वदन्ति' },

  // Final CTA Section
  giveRoots: { en: 'Give Your Child Roots Before Wings', hi: 'पंख देने से पहले अपने बच्चे को जड़ें दें', sa: 'पक्षात् पूर्वं स्वसन्तानाय मूलानि ददातु' },
  finalCTADesc: {
    en: 'Enroll now and give your child the gift of timeless wisdom, strong values, and cultural pride',
    hi: 'अभी नामांकन करें और अपने बच्चे को शाश्वत ज्ञान, मजबूत मूल्यों और सांस्कृतिक गौरव का उपहार दें',
    sa: 'अधुना नामाङ्कनं कुरुत स्वसन्तानाय शाश्वतज्ञानस्य दृढमूल्यानां सांस्कृतिकगौरवस्य च उपहारं ददातु'
  },
  talkToUs: { en: 'Talk to Us', hi: 'हमसे बात करें', sa: 'अस्माभिः सह वदत' },
  limitedSeats: { en: 'Live Classes + Recordings Included • Limited Seats', hi: 'लाइव कक्षाएं + रिकॉर्डिंग शामिल • सीमित सीटें', sa: 'जीवन्तकक्षाः + अभिलेखाः सम्मिलिताः • सीमितासनानि' },

  // Sacred Texts
  ramayana: { en: 'Ramayana', hi: 'रामायण', sa: 'रामायणम्' },
  ramayanaSubtitle: { en: 'Epic of Dharma', hi: 'धर्म का महाकाव्य', sa: 'धर्ममहाकाव्यम्' },
  ramayanaDesc: { en: "Learn about Lord Rama's journey, dharma, family values, and the triumph of good over evil.", hi: 'भगवान राम की यात्रा, धर्म, पारिवारिक मूल्यों और बुराई पर अच्छाई की जीत के बारे में जानें।', sa: 'श्रीरामस्य यात्रां धर्मं कुटुम्बमूल्यानि असत्ये सत्यस्य विजयं च अधिगच्छत।' },
  mahabharata: { en: 'Mahabharata', hi: 'महाभारत', sa: 'महाभारतम्' },
  mahabharataSubtitle: { en: 'Epic of Wisdom', hi: 'ज्ञान का महाकाव्य', sa: 'ज्ञानमहाकाव्यम्' },
  mahabharataDesc: { en: "Explore the epic tales of Pandavas, Krishna's wisdom, and lessons on duty and righteousness.", hi: 'पांडवों की महाकाव्य कथाओं, कृष्ण के ज्ञान और कर्तव्य तथा धार्मिकता के पाठों का अन्वेषण करें।', sa: 'पाण्डवानां महाकाव्यकथाः कृष्णस्य ज्ञानं कर्तव्यधार्मिकतायाः पाठान् च अन्वेषयत।' },
  gita: { en: 'Bhagavad Gita', hi: 'भगवद्गीता', sa: 'भगवद्गीता' },
  gitaSubtitle: { en: 'Song of the Divine', hi: 'दिव्य गीत', sa: 'दिव्यगीतम्' },
  gitaDesc: { en: "Understand Krishna's timeless teachings on life, karma, dharma, and spiritual wisdom.", hi: 'जीवन, कर्म, धर्म और आध्यात्मिक ज्ञान पर कृष्ण की शाश्वत शिक्षाओं को समझें।', sa: 'जीवनकर्मधर्माध्यात्मिकज्ञाने कृष्णस्य शाश्वतशिक्षाः अवगच्छत।' },
  godExists: { en: 'Does God Exist?', hi: 'क्या ईश्वर है?', sa: 'ईश्वरः अस्ति वा?' },
  godExistsSubtitle: { en: 'Spiritual Inquiry', hi: 'आध्यात्मिक जिज्ञासा', sa: 'आध्यात्मिकजिज्ञासा' },
  godExistsDesc: { en: 'Age-appropriate discussions on spirituality, faith, and understanding the divine.', hi: 'आध्यात्मिकता, विश्वास और दिव्य को समझने पर आयु-उपयुक्त चर्चा।', sa: 'आध्यात्मिकतायां विश्वासे दिव्यावबोधे च आयुउपयुक्तचर्चाः।' },
  sacredTexts: { en: 'Sacred Texts', hi: 'पवित्र ग्रंथ', sa: 'पवित्रग्रन्थाः' },
  sacredTextsSubtitle: { en: 'Vedic Knowledge', hi: 'वैदिक ज्ञान', sa: 'वैदिकज्ञानम्' },
  sacredTextsDesc: { en: 'Introduction to Vedas, Upanishads, Puranas, and other sacred scriptures.', hi: 'वेदों, उपनिषदों, पुराणों और अन्य पवित्र ग्रंथों का परिचय।', sa: 'वेदानाम् उपनिषदां पुराणानाम् अन्येषां पवित्रग्रन्थानां च परिचयः।' },
  sanskars: { en: '16 Sanskars', hi: '16 संस्कार', sa: '१६ संस्काराः' },
  sanskarsSubtitle: { en: 'Life Ceremonies', hi: 'जीवन संस्कार', sa: 'जीवनसंस्काराः' },
  sanskarsDesc: { en: 'Learning the purpose, values, and relevance of the 16 Sanskars in shaping life.', hi: 'जीवन को आकार देने में 16 संस्कारों के उद्देश्य, मूल्यों और प्रासंगिकता को सीखना।', sa: 'जीवननिर्माणे षोडशसंस्काराणाम् उद्देश्यं मूल्यानि प्रासंगिकता च अधिगन्तुम्।' },

  // Learning Outcomes
  deepTeaching: { en: 'Deep Teaching of Sanatan Dharma', hi: 'सनातन धर्म की गहन शिक्षा', sa: 'सनातनधर्मस्य गहनशिक्षा' },
  deepTeachingDesc: { en: "Clear, age-appropriate and in-depth understanding of Sanatan Dharma—its philosophy, principles, duties, and way of life.", hi: 'सनातन धर्म की स्पष्ट, आयु-उपयुक्त और गहन समझ—इसका दर्शन, सिद्धांत, कर्तव्य और जीवन शैली।', sa: 'सनातनधर्मस्य स्पष्टा आयुउपयुक्ता गहना च अवबोधः—तस्य दर्शनं सिद्धान्ताः कर्तव्यानि जीवनशैली च।' },
  cultureTraditions: { en: 'Indian Culture & Traditions', hi: 'भारतीय संस्कृति और परंपराएं', sa: 'भारतीयसंस्कृतिः परम्पराश्च' },
  cultureTraditionsDesc: { en: 'Deep understanding of Indian culture, festivals, rituals, and traditions with meaning, relevance, and cultural pride.', hi: 'भारतीय संस्कृति, त्योहारों, रीति-रिवाजों और परंपराओं की गहन समझ अर्थ, प्रासंगिकता और सांस्कृतिक गौरव के साथ।', sa: 'भारतीयसंस्कृतेः उत्सवानां संस्काराणां परम्पराणां च गहनावबोधः अर्थेन प्रासंगिकतया सांस्कृतिकगौरवेण च।' },
  sanskarsLearning: { en: '16 Sanskars (Shodasha Samskāra)', hi: '16 संस्कार (षोडश संस्कार)', sa: 'षोडशसंस्काराः' },
  sanskarsLearningDesc: { en: 'Learning the purpose, values, and relevance of the 16 Sanskars and how they shape a balanced and disciplined life.', hi: '16 संस्कारों के उद्देश्य, मूल्यों और प्रासंगिकता को सीखना और वे कैसे संतुलित और अनुशासित जीवन को आकार देते हैं।', sa: 'षोडशसंस्काराणाम् उद्देश्यं मूल्यानि प्रासंगिकता च अधिगन्तुं ते कथं सन्तुलितं अनुशासितं च जीवनं निर्मान्ति।' },
  mantrasShlokas: { en: 'Mantras & Shlokas', hi: 'मंत्र और श्लोक', sa: 'मन्त्राः श्लोकाश्च' },
  mantrasDesc: { en: 'Learning important mantras and shlokas with correct pronunciation, meaning, and daily-life application.', hi: 'सही उच्चारण, अर्थ और दैनिक जीवन में प्रयोग के साथ महत्वपूर्ण मंत्रों और श्लोकों को सीखना।', sa: 'शुद्धोच्चारणेन अर्थेन दैनन्दिनजीवनप्रयोगेन च महत्त्वपूर्णमन्त्रान् श्लोकान् च अधिगन्तुम्।' },
  moralValues: { en: 'Moral Values & Character Building', hi: 'नैतिक मूल्य और चरित्र निर्माण', sa: 'नैतिकमूल्यानि चरित्रनिर्माणं च' },
  moralValuesDesc: { en: 'Strong moral foundation including truth, discipline, compassion, respect, responsibility, and ethical living.', hi: 'सत्य, अनुशासन, करुणा, सम्मान, जिम्मेदारी और नैतिक जीवन सहित मजबूत नैतिक आधार।', sa: 'सत्यं अनुशासनं करुणा आदरः उत्तरदायित्वं नैतिकजीवनं च सम्मिलित्य दृढनैतिकाधारः।' },
  storyWisdom: { en: 'Story-Based Wisdom', hi: 'कहानी-आधारित ज्ञान', sa: 'कथाधारितज्ञानम्' },
  storyWisdomDesc: { en: 'Powerful stories that teach life lessons, emotional intelligence, courage, and right decision-making.', hi: 'शक्तिशाली कहानियां जो जीवन के पाठ, भावनात्मक बुद्धिमत्ता, साहस और सही निर्णय लेना सिखाती हैं।', sa: 'शक्तिशालिन्यः कथाः याः जीवनपाठान् भावात्मकबुद्धिं साहसं सम्यक्निर्णयं च शिक्षयन्ति।' },
  spokenSanskritLearning: { en: 'Spoken Sanskrit', hi: 'बोलचाल की संस्कृत', sa: 'संस्कृतभाषणम्' },
  spokenSanskritDesc: { en: 'Ability to speak basic Sanskrit confidently using daily-use words, sentences, and simple conversations.', hi: 'दैनिक उपयोग के शब्दों, वाक्यों और सरल बातचीत का उपयोग करके आत्मविश्वास से बुनियादी संस्कृत बोलने की क्षमता।', sa: 'दैनन्दिनप्रयोगशब्दानां वाक्यानां सरलसंवादानां च प्रयोगेन आत्मविश्वासेन मूलसंस्कृतं वक्तुं क्षमता।' },
  mindfulness: { en: 'Mindfulness & Inner Strength', hi: 'माइंडफुलनेस और आंतरिक शक्ति', sa: 'सावधानता आन्तरिकशक्तिश्च' },
  mindfulnessDesc: { en: 'Practices that develop focus, calmness, emotional balance, self-awareness, and confidence.', hi: 'अभ्यास जो ध्यान, शांति, भावनात्मक संतुलन, आत्म-जागरूकता और आत्मविश्वास विकसित करते हैं।', sa: 'अभ्यासाः ये ध्यानं शान्तिं भावात्मकसन्तुलनम् आत्मजागरूकताम् आत्मविश्वासं च विकासयन्ति।' },
  
  // Additional Learning Outcomes
  vedantaBasics: { en: 'Vedanta Philosophy Basics', hi: 'वेदांत दर्शन की मूल बातें', sa: 'वेदान्तदर्शनमूलतत्त्वानि' },
  vedantaDesc: { en: 'Introduction to fundamental concepts of Vedanta including Atman, Brahman, Maya, and the nature of reality.', hi: 'आत्मा, ब्रह्म, माया और वास्तविकता की प्रकृति सहित वेदांत की मौलिक अवधारणाओं का परिचय।', sa: 'आत्मा ब्रह्म माया वास्तविकतायाः स्वभावश्च सम्मिलित्य वेदान्तस्य मौलिकधारणानां परिचयः।' },
  poojaRituals: { en: 'Pooja & Daily Rituals', hi: 'पूजा और दैनिक अनुष्ठान', sa: 'पूजा दैनिकसंस्काराश्च' },
  poojaDesc: { en: 'Understanding the significance and practice of daily worship, aarti, and home rituals.', hi: 'दैनिक पूजा, आरती और घरेलू अनुष्ठानों के महत्व और अभ्यास को समझना।', sa: 'दैनिकपूजायाः आरत्याः गृहसंस्काराणां च महत्त्वं अभ्यासं च अवगन्तुम्।' },
  yogaBreathing: { en: 'Yoga & Pranayama Basics', hi: 'योग और प्राणायाम की मूल बातें', sa: 'योगप्राणायाममूलतत्त्वानि' },
  yogaDesc: { en: 'Simple yoga postures and breathing techniques for physical health and mental clarity.', hi: 'शारीरिक स्वास्थ्य और मानसिक स्पष्टता के लिए सरल योग मुद्राएं और श्वास तकनीक।', sa: 'शारीरिकस्वास्थ्याय मानसिकस्पष्टतायै च सरलयोगमुद्राः श्वासतन्त्राणि च।' },
  environmentalValues: { en: 'Environmental Consciousness', hi: 'पर्यावरण चेतना', sa: 'पर्यावरणचेतना' },
  environmentalDesc: { en: 'Learning respect for nature, Pancha Mahabhutas, and the dharmic approach to environmental care.', hi: 'प्रकृति के प्रति सम्मान, पंच महाभूत और पर्यावरण देखभाल के धार्मिक दृष्टिकोण को सीखना।', sa: 'प्रकृतेः प्रति आदरं पञ्चमहाभूतान् पर्यावरणरक्षायाः धार्मिकदृष्टिकोणं च अधिगन्तुम्।' },
  respectElders: { en: 'Respect for Elders & Gurus', hi: 'बड़ों और गुरुओं का सम्मान', sa: 'वृद्धानां गुरूणां च आदरः' },
  respectDesc: { en: 'Understanding the importance of guru-shishya parampara and respecting parents, elders, and teachers.', hi: 'गुरु-शिष्य परंपरा के महत्व को समझना और माता-पिता, बड़ों और शिक्षकों का सम्मान करना।', sa: 'गुरुशिष्यपरम्परायाः महत्त्वम् अवगन्तुं पितृभ्यः वृद्धेभ्यः शिक्षकेभ्यश्च आदरं कर्तुं च।' },
  festivalCelebrations: { en: 'Festival Significance', hi: 'त्योहारों का महत्व', sa: 'उत्सवमहत्त्वम्' },
  festivalDesc: { en: 'Deep understanding of major Hindu festivals - their stories, rituals, and spiritual significance.', hi: 'प्रमुख हिंदू त्योहारों की गहन समझ - उनकी कहानियां, अनुष्ठान और आध्यात्मिक महत्व।', sa: 'प्रमुखहिन्दूत्सवानां गहनावबोधः - तेषां कथाः संस्काराः आध्यात्मिकमहत्त्वं च।' },
};

// WhatsApp Number
const WHATSAPP_NUMBER = '919876543210'; // Replace with actual number

// Scroll helper
const scrollToPricing = () => {
  document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
};

// Hero Section Component
const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroGurukul} 
          alt="Children learning in traditional Gurukul setting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon/95 via-maroon/80 to-transparent" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 opacity-10">
          <img src={omDivine} alt="" className="w-full h-full object-contain rounded-full" />
        </div>
        <div className="absolute bottom-40 left-10 w-20 h-20 opacity-15">
          <Sun className="w-full h-full text-saffron" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 animate-fade-in">
            <Badge className="bg-saffron/20 text-white border-saffron/30 backdrop-blur-sm px-4 py-2 text-sm font-body">
              {t(bodhikaTranslations.heroBadge)}
            </Badge>
            
            <div className="border-l-4 border-saffron pl-6">
              <p className="text-cream/90 font-body text-lg mb-2 tracking-wide">
                {t(bodhikaTranslations.heroSubtitle)}
              </p>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
                {t(bodhikaTranslations.heroTitle)}
              </h1>
            </div>
            
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-cream">
              {t(bodhikaTranslations.heroTagline)}
            </h2>
            
            <p className="font-body text-lg md:text-xl text-cream/85 max-w-xl leading-relaxed">
              {t(bodhikaTranslations.heroDesc)}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-saffron text-white hover:bg-saffron/90 font-semibold px-8 py-6 text-lg shadow-lg"
                onClick={scrollToPricing}
              >
                {t(bodhikaTranslations.enrollNow)}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-cream text-cream hover:bg-cream/10 font-semibold px-8 py-6 text-lg"
                onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I want to know more about Bodhika course.`, '_blank')}
              >
                <Phone className="mr-2 h-5 w-5" />
                {t(bodhikaTranslations.bookCounseling)}
              </Button>
            </div>
            
            {/* Trust Icons */}
            <div className="flex flex-wrap gap-6 pt-6">
              {[
                { icon: Video, label: t(bodhikaTranslations.liveClasses) },
                { icon: Download, label: t(bodhikaTranslations.recordedAccess) },
                { icon: Smile, label: t(bodhikaTranslations.childFriendly) },
                { icon: Calendar, label: t(bodhikaTranslations.oneYearProgram) },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-cream/90">
                  <div className="w-10 h-10 rounded-full bg-saffron/20 flex items-center justify-center backdrop-blur-sm">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="font-body text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right - Hero Carousel */}
          <div className="relative hidden lg:block">
            <HeroCarousel />
          </div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};

// Highlight Strip Component
const HighlightStrip = () => {
  const { t } = useLanguage();
  
  const highlights = [
    { icon: Calendar, label: t(bodhikaTranslations.monthsLearning) },
    { icon: Video, label: t(bodhikaTranslations.liveInteractive) },
    { icon: Download, label: t(bodhikaTranslations.classRecordings) },
    { icon: BookOpen, label: t(bodhikaTranslations.deepSanatan) },
    { icon: Mic, label: t(bodhikaTranslations.spokenSanskrit) },
    { icon: Heart, label: t(bodhikaTranslations.moralEducation) },
  ];
  
  return (
    <section className="py-8 bg-maroon">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-cream">
              <div className="w-12 h-12 rounded-full bg-saffron/20 flex items-center justify-center">
                <item.icon className="h-6 w-6" />
              </div>
              <span className="font-body font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-saffron/10 text-saffron border-saffron/20 mb-4">{t(bodhikaTranslations.aboutCourse)}</Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground lotus-underline inline-block">
            {t(bodhikaTranslations.whatIsBodhika)}
          </h2>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="relative">
              <img 
                src={mantrasScene} 
                alt="Children chanting mantras"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-saffron text-white p-4 rounded-xl shadow-lg">
                <Sparkles className="h-8 w-8" />
              </div>
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              <p className="font-body text-lg md:text-xl text-foreground leading-relaxed">
                <span className="font-semibold text-maroon">{t(bodhikaTranslations.heroTitle)}</span> {t(bodhikaTranslations.aboutDesc1).replace('Bodhika is a', 'is a')}
              </p>
              <p className="font-body text-muted-foreground">
                {t(bodhikaTranslations.aboutDesc2)}
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  { number: "100%", label: t(bodhikaTranslations.liveSessions) },
                  { number: "12", label: t(bodhikaTranslations.months) },
                  { number: "✓", label: t(bodhikaTranslations.recorded) },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-cream/50 rounded-xl p-4 text-center">
                    <div className="font-heading text-2xl font-bold text-maroon">{stat.number}</div>
                    <div className="font-body text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Video Section Component  
const VideoSection = () => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-maroon via-maroon to-maroon-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-saffron/20 text-saffron border-saffron/30 mb-4">{t(bodhikaTranslations.watchLearn)}</Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t(bodhikaTranslations.discoverJourney)}
          </h2>
          <p className="font-body text-lg text-cream/80 max-w-2xl mx-auto">
            {t(bodhikaTranslations.videoDesc)}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            {!isPlaying ? (
              <>
                <img 
                  src={videoThumbnail} 
                  alt="Course Introduction Video"
                  className="w-full aspect-video object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                
                {/* Play Button */}
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative">
                    {/* Pulse Animation */}
                    <div className="absolute inset-0 bg-saffron rounded-full animate-ping opacity-25" />
                    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-saffron rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </button>

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  10:30
                </div>
              </>
            ) : (
              <div className="aspect-video bg-black flex items-center justify-center relative">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Bodhika Course Introduction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            )}
          </div>

          {/* Video Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { icon: "🎯", text: t(bodhikaTranslations.courseOverview) },
              { icon: "👨‍🏫", text: t(bodhikaTranslations.meetTeachers) },
              { icon: "📚", text: t(bodhikaTranslations.curriculumPeek) },
              { icon: "🌟", text: t(bodhikaTranslations.studentStories) }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Sacred Texts & Wisdom Section
const SacredTextsSection = () => {
  const { t } = useLanguage();
  
  const sacredTexts = [
    {
      image: ramayanaScene,
      title: t(bodhikaTranslations.ramayana),
      subtitle: t(bodhikaTranslations.ramayanaSubtitle),
      description: t(bodhikaTranslations.ramayanaDesc)
    },
    {
      image: mahabharataScene,
      title: t(bodhikaTranslations.mahabharata),
      subtitle: t(bodhikaTranslations.mahabharataSubtitle),
      description: t(bodhikaTranslations.mahabharataDesc)
    },
    {
      image: gitaScene,
      title: t(bodhikaTranslations.gita),
      subtitle: t(bodhikaTranslations.gitaSubtitle),
      description: t(bodhikaTranslations.gitaDesc)
    },
    {
      image: omDivine,
      title: t(bodhikaTranslations.godExists),
      subtitle: t(bodhikaTranslations.godExistsSubtitle),
      description: t(bodhikaTranslations.godExistsDesc)
    },
    {
      image: vedasTexts,
      title: t(bodhikaTranslations.sacredTexts),
      subtitle: t(bodhikaTranslations.sacredTextsSubtitle),
      description: t(bodhikaTranslations.sacredTextsDesc)
    },
    {
      image: sanskarScene,
      title: t(bodhikaTranslations.sanskars),
      subtitle: t(bodhikaTranslations.sanskarsSubtitle),
      description: t(bodhikaTranslations.sanskarsDesc)
    },
  ];
  
  return (
    <section className="py-20 bg-gradient-to-b from-background to-cream/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-maroon/10 text-maroon border-maroon/20 mb-4">
            {t(bodhikaTranslations.sacredWisdom)}
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t(bodhikaTranslations.exploreScriptures)}
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(bodhikaTranslations.scripturesDesc)}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sacredTexts.map((item, idx) => (
            <SacredTextCard 
              key={idx}
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
            />
          ))}
        </div>
        
        <CulturalDivider variant="om" className="mt-16" />
        
        {/* Visual Quote */}
        <div className="max-w-3xl mx-auto mt-8">
          <Card className="border-0 shadow-elevated bg-gradient-to-br from-saffron/5 to-maroon/5 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <img src={omDivine} alt="" className="w-full h-full object-cover" />
            </div>
            <CardContent className="p-8 md:p-10 text-center relative z-10">
              <Quote className="h-10 w-10 text-saffron/40 mx-auto mb-4" />
              <p className="font-heading text-xl md:text-2xl text-foreground italic mb-4">
                "धर्मो रक्षति रक्षितः"
              </p>
              <p className="font-body text-muted-foreground">
                {t(bodhikaTranslations.dharmaQuote)}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Learning Outcomes Section
const LearningSection = () => {
  const { t } = useLanguage();
  
  const learningOutcomes = [
    {
      icon: BookMarked,
      image: vedasTexts,
      title: t(bodhikaTranslations.deepTeaching),
      description: t(bodhikaTranslations.deepTeachingDesc)
    },
    {
      icon: Globe,
      image: heroCulture,
      title: t(bodhikaTranslations.cultureTraditions),
      description: t(bodhikaTranslations.cultureTraditionsDesc)
    },
    {
      icon: Award,
      image: sanskarScene,
      title: t(bodhikaTranslations.sanskarsLearning),
      description: t(bodhikaTranslations.sanskarsLearningDesc)
    },
    {
      icon: Music,
      image: mantrasScene,
      title: t(bodhikaTranslations.mantrasShlokas),
      description: t(bodhikaTranslations.mantrasDesc)
    },
    {
      icon: Heart,
      image: ramayanaScene,
      title: t(bodhikaTranslations.moralValues),
      description: t(bodhikaTranslations.moralValuesDesc)
    },
    {
      icon: Feather,
      image: mahabharataScene,
      title: t(bodhikaTranslations.storyWisdom),
      description: t(bodhikaTranslations.storyWisdomDesc)
    },
    {
      icon: Mic,
      image: heroSanskrit,
      title: t(bodhikaTranslations.spokenSanskritLearning),
      description: t(bodhikaTranslations.spokenSanskritDesc)
    },
    {
      icon: Brain,
      image: heroMeditation,
      title: t(bodhikaTranslations.mindfulness),
      description: t(bodhikaTranslations.mindfulnessDesc)
    },
    {
      icon: Lightbulb,
      image: gitaScene,
      title: t(bodhikaTranslations.vedantaBasics),
      description: t(bodhikaTranslations.vedantaDesc)
    },
    {
      icon: Flame,
      image: omDivine,
      title: t(bodhikaTranslations.poojaRituals),
      description: t(bodhikaTranslations.poojaDesc)
    },
    {
      icon: Leaf,
      image: heroGurukul,
      title: t(bodhikaTranslations.yogaBreathing),
      description: t(bodhikaTranslations.yogaDesc)
    },
    {
      icon: TreePine,
      image: heroCulture,
      title: t(bodhikaTranslations.environmentalValues),
      description: t(bodhikaTranslations.environmentalDesc)
    },
    {
      icon: Hand,
      image: sanskarScene,
      title: t(bodhikaTranslations.respectElders),
      description: t(bodhikaTranslations.respectDesc)
    },
    {
      icon: Sun,
      image: mantrasScene,
      title: t(bodhikaTranslations.festivalCelebrations),
      description: t(bodhikaTranslations.festivalDesc)
    },
  ];
  
  return (
    <section className="py-20 bg-hero-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-saffron/10 text-saffron border-saffron/20 mb-4">
            {t(bodhikaTranslations.learningOutcomes)}
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t(bodhikaTranslations.whatChildWillLearn)}
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(bodhikaTranslations.learningDesc)}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningOutcomes.map((item, idx) => (
            <LearningOutcomeCard 
              key={idx}
              icon={item.icon}
              image={item.image}
              title={item.title}
              description={item.description}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Live + Recorded Section
const LearningExperienceSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <Badge className="bg-saffron/10 text-saffron border-saffron/20 mb-4">{t(bodhikaTranslations.learningExperience)}</Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t(bodhikaTranslations.liveRecordedExperience)}
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-8">
              {t(bodhikaTranslations.experienceDesc)}
            </p>
            
            <div className="space-y-4">
              {[
                { icon: Radio, label: t(bodhikaTranslations.liveMentorClasses), desc: t(bodhikaTranslations.realTimeInteraction) },
                { icon: MessageCircle, label: t(bodhikaTranslations.interactiveDiscussions), desc: t(bodhikaTranslations.questionsAnswered) },
                { icon: Download, label: t(bodhikaTranslations.classRecordingsEvery), desc: t(bodhikaTranslations.neverMissClass) },
                { icon: Clock, label: t(bodhikaTranslations.learnAtPace), desc: t(bodhikaTranslations.flexibleSchedule) },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-cream/50 hover:bg-cream transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-saffron to-maroon flex items-center justify-center shrink-0">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground">{item.label}</h4>
                    <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Visual */}
          <div className="relative">
            <img 
              src={onlineLearning} 
              alt="Children learning online"
              className="w-full rounded-2xl shadow-2xl"
            />
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-elevated border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground">{t(bodhikaTranslations.recordingAvailable)}</p>
                  <p className="font-heading font-semibold text-foreground">{t(bodhikaTranslations.everySession)}</p>
                </div>
              </div>
            </div>
            
            {/* Stats Card */}
            <div className="absolute -top-4 -right-4 bg-saffron text-white rounded-2xl p-4 shadow-lg">
              <div className="text-center">
                <div className="font-heading text-2xl font-bold">2x</div>
                <div className="font-body text-xs">{t(bodhikaTranslations.weeklyLive)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Sanskrit Highlight Section
const SanskritSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-br from-maroon to-maroon-dark text-white overflow-hidden relative">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <img src={heroSanskrit} alt="" className="w-full h-full object-cover" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-saffron/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <Mic className="h-5 w-5" />
            <span className="font-body">{t(bodhikaTranslations.specialFocus)}</span>
          </div>
          
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            संस्कृतभाषणम्
          </h2>
          <h3 className="font-heading text-2xl md:text-3xl font-semibold mb-8 text-cream">
            {t(bodhikaTranslations.sanskritTitle)}
          </h3>
          
          <p className="font-body text-lg md:text-xl text-cream/80 mb-12 max-w-2xl mx-auto">
            {t(bodhikaTranslations.sanskritDesc)}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Lightbulb, title: t(bodhikaTranslations.naturalMethod), desc: t(bodhikaTranslations.learnConversation) },
              { icon: Star, title: t(bodhikaTranslations.confidenceBased), desc: t(bodhikaTranslations.buildConfidence) },
              { icon: Target, title: t(bodhikaTranslations.dailyUsage), desc: t(bodhikaTranslations.practicalPhrases) },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-saffron flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h4 className="font-heading text-lg font-semibold mb-2">{item.title}</h4>
                <p className="font-body text-sm text-cream/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const PricingSection = () => {
  const { t } = useLanguage();
  
  return (
    <section id="pricing-section" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-saffron/10 text-saffron border-saffron/20 mb-4">
            {t(bodhikaTranslations.batchPricing)}
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t(bodhikaTranslations.chooseBatch)}
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            {t(bodhikaTranslations.pricingDesc)}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Group Batch */}
          <Card className="border-2 border-border shadow-card hover-lift overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <img src={heroGurukul} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="bg-cream/50 p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-saffron/10 text-saffron">{t(bodhikaTranslations.groupBatch)}</Badge>
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-body text-muted-foreground">{t(bodhikaTranslations.studentsPerBatch)}</p>
            </div>
            <CardContent className="p-6 relative z-10">
              <div className="mb-6">
                <span className="font-heading text-4xl font-bold text-foreground">₹6,000</span>
                <span className="font-body text-muted-foreground">{t(bodhikaTranslations.yearlyFee)}</span>
              </div>
              
              <ul className="space-y-3 mb-6">
                {[
                  t(bodhikaTranslations.weeklyLiveClasses),
                  t(bodhikaTranslations.peerInteractions),
                  t(bodhikaTranslations.interactiveActivities),
                  t(bodhikaTranslations.communityBuilding),
                  t(bodhikaTranslations.fullRecordings),
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="font-body text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="w-full bg-saffron hover:bg-saffron/90 text-white">
                {t(bodhikaTranslations.enrollGroup)}
              </Button>
            </CardContent>
          </Card>
          
          {/* Focused Batch */}
          <Card className="border-2 border-saffron shadow-elevated hover-lift overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <img src={mantrasScene} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-4 right-4 z-20">
              <Badge className="bg-saffron text-white border-0">{t(bodhikaTranslations.recommended)}</Badge>
            </div>
            <div className="bg-gradient-to-r from-saffron to-maroon p-6 text-white relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-white/20 text-white border-white/30">{t(bodhikaTranslations.focusedBatch)}</Badge>
                <GraduationCap className="h-6 w-6" />
              </div>
              <p className="font-body text-white/90">{t(bodhikaTranslations.focusedStudents)}</p>
            </div>
            <CardContent className="p-6 relative z-10">
              <div className="mb-6">
                <span className="font-heading text-4xl font-bold text-foreground">₹13,000</span>
                <span className="font-body text-muted-foreground">{t(bodhikaTranslations.yearlyFee)}</span>
              </div>
              
              <ul className="space-y-3 mb-6">
                {[
                  t(bodhikaTranslations.personalizedAttention),
                  t(bodhikaTranslations.smallGroupLearning),
                  t(bodhikaTranslations.deeperDiscussions),
                  t(bodhikaTranslations.progressTracking),
                  t(bodhikaTranslations.fullRecordings),
                  t(bodhikaTranslations.priorityDoubt),
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-saffron shrink-0" />
                    <span className="font-body text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="w-full bg-maroon hover:bg-maroon/90 text-white">
                {t(bodhikaTranslations.enrollFocused)}
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Scholarship Badge */}
        <div className="text-center mt-8">
          <Badge className="bg-green-100 text-green-700 border-green-200 px-6 py-2">
            <Award className="h-4 w-4 mr-2 inline" />
            {t(bodhikaTranslations.scholarshipBadge)}
          </Badge>
        </div>
      </div>
    </section>
  );
};

// Trust Section
const TrustSection = () => {
  const { t } = useLanguage();
  
  const trustPoints = [
    { icon: GraduationCap, title: t(bodhikaTranslations.educatorDesigned), desc: t(bodhikaTranslations.educatorDesc) },
    { icon: Shield, title: t(bodhikaTranslations.childSafe), desc: t(bodhikaTranslations.childSafeDesc) },
    { icon: Heart, title: t(bodhikaTranslations.valueBased), desc: t(bodhikaTranslations.valueBasedDesc) },
    { icon: Target, title: t(bodhikaTranslations.longTerm), desc: t(bodhikaTranslations.longTermDesc) },
  ];
  
  return (
    <section className="py-20 bg-cream/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-maroon/10 text-maroon border-maroon/20 mb-4">{t(bodhikaTranslations.whyTrust)}</Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            {t(bodhikaTranslations.builtForGrowth)}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((item, idx) => (
            <Card key={idx} className="border-0 shadow-card hover-lift bg-white group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-saffron/20 to-maroon/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="h-8 w-8 text-maroon" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      quote: "My daughter now wakes up excited for her Bodhika classes. She's learning Sanskrit and loves sharing stories from Ramayana at dinner time!"
    },
    {
      name: "Rajesh Kumar",
      location: "Bangalore, Karnataka",
      quote: "The way they teach complex concepts in simple, engaging ways is remarkable. My son's understanding of our culture has deepened beautifully."
    },
    {
      name: "Sunita Patel",
      location: "Ahmedabad, Gujarat",
      quote: "Finally, a program that gives my children roots in Sanatan Dharma while being modern and engaging. The recordings are a blessing!"
    },
  ];
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-saffron/10 text-saffron border-saffron/20 mb-4">{t(bodhikaTranslations.parentTestimonials)}</Badge>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            {t(bodhikaTranslations.whatParentsSay)}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((item, idx) => (
            <TestimonialCard 
              key={idx}
              name={item.name}
              location={item.location}
              quote={item.quote}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Final CTA Section
const FinalCTASection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroGurukul} 
          alt="Children learning"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon/95 to-maroon/80" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          {t(bodhikaTranslations.giveRoots)}
        </h2>
        <p className="font-body text-lg md:text-xl text-cream/80 mb-8 max-w-2xl mx-auto">
          {t(bodhikaTranslations.finalCTADesc)}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-saffron hover:bg-saffron/90 text-white font-semibold px-10 py-6 text-lg shadow-lg"
            onClick={scrollToPricing}
          >
            {t(bodhikaTranslations.enrollNow)}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-cream text-cream hover:bg-cream/10 font-semibold px-10 py-6 text-lg"
            onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I want to know more about Bodhika course.`, '_blank')}
          >
            <Phone className="mr-2 h-5 w-5" />
            {t(bodhikaTranslations.talkToUs)}
          </Button>
        </div>
        
        <p className="font-body text-cream/70 mt-6">
          {t(bodhikaTranslations.limitedSeats)}
        </p>
      </div>
    </section>
  );
};

// Sticky Enroll Button
const StickyEnrollButton = () => {
  const { t } = useLanguage();
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-up">
      <Button
        size="lg"
        className="bg-saffron hover:bg-saffron/90 text-white font-semibold px-8 py-4 rounded-full shadow-2xl"
        onClick={scrollToPricing}
      >
        <Flame className="mr-2 h-5 w-5" />
        {t(bodhikaTranslations.enrollNow)}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};

// Main Page Component
const BodhikaLanding = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <Helmet>
        <title>Bodhika - Sanatan Dharma Course for Children | Shastrakulam</title>
        <meta name="description" content="Bodhika is a 1-year live online program teaching Sanatan Dharma, Sanskrit, moral values, and Indian culture to children through engaging classes and stories." />
        <meta name="keywords" content="Sanatan Dharma course, children education, Sanskrit learning, Indian culture, Vedic education, online learning, Ramayana, Mahabharata, Bhagavad Gita" />
      </Helmet>
      
      <HeroSection />
      <HighlightStrip />
      <AboutSection />
      <VideoSection />
      <SacredTextsSection />
      <LearningSection />
      <LearningExperienceSection />
      <SanskritSection />
      <PricingSection />
      <TrustSection />
      <TestimonialsSection />
      <FinalCTASection />
      <StickyEnrollButton />
    </Layout>
  );
};

export default BodhikaLanding;
