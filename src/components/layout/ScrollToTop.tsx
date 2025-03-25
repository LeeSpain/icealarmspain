
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ScrollToTop component scrolls to the top of the page on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only log in development to avoid cluttering the console in production
    if (import.meta.env.DEV) {
      console.log("ScrollToTop - Navigation detected:", pathname);
    }
    
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'auto' // Changed from 'smooth' to 'auto' to prevent animation delays
    });
  }, [pathname]);

  // This component doesn't render anything
  return null;
};

export default ScrollToTop;
