import Link from "next/link";
import { notFound } from "next/navigation";
import { PREVIEW, SHOWS, findShow, showSlug } from "../../shows-data";

export function generateStaticParams() {
  return SHOWS.map((show) => ({ slug: showSlug(show) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const show = findShow(slug);
  if (!show) {
    return { title: "Show" };
  }

  const title = show.title
    ? `${show.title} — Willy on the Wire`
    : `Willy on the Wire at ${show.venue}`;
  const description =
    show.blurb ||
    `Willy on the Wire at ${show.venue}${show.city ? ` in ${show.city}` : ""}.`;
  const image = show.flyer || PREVIEW;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ShowSharePage({ params }) {
  const { slug } = await params;
  const show = findShow(slug);
  if (!show) {
    notFound();
  }

  const title = show.title
    ? `${show.title} — Willy on the Wire`
    : `Willy on the Wire at ${show.venue}`;

  return (
    <main className="show-share">
      <p className="eyebrow">Willy on the Wire</p>
      <h1>{title}</h1>
      <p>
        {show.label}
        {show.city ? ` · ${show.city}` : ""}
        {show.time ? ` · ${show.time}` : ""}
      </p>
      {show.blurb ? <p>{show.blurb}</p> : null}
      {show.flyer ? (
        <img src={show.flyer} alt={`${show.venue} flyer`} />
      ) : null}
      <Link href={`/#show-${show.date}`}>Back to shows</Link>
    </main>
  );
}
