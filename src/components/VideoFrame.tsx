
import React, { useState } from "react";
import { X } from "lucide-react";

const VideoFrame: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 w-[90%] max-w-[800px] shadow-lg rounded-lg overflow-hidden border border-ice-200 bg-white">
      <div className="flex items-center justify-between bg-gradient-to-r from-ice-500 to-guardian-600 p-3">
        <div className="text-lg font-bold text-white">ICE Guardian Alert</div>
        <button 
          onClick={() => setIsVisible(false)} 
          className="text-white/80 hover:text-white transition-colors"
          aria-label="Close video"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="relative aspect-video w-full">
        <iframe
          src="https://www.youtube.com/embed/0UyaECF2LOQ?controls=1&rel=0&modestbranding=1"
          title="ICE Guardian Alert Demo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ maxWidth: "100%" }}
        ></iframe>
      </div>
    </div>
  );
};

export default VideoFrame;
