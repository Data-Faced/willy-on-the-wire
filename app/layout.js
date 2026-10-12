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

export const metadata = {
  title: "Willy on the Wire | Live band in Bozeman, Montana",
  description:
    "Book Willy on the Wire, a Bozeman live band playing rock, blues, soul, and funk. Solo through five-piece for bars, private events, and weddings in Bozeman, Big Sky, and Montana.",
  icons: {
    icon: "/icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Willy on the Wire",
  genre: ["Rock", "Blues", "Soul", "Funk"],
  description:
    "Willy on the Wire is a Bozeman live band playing rock, blues, soul, and funk for bars, private events, and weddings across Montana.",
  foundingLocation: {
    "@type": "City",
    name: "Bozeman",
    containedInPlace: { "@type": "State", name: "Montana" },
  },
  areaServed: ["Bozeman", "Big Sky", "Montana"],
  url: "https://willyonthewire.com",
  sameAs: ["https://www.instagram.com/willyonthewire/"],
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
