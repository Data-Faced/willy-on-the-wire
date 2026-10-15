import ShowsList from "./ShowsList";
import BookingForm from "./BookingForm";

import { SHOWS, SITE } from "./shows-data";

const INSTAGRAM = "https://www.instagram.com/willyonthewire/";
const YOUTUBE = "https://www.youtube.com/@WillyOnTheWire";
const FACEBOOK = "https://www.facebook.com/p/Willy-on-the-Wire-61577985041444/";
const YOUTUBE_ID = "tcxPivXSzgY";
const YOUTUBE_SHORT_ID = "O3XHmIA21yQ";
const BOOKING_EMAIL = "booking@willyonthewire.com";

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function eventTimes(show) {
  const match = show.time ? show.time.match(/(\d{1,2})(AM|PM)/i) : null;
  if (!match) {
    return { startDate: show.date };
  }

  let hour = Number(match[1]);
  const period = match[2].toUpperCase();
  if (period === "PM" && hour < 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  const start = `${show.date}T${String(hour).padStart(2, "0")}:00:00-06:00`;

  const endMatch = show.time.match(/-(\d{1,2})(AM|PM)/i);
  if (!endMatch) {
    return { startDate: start };
  }

  let endHour = Number(endMatch[1]);
  const endPeriod = endMatch[2].toUpperCase();
  if (endPeriod === "PM" && endHour < 12) endHour += 12;
  if (endPeriod === "AM" && endHour === 12) endHour = 0;
  const endDate = endHour < hour ? nextDay(show.date) : show.date;
  return {
    startDate: start,
    endDate: `${endDate}T${String(endHour).padStart(2, "0")}:00:00-06:00`,
  };
}

function nextDay(date) {
  const next = new Date(`${date}T12:00:00Z`);
  next.setUTCDate(next.getUTCDate() + 1);
  return next.toISOString().slice(0, 10);
}

function showsJsonLd(shows) {
  const today = todayStamp();
  const upcoming = shows.filter((show) => show.date >= today);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Upcoming Willy on the Wire shows",
    itemListElement: upcoming.map((show, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "MusicEvent",
        name: show.title
          ? `${show.title} with Willy on the Wire at ${show.venue}`
          : `Willy on the Wire at ${show.venue}`,
        description: show.blurb,
        startDate: eventTimes(show).startDate,
        endDate: eventTimes(show).endDate,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        url: `${SITE}/#show-${show.date}`,
        image: show.flyer ? `${SITE}${show.flyer}` : `${SITE}/wotw-logo-large.png`,
        performer: {
          "@type": "MusicGroup",
          name: "Willy on the Wire",
          url: SITE,
        },
        location: {
          "@type": "Place",
          name: show.venue,
          address: show.city,
          hasMap: show.maps,
        },
      },
    })),
  };
}

function SocialRow() {
  return (
    <nav className="socials" aria-label="Social links">
      <a href={INSTAGRAM} aria-label="Instagram" target="_blank" rel="noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
        </svg>
      </a>
      <a href={FACEBOOK} aria-label="Facebook" target="_blank" rel="noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M14 8h2.5V5h-2.5C11.6 5 10 6.6 10 8.5V10H8v3h2v6h3v-6h2.2l.8-3H13V8.5c0-.3.2-.5.5-.5H14z"
            fill="currentColor"
          />
        </svg>
      </a>
      <a href={YOUTUBE} aria-label="YouTube" target="_blank" rel="noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="2.5" y="6" width="19" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M10.5 9.5v5l5-2.5-5-2.5z" fill="currentColor" />
        </svg>
      </a>
    </nav>
  );
}

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(showsJsonLd(SHOWS)) }}
      />
      <header className="site-header">
        <a className="brand" href="/">
          <img
            className="logo"
            src="/wotw-logo-large.png"
            alt="Willy on the Wire, a Bozeman live band"
          />
        </a>
        <p className="eyebrow">Bozeman, Montana</p>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Rock {'\u00b7'} Blues {'\u00b7'} Soul {'\u00b7'} Funk</p>
          <h1>Willy on the Wire</h1>
          <p className="lede">
            Willy on the Wire is a Bozeman live band and Montana’s soundtrack for a good time.
          </p>
          <div className="actions">
            <a className="btn btn-primary" href="#booking">
              Book WOTW
            </a>
            <a className="btn btn-ghost" href="#shows">
              Shows
            </a>
          </div>
          <SocialRow />
        </div>

        <div className="hero-media" id="watch">
          <div className="video-frame video-desktop">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1`}
              title="Willy on the Wire promo - live at Tips Up, Big Sky"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="video-frame video-mobile">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_SHORT_ID}?rel=0&modestbranding=1`}
              title="Willy on the Wire promo - vertical"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p className="video-caption">
            Live at Tips Up in Big Sky. Come and Get Your Love.
          </p>
        </div>
      </section>

      <section id="about">
        <div className="band-copy">
          <div className="band-block">
            <h2>Who we are</h2>
            <p>
              Willy on the Wire is a live band from Bozeman, Montana. We play
              rock, blues, soul, and funk, and we put our own weight on the
              classics. The set is built to get a room moving and keep it there.
            </p>
            <p>
              You can find us at The Haufbrau on a Thursday, the Eagles Club on
              a late weekend, and Tune Up under the Armory. We also play Chico
              Hot Springs when the valley is hot, and Big Sky when the plaza or
              the hall calls for it.
            </p>
          </div>
          <div className="band-block">
            <h2>What we offer</h2>
            <p>
              We book as a solo, duo, trio, four-piece, five-piece, and beyond.
              That covers a Bozeman bar, a Big Sky lodge, a festival, or a
              private party.
            </p>
            <p>
              Our wedding packages cover the ceremony, the cocktail hour, and
              the dance floor. Send the booking form and we will build the
              lineup for your night.
            </p>
          </div>
        </div>
        <div className="band-photo" aria-hidden="true" />
      </section>

      <section id="shows">
        <ShowsList shows={SHOWS} />
        <div className="shows-photo" aria-hidden="true" />
      </section>

      <section id="booking">
        <div className="booking-intro">
          <h2>Booking Willy on the Wire</h2>
          <p>
            Book Willy on the Wire for your music venue, community event, private
            party, or wedding celebration! Tell us exactly what you're looking
            for or trust our expert opinion.
          </p>
          <p>
            We offer small acoustic performances all the way up through
            five-piece rock bands and beyond. Our wedding packages cover the
            ceremony, cocktail hour, and reception. Complete the form below and
            we will get back to you as soon as possible. You can also email{" "}
            <a href={`mailto:${BOOKING_EMAIL}`}>{BOOKING_EMAIL}</a> or DM{" "}
            <a href={INSTAGRAM}>@willyonthewire</a> on Instagram.
          </p>
        </div>
        <div className="booking-stage">
          <div className="booking-copy">
            <BookingForm />
          </div>
          <div className="booking-photo" aria-hidden="true" />
        </div>
      </section>

      <footer className="site-footer">
        <a className="footer-brand" href="/">
          <img
            className="footer-logo"
            src="/wotw-logo-large.png"
            alt="Willy on the Wire"
          />
        </a>
        <p>
          Booking:{" "}
          <a href={`mailto:${BOOKING_EMAIL}`}>{BOOKING_EMAIL}</a>
        </p>
        <SocialRow />
      </footer>
    </main>
  );
}
