"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

const DOT = "\u00b7";
const PAST_STEP = 8;
const FLYER_TONES = ["tone-red", "tone-blue", "tone-green"];

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function showId(show) {
  return `${show.date}-${show.venue}`;
}

function flyerTone(show) {
  const key = showId(show);
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash + key.charCodeAt(i) * (i + 1)) % 997;
  }
  return FLYER_TONES[hash % FLYER_TONES.length];
}

function showUrl(show) {
  const origin =
    typeof window === "undefined"
      ? "https://willyonthewire.com"
      : window.location.origin + window.location.pathname;
  return `${origin}#show-${show.date}`;
}


function toHour(hour, minutes, ampm) {
  let value = Number(hour);
  const mins = Number(minutes || 0);
  const mark = ampm.toUpperCase();
  if (mark === "PM" && value !== 12) value += 12;
  if (mark === "AM" && value === 12) value = 0;
  return { hour: value, minutes: mins };
}

function stamp(date, hour, minutes) {
  const [year, month, day] = date.split("-").map(Number);
  const next = new Date(Date.UTC(year, month - 1, day, hour, minutes));
  const pad = (part) => String(part).padStart(2, "0");
  return `${next.getUTCFullYear()}${pad(next.getUTCMonth() + 1)}${pad(next.getUTCDate())}T${pad(next.getUTCHours())}${pad(next.getUTCMinutes())}00`;
}

function calendarEvent(show) {
  const title = show.title
    ? `Willy on the Wire: ${show.title}`
    : `Willy on the Wire at ${show.venue}`;
  const location = [show.venue, show.city].filter(Boolean).join(", ");
  const description = [show.blurb, "https://willyonthewire.com"].filter(Boolean).join("\n");
  const match = String(show.time || "").match(
    /^(\d{1,2})(?::(\d{2}))?(AM|PM)-(\d{1,2})(?::(\d{2}))?(AM|PM)$/i
  );

  let start;
  let end;
  let allDay = false;

  if (match) {
    const open = toHour(match[1], match[2], match[3]);
    const close = toHour(match[4], match[5], match[6]);
    start = stamp(show.date, open.hour, open.minutes);
    const endDate = new Date(`${show.date}T00:00:00`);
    if (close.hour < open.hour || (close.hour === open.hour && close.minutes <= open.minutes)) {
      endDate.setDate(endDate.getDate() + 1);
    }
    const next = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;
    end = stamp(next, close.hour, close.minutes);
  } else {
    allDay = true;
    start = show.date.replace(/-/g, "");
    const endDate = new Date(`${show.date}T00:00:00`);
    endDate.setDate(endDate.getDate() + 1);
    end = `${endDate.getFullYear()}${String(endDate.getMonth() + 1).padStart(2, "0")}${String(endDate.getDate()).padStart(2, "0")}`;
  }

  const uid = `${show.date}-${show.venue}`.replace(/\s+/g, "-") + "@willyonthewire.com";
  const now = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Willy on the Wire//Shows//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    allDay ? `DTSTART;VALUE=DATE:${start}` : `DTSTART;TZID=America/Denver:${start}`,
    allDay ? `DTEND;VALUE=DATE:${end}` : `DTEND;TZID=America/Denver:${end}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

function calendarDetails(show) {
  const title = show.title
    ? `Willy on the Wire: ${show.title}`
    : `Willy on the Wire at ${show.venue}`;
  const location = [show.venue, show.city].filter(Boolean).join(", ");
  const description = [show.blurb, "https://willyonthewire.com"].filter(Boolean).join("\n");
  const match = String(show.time || "").match(
    /^(\d{1,2})(?::(\d{2}))?(AM|PM)-(\d{1,2})(?::(\d{2}))?(AM|PM)$/i
  );

  if (!match) {
    const start = show.date.replace(/-/g, "");
    const endDate = new Date(`${show.date}T00:00:00`);
    endDate.setDate(endDate.getDate() + 1);
    const end = `${endDate.getFullYear()}${String(endDate.getMonth() + 1).padStart(2, "0")}${String(endDate.getDate()).padStart(2, "0")}`;
    return { title, location, description, start, end, allDay: true };
  }

  const open = toHour(match[1], match[2], match[3]);
  const close = toHour(match[4], match[5], match[6]);
  const start = stamp(show.date, open.hour, open.minutes);
  const endDate = new Date(`${show.date}T00:00:00`);
  if (close.hour < open.hour || (close.hour === open.hour && close.minutes <= open.minutes)) {
    endDate.setDate(endDate.getDate() + 1);
  }
  const next = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;
  const end = stamp(next, close.hour, close.minutes);
  return { title, location, description, start, end, allDay: false };
}

function googleCalendarUrl(show) {
  const event = calendarDetails(show);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${event.start}/${event.end}`,
    details: event.description,
    location: event.location,
    ctz: "America/Denver",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function outlookCalendarUrl(show) {
  const event = calendarDetails(show);
  const toIso = (value, allDay) => {
    if (allDay) {
      return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
    }
    return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}T${value.slice(9, 11)}:${value.slice(11, 13)}:00`;
  };
  const params = new URLSearchParams({
    rru: "addevent",
    subject: event.title,
    startdt: toIso(event.start, event.allDay),
    enddt: toIso(event.end, event.allDay),
    body: event.description,
    location: event.location,
    allday: event.allDay ? "true" : "false",
  });
  return `https://outlook.live.com/calendar/0/action/compose?${params.toString()}`;
}

function yahooCalendarUrl(show) {
  const event = calendarDetails(show);
  const params = new URLSearchParams({
    v: "60",
    title: event.title,
    st: event.start,
    et: event.end,
    desc: event.description,
    in_loc: event.location,
  });
  return `https://calendar.yahoo.com/?${params.toString()}`;
}

function downloadCalendar(event, show) {
  event.preventDefault();
  event.stopPropagation();
  const file = new Blob([calendarEvent(show)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = `willy-on-the-wire-${show.date}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
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
    <div className={`show-flyer ${flyerTone(show)}`}>
      <img src="/wotw-logo-large.png" alt="Willy on the Wire" />
      <strong>{show.venue}</strong>
    </div>
  );
}

export default function ShowsList({ shows }) {
  const [view, setView] = useState("upcoming");
  const [openId, setOpenId] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [calendarId, setCalendarId] = useState(null);
  const [pastCount, setPastCount] = useState(PAST_STEP);
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

  const displayed = view === "past" ? visible.slice(0, pastCount) : visible;
  const canLoadMorePast = view === "past" && displayed.length < visible.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!calendarId) {
      return undefined;
    }

    function onPointerDown(event) {
      if (!event.target.closest(".calendar-menu-wrap")) {
        setCalendarId(null);
      }
    }

    function onKey(event) {
      if (event.key === "Escape") {
        setCalendarId(null);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [calendarId]);

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
    setOpenId(null);
    setLightbox(null);
    setCalendarId(null);
    setPastCount(PAST_STEP);
  }

  function scrollParent(node) {
    let el = node?.parentElement;
    while (el && el !== document.body) {
      const style = window.getComputedStyle(el);
      if (/(auto|scroll)/.test(style.overflowY) && el.scrollHeight > el.clientHeight) {
        return el;
      }
      el = el.parentElement;
    }
    return window;
  }

  function holdItemStill(item) {
    if (!item) return;
    const parent = scrollParent(item);
    const before = item.getBoundingClientRect().top;
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    const start = performance.now();

    function step() {
      const delta = item.getBoundingClientRect().top - before;
      if (Math.abs(delta) > 0.5) {
        if (parent === window) {
          window.scrollBy(0, delta);
        } else {
          parent.scrollTop += delta;
        }
      }
      if (performance.now() - start < 480) {
        requestAnimationFrame(step);
      } else {
        root.style.scrollBehavior = previous;
      }
    }

    requestAnimationFrame(step);
  }

  function toggle(id, event) {
    holdItemStill(event?.currentTarget);
    setOpenId((current) => (current === id ? null : id));
    setCalendarId(null);
  }

  function onRowKeyDown(event, id) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle(id, event);
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
                const pinned = view === "upcoming" && index === 0;
                const featured = pinned || openId === id;
                const extras = [show.doors].filter(Boolean).join(` ${DOT} `);

                return (
                  <li
                    key={id}
                    id={`show-${show.date}`}
                    className={`show-item${featured ? " is-featured" : ""}${pinned ? " is-pinned" : ""}`}
                    onClick={pinned ? undefined : (event) => toggle(id, event)}
                    onKeyDown={pinned ? undefined : (event) => onRowKeyDown(event, id)}
                    role={pinned ? undefined : "button"}
                    tabIndex={pinned ? undefined : 0}
                    aria-expanded={pinned ? undefined : featured}
                  >
                    <div className="show-copy">
                      <span className="show-date">{show.label}</span>
                      <span className="show-venue">{show.venue}</span>
                      {featured && show.title ? (
                        <span className="show-title">{show.title}</span>
                      ) : null}
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
                            {featured ? "Hide Info" : "Show Info"}
                          </span>
                        ) : null}
                        {featured ? (
                          <button
                            type="button"
                            className="show-toggle show-share"
                            onClick={(event) => shareShow(event, show)}
                          >
                            Share
                          </button>
                        ) : null}
                        {featured ? (
                          <div className="calendar-menu-wrap">
                            <button
                              type="button"
                              className="show-toggle show-share"
                              aria-expanded={calendarId === id}
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                setCalendarId((current) => (current === id ? null : id));
                              }}
                            >
                              Add to calendar
                            </button>
                            {calendarId === id ? (
                              <div className="calendar-menu" onClick={(event) => event.stopPropagation()}>
                                <a href={googleCalendarUrl(show)} target="_blank" rel="noreferrer">
                                  Google Calendar
                                </a>
                                <button type="button" onClick={(event) => downloadCalendar(event, show)}>
                                  Apple Calendar
                                </button>
                                <a href={outlookCalendarUrl(show)} target="_blank" rel="noreferrer">
                                  Outlook
                                </a>
                                <a href={yahooCalendarUrl(show)} target="_blank" rel="noreferrer">
                                  Yahoo
                                </a>
                              </div>
                            ) : null}
                          </div>
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
            {canLoadMorePast ? (
              <button
                type="button"
                className="show-more-past"
                onClick={() => setPastCount((count) => count + PAST_STEP)}
              >
                More past shows
              </button>
            ) : null}
          </>
        )}
      </div>

      {overlay ? createPortal(overlay, document.body) : null}
    </>
  );
}
