import { cn } from "@/lib/utils";

interface IllustratedCardProps {
  image: string;
  title: string;
  description: string;
  className?: string;
  imagePosition?: "top" | "left" | "right";
  overlay?: boolean;
}

export const IllustratedCard = ({
  image,
  title,
  description,
  className,
  imagePosition = "top",
  overlay = false
}: IllustratedCardProps) => {
  if (imagePosition === "top") {
    return (
      <div className={cn(
        "group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
        className
      )}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/60 to-transparent" />
          )}
        </div>
        <div className="p-5">
          <h3 className="font-heading text-lg font-bold text-maroon mb-2">{title}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex",
      imagePosition === "right" && "flex-row-reverse",
      className
    )}>
      <div className="relative w-1/3 min-h-[200px] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex-1 p-6 flex flex-col justify-center">
        <h3 className="font-heading text-xl font-bold text-maroon mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
