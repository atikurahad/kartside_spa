import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useMagnetic } from "../hooks/useMagnetic";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const magneticRef = useMagnetic<HTMLButtonElement>({ strength: 0.38, threshold: 90 });
  const title = "KORTSIDE";
  const subtitle = "PRIVATE EXECUTIVE SUPPORT";
  const tagline = "By referral only";


  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Animate KORTSIDE letters sliding up from hidden overflow container
      tl.fromTo(
        ".hero-char",
        { y: "115%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1.6,
          stagger: 0.08,
          ease: "power4.out",
        },
      );

      // Expand hairline line from center
      tl.fromTo(
        ".hero-hairline",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.4, ease: "power3.inOut" },
        "-=1.0",
      );

      // Fade up subtitle and taglines
      tl.fromTo(
        ".hero-fade-up",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, stagger: 0.16, ease: "power3.out" },
        "-=0.8",
      );

      // Fade up button
      tl.fromTo(
        ".hero-button",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
        "-=0.6",
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative flex h-dvh flex-col items-center justify-center px-6 overflow-hidden"
    >
      <div className="flex flex-col items-center text-center">
        <h1 className="max-w-full font-serif text-[clamp(2.2rem,11vw,7.2rem)] font-normal leading-none tracking-[0.16em] text-ivory select-none">
          <span className="reveal-wrapper pb-[0.08em]">
            {title.split("").map((char, index) => (
              <span
                key={index}
                className="hero-char reveal-inner inline-block"
                style={{ whiteSpace: char === " " ? "pre" : "normal" }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        {/* Small line underneath */}
        <span className="hero-hairline hairline mt-8 mb-8 origin-center" />

        <div className="flex flex-col items-center gap-4">
          <p className="hero-fade-up font-sans text-[10px] font-light uppercase tracking-[0.38em] text-ivory/70 sm:text-xs">
            {subtitle}
          </p>
          <p className="hero-fade-up font-sans text-[10px] font-light uppercase tracking-[0.38em] text-taupe sm:text-xs">
            {tagline}
          </p>
        </div>

        <div className="hero-button mt-20 sm:mt-24">
          <button
            ref={magneticRef}
            onClick={() => {
              document
                .getElementById("inquire")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="link-line cursor-pointer bg-transparent border-none p-0 font-sans text-[10px] font-light uppercase tracking-[0.42em] text-ivory transition-colors duration-500 hover:text-taupe focus-visible:outline-none"
          >
            INQUIRE
          </button>
        </div>
      </div>
    </section>
  );
}
