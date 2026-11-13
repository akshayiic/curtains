"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { collections, type Product } from "@/lib/content";

const items = collections.flatMap((c, ci) => c.items.map((p, i) => ({ ...p, group: c.title, tagline: c.tagline, first: i === 0, ci })));

export default function Collections() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(xRaw, { stiffness: 200, damping: 40, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [group, setGroup] = useState(collections[0].title);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const g = items[Math.min(items.length - 1, Math.floor(p * items.length))]?.group;
    if (g) setGroup(g);
  });

  return (
    <section ref={sectionRef} id="collections" className="relative bg-ink text-ivory" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-8 flex w-full max-w-7xl items-end justify-between gap-6 px-5 md:px-8">
          <div>
            <p className="text-xs tracking-[0.35em] text-brass-light uppercase">Our collections</p>
            <h2 className="mt-3 font-serif text-4xl font-medium md:text-6xl">Made to measure, made to last.</h2>
          </div>
          <div className="hidden text-right md:block">
            <p className="text-xs text-ivory/50 uppercase tracking-widest">Now viewing</p>
            <motion.p key={group} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-2xl text-brass-light">
              {group}
            </motion.p>
          </div>
        </div>

        <motion.div ref={trackRef} className="flex w-max gap-5 px-5 md:gap-7 md:px-8" style={{ x }}>
          {items.map((p) => (
            <div key={p.name} className="flex items-stretch gap-5 md:gap-7">
              {p.first && (
                <div className="flex w-[70vw] shrink-0 flex-col justify-end rounded-3xl border border-ivory/15 p-7 sm:w-[300px]">
                  <span className="font-serif text-7xl text-ivory/20">0{p.ci + 1}</span>
                  <p className="mt-4 font-serif text-3xl">{p.group}</p>
                  <p className="mt-2 text-sm text-ivory/60">{p.tagline}</p>
                </div>
              )}
              <TiltCard product={p} />
            </div>
          ))}
        </motion.div>

        <div className="mx-auto mt-10 w-full max-w-7xl px-5 md:px-8">
          <div className="h-px w-full bg-ivory/15">
            <motion.div className="brass h-px origin-left" style={{ scaleX: bar }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function TiltCard({ product }: { product: Product }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className="group relative h-[52vh] max-h-[520px] w-[72vw] shrink-0 overflow-hidden rounded-3xl bg-ink-soft sm:w-[360px]"
    >
      <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 72vw, 360px" className="object-cover transition duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      {/* roller-blind hover wipe */}
      <div className="linen-weave absolute inset-x-0 top-0 h-full origin-top scale-y-0 opacity-95 transition-transform duration-500 ease-out group-hover:scale-y-[0.18]" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="font-serif text-3xl">{product.name}</p>
        <p className="mt-1 max-h-0 overflow-hidden text-sm text-ivory/75 transition-all duration-500 group-hover:max-h-20">{product.blurb}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-brass-light uppercase">
          Explore <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </motion.div>
  );
}
