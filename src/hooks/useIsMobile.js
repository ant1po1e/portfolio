import { useState, useEffect } from "react";

/**
 * Returns true when viewport width < 768px (Tailwind's `md` breakpoint).
 * Updates on resize.
 */
export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile;
}
