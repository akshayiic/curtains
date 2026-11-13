"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import CurtainPanel, { Valance } from "./CurtainPanel";
import { brand, hero } from "@/lib/content";

export default function CurtainHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Scroll drives the opening; a gentle "peek" plays on first load.
  const scrollOpen = useTransform(scrollYProgress, [0.02, 0.6], [0, 1], { clamp: true });
  const peek = useMotionValue(0);
  const rawOpen = useTransform(() => Math.max(scrollOpen.get(), peek.get()));
  const open = useSpring(rawOpen, { stiffness: 120, damping: 24, mass: 0.6 });

  // Mouse "breeze" — curtains sway toward the cursor.
  const mouseX = useMotionValue(0);
  const swayRaw = useTransform(() => mouseX.get() * 3.5 * (1 - open.get()));
  const sway = useSpring(swayRaw, { stiffness: 60, damping: 8 });
  const swayRight = useTransform(sway, (v) => v * 0.85);

  useEffect(() => {
    const controls = animate(peek, [0, 0.12, 0.04], { duration: 2.4, delay: 0.5, ease: "easeInOut" });
    const onMove = (e: PointerEvent) => mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
    window.addEventListener("pointermove", onMove);
    return () => {
      controls.stop();
      window.removeEventListener("pointermove", onMove);
    };
  }, [peek, mouseX]);

  // Content reveal
  const introOpacity = useTransform(open, [0, 0.25], [1, 0]);
  const introY = useTransform(open, [0, 0.25], [0, -40]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.3, 0.65], [60, 0]);
  const beam = useTransform(scrollYProgress, [0.2, 0.7], [0, 0.55]);
  const dim = useTransform(scrollYProgress, [0, 0.6], [0.75, 0.5]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  const pullOpen = () => {
    const el = ref.current;
    if (!el) return;
    const target = el.offsetTop + (el.offsetHeight - window.innerHeight) * 0.75;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section ref={ref} id="top" className="relative h-[340vh] bg-ink">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Room behind the curtains */}
        <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
          <Image src={hero.image} alt="Custom blinds and curtains in a Melbourne living room" fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover" />
        </motion.div>
        <motion.div className="absolute inset-0 bg-ink" style={{ opacity: dim }} />
        {/* Sun beams pouring in */}
        <motion.div
          className="pointer-events-none absolute inset-0 mix-blend-screen"
          style={{
            opacity: beam,
            background:
              "conic-gradient(from 200deg at 50% -10%, transparent 0deg, rgba(255,226,170,.55) 12deg, transparent 22deg, rgba(255,226,170,.35) 34deg, transparent 46deg, rgba(255,226,170,.45) 58deg, transparent 72deg)",
          }}
        />

        {/* Revealed hero content */}
        <motion.div
          className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center text-ivory"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <span className="mb-5 rounded-full border border-ivory/30 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.25em] backdrop-blur">
            Melbourne · Made to measure · 20+ years
          </span>
          <h1 className="font-serif text-5xl leading-[1.02] font-medium sm:text-6xl md:text-7xl lg:text-8xl">
            Elegant <em className="text-brass-light">Shutters</em>, Blinds
            <br className="hidden md:block" /> &amp; Curtains for Modern Living
          </h1>
          <p className="mt-6 max-w-2xl text-base text-ivory/80 md:text-lg">{hero.subtitle}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#quote" className="rounded-full bg-ivory px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-brass-light">
              Get a free quote
            </a>
            <a href="#studio" className="rounded-full border border-ivory/40 px-7 py-3.5 text-sm font-semibold text-ivory backdrop-blur transition hover:bg-white/10">
              Try the light studio →
            </a>
          </div>
        </motion.div>

        {/* Curtains */}
        <div className="pointer-events-none absolute inset-0 z-20">
          <CurtainPanel side="left" open={open} sway={sway} />
          <CurtainPanel side="right" open={open} sway={swayRight} />
        </div>
        <Valance />

        {/* Intro copy printed over the closed curtains */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center text-ivory"
          style={{ opacity: introOpacity, y: introY }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-brass-light">Welcome to</p>
          <p className="mt-4 font-serif text-5xl font-semibold drop-shadow-lg md:text-7xl">{brand.name}</p>
          <p className="mt-4 text-sm text-ivory/70 md:text-base">Shutters · Blinds · Curtains — Melbourne</p>
        </motion.div>

        {/* Pull cord */}
        <motion.button
          type="button"
          aria-label="Pull the cord to open the curtains"
          onClick={pullOpen}
          className="group absolute top-0 right-[8%] z-40 flex cursor-pointer flex-col items-center md:right-[14%]"
          style={{ opacity: introOpacity }}
          whileHover={{ y: 14 }}
          whileTap={{ y: 40 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 120 }}
          dragElastic={0.2}
          dragSnapToOrigin
          onDragEnd={(_, info) => info.offset.y > 50 && pullOpen()}
        >
          <span className="brass block h-[46vh] w-[3px] rounded-full" />
          <span className="brass -mt-1 block h-10 w-6 rounded-b-full rounded-t-md shadow-lg" />
          <span className="mt-3 rounded-full bg-ink/60 px-3 py-1 text-[11px] font-medium tracking-wider text-ivory uppercase backdrop-blur transition group-hover:bg-ink">
            Pull me
          </span>
        </motion.button>

        {/* Scroll hint */}
        <motion.div className="absolute bottom-8 left-1/2 z-40 -translate-x-1/2 text-center text-ivory/80" style={{ opacity: hintOpacity }}>
          <p className="text-[11px] tracking-[0.3em] uppercase">Scroll to draw the curtains</p>
          <motion.div
            className="mx-auto mt-3 h-10 w-6 rounded-full border-2 border-ivory/60"
            aria-hidden
          >
            <motion.span
              className="mx-auto mt-2 block h-2 w-1 rounded-full bg-ivory"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
