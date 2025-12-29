import React from 'react';
import Layout from '@/components/Layout';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, Globe, Heart, Users, Calendar } from 'lucide-react';

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
    en: 'Our Acharyas & Team',
    hi: 'हमारे आचार्य और टीम',
    sa: 'अस्माकम् आचार्याः दलं च'
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
  }
};

const About: React.FC = () => {
  const { t, language } = useLanguage();

  const getTimelineItems = (items: { en: string[]; hi: string[]; sa: string[] }) => {
    return items[language] || items.en;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 bg-hero-pattern">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title={t(aboutTranslations.pageTitle)} 
            subtitle={t(aboutTranslations.pageSubtitle)} 
          />
        </div>
      </section>

      {/* Sacred Journey Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-4xl mb-4 block">🕉️</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t(aboutTranslations.journeyTitle)}
            </h2>
          </div>
          <div className="prose prose-lg mx-auto font-body text-muted-foreground space-y-6">
            <p className="leading-relaxed">{t(aboutTranslations.journeyP1)}</p>
            <p className="leading-relaxed">{t(aboutTranslations.journeyP2)}</p>
            <p className="leading-relaxed">{t(aboutTranslations.journeyP3)}</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission Card */}
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                {t(aboutTranslations.missionTitle)}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {t(aboutTranslations.missionText)}
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                {t(aboutTranslations.visionTitle)}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {t(aboutTranslations.visionText)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t(aboutTranslations.teamTitle)}
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              {t(aboutTranslations.teamSubtitle)}
            </p>
          </div>
          
          {/* Founder Card */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-border text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-6 flex items-center justify-center">
              <Users className="h-16 w-16 text-primary-foreground" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
              {t(aboutTranslations.founderName)}
            </h3>
            <p className="font-body text-accent font-medium">
              {t(aboutTranslations.founderRole)}
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t(aboutTranslations.timelineTitle)}
            </h2>
          </div>
          
          <div className="space-y-8">
            {/* 2019-2020 */}
            <div className="flex gap-6 items-start">
              <div className="w-24 flex-shrink-0">
                <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 text-center font-heading font-bold">
                  {t(aboutTranslations.timeline2019)}
                </div>
              </div>
              <div className="flex-1 bg-card rounded-xl p-6 shadow-card border border-border">
                <ul className="space-y-2">
                  {getTimelineItems(aboutTranslations.timeline2019Items).map((item, index) => (
                    <li key={index} className="flex items-center gap-3 font-body text-muted-foreground">
                      <Calendar className="h-4 w-4 text-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 2021-2022 */}
            <div className="flex gap-6 items-start">
              <div className="w-24 flex-shrink-0">
                <div className="bg-accent text-accent-foreground rounded-lg px-3 py-2 text-center font-heading font-bold">
                  {t(aboutTranslations.timeline2021)}
                </div>
              </div>
              <div className="flex-1 bg-card rounded-xl p-6 shadow-card border border-border">
                <ul className="space-y-2">
                  {getTimelineItems(aboutTranslations.timeline2021Items).map((item, index) => (
                    <li key={index} className="flex items-center gap-3 font-body text-muted-foreground">
                      <BookOpen className="h-4 w-4 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 2023-2024 */}
            <div className="flex gap-6 items-start">
              <div className="w-24 flex-shrink-0">
                <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg px-3 py-2 text-center font-heading font-bold">
                  {t(aboutTranslations.timeline2023)}
                </div>
              </div>
              <div className="flex-1 bg-card rounded-xl p-6 shadow-card border border-border">
                <ul className="space-y-2">
                  {getTimelineItems(aboutTranslations.timeline2023Items).map((item, index) => (
                    <li key={index} className="flex items-center gap-3 font-body text-muted-foreground">
                      <Globe className="h-4 w-4 text-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="text-center">
          <Link to="/contact">
            <Button variant="saffron" size="lg">
              {t(aboutTranslations.getInTouch)}
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
