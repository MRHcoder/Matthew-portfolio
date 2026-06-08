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

export const metadata = {
  title: "Matthew Howell | Technical Program Manager",
  description:
    "Interactive resume and portfolio for Matthew Howell, a Technical Program Manager with aerospace systems engineering, product ownership, AI startup, and software delivery experience.",
  openGraph: {
    title: "Matthew Howell | Technical Program Manager",
    description:
      "Explore Matthew Howell’s interactive resume, technical program management background, AI startup work, Miro roadmap, and MattBot assistant.",
    url: "https://matthew-portfolio-pi.vercel.app",
    siteName: "Matthew Howell Portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Matthew Howell Technical Program Manager Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matthew Howell | Technical Program Manager",
    description:
      "Interactive resume and portfolio for Matthew Howell, Technical Program Manager.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
