"use client";

import { useEffect } from "react";

const BLUE = { r: 18, g: 48, b: 120, a: 0.38 };
const WHITE = { r: 255, g: 255, b: 255, a: 0.12 };
const DEEP = { r: 10, g: 32, b: 85, a: 0.34 };

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
      const wave = Math.sin(progress * Math.PI * 1.4);
      const t = ease((wave + 1) / 2);

      // At the top (progress near 0) keep the lighting predominantly blue.
      // As the user scrolls, introduce alternating white/blue so they never all match.
      const topBias = Math.max(0, 1 - progress * 2.2); // strong blue bias in the hero
      const blueStrength = 0.55 + topBias * 0.45;

      // Pair A stays blue-leaning at the top, eases toward white later
      const pairA = mix(BLUE, WHITE, t * (1 - topBias * 0.6));
      // Pair B starts deeper blue at the top, then eases toward white
      const pairB = mix(DEEP, WHITE, t * 0.75 + (1 - topBias) * 0.25);

      // Secondary spots: one stays blue-dominant longer, one introduces white earlier
      const pairA2 = mix(DEEP, WHITE, t * 0.5 * (1 - topBias * 0.4));
      const pairB2 = mix(BLUE, WHITE, t * 0.9);

      // Boost blue alpha slightly while parked at the top
      const boost = (c) => ({
        ...c,
        a: Math.min(0.45, c.a * blueStrength),
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
