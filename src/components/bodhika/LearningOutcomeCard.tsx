import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LearningOutcomeCardProps {
  icon: LucideIcon;
  image?: string;
  title: string;
  description: string;
  index: number;
  className?: string;
}

export const LearningOutcomeCard = ({
  icon: Icon,
  image,
  title,
  description,
  index,
  className
}: LearningOutcomeCardProps) => {
  return (
    <div 
      className={cn(
        "group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2",
        className
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Top Image or Gradient */}
      {image ? (
        <div className="relative h-40 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>
      ) : (
        <div className="h-3 bg-gradient-to-r from-saffron via-maroon to-saffron" />
      )}

      <div className="p-6">
        {/* Icon */}
        <div className="relative mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-saffron/20 to-maroon/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-7 h-7 text-maroon" />
          </div>
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-saffron text-white text-xs font-bold rounded-full flex items-center justify-center">
            {index + 1}
          </span>
        </div>

        {/* Content */}
        <h3 className="font-heading text-lg font-bold text-maroon mb-3 group-hover:text-saffron transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {description}
        </p>

        {/* Decorative Corner */}
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-saffron/10 to-transparent rounded-tl-full" />
      </div>
    </div>
  );
};
