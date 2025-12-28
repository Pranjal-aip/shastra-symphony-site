import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, BookOpen, Users, Home, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const donationAmounts = [500, 1100, 2100, 5100, 11000, 21000];

const causes = [
  {
    icon: BookOpen,
    title: 'Support Sanskrit Education',
    description: 'Help us develop curriculum and train teachers for Sanskrit education.',
  },
  {
    icon: Users,
    title: 'Sponsor a Student',
    description: 'Provide full scholarship for a deserving student to attend our gurukul.',
  },
  {
    icon: Home,
    title: 'Build the Gurukul',
    description: 'Contribute to infrastructure development of our residential campus.',
  },
  {
    icon: Sparkles,
    title: 'General Fund',
    description: 'Support our overall mission of preserving and spreading Vedic wisdom.',
  },
];

const Donate: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { toast } = useToast();

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = selectedAmount || parseInt(customAmount);
    if (!amount || amount < 100) {
      toast({
        title: 'Invalid Amount',
        description: 'Please select or enter a donation amount (minimum ₹100).',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Thank You! 🙏',
      description: `Your donation of ₹${amount.toLocaleString()} will help preserve Vedic wisdom.`,
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-accent/10 via-background to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <Heart className="h-16 w-16 text-accent mx-auto mb-6 animate-pulse" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Support Our Sacred Mission
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Your generous contribution helps preserve ancient Vedic wisdom and makes quality Sanskrit education accessible to children across India.
          </p>
        </div>
      </section>

      {/* Causes Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Where Your Donation Goes"
            subtitle="Every contribution makes a meaningful impact on our mission."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {causes.map((cause, index) => (
              <Card key={index} className="hover-lift border-border/50">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <cause.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="font-heading text-lg">{cause.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="font-body">{cause.description}</CardDescription>
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
                <CardTitle className="font-heading text-2xl">Make a Donation</CardTitle>
                <CardDescription className="font-body">
                  All donations are tax-deductible under Section 80G.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDonate} className="space-y-6">
                  {/* Amount Selection */}
                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-3 block">
                      Select Amount (₹)
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
                      Or Enter Custom Amount
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
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
                        Full Name
                      </label>
                      <Input
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="font-body"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-foreground mb-2 block">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="font-body"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-2 block">
                      Phone (for 80G receipt)
                    </label>
                    <Input
                      type="tel"
                      placeholder="Your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="font-body"
                    />
                  </div>

                  <Button type="submit" variant="saffron" size="xl" className="w-full">
                    <Heart className="h-5 w-5 mr-2" />
                    Donate ₹{(selectedAmount || parseInt(customAmount) || 0).toLocaleString()}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground font-body">
                    Secure payment powered by Razorpay. You'll receive an 80G receipt via email.
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
          <h2 className="font-heading text-3xl font-bold mb-12">Your Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="font-heading text-5xl font-bold text-accent mb-2">500+</p>
              <p className="font-body text-primary-foreground/80">Students Educated</p>
            </div>
            <div>
              <p className="font-heading text-5xl font-bold text-accent mb-2">50+</p>
              <p className="font-body text-primary-foreground/80">Scholarships Provided</p>
            </div>
            <div>
              <p className="font-heading text-5xl font-bold text-accent mb-2">100%</p>
              <p className="font-body text-primary-foreground/80">Funds Used for Mission</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Donate;
