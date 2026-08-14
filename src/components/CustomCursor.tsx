import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if it's a touch device
    const touchQuery = window.matchMedia("(hover: none)");
    setIsTouchDevice(touchQuery.matches);
    
    if (touchQuery.matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Set initial coordinates and scale
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 1 });
    gsap.set(follower, { xPercent: -50, yPercent: -50, scale: 1 });

    // Use quickTo for high performance animation frames
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.08, ease: "power3.out" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.08, ease: "power3.out" });

    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.35, ease: "power2.out" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.35, ease: "power2.out" });

    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);

      if (!hasMoved) {
        hasMoved = true;
        gsap.to([cursor, follower], { opacity: 1, duration: 0.4 });
      }
    };

    const onMouseEnterWindow = () => {
      gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
    };

    const onMouseLeaveWindow = () => {
      gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnterWindow);
    document.addEventListener("mouseleave", onMouseLeaveWindow);

    // Bind event listeners for interactive hover effects
    let registeredElements: { element: Element; enter: () => void; leave: () => void }[] = [];

    const bindHoverEffects = () => {
      // Find all clickable/interactive elements
      const elements = document.querySelectorAll(
        'a, button, input, textarea, [role="button"], .link-line, .field'
      );

      const onMouseEnter = () => {
        // Dot gets smaller and shifts color slightly
        gsap.to(cursor, { scale: 0.6, backgroundColor: "var(--color-taupe)", duration: 0.25 });
        // Follower expands and shifts blending mode to create luxury invert effect
        gsap.to(follower, {
          scale: 1.6,
          borderColor: "var(--color-ivory)",
          borderWidth: "1.5px",
          backgroundColor: "rgba(245, 245, 240, 0.06)",
          mixBlendMode: "difference",
          duration: 0.25,
        });
      };

      const onMouseLeave = () => {
        gsap.to(cursor, { scale: 1, backgroundColor: "var(--color-ivory)", duration: 0.25 });
        gsap.to(follower, {
          scale: 1,
          borderColor: "rgba(245, 245, 240, 0.25)",
          borderWidth: "1px",
          backgroundColor: "transparent",
          mixBlendMode: "normal",
          duration: 0.25,
        });
      };

      elements.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
        registeredElements.push({ element: el, enter: onMouseEnter, leave: onMouseLeave });
      });
    };

    const unbindHoverEffects = () => {
      registeredElements.forEach(({ element, enter, leave }) => {
        element.removeEventListener("mouseenter", enter);
        element.removeEventListener("mouseleave", leave);
      });
      registeredElements = [];
    };

    // Initial binding
    bindHoverEffects();

    // Use MutationObserver to watch for dynamic DOM updates (like page transitions or form submissions)
    const observer = new MutationObserver(() => {
      unbindHoverEffects();
      bindHoverEffects();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      unbindHoverEffects();
      observer.disconnect();
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Central pointer dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-50 h-1.5 w-1.5 rounded-full bg-ivory opacity-0"
        style={{ mixBlendMode: "difference" }}
      />
      {/* Outer trailing ring */}
      <div
        ref={followerRef}
        className="pointer-events-none fixed top-0 left-0 z-50 h-8 w-8 rounded-full border border-ivory/25 opacity-0"
      />
    </>
  );
}
