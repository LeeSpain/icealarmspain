
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("ScrollToTop - Navigation detected:", pathname);
    
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Mark app as loaded after navigation
    if (window.appLoaded !== true) {
      window.appLoaded = true;
      
      // Remove loading indicators if they somehow still exist
      const loadingIndicator = document.querySelector('.loading-indicator');
      if (loadingIndicator) {
        loadingIndicator.remove();
      }
      
      const loadingText = document.querySelector('.loading-text');
      if (loadingText) {
        loadingText.remove();
      }
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
