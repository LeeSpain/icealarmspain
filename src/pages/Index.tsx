
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Dashboard from "@/components/Dashboard";
import DeviceShowcase from "@/components/DeviceShowcase";
import Pricing from "@/components/Pricing";
import ExpatInfo from "@/components/ExpatInfo";
import Footer from "@/components/Footer";
import { ArrowUpCircle } from "lucide-react";

const Index: React.FC = () => {
  console.log("Index component rendering");
  
  // Smooth scroll implementation
  useEffect(() => {
    console.log("Setting up smooth scroll");
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === "#") return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function (e) {});
      });
    };
  }, []);

  // Scroll to top button visibility
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  
  useEffect(() => {
    console.log("Setting up scroll to top");
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
  
  // Add effect for scrolling to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-ice-50/30 to-white">
      {/* Decorative Elements */}
      <div className="fixed top-0 right-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] bg-gradient-radial from-ice-100/60 to-transparent rounded-full filter blur-3xl opacity-60"></div>
        <div className="absolute top-[60%] left-[5%] w-[400px] h-[400px] bg-gradient-radial from-guardian-100/50 to-transparent rounded-full filter blur-3xl opacity-40"></div>
        <div className="absolute bottom-[10%] right-[15%] w-[350px] h-[350px] bg-gradient-radial from-ice-200/40 to-transparent rounded-full filter blur-3xl opacity-30"></div>
      </div>
      
      <Navbar />
      
      <main className="flex-grow relative">
        {/* Wrapping Hero in error boundary */}
        <div className="relative">
          <Hero />
        </div>
        
        {/* Section Divider */}
        <div className="relative">
          <div className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white/80 -top-16 z-10"></div>
        </div>
        
        <Dashboard />
        
        {/* Section Divider */}
        <div className="relative">
          <div className="absolute left-0 right-0 h-24 bg-gradient-to-b from-ice-50/50 to-white -top-24 z-10"></div>
        </div>
        
        <DeviceShowcase />
        
        <Pricing />
        
        {/* Section Divider */}
        <div className="relative">
          <div className="absolute left-0 right-0 h-16 bg-gradient-to-b from-white to-ice-50/30 -top-16 z-10"></div>
        </div>
        
        <ExpatInfo />
        
        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button 
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-white/90 p-2 rounded-full shadow-glass-lg backdrop-blur-sm border border-ice-200/50 text-ice-600 hover:text-ice-700 hover:bg-white transition-all duration-300 z-40"
            aria-label="Scroll to top"
          >
            <ArrowUpCircle className="w-8 h-8" />
          </button>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
