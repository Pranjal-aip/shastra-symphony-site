import { Play } from "lucide-react";
import { useState } from "react";
import videoThumbnail from "@/assets/bodhika/video-thumbnail.jpg";

export const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-maroon via-maroon-dark to-maroon">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-saffron/20 text-saffron rounded-full text-sm font-semibold mb-4">
            Watch & Learn
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Discover the Bodhika Journey
          </h2>
          <p className="text-cream/80 text-lg max-w-2xl mx-auto">
            See how our live classes transform children's understanding of Sanatan Dharma
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            {!isPlaying ? (
              <>
                <img 
                  src={videoThumbnail} 
                  alt="Course Introduction Video"
                  className="w-full aspect-video object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                
                {/* Play Button */}
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative">
                    {/* Pulse Animation */}
                    <div className="absolute inset-0 bg-saffron rounded-full animate-ping opacity-25" />
                    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-saffron rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </button>

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  10:30
                </div>
              </>
            ) : (
              <div className="aspect-video bg-black flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Bodhika Course Introduction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            )}
          </div>

          {/* Video Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { icon: "🎯", text: "Course Overview" },
              { icon: "👨‍🏫", text: "Meet Teachers" },
              { icon: "📚", text: "Curriculum Peek" },
              { icon: "🌟", text: "Student Stories" }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
