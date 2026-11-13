"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import CurtainPanel, { Valance } from "./CurtainPanel";
import { brand } from "@/lib/content";

/** Curtains draw closed as you reach the end, and the call-to-action appears on the fabric. */
export default function CurtainFinale() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rawOpen = useTransform(scrollYProgress, [0, 0.65], [1, 0], { clamp: true });
  const open = useSpring(rawOpen, { stiffness: 120, damping: 24 });
  const ctaOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const ctaScale = useTransform(scrollYProgress, [0.55, 0.85], [0.92, 1]);
  const roomText = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section ref={ref} id="quote" className="relative h-[260vh] bg-ink">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/plantation-shutters-melbourne.webp" alt="Plantation shutters in a bright room" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-ink/45" />
        <motion.div className="absolute inset-0 flex items-center justify-center px-6 text-center" style={{ opacity: roomText }}>
          <p className="font-serif text-4xl text-ivory md:text-6xl">
            Love the view.
            <br />
            <em className="text-brass-light">Own the light.</em>
          </p>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-20">
          <CurtainPanel side="left" open={open} />
          <CurtainPanel side="right" open={open} />
        </div>
        <Valance />

        <motion.div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center text-ivory"
          style={{ opacity: ctaOpacity, scale: ctaScale }}
        >
          <p className="text-xs tracking-[0.4em] text-brass-light uppercase">Free measure &amp; quote</p>
          <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-tight font-medium md:text-7xl">
            Ready to dress your windows?
          </h2>
          <p className="mt-5 max-w-xl text-ivory/75">
            Book a free, no-obligation in-home consultation anywhere across Melbourne.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="rounded-full bg-ivory px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-brass-light">
              Call {brand.phone}
            </a>
            <a href={`mailto:${brand.email}`} className="rounded-full border border-ivory/40 px-7 py-3.5 text-sm font-semibold transition hover:bg-white/10">
              Get Free Quote
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
