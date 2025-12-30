import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  name: string;
  location: string;
  quote: string;
  rating?: number;
  className?: string;
}

export const TestimonialCard = ({
  name,
  location,
  quote,
  rating = 5,
  className
}: TestimonialCardProps) => {
  return (
    <div className={cn(
      "relative bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl",
      className
    )}>
      {/* Quote Icon */}
      <div className="absolute -top-4 left-6">
        <div className="w-10 h-10 bg-gradient-to-br from-saffron to-maroon rounded-full flex items-center justify-center shadow-lg">
          <Quote className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4 pt-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-saffron fill-saffron" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-slate-700 leading-relaxed mb-6 italic">
        "{quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-saffron/30 to-maroon/30 rounded-full flex items-center justify-center">
          <span className="text-maroon font-bold text-lg">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <h4 className="font-semibold text-maroon">{name}</h4>
          <p className="text-sm text-slate-500">{location}</p>
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full text-maroon">
          <path
            fill="currentColor"
            d="M50 0c-5 15-20 25-35 30 15 5 30 15 35 30 5-15 20-25 35-30-15-5-30-15-35-30z"
          />
        </svg>
      </div>
    </div>
  );
};
