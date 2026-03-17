import type { Metadata } from "next";
import { Oswald, Karla } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RocketSales | Agency Dashboard",
  description: "AI-powered SEO agency management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${karla.variable}`}>
      <body className="font-body bg-brand-light text-brand-dark antialiased">
        {children}
      </body>
    </html>
  );
}
