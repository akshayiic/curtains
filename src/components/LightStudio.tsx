"use client";

import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";

type Mode = "curtains" | "blinds" | "shutters";
type CurtainFabric = "sheer" | "blockout" | "double";
type BlindFabric = "filtering" | "blockout";

const swatches = [
  { name: "Merlot Velvet", base: "#7a2e3a", dark: "#4d1a24" },
  { name: "Natural Linen", base: "#cdbb9c", dark: "#9a8667" },
  { name: "Charcoal", base: "#4a4a4f", dark: "#26262a" },
  { name: "Sage", base: "#8a9a7b", dark: "#5c6a50" },
];

const modes: { id: Mode; label: string; hint: string }[] = [
  { id: "curtains", label: "Curtains", hint: "Drag to draw them closed" },
  { id: "blinds", label: "Roller Blinds", hint: "Drag to lower the blind" },
  { id: "shutters", label: "Shutters", hint: "Drag to tilt the louvres" },
];

const clamp = (v: number) => Math.max(0, Math.min(1, v));

export default function LightStudio() {
  const [mode, setMode] = useState<Mode>("curtains");
  const [amount, setAmount] = useState<Record<Mode, number>>({ curtains: 55, blinds: 45, shutters: 35 });
  const [curtainFabric, setCurtainFabric] = useState<CurtainFabric>("double");
  const [blindFabric, setBlindFabric] = useState<BlindFabric>("filtering");
  const [swatch, setSwatch] = useState(0);
  const [day, setDay] = useState(true);

  const v = amount[mode] / 100; // 0 = open, 1 = closed
  const sheerPrivacy = day ? 0.7 : 0.2;

  let light = 1;
  let privacy = 0;
  if (mode === "curtains") {
    if (curtainFabric === "sheer") {
      light = 1 - v + v * 0.6;
      privacy = v * sheerPrivacy;
    } else if (curtainFabric === "blockout") {
      light = 1 - v + v * 0.03;
      privacy = v;
    } else {
      light = (1 - v) * 0.6 + v * 0.03;
      privacy = v + (1 - v) * sheerPrivacy;
    }
  } else if (mode === "blinds") {
    const t = blindFabric === "filtering" ? 0.4 : 0.02;
    light = 1 - v + v * t;
    privacy = v * (blindFabric === "filtering" ? (day ? 0.8 : 0.4) : 1);
  } else {
    light = 0.03 + 0.97 * Math.pow(1 - v, 1.3);
    privacy = 0.25 + 0.75 * v;
  }
  light = clamp(light);
  privacy = clamp(privacy);
  const glare = clamp(1 - light * 0.95);
  const effectiveLight = day ? light : 0;

  const sw = swatches[swatch];
  const fabricVars = { "--fabric": sw.base, "--fabric-dark": sw.dark } as CSSProperties;

  const mood =
    !day
      ? privacy > 0.8
        ? "Cosy and completely private for the evening."
        : privacy > 0.4
          ? "Some silhouettes may show — try closing a little more."
          : "Neighbours can see in. Draw them closed for the night!"
      : light > 0.8
        ? "Bright and airy — full daylight pouring in."
        : light > 0.45
          ? "Soft, diffused light. Perfect for living spaces."
          : light > 0.12
            ? "Calm, glare-free ambience for TV or work."
            : "Near blackout — ideal for bedrooms and nurseries.";

  return (
    <section id="studio" className="relative overflow-hidden bg-linen py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs tracking-[0.35em] text-fabric uppercase">Interactive light studio</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight font-medium md:text-6xl">
            Play with light <em className="text-taupe">before</em> you buy.
          </h2>
          <p className="mt-4 text-ink-soft">
            Switch between curtains, roller blinds and plantation shutters, change fabrics and colours,
            and see how each one shapes the light, glare and privacy in your room — day or night.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.35fr_1fr]">
          {/* ---------------- Scene ---------------- */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5" style={fabricVars}>
            {/* wall */}
            <div
              className="absolute inset-0 transition-colors duration-700"
              style={{ background: day ? "linear-gradient(180deg,#efe6d8,#e3d6c2)" : "linear-gradient(180deg,#3a3430,#2a2522)" }}
            />
            {/* window */}
            <div className="absolute top-[12%] right-[20%] bottom-[30%] left-[20%] overflow-hidden rounded-sm border-[10px] border-[#faf7f2] shadow-inner">
              <Sky day={day} />
              {/* mullion */}
              <div className="absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 bg-[#faf7f2]" />
              <div className="absolute inset-x-0 top-[45%] h-2 bg-[#faf7f2]" />

              {/* blinds inside the frame */}
              <AnimatePresence>
                {mode === "blinds" && (
                  <motion.div key="blind" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="absolute inset-x-0 top-0 z-10 h-3 bg-[#f4efe7] shadow" />
                    <motion.div
                      className="absolute inset-x-0 top-0 origin-top"
                      animate={{ height: `${Math.max(3, v * 100)}%` }}
                      transition={{ type: "spring", stiffness: 160, damping: 22 }}
                      style={{
                        background: `repeating-linear-gradient(0deg, rgba(0,0,0,.05) 0 2px, transparent 2px 5px), linear-gradient(180deg, ${sw.base}, ${sw.dark})`,
                        opacity: blindFabric === "filtering" ? 0.78 : 1,
                      }}
                    >
                      <div className="absolute inset-x-0 bottom-0 h-2 bg-[#2b2620]" />
                      <div className="absolute bottom-[-14px] left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#2b2620]" />
                    </motion.div>
                  </motion.div>
                )}
                {mode === "shutters" && (
                  <motion.div key="shutter" className="absolute inset-0 flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {[0, 1].map((p) => (
                      <div key={p} className="relative flex h-full flex-1 flex-col justify-around border-4 border-white bg-transparent px-1 py-1 [perspective:400px]">
                        {Array.from({ length: 11 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="h-[8%] w-full rounded-[2px] bg-gradient-to-b from-white to-[#e6e1d8] shadow-[0_1px_2px_rgba(0,0,0,.25)]"
                            animate={{ rotateX: (1 - v) * 78 }}
                            transition={{ type: "spring", stiffness: 140, damping: 18, delay: i * 0.012 }}
                          />
                        ))}
                        <div className="absolute inset-y-2 left-1/2 w-[3px] -translate-x-1/2 bg-white/90" />
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* curtains in front of window */}
            <AnimatePresence>
              {mode === "curtains" && (
                <motion.div key="curtains" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* sheer layer */}
                  {curtainFabric !== "blockout" && (
                    <>
                      {[0, 1].map((s) => (
                        <motion.div
                          key={`sheer-${s}`}
                          className="absolute top-[8%] bottom-[24%]"
                          style={{
                            [s === 0 ? "left" : "right"]: "15%",
                            background:
                              "repeating-linear-gradient(90deg, rgba(255,255,255,.55) 0 8px, rgba(255,255,255,.3) 8px 18px)",
                            backdropFilter: "blur(1.5px)",
                          }}
                          animate={{
                            width: curtainFabric === "double" ? "35%" : `${8 + v * 27}%`,
                          }}
                          transition={{ type: "spring", stiffness: 120, damping: 20 }}
                        />
                      ))}
                    </>
                  )}
                  {/* main fabric layer */}
                  {curtainFabric !== "sheer" &&
                    [0, 1].map((s) => (
                      <motion.div
                        key={`main-${s}`}
                        className="fabric absolute top-[8%] bottom-[22%] shadow-xl"
                        style={{ [s === 0 ? "left" : "right"]: "13%" }}
                        animate={{ width: `${7 + v * 30}%` }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      />
                    ))}
                  {/* rod */}
                  <div className="brass absolute top-[7%] right-[11%] left-[11%] h-2 rounded-full shadow" />
                  <div className="brass absolute top-[6%] left-[10%] h-4 w-4 rounded-full" />
                  <div className="brass absolute top-[6%] right-[10%] h-4 w-4 rounded-full" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* floor */}
            <div className="absolute inset-x-0 bottom-0 h-[24%] transition-colors duration-700" style={{ background: day ? "linear-gradient(180deg,#b89a74,#9c7f5c)" : "linear-gradient(180deg,#3d3128,#2c231c)" }} />
            {/* sunlight patch on the floor */}
            <motion.div
              className="absolute inset-x-0 bottom-0 h-[24%] mix-blend-soft-light"
              style={{ clipPath: "polygon(22% 0, 78% 0, 95% 100%, 5% 100%)", background: "linear-gradient(180deg, #fff6d8, #ffe2a3)" }}
              animate={{ opacity: effectiveLight * 0.95 }}
            />
            {/* light shafts through the window */}
            <motion.div
              className="pointer-events-none absolute inset-0 mix-blend-screen"
              style={{ background: "linear-gradient(170deg, transparent 15%, rgba(255,236,190,.45) 45%, transparent 80%)" }}
              animate={{ opacity: effectiveLight * 0.8 }}
            />
            {/* sofa */}
            <div className="absolute bottom-[10%] left-1/2 h-[16%] w-[46%] -translate-x-1/2">
              <div className="absolute inset-x-[6%] top-0 h-[55%] rounded-t-2xl bg-[#5b6b73]" />
              <div className="absolute inset-x-0 bottom-0 h-[60%] rounded-2xl bg-[#6b7c85] shadow-xl" />
              <div className="absolute bottom-[38%] left-[16%] h-[34%] w-[16%] rotate-[-8deg] rounded-lg bg-[#d8c7ad]" />
            </div>
            {/* lamp (night) */}
            <motion.div className="absolute right-[6%] bottom-[22%] h-[44%] w-[8%]" animate={{ opacity: day ? 0.4 : 1 }}>
              <div className="absolute bottom-0 left-1/2 h-[80%] w-[3px] -translate-x-1/2 bg-[#2b2620]" />
              <div className="absolute top-0 left-0 h-[22%] w-full rounded-t-full bg-[#f2e3c4]" />
              {!day && <div className="absolute -top-[60%] -left-[200%] h-[200%] w-[500%] rounded-full bg-[radial-gradient(circle,rgba(255,214,140,.45),transparent_60%)]" />}
            </motion.div>
            {/* room darkness */}
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[#120d08]"
              animate={{ opacity: day ? (1 - light) * 0.55 : 0.25 }}
              transition={{ duration: 0.5 }}
            />

            {/* live readout chip */}
            <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-xs text-white backdrop-blur">
              <span className={`h-2 w-2 rounded-full ${day ? "bg-amber-300" : "bg-indigo-300"}`} />
              {day ? "Daytime" : "Night-time"} · {Math.round(effectiveLight * 100)}% daylight
            </div>
            <button
              type="button"
              onClick={() => setDay((d) => !d)}
              className="absolute top-4 right-4 rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-ink shadow backdrop-blur transition hover:bg-white"
            >
              {day ? "☾ Switch to night" : "☀ Switch to day"}
            </button>
          </div>

          {/* ---------------- Controls ---------------- */}
          <div className="rounded-3xl bg-ivory p-6 shadow-xl ring-1 ring-black/5 md:p-8">
            <div className="grid grid-cols-3 gap-1 rounded-full bg-linen p-1">
              {modes.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  className={`relative rounded-full px-2 py-2.5 text-xs font-semibold transition sm:text-sm ${mode === m.id ? "text-ivory" : "text-ink-soft hover:text-ink"}`}
                >
                  {mode === m.id && <motion.span layoutId="mode-pill" className="absolute inset-0 rounded-full bg-fabric" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                  <span className="relative">{m.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-8">
              <div className="flex items-baseline justify-between">
                <label htmlFor="amount" className="text-sm font-semibold">
                  {mode === "shutters" ? "Louvre tilt" : mode === "blinds" ? "Blind drop" : "Curtain closure"}
                </label>
                <span className="font-serif text-2xl">{amount[mode]}%</span>
              </div>
              <input
                id="amount"
                type="range"
                min={0}
                max={100}
                value={amount[mode]}
                onChange={(e) => setAmount((a) => ({ ...a, [mode]: Number(e.target.value) }))}
                className="range mt-3"
                style={{ "--fill": `${amount[mode]}%` } as CSSProperties}
              />
              <p className="mt-2 text-xs text-taupe">{modes.find((m) => m.id === mode)?.hint}</p>
            </div>

            <div className="mt-7">
              <p className="text-sm font-semibold">Fabric</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {mode === "curtains" &&
                  (["sheer", "blockout", "double"] as CurtainFabric[]).map((f) => (
                    <Chip key={f} active={curtainFabric === f} onClick={() => setCurtainFabric(f)}>
                      {f === "double" ? "Double (sheer + blockout)" : f[0].toUpperCase() + f.slice(1)}
                    </Chip>
                  ))}
                {mode === "blinds" &&
                  (["filtering", "blockout"] as BlindFabric[]).map((f) => (
                    <Chip key={f} active={blindFabric === f} onClick={() => setBlindFabric(f)}>
                      {f === "filtering" ? "Light filtering" : "Blockout"}
                    </Chip>
                  ))}
                {mode === "shutters" && <Chip active>Classic white · Aluminium / PVC / Timber</Chip>}
              </div>
            </div>

            {mode !== "shutters" && (
              <div className="mt-7">
                <p className="text-sm font-semibold">
                  Colour <span className="font-normal text-taupe">— {sw.name}</span>
                </p>
                <div className="mt-3 flex gap-3">
                  {swatches.map((s, i) => (
                    <button
                      key={s.name}
                      type="button"
                      aria-label={s.name}
                      onClick={() => setSwatch(i)}
                      className={`h-10 w-10 rounded-full transition ${swatch === i ? "scale-110 ring-2 ring-ink ring-offset-2 ring-offset-ivory" : "hover:scale-105"}`}
                      style={{ background: `linear-gradient(135deg, ${s.base}, ${s.dark})` }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 space-y-4 border-t border-sand pt-6">
              <Meter label="Natural light" value={effectiveLight} color="#d9a441" />
              <Meter label="Privacy" value={privacy} color="#7a2e3a" />
              <Meter label="Glare reduction" value={day ? glare : 1} color="#5c6a50" />
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={mood}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mt-6 rounded-2xl bg-linen px-4 py-3 font-serif text-lg italic text-ink-soft"
              >
                “{mood}”
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Sky({ day }: { day: boolean }) {
  return (
    <div className="absolute inset-0">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: day
            ? "linear-gradient(180deg, #8ec5ef 0%, #cfe8f7 70%, #f5ecd8 100%)"
            : "linear-gradient(180deg, #0b1330 0%, #1d2a55 70%, #3a3560 100%)",
        }}
        transition={{ duration: 0.8 }}
      />
      {/* sun / moon */}
      <motion.div
        className="absolute h-14 w-14 rounded-full"
        animate={
          day
            ? { top: "14%", left: "62%", background: "#ffe08a", boxShadow: "0 0 60px 20px rgba(255,220,120,.7)" }
            : { top: "12%", left: "22%", background: "#eef0ff", boxShadow: "0 0 30px 6px rgba(200,210,255,.4)" }
        }
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />
      {!day &&
        [12, 30, 48, 70, 85, 40, 60].map((x, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white"
            style={{ left: `${x}%`, top: `${8 + ((i * 17) % 40)}%` }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
          />
        ))}
      {/* hills & trees */}
      <svg className="absolute inset-x-0 bottom-0 h-[45%] w-full" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden>
        <path d="M0 70 Q80 30 160 60 T320 50 T400 60 V120 H0Z" fill={day ? "#9cc08a" : "#1f2b3a"} />
        <path d="M0 95 Q100 60 200 90 T400 80 V120 H0Z" fill={day ? "#6f9e63" : "#162030"} />
        <circle cx="70" cy="68" r="14" fill={day ? "#4f7d45" : "#121b28"} />
        <circle cx="330" cy="62" r="18" fill={day ? "#4f7d45" : "#121b28"} />
      </svg>
    </div>
  );
}

function Chip({ active, onClick, children }: { active?: boolean; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
        active ? "border-ink bg-ink text-ivory" : "border-sand text-ink-soft hover:border-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Meter({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs font-medium text-ink-soft">
        <span>{label}</span>
        <span>{Math.round(value * 100)}%</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-linen">
        <motion.div className="h-full rounded-full" style={{ background: color }} animate={{ width: `${value * 100}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
      </div>
    </div>
  );
}
