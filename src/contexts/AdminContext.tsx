import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Course {
  id: string;
  slug: string;
  title: { en: string; hi: string; sa: string };
  shortDescription: { en: string; hi: string; sa: string };
  fullDescription?: { en: string; hi: string; sa: string };
  thumbnail: string;
  category: string;
  level: 'Kids' | 'Teens' | 'Adults' | 'Gurukul' | 'All Ages';
  duration: string;
  isPopular: boolean;
  showOnHome: boolean;
  price?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: { en: string; hi: string; sa: string };
  excerpt: { en: string; hi: string; sa: string };
  content?: { en: string; hi: string; sa: string };
  thumbnail: string;
  category: string;
  author: string;
  date: string;
  showOnHome: boolean;
}

export interface Category {
  id: string;
  name: { en: string; hi: string; sa: string };
}

export interface NotificationPopup {
  id: string;
  title: { en: string; hi: string; sa: string };
  message: { en: string; hi: string; sa: string };
  imageUrl?: string;
  isEnabled: boolean;
  showOnAllPages: boolean;
  startDate?: string;
  endDate?: string;
}

interface AdminContextType {
  courses: Course[];
  blogPosts: BlogPost[];
  courseCategories: Category[];
  blogCategories: Category[];
  notificationPopup: NotificationPopup | null;
  loading: boolean;
  addCourse: (course: Omit<Course, 'id'>) => Promise<void>;
  updateCourse: (id: string, course: Partial<Course>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  toggleCoursePopular: (id: string) => Promise<void>;
  toggleCourseShowOnHome: (id: string) => Promise<void>;
  getCourseById: (id: string) => Course | undefined;
  getCourseBySlug: (slug: string) => Course | undefined;
  addBlogPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  toggleBlogShowOnHome: (id: string) => Promise<void>;
  getBlogPostById: (id: string) => BlogPost | undefined;
  getBlogPostBySlug: (slug: string) => BlogPost | undefined;
  addCourseCategory: (category: { en: string; hi: string; sa: string }) => Promise<void>;
  addBlogCategory: (category: { en: string; hi: string; sa: string }) => Promise<void>;
  deleteCourseCategory: (id: string) => Promise<void>;
  deleteBlogCategory: (id: string) => Promise<void>;
  updateNotificationPopup: (popup: Partial<NotificationPopup>) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
  refetch: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [courseCategories, setCourseCategories] = useState<Category[]>([]);
  const [blogCategories, setBlogCategories] = useState<Category[]>([]);
  const [notificationPopup, setNotificationPopup] = useState<NotificationPopup | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch courses
      const { data: coursesData } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
      if (coursesData) {
        setCourses(coursesData.map(c => ({
          id: c.id,
          slug: c.slug,
          title: { en: c.title_en, hi: c.title_hi || c.title_en, sa: c.title_sa || c.title_en },
          shortDescription: { en: c.short_description_en || '', hi: c.short_description_hi || '', sa: c.short_description_sa || '' },
          fullDescription: { en: c.full_description_en || '', hi: c.full_description_hi || '', sa: c.full_description_sa || '' },
          thumbnail: c.thumbnail || '/placeholder.svg',
          category: c.category,
          level: c.level as Course['level'],
          duration: c.duration || '',
          price: c.price || '',
          isPopular: c.is_popular,
          showOnHome: c.show_on_home,
        })));
      }

      // Fetch blog posts
      const { data: blogData } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (blogData) {
        setBlogPosts(blogData.map(b => ({
          id: b.id,
          slug: b.slug,
          title: { en: b.title_en, hi: b.title_hi || b.title_en, sa: b.title_sa || b.title_en },
          excerpt: { en: b.excerpt_en || '', hi: b.excerpt_hi || '', sa: b.excerpt_sa || '' },
          content: { en: b.content_en || '', hi: b.content_hi || '', sa: b.content_sa || '' },
          thumbnail: b.thumbnail || '/placeholder.svg',
          category: b.category,
          author: b.author,
          date: b.date,
          showOnHome: b.show_on_home,
        })));
      }

      // Fetch course categories
      const { data: courseCatsData } = await supabase.from('course_categories').select('*').order('name_en');
      if (courseCatsData) {
        setCourseCategories(courseCatsData.map(c => ({
          id: c.id,
          name: { en: c.name_en, hi: c.name_hi || c.name_en, sa: c.name_sa || c.name_en },
        })));
      }

      // Fetch blog categories
      const { data: blogCatsData } = await supabase.from('blog_categories').select('*').order('name_en');
      if (blogCatsData) {
        setBlogCategories(blogCatsData.map(c => ({
          id: c.id,
          name: { en: c.name_en, hi: c.name_hi || c.name_en, sa: c.name_sa || c.name_en },
        })));
      }

      // Fetch notification popup
      const { data: popupData } = await supabase.from('notification_popup').select('*').limit(1).single();
      if (popupData) {
        setNotificationPopup({
          id: popupData.id,
          title: { en: popupData.title_en || '', hi: popupData.title_hi || '', sa: popupData.title_sa || '' },
          message: { en: popupData.message_en || '', hi: popupData.message_hi || '', sa: popupData.message_sa || '' },
          imageUrl: popupData.image_url || undefined,
          isEnabled: popupData.is_enabled,
          showOnAllPages: popupData.show_on_all_pages,
          startDate: popupData.start_date || undefined,
          endDate: popupData.end_date || undefined,
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addCourse = async (course: Omit<Course, 'id'>) => {
    const { error } = await supabase.from('courses').insert({
      slug: course.slug,
      title_en: course.title.en,
      title_hi: course.title.hi,
      title_sa: course.title.sa,
      short_description_en: course.shortDescription.en,
      short_description_hi: course.shortDescription.hi,
      short_description_sa: course.shortDescription.sa,
      full_description_en: course.fullDescription?.en || '',
      full_description_hi: course.fullDescription?.hi || '',
      full_description_sa: course.fullDescription?.sa || '',
      thumbnail: course.thumbnail,
      category: course.category,
      level: course.level,
      duration: course.duration,
      price: course.price,
      is_popular: course.isPopular,
      show_on_home: course.showOnHome,
    });
    if (error) throw error;
    await fetchData();
  };

  const updateCourse = async (id: string, updates: Partial<Course>) => {
    const updateData: Record<string, unknown> = {};
    if (updates.slug) updateData.slug = updates.slug;
    if (updates.title) {
      updateData.title_en = updates.title.en;
      updateData.title_hi = updates.title.hi;
      updateData.title_sa = updates.title.sa;
    }
    if (updates.shortDescription) {
      updateData.short_description_en = updates.shortDescription.en;
      updateData.short_description_hi = updates.shortDescription.hi;
      updateData.short_description_sa = updates.shortDescription.sa;
    }
    if (updates.fullDescription) {
      updateData.full_description_en = updates.fullDescription.en;
      updateData.full_description_hi = updates.fullDescription.hi;
      updateData.full_description_sa = updates.fullDescription.sa;
    }
    if (updates.thumbnail) updateData.thumbnail = updates.thumbnail;
    if (updates.category) updateData.category = updates.category;
    if (updates.level) updateData.level = updates.level;
    if (updates.duration !== undefined) updateData.duration = updates.duration;
    if (updates.price !== undefined) updateData.price = updates.price;
    if (updates.isPopular !== undefined) updateData.is_popular = updates.isPopular;
    if (updates.showOnHome !== undefined) updateData.show_on_home = updates.showOnHome;

    const { error } = await supabase.from('courses').update(updateData).eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  const deleteCourse = async (id: string) => {
    const { error } = await supabase.from('courses').delete().eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  const toggleCoursePopular = async (id: string) => {
    const course = courses.find(c => c.id === id);
    if (course) {
      await updateCourse(id, { isPopular: !course.isPopular });
    }
  };

  const toggleCourseShowOnHome = async (id: string) => {
    const course = courses.find(c => c.id === id);
    if (course) {
      await updateCourse(id, { showOnHome: !course.showOnHome });
    }
  };

  const getCourseById = (id: string) => courses.find(c => c.id === id);
  const getCourseBySlug = (slug: string) => courses.find(c => c.slug === slug);

  const addBlogPost = async (post: Omit<BlogPost, 'id'>) => {
    const { error } = await supabase.from('blog_posts').insert({
      slug: post.slug,
      title_en: post.title.en,
      title_hi: post.title.hi,
      title_sa: post.title.sa,
      excerpt_en: post.excerpt.en,
      excerpt_hi: post.excerpt.hi,
      excerpt_sa: post.excerpt.sa,
      content_en: post.content?.en || '',
      content_hi: post.content?.hi || '',
      content_sa: post.content?.sa || '',
      thumbnail: post.thumbnail,
      category: post.category,
      author: post.author,
      date: post.date,
      show_on_home: post.showOnHome,
    });
    if (error) throw error;
    await fetchData();
  };

  const updateBlogPost = async (id: string, updates: Partial<BlogPost>) => {
    const updateData: Record<string, unknown> = {};
    if (updates.slug) updateData.slug = updates.slug;
    if (updates.title) {
      updateData.title_en = updates.title.en;
      updateData.title_hi = updates.title.hi;
      updateData.title_sa = updates.title.sa;
    }
    if (updates.excerpt) {
      updateData.excerpt_en = updates.excerpt.en;
      updateData.excerpt_hi = updates.excerpt.hi;
      updateData.excerpt_sa = updates.excerpt.sa;
    }
    if (updates.content) {
      updateData.content_en = updates.content.en;
      updateData.content_hi = updates.content.hi;
      updateData.content_sa = updates.content.sa;
    }
    if (updates.thumbnail) updateData.thumbnail = updates.thumbnail;
    if (updates.category) updateData.category = updates.category;
    if (updates.author) updateData.author = updates.author;
    if (updates.showOnHome !== undefined) updateData.show_on_home = updates.showOnHome;

    const { error } = await supabase.from('blog_posts').update(updateData).eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  const deleteBlogPost = async (id: string) => {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  const toggleBlogShowOnHome = async (id: string) => {
    const post = blogPosts.find(p => p.id === id);
    if (post) {
      await updateBlogPost(id, { showOnHome: !post.showOnHome });
    }
  };

  const getBlogPostById = (id: string) => blogPosts.find(p => p.id === id);
  const getBlogPostBySlug = (slug: string) => blogPosts.find(p => p.slug === slug);

  const addCourseCategory = async (category: { en: string; hi: string; sa: string }) => {
    const { error } = await supabase.from('course_categories').insert({
      name_en: category.en,
      name_hi: category.hi,
      name_sa: category.sa,
    });
    if (error) throw error;
    await fetchData();
  };

  const addBlogCategory = async (category: { en: string; hi: string; sa: string }) => {
    const { error } = await supabase.from('blog_categories').insert({
      name_en: category.en,
      name_hi: category.hi,
      name_sa: category.sa,
    });
    if (error) throw error;
    await fetchData();
  };

  const deleteCourseCategory = async (id: string) => {
    const { error } = await supabase.from('course_categories').delete().eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  const deleteBlogCategory = async (id: string) => {
    const { error } = await supabase.from('blog_categories').delete().eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  const updateNotificationPopup = async (popup: Partial<NotificationPopup>) => {
    if (!notificationPopup) return;
    
    const updateData: Record<string, unknown> = {};
    if (popup.title) {
      updateData.title_en = popup.title.en;
      updateData.title_hi = popup.title.hi;
      updateData.title_sa = popup.title.sa;
    }
    if (popup.message) {
      updateData.message_en = popup.message.en;
      updateData.message_hi = popup.message.hi;
      updateData.message_sa = popup.message.sa;
    }
    if (popup.imageUrl !== undefined) updateData.image_url = popup.imageUrl;
    if (popup.isEnabled !== undefined) updateData.is_enabled = popup.isEnabled;
    if (popup.showOnAllPages !== undefined) updateData.show_on_all_pages = popup.showOnAllPages;
    if (popup.startDate !== undefined) updateData.start_date = popup.startDate;
    if (popup.endDate !== undefined) updateData.end_date = popup.endDate;

    const { error } = await supabase.from('notification_popup').update(updateData).eq('id', notificationPopup.id);
    if (error) throw error;
    await fetchData();
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  return (
    <AdminContext.Provider
      value={{
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
        getCourseById,
        getCourseBySlug,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        toggleBlogShowOnHome,
        getBlogPostById,
        getBlogPostBySlug,
        addCourseCategory,
        addBlogCategory,
        deleteCourseCategory,
        deleteBlogCategory,
        updateNotificationPopup,
        uploadImage,
        refetch: fetchData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
