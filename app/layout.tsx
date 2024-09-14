import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Blackjack Chips Online",
  description: "Play an engaging blackjack game online. Bet chips, track your rounds, and enjoy smooth transitions designed for mobile and desktop.",
  keywords: "blackjack, online blackjack, betting, chips game, mobile game, react, nextjs",
  openGraph: {
    title: "Blackjack Chips Online",
    description: "Join the excitement of online blackjack. Bet, win, and enjoy a seamless gaming experience.",
    url: "https://blackjack-chips-online.vercel.app/",
    siteName: "Blackjack Chips Online",
    locale: "en_US",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
