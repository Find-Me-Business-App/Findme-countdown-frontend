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
};

import QueryProvider from "@/components/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mulish.variable} antialiased`}
      >
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
