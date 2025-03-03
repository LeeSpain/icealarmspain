
import React, { useState, useEffect } from "react";
import { ArrowUpCircle } from "lucide-react";

const ScrollToTop: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  if (!showScrollTop) return null;
  
  return (
    <button 
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-white/90 p-2 rounded-full shadow-glass-lg backdrop-blur-sm border border-ice-200/50 text-ice-600 hover:text-ice-700 hover:bg-white transition-all duration-300 z-40"
      aria-label="Scroll to top"
    >
      <ArrowUpCircle className="w-8 h-8" />
    </button>
  );
};

export default ScrollToTop;
