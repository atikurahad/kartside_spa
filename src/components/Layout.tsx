import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { pageTransition } from "../lib/motion";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { SmoothScroll } from "./SmoothScroll";
import { CustomCursor } from "./CustomCursor";
import { Preloader } from "./Preloader";
import { BackgroundGrid } from "./BackgroundGrid";

export function Layout() {
  const location = useLocation();
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  return (
    <div className="relative flex min-h-dvh flex-col bg-void text-ivory">
      <ScrollToTop />
      
      {/* Base Grid Layer */}
      <BackgroundGrid />

      {/* Elegant Intro Loading Screen */}
      <AnimatePresence>
        {!isIntroComplete && (
          <Preloader onComplete={() => setIsIntroComplete(true)} />
        )}
      </AnimatePresence>

      {/* Custom Cursor appears once load completes */}
      {isIntroComplete && <CustomCursor />}
      
      <div className="grain" aria-hidden="true" />
      
      <main className="relative z-10 flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          {isIntroComplete ? (
            <motion.div
              key={location.pathname}
              className="flex flex-1 flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={pageTransition}
            >
              <SmoothScroll>
                <Outlet />
              </SmoothScroll>
            </motion.div>
          ) : (
            <div className="flex flex-1 flex-col opacity-0" />
          )}
        </AnimatePresence>
      </main>
      
      {isIntroComplete && <Footer />}
    </div>
  );
}

