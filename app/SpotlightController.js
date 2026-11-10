"use client";

import { useEffect } from "react";

const BLUE = { r: 18, g: 48, b: 120, a: 0.42 };
const WHITE = { r: 255, g: 255, b: 255, a: 0.18 };
const DEEP = { r: 10, g: 32, b: 85, a: 0.36 };

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function ease(t) {
  return t * t * (3 - 2 * t);
}

function mix(c1, c2, t) {
  return {
    r: Math.round(lerp(c1.r, c2.r, t)),
    g: Math.round(lerp(c1.g, c2.g, t)),
    b: Math.round(lerp(c1.b, c2.b, t)),
    a: lerp(c1.a, c2.a, t),
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

      // Slow wave across the page
      const wave = Math.sin(progress * Math.PI * 1.3);
      const t = ease((wave + 1) / 2);

      // Strong blue bias near the top / hero
      const topBias = Math.max(0, 1 - progress * 1.8);

      // Keep the middle from going too dark — boost alpha around the middle of the page
      const midBoost = 1 + Math.sin(progress * Math.PI) * 0.35;

      // Pair A: blue-leaning at top, eases toward white
      const pairA = mix(BLUE, WHITE, t * (1 - topBias * 0.5));
      // Pair B: deeper blue at top, eases toward white later
      const pairB = mix(DEEP, WHITE, t * 0.7 + (1 - topBias) * 0.2);

      const pairA2 = mix(DEEP, WHITE, t * 0.45 * (1 - topBias * 0.3));
      const pairB2 = mix(BLUE, WHITE, t * 0.8);

      const boost = (c) => ({
        ...c,
        a: Math.min(0.55, c.a * midBoost * (0.75 + topBias * 0.4)),
      });

      root.style.setProperty("--spot-1", toRgba(boost(pairA)));
      root.style.setProperty("--spot-2", toRgba(boost(pairB)));
      root.style.setProperty("--spot-3", toRgba(boost(pairA2)));
      root.style.setProperty("--spot-4", toRgba(boost(pairB2)));

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
