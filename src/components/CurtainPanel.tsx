"use client";

import { motion, type MotionValue, useTransform } from "motion/react";

type Props = {
  side: "left" | "right";
  /** 0 = fully closed, 1 = fully gathered open */
  open: MotionValue<number>;
  /** horizontal "breeze" sway in degrees */
  sway?: MotionValue<number>;
};

/**
 * A single velvet curtain panel. Opening gathers the fabric toward the outer
 * edge (scaleX) so the folds bunch up, while the inner bottom corner lifts like
 * a tie-back swag.
 */
export default function CurtainPanel({ side, open, sway }: Props) {
  const isLeft = side === "left";
  const scaleX = useTransform(open, [0, 1], [1, 0.14]);
  const lift = useTransform(open, [0, 0.15, 1], [0, 6, 46]);
  const clipPath = useTransform(lift, (l) =>
    isLeft
      ? `polygon(0% 0%, 100% 0%, 100% ${100 - l}%, ${l * 0.35}% 100%, 0% 100%)`
      : `polygon(0% 0%, 100% 0%, 100% 100%, ${100 - l * 0.35}% 100%, 0% ${100 - l}%)`,
  );
  const shade = useTransform(open, [0, 1], [0, 0.35]);
  const skewX = sway ?? 0;

  return (
    <motion.div
      className="absolute top-0 h-full w-[52%] will-change-transform"
      style={{
        [isLeft ? "left" : "right"]: 0,
        scaleX,
        transformOrigin: isLeft ? "0% 50%" : "100% 50%",
      }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ skewX, transformOrigin: "50% 0%" }}
      >
        <motion.div className="fabric absolute inset-0 shadow-2xl" style={{ clipPath }}>
          <div className="fabric-sheen absolute inset-0" />
          <motion.div className="absolute inset-0 bg-black" style={{ opacity: shade }} />
          {/* inner hem highlight */}
          <div
            className={`absolute top-0 h-full w-6 ${isLeft ? "right-0" : "left-0"}`}
            style={{
              background: `linear-gradient(${isLeft ? "270deg" : "90deg"}, rgba(0,0,0,.55), transparent)`,
            }}
          />
          {/* gold trim on the leading edge */}
          <div className={`brass absolute top-0 h-full w-[3px] opacity-70 ${isLeft ? "right-0" : "left-0"}`} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Valance() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30">
      <div className="brass h-3 w-full shadow-md" />
      <div className="valance h-16 w-full drop-shadow-xl md:h-20" />
    </div>
  );
}
