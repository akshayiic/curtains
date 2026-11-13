"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "motion/react";
import { stats } from "@/lib/content";

function Counter({ value, decimals, suffix }: { value: number; decimals: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 2, ease: [0.2, 0.7, 0.2, 1], onUpdate: setDisplay });
    return () => c.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      <span className="text-fabric">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative border-b border-sand/60 bg-ivory">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 py-16 md:grid-cols-4 md:px-8 md:py-20">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
            className={`px-4 text-center ${i > 0 ? "md:border-l md:border-sand" : ""}`}
          >
            <p className="font-serif text-5xl font-semibold text-ink md:text-6xl">
              <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-xs tracking-[0.2em] text-taupe uppercase">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
