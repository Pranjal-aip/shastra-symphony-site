import React from 'react';
import Layout from '@/components/Layout';
import SectionHeader from '@/components/SectionHeader';
import BlogCard from '@/components/BlogCard';
import { sampleBlogPosts } from '@/data/sampleData';

const Blog: React.FC = () => {
  return (
    <Layout>
      <section className="py-12 bg-hero-pattern">
        <div className="container mx-auto px-4">
          <SectionHeader title="Wisdom Blog" subtitle="Insights, stories, and guidance for your spiritual journey." />
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleBlogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
