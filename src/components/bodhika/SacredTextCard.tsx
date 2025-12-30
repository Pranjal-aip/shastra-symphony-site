import { cn } from "@/lib/utils";

interface SacredTextCardProps {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  className?: string;
}

export const SacredTextCard = ({
  image,
  title,
  subtitle,
  description,
  className
}: SacredTextCardProps) => {
  return (
    <div className={cn(
      "group relative bg-gradient-to-br from-cream to-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl",
      className
    )}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4QjAwMDAiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAtMThjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bS0xOCAxOGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')]" />
      </div>
      
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon/80 via-maroon/30 to-transparent" />
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <span className="text-saffron text-sm font-semibold uppercase tracking-wider">
            {subtitle}
          </span>
          <h3 className="font-heading text-2xl font-bold mt-1 drop-shadow-lg">
            {title}
          </h3>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative p-6">
        <p className="text-slate-700 leading-relaxed">{description}</p>
        
        {/* Decorative Element */}
        <div className="absolute -top-3 right-6 w-6 h-6 bg-saffron rounded-full shadow-lg" />
      </div>
    </div>
  );
};
