import type { Metadata, Viewport } from "next";
import { IM_Fell_English, Caveat, Cinzel } from "next/font/google";
import "./globals.css";

const imFellEnglish = IM_Fell_English({
  variable: "--font-ink",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-spell",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marauder's Map",
  description: "I solemnly swear that I am up to no good.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Marauder's Map",
  },
  icons: {
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#c9a877",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${imFellEnglish.variable} ${caveat.variable} ${cinzel.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
