const SHOWS = [];

const INSTAGRAM = "https://www.instagram.com/willyonthewire/";
const YOUTUBE = "https://www.youtube.com/@WillyOnTheWire";
const FACEBOOK = "https://www.facebook.com/p/Willy-on-the-Wire-61577985041444/";
const YOUTUBE_ID = "tcxPivXSzgY";

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
          <p className="eyebrow">Rock · Blues · Soul · Funk</p>
          <h1>Willy on the Wire</h1>
          <p className="lede">
            A four-piece from Bozeman playing our own takes on the songs
            that make a room move.
          </p>
          <div className="actions">
            <a className="btn btn-primary" href="#watch">
              Watch the promo
            </a>
            <a className="btn btn-ghost" href="#booking">
              Book the band
            </a>
          </div>
          <SocialRow />
        </div>

        <div className="hero-media" id="watch">
          <div className="video-frame">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1`}
              title="Willy on the Wire promo — live at Tips Up, Big Sky"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p className="video-caption">
            Live at Tips Up, Big Sky · Come and Get Your Love
          </p>
        </div>
      </section>

      <section id="about">
        <h2>The band</h2>
        <p>
          Willy on the Wire is a Bozeman rock band built around vocals and
          guitar, lead guitar, bass, and drums. We play rock, blues, soul, and
          funk — classic songs with our own weight on them.
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
          That clip is the intro — filmed live in Big Sky. More recordings
          land here as we finish them. Until then, follow the floor videos
          on Instagram.
        </p>
        <a className="btn btn-primary" href={INSTAGRAM}>
          Instagram
        </a>
      </section>

      <section id="dates">
        <h2>Upcoming dates</h2>
        {SHOWS.length === 0 ? (
          <p className="empty">
            Next shows will be posted here as they lock. Follow{" "}
            <a href={INSTAGRAM}>@willyonthewire</a> for the latest.
          </p>
        ) : (
          <ul className="shows">
            {SHOWS.map((show) => (
              <li key={`${show.date}-${show.venue}`}>
                <span className="show-date">{show.date}</span>
                <span className="show-venue">{show.venue}</span>
                <span className="show-meta">
                  {show.city}
                  {show.time ? ` · ${show.time}` : ""}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section id="booking">
        <h2>Booking</h2>
        <p>
          Bars, private events, and weddings. Four-piece standard. Keys for
          ceremony and cocktail sets when the night calls for it.
        </p>
        <p>
          DM <a href={INSTAGRAM}>@willyonthewire</a> with the date, room, and
          what you need the band to cover.
        </p>
        <a className="btn btn-primary" href={INSTAGRAM}>
          Send a booking note
        </a>
      </section>

      <footer className="site-footer">
        <p>Willy on the Wire · Bozeman, MT</p>
        <SocialRow />
      </footer>
    </main>
  );
}
