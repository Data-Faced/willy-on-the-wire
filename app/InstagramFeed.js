"use client";

import { useState } from "react";

export default function InstagramFeed({ reels }) {
  const [active, setActive] = useState(0);
  const current = reels[active];

  if (!current) {
    return null;
  }

  return (
    <div className="ig-player">
      <div className="ig-stage">
        <iframe
          key={current.id}
          src={`https://www.instagram.com/${current.path}/${current.id}/embed`}
          title={current.label}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
      <p className="video-caption">{current.label}</p>
      <div className="ig-thumbs" role="tablist" aria-label="Instagram reels">
        {reels.map((reel, index) => (
          <button
            key={reel.id}
            type="button"
            role="tab"
            aria-selected={index === active}
            className={index === active ? "is-active" : ""}
            onClick={() => setActive(index)}
          >
            <img
              src={`https://www.instagram.com/${reel.path}/${reel.id}/media/?size=m`}
              alt={reel.label}
            />
            <span>{reel.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
