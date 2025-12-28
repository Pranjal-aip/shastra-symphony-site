import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage, translations } from '@/contexts/LanguageContext';
import { BlogPost } from '@/contexts/AdminContext';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const { t } = useLanguage();

  return (
    <article className="group bg-card rounded-2xl overflow-hidden shadow-card hover-lift border border-border/50">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={post.thumbnail || '/placeholder.svg'}
          alt={t(post.title)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground border-0">
          {post.category}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span className="font-body">{post.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span className="font-body">{post.date}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {t(post.title)}
        </h3>

        {/* Excerpt */}
        <p className="font-body text-muted-foreground text-sm line-clamp-3">
          {t(post.excerpt)}
        </p>

        {/* Read More */}
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary hover:text-accent transition-colors group/link"
        >
          {t(translations.sections.readMore)}
          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
