"use client";

import { useEffect, useMemo, useState } from "react";

const DOT = "\u00b7";

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

function Flyer({ venue }) {
  return (
    <div className="show-flyer" aria-hidden="true">
      <span>Willy on the Wire</span>
      <strong>{venue}</strong>
    </div>
  );
}

function ShareMenu({ show, onClose }) {
  const [copied, setCopied] = useState("");
  const [canNative, setCanNative] = useState(false);
  const url = showUrl(show);
  const text = shareText(show);

  useEffect(() => {
    setCanNative(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  async function copy(label) {
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(label);
      window.setTimeout(() => setCopied(""), 1600);
    } catch {
      setCopied("error");
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({
        title: `Willy on the Wire at ${show.venue}`,
        text,
        url,
      });
      onClose();
    } catch {
      /* user canceled */
    }
  }

  return (
    <div className="share-menu" role="dialog" aria-label="Share this show">
      {canNative ? (
        <button type="button" onClick={nativeShare}>
          Device share
        </button>
      ) : null}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
      >
        Facebook
      </a>
      <button type="button" onClick={() => copy("instagram")}>
        {copied === "instagram" ? "Copied for Instagram" : "Instagram"}
      </button>
      <button type="button" onClick={() => copy("snapchat")}>
        {copied === "snapchat" ? "Copied for Snapchat" : "Snapchat"}
      </button>
      <a href={`sms:?&body=${encodeURIComponent(`${text}\n${url}`)}`}>Messages</a>
      <a
        href={`mailto:?subject=${encodeURIComponent(`Willy on the Wire at ${show.venue}`)}&body=${encodeURIComponent(`${text}\n${url}`)}`}
      >
        Email
      </a>
      <button type="button" onClick={() => copy("link")}>
        {copied === "link" ? "Link copied" : "Copy link"}
      </button>
    </div>
  );
}

export default function ShowsList({ shows }) {
  const [view, setView] = useState("upcoming");
  const [open, setOpen] = useState(() => new Set());
  const [sharing, setSharing] = useState("");
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
    setSharing("");
  }

  function toggle(id) {
    setSharing("");
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

  function onShareClick(event, id) {
    event.preventDefault();
    event.stopPropagation();
    setSharing((current) => (current === id ? "" : id));
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
                  <div className="show-actions">
                    {!pinned ? (
                      <span className="show-toggle">
                        {featured ? "Less Info" : "More Info"}
                      </span>
                    ) : null}
                    {featured ? (
                      <button
                        type="button"
                        className="show-toggle show-share"
                        aria-expanded={sharing === id}
                        onClick={(event) => onShareClick(event, id)}
                      >
                        Share
                      </button>
                    ) : null}
                  </div>
                  {featured && sharing === id ? (
                    <div
                      onClick={(event) => event.stopPropagation()}
                      onKeyDown={(event) => event.stopPropagation()}
                    >
                      <ShareMenu show={show} onClose={() => setSharing("")} />
                    </div>
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
