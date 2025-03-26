
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ScrollToTop component scrolls to the top of the page on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediate scroll with no delay
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
