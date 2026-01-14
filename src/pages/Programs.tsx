import React from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home, BookOpen, Users, Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const seoData = {
  title: {
    en: 'Programs | Gurukul, Online Sanskrit Courses & Vedic Camps',
    hi: 'कार्यक्रम | गुरुकुल, ऑनलाइन संस्कृत पाठ्यक्रम और वैदिक शिविर',
    sa: 'कार्यक्रमाः | गुरुकुलम् अन्तर्जालसंस्कृतपाठ्यक्रमाः वैदिकशिविराणि च'
  },
  description: {
    en: 'Discover Shastrakulam\'s educational programs: residential gurukul in Uttar Pradesh, online Sanskrit & Bhagavad Gita courses, Upanishad classes, and Vedic camps for children aged 6-17.',
    hi: 'शास्त्रकुलम के शैक्षिक कार्यक्रमों की खोज करें: उत्तर प्रदेश में आवासीय गुरुकुल, ऑनलाइन संस्कृत और भगवद्गीता पाठ्यक्रम, उपनिषद कक्षाएं, और 6-17 वर्ष के बच्चों के लिए वैदिक शिविर।',
    sa: 'शास्त्रकुलस्य शैक्षिककार्यक्रमान् अन्वेषयत: उत्तरप्रदेशे आवासीयगुरुकुलम्, अन्तर्जालसंस्कृतभगवद्गीतापाठ्यक्रमाः, उपनिषद्कक्षाः, ६-१७ वर्षीयबालकानां कृते वैदिकशिविराणि च।'
  }
};

const programsTranslations = {
  pageTitle: {
    en: 'Our Programs',
    hi: 'हमारे कार्यक्रम',
    sa: 'अस्माकं कार्यक्रमाः'
  },
  pageSubtitle: {
    en: 'Full-time Gurukul education for holistic development.',
    hi: 'समग्र विकास के लिए पूर्णकालिक गुरुकुल शिक्षा।',
    sa: 'समग्रविकासार्थं पूर्णकालिकगुरुकुलशिक्षा।'
  },
  gurukulTitle: {
    en: 'Full-time Gurukul Schooling',
    hi: 'पूर्णकालिक गुरुकुल विद्यालय',
    sa: 'पूर्णकालिकगुरुकुलविद्यालयः'
  },
  gurukulDesc: {
    en: 'Our residential gurukul offers a complete education experience combining modern academics with traditional Vedic learning. Students live in a home-like environment, learning Sanskrit, Shastras, yoga, and values alongside regular curriculum.',
    hi: 'हमारा आवासीय गुरुकुल आधुनिक शिक्षाविदों को पारंपरिक वैदिक शिक्षा के साथ जोड़कर एक पूर्ण शिक्षा अनुभव प्रदान करता है। छात्र घर जैसे वातावरण में रहते हैं, नियमित पाठ्यक्रम के साथ संस्कृत, शास्त्र, योग और मूल्य सीखते हैं।',
    sa: 'अस्माकम् आवासीयगुरुकुलं आधुनिकशिक्षाविज्ञानं पारम्परिकवैदिकशिक्षया सह संयोज्य पूर्णं शिक्षानुभवं प्रददाति। छात्राः गृहतुल्यवातावरणे निवसन्ति, नियमितपाठ्यक्रमेण सह संस्कृतं शास्त्राणि योगं मूल्यानि च अधिगच्छन्ति।'
  },
  feature1: {
    en: 'Residential facility with modern amenities',
    hi: 'आधुनिक सुविधाओं के साथ आवासीय सुविधा',
    sa: 'आधुनिकसुविधाभिः सह आवासीयसुविधा'
  },
  feature2: {
    en: 'Sanskrit immersion environment',
    hi: 'संस्कृत विसर्जन वातावरण',
    sa: 'संस्कृतनिमज्जनवातावरणम्'
  },
  feature3: {
    en: 'Daily yoga, meditation, and prayers',
    hi: 'दैनिक योग, ध्यान और प्रार्थना',
    sa: 'दैनिकयोगध्यानप्रार्थनाः'
  },
  feature4: {
    en: 'Academic excellence with Vedic foundation',
    hi: 'वैदिक नींव के साथ शैक्षणिक उत्कृष्टता',
    sa: 'वैदिकाधारेण शैक्षणिकोत्कृष्टता'
  },
  inquireBtn: {
    en: 'Inquire About Admission',
    hi: 'प्रवेश के बारे में पूछताछ करें',
    sa: 'प्रवेशविषये पृच्छतु'
  },
  onlineTitle: {
    en: 'Online Courses',
    hi: 'ऑनलाइन पाठ्यक्रम',
    sa: 'अन्तर्जालपाठ्यक्रमाः'
  },
  onlineDesc: {
    en: 'Learn Sanskrit, Shastras, and Vedic wisdom from home with expert guidance from our experienced Acharyas.',
    hi: 'हमारे अनुभवी आचार्यों के विशेषज्ञ मार्गदर्शन में घर बैठे संस्कृत, शास्त्र और वैदिक ज्ञान सीखें।',
    sa: 'अस्माकम् अनुभवशालिआचार्याणां विशेषज्ञमार्गदर्शनेन गृहात् एव संस्कृतं शास्त्राणि वैदिकज्ञानं च अधिगच्छत।'
  },
  viewCoursesBtn: {
    en: 'View All Courses',
    hi: 'सभी पाठ्यक्रम देखें',
    sa: 'सर्वान् पाठ्यक्रमान् पश्यत'
  },
  campsTitle: {
    en: 'Seasonal Camps',
    hi: 'सत्रीय शिविर',
    sa: 'ऋतुशिविराणि'
  },
  campsDesc: {
    en: 'Short-term workshops and camps for Sanskrit, yoga, and cultural immersion during vacations.',
    hi: 'छुट्टियों के दौरान संस्कृत, योग और सांस्कृतिक विसर्जन के लिए अल्पकालिक कार्यशालाएं और शिविर।',
    sa: 'अवकाशकाले संस्कृतयोगसंस्कृतिनिमज्जनार्थम् अल्पकालिककार्यशालाः शिविराणि च।'
  },
  viewCampsBtn: {
    en: 'View Upcoming Camps',
    hi: 'आगामी शिविर देखें',
    sa: 'आगामिशिविराणि पश्यत'
  },
  addressLabel: {
    en: 'Our Campus',
    hi: 'हमारा परिसर',
    sa: 'अस्माकं परिसरः'
  },
  address: {
    en: 'Main Campus, Shastrakulam, NH334, Badheri, Uttar Pradesh, PIN: 251307',
    hi: 'मुख्य परिसर, शास्त्रकुलम्, NH334, बधेरी, उत्तर प्रदेश, पिन: 251307',
    sa: 'मुख्यपरिसरः, शास्त्रकुलम्, NH334, बधेरी, उत्तरप्रदेशः, पिन्: २५१३०७'
  }
};

const Programs: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords="gurukul schooling India, residential Sanskrit school, online Vedic courses, Bhagavad Gita classes, Upanishad course, Vedas learning, seasonal camps, Indian philosophy education"
        url="/programs"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Programs', url: '/programs' }
        ]}
      />
      <section className="py-12 bg-hero-pattern">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title={t(programsTranslations.pageTitle)} 
            subtitle={t(programsTranslations.pageSubtitle)} 
          />
        </div>
      </section>
      
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid gap-8">
            {/* Full-time Gurukul */}
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  {t(programsTranslations.gurukulTitle)}
                </h3>
              </div>
              <p className="font-body text-muted-foreground">
                {t(programsTranslations.gurukulDesc)}
              </p>
              <ul className="space-y-2 font-body text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  {t(programsTranslations.feature1)}
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  {t(programsTranslations.feature2)}
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  {t(programsTranslations.feature3)}
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  {t(programsTranslations.feature4)}
                </li>
              </ul>
              <div className="pt-4 border-t border-border">
                <p className="font-body text-sm text-muted-foreground mb-2">
                  <strong>{t(programsTranslations.addressLabel)}:</strong>
                </p>
                <p className="font-body text-foreground">
                  {t(programsTranslations.address)}
                </p>
              </div>
              <Link to="/contact">
                <Button variant="saffron" size="lg">
                  {t(programsTranslations.inquireBtn)}
                </Button>
              </Link>
            </div>

            {/* Online Courses */}
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  {t(programsTranslations.onlineTitle)}
                </h3>
              </div>
              <p className="font-body text-muted-foreground">
                {t(programsTranslations.onlineDesc)}
              </p>
              <Link to="/courses">
                <Button variant="maroon-outline" size="lg">
                  {t(programsTranslations.viewCoursesBtn)}
                </Button>
              </Link>
            </div>

            {/* Seasonal Camps */}
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  {t(programsTranslations.campsTitle)}
                </h3>
              </div>
              <p className="font-body text-muted-foreground">
                {t(programsTranslations.campsDesc)}
              </p>
              <Link to="/camps">
                <Button variant="maroon-outline" size="lg">
                  {t(programsTranslations.viewCampsBtn)}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Programs;