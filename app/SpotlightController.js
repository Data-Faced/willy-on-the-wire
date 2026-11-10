"use client";

import { useEffect } from "react";

const BLUE = { r: 16, g: 42, b: 110, a: 0.52 };
const WHITE = { r: 220, g: 230, b: 255, a: 0.10 };
const DEEP = { r: 8, g: 28, b: 78, a: 0.48 };

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

      const wave = Math.sin(progress * Math.PI * 1.2);
      const t = ease((wave + 1) / 2);

      const topBias = Math.max(0, 1 - progress * 1.6);
      const midBoost = 1 + Math.sin(progress * Math.PI) * 0.2;

      const pairA = mix(BLUE, WHITE, t * 0.35 * (1 - topBias * 0.4));
      const pairB = mix(DEEP, WHITE, t * 0.45);
      const pairA2 = mix(DEEP, BLUE, t * 0.3);
      const pairB2 = mix(BLUE, WHITE, t * 0.5);

      const boost = (c) => ({
        ...c,
        a: Math.min(0.62, c.a * midBoost * (0.85 + topBias * 0.25)),
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
