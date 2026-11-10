"use client";

import { useEffect } from "react";

export default function SpotlightController() {
  useEffect(() => {
    const root = document.documentElement;

    const colors = [
      { a: "rgba(255, 212, 0, 0.22)", b: "rgba(255, 255, 255, 0.08)" }, // yellow
      { a: "rgba(255, 255, 255, 0.18)", b: "rgba(192, 192, 192, 0.12)" }, // white / silver
      { a: "rgba(192, 192, 192, 0.16)", b: "rgba(255, 212, 0, 0.14)" }, // silver / yellow mix
    ];

    function update() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

      // 3 zones across the page, with soft crossfades near the boundaries
      const zone = progress * 3;
      const index = Math.min(Math.floor(zone), 2);
      const local = zone - index; // 0-1 within current zone

      // Fade window near edges of each zone for smooth light changes
      const fade = 0.28;
      let mix = 0;
      if (local < fade) mix = local / fade;
      else if (local > 1 - fade) mix = (1 - local) / fade;
      else mix = 1;

      const current = colors[index];
      const next = colors[Math.min(index + 1, 2)];

      const blend = (c1, c2, t) => {
        // simple opacity-style blend by interpolating alpha roughly via mix
        return t > 0.5 ? c1 : c2;
      };

      // Crossfade by setting both and letting CSS transition handle it,
      // or set a single active set. Here we set the active pair.
      const active = mix > 0.45 ? current : next;

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
