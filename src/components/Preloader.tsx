import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const title = "KORTSIDE";

  useEffect(() => {
    // Lock scrolling on html and body to ensure users cannot scroll during the preloader
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        // Unlock scroll
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        onComplete();
      },
    });

    // Set initial states
    gsap.set(".preloader-char", { y: "115%", opacity: 0 });
    gsap.set(lineRef.current, { scaleX: 0, opacity: 0 });
    gsap.set(progressRef.current, { y: 15, opacity: 0 });

    // 1. Reveal letters staggeredly
    tl.to(".preloader-char", {
      y: "0%",
      opacity: 1,
      duration: 1.2,
      stagger: 0.08,
      ease: "power4.out",
    });

    // 2. Expand separator hairline
    tl.to(
      lineRef.current,
      {
        scaleX: 1,
        opacity: 1,
        duration: 1.0,
        ease: "power3.inOut",
      },
      "-=0.6"
    );

    // 3. Fade in progress indicator
    tl.to(
      progressRef.current,
      {
        y: 0,
        opacity: 0.6,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // 4. Animate counter values to 100%
    const counter = { value: 0 };
    tl.to(
      counter,
      {
        value: 100,
        duration: 1.8,
        ease: "power1.inOut",
        onUpdate: () => {
          setProgress(Math.floor(counter.value));
        },
      },
      "-=0.2"
    );

    // 5. Outro - slide letters up
    tl.to(
      ".preloader-char",
      {
        y: "-115%",
        opacity: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: "power4.in",
      },
      "+=0.2"
    );

    // 6. Outro - shrink hairline and hide progress
    tl.to(
      [lineRef.current, progressRef.current],
      {
        scaleX: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.inOut",
      },
      "-=0.5"
    );

    // 7. Slide preloader container up out of the viewport
    tl.to(
      containerRef.current,
      {
        yPercent: -100,
        duration: 1.0,
        ease: "power4.inOut",
      },
      "-=0.2"
    );

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void text-ivory"
    >
      <div className="flex flex-col items-center text-center">
        <h2 className="font-serif text-[clamp(1.5rem,5vw,3rem)] font-light tracking-[0.24em] text-ivory select-none">
          <span className="reveal-wrapper pb-[0.08em]">
            {title.split("").map((char, index) => (
              <span
                key={index}
                className="preloader-char reveal-inner inline-block"
                style={{ whiteSpace: char === " " ? "pre" : "normal" }}
              >
                {char}
              </span>
            ))}
          </span>
        </h2>

        {/* Hairline Line */}
        <span
          ref={lineRef}
          className="hairline mt-6 mb-6 origin-center w-24 bg-ivory/30"
        />

        {/* Loading Progress */}
        <div ref={progressRef} className="h-4 overflow-hidden flex items-center justify-center">
          <span className="font-sans text-[9px] font-light uppercase tracking-[0.3em] text-taupe">
            {progress.toString().padStart(3, "0")}%
          </span>
        </div>
      </div>
    </div>
  );
}
