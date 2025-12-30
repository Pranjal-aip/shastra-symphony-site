import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroGurukul from "@/assets/bodhika/hero-gurukul.jpg";
import heroSanskrit from "@/assets/bodhika/hero-sanskrit.jpg";
import heroCulture from "@/assets/bodhika/hero-culture.jpg";
import heroMeditation from "@/assets/bodhika/hero-meditation.jpg";

interface CarouselSlide {
  image: string;
  title: string;
  subtitle: string;
}

const slides: CarouselSlide[] = [
  {
    image: heroGurukul,
    title: "Traditional Gurukul Learning",
    subtitle: "Experience authentic education under guidance of learned teachers"
  },
  {
    image: heroSanskrit,
    title: "Learn Sanskrit",
    subtitle: "Master the divine language through engaging activities"
  },
  {
    image: heroCulture,
    title: "Celebrate Culture",
    subtitle: "Understand festivals, traditions and their deeper meanings"
  },
  {
    image: heroMeditation,
    title: "Inner Peace & Strength",
    subtitle: "Develop mindfulness, focus and emotional balance"
  }
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div 
            key={index}
            className="min-w-full h-full relative"
          >
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
              <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-2 drop-shadow-lg">
                {slide.title}
              </h3>
              <p className="text-lg md:text-xl text-white/90 drop-shadow-md">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm rounded-full h-12 w-12"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm rounded-full h-12 w-12"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? "bg-white w-8" 
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
