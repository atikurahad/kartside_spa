import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InquiryForm } from "./InquiryForm";
import { type SectionContent } from "../hooks/useContent";

gsap.registerPlugin(ScrollTrigger);

interface InquireSectionProps {
  data: SectionContent;
}

export function InquireSection({ data }: InquireSectionProps) {
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

      // Hairline expands from center
      tl.fromTo(
        ".inquire-hairline",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.2, ease: "power3.inOut" }
      );

      // Title letters reveal
      tl.fromTo(
        ".inquire-char",
        { y: "115%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.4, stagger: 0.04, ease: "power4.out" },
        "-=0.9"
      );

      // Description fades and rises
      tl.fromTo(
        ".inquire-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.9"
      );

      // Staggered reveal for form inputs inside InquiryForm
      tl.fromTo(
        ".form-field",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, stagger: 0.12, ease: "power3.out" },
        "-=0.7"
      );

      // Submit button fade-in
      tl.fromTo(
        ".form-button-container",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
        "-=0.6"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="inquire"
      ref={containerRef}
      className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-32 sm:py-40 overflow-hidden"
    >
      <div className="mx-auto mb-16 flex max-w-lg flex-col items-center text-center sm:mb-20">
        <span className="inquire-hairline hairline mb-14 origin-center" />
        <h2 className="font-serif text-[clamp(1.6rem,6vw,3.75rem)] font-normal tracking-[0.22em] text-ivory select-none">
          <span className="reveal-wrapper pb-[0.1em]">
            {data.title.split("").map((char, index) => (
              <span
                key={index}
                className="inquire-char reveal-inner inline-block"
                style={{ whiteSpace: char === " " ? "pre" : "normal" }}
              >
                {char}
              </span>
            ))}
          </span>
        </h2>
        <p className="inquire-desc mt-10 max-w-md font-sans text-xs font-light leading-8 tracking-[0.06em] text-ivory/60 sm:text-sm">
          {data.description}
        </p>
      </div>

      <div className="w-full">
        <InquiryForm />
      </div>
    </section>
  );
}
