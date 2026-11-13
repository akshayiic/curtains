"use client";

import { motion } from "motion/react";
import { rating, reviews } from "@/lib/content";

function Stars() {
  return (
    <span className="flex gap-0.5 text-brass" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </span>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="overflow-hidden bg-ivory py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 md:flex-row md:items-end md:px-8">
        <div>
          <p className="text-xs tracking-[0.35em] text-fabric uppercase">Reviews</p>
          <h2 className="mt-4 font-serif text-4xl font-medium md:text-6xl">Loved across Melbourne.</h2>
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 rounded-2xl bg-linen px-6 py-4"
        >
          <span className="font-serif text-5xl font-semibold">{rating.score}</span>
          <div>
            <Stars />
            <p className="mt-1 text-xs text-taupe">Based on {rating.count} Google reviews</p>
          </div>
        </motion.div>
      </div>

      <div className="marquee-paused mt-14 space-y-5">
        {[0, 1].map((row) => (
          <div key={row} className="overflow-hidden">
            <div
              className="marquee flex w-max gap-5"
              style={{ "--duration": row ? "55s" : "45s", animationDirection: row ? "reverse" : "normal" } as React.CSSProperties}
            >
              {[...reviews, ...reviews].map((r, i) => (
                <figure key={i} className="w-[320px] shrink-0 rounded-2xl border border-sand bg-white/70 p-6 md:w-[380px]">
                  <Stars />
                  <blockquote className="mt-3 font-serif text-xl leading-snug">“{r}”</blockquote>
                  <figcaption className="mt-4 text-xs text-taupe">Summarised from Google reviews</figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
