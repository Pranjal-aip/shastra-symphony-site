import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, BookOpen, Users, Home, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const seoData = {
  title: {
    en: 'Donate - Support Vedic Education',
    hi: 'दान करें - वैदिक शिक्षा का समर्थन करें',
    sa: 'दानं कुरुत - वैदिकशिक्षां समर्थयत'
  },
  description: {
    en: 'Support Shastrakulam\'s mission to preserve Vedic wisdom. Your tax-deductible donation (80G) helps provide Sanskrit education to children across India.',
    hi: 'वैदिक ज्ञान को संरक्षित करने के शास्त्रकुलम के मिशन का समर्थन करें। आपका कर-कटौती योग्य दान (80G) भारत भर के बच्चों को संस्कृत शिक्षा प्रदान करने में मदद करता है।',
    sa: 'वैदिकज्ञानं संरक्षितुं शास्त्रकुलस्य लक्ष्यं समर्थयत। भवतां करकटौतीयोग्यं दानं (80G) भारतस्य बालकेभ्यः संस्कृतशिक्षां प्रदातुं साहाय्यं करोति।'
  }
};

const donateTranslations = {
  heroTitle: {
    en: 'Support Our Sacred Mission',
    hi: 'हमारे पवित्र मिशन का समर्थन करें',
    sa: 'अस्माकं पवित्रलक्ष्यं समर्थयत'
  },
  heroDesc: {
    en: 'Your generous contribution helps preserve ancient Vedic wisdom and makes quality Sanskrit education accessible to children across India.',
    hi: 'आपका उदार योगदान प्राचीन वैदिक ज्ञान को संरक्षित करने में मदद करता है और भारत भर के बच्चों के लिए गुणवत्तापूर्ण संस्कृत शिक्षा सुलभ बनाता है।',
    sa: 'भवतां उदारं योगदानं प्राचीनवैदिकज्ञानं संरक्षितुं साहाय्यं करोति भारतस्य बालकेभ्यः गुणवत्तापूर्णां संस्कृतशिक्षां सुलभां करोति च।'
  },
  causesTitle: {
    en: 'Where Your Donation Goes',
    hi: 'आपका दान कहाँ जाता है',
    sa: 'भवतां दानं कुत्र गच्छति'
  },
  causesSubtitle: {
    en: 'Every contribution makes a meaningful impact on our mission.',
    hi: 'प्रत्येक योगदान हमारे मिशन पर सार्थक प्रभाव डालता है।',
    sa: 'प्रत्येकं योगदानं अस्माकं लक्ष्ये सार्थकं प्रभावं करोति।'
  },
  cause1Title: {
    en: 'Support Sanskrit Education',
    hi: 'संस्कृत शिक्षा का समर्थन करें',
    sa: 'संस्कृतशिक्षां समर्थयत'
  },
  cause1Desc: {
    en: 'Help us develop curriculum and train teachers for Sanskrit education.',
    hi: 'संस्कृत शिक्षा के लिए पाठ्यक्रम विकसित करने और शिक्षकों को प्रशिक्षित करने में हमारी मदद करें।',
    sa: 'संस्कृतशिक्षार्थं पाठ्यक्रमं विकसितुं शिक्षकान् प्रशिक्षितुं च अस्मान् साहाय्यं कुरुत।'
  },
  cause2Title: {
    en: 'Sponsor a Student',
    hi: 'एक छात्र को प्रायोजित करें',
    sa: 'एकं छात्रं प्रायोजयत'
  },
  cause2Desc: {
    en: 'Provide full scholarship for a deserving student to attend our gurukul.',
    hi: 'एक योग्य छात्र को हमारे गुरुकुल में पढ़ने के लिए पूर्ण छात्रवृत्ति प्रदान करें।',
    sa: 'अस्माकं गुरुकुले अधीतुं योग्याय छात्राय पूर्णां छात्रवृत्तिं प्रददातु।'
  },
  cause3Title: {
    en: 'Build the Gurukul',
    hi: 'गुरुकुल का निर्माण करें',
    sa: 'गुरुकुलं निर्मीत'
  },
  cause3Desc: {
    en: 'Contribute to infrastructure development of our residential campus.',
    hi: 'हमारे आवासीय परिसर के बुनियादी ढांचे के विकास में योगदान दें।',
    sa: 'अस्माकम् आवासीयपरिसरस्य अधोसंरचनाविकासे योगदानं कुरुत।'
  },
  cause4Title: {
    en: 'General Fund',
    hi: 'सामान्य कोष',
    sa: 'सामान्यकोषः'
  },
  cause4Desc: {
    en: 'Support our overall mission of preserving and spreading Vedic wisdom.',
    hi: 'वैदिक ज्ञान को संरक्षित और प्रसारित करने के हमारे समग्र मिशन का समर्थन करें।',
    sa: 'वैदिकज्ञानं संरक्षितुं प्रसारयितुं च अस्माकं समग्रलक्ष्यं समर्थयत।'
  },
  formTitle: {
    en: 'Make a Donation',
    hi: 'दान करें',
    sa: 'दानं कुरुत'
  },
  formSubtitle: {
    en: 'All donations are tax-deductible under Section 80G.',
    hi: 'सभी दान धारा 80G के तहत कर-कटौती योग्य हैं।',
    sa: 'सर्वाणि दानानि धारा 80G अधीने करकटौतीयोग्यानि सन्ति।'
  },
  selectAmount: {
    en: 'Select Amount (₹)',
    hi: 'राशि चुनें (₹)',
    sa: 'राशिं चिनुत (₹)'
  },
  customAmount: {
    en: 'Or Enter Custom Amount',
    hi: 'या कस्टम राशि दर्ज करें',
    sa: 'अथवा स्वेच्छाराशिं प्रविशतु'
  },
  enterAmount: {
    en: 'Enter amount',
    hi: 'राशि दर्ज करें',
    sa: 'राशिं प्रविशतु'
  },
  fullName: {
    en: 'Full Name',
    hi: 'पूरा नाम',
    sa: 'पूर्णं नाम'
  },
  yourName: {
    en: 'Your name',
    hi: 'आपका नाम',
    sa: 'भवतः नाम'
  },
  email: {
    en: 'Email',
    hi: 'ईमेल',
    sa: 'ईमेलः'
  },
  yourEmail: {
    en: 'Your email',
    hi: 'आपका ईमेल',
    sa: 'भवतः ईमेलः'
  },
  phone: {
    en: 'Phone (for 80G receipt)',
    hi: 'फोन (80G रसीद के लिए)',
    sa: 'दूरभाषः (80G रसीदार्थम्)'
  },
  yourPhone: {
    en: 'Your phone number',
    hi: 'आपका फोन नंबर',
    sa: 'भवतः दूरभाषसङ्ख्या'
  },
  donate: {
    en: 'Donate',
    hi: 'दान करें',
    sa: 'दानं कुरुत'
  },
  securePayment: {
    en: "Secure payment powered by Razorpay. You'll receive an 80G receipt via email.",
    hi: 'रेजरपे द्वारा संचालित सुरक्षित भुगतान। आपको ईमेल के माध्यम से 80G रसीद प्राप्त होगी।',
    sa: 'रेजरपेद्वारा संचालितं सुरक्षितं भुगतानम्। भवन्तः ईमेलमाध्यमेन 80G रसीदं प्राप्स्यन्ति।'
  },
  impactTitle: {
    en: 'Your Impact',
    hi: 'आपका प्रभाव',
    sa: 'भवतां प्रभावः'
  },
  studentsEducated: {
    en: 'Students Educated',
    hi: 'शिक्षित छात्र',
    sa: 'शिक्षिताः छात्राः'
  },
  scholarshipsProvided: {
    en: 'Scholarships Provided',
    hi: 'प्रदान की गई छात्रवृत्तियां',
    sa: 'प्रदत्ताः छात्रवृत्तयः'
  },
  fundsUsed: {
    en: 'Funds Used for Mission',
    hi: 'मिशन के लिए उपयोग की गई धनराशि',
    sa: 'लक्ष्यार्थं उपयुक्ताः धनराशयः'
  },
  invalidAmount: {
    en: 'Invalid Amount',
    hi: 'अमान्य राशि',
    sa: 'अमान्या राशिः'
  },
  pleaseSelectAmount: {
    en: 'Please select or enter a donation amount (minimum ₹100).',
    hi: 'कृपया दान राशि चुनें या दर्ज करें (न्यूनतम ₹100)।',
    sa: 'कृपया दानराशिं चिनुत प्रविशत वा (न्यूनतम् ₹१००)।'
  },
  thankYou: {
    en: 'Thank You! 🙏',
    hi: 'धन्यवाद! 🙏',
    sa: 'धन्यवादाः! 🙏'
  },
  donationHelp: {
    en: 'Your donation will help preserve Vedic wisdom.',
    hi: 'आपका दान वैदिक ज्ञान को संरक्षित करने में मदद करेगा।',
    sa: 'भवतां दानं वैदिकज्ञानं संरक्षितुं साहाय्यं करिष्यति।'
  }
};

const donationAmounts = [500, 1100, 2100, 5100, 11000, 21000];

const Donate: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { toast } = useToast();

  const causes = [
    {
      icon: BookOpen,
      title: donateTranslations.cause1Title,
      description: donateTranslations.cause1Desc,
    },
    {
      icon: Users,
      title: donateTranslations.cause2Title,
      description: donateTranslations.cause2Desc,
    },
    {
      icon: Home,
      title: donateTranslations.cause3Title,
      description: donateTranslations.cause3Desc,
    },
    {
      icon: Sparkles,
      title: donateTranslations.cause4Title,
      description: donateTranslations.cause4Desc,
    },
  ];

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = selectedAmount || parseInt(customAmount);
    if (!amount || amount < 100) {
      toast({
        title: t(donateTranslations.invalidAmount),
        description: t(donateTranslations.pleaseSelectAmount),
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: t(donateTranslations.thankYou),
      description: `₹${amount.toLocaleString()} - ${t(donateTranslations.donationHelp)}`,
    });
  };

  return (
    <Layout>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords="donate Shastrakulam, support Vedic education, 80G donation India, sponsor Sanskrit student"
        url="/donate"
      />
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-accent/10 via-background to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <Heart className="h-16 w-16 text-accent mx-auto mb-6 animate-pulse" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t(donateTranslations.heroTitle)}
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(donateTranslations.heroDesc)}
          </p>
        </div>
      </section>

      {/* Causes Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            title={t(donateTranslations.causesTitle)}
            subtitle={t(donateTranslations.causesSubtitle)}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {causes.map((cause, index) => (
              <Card key={index} className="hover-lift border-border/50">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <cause.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="font-heading text-lg">{t(cause.title)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="font-body">{t(cause.description)}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-elevated">
              <CardHeader className="text-center">
                <CardTitle className="font-heading text-2xl">{t(donateTranslations.formTitle)}</CardTitle>
                <CardDescription className="font-body">
                  {t(donateTranslations.formSubtitle)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDonate} className="space-y-6">
                  {/* Amount Selection */}
                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-3 block">
                      {t(donateTranslations.selectAmount)}
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {donationAmounts.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amount);
                            setCustomAmount('');
                          }}
                          className={`py-3 px-4 rounded-lg font-body font-semibold transition-all ${
                            selectedAmount === amount
                              ? 'bg-accent text-accent-foreground shadow-saffron'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                        >
                          ₹{amount.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-2 block">
                      {t(donateTranslations.customAmount)}
                    </label>
                    <Input
                      type="number"
                      placeholder={t(donateTranslations.enterAmount)}
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(null);
                      }}
                      min={100}
                      className="font-body"
                    />
                  </div>

                  {/* Donor Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-sm font-medium text-foreground mb-2 block">
                        {t(donateTranslations.fullName)}
                      </label>
                      <Input
                        placeholder={t(donateTranslations.yourName)}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="font-body"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-foreground mb-2 block">
                        {t(donateTranslations.email)}
                      </label>
                      <Input
                        type="email"
                        placeholder={t(donateTranslations.yourEmail)}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="font-body"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-2 block">
                      {t(donateTranslations.phone)}
                    </label>
                    <Input
                      type="tel"
                      placeholder={t(donateTranslations.yourPhone)}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="font-body"
                    />
                  </div>

                  <Button type="submit" variant="saffron" size="xl" className="w-full">
                    <Heart className="h-5 w-5 mr-2" />
                    {t(donateTranslations.donate)} ₹{(selectedAmount || parseInt(customAmount) || 0).toLocaleString()}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground font-body">
                    {t(donateTranslations.securePayment)}
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-12">{t(donateTranslations.impactTitle)}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="font-heading text-5xl font-bold text-accent mb-2">500+</p>
              <p className="font-body text-primary-foreground/80">{t(donateTranslations.studentsEducated)}</p>
            </div>
            <div>
              <p className="font-heading text-5xl font-bold text-accent mb-2">50+</p>
              <p className="font-body text-primary-foreground/80">{t(donateTranslations.scholarshipsProvided)}</p>
            </div>
            <div>
              <p className="font-heading text-5xl font-bold text-accent mb-2">100%</p>
              <p className="font-body text-primary-foreground/80">{t(donateTranslations.fundsUsed)}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Donate;