const SHOWS = [
  // Add shows like this:
  // {
  //   date: "Fri Oct 17",
  //   venue: "The Grey Dog",
  //   city: "Bozeman, MT",
  //   time: "9PM–12AM",
  //   note: "",
  // },
];

const INSTAGRAM = "https://www.instagram.com/willyonthewire/";

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <p className="eyebrow">Bozeman, Montana</p>
        <p className="header-mark">Willy on the Wire</p>
      </header>

      <section className="hero">
        <p className="eyebrow">Rock · Blues · Soul · Funk</p>
        <h1>Willy on the Wire</h1>
        <p className="lede">
          A four-piece from Bozeman playing our own takes on the songs that
          make a room move.
        </p>
        <div className="actions">
          <a className="btn btn-primary" href={INSTAGRAM}>
            Instagram
          </a>
          <a className="btn btn-ghost" href="#booking">
            Book the band
          </a>
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
          New recordings land here as we finish them. Until then, the live set
          is the record — follow along on Instagram for clips from the floor.
        </p>
        <a className="btn btn-primary" href={INSTAGRAM}>
          Watch live clips
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
                {show.note ? <span className="show-note">{show.note}</span> : null}
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
          DM{" "}
          <a href={INSTAGRAM}>@willyonthewire</a> with the date, room, and
          what you need the band to cover.
        </p>
        <a className="btn btn-primary" href={INSTAGRAM}>
          Send a booking note
        </a>
      </section>

      <footer className="site-footer">
        <p>Willy on the Wire · Bozeman, MT</p>
        <p>
          <a href={INSTAGRAM}>Instagram</a>
        </p>
      </footer>
    </main>
  );
}