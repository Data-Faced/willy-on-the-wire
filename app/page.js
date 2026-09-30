import ShowsList from "./ShowsList";
import BookingForm from "./BookingForm";
import InstagramFeed from "./InstagramFeed";

const INSTAGRAM = "https://www.instagram.com/willyonthewire/";
const YOUTUBE = "https://www.youtube.com/@WillyOnTheWire";
const FACEBOOK = "https://www.facebook.com/p/Willy-on-the-Wire-61577985041444/";
const YOUTUBE_ID = "tcxPivXSzgY";
const YOUTUBE_SHORT_ID = "O3XHmIA21yQ";

const REELS = [
  { id: "Dc1j0OVTpC7", path: "p", label: "Tune Up — Sept 5" },
  { id: "DUYdcGjAo2F", path: "reel", label: "Use Me — Tips Up" },
  { id: "DL3QQ7yibG0", path: "reel", label: "Brandy — live" },
  { id: "DB1o_O8S2fg", path: "reel", label: "Stealers Wheel — live" },
];

const SHOWS = [
  {
    date: "2026-10-31",
    label: "Sat Oct 31, 2026",
    venue: "Tune Up",
    city: "Bozeman, MT",
    time: "9PM\u201311PM",
  },
  {
    date: "2026-09-11",
    label: "Fri Sept 11, 2026",
    venue: "The Grey Dog",
    city: "Bozeman, MT",
    time: "9PM\u201312AM",
  },
  {
    date: "2026-09-10",
    label: "Thu Sept 10, 2026",
    venue: "The Haufbrau",
    city: "Bozeman, MT",
    time: "10PM\u20131AM",
  },
  {
    date: "2026-09-05",
    label: "Sat Sept 5, 2026",
    venue: "Tune Up",
    city: "Bozeman, MT",
    time: "9PM\u201311PM",
  },
  {
    date: "2026-09-04",
    label: "Fri Sept 4, 2026",
    venue: "Mountain Village Plaza",
    city: "Big Sky, MT",
    time: "3PM\u20136PM",
  },
  {
    date: "2026-07-25",
    label: "Sat July 25, 2026",
    venue: "Chico Hot Springs",
    city: "Pray, MT",
    time: "9PM\u20131AM",
  },
  {
    date: "2026-07-24",
    label: "Fri July 24, 2026",
    venue: "Chico Hot Springs",
    city: "Pray, MT",
    time: "9PM\u20131AM",
  },
  {
    date: "2026-05-10",
    label: "Sun May 10, 2026",
    venue: "Bozeman Hot Springs",
    city: "Four Corners, MT",
    time: "7PM\u201310PM",
  },
];

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
      <header className="site-header">
        <a className="brand" href="/">
          <img
            className="logo"
            src="/wotw-logo-large.png"
            alt="Willy on the Wire"
          />
        </a>
        <p className="eyebrow">Bozeman, Montana</p>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Rock \u00b7 Blues \u00b7 Soul \u00b7 Funk</p>
          <h1>Willy on the Wire</h1>
          <p className="lede">
            A four-piece from Bozeman playing our own takes on the songs
            that make a room move.
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
              title="Willy on the Wire promo \u2014 live at Tips Up, Big Sky"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="video-frame video-mobile">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_SHORT_ID}?rel=0&modestbranding=1`}
              title="Willy on the Wire promo \u2014 vertical"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p className="video-caption">
            Live at Tips Up, Big Sky \u00b7 Come and Get Your Love
          </p>
        </div>
      </section>

      <section id="about">
        <h2>The band</h2>
        <p>
          Willy on the Wire is a Bozeman rock band built around vocals and
          guitar, lead guitar, bass, and drums. We play rock, blues, soul, and
          funk \u2014 classic songs with our own weight on them.
        </p>
        <p>
          We are a year into this lineup and playing the rooms that raised us:
          bars, lodges, hot springs, and wedding dance floors across southwest
          Montana. The goal is simple. Better nights. Bigger stages. A set
          that does not let people sit down.
        </p>
      </section>

      <section id="listen">
        <h2>Listen</h2>
        <p>
          Live clips from the floor. Follow @willyonthewire for the newest reels.
        </p>
        <InstagramFeed reels={REELS} />
        <a className="btn btn-primary" href={INSTAGRAM}>
          Instagram
        </a>
      </section>

      <section id="shows">
        <h2>Shows</h2>
        <ShowsList shows={SHOWS} />
      </section>

      <section id="booking">
        <h2>Booking</h2>
        <p>
          Bars, private events, and weddings. Four-piece standard. Keys for
          ceremony and cocktail sets when the night calls for it.
        </p>
        <p>
          Send the form or DM <a href={INSTAGRAM}>@willyonthewire</a>.
        </p>
        <BookingForm />
      </section>

      <footer className="site-footer">
        <p>Willy on the Wire \u00b7 Bozeman, MT</p>
        <SocialRow />
      </footer>
    </main>
  );
}
