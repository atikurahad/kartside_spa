import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type SectionContent } from "../hooks/useContent";

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  data: SectionContent;
}

export function About({ data }: AboutProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      // Scroll trigger letters slide up for each title line
      tl.fromTo(
        ".about-char",
        { y: "115%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.4, stagger: 0.04, ease: "power4.out" }
      );

      // Paragraph text fade and rise
      tl.fromTo(
        ".about-text",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.9"
      );
    },
    { scope: containerRef }
  );

  // Split the title on newline so each line renders separately
  const titleLines = data.title.split("\n");

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative flex min-h-[70vh] flex-col items-center justify-center px-8 py-28 sm:py-36 overflow-hidden"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 sm:grid-cols-2 sm:gap-24 uppercase">
        {/* Left: Large italic serif title */}
        <div className="flex flex-col">
          <h2 className="font-serif italic text-[clamp(2.6rem,6.5vw,5.2rem)] font-normal leading-[1.12] tracking-[-0.01em] text-ivory select-none">
            {titleLines.map((line, lineIdx) => (
              <span key={lineIdx} className="reveal-wrapper block pb-[0.06em]">
                {line.split("").map((char, charIdx) => (
                  <span
                    key={charIdx}
                    className="about-char reveal-inner inline-block"
                    style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>

        {/* Right: Description paragraph */}
        <div className="flex flex-col justify-center">
          <p className="about-text font-sans text-[0.85rem] sm:text-[0.9rem] font-light leading-[2.0] tracking-[0.03em] text-ivory/55">
            {data.description}
          </p>
        </div>
      </div>
    </section>
  );
}
