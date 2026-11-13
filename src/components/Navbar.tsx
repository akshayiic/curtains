"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { brand, nav } from "@/lib/content";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const hero = document.getElementById("top");
    const heroEnd = hero ? hero.offsetHeight - 90 : 600;
    setSolid(y > heroEnd);
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > heroEnd + 200 && y > prev && !menu);
  });

  const light = !solid;

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "bg-ivory/85 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8 ${solid ? "py-3" : "py-5 pt-8"}`}>
        <a href="#top" className={`flex items-center gap-2.5 ${light ? "text-ivory" : "text-ink"}`}>
          <span className="brass grid h-9 w-9 place-items-center rounded-full font-serif text-lg font-bold text-ink">A</span>
          <span className="leading-tight">
            <span className="block font-serif text-lg font-semibold">Australian Window</span>
            <span className="block text-[10px] tracking-[0.3em] uppercase opacity-70">Covering</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`group relative text-sm font-medium ${light ? "text-ivory/85 hover:text-ivory" : "text-ink-soft hover:text-ink"}`}
            >
              {n.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#quote"
            className={`hidden rounded-full px-5 py-2.5 text-sm font-semibold transition sm:inline-block ${
              light ? "bg-ivory text-ink hover:bg-brass-light" : "bg-fabric text-ivory hover:bg-ink"
            }`}
          >
            Free quote
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenu((m) => !m)}
            className={`grid h-10 w-10 place-items-center rounded-full lg:hidden ${light ? "text-ivory" : "text-ink"}`}
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-0.5 w-5 bg-current transition ${menu ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-current transition ${menu ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.nav
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.7, 0, 0.3, 1] }}
            className="fabric absolute inset-x-0 top-full flex flex-col gap-1 px-6 pt-4 pb-8 text-ivory lg:hidden"
          >
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMenu(false)} className="border-b border-white/10 py-3 font-serif text-2xl">
                {n.label}
              </a>
            ))}
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="mt-4 text-sm text-brass-light">
              Call {brand.phone}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
