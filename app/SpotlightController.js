"use client";

import { useEffect } from "react";

export default function SpotlightController() {
  useEffect(() => {
    const root = document.documentElement;

    // Dark blue + white palette that matches the content
    const colors = [
      { a: "rgba(18, 48, 120, 0.32)", b: "rgba(255, 255, 255, 0.10)" }, // deep blue + white
      { a: "rgba(255, 255, 255, 0.16)", b: "rgba(30, 70, 150, 0.22)" }, // white + mid blue
      { a: "rgba(12, 36, 90, 0.28)", b: "rgba(255, 255, 255, 0.12)" }, // darker blue + white
    ];

    function update() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

      // 3 zones across the full page length
      const zone = progress * 3;
      const index = Math.min(Math.floor(zone), 2);
      const local = zone - index;

      // Soft crossfade near zone edges so the lights fade in/out
      const fade = 0.32;
      let mix = 0;
      if (local < fade) mix = local / fade;
      else if (local > 1 - fade) mix = (1 - local) / fade;
      else mix = 1;

      const current = colors[index];
      const next = colors[Math.min(index + 1, 2)];

      // Prefer the current set in the middle of the zone, blend toward next near the edge
      const active = mix > 0.4 ? current : next;

      root.style.setProperty("--spot-a", active.a);
      root.style.setProperty("--spot-b", active.b);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return null;
}
