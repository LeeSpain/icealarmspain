
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    // Always scroll to top when location changes
    window.scrollTo(0, 0);
    
    // If we have a hash in the URL (for anchor links), scroll to that element
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    console.log("ScrollToTop - Navigation detected:", pathname);
  }, [pathname, hash, search]);

  return null;
};

export default ScrollToTop;
