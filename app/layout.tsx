import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: {
    default: "OUT POST - AI, Tech & Agent Blog",
    template: "%s | OUT POST"
  },
  description: "Explore the latest insights on AI, technology, and intelligent agents. In-depth articles, podcasts, and analysis.",
  keywords: ["AI", "Artificial Intelligence", "Technology", "Agent", "Machine Learning", "Tech Blog", "AI News"],
  authors: [{ name: "OUT POST" }],
  creator: "OUT POST",
  publisher: "OUT POST",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://outpost.vercel.app'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "OUT POST - AI, Tech & Agent Blog",
    description: "Explore the latest insights on AI, technology, and intelligent agents.",
    siteName: "OUT POST",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "OUT POST Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "OUT POST - AI, Tech & Agent Blog",
    description: "Explore the latest insights on AI, technology, and intelligent agents.",
    images: ["/logo.png"],
    creator: "@outpost"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6886018593254363"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
