import { Bebas_Neue, Karla } from "next/font/google";
import "./globals.css";
import "./band.css";

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
  title: "Willy on the Wire | Bozeman rock, blues, soul, and funk",
  description:
    "Willy on the Wire is a Bozeman four-piece playing rock, blues, soul, and funk. Booking bars, weddings, and rooms across Montana.",
  icons: {
    icon: "/icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Willy on the Wire",
  genre: ["Rock", "Blues", "Soul", "Funk"],
  foundingLocation: {
    "@type": "City",
    name: "Bozeman",
    containedInPlace: { "@type": "State", name: "Montana" },
  },
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
