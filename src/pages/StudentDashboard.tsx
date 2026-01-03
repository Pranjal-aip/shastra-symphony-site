import React, { useState } from 'react';
import { GraduationCap, BookOpen, Clock, Trophy, ExternalLink, Loader2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

interface CourseProgress {
  productId: string;
  productName: string;
  progressPercent: number;
  enrolledAt: string;
  status: string;
}

interface LearnerData {
  id: string;
  name: string;
  email: string;
  courses: CourseProgress[];
}

const StudentDashboard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [learnerData, setLearnerData] = useState<LearnerData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLookup = async (e: React.FormEvent) => {
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
    setError(null);
    setLearnerData(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('graphy-sync', {
        body: {
          action: 'get_learner',
          email: email.trim(),
        },
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch learner data');
      }

      // Parse Graphy response - structure may vary
      const learners = data.data?.learners || data.data?.data || [];
      
      if (!learners || learners.length === 0) {
        setError('No account found with this email. Please enroll in a course first.');
        return;
      }

      const learner = learners[0];
      const courses: CourseProgress[] = (learner.courses || learner.products || []).map((course: any) => ({
        productId: course.productId || course.id,
        productName: course.productName || course.name || course.title || 'Course',
        progressPercent: course.progress || course.progressPercent || 0,
        enrolledAt: course.enrolledAt || course.createdAt || new Date().toISOString(),
        status: course.status || (course.progress >= 100 ? 'completed' : 'in_progress'),
      }));

      setLearnerData({
        id: learner.id || learner.learnerId,
        name: learner.name || 'Student',
        email: learner.email,
        courses,
      });

    } catch (err) {
      console.error('Lookup error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch your courses');
      toast({
        title: 'Error',
        description: 'Could not fetch your course data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openGraphyDashboard = () => {
    window.open('https://learn.shastrakulam.com/login', '_blank');
  };

  return (
    <Layout>
      <SEO 
        title={{ en: "My Courses - Student Dashboard", hi: "मेरे पाठ्यक्रम - छात्र डैशबोर्ड", sa: "मम पाठ्यक्रमाः - छात्रफलकम्" }}
        description={{ en: "Access your enrolled courses, track your learning progress, and continue your Vedic education journey with Shastrakulam.", hi: "अपने नामांकित पाठ्यक्रमों तक पहुंचें, अपनी सीखने की प्रगति को ट्रैक करें।", sa: "स्वीयान् पाठ्यक्रमान् प्राप्नुत, स्वीयां प्रगतिं अनुसरत।" }}
        url="/my-courses"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              My Learning Dashboard
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter your email to view your enrolled courses and track your progress
            </p>
          </div>

          {/* Email Lookup Form */}
          {!learnerData && (
            <Card className="mb-8 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Find Your Courses
                </CardTitle>
                <CardDescription>
                  Enter the email address you used when enrolling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading} className="gap-2">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Looking up...
                      </>
                    ) : (
                      'Find My Courses'
                    )}
                  </Button>
                </form>

                {error && (
                  <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                    {error}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Learner Dashboard */}
          {learnerData && (
            <div className="space-y-6">
              {/* Welcome Card */}
              <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="py-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">
                        Welcome back, {learnerData.name}!
                      </h2>
                      <p className="text-muted-foreground text-sm">{learnerData.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setLearnerData(null)}>
                        Switch Account
                      </Button>
                      <Button size="sm" className="gap-2" onClick={openGraphyDashboard}>
                        <ExternalLink className="w-4 h-4" />
                        Go to Courses
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="py-4 flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{learnerData.courses.length}</p>
                      <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="py-4 flex items-center gap-4">
                    <div className="p-3 rounded-full bg-accent/10">
                      <Clock className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {learnerData.courses.filter(c => c.status === 'in_progress' || c.progressPercent < 100).length}
                      </p>
                      <p className="text-sm text-muted-foreground">In Progress</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="py-4 flex items-center gap-4">
                    <div className="p-3 rounded-full bg-green-500/10">
                      <Trophy className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {learnerData.courses.filter(c => c.status === 'completed' || c.progressPercent >= 100).length}
                      </p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Course List */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Your Courses</h3>
                
                {learnerData.courses.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-foreground mb-2">No courses yet</h4>
                      <p className="text-muted-foreground mb-4">
                        You haven't enrolled in any courses yet. Explore our offerings!
                      </p>
                      <Button asChild>
                        <a href="/bodhika">Explore Courses</a>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {learnerData.courses.map((course, index) => (
                      <Card key={course.productId || index} className="hover:shadow-md transition-shadow">
                        <CardContent className="py-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground mb-1">{course.productName}</h4>
                              <p className="text-sm text-muted-foreground">
                                Enrolled: {new Date(course.enrolledAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-32">
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-muted-foreground">Progress</span>
                                  <span className="font-medium text-foreground">{Math.round(course.progressPercent)}%</span>
                                </div>
                                <Progress value={course.progressPercent} className="h-2" />
                              </div>
                              <Button variant="outline" size="sm" onClick={openGraphyDashboard}>
                                Continue
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Help Section */}
              <Card className="bg-muted/50">
                <CardContent className="py-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Need help?</h4>
                      <p className="text-sm text-muted-foreground">
                        Contact our support team for any questions about your courses
                      </p>
                    </div>
                    <Button variant="outline" asChild>
                      <a href="/contact">Contact Support</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
