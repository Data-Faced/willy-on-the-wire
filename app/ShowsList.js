"use client";

import { useMemo, useState } from "react";

const DOT = "\u00b7";

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function showId(show) {
  return `${show.date}-${show.venue}`;
}

function Flyer({ venue }) {
  return (
    <div className="show-flyer" aria-hidden="true">
      <span>Willy on the Wire</span>
      <strong>{venue}</strong>
    </div>
  );
}

export default function ShowsList({ shows }) {
  const [view, setView] = useState("upcoming");
  const [open, setOpen] = useState(() => new Set());
  const today = todayStamp();

  const visible = useMemo(() => {
    const list =
      view === "upcoming"
        ? shows.filter((show) => show.date >= today)
        : shows.filter((show) => show.date < today);

    return [...list].sort((a, b) =>
      view === "upcoming"
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date)
    );
  }, [shows, view, today]);

  function changeView(next) {
    setView(next);
    setOpen(new Set());
  }

  function toggle(id) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <>
      <div className="show-tabs" role="tablist" aria-label="Show dates">
        <button
          type="button"
          role="tab"
          aria-selected={view === "upcoming"}
          className={view === "upcoming" ? "is-active" : ""}
          onClick={() => changeView("upcoming")}
        >
          Upcoming
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === "past"}
          className={view === "past" ? "is-active" : ""}
          onClick={() => changeView("past")}
        >
          Past
        </button>
      </div>

      {visible.length === 0 ? (
        <p className="empty">
          {view === "upcoming"
            ? "Next shows will be posted here as they lock."
            : "Past dates will collect here as we play them."}
        </p>
      ) : (
        <ul className="shows">
          {visible.map((show, index) => {
            const id = showId(show);
            const pinned = index === 0;
            const featured = pinned || open.has(id);
            const extras = [show.doors, show.age].filter(Boolean).join(` ${DOT} `);

            return (
              <li
                key={id}
                className={`show-item${featured ? " is-featured" : ""}${pinned ? " is-pinned" : ""}`}
              >
                <div className="show-copy">
                  <span className="show-date">{show.label}</span>
                  <span className="show-venue">{show.venue}</span>
                  <span className="show-meta">
                    {show.city}
                    {show.time ? ` ${DOT} ${show.time}` : ""}
                  </span>
                  {featured && extras ? (
                    <span className="show-extra">{extras}</span>
                  ) : null}
                  {featured && show.blurb ? (
                    <p className="show-blurb">{show.blurb}</p>
                  ) : null}
                  {!pinned ? (
                    <button
                      type="button"
                      className="show-toggle"
                      aria-expanded={featured}
                      onClick={() => toggle(id)}
                    >
                      {featured ? "Less Info" : "More Info"}
                    </button>
                  ) : null}
                </div>
                <Flyer venue={show.venue} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
