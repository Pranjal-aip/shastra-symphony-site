import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Tag, 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  Star, 
  StarOff,
  ArrowLeft,
  Menu,
  X,
  Home,
  Eye,
  EyeOff,
  Upload,
  Bell,
  Loader2,
  LogOut,
  Link2,
  UserCheck,
  Copy,
  ExternalLink,
  Tent
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAdmin, Course, BlogPost, Category } from '@/contexts/AdminContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import CampsTab from '@/components/admin/CampsTab';
import { supabase } from '@/integrations/supabase/client';
import logo from '@/assets/shastrakulam-logo.png';

type Tab = 'dashboard' | 'courses' | 'camps' | 'blogs' | 'categories' | 'referrals' | 'enrollments' | 'notifications' | 'settings';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { 
    courses, 
    blogPosts, 
    courseCategories, 
    blogCategories,
    notificationPopup,
    loading,
    addCourse,
    updateCourse,
    deleteCourse,
    toggleCoursePopular,
    toggleCourseShowOnHome,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    toggleBlogShowOnHome,
    addCourseCategory,
    addBlogCategory,
    deleteCourseCategory,
    deleteBlogCategory,
    updateNotificationPopup,
    uploadImage,
  } = useAdmin();
  const { toast } = useToast();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login');
    }
  }, [user, authLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const sidebarItems = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses' as Tab, label: 'Courses', icon: BookOpen },
    { id: 'camps' as Tab, label: 'Camps/Shivir', icon: Tent },
    { id: 'blogs' as Tab, label: 'Blog Posts', icon: FileText },
    { id: 'categories' as Tab, label: 'Categories', icon: Tag },
    { id: 'referrals' as Tab, label: 'Referral Links', icon: Link2 },
    { id: 'enrollments' as Tab, label: 'Enrollments', icon: UserCheck },
    { id: 'notifications' as Tab, label: 'Notifications', icon: Bell },
    { id: 'settings' as Tab, label: 'Settings', icon: Settings },
  ];

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="font-body text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0 lg:w-16'} bg-primary text-primary-foreground transition-all duration-300 fixed lg:relative h-screen z-40 overflow-hidden`}>
        <div className="p-4 flex items-center justify-between border-b border-primary-foreground/10">
          <Link to="/" className={`${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <img src={logo} alt="Shastrakulam" className="h-10 w-auto bg-white rounded-lg p-1" />
          </Link>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-primary-foreground p-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-primary-foreground/20 text-accent'
                  : 'text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground'
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className={`font-body ${sidebarOpen ? 'block' : 'hidden lg:hidden'}`}>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Link to="/">
            <Button variant="outline" size="sm" className="w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className={sidebarOpen ? 'block' : 'hidden'}>Back to Site</span>
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              {sidebarItems.find(i => i.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === 'dashboard' && <DashboardTab courses={courses} blogPosts={blogPosts} />}
          {activeTab === 'courses' && (
            <CoursesTab 
              courses={courses} 
              categories={courseCategories}
              onDelete={deleteCourse}
              onTogglePopular={toggleCoursePopular}
              onToggleShowOnHome={toggleCourseShowOnHome}
              onAdd={addCourse}
              onUpdate={updateCourse}
              toast={toast}
            />
          )}
          {activeTab === 'camps' && <CampsTab toast={toast} />}
          {activeTab === 'blogs' && (
            <BlogsTab 
              posts={blogPosts}
              categories={blogCategories}
              onDelete={deleteBlogPost}
              onAdd={addBlogPost}
              onUpdate={updateBlogPost}
              onToggleShowOnHome={toggleBlogShowOnHome}
              toast={toast}
            />
          )}
          {activeTab === 'categories' && (
            <CategoriesTab
              courseCategories={courseCategories}
              blogCategories={blogCategories}
              onAddCourseCategory={addCourseCategory}
              onAddBlogCategory={addBlogCategory}
              onDeleteCourseCategory={deleteCourseCategory}
              onDeleteBlogCategory={deleteBlogCategory}
              toast={toast}
            />
          )}
          {activeTab === 'notifications' && (
            <NotificationsTab 
              popup={notificationPopup}
              onUpdate={updateNotificationPopup}
              toast={toast}
            />
          )}
          {activeTab === 'referrals' && <ReferralsTab toast={toast} />}
          {activeTab === 'enrollments' && <EnrollmentsTab courses={courses} toast={toast} />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </main>
    </div>
  );
};

// Dashboard Tab
const DashboardTab: React.FC<{ courses: Course[]; blogPosts: BlogPost[] }> = ({ courses, blogPosts }) => {
  const stats = [
    { label: 'Total Courses', value: courses.length, icon: BookOpen, color: 'bg-accent/10 text-accent' },
    { label: 'Featured Courses', value: courses.filter(c => c.isPopular).length, icon: Star, color: 'bg-primary/10 text-primary' },
    { label: 'Home Page Courses', value: courses.filter(c => c.showOnHome).length, icon: Home, color: 'bg-blue-100 text-blue-700' },
    { label: 'Blog Posts', value: blogPosts.length, icon: FileText, color: 'bg-green-100 text-green-700' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card rounded-xl p-6 shadow-card border border-border">
            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <p className="font-body text-sm text-muted-foreground">{stat.label}</p>
            <p className="font-heading text-3xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="font-heading text-lg font-semibold mb-4">Recent Courses</h3>
        <div className="space-y-3">
          {courses.slice(0, 5).map((course) => (
            <div key={course.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <img src={course.thumbnail || '/placeholder.svg'} alt="" className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <p className="font-body font-medium text-foreground">{course.title.en}</p>
                  <p className="font-body text-sm text-muted-foreground">{course.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {course.isPopular && <Badge className="bg-accent text-accent-foreground">Popular</Badge>}
                {course.showOnHome && <Badge variant="secondary">Home</Badge>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Courses Tab
interface CoursesTabProps {
  courses: Course[];
  categories: Category[];
  onDelete: (id: string) => Promise<void>;
  onTogglePopular: (id: string) => Promise<void>;
  onToggleShowOnHome: (id: string) => Promise<void>;
  onAdd: (course: Omit<Course, 'id'>) => Promise<void>;
  onUpdate: (id: string, course: Partial<Course>) => Promise<void>;
  toast: any;
}

const CoursesTab: React.FC<CoursesTabProps> = ({ 
  courses, categories, onDelete, onTogglePopular, onToggleShowOnHome, onAdd, onUpdate, toast 
}) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    titleHi: '',
    titleSa: '',
    description: '',
    descriptionHi: '',
    descriptionSa: '',
    category: '',
    level: 'Kids' as Course['level'],
    duration: '',
    price: '',
    thumbnail: '/placeholder.svg',
    isPopular: false,
    showOnHome: false,
    ageMin: '',
    ageMax: '',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      titleHi: '',
      titleSa: '',
      description: '',
      descriptionHi: '',
      descriptionSa: '',
      category: '',
      level: 'Kids',
      duration: '',
      price: '',
      thumbnail: '/placeholder.svg',
      isPopular: false,
      showOnHome: false,
      ageMin: '',
      ageMax: '',
    });
  };

  const handleAddCourse = async () => {
    if (!formData.title || !formData.category) {
      toast({ title: 'Error', description: 'Please fill in required fields', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    try {
      await onAdd({
        slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
        title: { 
          en: formData.title, 
          hi: formData.titleHi || formData.title, 
          sa: formData.titleSa || formData.title 
        },
        shortDescription: { 
          en: formData.description, 
          hi: formData.descriptionHi || formData.description, 
          sa: formData.descriptionSa || formData.description 
        },
        thumbnail: formData.thumbnail,
        category: formData.category,
        level: formData.level,
        duration: formData.duration,
        price: formData.price,
        isPopular: formData.isPopular,
        showOnHome: formData.showOnHome,
        ageMin: formData.ageMin ? parseInt(formData.ageMin) : undefined,
        ageMax: formData.ageMax ? parseInt(formData.ageMax) : undefined,
      });
      setIsAddOpen(false);
      resetForm();
      toast({ title: 'Success', description: 'Course added successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to add course', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title.en,
      titleHi: course.title.hi,
      titleSa: course.title.sa,
      description: course.shortDescription.en,
      descriptionHi: course.shortDescription.hi,
      descriptionSa: course.shortDescription.sa,
      category: course.category,
      level: course.level,
      duration: course.duration,
      price: course.price || '',
      thumbnail: course.thumbnail,
      isPopular: course.isPopular,
      showOnHome: course.showOnHome,
      ageMin: course.ageMin?.toString() || '',
      ageMax: course.ageMax?.toString() || '',
    });
    setIsEditOpen(true);
  };

  const handleUpdateCourse = async () => {
    if (!editingCourse || !formData.title || !formData.category) {
      toast({ title: 'Error', description: 'Please fill in required fields', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    try {
      await onUpdate(editingCourse.id, {
        slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
        title: { 
          en: formData.title, 
          hi: formData.titleHi || formData.title, 
          sa: formData.titleSa || formData.title 
        },
        shortDescription: { 
          en: formData.description, 
          hi: formData.descriptionHi || formData.description, 
          sa: formData.descriptionSa || formData.description 
        },
        thumbnail: formData.thumbnail,
        category: formData.category,
        level: formData.level,
        duration: formData.duration,
        price: formData.price,
        isPopular: formData.isPopular,
        showOnHome: formData.showOnHome,
        ageMin: formData.ageMin ? parseInt(formData.ageMin) : undefined,
        ageMax: formData.ageMax ? parseInt(formData.ageMax) : undefined,
      });
      setIsEditOpen(false);
      setEditingCourse(null);
      resetForm();
      toast({ title: 'Success', description: 'Course updated successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update course', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;
    setIsLoading(true);
    try {
      await onDelete(deleteConfirm);
      toast({ title: 'Deleted', description: 'Course removed successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete course', variant: 'destructive' });
    } finally {
      setIsLoading(false);
      setDeleteConfirm(null);
    }
  };

  const courseFormFieldsJSX = (
    <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
      {/* Image URL Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Course Image URL</label>
        <div className="flex items-start gap-4">
          <img src={formData.thumbnail || '/placeholder.svg'} alt="" className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
          <div className="flex-1">
            <Input 
              placeholder="Paste image URL here (e.g., https://...)" 
              value={formData.thumbnail} 
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })} 
            />
            <p className="text-xs text-muted-foreground mt-1">Paste a direct link to an image</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Title (English) *</label>
        <Input placeholder="Course Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Title (Hindi)</label>
        <Input placeholder="कोर्स का शीर्षक" value={formData.titleHi} onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Title (Sanskrit)</label>
        <Input placeholder="पाठ्यक्रमशीर्षकम्" value={formData.titleSa} onChange={(e) => setFormData({ ...formData, titleSa: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Description (English)</label>
        <Textarea placeholder="Short Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Description (Hindi)</label>
        <Textarea placeholder="संक्षिप्त विवरण" value={formData.descriptionHi} onChange={(e) => setFormData({ ...formData, descriptionHi: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Description (Sanskrit)</label>
        <Textarea placeholder="संक्षिप्तवर्णनम्" value={formData.descriptionSa} onChange={(e) => setFormData({ ...formData, descriptionSa: e.target.value })} />
      </div>
      <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
        <SelectTrigger><SelectValue placeholder="Select Category *" /></SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.name.en}>{cat.name.en}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={formData.level} onValueChange={(v) => setFormData({ ...formData, level: v as Course['level'] })}>
        <SelectTrigger><SelectValue placeholder="Select Level" /></SelectTrigger>
        <SelectContent>
          {['Kids', 'Teens', 'Adults', 'Gurukul', 'All Ages'].map((level) => (
            <SelectItem key={level} value={level}>{level}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Min Age</label>
          <Input type="number" placeholder="e.g., 5" value={formData.ageMin} onChange={(e) => setFormData({ ...formData, ageMin: e.target.value })} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Max Age</label>
          <Input type="number" placeholder="e.g., 12" value={formData.ageMax} onChange={(e) => setFormData({ ...formData, ageMax: e.target.value })} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input placeholder="Duration (e.g., 12 weeks)" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
        <Input placeholder="Price (e.g., ₹4,999)" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="popular">Mark as Popular</Label>
        <Switch id="popular" checked={formData.isPopular} onCheckedChange={(checked) => setFormData({ ...formData, isPopular: checked })} />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="showOnHome">Show on Home Page</Label>
        <Switch id="showOnHome" checked={formData.showOnHome} onCheckedChange={(checked) => setFormData({ ...formData, showOnHome: checked })} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="font-body text-muted-foreground">{courses.length} courses total</p>
        <Dialog open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button variant="saffron" className="gap-2">
              <Plus className="h-4 w-4" /> Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-heading">Add New Course</DialogTitle>
              <DialogDescription>Create a new course for your catalog.</DialogDescription>
            </DialogHeader>
            {courseFormFieldsJSX}
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button variant="saffron" onClick={handleAddCourse} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Add Course
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={(open) => { setIsEditOpen(open); if (!open) { setEditingCourse(null); resetForm(); } }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading">Edit Course</DialogTitle>
            <DialogDescription>Update course details.</DialogDescription>
          </DialogHeader>
            {courseFormFieldsJSX}
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button variant="saffron" onClick={handleUpdateCourse} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={!!deleteConfirm}
        onOpenChange={(open) => !open && setDeleteConfirm(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Course?"
        description="Are you sure you want to delete this course? This action cannot be undone."
      />

      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Popular</TableHead>
              <TableHead>Home Page</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img src={course.thumbnail || '/placeholder.svg'} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <span className="font-body font-medium">{course.title.en}</span>
                  </div>
                </TableCell>
                <TableCell><Badge variant="secondary">{course.category}</Badge></TableCell>
                <TableCell className="font-body text-sm">{course.level}</TableCell>
                <TableCell className="font-body">{course.price || '-'}</TableCell>
                <TableCell>
                  <button onClick={() => onTogglePopular(course.id)} className="hover:scale-110 transition-transform">
                    {course.isPopular ? (
                      <Star className="h-5 w-5 text-accent fill-accent" />
                    ) : (
                      <StarOff className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </TableCell>
                <TableCell>
                  <button onClick={() => onToggleShowOnHome(course.id)} className="hover:scale-110 transition-transform">
                    {course.showOnHome ? (
                      <Eye className="h-5 w-5 text-primary" />
                    ) : (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditClick(course)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => setDeleteConfirm(course.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Blogs Tab
interface BlogsTabProps {
  posts: BlogPost[];
  categories: Category[];
  onDelete: (id: string) => Promise<void>;
  onAdd: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  onUpdate: (id: string, post: Partial<BlogPost>) => Promise<void>;
  onToggleShowOnHome: (id: string) => Promise<void>;
  toast: any;
}

const BlogsTab: React.FC<BlogsTabProps> = ({ posts, categories, onDelete, onAdd, onUpdate, onToggleShowOnHome, toast }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    titleHi: '',
    titleSa: '',
    excerpt: '',
    excerptHi: '',
    excerptSa: '',
    content: '',
    contentHi: '',
    contentSa: '',
    category: '',
    author: '',
    thumbnail: '/placeholder.svg',
    showOnHome: false,
  });

  const resetForm = () => {
    setFormData({
      title: '',
      titleHi: '',
      titleSa: '',
      excerpt: '',
      excerptHi: '',
      excerptSa: '',
      content: '',
      contentHi: '',
      contentSa: '',
      category: '',
      author: '',
      thumbnail: '/placeholder.svg',
      showOnHome: false,
    });
  };


  const handleAddPost = async () => {
    if (!formData.title || !formData.category) {
      toast({ title: 'Error', description: 'Please fill in required fields', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    try {
      await onAdd({
        slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
        title: { 
          en: formData.title, 
          hi: formData.titleHi || formData.title, 
          sa: formData.titleSa || formData.title 
        },
        excerpt: { 
          en: formData.excerpt, 
          hi: formData.excerptHi || formData.excerpt, 
          sa: formData.excerptSa || formData.excerpt 
        },
        content: { 
          en: formData.content, 
          hi: formData.contentHi || formData.content, 
          sa: formData.contentSa || formData.content 
        },
        thumbnail: formData.thumbnail,
        category: formData.category,
        author: formData.author || 'Shastrakulam Team',
        date: new Date().toISOString().split('T')[0],
        showOnHome: formData.showOnHome,
      });
      setIsAddOpen(false);
      resetForm();
      toast({ title: 'Success', description: 'Blog post added successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to add post', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title.en,
      titleHi: post.title.hi,
      titleSa: post.title.sa,
      excerpt: post.excerpt.en,
      excerptHi: post.excerpt.hi,
      excerptSa: post.excerpt.sa,
      content: post.content?.en || '',
      contentHi: post.content?.hi || '',
      contentSa: post.content?.sa || '',
      category: post.category,
      author: post.author,
      thumbnail: post.thumbnail,
      showOnHome: post.showOnHome,
    });
    setIsEditOpen(true);
  };

  const handleUpdatePost = async () => {
    if (!editingPost || !formData.title || !formData.category) {
      toast({ title: 'Error', description: 'Please fill in required fields', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    try {
      await onUpdate(editingPost.id, {
        slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
        title: { 
          en: formData.title, 
          hi: formData.titleHi || formData.title, 
          sa: formData.titleSa || formData.title 
        },
        excerpt: { 
          en: formData.excerpt, 
          hi: formData.excerptHi || formData.excerpt, 
          sa: formData.excerptSa || formData.excerpt 
        },
        content: { 
          en: formData.content, 
          hi: formData.contentHi || formData.content, 
          sa: formData.contentSa || formData.content 
        },
        thumbnail: formData.thumbnail,
        category: formData.category,
        author: formData.author,
        showOnHome: formData.showOnHome,
      });
      setIsEditOpen(false);
      setEditingPost(null);
      resetForm();
      toast({ title: 'Success', description: 'Blog post updated successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update post', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;
    setIsLoading(true);
    try {
      await onDelete(deleteConfirm);
      toast({ title: 'Deleted', description: 'Post removed successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete post', variant: 'destructive' });
    } finally {
      setIsLoading(false);
      setDeleteConfirm(null);
    }
  };

  const blogFormFieldsJSX = (
    <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
      {/* Image URL Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Featured Image URL</label>
        <div className="flex items-start gap-4">
          <img src={formData.thumbnail || '/placeholder.svg'} alt="" className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
          <div className="flex-1">
            <Input 
              placeholder="Paste image URL here (e.g., https://...)" 
              value={formData.thumbnail} 
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })} 
            />
            <p className="text-xs text-muted-foreground mt-1">Paste a direct link to an image</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Title (English) *</label>
        <Input placeholder="Post Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Title (Hindi)</label>
        <Input placeholder="पोस्ट का शीर्षक" value={formData.titleHi} onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Title (Sanskrit)</label>
        <Input placeholder="लेखशीर्षकम्" value={formData.titleSa} onChange={(e) => setFormData({ ...formData, titleSa: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Excerpt (English)</label>
        <Textarea placeholder="Short excerpt" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Excerpt (Hindi)</label>
        <Textarea placeholder="संक्षिप्त अंश" value={formData.excerptHi} onChange={(e) => setFormData({ ...formData, excerptHi: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Excerpt (Sanskrit)</label>
        <Textarea placeholder="संक्षिप्तांशः" value={formData.excerptSa} onChange={(e) => setFormData({ ...formData, excerptSa: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Content (English)</label>
        <Textarea placeholder="Full blog content in English..." className="min-h-[150px]" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Content (Hindi)</label>
        <Textarea placeholder="हिंदी में पूर्ण ब्लॉग सामग्री..." className="min-h-[150px]" value={formData.contentHi} onChange={(e) => setFormData({ ...formData, contentHi: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Content (Sanskrit)</label>
        <Textarea placeholder="संस्कृते पूर्णं ब्लॉग सामग्री..." className="min-h-[150px]" value={formData.contentSa} onChange={(e) => setFormData({ ...formData, contentSa: e.target.value })} />
      </div>
      <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
        <SelectTrigger><SelectValue placeholder="Select Category *" /></SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.name.en}>{cat.name.en}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input placeholder="Author Name" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
      <div className="flex items-center justify-between">
        <Label htmlFor="blogShowOnHome">Show on Home Page</Label>
        <Switch id="blogShowOnHome" checked={formData.showOnHome} onCheckedChange={(checked) => setFormData({ ...formData, showOnHome: checked })} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="font-body text-muted-foreground">{posts.length} posts total</p>
        <Dialog open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button variant="saffron" className="gap-2">
              <Plus className="h-4 w-4" /> Add Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-heading">Add New Blog Post</DialogTitle>
              <DialogDescription>Create a new blog post.</DialogDescription>
            </DialogHeader>
            {blogFormFieldsJSX}
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button variant="saffron" onClick={handleAddPost} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Add Post
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={(open) => { setIsEditOpen(open); if (!open) { setEditingPost(null); resetForm(); } }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading">Edit Blog Post</DialogTitle>
            <DialogDescription>Update blog post details.</DialogDescription>
          </DialogHeader>
          {blogFormFieldsJSX}
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button variant="saffron" onClick={handleUpdatePost} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={!!deleteConfirm}
        onOpenChange={(open) => !open && setDeleteConfirm(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Blog Post?"
        description="Are you sure you want to delete this blog post? This action cannot be undone."
      />

      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Post</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Home Page</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img src={post.thumbnail || '/placeholder.svg'} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <span className="font-body font-medium">{post.title.en}</span>
                  </div>
                </TableCell>
                <TableCell><Badge variant="secondary">{post.category}</Badge></TableCell>
                <TableCell className="font-body text-sm">{post.author}</TableCell>
                <TableCell className="font-body text-sm text-muted-foreground">{post.date}</TableCell>
                <TableCell>
                  <button onClick={() => onToggleShowOnHome(post.id)} className="hover:scale-110 transition-transform">
                    {post.showOnHome ? (
                      <Eye className="h-5 w-5 text-primary" />
                    ) : (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditClick(post)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => setDeleteConfirm(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Categories Tab
interface CategoriesTabProps {
  courseCategories: Category[];
  blogCategories: Category[];
  onAddCourseCategory: (cat: { en: string; hi: string; sa: string }) => Promise<void>;
  onAddBlogCategory: (cat: { en: string; hi: string; sa: string }) => Promise<void>;
  onDeleteCourseCategory: (id: string) => Promise<void>;
  onDeleteBlogCategory: (id: string) => Promise<void>;
  toast: any;
}

const CategoriesTab: React.FC<CategoriesTabProps> = ({
  courseCategories,
  blogCategories,
  onAddCourseCategory,
  onAddBlogCategory,
  onDeleteCourseCategory,
  onDeleteBlogCategory,
  toast,
}) => {
  const [newCourseCat, setNewCourseCat] = useState({ en: '', hi: '', sa: '' });
  const [newBlogCat, setNewBlogCat] = useState({ en: '', hi: '', sa: '' });
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; type: 'course' | 'blog' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;
    setIsLoading(true);
    try {
      if (deleteConfirm.type === 'course') {
        await onDeleteCourseCategory(deleteConfirm.id);
      } else {
        await onDeleteBlogCategory(deleteConfirm.id);
      }
      toast({ title: 'Deleted', description: 'Category removed' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete category', variant: 'destructive' });
    } finally {
      setIsLoading(false);
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={!!deleteConfirm}
        onOpenChange={(open) => !open && setDeleteConfirm(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Category?"
        description="Are you sure you want to delete this category? This action cannot be undone."
      />

      {/* Course Categories */}
      <div className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="font-heading text-lg font-semibold mb-4">Course Categories</h3>
        <div className="space-y-3 mb-4">
          <Input 
            placeholder="Category (English)" 
            value={newCourseCat.en} 
            onChange={(e) => setNewCourseCat({ ...newCourseCat, en: e.target.value })} 
          />
          <Input 
            placeholder="श्रेणी (Hindi)" 
            value={newCourseCat.hi} 
            onChange={(e) => setNewCourseCat({ ...newCourseCat, hi: e.target.value })} 
          />
          <Input 
            placeholder="वर्गः (Sanskrit)" 
            value={newCourseCat.sa} 
            onChange={(e) => setNewCourseCat({ ...newCourseCat, sa: e.target.value })} 
          />
          <Button 
            variant="saffron" 
            className="w-full"
            onClick={async () => {
              if (newCourseCat.en) {
                await onAddCourseCategory(newCourseCat);
                setNewCourseCat({ en: '', hi: '', sa: '' });
                toast({ title: 'Added', description: 'Category added' });
              }
            }}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Category
          </Button>
        </div>
        <div className="space-y-2">
          {courseCategories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg">
              <div>
                <span className="font-body font-medium">{cat.name.en}</span>
                {cat.name.hi && <span className="font-body text-sm text-muted-foreground ml-2">({cat.name.hi})</span>}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-destructive"
                onClick={() => setDeleteConfirm({ id: cat.id, type: 'course' })}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Categories */}
      <div className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="font-heading text-lg font-semibold mb-4">Blog Categories</h3>
        <div className="space-y-3 mb-4">
          <Input 
            placeholder="Category (English)" 
            value={newBlogCat.en} 
            onChange={(e) => setNewBlogCat({ ...newBlogCat, en: e.target.value })} 
          />
          <Input 
            placeholder="श्रेणी (Hindi)" 
            value={newBlogCat.hi} 
            onChange={(e) => setNewBlogCat({ ...newBlogCat, hi: e.target.value })} 
          />
          <Input 
            placeholder="वर्गः (Sanskrit)" 
            value={newBlogCat.sa} 
            onChange={(e) => setNewBlogCat({ ...newBlogCat, sa: e.target.value })} 
          />
          <Button 
            variant="saffron" 
            className="w-full"
            onClick={async () => {
              if (newBlogCat.en) {
                await onAddBlogCategory(newBlogCat);
                setNewBlogCat({ en: '', hi: '', sa: '' });
                toast({ title: 'Added', description: 'Category added' });
              }
            }}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Category
          </Button>
        </div>
        <div className="space-y-2">
          {blogCategories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg">
              <div>
                <span className="font-body font-medium">{cat.name.en}</span>
                {cat.name.hi && <span className="font-body text-sm text-muted-foreground ml-2">({cat.name.hi})</span>}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-destructive"
                onClick={() => setDeleteConfirm({ id: cat.id, type: 'blog' })}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Notifications Tab
interface NotificationsTabProps {
  popup: any;
  onUpdate: (popup: any) => Promise<void>;
  toast: any;
}

const NotificationsTab: React.FC<NotificationsTabProps> = ({ popup, onUpdate, toast }) => {
  const [formData, setFormData] = useState({
    titleEn: popup?.title?.en || '',
    titleHi: popup?.title?.hi || '',
    titleSa: popup?.title?.sa || '',
    messageEn: popup?.message?.en || '',
    messageHi: popup?.message?.hi || '',
    messageSa: popup?.message?.sa || '',
    imageUrl: popup?.imageUrl || '',
    isEnabled: popup?.isEnabled || false,
    showOnAllPages: popup?.showOnAllPages || true,
    startDate: popup?.startDate || '',
    endDate: popup?.endDate || '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onUpdate({
        title: { en: formData.titleEn, hi: formData.titleHi, sa: formData.titleSa },
        message: { en: formData.messageEn, hi: formData.messageHi, sa: formData.messageSa },
        imageUrl: formData.imageUrl || undefined,
        isEnabled: formData.isEnabled,
        showOnAllPages: formData.showOnAllPages,
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined,
      });
      toast({ title: 'Success', description: 'Notification settings saved' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save settings', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="bg-card rounded-xl p-6 shadow-card border border-border space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-semibold">Notification Popup</h3>
          <div className="flex items-center gap-2">
            <Label htmlFor="enabled">Enable Popup</Label>
            <Switch 
              id="enabled" 
              checked={formData.isEnabled} 
              onCheckedChange={(checked) => setFormData({ ...formData, isEnabled: checked })} 
            />
          </div>
        </div>

        {/* Image URL Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Poster Image URL (Optional)</label>
          <div className="flex items-start gap-4">
            {formData.imageUrl && (
              <img src={formData.imageUrl} alt="" className="w-24 h-16 rounded-lg object-cover flex-shrink-0" />
            )}
            <div className="flex-1">
              <Input 
                placeholder="Paste image URL here (e.g., https://...)" 
                value={formData.imageUrl} 
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} 
              />
              <p className="text-xs text-muted-foreground mt-1">Paste a direct link to an image</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title (English)</label>
            <Input value={formData.titleEn} onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Title (Hindi)</label>
            <Input value={formData.titleHi} onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Title (Sanskrit)</label>
            <Input value={formData.titleSa} onChange={(e) => setFormData({ ...formData, titleSa: e.target.value })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Message (English)</label>
            <Textarea value={formData.messageEn} onChange={(e) => setFormData({ ...formData, messageEn: e.target.value })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Message (Hindi)</label>
            <Textarea value={formData.messageHi} onChange={(e) => setFormData({ ...formData, messageHi: e.target.value })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Message (Sanskrit)</label>
            <Textarea value={formData.messageSa} onChange={(e) => setFormData({ ...formData, messageSa: e.target.value })} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="allPages">Show on All Pages</Label>
            <Switch 
              id="allPages" 
              checked={formData.showOnAllPages} 
              onCheckedChange={(checked) => setFormData({ ...formData, showOnAllPages: checked })} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date (Optional)</label>
              <Input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">End Date (Optional)</label>
              <Input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
            </div>
          </div>
        </div>

        <Button variant="saffron" onClick={handleSave} disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
};

// Referrals Tab
interface ReferralsTabProps {
  toast: any;
}

const ReferralsTab: React.FC<ReferralsTabProps> = ({ toast }) => {
  const [referralLinks, setReferralLinks] = useState<any[]>([]);
  const [referralVisits, setReferralVisits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', code: '', description: '' });
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [linksRes, visitsRes] = await Promise.all([
        supabase.from('referral_links').select('*').order('created_at', { ascending: false }),
        supabase.from('referral_visits').select('*, referral_links(name, code)').order('visited_at', { ascending: false }).limit(100)
      ]);
      
      if (linksRes.data) setReferralLinks(linksRes.data);
      if (visitsRes.data) setReferralVisits(visitsRes.data);
    } catch (error) {
      console.error('Failed to fetch referral data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, code });
  };

  const handleAddLink = async () => {
    if (!formData.name || !formData.code) {
      toast({ title: 'Error', description: 'Name and code are required', variant: 'destructive' });
      return;
    }
    
    setIsSaving(true);
    try {
      const { error } = await supabase.from('referral_links').insert({
        name: formData.name,
        code: formData.code.toUpperCase(),
        description: formData.description || null,
      });
      
      if (error) throw error;
      
      toast({ title: 'Success', description: 'Referral link created' });
      setFormData({ name: '', code: '', description: '' });
      setIsAddOpen(false);
      fetchData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to create link', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const toggleActive = async (id: string, currentState: boolean) => {
    try {
      await supabase.from('referral_links').update({ is_active: !currentState }).eq('id', id);
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update', variant: 'destructive' });
    }
  };

  const copyLink = (code: string) => {
    const url = `${window.location.origin}/?ref=${code}`;
    navigator.clipboard.writeText(url);
    toast({ title: 'Copied!', description: 'Referral link copied to clipboard' });
  };

  const getVisitCount = (linkId: string) => {
    return referralVisits.filter(v => v.referral_link_id === linkId).length;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="font-body text-muted-foreground">{referralLinks.length} referral links</p>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button variant="saffron" className="gap-2">
              <Plus className="h-4 w-4" /> Create Referral Link
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Referral Link</DialogTitle>
              <DialogDescription>Create a unique referral link to track visits and enrollments.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name *</label>
                <Input 
                  placeholder="e.g., Instagram Campaign" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Referral Code *</label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="SUMMER2024" 
                    value={formData.code} 
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })} 
                  />
                  <Button type="button" variant="outline" onClick={generateCode}>Generate</Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Input 
                  placeholder="Optional description" 
                  value={formData.description} 
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button variant="saffron" onClick={handleAddLink} disabled={isSaving}>
                {isSaving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Create Link
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Visits</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {referralLinks.map((link) => (
              <TableRow key={link.id}>
                <TableCell>
                  <div>
                    <span className="font-body font-medium">{link.name}</span>
                    {link.description && (
                      <p className="text-sm text-muted-foreground">{link.description}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{link.code}</Badge>
                </TableCell>
                <TableCell>
                  <span className="font-body">{getVisitCount(link.id)}</span>
                </TableCell>
                <TableCell>
                  <Switch 
                    checked={link.is_active} 
                    onCheckedChange={() => toggleActive(link.id, link.is_active)}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyLink(link.code)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <a href={`/?ref=${link.code}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {referralLinks.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No referral links created yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Enrollments Tab
interface EnrollmentsTabProps {
  courses: Course[];
  toast: any;
}

const EnrollmentsTab: React.FC<EnrollmentsTabProps> = ({ courses, toast }) => {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEnrollments = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('course_enrollments')
        .select('*, referral_links(name, code)')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      if (data) setEnrollments(data);
    } catch (error) {
      console.error('Failed to fetch enrollments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await supabase.from('course_enrollments').update({ status }).eq('id', id);
      fetchEnrollments();
      toast({ title: 'Updated', description: 'Enrollment status updated' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update', variant: 'destructive' });
    }
  };

  const getCourseName = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    return course?.title.en || 'Unknown Course';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected': return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'contacted': return <Badge className="bg-blue-100 text-blue-800">Contacted</Badge>;
      default: return <Badge variant="secondary">Pending</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="font-body text-muted-foreground">{enrollments.length} enrollment requests</p>
      </div>

      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Referral</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrollments.map((enrollment) => (
              <TableRow key={enrollment.id}>
                <TableCell>
                  <div>
                    <span className="font-body font-medium">{enrollment.student_name}</span>
                    <p className="text-sm text-muted-foreground">{enrollment.email}</p>
                    {enrollment.phone && <p className="text-sm text-muted-foreground">{enrollment.phone}</p>}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-body">{getCourseName(enrollment.course_id)}</span>
                </TableCell>
                <TableCell>
                  <span className="font-body">
                    {enrollment.age ? `${enrollment.age} years` : enrollment.age_group || '-'}
                  </span>
                </TableCell>
                <TableCell>
                  {enrollment.referral_links ? (
                    <Badge variant="outline">{enrollment.referral_links.code}</Badge>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="font-body text-sm">
                    {new Date(enrollment.created_at).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>{getStatusBadge(enrollment.status)}</TableCell>
                <TableCell className="text-right">
                  <Select value={enrollment.status} onValueChange={(v) => updateStatus(enrollment.id, v)}>
                    <SelectTrigger className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
            {enrollments.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No enrollment requests yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Settings Tab
const SettingsTab: React.FC = () => {
  return (
    <div className="max-w-2xl">
      <div className="bg-card rounded-xl p-6 shadow-card border border-border space-y-6">
        <h3 className="font-heading text-lg font-semibold">Site Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="font-body text-sm font-medium mb-2 block">WhatsApp Number</label>
            <Input placeholder="+91 98765 43210" defaultValue="+91 98765 43210" />
          </div>
          <div>
            <label className="font-body text-sm font-medium mb-2 block">Contact Email</label>
            <Input placeholder="info@shastrakulam.org" defaultValue="info@shastrakulam.org" />
          </div>
          <div>
            <label className="font-body text-sm font-medium mb-2 block">Contact Phone</label>
            <Input placeholder="+91 98765 43210" defaultValue="+91 98765 43210" />
          </div>
          <div>
            <label className="font-body text-sm font-medium mb-2 block">Address</label>
            <Textarea placeholder="Your address" defaultValue="123 Vedic Lane, Vrindavan, UP 281121" />
          </div>
        </div>
        <Button variant="saffron">Save Settings</Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
