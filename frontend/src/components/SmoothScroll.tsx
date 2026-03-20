import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

const SmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 1.15,
      wheelMultiplier: 0.9,
    });

    lenisRef.current = lenis;

    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    const lenis = lenisRef.current;

    if (lenis) {
      lenis.stop();
      lenis.scrollTo(0, { immediate: true, force: true, lock: true });
      window.requestAnimationFrame(() => {
        lenis.scrollTo(0, { immediate: true, force: true, lock: true });
        lenis.start();
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname, location.key]);

  return null;
};

export default SmoothScroll;
