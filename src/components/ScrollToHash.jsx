import { useEffect } from "react";
import { useLocation } from "react-router";

function ScrollToHash() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      // If the URL contains a hash, scroll to that section.
      if (hash) {
        const id = decodeURIComponent(hash.slice(1));
        const element = document.getElementById(id);

        if (element) {
          element.scrollIntoView({
            behavior: "auto",
            block: "start",
          });

          return;
        }
      }

      // Normal page navigation = always start at the top.
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
}

export default ScrollToHash;