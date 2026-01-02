import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage, translations } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Course } from '@/contexts/AdminContext';
import { toast } from '@/hooks/use-toast';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { t } = useLanguage();
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(course.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(course);
    toast({
      title: "Added to cart",
      description: `${t(course.title)} has been added to your cart.`,
    });
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      Kids: 'bg-green-100 text-green-700 border-green-200',
      Teens: 'bg-blue-100 text-blue-700 border-blue-200',
      Adults: 'bg-purple-100 text-purple-700 border-purple-200',
      Gurukul: 'bg-amber-100 text-amber-700 border-amber-200',
      'All Ages': 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return colors[level] || colors['All Ages'];
  };

  // All courses redirect to /bodhika page
  const courseLink = '/bodhika';

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover-lift border border-border/50">
      {/* Image - Clickable to course detail page or Bodhika landing */}
      <Link to={courseLink} className="block">
        <div className="relative aspect-[16/10] overflow-hidden cursor-pointer">
          <img
            src={course.thumbnail || '/placeholder.svg'}
            alt={t(course.title)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
          {course.isPopular && (
            <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground border-0">
              ⭐ Popular
            </Badge>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Category & Level */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs font-body">
            {course.category}
          </Badge>
          <Badge className={`text-xs font-body border ${getLevelColor(course.level)}`}>
            {course.level}
            {(course.ageMin || course.ageMax) && (
              <span className="ml-1">
                ({course.ageMin || '?'}-{course.ageMax || '?'} yrs)
              </span>
            )}
          </Badge>
        </div>

        {/* Title - Also clickable */}
        <Link to={courseLink}>
          <h3 className="font-heading text-xl font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
            {t(course.title)}
          </h3>
        </Link>

        {/* Description */}
        <p className="font-body text-muted-foreground text-sm line-clamp-2">
          {t(course.shortDescription)}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span className="font-body">{course.duration}</span>
          </div>
          {course.price && (
            <div className="flex items-center gap-1.5">
              <span className="font-body font-semibold text-primary">{course.price}</span>
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2 mt-2">
          <Link to={courseLink} className="flex-1">
            <Button
              variant="maroon-outline"
              className="w-full group/btn"
            >
              {t(translations.sections.viewDetails)}
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
          <Button
            variant={inCart ? "secondary" : "saffron"}
            size="icon"
            onClick={handleAddToCart}
            disabled={inCart}
            className="shrink-0"
          >
            {inCart ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
