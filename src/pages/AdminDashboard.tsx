import React, { useState } from 'react';
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
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
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
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';
import { Course } from '@/components/CourseCard';
import { BlogPost } from '@/components/BlogCard';
import logo from '@/assets/shastrakulam-logo.png';

type Tab = 'dashboard' | 'courses' | 'blogs' | 'categories' | 'settings';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { 
    courses, 
    blogPosts, 
    courseCategories, 
    blogCategories,
    addCourse,
    deleteCourse,
    toggleCoursePopular,
    addBlogPost,
    deleteBlogPost,
    addCourseCategory,
    addBlogCategory,
    deleteCourseCategory,
    deleteBlogCategory,
  } = useAdmin();
  const { toast } = useToast();
  const navigate = useNavigate();

  const sidebarItems = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses' as Tab, label: 'Courses', icon: BookOpen },
    { id: 'blogs' as Tab, label: 'Blog Posts', icon: FileText },
    { id: 'categories' as Tab, label: 'Categories', icon: Tag },
    { id: 'settings' as Tab, label: 'Settings', icon: Settings },
  ];

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
              onAdd={addCourse}
              toast={toast}
            />
          )}
          {activeTab === 'blogs' && (
            <BlogsTab 
              posts={blogPosts}
              categories={blogCategories}
              onDelete={deleteBlogPost}
              onAdd={addBlogPost}
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
    { label: 'Blog Posts', value: blogPosts.length, icon: FileText, color: 'bg-green-100 text-green-700' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
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
                <img src={course.thumbnail} alt="" className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <p className="font-body font-medium text-foreground">{course.title.en}</p>
                  <p className="font-body text-sm text-muted-foreground">{course.category}</p>
                </div>
              </div>
              {course.isPopular && <Badge className="bg-accent text-accent-foreground">Featured</Badge>}
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
  categories: string[];
  onDelete: (id: string) => void;
  onTogglePopular: (id: string) => void;
  onAdd: (course: Course) => void;
  toast: any;
}

const CoursesTab: React.FC<CoursesTabProps> = ({ courses, categories, onDelete, onTogglePopular, onAdd, toast }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: '',
    level: 'Kids' as Course['level'],
    duration: '',
    price: '',
  });

  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.category) {
      toast({ title: 'Error', description: 'Please fill in required fields', variant: 'destructive' });
      return;
    }
    const course: Course = {
      id: Date.now().toString(),
      slug: newCourse.title.toLowerCase().replace(/\s+/g, '-'),
      title: { en: newCourse.title, hi: newCourse.title, sa: newCourse.title },
      shortDescription: { en: newCourse.description, hi: newCourse.description, sa: newCourse.description },
      thumbnail: '/placeholder.svg',
      category: newCourse.category,
      level: newCourse.level,
      duration: newCourse.duration,
      price: newCourse.price,
      isPopular: false,
    };
    onAdd(course);
    setIsAddOpen(false);
    setNewCourse({ title: '', description: '', category: '', level: 'Kids', duration: '', price: '' });
    toast({ title: 'Success', description: 'Course added successfully' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="font-body text-muted-foreground">{courses.length} courses total</p>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
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
            <div className="space-y-4 py-4">
              <Input placeholder="Course Title *" value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} />
              <Textarea placeholder="Short Description" value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} />
              <Select value={newCourse.category} onValueChange={(v) => setNewCourse({ ...newCourse, category: v })}>
                <SelectTrigger><SelectValue placeholder="Select Category *" /></SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={newCourse.level} onValueChange={(v) => setNewCourse({ ...newCourse, level: v as Course['level'] })}>
                <SelectTrigger><SelectValue placeholder="Select Level" /></SelectTrigger>
                <SelectContent>
                  {['Kids', 'Teens', 'Adults', 'Gurukul', 'All Ages'].map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Duration (e.g., 12 weeks)" value={newCourse.duration} onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })} />
                <Input placeholder="Price (e.g., ₹4,999)" value={newCourse.price} onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button variant="saffron" onClick={handleAddCourse}>Add Course</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img src={course.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover" />
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
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => {
                        onDelete(course.id);
                        toast({ title: 'Deleted', description: 'Course removed successfully' });
                      }}
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
  categories: string[];
  onDelete: (id: string) => void;
  onAdd: (post: BlogPost) => void;
  toast: any;
}

const BlogsTab: React.FC<BlogsTabProps> = ({ posts, categories, onDelete, onAdd, toast }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    category: '',
    author: '',
  });

  const handleAddPost = () => {
    if (!newPost.title || !newPost.category) {
      toast({ title: 'Error', description: 'Please fill in required fields', variant: 'destructive' });
      return;
    }
    const post: BlogPost = {
      id: Date.now().toString(),
      slug: newPost.title.toLowerCase().replace(/\s+/g, '-'),
      title: { en: newPost.title, hi: newPost.title, sa: newPost.title },
      excerpt: { en: newPost.excerpt, hi: newPost.excerpt, sa: newPost.excerpt },
      thumbnail: '/placeholder.svg',
      category: newPost.category,
      author: newPost.author || 'Admin',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    onAdd(post);
    setIsAddOpen(false);
    setNewPost({ title: '', excerpt: '', category: '', author: '' });
    toast({ title: 'Success', description: 'Blog post added successfully' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="font-body text-muted-foreground">{posts.length} posts total</p>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
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
            <div className="space-y-4 py-4">
              <Input placeholder="Post Title *" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
              <Textarea placeholder="Excerpt" value={newPost.excerpt} onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })} />
              <Select value={newPost.category} onValueChange={(v) => setNewPost({ ...newPost, category: v })}>
                <SelectTrigger><SelectValue placeholder="Select Category *" /></SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input placeholder="Author Name" value={newPost.author} onChange={(e) => setNewPost({ ...newPost, author: e.target.value })} />
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button variant="saffron" onClick={handleAddPost}>Add Post</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Post</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img src={post.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <span className="font-body font-medium">{post.title.en}</span>
                  </div>
                </TableCell>
                <TableCell><Badge variant="secondary">{post.category}</Badge></TableCell>
                <TableCell className="font-body text-sm">{post.author}</TableCell>
                <TableCell className="font-body text-sm text-muted-foreground">{post.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => {
                        onDelete(post.id);
                        toast({ title: 'Deleted', description: 'Post removed successfully' });
                      }}
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
  courseCategories: string[];
  blogCategories: string[];
  onAddCourseCategory: (cat: string) => void;
  onAddBlogCategory: (cat: string) => void;
  onDeleteCourseCategory: (cat: string) => void;
  onDeleteBlogCategory: (cat: string) => void;
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
  const [newCourseCat, setNewCourseCat] = useState('');
  const [newBlogCat, setNewBlogCat] = useState('');

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Course Categories */}
      <div className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="font-heading text-lg font-semibold mb-4">Course Categories</h3>
        <div className="flex gap-2 mb-4">
          <Input 
            placeholder="New category" 
            value={newCourseCat} 
            onChange={(e) => setNewCourseCat(e.target.value)} 
          />
          <Button 
            variant="saffron" 
            onClick={() => {
              if (newCourseCat) {
                onAddCourseCategory(newCourseCat);
                setNewCourseCat('');
                toast({ title: 'Added', description: 'Category added' });
              }
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {courseCategories.map((cat) => (
            <div key={cat} className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg">
              <span className="font-body">{cat}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-destructive"
                onClick={() => {
                  onDeleteCourseCategory(cat);
                  toast({ title: 'Deleted', description: 'Category removed' });
                }}
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
        <div className="flex gap-2 mb-4">
          <Input 
            placeholder="New category" 
            value={newBlogCat} 
            onChange={(e) => setNewBlogCat(e.target.value)} 
          />
          <Button 
            variant="saffron" 
            onClick={() => {
              if (newBlogCat) {
                onAddBlogCategory(newBlogCat);
                setNewBlogCat('');
                toast({ title: 'Added', description: 'Category added' });
              }
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {blogCategories.map((cat) => (
            <div key={cat} className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg">
              <span className="font-body">{cat}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-destructive"
                onClick={() => {
                  onDeleteBlogCategory(cat);
                  toast({ title: 'Deleted', description: 'Category removed' });
                }}
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
