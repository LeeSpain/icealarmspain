import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    // Add a small delay to ensure DOM is ready before scrolling
    const scrollTimer = setTimeout(() => {
      // Always scroll to top when location changes
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      
      // If we have a hash in the URL (for anchor links), scroll to that element
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
      console.log("ScrollToTop - Navigation detected:", pathname);
    }, 100);
    
    return () => clearTimeout(scrollTimer);
  }, [pathname, hash, search]);

  // Add a global scroll handler for all link clicks
  useEffect(() => {
    const handleLinkClick = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };

    // Add event listener for all link clicks
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && !link.getAttribute('href')?.startsWith('#') && link.getAttribute('target') !== '_blank') {
        handleLinkClick();
      }
    });

    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  return null;
};

export default ScrollToTop;
