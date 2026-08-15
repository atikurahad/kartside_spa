import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MagneticOptions {
  strength?: number;      // Pull factor (0.1 - 0.5)
  threshold?: number;     // Distance threshold in px where magnetic pull starts
  duration?: number;      // Animation duration
  ease?: string;          // Animation ease curve
}

export function useMagnetic<T extends HTMLElement>(options: MagneticOptions = {}) {
  const ref = useRef<T>(null);
  const {
    strength = 0.35,
    threshold = 85,
    duration = 0.8,
    ease = "power3.out",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Use GSAP quickTo for highly efficient, frame-rate independent position changes
    const xTo = gsap.quickTo(el, "x", { duration, ease });
    const yTo = gsap.quickTo(el, "y", { duration, ease });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const bound = el.getBoundingClientRect();
      
      // Calculate coordinates relative to the center of the element
      const elCenterX = bound.left + bound.width / 2;
      const elCenterY = bound.top + bound.height / 2;
      
      const dx = clientX - elCenterX;
      const dy = clientY - elCenterY;
      
      const distance = Math.hypot(dx, dy);

      if (distance < threshold) {
        // Pull towards mouse. The closer, the stronger, up to the strength factor
        xTo(dx * strength);
        yTo(dy * strength);
      } else {
        // Return to origin once cursor goes out of range
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, threshold, duration, ease]);

  return ref;
}
