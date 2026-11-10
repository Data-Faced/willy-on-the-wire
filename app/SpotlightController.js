"use client";

import { useEffect } from "react";

const BLUE = { r: 18, g: 48, b: 120, a: 0.32 };
const WHITE = { r: 255, g: 255, b: 255, a: 0.14 };
const DEEP = { r: 12, g: 36, b: 90, a: 0.28 };

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

      // Slow sine so colors ease across the full page (~3 gentle shifts)
      const wave = Math.sin(progress * Math.PI * 1.5); // -1 to 1
      const t = ease((wave + 1) / 2); // 0 to 1, eased

      // Pair A starts blue, fades toward white
      // Pair B starts white, fades toward blue
      // They are always opposite, so the background never goes all one color
      const pairA = mix(BLUE, WHITE, t);
      const pairB = mix(WHITE, DEEP, t);

      // Slight secondary variation so the four lights are not identical within a pair
      const pairA2 = mix(DEEP, WHITE, t * 0.85);
      const pairB2 = mix(WHITE, BLUE, t * 0.9);

      root.style.setProperty("--spot-1", toRgba(pairA));
      root.style.setProperty("--spot-2", toRgba(pairB));
      root.style.setProperty("--spot-3", toRgba(pairA2));
      root.style.setProperty("--spot-4", toRgba(pairB2));

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
