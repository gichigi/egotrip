import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LocationProvider } from "./context/location-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EgoTrip - Sophisticated Travel for the Discerning",
  description: "For the discerning traveler who refuses to settle for pedestrian weather. Sophisticated destination recommendations with workspace intelligence for maintaining appearances.",
  keywords: ["luxury travel", "weather-based destinations", "sophisticated travel", "executive travel", "premium destinations", "sunny escapes", "travel agent", "refined travel"],
  authors: [{ name: "EgoTrip" }],
  creator: "EgoTrip",
  publisher: "EgoTrip",
  generator: "Next.js",
  applicationName: "EgoTrip",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://egotrip.vercel.app",
    title: "EgoTrip - Sophisticated Travel for the Discerning",
    description: "For the discerning traveler who refuses to settle for pedestrian weather. Sophisticated destination recommendations with workspace intelligence for maintaining appearances.",
    siteName: "EgoTrip",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "EgoTrip - Sophisticated Travel for the Discerning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EgoTrip - Sophisticated Travel for the Discerning",
    description: "For the discerning traveler who refuses to settle for pedestrian weather. Sophisticated destination recommendations with workspace intelligence for maintaining appearances.",
    images: ["/twitter-image.svg"],
    creator: "@tahigichigi",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#f59e0b",
      },
    ],
  },
  manifest: "/manifest.json",
  verification: {
    google: "your-google-verification-code",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f59e0b" },
    { media: "(prefers-color-scheme: dark)", color: "#f59e0b" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LocationProvider>{children}</LocationProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
