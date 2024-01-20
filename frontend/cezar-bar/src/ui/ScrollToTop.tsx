import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top if path changes
    if (location.pathname) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]); // Effect re-runs when path changes

  return null;
};

export default ScrollToTop;
