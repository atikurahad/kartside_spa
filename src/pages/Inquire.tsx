import { motion } from "framer-motion";
import { InquiryForm } from "../components/InquiryForm";
import { fadeUp, stagger } from "../lib/motion";

export function Inquire() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 sm:py-32">
      <motion.div
        className="mb-16 flex max-w-lg flex-col items-center text-center sm:mb-20"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.span variants={fadeUp} className="hairline mb-12" />
        <motion.h1
          variants={fadeUp}
          className="font-serif text-[clamp(2.4rem,7vw,4.5rem)] font-normal tracking-[0.22em] text-ivory"
        >
          WELCOME
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-md font-sans text-sm font-light leading-8 tracking-[0.04em] text-ivory/60"
        >
          KORTSIDE accepts new relationships through referral.
        </motion.p>
      </motion.div>

      <div className="w-full">
        <InquiryForm />
      </div>
    </section>
  );
}
