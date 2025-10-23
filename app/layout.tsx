import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZCAS Innovation & Entrepreneurship Study Guide",
  description: "Interactive study guide for ZCAS University Innovation & Entrepreneurship course",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ZCAS Study Guide",
    startupImage: "/icon.svg",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "ZCAS Study Guide", 
    title: "ZCAS Innovation & Entrepreneurship Study Guide",
    description: "Interactive study guide for ZCAS University Innovation & Entrepreneurship course",
    images: ["/icon.svg"],
  },
  twitter: {
    card: "summary",
    title: "ZCAS Innovation & Entrepreneurship Study Guide",
    description: "Interactive study guide for ZCAS University Innovation & Entrepreneurship course",
    images: ["/icon.svg"],
  },
  applicationName: "ZCAS Study Guide",
  keywords: ["study guide", "entrepreneurship", "innovation", "ZCAS", "education", "PWA"],
  authors: [{ name: "James Njovu" }],
  creator: "ZCAS University",
  publisher: "ZCAS University",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ZCAS Study Guide" />
        <meta name="msapplication-TileImage" content="/icon.svg" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-navbutton-color" content="#3b82f6" />
        <meta name="msapplication-starturl" content="/" />
        
        {/* Additional PWA Tags */}
        <link rel="shortcut icon" href="/icon.svg" />
        <link rel="mask-icon" href="/icon.svg" color="#3b82f6" />
        <link rel="apple-touch-startup-image" href="/icon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
