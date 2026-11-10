"use client";

import { useEffect } from "react";

// Dark blue + white stops. Each spotlight lerps through these independently.
const STOPS = [
  { r: 18, g: 48, b: 120, a: 0.32 },   // deep blue
  { r: 255, g: 255, b: 255, a: 0.14 }, // white
  { r: 12, g: 36, b: 90, a: 0.28 },    // darker blue
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function ease(t) {
  // smoothstep
  return t * t * (3 - 2 * t);
}

function colorAt(progress) {
  // Map 0-1 progress across the 3 stops (2 intervals)
  const scaled = Math.min(Math.max(progress, 0), 1) * (STOPS.length - 1);
  const i = Math.min(Math.floor(scaled), STOPS.length - 2);
  const local = ease(scaled - i);
  const c1 = STOPS[i];
  const c2 = STOPS[i + 1];
  return {
    r: Math.round(lerp(c1.r, c2.r, local)),
    g: Math.round(lerp(c1.g, c2.g, local)),
    b: Math.round(lerp(c1.b, c2.b, local)),
    a: lerp(c1.a, c2.a, local),
  };
}

function toRgba(c) {
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a.toFixed(3)})`;
}

export default function SpotlightController() {
  useEffect(() => {
    const root = document.documentElement;
    let ticking = false;

    function update() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

      // Four independent spotlights, each offset so they fade to new colors at different times
      const offsets = [0, 0.12, 0.24, 0.08];
      const names = ["--spot-1", "--spot-2", "--spot-3", "--spot-4"];

      names.forEach((name, idx) => {
        const p = (progress + offsets[idx]) % 1;
        // Stretch so the full cycle still covers the page with only ~3 color shifts
        const stretched = Math.min(p * 0.92 + 0.04, 1);
        root.style.setProperty(name, toRgba(colorAt(stretched)));
      });

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
