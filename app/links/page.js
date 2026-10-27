import Link from "next/link";

const VOTING_LINKS = [
  {
    title: "Best New Local Band",
    href: "https://bozemanmagazine.com/bestof/464/questions/8869-bozemans-choice-new-local-band",
  },
  {
    title: "Best Local Blues Band",
    href: "https://bozemanmagazine.com/bestof/464/questions/8879-bozemans-choice-local-blues-band",
  },
  {
    title: "Best Funk/Soul Band",
    href: "https://bozemanmagazine.com/bestof/464/questions/9054-bozemans-choice-funksoul-band",
  },
  {
    title: "Best Local Cover Band",
    href: "https://bozemanmagazine.com/bestof/464/questions/8873-bozemans-choice-local-cover-band",
  },
  {
    title: "Best Local Rock Band",
    href: "https://bozemanmagazine.com/bestof/464/questions/8868-bozemans-choice-local-rock-band",
  },
];

export const metadata = {
  title: "Links",
  description: "Vote for Willy on the Wire, book the band, and see upcoming shows.",
};

export default function LinksPage() {
  return (
    <main className="max-w-xl mx-auto px-6 pb-20">
      <header className="site-header">
        <Link className="brand" href="/">
          <img
            className="logo"
            src="/wotw-logo-large.png"
            alt="Willy on the Wire"
          />
        </Link>
        <p className="eyebrow">Bozeman, Montana</p>
      </header>

      <section className="text-center py-10">
        <p className="eyebrow">Rock · Blues · Soul · Funk</p>
        <h1 className="text-5xl md:text-6xl my-2">Willy on the Wire</h1>
        <p className="lede">
          Montana’s soundtrack for a good time. Vote before Nov 1, then book us or catch a show.
        </p>
      </section>

      <section className="links-section py-7 border-t border-[var(--line)]">
        <h2 className="text-[var(--amp)]">Vote Now — Bozeman’s Choice</h2>
        <p className="text-[var(--soft)] text-sm mb-4">
          Voting ends November 1. Tap a category and vote for Willy on the Wire.
        </p>
        <div className="grid gap-3">
          {VOTING_LINKS.map((link) => (
            <a
              key={link.href}
              className="btn btn-primary text-center w-full py-4 text-base"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              Vote: {link.title}
            </a>
          ))}
        </div>
      </section>

      <section className="py-7 border-t border-[var(--line)]">
        <h2>Book the Band</h2>
        <div className="grid gap-3 mt-4">
          <Link className="btn btn-ghost text-center w-full py-4" href="/#booking">
            Booking Form
          </Link>
          <a className="btn btn-ghost text-center w-full py-4" href="mailto:booking@willyonthewire.com">
            Email booking@willyonthewire.com
          </a>
          <a
            className="btn btn-ghost text-center w-full py-4"
            href="https://www.instagram.com/willyonthewire/"
            target="_blank"
            rel="noreferrer"
          >
            DM @willyonthewire
          </a>
        </div>
      </section>

      <section className="py-7 border-t border-[var(--line)]">
        <h2>Upcoming Shows</h2>
        <div className="grid gap-3 mt-4">
          <Link className="btn btn-ghost text-center w-full py-4" href="/#shows">
            Full Show List
          </Link>
          <Link className="btn btn-ghost text-center w-full py-4" href="/">
            Website Home
          </Link>
        </div>
      </section>

      <section className="py-7 border-t border-[var(--line)]">
        <h2>Listen & Watch</h2>
        <div className="grid gap-3 mt-4">
          <a
            className="btn btn-ghost text-center w-full py-4"
            href="https://www.youtube.com/@WillyOnTheWire"
            target="_blank"
            rel="noreferrer"
          >
            YouTube
          </a>
          <a
            className="btn btn-ghost text-center w-full py-4"
            href="https://www.instagram.com/willyonthewire/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <Link className="footer-brand" href="/">
          <img
            className="footer-logo"
            src="/wotw-logo-large.png"
            alt="Willy on the Wire"
          />
        </Link>
        <p>
          Booking:{" "}
          <a href="mailto:booking@willyonthewire.com">booking@willyonthewire.com</a>
        </p>
      </footer>
    </main>
  );
}
