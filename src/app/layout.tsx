import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://findmeonline.com.ng"),
  title: {
    default: "FindMe | Limitless Possibilities",
    template: "%s | FindMe"
  },
  description: "Explore a world of unlimited features with FindMe. The ultimate platform for business management, social connection, and festival networking.",
  keywords: ["FindMe", "Social Networking", "Business Management", "Festival App", "Networking App Nigeria", "Uyo Events", "FindMe Online"],
  authors: [{ name: "FindMe Team", url: "https://findmeonline.com.ng" }],
  creator: "FindMe Team",
  publisher: "FindMe",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/logo1.svg",
    apple: "/logo1.svg",
  },
  openGraph: {
    title: "FindMe | Limitless Possibilities",
    description: "Explore a world of unlimited features with FindMe. Join the waitlist for the ultimate business and social networking experience.",
    url: "https://findmeonline.com.ng",
    siteName: "FindMe",
    images: [
      {
        url: "/icons/Seo.png",
        width: 1200,
        height: 630,
        alt: "FindMe | Limitless Possibilities",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FindMe | Limitless Possibilities",
    description: "Explore a world of unlimited features with FindMe. Join the waitlist now.",
    images: ["/icons/Seo.png"],
    creator: "@findme",
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
  category: 'technology',
  verification: {
    google: "googled01df674b0a92509",
  },
};

import QueryProvider from "@/components/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FindMe",
    "url": "https://findmeonline.com.ng",
    "logo": "https://findmeonline.com.ng/logo1.svg",
    "sameAs": [
      "https://twitter.com/findme",
      "https://facebook.com/findme",
      "https://instagram.com/findme"
    ],
    "description": "Explore a world of unlimited features with FindMe. The ultimate platform for business management, social connection, and festival networking."
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XPHPZHH6Z3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-XPHPZHH6Z3');
          `}
        </Script>
      </head>
      <body
        className={`${mulish.variable} antialiased`}
        suppressHydrationWarning
      >
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
