import type { Metadata } from "next";
import { Outfit, Lato, Poppins } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "IRIS - Intelligent Reliability Insight System",
  description:
    "IRIS is an AI-powered monitoring and predictive analytics platform for NDPHC power plants. Real-time dashboards, asset health tracking, gas quality monitoring, and predictive maintenance insights.",
  keywords: [
    "IRIS",
    "NDPHC",
    "power plant monitoring",
    "predictive maintenance",
    "asset health",
    "gas turbine",
    "energy management",
    "Nigeria power",
    "real-time analytics",
  ],
  authors: [{ name: "NDPHC" }],
  creator: "NDPHC",
  publisher: "Niger Delta Power Holding Company",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "IRIS - Intelligent Reliability Insight System",
    title: "IRIS - Intelligent Reliability Insight System",
    description:
      "AI-powered monitoring and predictive analytics platform for NDPHC power plants. Real-time dashboards, asset health tracking, and predictive maintenance.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IRIS - Intelligent Reliability Insight System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IRIS - Intelligent Reliability Insight System",
    description:
      "AI-powered monitoring and predictive analytics platform for NDPHC power plants.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
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
        className={`${outfit.variable} ${lato.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
