import type { Transition, Variants } from "framer-motion";

export const luxeEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeTransition: Transition = {
  duration: 0.9,
  ease: luxeEase,
};

export const pageTransition: Transition = {
  duration: 0.55,
  ease: luxeEase,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: fadeTransition,
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.12,
    },
  },
};
