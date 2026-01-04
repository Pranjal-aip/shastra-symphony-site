import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  UserPlus, 
  Search, 
  RefreshCw,
  Mail,
  Phone,
  Calendar,
  ExternalLink,
  Filter,
  X,
  CheckCircle2,
  XCircle,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';

interface GraphyLearner {
  id: string;
  email: string;
  name: string | null;
  mobile: string | null;
  graphy_learner_id: string | null;
  marketing_consent: boolean;
  signup_source: string | null;
  created_at: string;
  updated_at: string;
}

interface GraphyCourse {
  id: string;
  graphy_course_id: string | null;
  title: string;
  course_link: string | null;
  published_at: string | null;
  is_synced_to_local: boolean;
  created_at: string;
  updated_at: string;
}

interface GraphySubscriber {
  id: string;
  email: string;
  name: string | null;
  mobile: string | null;
  source: string | null;
  subscribed_at: string;
  created_at: string;
}

interface GraphyDataTabProps {
  toast: any;
}

const GraphyDataTab: React.FC<GraphyDataTabProps> = ({ toast }) => {
  const [activeSubTab, setActiveSubTab] = useState('learners');
  const [loading, setLoading] = useState(false);
  
  // Learners state
  const [learners, setLearners] = useState<GraphyLearner[]>([]);
  const [learnerSearch, setLearnerSearch] = useState('');
  const [learnerConsentFilter, setLearnerConsentFilter] = useState<string>('all');
  
  // Courses state
  const [courses, setCourses] = useState<GraphyCourse[]>([]);
  const [courseSearch, setCourseSearch] = useState('');
  const [courseSyncFilter, setCourseSyncFilter] = useState<string>('all');
  
  // Subscribers state
  const [subscribers, setSubscribers] = useState<GraphySubscriber[]>([]);
  const [subscriberSearch, setSubscriberSearch] = useState('');
  const [subscriberSourceFilter, setSubscriberSourceFilter] = useState<string>('all');

  // Fetch data on mount and tab change
  useEffect(() => {
    fetchData();
  }, [activeSubTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeSubTab === 'learners') {
        const { data, error } = await supabase
          .from('graphy_learners')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setLearners(data || []);
      } else if (activeSubTab === 'courses') {
        const { data, error } = await supabase
          .from('graphy_courses')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setCourses(data || []);
      } else if (activeSubTab === 'subscribers') {
        const { data, error } = await supabase
          .from('graphy_subscribers')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setSubscribers(data || []);
      }
    } catch (error: any) {
      toast({
        title: 'Error fetching data',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Filter learners
  const filteredLearners = learners.filter((learner) => {
    const matchesSearch = 
      learner.email.toLowerCase().includes(learnerSearch.toLowerCase()) ||
      (learner.name?.toLowerCase().includes(learnerSearch.toLowerCase()) ?? false) ||
      (learner.mobile?.includes(learnerSearch) ?? false);
    
    const matchesConsent = 
      learnerConsentFilter === 'all' ||
      (learnerConsentFilter === 'yes' && learner.marketing_consent) ||
      (learnerConsentFilter === 'no' && !learner.marketing_consent);
    
    return matchesSearch && matchesConsent;
  });

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = 
      course.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
      (course.graphy_course_id?.toLowerCase().includes(courseSearch.toLowerCase()) ?? false);
    
    const matchesSync = 
      courseSyncFilter === 'all' ||
      (courseSyncFilter === 'synced' && course.is_synced_to_local) ||
      (courseSyncFilter === 'not_synced' && !course.is_synced_to_local);
    
    return matchesSearch && matchesSync;
  });

  // Get unique subscriber sources for filter
  const subscriberSources = [...new Set(subscribers.map(s => s.source).filter(Boolean))];

  // Filter subscribers
  const filteredSubscribers = subscribers.filter((subscriber) => {
    const matchesSearch = 
      subscriber.email.toLowerCase().includes(subscriberSearch.toLowerCase()) ||
      (subscriber.name?.toLowerCase().includes(subscriberSearch.toLowerCase()) ?? false) ||
      (subscriber.mobile?.includes(subscriberSearch) ?? false);
    
    const matchesSource = 
      subscriberSourceFilter === 'all' ||
      subscriber.source === subscriberSourceFilter;
    
    return matchesSearch && matchesSource;
  });

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      toast({ title: 'No data to export', variant: 'destructive' });
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          if (value === null || value === undefined) return '';
          if (typeof value === 'string' && value.includes(',')) return `"${value}"`;
          return value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({ title: 'Data exported successfully' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">Graphy Data</h2>
          <p className="text-muted-foreground">Manage learners, courses, and subscribers from Graphy</p>
        </div>
        <Button onClick={fetchData} variant="outline" size="sm" disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="learners" className="gap-2">
            <Users className="h-4 w-4" />
            Learners ({learners.length})
          </TabsTrigger>
          <TabsTrigger value="courses" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Courses ({courses.length})
          </TabsTrigger>
          <TabsTrigger value="subscribers" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Subscribers ({subscribers.length})
          </TabsTrigger>
        </TabsList>

        {/* Learners Tab */}
        <TabsContent value="learners" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-1 gap-4 items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name, email, or mobile..."
                  value={learnerSearch}
                  onChange={(e) => setLearnerSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={learnerConsentFilter} onValueChange={setLearnerConsentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Marketing consent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Consent Status</SelectItem>
                  <SelectItem value="yes">Consented</SelectItem>
                  <SelectItem value="no">Not Consented</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => exportToCSV(filteredLearners, 'graphy-learners')}
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Consent</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ) : filteredLearners.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      {learners.length === 0 ? 'No learners found' : 'No matches found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLearners.map((learner) => (
                    <TableRow key={learner.id}>
                      <TableCell className="font-medium">{learner.name || '-'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {learner.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        {learner.mobile ? (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            {learner.mobile}
                          </div>
                        ) : '-'}
                      </TableCell>
                      <TableCell>
                        {learner.signup_source ? (
                          <Badge variant="secondary">{learner.signup_source}</Badge>
                        ) : '-'}
                      </TableCell>
                      <TableCell>
                        {learner.marketing_consent ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {formatDate(learner.created_at)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <p className="text-sm text-muted-foreground">
            Showing {filteredLearners.length} of {learners.length} learners
          </p>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-1 gap-4 items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by title or ID..."
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={courseSyncFilter} onValueChange={setCourseSyncFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sync status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="synced">Synced to Local</SelectItem>
                  <SelectItem value="not_synced">Not Synced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => exportToCSV(filteredCourses, 'graphy-courses')}
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Graphy ID</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Synced</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ) : filteredCourses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      {courses.length === 0 ? 'No courses found' : 'No matches found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {course.graphy_course_id || '-'}
                        </code>
                      </TableCell>
                      <TableCell>{formatDate(course.published_at)}</TableCell>
                      <TableCell>
                        {course.is_synced_to_local ? (
                          <Badge variant="default" className="bg-green-600">Synced</Badge>
                        ) : (
                          <Badge variant="secondary">Not Synced</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {course.course_link && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={course.course_link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <p className="text-sm text-muted-foreground">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </TabsContent>

        {/* Subscribers Tab */}
        <TabsContent value="subscribers" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-1 gap-4 items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name, email, or mobile..."
                  value={subscriberSearch}
                  onChange={(e) => setSubscriberSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={subscriberSourceFilter} onValueChange={setSubscriberSourceFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {subscriberSources.map((source) => (
                    <SelectItem key={source} value={source!}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => exportToCSV(filteredSubscribers, 'graphy-subscribers')}
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Subscribed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ) : filteredSubscribers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      {subscribers.length === 0 ? 'No subscribers found' : 'No matches found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell className="font-medium">{subscriber.name || '-'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {subscriber.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        {subscriber.mobile ? (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            {subscriber.mobile}
                          </div>
                        ) : '-'}
                      </TableCell>
                      <TableCell>
                        {subscriber.source ? (
                          <Badge variant="secondary">{subscriber.source}</Badge>
                        ) : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {formatDateTime(subscriber.subscribed_at)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <p className="text-sm text-muted-foreground">
            Showing {filteredSubscribers.length} of {subscribers.length} subscribers
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GraphyDataTab;
