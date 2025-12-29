import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
  Target,
  MessageCircle
} from 'lucide-react';
import CourseEnrollmentForm from '@/components/CourseEnrollmentForm';

const bodhikaTranslations = {
  badge: {
    en: "One-Year Certificate Course",
    hi: "एक वर्षीय प्रमाणपत्र पाठ्यक्रम",
    sa: "एकवर्षीयं प्रमाणपत्रं पाठ्यक्रमः"
  },
  title: {
    en: "Bodhika",
    hi: "बोधिका",
    sa: "बोधिका"
  },
  subtitle: {
    en: "Awakening Young Minds",
    hi: "युवा मनों को जागृत करना",
    sa: "युवमनसां प्रबोधनम्"
  },
  tagline: {
    en: "Sanatan Values & Wisdom for Kids & Teens",
    hi: "बच्चों और किशोरों के लिए सनातन मूल्य और ज्ञान",
    sa: "बालानां किशोराणां च सनातनमूल्यानि ज्ञानं च"
  },
  enrollNow: {
    en: "Enroll Now",
    hi: "अभी नामांकन करें",
    sa: "अधुना नामाङ्कनं कुरु"
  },
  inquireWhatsApp: {
    en: "Inquire via WhatsApp",
    hi: "व्हाट्सएप पर पूछताछ करें",
    sa: "व्हाट्सएप्-माध्यमेन पृच्छतु"
  },
  aboutTitle: {
    en: "About Bodhika",
    hi: "बोधिका के बारे में",
    sa: "बोधिकायाः विषये"
  },
  aboutDesc: {
    en: "Bodhika is a joyful and value-rich one-year learning journey designed for kids and teens to introduce them to the essence of Sanatan Dharma in a simple, engaging, and age-appropriate way. The course nurtures curiosity, संस्कार (samskaras), and strong character while helping children connect with their cultural roots.",
    hi: "बोधिका बच्चों और किशोरों के लिए डिज़ाइन की गई एक आनंदमय और मूल्य-समृद्ध एक वर्षीय सीखने की यात्रा है जो उन्हें सनातन धर्म के सार से सरल, आकर्षक और आयु-उपयुक्त तरीके से परिचित कराती है। यह पाठ्यक्रम जिज्ञासा, संस्कार और मजबूत चरित्र का पोषण करता है।",
    sa: "बोधिका बालानां किशोराणां च कृते निर्मिता एका आनन्दपूर्णा मूल्यसमृद्धा एकवर्षीया शिक्षायात्रा अस्ति या तान् सनातनधर्मस्य सारेण सरलेन आकर्षकेण च प्रकारेण परिचयति। एषः पाठ्यक्रमः जिज्ञासां संस्कारान् दृढचरित्रं च पोषयति।"
  },
  aboutDesc2: {
    en: "Through inspiring stories from the Ramayana and Mahabharata, simple teachings from the Vedas and Bhagavad Gita, along with shlokas, activities, games, and creative projects, students learn timeless values such as truth, respect, discipline, compassion, courage, and self-control.",
    hi: "रामायण और महाभारत की प्रेरणादायक कहानियों, वेदों और भगवद्गीता की सरल शिक्षाओं के साथ-साथ श्लोकों, गतिविधियों, खेलों और रचनात्मक परियोजनाओं के माध्यम से, छात्र सत्य, सम्मान, अनुशासन, करुणा, साहस और आत्म-संयम जैसे शाश्वत मूल्य सीखते हैं।",
    sa: "रामायणमहाभारतयोः प्रेरणादायककथाभिः वेदानां भगवद्गीतायाश्च सरलोपदेशैः श्लोकैः क्रियाभिः क्रीडाभिः सृजनात्मकपरियोजनाभिश्च छात्राः सत्यं सम्मानं अनुशासनं करुणां साहसं आत्मसंयमं च इति शाश्वतमूल्यानि शिक्षन्ते।"
  },
  aboutDesc3: {
    en: "Bodhika focuses not just on knowledge, but on shaping good human beings — confident, thoughtful, and grounded in dharmic living for the modern world.",
    hi: "बोधिका केवल ज्ञान पर ही नहीं, बल्कि अच्छे इंसान बनाने पर केंद्रित है — आत्मविश्वासी, विचारशील और आधुनिक दुनिया के लिए धार्मिक जीवन में स्थापित।",
    sa: "बोधिका केवलं ज्ञाने न तिष्ठति अपि तु सुमानवनिर्माणे — आत्मविश्वासी विचारशीलाः आधुनिकविश्वस्य कृते धार्मिकजीवने प्रतिष्ठिताः च।"
  },
  courseDetails: {
    en: "Course Details",
    hi: "पाठ्यक्रम विवरण",
    sa: "पाठ्यक्रमविवरणम्"
  },
  duration: {
    en: "Duration",
    hi: "अवधि",
    sa: "अवधिः"
  },
  durationValue: {
    en: "1 Year",
    hi: "1 वर्ष",
    sa: "एकं वर्षम्"
  },
  durationDesc: {
    en: "Weekly interactive sessions with activities and guided practice",
    hi: "गतिविधियों और निर्देशित अभ्यास के साथ साप्ताहिक इंटरैक्टिव सत्र",
    sa: "क्रियाभिः निर्देशिताभ्यासैः सह साप्ताहिकाः सत्राः"
  },
  ageGroup: {
    en: "Age Group",
    hi: "आयु वर्ग",
    sa: "आयुवर्गः"
  },
  ageValue: {
    en: "8-17 Years",
    hi: "8-17 वर्ष",
    sa: "८-१७ वर्षाणि"
  },
  ageDesc: {
    en: "Kids & Teens – No prior knowledge required",
    hi: "बच्चे और किशोर – कोई पूर्व ज्ञान आवश्यक नहीं",
    sa: "बालाः किशोराश्च – पूर्वज्ञानं नापेक्षितम्"
  },
  batchSize: {
    en: "Batch Size",
    hi: "बैच का आकार",
    sa: "समूहमानम्"
  },
  batchValue: {
    en: "50-60 Students",
    hi: "50-60 छात्र",
    sa: "५०-६० छात्राः"
  },
  batchDesc: {
    en: "Interactive group learning environment",
    hi: "इंटरैक्टिव समूह सीखने का वातावरण",
    sa: "परस्परक्रियात्मकं समूहशिक्षणवातावरणम्"
  },
  certificate: {
    en: "Certificate",
    hi: "प्रमाणपत्र",
    sa: "प्रमाणपत्रम्"
  },
  certificateValue: {
    en: "Official Certificate",
    hi: "आधिकारिक प्रमाणपत्र",
    sa: "आधिकारिकं प्रमाणपत्रम्"
  },
  certificateDesc: {
    en: "Certificate of completion from Shastrakulam",
    hi: "शास्त्रकुलम से पूर्णता प्रमाणपत्र",
    sa: "शास्त्रकुलमतः समापनप्रमाणपत्रम्"
  },
  whatYouGain: {
    en: "What Students Will Gain",
    hi: "छात्रों को क्या मिलेगा",
    sa: "छात्राः किं प्राप्स्यन्ति"
  },
  gain1: {
    en: "Strong moral values & samskaras",
    hi: "मजबूत नैतिक मूल्य और संस्कार",
    sa: "दृढनैतिकमूल्यानि संस्काराश्च"
  },
  gain2: {
    en: "Love for Indian culture and traditions",
    hi: "भारतीय संस्कृति और परंपराओं के लिए प्रेम",
    sa: "भारतीयसंस्कृतेः परम्पराणां च प्रीतिः"
  },
  gain3: {
    en: "Better discipline, focus & confidence",
    hi: "बेहतर अनुशासन, ध्यान और आत्मविश्वास",
    sa: "उत्तमम् अनुशासनं ध्यानम् आत्मविश्वासश्च"
  },
  gain4: {
    en: "Basic understanding of Sanatan texts & ideas",
    hi: "सनातन ग्रंथों और विचारों की बुनियादी समझ",
    sa: "सनातनग्रन्थानां विचाराणां च मूलभूतं ज्ञानम्"
  },
  gain5: {
    en: "Joy of learning and self-expression",
    hi: "सीखने और आत्म-अभिव्यक्ति का आनंद",
    sa: "शिक्षणस्य आत्माभिव्यक्तेश्च आनन्दः"
  },
  gain6: {
    en: "Certificate from Shastrakulam",
    hi: "शास्त्रकुलम से प्रमाणपत्र",
    sa: "शास्त्रकुलमतः प्रमाणपत्रम्"
  },
  pricing: {
    en: "Investment in Your Child's Future",
    hi: "आपके बच्चे के भविष्य में निवेश",
    sa: "भवतः बालस्य भविष्ये विनियोगः"
  },
  fee: {
    en: "₹6,000",
    hi: "₹6,000",
    sa: "₹६,०००"
  },
  feeDesc: {
    en: "per student for the complete 1-year program",
    hi: "संपूर्ण 1 वर्षीय कार्यक्रम के लिए प्रति छात्र",
    sa: "सम्पूर्णस्य एकवर्षीयकार्यक्रमस्य कृते प्रतिछात्रम्"
  },
  scholarship: {
    en: "Scholarships available for needy and deserving students",
    hi: "जरूरतमंद और योग्य छात्रों के लिए छात्रवृत्ति उपलब्ध",
    sa: "आवश्यकतायुक्तानां योग्यानां च छात्राणां कृते छात्रवृत्तिः उपलब्धा"
  },
  messageTitle: {
    en: "Our Message",
    hi: "हमारा संदेश",
    sa: "अस्माकं सन्देशः"
  },
  message: {
    en: "\"Awaken young minds. Build strong character. Shape a brighter future.\"",
    hi: "\"युवा मनों को जगाएं। मजबूत चरित्र का निर्माण करें। उज्जवल भविष्य को आकार दें।\"",
    sa: "\"युवमनांसि प्रबोधयत। दृढचरित्रं निर्माणयत। उज्जवलं भविष्यं रूपयत।\""
  },
  messageCta: {
    en: "Join Bodhika and begin a journey into timeless wisdom.",
    hi: "बोधिका में शामिल हों और शाश्वत ज्ञान की यात्रा शुरू करें।",
    sa: "बोधिकायां सम्मिलत शाश्वतज्ञानस्य यात्रां प्रारभत च।"
  },
  limitedSeats: {
    en: "Limited Seats Available!",
    hi: "सीमित सीटें उपलब्ध!",
    sa: "सीमितानि आसनानि उपलब्धानि!"
  },
  startJourney: {
    en: "Start Your Child's Journey Today",
    hi: "आज ही अपने बच्चे की यात्रा शुरू करें",
    sa: "अद्यैव भवतः बालस्य यात्रां प्रारभत"
  }
};

const Bodhika: React.FC = () => {
  const { language } = useLanguage();
  const [showEnrollForm, setShowEnrollForm] = useState(false);

  const t = (key: keyof typeof bodhikaTranslations) => {
    return bodhikaTranslations[key][language as 'en' | 'hi' | 'sa'] || bodhikaTranslations[key].en;
  };

  const whatsappNumber = "919674916567";
  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in the Bodhika course. Please share more details.`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const gains = [
    { icon: Heart, text: t('gain1') },
    { icon: Sparkles, text: t('gain2') },
    { icon: Target, text: t('gain3') },
    { icon: BookOpen, text: t('gain4') },
    { icon: Star, text: t('gain5') },
    { icon: Award, text: t('gain6') },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl"></div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-20 text-accent/20 text-9xl font-display animate-float">ॐ</div>
        <div className="absolute bottom-20 left-20 text-primary/10 text-8xl font-display animate-float delay-500">श्री</div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-6 px-6 py-2 text-sm font-medium animate-fade-in">
              {t('badge')}
            </Badge>
            
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-primary mb-4 animate-fade-in">
              {t('title')}
            </h1>
            
            <p className="font-display text-2xl md:text-3xl lg:text-4xl text-accent mb-4 animate-fade-in delay-100">
              {t('subtitle')}
            </p>
            
            <p className="font-body text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in delay-200">
              {t('tagline')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-300">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                onClick={() => setShowEnrollForm(true)}
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                {t('enrollNow')}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-semibold transition-all"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {t('inquireWhatsApp')}
              </Button>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
                <div className="w-1.5 h-3 bg-primary/50 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl text-primary text-center mb-12">
              {t('aboutTitle')}
            </h2>
            
            <div className="space-y-6 text-center">
              <p className="font-body text-lg text-foreground/90 leading-relaxed">
                {t('aboutDesc')}
              </p>
              <p className="font-body text-lg text-foreground/90 leading-relaxed">
                {t('aboutDesc2')}
              </p>
              <p className="font-body text-lg text-primary font-medium leading-relaxed italic">
                {t('aboutDesc3')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl text-primary text-center mb-16">
            {t('courseDetails')}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Clock, title: t('duration'), value: t('durationValue'), desc: t('durationDesc') },
              { icon: Users, title: t('ageGroup'), value: t('ageValue'), desc: t('ageDesc') },
              { icon: Users, title: t('batchSize'), value: t('batchValue'), desc: t('batchDesc') },
              { icon: Award, title: t('certificate'), value: t('certificateValue'), desc: t('certificateDesc') },
            ].map((item, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-accent/30 bg-card">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                    <item.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-body text-sm text-muted-foreground mb-2">{item.title}</h3>
                  <p className="font-display text-2xl text-primary mb-2">{item.value}</p>
                  <p className="font-body text-sm text-foreground/70">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Students Gain */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl text-primary text-center mb-16">
            {t('whatYouGain')}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {gains.map((gain, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 p-6 bg-card rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-accent/30"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <gain.icon className="w-6 h-6 text-accent" />
                </div>
                <p className="font-body text-foreground font-medium">{gain.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl mb-8">
              {t('pricing')}
            </h2>
            
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-8">
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="font-display text-6xl md:text-7xl text-accent">{t('fee')}</span>
              </div>
              <p className="font-body text-lg text-primary-foreground/80 mb-6">
                {t('feeDesc')}
              </p>
              <div className="flex items-center justify-center gap-2 text-accent">
                <Star className="w-5 h-5" />
                <p className="font-body text-sm">
                  {t('scholarship')}
                </p>
              </div>
            </div>
            
            <Badge className="bg-accent text-accent-foreground px-6 py-2 text-lg font-semibold animate-pulse">
              {t('limitedSeats')}
            </Badge>
          </div>
        </div>
      </section>

      {/* Message & CTA Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 text-primary text-[200px] font-display">॥</div>
          <div className="absolute bottom-0 right-1/4 text-accent text-[200px] font-display">॥</div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-primary mb-8">
              {t('messageTitle')}
            </h2>
            
            <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl text-accent mb-6 leading-relaxed">
              {t('message')}
            </blockquote>
            
            <p className="font-body text-xl text-muted-foreground mb-12">
              {t('messageCta')}
            </p>
            
            <h3 className="font-display text-2xl md:text-3xl text-primary mb-8">
              {t('startJourney')}
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-7 text-xl font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                onClick={() => setShowEnrollForm(true)}
              >
                <GraduationCap className="mr-2 h-6 w-6" />
                {t('enrollNow')}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-10 py-7 text-xl font-semibold transition-all"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                <MessageCircle className="mr-2 h-6 w-6" />
                {t('inquireWhatsApp')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Form Modal */}
      <CourseEnrollmentForm
        courseId="bodhika-course"
        courseName="Bodhika - Awakening Young Minds"
        open={showEnrollForm}
        onOpenChange={setShowEnrollForm}
      />
    </Layout>
  );
};

export default Bodhika;
