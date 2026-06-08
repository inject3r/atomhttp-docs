import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core API",
  description:
    "Learn AtomHTTP core API including HTTP methods (GET, POST, PUT, PATCH, DELETE), response handling, configuration options, headers, query parameters, and error handling.",
  keywords:
    "python http client, http methods python, get post put delete python, response handling python, http headers python, query parameters python, http error handling python",
  openGraph: {
    title: "Core API - AtomHTTP",
    description:
      "Complete guide to AtomHTTP core API: HTTP methods, response handling, configuration, headers, parameters, and error handling.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Core API - AtomHTTP",
    description:
      "Complete guide to AtomHTTP core API: HTTP methods, response handling, and configuration.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CoreApiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
