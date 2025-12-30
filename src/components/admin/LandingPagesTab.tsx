import React, { useState, useEffect } from 'react';
import { 
  Copy, 
  ExternalLink, 
  Loader2, 
  TrendingUp,
  Users,
  ShoppingCart,
  Eye,
  Link2,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Course } from '@/contexts/AdminContext';
import { supabase } from '@/integrations/supabase/client';

interface LandingPagesTabProps {
  courses: Course[];
  toast: any;
}

interface ReferralStats {
  referralLinkId: string;
  referralName: string;
  referralCode: string;
  visits: number;
  enrollments: number;
  conversionRate: number;
}

interface CourseStats {
  courseId: string;
  courseName: string;
  courseSlug: string;
  totalVisits: number;
  totalEnrollments: number;
  referralBreakdown: ReferralStats[];
}

const LandingPagesTab: React.FC<LandingPagesTabProps> = ({ courses, toast }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [courseStats, setCourseStats] = useState<CourseStats[]>([]);
  const [referralLinks, setReferralLinks] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('all');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch referral links
      const { data: links } = await supabase
        .from('referral_links')
        .select('*')
        .order('created_at', { ascending: false });
      
      setReferralLinks(links || []);

      // Fetch all visits
      const { data: visits } = await supabase
        .from('referral_visits')
        .select('*');

      // Fetch all enrollments with referral info
      const { data: enrollments } = await supabase
        .from('course_enrollments')
        .select('*, referral_links(id, name, code)');

      // Build stats per course
      const stats: CourseStats[] = courses.map((course) => {
        // Filter visits to landing pages for this course
        const courseVisits = (visits || []).filter(v => 
          v.page_visited?.includes(`/landing/${course.slug}`)
        );

        // Filter enrollments for this course
        const courseEnrollments = (enrollments || []).filter(e => e.course_id === course.id);

        // Build referral breakdown
        const referralBreakdown: ReferralStats[] = (links || []).map((link) => {
          const linkVisits = courseVisits.filter(v => v.referral_link_id === link.id).length;
          const linkEnrollments = courseEnrollments.filter(e => e.referral_link_id === link.id).length;
          
          return {
            referralLinkId: link.id,
            referralName: link.name,
            referralCode: link.code,
            visits: linkVisits,
            enrollments: linkEnrollments,
            conversionRate: linkVisits > 0 ? (linkEnrollments / linkVisits) * 100 : 0,
          };
        }).filter(r => r.visits > 0 || r.enrollments > 0);

        return {
          courseId: course.id,
          courseName: course.title.en,
          courseSlug: course.slug,
          totalVisits: courseVisits.length,
          totalEnrollments: courseEnrollments.length,
          referralBreakdown,
        };
      });

      setCourseStats(stats);
    } catch (error) {
      console.error('Failed to fetch landing page stats:', error);
      toast({ title: 'Error', description: 'Failed to load stats', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [courses]);

  const copyLandingLink = (slug: string, refCode?: string) => {
    const baseUrl = `${window.location.origin}/landing/${slug}`;
    const url = refCode ? `${baseUrl}?ref=${refCode}` : baseUrl;
    navigator.clipboard.writeText(url);
    toast({ title: 'Copied!', description: 'Landing page URL copied to clipboard' });
  };

  const totalVisits = courseStats.reduce((sum, c) => sum + c.totalVisits, 0);
  const totalEnrollments = courseStats.reduce((sum, c) => sum + c.totalEnrollments, 0);
  const overallConversion = totalVisits > 0 ? ((totalEnrollments / totalVisits) * 100).toFixed(1) : '0';

  const filteredStats = selectedCourse === 'all' 
    ? courseStats 
    : courseStats.filter(s => s.courseId === selectedCourse);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Link2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Landing Pages</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Visits</p>
                <p className="text-2xl font-bold">{totalVisits}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Enrollments</p>
                <p className="text-2xl font-bold">{totalEnrollments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">{overallConversion}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Filter by course:</span>
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="All Courses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {courses.map((course) => (
              <SelectItem key={course.id} value={course.id}>{course.title.en}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Landing Pages Table */}
      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Landing Page URL</TableHead>
              <TableHead className="text-center">Visits</TableHead>
              <TableHead className="text-center">Enrollments</TableHead>
              <TableHead className="text-center">Conversion</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStats.map((stat) => (
              <TableRow key={stat.courseId}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-body font-medium">{stat.courseName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    /landing/{stat.courseSlug}
                  </code>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary">{stat.totalVisits}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge className="bg-green-100 text-green-800">{stat.totalEnrollments}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <span className="font-medium">
                    {stat.totalVisits > 0 
                      ? ((stat.totalEnrollments / stat.totalVisits) * 100).toFixed(1) 
                      : '0'}%
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => copyLandingLink(stat.courseSlug)}
                      title="Copy landing page URL"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <a href={`/landing/${stat.courseSlug}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Open landing page">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Referral Links with Landing Pages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Generate Referral Landing Links
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Combine any course landing page with a referral code to track visits and conversions from specific campaigns.
          </p>
          
          <div className="space-y-3">
            {referralLinks.slice(0, 5).map((link) => (
              <div key={link.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <span className="font-medium">{link.name}</span>
                  <Badge variant="outline" className="ml-2">{link.code}</Badge>
                </div>
                <div className="flex gap-2">
                  {courses.slice(0, 3).map((course) => (
                    <Button
                      key={course.id}
                      variant="outline"
                      size="sm"
                      onClick={() => copyLandingLink(course.slug, link.code)}
                      className="text-xs"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      {course.title.en.substring(0, 15)}...
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {referralLinks.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No referral links created yet. Go to Referral Links tab to create one.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Detailed Referral Breakdown */}
      {filteredStats.some(s => s.referralBreakdown.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Referral Performance Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Referral Source</TableHead>
                  <TableHead className="text-center">Visits</TableHead>
                  <TableHead className="text-center">Enrollments</TableHead>
                  <TableHead className="text-center">Conversion Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStats.flatMap((stat) => 
                  stat.referralBreakdown.map((ref) => (
                    <TableRow key={`${stat.courseId}-${ref.referralLinkId}`}>
                      <TableCell className="font-medium">{stat.courseName}</TableCell>
                      <TableCell>
                        <div>
                          <span>{ref.referralName}</span>
                          <Badge variant="outline" className="ml-2">{ref.referralCode}</Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{ref.visits}</TableCell>
                      <TableCell className="text-center">{ref.enrollments}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={ref.conversionRate > 10 ? 'bg-green-100 text-green-800' : 'bg-muted'}>
                          {ref.conversionRate.toFixed(1)}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LandingPagesTab;
