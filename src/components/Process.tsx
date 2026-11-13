"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { partners, process } from "@/lib/content";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section id="process" className="bg-linen py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="text-center">
          <p className="text-xs tracking-[0.35em] text-fabric uppercase">How it works</p>
          <h2 className="mt-4 font-serif text-4xl font-medium md:text-6xl">Three simple steps.</h2>
        </div>

        <div ref={ref} className="relative mt-16">
          <div className="absolute top-0 bottom-0 left-6 w-px bg-sand md:left-1/2" />
          <motion.div className="absolute top-0 bottom-0 left-6 w-[2px] origin-top bg-fabric md:left-1/2" style={{ scaleY: line }} />

          <div className="space-y-16">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`relative grid items-center gap-6 pl-16 md:grid-cols-2 md:pl-0 ${i % 2 ? "md:[&>*:first-child]:col-start-2" : ""}`}
              >
                <div className={`${i % 2 ? "md:pl-16" : "md:pr-16 md:text-right"}`}>
                  <span className="font-serif text-6xl text-fabric/25">{p.step}</span>
                  <h3 className="font-serif text-3xl">{p.title}</h3>
                  <p className="mt-2 text-ink-soft">{p.text}</p>
                </div>
                <span className="absolute top-8 left-6 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full bg-fabric ring-8 ring-linen md:left-1/2">
                  <span className="h-1.5 w-1.5 rounded-full bg-ivory" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners marquee */}
      <div className="mt-24 border-y border-sand py-8">
        <p className="mb-6 text-center text-xs tracking-[0.35em] text-taupe uppercase">Trusted partners</p>
        <div className="marquee-paused overflow-hidden">
          <div className="marquee flex w-max gap-16" style={{ "--duration": "30s" } as React.CSSProperties}>
            {[...partners, ...partners].map((p, i) => (
              <span key={i} className="font-serif text-3xl whitespace-nowrap text-ink/40 transition hover:text-fabric md:text-4xl">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
