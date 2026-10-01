"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

const DOT = "\u00b7";
const PAST_PREVIEW = 5;

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function showId(show) {
  return `${show.date}-${show.venue}`;
}

function showUrl(show) {
  const origin =
    typeof window === "undefined"
      ? "https://willyonthewire.com"
      : window.location.origin + window.location.pathname;
  return `${origin}#show-${show.date}`;
}

function shareText(show) {
  return `Willy on the Wire at ${show.venue} \u2014 ${show.label}. ${show.city}${show.time ? ` ${DOT} ${show.time}` : ""}`;
}

function Flyer({ show }) {
  if (show.flyer) {
    return (
      <img
        className="show-flyer-img"
        src={show.flyer}
        alt={`${show.venue} flyer`}
      />
    );
  }

  return (
    <div className="show-flyer">
      <img src="/wotw-logo-large.png" alt="Willy on the Wire" />
      <strong>{show.venue}</strong>
    </div>
  );
}

export default function ShowsList({ shows }) {
  const [view, setView] = useState("upcoming");
  const [open, setOpen] = useState(() => new Set());
  const [lightbox, setLightbox] = useState(null);
  const [showAllPast, setShowAllPast] = useState(false);
  const [mounted, setMounted] = useState(false);
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

  const displayed =
    view === "past" && !showAllPast ? visible.slice(0, PAST_PREVIEW) : visible;
  const canExpandPast = view === "past" && visible.length > PAST_PREVIEW && !showAllPast;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!lightbox) {
      return undefined;
    }

    function onKey(event) {
      if (event.key === "Escape") {
        setLightbox(null);
      }
    }

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  function changeView(next) {
    setView(next);
    setOpen(new Set());
    setLightbox(null);
    setShowAllPast(false);
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

  function onRowKeyDown(event, id) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle(id);
    }
  }

  function openFlyer(event, show) {
    event.preventDefault();
    event.stopPropagation();
    setLightbox(show);
  }

  async function shareShow(event, show) {
    event.preventDefault();
    event.stopPropagation();

    const url = showUrl(show);
    const text = shareText(show);

    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: `Willy on the Wire at ${show.venue}`,
          text,
          url,
        });
      } catch {
        /* user canceled */
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
    } catch {
      /* ignore */
    }
  }

  const overlay =
    mounted && lightbox ? (
      <div
        className="flyer-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={`${lightbox.venue} flyer`}
        onClick={() => setLightbox(null)}
      >
        <button
          type="button"
          className="flyer-lightbox-close"
          onClick={() => setLightbox(null)}
        >
          Close
        </button>
        <div
          className="flyer-lightbox-card"
          onClick={(event) => event.stopPropagation()}
        >
          <Flyer show={lightbox} />
        </div>
      </div>
    ) : null;

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
          Upcoming Shows
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === "past"}
          className={view === "past" ? "is-active" : ""}
          onClick={() => changeView("past")}
        >
          Past Shows
        </button>
      </div>

      <div className="shows-scroll">
        {visible.length === 0 ? (
          <p className="empty">
            {view === "upcoming"
              ? "Next shows will be posted here as they lock."
              : "Past dates will collect here as we play them."}
          </p>
        ) : (
          <>
            <ul className="shows" key={view}>
              {displayed.map((show, index) => {
                const id = showId(show);
                const pinned = index === 0;
                const featured = pinned || open.has(id);
                const extras = [show.doors, show.age].filter(Boolean).join(` ${DOT} `);

                return (
                  <li
                    key={id}
                    id={`show-${show.date}`}
                    className={`show-item${featured ? " is-featured" : ""}${pinned ? " is-pinned" : ""}`}
                    onClick={pinned ? undefined : () => toggle(id)}
                    onKeyDown={pinned ? undefined : (event) => onRowKeyDown(event, id)}
                    role={pinned ? undefined : "button"}
                    tabIndex={pinned ? undefined : 0}
                    aria-expanded={pinned ? undefined : featured}
                  >
                    <div className="show-copy">
                      <span className="show-date">{show.label}</span>
                      <span className="show-venue">{show.venue}</span>
                      {show.title ? <span className="show-title">{show.title}</span> : null}
                      <span className="show-meta">
                        {show.city}
                        {show.time ? ` ${DOT} ${show.time}` : ""}
                      </span>
                      {extras ? <span className="show-extra">{extras}</span> : null}
                      {show.blurb ? <p className="show-blurb">{show.blurb}</p> : null}
                      <div className="show-actions">
                        {!pinned ? (
                          <span className="show-toggle">
                            {featured ? "Less Info" : "More Info"}
                          </span>
                        ) : null}
                        <button
                          type="button"
                          className="show-toggle show-share"
                          tabIndex={featured ? 0 : -1}
                          onClick={(event) => shareShow(event, show)}
                        >
                          Share
                        </button>
                        {show.maps ? (
                          <a
                            className="show-toggle show-link"
                            href={show.maps}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => event.stopPropagation()}
                          >
                            Map
                          </a>
                        ) : null}
                        {show.instagram ? (
                          <a
                            className="show-toggle show-link"
                            href={show.instagram}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => event.stopPropagation()}
                          >
                            Instagram
                          </a>
                        ) : null}
                      </div>
                    </div>
                    {featured ? (
                      <button
                        type="button"
                        className="show-flyer-button"
                        onClick={(event) => openFlyer(event, show)}
                        aria-label={`View ${show.venue} flyer`}
                      >
                        <Flyer show={show} />
                      </button>
                    ) : (
                      <Flyer show={show} />
                    )}
                  </li>
                );
              })}
            </ul>
            {canExpandPast ? (
              <button
                type="button"
                className="show-more-past"
                onClick={() => setShowAllPast(true)}
              >
                All past shows
              </button>
            ) : null}
          </>
        )}
      </div>

      {overlay ? createPortal(overlay, document.body) : null}
    </>
  );
}
