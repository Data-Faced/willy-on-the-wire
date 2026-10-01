import ShowsList from "./ShowsList";
import BookingForm from "./BookingForm";

const INSTAGRAM = "https://www.instagram.com/willyonthewire/";
const YOUTUBE = "https://www.youtube.com/@WillyOnTheWire";
const FACEBOOK = "https://www.facebook.com/p/Willy-on-the-Wire-61577985041444/";
const YOUTUBE_ID = "tcxPivXSzgY";
const YOUTUBE_SHORT_ID = "O3XHmIA21yQ";

const MAPS = {
  eagles: "https://maps.google.com/?q=Eagles+Bar+316+E+Main+Street+Bozeman+MT",
  greyDog: "https://maps.google.com/?q=The+Grey+Dog+Bozeman+MT",
  hauf: "https://maps.google.com/?q=Haufbrau+22+S+8th+Avenue+Bozeman+MT",
  tuneUp: "https://maps.google.com/?q=Tune+Up+Basement+Bar+Bozeman+MT",
  plaza: "https://maps.google.com/?q=Mountain+Village+Plaza+Big+Sky+MT",
  bandWagon: "https://maps.google.com/?q=2320+W+Babcock+Bozeman+MT",
  chico: "https://maps.google.com/?q=Chico+Hot+Springs+Pray+MT",
  hotSprings: "https://maps.google.com/?q=Bozeman+Hot+Springs+81123+Gallatin+Road",
  filler: "https://maps.google.com/?q=The+Filling+Station+2005+N+Rouse+Ave+Bozeman+MT",
  vista: "https://maps.google.com/?q=Vista+Hall+Big+Sky+Resort+MT",
  tipsUp: "https://maps.google.com/?q=Tips+Up+Big+Sky+MT",
  taproom: "https://maps.google.com/?q=Bozeman+Taproom+Bozeman+MT",
};

const SHOWS = [
  {
    date: "2026-10-31",
    label: "Sat Oct 31, 2026",
    venue: "Tune Up",
    city: "Bozeman, MT",
    time: "9PM-11PM",
    doors: "Doors 8PM",
    age: "21+",
    flyer: "/tune-up-flyer-placeholder.jpg",
    maps: MAPS.tuneUp,
    blurb:
      "Halloween night at Tune Up, under the Armory Hotel. Classic grooves and a packed basement floor.",
  },
  {
    date: "2026-09-19",
    label: "Sat Sept 19, 2026",
    venue: "Eagles Club",
    title: "Weekend at Eagles!",
    city: "Bozeman, MT",
    time: "9PM-1AM",
    age: "21+",
    maps: MAPS.eagles,
    blurb: "Night two at the Eagles. Downtown Main, late set, dance floor that does not sit down.",
  },
  {
    date: "2026-09-18",
    label: "Fri Sept 18, 2026",
    venue: "Eagles Club",
    title: "Weekend at Eagles!",
    city: "Bozeman, MT",
    time: "9PM-1AM",
    age: "21+",
    maps: MAPS.eagles,
    blurb: "Friday at the Eagles. Rock, blues, soul, and funk on Main Street.",
  },
  {
    date: "2026-09-11",
    label: "Fri Sept 11, 2026",
    venue: "The Grey Dog",
    city: "Bozeman, MT",
    time: "9PM-12AM",
    age: "21+",
    flyer: "/grey-dog-flyer.png",
    maps: MAPS.greyDog,
    instagram: "https://www.instagram.com/p/DdDQxTii94T/",
    blurb:
      "Return to The Grey Dog with a bigger band. Billiards in the back, bar in the middle, bangers up front.",
  },
  {
    date: "2026-09-10",
    label: "Thu Sept 10, 2026",
    venue: "The Haufbrau",
    city: "Bozeman, MT",
    time: "10PM-1AM",
    age: "21+",
    flyer: "/haufbrau-flyer-2.png",
    maps: MAPS.hauf,
    instagram: "https://www.instagram.com/p/DdCT8Fei69z/",
    blurb:
      "Thirsty Thursday at The Hauf. A full night of rock, blues, soul, and funk to start the weekend early.",
  },
  {
    date: "2026-09-05",
    label: "Sat Sept 5, 2026",
    venue: "Tune Up",
    city: "Bozeman, MT",
    time: "9PM-11PM",
    age: "21+",
    flyer: "/tune-up-flyer-1.png",
    maps: MAPS.tuneUp,
    instagram: "https://www.instagram.com/p/Dc1j0OVTpC7/",
    blurb:
      "Debut at Tune Up under the Armory. Your Teacher opens at 6PM. We take the basement from 9 to 11.",
  },
  {
    date: "2026-09-04",
    label: "Fri Sept 4, 2026",
    venue: "Mountain Village Plaza",
    city: "Big Sky, MT",
    time: "3PM-6PM",
    age: "All ages",
    maps: MAPS.plaza,
    blurb: "Afternoon set in the plaza. Open air, Big Sky light, and a set that works in the sun.",
  },
  {
    date: "2026-08-21",
    label: "Fri Aug 21, 2026",
    venue: "Band Wagon Mobile Stage",
    title: "Locals Appreciation Party",
    city: "Bozeman, MT",
    time: "6PM-10PM",
    age: "All ages",
    maps: MAPS.bandWagon,
    instagram: "https://www.instagram.com/p/DbhaifMjT_g/",
    blurb:
      "Free party at 2320 W Babcock. Food, bar, yard games, then live music after a vinyl DJ set.",
  },
  {
    date: "2026-08-15",
    label: "Sat Aug 15, 2026",
    venue: "Nash Fest",
    city: "Bozeman, MT",
    age: "All ages",
    blurb: "Festival set. Exact stage time still to lock if you have the flyer.",
  },
  {
    date: "2026-08-14",
    label: "Fri Aug 14, 2026",
    venue: "Mountain Village Plaza",
    city: "Big Sky, MT",
    time: "3PM-6PM",
    age: "All ages",
    maps: MAPS.plaza,
    blurb: "Friday afternoon in the plaza at Big Sky Resort.",
  },
  {
    date: "2026-08-08",
    label: "Sat Aug 8, 2026",
    venue: "Eagles Club",
    title: "Weekend at Eagles!",
    city: "Bozeman, MT",
    time: "9PM-1AM",
    age: "21+",
    maps: MAPS.eagles,
    blurb: "Saturday night of the August Eagles weekend.",
  },
  {
    date: "2026-08-07",
    label: "Fri Aug 7, 2026",
    venue: "Eagles Club",
    title: "Weekend at Eagles!",
    city: "Bozeman, MT",
    time: "9PM-1AM",
    age: "21+",
    maps: MAPS.eagles,
    blurb: "Friday night of the August Eagles weekend.",
  },
  {
    date: "2026-07-25",
    label: "Sat July 25, 2026",
    venue: "Chico Hot Springs",
    city: "Pray, MT",
    time: "9PM-1AM",
    age: "21+",
    flyer: "/chico-flyer.png",
    maps: MAPS.chico,
    instagram: "https://www.instagram.com/p/DbEkRy-hfE6/",
    blurb:
      "Night two in Paradise Valley. Soak, sip, and a late set where the water is hot and the drinks are cold.",
  },
  {
    date: "2026-07-24",
    label: "Fri July 24, 2026",
    venue: "Chico Hot Springs",
    city: "Pray, MT",
    time: "9PM-1AM",
    age: "21+",
    flyer: "/chico-flyer.png",
    maps: MAPS.chico,
    instagram: "https://www.instagram.com/p/DbEkRy-hfE6/",
    blurb: "Opening night of the Chico weekend. Two nights in Paradise Valley.",
  },
  {
    date: "2026-06-27",
    label: "Sat June 27, 2026",
    venue: "Eagles Club",
    title: "Weekend at Eagles!",
    city: "Bozeman, MT",
    time: "9PM-1AM",
    age: "21+",
    maps: MAPS.eagles,
    blurb: "Saturday of the June Eagles weekend on Main.",
  },
  {
    date: "2026-06-26",
    label: "Fri June 26, 2026",
    venue: "Eagles Club",
    title: "Weekend at Eagles!",
    city: "Bozeman, MT",
    time: "9PM-1AM",
    age: "21+",
    maps: MAPS.eagles,
    blurb: "Friday of the June Eagles weekend on Main.",
  },
  {
    date: "2026-05-23",
    label: "Sat May 23, 2026",
    venue: "Eagles Club",
    title: "Weekend at Eagles!",
    city: "Bozeman, MT",
    time: "9PM-1AM",
    age: "21+",
    flyer: "/eagles-flyer-1.png",
    maps: MAPS.eagles,
    instagram: "https://www.instagram.com/p/DYiYke_Bnzn/",
    blurb: "Memorial Day weekend, night two. Blues, rock, soul, and funk at the Eagles.",
  },
  {
    date: "2026-05-22",
    label: "Fri May 22, 2026",
    venue: "Eagles Club",
    title: "Weekend at Eagles!",
    city: "Bozeman, MT",
    time: "9PM-1AM",
    age: "21+",
    flyer: "/eagles-flyer-1.png",
    maps: MAPS.eagles,
    instagram: "https://www.instagram.com/p/DYiYke_Bnzn/",
    blurb: "Memorial Day weekend kickoff at the Eagles. Two full nights.",
  },
  {
    date: "2026-05-14",
    label: "Thu May 14, 2026",
    venue: "The Filling Station",
    title: "Classic Rock Night",
    city: "Bozeman, MT",
    time: "8PM",
    age: "21+",
    maps: MAPS.filler,
    instagram: "https://www.instagram.com/p/DXxEW2Ej6US/",
    blurb:
      "Classic Rock Night at the Filler with Fritz Road and Damion Wilde. Music starts at 8PM.",
  },
  {
    date: "2026-05-10",
    label: "Sun May 10, 2026",
    venue: "Bozeman Hot Springs",
    title: "Mother's Day",
    city: "Four Corners, MT",
    time: "7PM-10PM",
    age: "All ages",
    flyer: "/bozeman-hot-springs-flyer.png",
    maps: MAPS.hotSprings,
    instagram: "https://www.instagram.com/p/DYIfaAYkh9A/",
    blurb: "Mother's Day at the springs. Steamy jams from 7 to 10. Everyone and their mother.",
  },
  {
    date: "2026-04-11",
    label: "Sat April 11, 2026",
    venue: "The Filling Station",
    city: "Bozeman, MT",
    time: "8PM",
    age: "21+",
    flyer: "/filler-flyer-1.png",
    maps: MAPS.filler,
    instagram: "https://www.instagram.com/p/DXLfCQfFYY9/",
    blurb:
      "Saturday at the Filler with Logan and the Light Blue kicking off at 8PM. Confirm this April Saturday if the flyer shows another date.",
  },
  {
    date: "2026-03-28",
    label: "Sat March 28, 2026",
    venue: "Eagles Club",
    title: "Weekend at Eagles!",
    city: "Bozeman, MT",
    time: "9PM-1AM",
    age: "21+",
    flyer: "/eagles-flyer-2.png",
    maps: MAPS.eagles,
    instagram: "https://www.instagram.com/p/DWSP-THAUpY/",
    blurb: "Spring weekend at the Eagles, night two.",
  },
  {
    date: "2026-03-27",
    label: "Fri March 27, 2026",
    venue: "Eagles Club",
    title: "Weekend at Eagles!",
    city: "Bozeman, MT",
    time: "9PM-1AM",
    age: "21+",
    flyer: "/eagles-flyer-2.png",
    maps: MAPS.eagles,
    instagram: "https://www.instagram.com/p/DWSP-THAUpY/",
    blurb: "Spring return to the Eagles. Two nights on Main.",
  },
  {
    date: "2026-03-17",
    label: "Tue March 17, 2026",
    venue: "The Haufbrau",
    title: "St Patty's Night at The Hauf!",
    city: "Bozeman, MT",
    time: "10PM",
    age: "21+",
    flyer: "/haufbrau-flyer-2.png",
    maps: MAPS.hauf,
    instagram: "https://www.instagram.com/p/DV_9YdhkoFb/",
    blurb: "Surprise St. Patrick's night at The Hauf. Jigging starts at 10PM, maybe earlier.",
  },
  {
    date: "2026-02-14",
    label: "Sat Feb 14, 2026",
    venue: "Vista Hall",
    title: "Valentine's Weekend",
    city: "Big Sky, MT",
    time: "6PM-9PM",
    age: "All ages",
    flyer: "/big-sky-resort-flyer.png",
    maps: MAPS.vista,
    instagram: "https://www.instagram.com/p/DUjtEjmgj1J/",
    blurb: "Saturday at Vista Hall. Bring your valentine, your crew, and Big Sky energy.",
  },
  {
    date: "2026-02-13",
    label: "Fri Feb 13, 2026",
    venue: "Vista Hall",
    title: "Valentine's Weekend",
    city: "Big Sky, MT",
    time: "6PM-9PM",
    age: "All ages",
    flyer: "/big-sky-resort-flyer.png",
    maps: MAPS.vista,
    instagram: "https://www.instagram.com/p/DUjtEjmgj1J/",
    blurb: "Friday at Vista Hall. Back-to-back nights at Big Sky Resort, 6 to 9.",
  },
  {
    date: "2026-02-06",
    label: "Fri Feb 6, 2026",
    venue: "Vista Hall",
    city: "Big Sky, MT",
    maps: MAPS.vista,
    blurb: "Vista Hall at Big Sky Resort. Time still to confirm if you have the flyer.",
  },
  {
    date: "2026-01-29",
    label: "Thu Jan 29, 2026",
    venue: "Tips Up",
    city: "Big Sky, MT",
    time: "9PM-12AM",
    age: "21+",
    flyer: "/tips-up-flyer.png",
    maps: MAPS.tipsUp,
    instagram: "https://www.instagram.com/reel/DT_TS4oE1xS/",
    blurb:
      "Thursday night at Tips Up. Start the weekend early in Big Sky from 9 to midnight.",
  },
  {
    date: "2025-11-14",
    label: "Fri Nov 14, 2025",
    venue: "Bozeman Taproom",
    title: "Bobcat Pregame",
    city: "Bozeman, MT",
    time: "5PM",
    flyer: "/taproom-flyer.png",
    maps: MAPS.taproom,
    instagram: "https://www.instagram.com/p/DQr23O7kUFz/",
    blurb:
      "Pregame at the Taproom before the Bobcats hosted UC Davis. Classic rock, blues, soul, and funk from 5PM.",
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
          <p className="eyebrow">Rock {'\u00b7'} Blues {'\u00b7'} Soul {'\u00b7'} Funk</p>
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
            Live at Tips Up, Big Sky {'\u00b7'} Come and Get Your Love
          </p>
        </div>
      </section>

      <section id="about">
        <div className="band-copy">
          <h2>The band</h2>
          <p>
            Willy on the Wire is a Bozeman rock band built around vocals and
            guitar, lead guitar, bass, and drums. We play rock, blues, soul, and
            funk - classic songs with our own weight on them.
          </p>
          <p>
            We are a year into this lineup and playing the rooms that raised us:
            bars, lodges, hot springs, and wedding dance floors across southwest
            Montana. The goal is simple. Better nights. Bigger stages. A set
            that does not let people sit down.
          </p>
        </div>
      </section>

      <section id="shows">
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
        <p>Willy on the Wire {'\u00b7'} Bozeman, MT</p>
        <SocialRow />
      </footer>
    </main>
  );
}
