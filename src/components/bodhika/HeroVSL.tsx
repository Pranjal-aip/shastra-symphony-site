import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import videoThumbnail from '@/assets/bodhika/video-thumbnail.jpg';

const translations = {
  watchIntro: {
    en: 'Watch 3-min intro',
    hi: '3-मिनट का परिचय देखें',
    sa: '३-निमेषपरिचयं पश्यत'
  }
};

interface HeroVSLProps {
  className?: string;
}

const HeroVSL = ({ className = '' }: HeroVSLProps) => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${className}`}>
      {!isPlaying ? (
        <>
          <img 
            src={videoThumbnail} 
            alt="Course Introduction Video"
            className="w-full aspect-video object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Play Button with Pulse */}
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center group cursor-pointer"
          >
            <div className="relative">
              {/* Outer pulse ring */}
              <div className="absolute inset-0 bg-saffron rounded-full scale-150 opacity-20 animate-ping" />
              {/* Inner pulse ring */}
              <div className="absolute inset-0 bg-saffron rounded-full scale-125 opacity-30 animate-pulse" />
              {/* Main button */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-saffron to-maroon rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-saffron">
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </div>
            </div>
          </button>

          {/* Duration Badge */}
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium font-body">
            {t(translations.watchIntro)}
          </div>
          
          {/* Live Badge */}
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold font-body flex items-center gap-1.5">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIVE
          </div>
        </>
      ) : (
        <div className="aspect-video bg-black flex items-center justify-center relative">
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
  );
};

export default HeroVSL;
