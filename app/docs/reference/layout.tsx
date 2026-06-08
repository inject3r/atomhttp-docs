import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reference",
  description:
    "Complete AtomHTTP API reference including method documentation, comparison with other HTTP clients (requests, aiohttp, httpx), error codes, response types, and practical examples.",
  keywords:
    "atomhttp api reference, python http client comparison, requests vs aiohttp vs httpx, http error codes python, response types python, atomhttp examples",
  openGraph: {
    title: "Reference - AtomHTTP",
    description:
      "Complete AtomHTTP API reference: methods, comparison charts, error codes, response types, and practical examples.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reference - AtomHTTP",
    description:
      "Complete AtomHTTP API reference and comparison with other HTTP clients.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ReferenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
