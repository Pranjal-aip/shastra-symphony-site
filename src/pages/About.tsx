import React from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, Globe, Heart, Users, Calendar, Sparkles, Target, Eye, Award, GraduationCap } from 'lucide-react';
import founderAboutImage from '@/assets/founder-yogesh-about.jpg';

const seoData = {
  title: {
    en: 'About Shastrakulam | Our Mission, Vision & Story',
    hi: 'शास्त्रकुलम् के बारे में | हमारा मिशन, विजन और कहानी',
    sa: 'शास्त्रकुलम् विषये | अस्माकं लक्ष्यं दृष्टिः कथा च'
  },
  description: {
    en: 'Discover Shastrakulam\'s journey from 2019 to becoming India\'s leading Vedic education platform. Founded by Acharya Yogesh Bhardwaj with a vision for Bharat 2047.',
    hi: '2019 से भारत के अग्रणी वैदिक शिक्षा मंच बनने तक शास्त्रकुलम की यात्रा की खोज करें। भारत 2047 की दृष्टि के साथ आचार्य योगेश भारद्वाज द्वारा स्थापित।',
    sa: '2019 तः भारतस्य अग्रणी वैदिकशिक्षामञ्चं भवितुं शास्त्रकुलस्य यात्रां अन्वेषयत। भारतस्य 2047 दृष्ट्या आचार्ययोगेशभारद्वाजेन स्थापितम्।'
  }
};

const aboutTranslations = {
  pageTitle: {
    en: 'About Shastrakulam',
    hi: 'शास्त्रकुलम् के बारे में',
    sa: 'शास्त्रकुलम् विषये'
  },
  pageSubtitle: {
    en: 'Nurturing minds through timeless wisdom and Sanskrit traditions.',
    hi: 'शाश्वत ज्ञान और संस्कृत परंपराओं के माध्यम से मन का पोषण।',
    sa: 'शाश्वतज्ञानेन संस्कृतपरम्पराभिश्च मनसः पोषणम्।'
  },
  journeyTitle: {
    en: 'Our Sacred Journey',
    hi: 'हमारी पवित्र यात्रा',
    sa: 'अस्माकं पवित्रा यात्रा'
  },
  journeyP1: {
    en: 'In 2019, as the world paused, our founder Acharya Yogesh Bhardwaj noticed something profound: children and families had more time than ever, yet they were drifting further from their roots. Parents reached out, asking, "How do we teach our children about dharma in today\'s world?"',
    hi: '2019 में, जब दुनिया थम गई, हमारे संस्थापक आचार्य योगेश भारद्वाज ने कुछ गहरा देखा: बच्चों और परिवारों के पास पहले से कहीं अधिक समय था, फिर भी वे अपनी जड़ों से दूर हो रहे थे। माता-पिता ने पूछा, "आज की दुनिया में हम अपने बच्चों को धर्म के बारे में कैसे सिखाएं?"',
    sa: '2019 वर्षे यदा विश्वं स्थगितमासीत्, अस्माकं संस्थापकः आचार्ययोगेशभारद्वाजः किञ्चित् गम्भीरमपश्यत्: बालकाः कुटुम्बानि च पूर्वापेक्षया अधिककालं प्राप्तवन्तः, तथापि ते स्वमूलेभ्यः दूरं गच्छन्ति स्म। पितरः पृष्टवन्तः, "अद्यतनविश्वे वयं स्वबालकान् धर्मं कथं शिक्षयामः?"'
  },
  journeyP2: {
    en: 'This question sparked the creation of Shastrakulam — not just another online learning platform, but a digital Gurukul that honors the sacred tradition of knowledge transmission while embracing modern pedagogical excellence.',
    hi: 'इस प्रश्न ने शास्त्रकुलम् के निर्माण को प्रेरित किया — केवल एक और ऑनलाइन शिक्षण मंच नहीं, बल्कि एक डिजिटल गुरुकुल जो ज्ञान प्रसारण की पवित्र परंपरा का सम्मान करता है और आधुनिक शैक्षणिक उत्कृष्टता को अपनाता है।',
    sa: 'एषः प्रश्नः शास्त्रकुलस्य निर्माणं प्रेरितवान् — केवलमन्यः अन्तर्जालशिक्षणमञ्चः नैव, अपितु डिजिटलगुरुकुलं यत् ज्ञानप्रसारणस्य पवित्रपरम्परां सम्मानयति आधुनिकशैक्षणिकोत्कृष्टतां च अङ्गीकरोति।'
  },
  journeyP3: {
    en: 'Today, Shastrakulam serves families worldwide, helping them rediscover the essence of Bharat through structured, age-appropriate curricula that seamlessly integrate ancient wisdom with contemporary learning methodologies.',
    hi: 'आज, शास्त्रकुलम् विश्वभर के परिवारों की सेवा करता है, उन्हें व्यवस्थित, आयु-उपयुक्त पाठ्यक्रमों के माध्यम से भारत के सार को फिर से खोजने में मदद करता है जो प्राचीन ज्ञान को समकालीन शिक्षण पद्धतियों के साथ सहजता से एकीकृत करते हैं।',
    sa: 'अद्य शास्त्रकुलं विश्वस्य कुटुम्बानां सेवां करोति, तान् व्यवस्थितैः वयोऽनुकूलैः पाठ्यक्रमैः भारतस्य सारं पुनः अन्वेष्टुं साहाय्यं करोति ये प्राचीनज्ञानं समकालीनशिक्षणपद्धतिभिः सह सहजतया एकीकुर्वन्ति।'
  },
  missionTitle: {
    en: 'Our Mission',
    hi: 'हमारा मिशन',
    sa: 'अस्माकं लक्ष्यम्'
  },
  missionText: {
    en: 'To make authentic Sanatan education accessible to every family, regardless of their location or background, through carefully structured, age-appropriate learning experiences that nurture both spiritual growth and practical wisdom.',
    hi: 'प्रामाणिक सनातन शिक्षा को हर परिवार के लिए सुलभ बनाना, चाहे उनका स्थान या पृष्ठभूमि कुछ भी हो, सावधानीपूर्वक संरचित, आयु-उपयुक्त शिक्षण अनुभवों के माध्यम से जो आध्यात्मिक विकास और व्यावहारिक ज्ञान दोनों का पोषण करते हैं।',
    sa: 'प्रामाणिकसनातनशिक्षां सर्वेषां कुटुम्बानां कृते सुलभां कर्तुं, तेषां स्थानं पृष्ठभूमिं वा यदृच्छया, सावधानतया संरचितैः वयोऽनुकूलशिक्षणानुभवैः ये आध्यात्मिकविकासं व्यावहारिकज्ञानं च पोषयन्ति।'
  },
  visionTitle: {
    en: 'Vision for Bharat 2047',
    hi: 'भारत 2047 के लिए दृष्टि',
    sa: 'भारतस्य 2047 कृते दृष्टिः'
  },
  visionText: {
    en: 'By 2047, we envision a generation of dharma-centered individuals who are deeply rooted in Sanatan values yet capable of leading in a globalized world, creating a renaissance of Bharatiya thought and culture.',
    hi: '2047 तक, हम धर्म-केंद्रित व्यक्तियों की एक पीढ़ी की कल्पना करते हैं जो सनातन मूल्यों में गहराई से निहित हैं फिर भी वैश्वीकृत दुनिया में नेतृत्व करने में सक्षम हैं, भारतीय विचार और संस्कृति का पुनर्जागरण पैदा करते हुए।',
    sa: '2047 पर्यन्तं वयं धर्मकेन्द्रितव्यक्तीनां पीढीं कल्पयामः ये सनातनमूल्येषु गम्भीरतया निहिताः तथापि वैश्विकविश्वे नेतृत्वे समर्थाः, भारतीयचिन्तनसंस्कृत्योः पुनर्जागरणं निर्मान्ति।'
  },
  teamTitle: {
    en: 'Our Founder',
    hi: 'हमारे संस्थापक',
    sa: 'अस्माकं संस्थापकः'
  },
  teamSubtitle: {
    en: 'Meet the dedicated souls who bring ancient wisdom to modern learners',
    hi: 'उन समर्पित आत्माओं से मिलें जो प्राचीन ज्ञान को आधुनिक शिक्षार्थियों तक पहुंचाते हैं',
    sa: 'तान् समर्पितात्मानः मिलत ये प्राचीनज्ञानम् आधुनिकशिक्षार्थिनां समीपं नयन्ति'
  },
  founderName: {
    en: 'Acharya Yogesh Bhardwaj',
    hi: 'आचार्य योगेश भारद्वाज',
    sa: 'आचार्ययोगेशभारद्वाजः'
  },
  founderRole: {
    en: 'Founder & Lead Acharya',
    hi: 'संस्थापक और मुख्य आचार्य',
    sa: 'संस्थापकः मुख्याचार्यश्च'
  },
  founderBio: {
    en: 'With decades of experience in Vedic education and a passion for making ancient wisdom accessible to the modern generation.',
    hi: 'वैदिक शिक्षा में दशकों के अनुभव और प्राचीन ज्ञान को आधुनिक पीढ़ी के लिए सुलभ बनाने के जुनून के साथ।',
    sa: 'वैदिकशिक्षायां दशकानां अनुभवेन प्राचीनज्ञानं आधुनिकपीढ्यै सुलभं कर्तुं उत्साहेन च।'
  },
  cofounderName: {
    en: 'Co-Founder Name',
    hi: 'सह-संस्थापक नाम',
    sa: 'सहसंस्थापकस्य नाम'
  },
  cofounderRole: {
    en: 'Co-Founder',
    hi: 'सह-संस्थापक',
    sa: 'सहसंस्थापकः'
  },
  cofounderBio: {
    en: 'Dedicated to spreading the light of Sanskrit and Sanatan Dharma to future generations.',
    hi: 'आने वाली पीढ़ियों को संस्कृत और सनातन धर्म का प्रकाश फैलाने के लिए समर्पित।',
    sa: 'भावीपीढीभ्यः संस्कृतसनातनधर्मयोः प्रकाशं प्रसारयितुं समर्पितः।'
  },
  timelineTitle: {
    en: 'Our Journey So Far',
    hi: 'अब तक की हमारी यात्रा',
    sa: 'अस्माकं यात्रा अद्यावधि'
  },
  timeline2019: {
    en: '2019-2020',
    hi: '2019-2020',
    sa: '2019-2020'
  },
  timeline2019Items: {
    en: ['Vision conceived during pandemic', 'Curriculum development begins', 'First 50 families join'],
    hi: ['महामारी के दौरान दृष्टि विकसित', 'पाठ्यक्रम विकास शुरू', 'पहले 50 परिवार जुड़े'],
    sa: ['महामार्याः काले दृष्टिः विकसिता', 'पाठ्यक्रमविकासः आरब्धः', 'प्रथमानि 50 कुटुम्बानि संयुक्तानि']
  },
  timeline2021: {
    en: '2021-2022',
    hi: '2021-2022',
    sa: '2021-2022'
  },
  timeline2021Items: {
    en: ['1000+ active learners across 5 age groups'],
    hi: ['5 आयु समूहों में 1000+ सक्रिय शिक्षार्थी'],
    sa: ['5 वयःसमूहेषु 1000+ सक्रियशिक्षार्थिनः']
  },
  timeline2023: {
    en: '2023-2024',
    hi: '2023-2024',
    sa: '2023-2024'
  },
  timeline2023Items: {
    en: ['International expansion to Indian diaspora'],
    hi: ['भारतीय प्रवासियों तक अंतर्राष्ट्रीय विस्तार'],
    sa: ['भारतीयप्रवासिनां प्रति अन्तर्राष्ट्रियविस्तारः']
  },
  getInTouch: {
    en: 'Get in Touch',
    hi: 'संपर्क करें',
    sa: 'सम्पर्कं कुरुत'
  },
  ctaSubtitle: {
    en: 'Join our growing family of learners and be part of the Shastrakulam journey.',
    hi: 'शिक्षार्थियों के हमारे बढ़ते परिवार में शामिल हों और शास्त्रकुलम् यात्रा का हिस्सा बनें।',
    sa: 'शिक्षार्थिनां अस्माकं वर्धमानकुटुम्बे सम्मिलत शास्त्रकुलयात्रायाः अंशो भवत।'
  },
  valuesTitle: {
    en: 'Our Core Values',
    hi: 'हमारे मूल मूल्य',
    sa: 'अस्माकं मूलमूल्यानि'
  },
  value1Title: { en: 'Authenticity', hi: 'प्रामाणिकता', sa: 'प्रामाण्यम्' },
  value1Text: { en: 'Rooted in traditional scriptures and teachings', hi: 'पारंपरिक शास्त्रों और शिक्षाओं में निहित', sa: 'पारम्परिकशास्त्रशिक्षासु निहितम्' },
  value2Title: { en: 'Excellence', hi: 'उत्कृष्टता', sa: 'उत्कृष्टता' },
  value2Text: { en: 'World-class pedagogy and curriculum design', hi: 'विश्व स्तरीय शिक्षाशास्त्र और पाठ्यक्रम डिजाइन', sa: 'विश्वस्तरीयशिक्षाशास्त्रं पाठ्यक्रमरचना च' },
  value3Title: { en: 'Inclusivity', hi: 'समावेशिता', sa: 'समावेशिता' },
  value3Text: { en: 'Open to learners of all backgrounds', hi: 'सभी पृष्ठभूमि के शिक्षार्थियों के लिए खुला', sa: 'सर्वपृष्ठभूमिशिक्षार्थिनां कृते उद्घाटितम्' },
  value4Title: { en: 'Innovation', hi: 'नवाचार', sa: 'नवप्रवर्तनम्' },
  value4Text: { en: 'Blending tradition with modern technology', hi: 'परंपरा को आधुनिक तकनीक के साथ मिलाना', sa: 'परम्पराम् आधुनिकप्रौद्योगिक्या सह मेलनम्' },
  stats1: { en: '1000+', hi: '1000+', sa: '१०००+' },
  stats1Label: { en: 'Active Students', hi: 'सक्रिय छात्र', sa: 'सक्रियछात्राः' },
  stats2: { en: '50+', hi: '50+', sa: '५०+' },
  stats2Label: { en: 'Expert Acharyas', hi: 'विशेषज्ञ आचार्य', sa: 'विशेषज्ञाचार्याः' },
  stats3: { en: '15+', hi: '15+', sa: '१५+' },
  stats3Label: { en: 'Countries', hi: 'देश', sa: 'देशाः' },
  stats4: { en: '5', hi: '5', sa: '५' },
  stats4Label: { en: 'Age Groups', hi: 'आयु समूह', sa: 'वयःसमूहाः' },
};

const About: React.FC = () => {
  const { t, language } = useLanguage();

  const getTimelineItems = (items: { en: string[]; hi: string[]; sa: string[] }) => {
    return items[language] || items.en;
  };

  const values = [
    { icon: Heart, title: aboutTranslations.value1Title, text: aboutTranslations.value1Text, color: 'bg-primary/10 text-primary' },
    { icon: Award, title: aboutTranslations.value2Title, text: aboutTranslations.value2Text, color: 'bg-accent/10 text-accent' },
    { icon: Users, title: aboutTranslations.value3Title, text: aboutTranslations.value3Text, color: 'bg-blue-100 text-blue-600' },
    { icon: Sparkles, title: aboutTranslations.value4Title, text: aboutTranslations.value4Text, color: 'bg-green-100 text-green-600' },
  ];

  const stats = [
    { value: aboutTranslations.stats1, label: aboutTranslations.stats1Label, icon: GraduationCap },
    { value: aboutTranslations.stats2, label: aboutTranslations.stats2Label, icon: Users },
    { value: aboutTranslations.stats3, label: aboutTranslations.stats3Label, icon: Globe },
    { value: aboutTranslations.stats4, label: aboutTranslations.stats4Label, icon: BookOpen },
  ];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' }
  ];

  const aboutFAQs = [
    {
      question: 'Who founded Shastrakulam?',
      answer: 'Shastrakulam was founded by Acharya Yogesh Bhardwaj in 2019 with a mission to make authentic Sanatan education accessible to every family worldwide.'
    },
    {
      question: 'Where is Shastrakulam located?',
      answer: 'Our main campus is located at NH334, Badheri, Uttar Pradesh, India (PIN: 251307). We also offer online courses accessible worldwide.'
    },
    {
      question: 'What makes Shastrakulam different from other Sanskrit schools?',
      answer: 'Shastrakulam combines authentic Vedic traditions with modern pedagogical excellence, offering live interactive classes with expert Acharyas, age-appropriate curricula, and a holistic approach to spiritual and practical education.'
    }
  ];

  return (
    <Layout>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords="About Shastrakulam, Vedic education mission, Acharya Yogesh Bhardwaj, Sanskrit school India, Bharat 2047, gurukul history, Sanatan Dharma education, Indian education platform, Vedic learning center"
        url="/about"
        breadcrumbs={breadcrumbs}
        faq={aboutFAQs}
      />
      {/* Hero Section with enhanced design */}
      <section className="relative py-20 bg-hero-pattern overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-lotus-pattern opacity-30" />
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto animate-fade-up">
            <span className="inline-block text-6xl mb-6">🙏</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t(aboutTranslations.pageTitle)}
            </h1>
            <p className="font-body text-xl text-muted-foreground leading-relaxed">
              {t(aboutTranslations.pageSubtitle)}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-xl bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/15 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <stat.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                <p className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-1">
                  {t(stat.value)}
                </p>
                <p className="font-body text-sm text-primary-foreground/80">
                  {t(stat.label)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sacred Journey Section with enhanced styling */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
        
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 mb-6">
              <span className="text-4xl">🕉️</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 lotus-underline inline-block pb-4">
              {t(aboutTranslations.journeyTitle)}
            </h2>
          </div>
          
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-elevated border border-border/50 space-y-6">
            <p className="font-body text-lg text-muted-foreground leading-relaxed first-letter:text-5xl first-letter:font-heading first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1">
              {t(aboutTranslations.journeyP1)}
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              {t(aboutTranslations.journeyP2)}
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              {t(aboutTranslations.journeyP3)}
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 lotus-underline inline-block pb-4">
              {t(aboutTranslations.valuesTitle)}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-card rounded-2xl p-6 shadow-card border border-border hover-lift text-center group"
              >
                <div className={`w-16 h-16 rounded-2xl ${value.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  {t(value.title)}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {t(value.text)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission Card */}
            <div className="bg-gradient-to-br from-primary/5 via-card to-accent/5 rounded-3xl p-8 shadow-elevated border border-border/50 relative overflow-hidden group hover-lift">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-6 shadow-lg">
                  <Target className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {t(aboutTranslations.missionTitle)}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed text-lg">
                  {t(aboutTranslations.missionText)}
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-gradient-to-br from-accent/5 via-card to-primary/5 rounded-3xl p-8 shadow-elevated border border-border/50 relative overflow-hidden group hover-lift">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center mb-6 shadow-lg">
                  <Eye className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {t(aboutTranslations.visionTitle)}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed text-lg">
                  {t(aboutTranslations.visionText)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 lotus-underline inline-block pb-4">
              {t(aboutTranslations.teamTitle)}
            </h2>
            <p className="font-body text-lg text-muted-foreground mt-6">
              {t(aboutTranslations.teamSubtitle)}
            </p>
          </div>
          
          {/* Founder */}
          <div className="max-w-lg mx-auto">
            <div className="bg-card rounded-3xl p-8 shadow-elevated border border-border/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 shadow-lg ring-4 ring-background mb-6">
                  <img src={founderAboutImage} alt="Acharya Yogesh Bhardwaj" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">
                  {t(aboutTranslations.founderName)}
                </h3>
                <p className="font-body text-lg text-accent font-semibold mb-4">
                  {t(aboutTranslations.founderRole)}
                </p>
                <p className="font-body text-muted-foreground">
                  {t(aboutTranslations.founderBio)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 lotus-underline inline-block pb-4">
              {t(aboutTranslations.timelineTitle)}
            </h2>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-primary rounded-full hidden md:block" />
            
            <div className="space-y-12">
              {/* 2019-2020 */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-1/2 md:text-right">
                  <div className="bg-card rounded-2xl p-6 shadow-card border border-border hover-lift inline-block">
                    <ul className="space-y-3">
                      {getTimelineItems(aboutTranslations.timeline2019Items).map((item, index) => (
                        <li key={index} className="flex items-center gap-3 font-body text-muted-foreground md:flex-row-reverse">
                          <Sparkles className="h-4 w-4 text-accent flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg ring-4 ring-background">
                    <span className="font-heading font-bold text-primary-foreground text-xs text-center leading-tight">
                      {t(aboutTranslations.timeline2019)}
                    </span>
                  </div>
                </div>
                <div className="md:w-1/2" />
              </div>

              {/* 2021-2022 */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-1/2" />
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg ring-4 ring-background">
                    <span className="font-heading font-bold text-accent-foreground text-xs text-center leading-tight">
                      {t(aboutTranslations.timeline2021)}
                    </span>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-card rounded-2xl p-6 shadow-card border border-border hover-lift inline-block">
                    <ul className="space-y-3">
                      {getTimelineItems(aboutTranslations.timeline2021Items).map((item, index) => (
                        <li key={index} className="flex items-center gap-3 font-body text-muted-foreground">
                          <BookOpen className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 2023-2024 */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-1/2 md:text-right">
                  <div className="bg-card rounded-2xl p-6 shadow-card border border-border hover-lift inline-block">
                    <ul className="space-y-3">
                      {getTimelineItems(aboutTranslations.timeline2023Items).map((item, index) => (
                        <li key={index} className="flex items-center gap-3 font-body text-muted-foreground md:flex-row-reverse">
                          <Globe className="h-4 w-4 text-accent flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-lg ring-4 ring-background">
                    <span className="font-heading font-bold text-primary-foreground text-xs text-center leading-tight">
                      {t(aboutTranslations.timeline2023)}
                    </span>
                  </div>
                </div>
                <div className="md:w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-lotus-pattern opacity-10" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            {t(aboutTranslations.getInTouch)}
          </h2>
          <p className="font-body text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {t(aboutTranslations.ctaSubtitle)}
          </p>
          <Link to="/contact">
            <Button variant="saffron" size="lg" className="shadow-saffron font-semibold text-lg px-8">
              {t(aboutTranslations.getInTouch)}
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
