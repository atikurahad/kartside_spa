import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const title = "SELECTIVE BY DESIGN";
  const description =
    "KORTSIDE operates by referral and maintains a deliberately limited client roster, allowing for a highly personalized and discreet level of support.";

  const titleLines = title.split("\n");

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

      // Animate separator line
      tl.fromTo(
        ".about-separator",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: "power3.inOut" }
      );

      // Scroll trigger lines reveal
      tl.fromTo(
        ".about-title-line",
        { y: "115%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.4, stagger: 0.18, ease: "power4.out" },
        "-=1.0"
      );

      // Paragraph text fade and rise
      tl.fromTo(
        ".about-text",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.9"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-32 sm:py-40 md:py-48 overflow-hidden"
    >
      <div className="mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center max-w-5xl w-full">
        {/* Left Column: Heading */}
        <div className="md:col-span-5 text-left flex flex-col justify-center">
          <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-normal leading-[1.08] tracking-[0.06em] text-ivory select-none">
            {titleLines.map((line, index) => (
              <span key={index} className="reveal-wrapper block pb-[0.08em]">
                <span className="about-title-line reveal-inner inline-block">
                  {line}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* Separator */}
        <div className="flex md:col-span-2 justify-center items-center py-4 md:py-0">
          <div className="about-separator w-12 h-px md:w-px md:h-28 bg-ivory/15 origin-left md:origin-top" />
        </div>

        {/* Right Column: Description */}
        <div className="md:col-span-5 text-left flex items-center">
          <p className="about-text font-sans text-[0.88rem] md:text-[0.92rem] font-light leading-[1.9] tracking-[0.05em] text-ivory/60">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
