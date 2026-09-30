"use client";

import { useMemo, useState } from "react";

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

export default function ShowsList({ shows }) {
  const [view, setView] = useState("upcoming");
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

  return (
    <>
      <div className="show-tabs" role="tablist" aria-label="Show dates">
        <button
          type="button"
          role="tab"
          aria-selected={view === "upcoming"}
          className={view === "upcoming" ? "is-active" : ""}
          onClick={() => setView("upcoming")}
        >
          Upcoming
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === "past"}
          className={view === "past" ? "is-active" : ""}
          onClick={() => setView("past")}
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
          {visible.map((show) => (
            <li key={`${show.date}-${show.venue}`}>
              <span className="show-date">{show.label}</span>
              <span className="show-venue">{show.venue}</span>
              <span className="show-meta">
                {show.city}
                {show.time ? ` \u00b7 ${show.time}` : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
