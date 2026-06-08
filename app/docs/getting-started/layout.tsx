import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Getting Started",
  description:
    "Install and start using AtomHTTP - professional asynchronous HTTP client for Python. Quick setup guide with examples for making GET and POST requests.",
  keywords:
    "install atomhttp, python http client setup, pip install atomhttp, python async http client, atomhttp tutorial, python http requests",
  openGraph: {
    title: "Getting Started - AtomHTTP",
    description:
      "Install AtomHTTP and make your first HTTP requests in minutes. Complete setup guide with examples.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Getting Started - AtomHTTP",
    description:
      "Install AtomHTTP and make your first HTTP requests in minutes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GettingStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
