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

const BIG_SKY_FLYER = "/big-sky-flyer-default.png";
const EAGLES_FLYER = "/eagles-flyer-default.png";
const FILLER_FLYER = "/filling-station-flyer-default.png";

const SHOWS = [
  {
    date: "2026-10-31",
    label: "Sat Oct 31, 2026",
    venue: "Tune Up",
    city: "Bozeman, MT",
    time: "9PM-11PM",
    doors: "Doors 8PM",
    flyer: "/tune-up-flyer-placeholder.jpg",
    maps: MAPS.tuneUp,
    blurb:
      "We play Halloween night at Tune Up, under the Armory Hotel in Bozeman. Expect classic grooves and a packed basement floor.",
  },
  {
    date: "2026-09-19",
    label: "Sat Sept 19, 2026",
    venue: "Eagles Club",
    title: "Weekend at Eagles!",
    city: "Bozeman, MT",
    time: "9PM-1AM",
    flyer: EAGLES_FLYER,
    maps: MAPS.eagles,
    blurb:
      "This is night two at the Eagles Club on Main Street. It is a late set, and the dance floor does not sit down.",
  },
  {
    date: "2026-09-18",
    label: "Fri Sept 18, 2026",
    venue: "Eagles Club",
    title: "Weekend at Eagles!",
    city: "Bozeman, MT",
    time: "9PM-1AM",
    flyer: EAGLES_FLYER,
    maps: MAPS.eagles,
    blurb:
      "We play Friday night at the Eagles Club in downtown Bozeman. The set is rock, blues, soul, and funk on Main Street.",
  },
  {
    date: "2026-09-11",
    label: "Fri Sept 11, 2026",
    venue: "The Grey Dog",
    city: "Bozeman, MT",
    time: "9PM-12AM",
    flyer: "/grey-dog-flyer.png",
    maps: MAPS.greyDog,
    instagram: "https://www.instagram.com/p/DdDQxTii94T/",
    blurb:
      "We return to The Grey Dog in Bozeman with a bigger band. There are billiards in the back, a bar in the middle, and bangers up front.",
  },
  {
    date: "2026-09-10",
    label: "Thu Sept 10, 2026",
    venue: "The Haufbrau",
    city: "Bozeman, MT",
    time: "10PM-1AM",
    flyer: "/haufbrau-flyer-2.png",
    maps: MAPS.hauf,
    instagram: "https://www.instagram.com/p/DdCT8Fei69z/",
    blurb:
      "This is Thirsty Thursday at The Haufbrau. We play a full night of rock, blues, soul, and funk to start the weekend early.",
  },
  {
    date: "2026-09-05",
    label: "Sat Sept 5, 2026",
    venue: "Tune Up",
    city: "Bozeman, MT",
    time: "9PM-11PM",
    flyer: "/tune-up-flyer-1.png",
    maps: MAPS.tuneUp,
    instagram: "https://www.instagram.com/p/Dc1j0OVTpC7/",
    blurb:
      "We make our debut at Tune Up under the Armory in Bozeman. Your Teacher opens at 6PM, and we take the basement from 9 to 11.",
  },
  {
    date: "2026-09-04",
    label: "Fri Sept 4, 2026",
    venue: "Mountain Village Plaza",
    city: "Big Sky, MT",
    time: "3PM-6PM",
    flyer: BIG_SKY_FLYER,
    maps: MAPS.plaza,
    blurb:
      "We play an afternoon set in the plaza at Big Sky. It is open air, with a set that works in the sun.",
  },
  {
    date: "2026-08-21",
    label: "Fri Aug 21, 2026",
    venue: "Band Wagon Mobile Stage",
    title: "Locals Appreciation Party",
    city: "Bozeman, MT",
    time: "6PM-10PM",
    maps: MAPS.bandWagon,
    instagram: "https://www.instagram.com/p/DbhaifMjT_g/",
    blurb:
      "We play a free party at 2320 W Babcock in Bozeman. There is food, a bar, yard games, and live music after a vinyl DJ set.",
  },
  {
    date: "2026-08-15",
    label: "Sat Aug 15, 2026",
    venue: "Nash Fest",
    city: "Bozeman, MT",
    blurb:
      "We play a festival set at Nash Fest in Bozeman. The exact stage time is still to lock.",
  },
  {
    date: "2026-08-14",
    label: "Fri Aug 14, 2026",
    venue: "Mountain Village Plaza",
    city: "Big Sky, MT",
    time: "3PM-6PM",
    flyer: BIG_SKY_FLYER,
    maps: MAPS.plaza,
    blurb: "We play Friday afternoon in the plaza at Big Sky Resort.",
  },
  {
    date: "2026-08-08",
    label: "Sat Aug 8, 2026",
    venue: "Eagles Club",
    title: "Weekend at Eagles!",
    city: "Bozeman, MT",
    time: "9PM-1AM",
    flyer: EAGLES_FLYER,
    maps: MAPS.eagles,
    blurb: "We play Saturday night of the August weekend at the Eagles Club in Bozeman.",
  },
  {
    date: "2026-08-07",
    label: "Fri Aug 7, 2026",
    venue: "Eagles Club",
    title: "Weekend at Eagles!",
    city: "Bozeman, MT",
    time: "9PM-1AM",
    flyer: EAGLES_FLYER,
    maps: MAPS.eagles,
    blurb: "We play Friday night of the August weekend at the Eagles Club in Bozeman.",
  },
  {
    date: "2026-07-25",
    label: "Sat July 25, 2026",
    venue: "Chico Hot Springs",
    city: "Pray, MT",
    time: "9PM-1AM",
    flyer: "/chico-flyer.png",
    maps: MAPS.chico,
    instagram: "https://www.instagram.com/p/DbEkRy-hfE6/",
    blurb:
      "This is night two in Paradise Valley. Come soak and sip, then stay for a late set where the water is hot and the drinks are cold.",
  },
  {
    date: "2026-07-24",
    label: "Fri July 24, 2026",
    venue: "Chico Hot Springs",
    city: "Pray, MT",
    time: "9PM-1AM",
    flyer: "/chico-flyer.png",
    maps: MAPS.chico,
    instagram: "https://www.instagram.com/p/DbEkRy-hfE6/",
    blurb: "This is opening night of the Chico weekend. We play two nights in Paradise Valley.",
  },
  {
    date: "2026-06-27",
    label: "Sat June 27, 2026",
    venue: "Eagles Club",
    title: "Weekend at Eagles!",
    city: "Bozeman, MT",
    time: "9PM-1AM",
    flyer: EAGLES_FLYER,
    maps: MAPS.eagles,
    blurb: "We play Saturday of the June weekend at the Eagles Club on Main Street in Bozeman.",
  },
  {
    date: "2026-06-26",
    label: "Fri June 26, 2026",
    venue: "Eagles Club",
    title: "Weekend at Eagles!",
    city: "Bozeman, MT",
    time: "9PM-1AM",
    flyer: EAGLES_FLYER,
    maps: MAPS.eagles,
    blurb: "We play Friday of the June weekend at the Eagles Club on Main Street in Bozeman.",
  },
  {
    date: "2026-05-23",
    label: "Sat May 23, 2026",
    venue: "Eagles Club",
    title: "Weekend at Eagles!",
    city: "Bozeman, MT",
    time: "9PM-1AM",
    flyer: "/eagles-flyer-1.png",
    maps: MAPS.eagles,
    instagram: "https://www.instagram.com/p/DYiYke_Bnzn/",
    blurb:
      "This is Memorial Day weekend, night two. We play blues, rock, soul, and funk at the Eagles Club in Bozeman.",
  },
  {
    date: "2026-05-22",
    label: "Fri May 22, 2026",
    venue: "Eagles Club",
    title: "Weekend at Eagles!",
    city: "Bozeman, MT",
    time: "9PM-1AM",
    flyer: "/eagles-flyer-1.png",
    maps: MAPS.eagles,
    instagram: "https://www.instagram.com/p/DYiYke_Bnzn/",
    blurb: "This is the Memorial Day weekend kickoff at the Eagles Club. We play two full nights in Bozeman.",
  },
  {
    date: "2026-05-14",
    label: "Thu May 14, 2026",
    venue: "The Filling Station",
    title: "Classic Rock Night",
    city: "Bozeman, MT",
    time: "8PM",
    flyer: FILLER_FLYER,
    maps: MAPS.filler,
    instagram: "https://www.instagram.com/p/DXxEW2Ej6US/",
    blurb:
      "We play Classic Rock Night at the Filling Station with Fritz Road and Damion Wilde. Music starts at 8PM in Bozeman.",
  },
  {
    date: "2026-05-10",
    label: "Sun May 10, 2026",
    venue: "Bozeman Hot Springs",
    title: "Mother's Day",
    city: "Four Corners, MT",
    time: "7PM-10PM",
    flyer: "/bozeman-hot-springs-flyer.png",
    maps: MAPS.hotSprings,
    instagram: "https://www.instagram.com/p/DYIfaAYkh9A/",
    blurb:
      "We play Mother's Day at Bozeman Hot Springs. The set runs from 7 to 10, and everyone and their mother is invited.",
  },
  {
    date: "2026-04-11",
    label: "Sat April 11, 2026",
    venue: "The Filling Station",
    city: "Bozeman, MT",
    time: "8PM",
    flyer: "/filler-flyer-1.png",
    maps: MAPS.filler,
    instagram: "https://www.instagram.com/p/DXLfCQfFYY9/",
    blurb:
      "We play Saturday at the Filling Station in Bozeman, with Logan and the Light Blue kicking off at 8PM.",
  },
  {
    date: "2026-03-28",
    label: "Sat March 28, 2026",
    venue: "Eagles Club",
    title: "Weekend at Eagles!",
    city: "Bozeman, MT",
    time: "9PM-1AM",
    flyer: "/eagles-flyer-2.png",
    maps: MAPS.eagles,
    instagram: "https://www.instagram.com/p/DWSP-THAUpY/",
    blurb: "This is night two of our spring weekend at the Eagles Club in Bozeman.",
  },
  {
    date: "2026-03-27",
    label: "Fri March 27, 2026",
    venue: "Eagles Club",
    title: "Weekend at Eagles!",
    city: "Bozeman, MT",
    time: "9PM-1AM",
    flyer: "/eagles-flyer-2.png",
    maps: MAPS.eagles,
    instagram: "https://www.instagram.com/p/DWSP-THAUpY/",
    blurb: "We return to the Eagles Club for two nights on Main Street in Bozeman.",
  },
  {
    date: "2026-03-17",
    label: "Tue March 17, 2026",
    venue: "The Haufbrau",
    title: "St Patty's Night at The Hauf!",
    city: "Bozeman, MT",
    time: "10PM",
    flyer: "/haufbrau-flyer-2.png",
    maps: MAPS.hauf,
    instagram: "https://www.instagram.com/p/DV_9YdhkoFb/",
    blurb:
      "We play a surprise St. Patrick's night at The Haufbrau in Bozeman. The set starts at 10PM, maybe earlier.",
  },
  {
    date: "2026-02-14",
    label: "Sat Feb 14, 2026",
    venue: "Vista Hall",
    title: "Valentine's Weekend",
    city: "Big Sky, MT",
    time: "6PM-9PM",
    flyer: BIG_SKY_FLYER,
    maps: MAPS.vista,
    instagram: "https://www.instagram.com/p/DUjtEjmgj1J/",
    blurb:
      "We play Saturday at Vista Hall in Big Sky. Bring your valentine, your crew, and the energy.",
  },
  {
    date: "2026-02-13",
    label: "Fri Feb 13, 2026",
    venue: "Vista Hall",
    title: "Valentine's Weekend",
    city: "Big Sky, MT",
    time: "6PM-9PM",
    flyer: BIG_SKY_FLYER,
    maps: MAPS.vista,
    instagram: "https://www.instagram.com/p/DUjtEjmgj1J/",
    blurb: "We play Friday at Vista Hall. These are back-to-back nights at Big Sky Resort, from 6 to 9.",
  },
  {
    date: "2026-02-06",
    label: "Fri Feb 6, 2026",
    venue: "Vista Hall",
    city: "Big Sky, MT",
    flyer: BIG_SKY_FLYER,
    maps: MAPS.vista,
    blurb: "We play Vista Hall at Big Sky Resort. The time is still to confirm.",
  },
  {
    date: "2026-01-29",
    label: "Thu Jan 29, 2026",
    venue: "Tips Up",
    city: "Big Sky, MT",
    time: "9PM-12AM",
    flyer: "/tips-up-flyer.png",
    maps: MAPS.tipsUp,
    instagram: "https://www.instagram.com/reel/DT_TS4oE1xS/",
    blurb:
      "We play Thursday night at Tips Up. It is a chance to start the weekend early in Big Sky, from 9 to midnight.",
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
      "We play a pregame at the Bozeman Taproom before the Bobcats host UC Davis. The set is classic rock, blues, soul, and funk from 5PM.",
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
        <div className="booking-copy">
          <h2>Booking</h2>
          <p>
            Book Willy on the Wire for a Bozeman bar, a Big Sky event, a private
            party, or a Montana wedding. Tell us the date, the room, and the
            lineup you want.
          </p>
          <p>
            We play solo through five-piece and beyond, and our wedding packages
            cover the ceremony, cocktail hour, and reception. Send the form and
            we will follow up. You can also DM <a href={INSTAGRAM}>@willyonthewire</a>.
          </p>
          <BookingForm />
        </div>
        <div className="booking-photo" aria-hidden="true" />
      </section>

      <footer className="site-footer">
        <p>Willy on the Wire {'\u00b7'} Live band in Bozeman, Montana</p>
        <SocialRow />
      </footer>
    </main>
  );
}
