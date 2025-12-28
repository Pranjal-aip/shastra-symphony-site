import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Course } from '@/components/CourseCard';
import { BlogPost } from '@/components/BlogCard';
import { sampleCourses, sampleBlogPosts, courseCategories, blogCategories } from '@/data/sampleData';

interface AdminContextType {
  courses: Course[];
  blogPosts: BlogPost[];
  courseCategories: string[];
  blogCategories: string[];
  addCourse: (course: Course) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  toggleCoursePopular: (id: string) => void;
  getCourseById: (id: string) => Course | undefined;
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  getBlogPostById: (id: string) => BlogPost | undefined;
  addCourseCategory: (category: string) => void;
  addBlogCategory: (category: string) => void;
  deleteCourseCategory: (category: string) => void;
  deleteBlogCategory: (category: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(sampleCourses);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(sampleBlogPosts);
  const [courseCats, setCourseCats] = useState<string[]>(courseCategories);
  const [blogCats, setBlogCats] = useState<string[]>(blogCategories);

  const addCourse = (course: Course) => {
    setCourses((prev) => [...prev, course]);
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleCoursePopular = (id: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isPopular: !c.isPopular } : c))
    );
  };

  const getCourseById = (id: string) => {
    return courses.find((c) => c.id === id);
  };

  const addBlogPost = (post: BlogPost) => {
    setBlogPosts((prev) => [...prev, post]);
  };

  const updateBlogPost = (id: string, updates: Partial<BlogPost>) => {
    setBlogPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const getBlogPostById = (id: string) => {
    return blogPosts.find((p) => p.id === id);
  };

  const addCourseCategory = (category: string) => {
    if (!courseCats.includes(category)) {
      setCourseCats((prev) => [...prev, category]);
    }
  };

  const addBlogCategory = (category: string) => {
    if (!blogCats.includes(category)) {
      setBlogCats((prev) => [...prev, category]);
    }
  };

  const deleteCourseCategory = (category: string) => {
    setCourseCats((prev) => prev.filter((c) => c !== category));
  };

  const deleteBlogCategory = (category: string) => {
    setBlogCats((prev) => prev.filter((c) => c !== category));
  };

  return (
    <AdminContext.Provider
      value={{
        courses,
        blogPosts,
        courseCategories: courseCats,
        blogCategories: blogCats,
        addCourse,
        updateCourse,
        deleteCourse,
        toggleCoursePopular,
        getCourseById,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        getBlogPostById,
        addCourseCategory,
        addBlogCategory,
        deleteCourseCategory,
        deleteBlogCategory,
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
