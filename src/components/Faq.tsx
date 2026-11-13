"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { faqs } from "@/lib/content";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-linen py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-xs tracking-[0.35em] text-fabric uppercase">FAQ</p>
          <h2 className="mt-4 font-serif text-4xl font-medium md:text-6xl">Questions, answered.</h2>
          <p className="mt-4 text-ink-soft">Still curious? Our team is happy to help with anything else.</p>
        </div>
        <div className="divide-y divide-sand border-y border-sand">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-serif text-2xl">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? "#7a2e3a" : "rgba(0,0,0,0)", color: isOpen ? "#f7f2ea" : "#1f1b16" }}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/20 text-xl"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pr-14 pb-6 text-ink-soft">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
