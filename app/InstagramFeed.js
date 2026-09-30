"use client";

import { useEffect } from "react";

export default function InstagramFeed({ reels }) {
  useEffect(() => {
    function process() {
      if (window.instgrm?.Embeds) {
        window.instgrm.Embeds.process();
      }
    }

    if (window.instgrm?.Embeds) {
      process();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = process;
    document.body.appendChild(script);
  }, [reels]);

  return (
    <div className="ig-grid">
      {reels.map((reel) => (
        <blockquote
          key={reel.id}
          className="instagram-media"
          data-instgrm-permalink={`https://www.instagram.com/${reel.path}/${reel.id}/`}
          data-instgrm-version="14"
        >
          <a href={`https://www.instagram.com/${reel.path}/${reel.id}/`}>
            {reel.label}
          </a>
        </blockquote>
      ))}
    </div>
  );
}
