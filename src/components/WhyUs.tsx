"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { whyUs } from "@/lib/content";

const icons = [
  <path key="a" d="M12 3v18M3 12h18" />,
  <path key="b" d="M4 20h16M6 20V8l6-4 6 4v12" />,
  <path key="c" d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />,
  <path key="d" d="M3 21l6-6m0 0l9-9 3 3-9 9m-3-3l3 3" />,
];

export default function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "center 45%"] });
  // A roller blind rolls up to reveal the photo.
  const blind = useTransform(scrollYProgress, [0, 1], [1, 0.06]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const barY = useTransform(blind, (b) => `${b * 100}%`);

  return (
    <section id="why" className="bg-ivory py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        <div ref={ref} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl">
          <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
            <Image src="/images/roller-blinds-melbourne.webp" alt="Roller blinds in a Melbourne home" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </motion.div>
          <motion.div className="linen-weave absolute inset-x-0 top-0 h-full origin-top shadow-xl" style={{ scaleY: blind }} />
          <motion.div className="absolute inset-x-0 top-0 h-3 bg-[#2b2620] shadow-lg" style={{ y: barY }} />
          <div className="absolute inset-x-0 top-0 h-5 bg-[#f4efe7] shadow-md" />
          <div className="absolute bottom-6 left-6 rounded-2xl bg-ivory/90 px-5 py-4 backdrop-blur">
            <p className="font-serif text-4xl font-semibold">20+</p>
            <p className="text-xs tracking-widest text-taupe uppercase">Years of craft</p>
          </div>
        </div>

        <div>
          <p className="text-xs tracking-[0.35em] text-fabric uppercase">Why choose us</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight font-medium md:text-6xl">
            Premium coverings, <em className="text-taupe">personally</em> fitted.
          </h2>
          <p className="mt-5 max-w-lg text-ink-soft">
            From the first free consultation to the final adjustment, one local team looks after your
            windows — with fabrics and hardware from brands we trust.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {whyUs.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-sand bg-white/60 p-6 transition-shadow hover:shadow-xl"
              >
                <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-fabric" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {icons[i]}
                </svg>
                <p className="mt-4 font-serif text-2xl">{w.title}</p>
                <p className="mt-2 text-sm text-ink-soft">{w.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
