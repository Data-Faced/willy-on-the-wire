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
    <main className="links-page">
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

      <section className="links-hero">
        <p className="eyebrow">Rock · Blues · Soul · Funk</p>
        <h1>Willy on the Wire</h1>
        <p className="lede">
          Montana’s soundtrack for a good time. Vote before Nov 1, then book us or catch a show.
        </p>
      </section>

      <section className="links-section voting">
        <h2>Vote Now — Bozeman’s Choice</h2>
        <p className="section-note">Voting ends November 1. Tap a category and vote for Willy on the Wire.</p>
        <div className="link-buttons">
          {VOTING_LINKS.map((link) => (
            <a
              key={link.href}
              className="btn btn-primary link-btn"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              Vote: {link.title}
            </a>
          ))}
        </div>
      </section>

      <section className="links-section">
        <h2>Book the Band</h2>
        <div className="link-buttons">
          <Link className="btn btn-ghost link-btn" href="/#booking">
            Booking Form
          </Link>
          <a className="btn btn-ghost link-btn" href="mailto:booking@willyonthewire.com">
            Email booking@willyonthewire.com
          </a>
          <a
            className="btn btn-ghost link-btn"
            href="https://www.instagram.com/willyonthewire/"
            target="_blank"
            rel="noreferrer"
          >
            DM @willyonthewire
          </a>
        </div>
      </section>

      <section className="links-section">
        <h2>Upcoming Shows</h2>
        <div className="link-buttons">
          <Link className="btn btn-ghost link-btn" href="/#shows">
            Full Show List
          </Link>
          <Link className="btn btn-ghost link-btn" href="/">
            Website Home
          </Link>
        </div>
      </section>

      <section className="links-section">
        <h2>Listen & Watch</h2>
        <div className="link-buttons">
          <a
            className="btn btn-ghost link-btn"
            href="https://www.youtube.com/@WillyOnTheWire"
            target="_blank"
            rel="noreferrer"
          >
            YouTube
          </a>
          <a
            className="btn btn-ghost link-btn"
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

      <style jsx>{`
        .links-page {
          max-width: 640px;
        }

        .links-hero {
          padding: 40px 0 24px;
          text-align: center;
        }

        .links-hero h1 {
          font-size: 42px;
          margin: 8px 0 12px;
        }

        .links-section {
          padding: 28px 0;
          border-top: 1px solid var(--line);
        }

        .links-section.voting h2 {
          color: var(--amp);
        }

        .section-note {
          color: var(--soft);
          font-size: 15px;
          margin: 0 0 16px;
        }

        .link-buttons {
          display: grid;
          gap: 12px;
        }

        .link-btn {
          text-align: center;
          width: 100%;
          padding: 16px 18px;
          font-size: 15px;
        }

        @media (min-width: 768px) {
          .links-hero h1 {
            font-size: 56px;
          }
        }
      `}</style>
    </main>
  );
}
