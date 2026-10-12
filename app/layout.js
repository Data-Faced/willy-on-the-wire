import { Bebas_Neue, Karla } from "next/font/google";
import "./globals.css";
import "./band.css";
import "./mobile.css";
import "./shows.css";
import "./booking.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Karla({
  subsets: ["latin"],
  variable: "--font-body",
});

const SITE = "https://willyonthewire.com";
const TITLE = "Willy on the Wire | Live band in Bozeman, Montana";
const DESCRIPTION =
  "Book Willy on the Wire, a Bozeman live band playing rock, blues, soul, and funk. Solo through five-piece for bars, private events, and weddings in Bozeman, Big Sky, and Montana.";

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: TITLE,
    template: "%s | Willy on the Wire",
  },
  description: DESCRIPTION,
  applicationName: "Willy on the Wire",
  keywords: [
    "Willy on the Wire",
    "Bozeman live band",
    "Bozeman band",
    "Montana live band",
    "Bozeman wedding band",
    "Montana wedding band",
    "Big Sky live band",
    "rock blues soul funk Bozeman",
    "book a band Bozeman",
    "Bozeman event band",
  ],
  authors: [{ name: "Willy on the Wire", url: SITE }],
  creator: "Willy on the Wire",
  publisher: "Willy on the Wire",
  category: "music",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE,
    siteName: "Willy on the Wire",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/wotw-web-preview.png",
        alt: "Willy on the Wire, a Bozeman live band",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/wotw-web-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  other: {
    "geo.region": "US-MT",
    "geo.placename": "Bozeman",
    "geo.position": "45.6770;-111.0429",
    ICBM: "45.6770, -111.0429",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Willy on the Wire",
      description: DESCRIPTION,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE}/#band` },
    },
    {
      "@type": ["MusicGroup", "PerformingGroup"],
      "@id": `${SITE}/#band`,
      name: "Willy on the Wire",
      alternateName: "WOTW",
      url: SITE,
      image: `${SITE}/wotw-logo-large.png`,
      logo: `${SITE}/wotw-logo-large.png`,
      description:
        "Willy on the Wire is a live band from Bozeman, Montana. We play rock, blues, soul, and funk for bars, private events, and weddings across Montana. We book as a solo, duo, trio, four-piece, five-piece, and beyond.",
      genre: ["Rock", "Blues", "Soul", "Funk"],
      foundingLocation: {
        "@type": "City",
        name: "Bozeman",
        containedInPlace: { "@type": "State", name: "Montana" },
      },
      location: {
        "@type": "Place",
        name: "Bozeman, Montana",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bozeman",
          addressRegion: "MT",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 45.677,
          longitude: -111.0429,
        },
      },
      areaServed: [
        { "@type": "City", name: "Bozeman" },
        { "@type": "City", name: "Big Sky" },
        { "@type": "State", name: "Montana" },
      ],
      sameAs: [
        "https://www.instagram.com/willyonthewire/",
        "https://www.youtube.com/@WillyOnTheWire",
        "https://www.facebook.com/p/Willy-on-the-Wire-61577985041444/",
      ],
      makesOffer: { "@id": `${SITE}/#offers` },
    },
    {
      "@type": "OfferCatalog",
      "@id": `${SITE}/#offers`,
      name: "Willy on the Wire booking",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Live band booking",
          description:
            "Solo, duo, trio, four-piece, five-piece, and beyond for a Bozeman bar, a Big Sky lodge, a festival, or a private party.",
          areaServed: "Montana",
          url: `${SITE}/#booking`,
          seller: { "@id": `${SITE}/#band` },
        },
        {
          "@type": "Offer",
          name: "Wedding packages",
          description:
            "Wedding packages for the ceremony, the cocktail hour, and the dance floor in Bozeman, Big Sky, and Montana.",
          areaServed: "Montana",
          url: `${SITE}/#booking`,
          seller: { "@id": `${SITE}/#band` },
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What kind of band is Willy on the Wire?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Willy on the Wire is a live band from Bozeman, Montana. We play rock, blues, soul, and funk, and we put our own weight on the classics.",
          },
        },
        {
          "@type": "Question",
          name: "What lineup sizes can Willy on the Wire book?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We book as a solo, duo, trio, four-piece, five-piece, and beyond for bars, lodges, festivals, and private parties.",
          },
        },
        {
          "@type": "Question",
          name: "Does Willy on the Wire play weddings?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Our wedding packages cover the ceremony, the cocktail hour, and the dance floor. Send the booking form and we will build the lineup for the night.",
          },
        },
        {
          "@type": "Question",
          name: "Where does Willy on the Wire play?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We play Bozeman rooms including The Haufbrau, the Eagles Club, and Tune Up, plus Chico Hot Springs and Big Sky. We book bars, private events, and weddings across Montana.",
          },
        },
        {
          "@type": "Question",
          name: "How do I book Willy on the Wire?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Send the booking form on willyonthewire.com with the date, the room, and the lineup you want. You can also DM @willyonthewire on Instagram.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
