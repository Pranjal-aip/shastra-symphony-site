import React, { useState } from 'react';
import { GraduationCap, BookOpen, LogIn, Loader2, Mail, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

const GRAPHY_LOGIN_URL = 'https://learn.shastrakulam.com/login';
const GRAPHY_DASHBOARD_URL = 'https://learn.shastrakulam.com/dashboard';

const StudentDashboard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    // Redirect to Graphy login with email pre-filled
    const loginUrl = `${GRAPHY_LOGIN_URL}?email=${encodeURIComponent(email.trim())}`;
    window.location.assign(loginUrl);
  };

  const handleDirectLogin = () => {
    window.open(GRAPHY_LOGIN_URL, '_blank');
  };

  return (
    <Layout>
      <SEO 
        title={{ en: "Student Login - Graphy Dashboard", hi: "छात्र लॉगिन - ग्राफी डैशबोर्ड", sa: "छात्रप्रवेशः - ग्राफीफलकम्" }}
        description={{ en: "Login to access your enrolled courses, track your learning progress, and continue your Vedic education journey.", hi: "अपने पाठ्यक्रमों तक पहुंचने के लिए लॉगिन करें।", sa: "स्वीयान् पाठ्यक्रमान् प्राप्तुं प्रविशत।" }}
        url="/my-courses"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-secondary/30 via-background to-primary/5 py-16">
        <div className="container mx-auto px-4 max-w-lg">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-6 shadow-lg">
              <GraduationCap className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Student Portal
            </h1>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Access your courses and continue your learning journey
            </p>
          </div>

          {/* Login Card */}
          <Card className="border-primary/20 shadow-xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-2 text-xl">
                <LogIn className="w-5 h-5 text-primary" />
                Login to Your Dashboard
              </CardTitle>
              <CardDescription>
                Enter your registered email to access your courses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-base"
                    disabled={isLoading}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full h-12 text-base gap-2"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Redirecting...
                    </>
                  ) : (
                    <>
                      Go to My Courses
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full h-12 gap-2" 
                onClick={handleDirectLogin}
              >
                <ExternalLink className="w-4 h-4" />
                Open Graphy Dashboard Directly
              </Button>
            </CardContent>
          </Card>

          {/* Help Section */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account yet?
            </p>
            <Button variant="link" asChild className="text-primary">
              <a href="/bodhika">
                <BookOpen className="w-4 h-4 mr-2" />
                Explore our courses and enroll
              </a>
            </Button>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">Access Courses</p>
            </div>
            <div className="p-4">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-accent/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-accent-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">Track Progress</p>
            </div>
            <div className="p-4">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-green-500/10 flex items-center justify-center">
                <LogIn className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-xs text-muted-foreground">Learn Anytime</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
