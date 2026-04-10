import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FindMe",
  description: "FindMe - Limitless Possibilities",
  icons: {
    icon: "/logo1.svg",
    apple: "/logo1.svg",
  },
  openGraph: {
    title: "FindMe",
    description: "FindMe - Limitless Possibilities",
    url: "https://findmeonline.com.ng",
    siteName: "FindMe",
    images: [
      {
        url: "/icons/Seo.png",
        width: 1200,
        height: 630,
        alt: "FindMe SEO Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FindMe",
    description: "FindMe - Limitless Possibilities",
    images: ["/icons/Seo.png"],
  },
};

import QueryProvider from "@/components/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
