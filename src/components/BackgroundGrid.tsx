import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function BackgroundGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow1 = glow1Ref.current;
    const glow2 = glow2Ref.current;
    if (!glow1 || !glow2) return;

    // Set initial positions
    gsap.set(glow1, { x: 0, y: 0 });
    gsap.set(glow2, { x: 0, y: 0 });

    // Slow ambient floating loops
    const anim1 = gsap.to(glow1, {
      x: "+=80",
      y: "-=60",
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const anim2 = gsap.to(glow2, {
      x: "-=60",
      y: "+=80",
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Handle mouse move to add subtle parallax offset to ambient glows
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xOffset = (clientX / window.innerWidth - 0.5) * 35;
      const yOffset = (clientY / window.innerHeight - 0.5) * 35;

      gsap.to(glow1, {
        xOffset: xOffset * 0.6,
        yOffset: yOffset * 0.6,
        duration: 1.5,
        ease: "power2.out",
        // We update custom properties or apply directly to avoid overwriting the base animation timeline completely
        x: anim1.vars.x ? (anim1.targets()[0] as any)._gsap.x + xOffset * 0.1 : xOffset,
        y: anim1.vars.y ? (anim1.targets()[0] as any)._gsap.y + yOffset * 0.1 : yOffset,
        overwrite: "auto",
      });

      gsap.to(glow2, {
        x: anim2.vars.x ? (anim2.targets()[0] as any)._gsap.x - xOffset * 0.1 : -xOffset,
        y: anim2.vars.y ? (anim2.targets()[0] as any)._gsap.y - yOffset * 0.1 : -yOffset,
        duration: 1.8,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      anim1.kill();
      anim2.kill();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void"
    >
      {/* Fine Vertical Grid Lines */}
      <div className="absolute inset-0 flex justify-between px-6 md:px-12 opacity-[0.025]">
        <div className="h-full w-px bg-ivory" />
        <div className="hidden h-full w-px bg-ivory sm:block" />
        <div className="h-full w-px bg-ivory" />
        <div className="hidden h-full w-px bg-ivory sm:block" />
        <div className="h-full w-px bg-ivory" />
      </div>

      {/* Fine Horizontal Grid Lines */}
      <div className="absolute inset-0 flex flex-col justify-between py-24 opacity-[0.025]">
        <div className="h-px w-full bg-ivory" />
        <div className="h-px w-full bg-ivory" />
        <div className="h-px w-full bg-ivory" />
      </div>

      {/* Luxury Ambient Glows */}
      {/* Warm Taupe Glow */}
      <div
        ref={glow1Ref}
        className="absolute top-1/4 left-1/4 h-[55vw] w-[55vw] rounded-full bg-[radial-gradient(circle,rgba(163,158,147,0.045)_0%,rgba(0,0,0,0)_70%)] blur-[50px] will-change-transform"
      />
      {/* Slate Stone Glow */}
      <div
        ref={glow2Ref}
        className="absolute bottom-1/4 right-1/4 h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(circle,rgba(111,106,97,0.035)_0%,rgba(0,0,0,0)_70%)] blur-[60px] will-change-transform"
      />
    </div>
  );
}
