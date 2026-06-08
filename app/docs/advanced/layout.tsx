import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advanced Features",
  description:
    "Learn advanced AtomHTTP features including interceptors, progress tracking, FormData uploads, concurrent requests, data transformers, authentication, Blob/ArrayBuffer handling, and request limits.",
  keywords:
    "python http interceptors, upload progress python, download progress python, formdata python, concurrent requests python, http authentication python, blob arraybuffer python, http timeouts python",
  openGraph: {
    title: "Advanced Features - AtomHTTP",
    description:
      "Master AtomHTTP advanced features: interceptors, progress tracking, FormData, concurrent requests, authentication, and more.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advanced Features - AtomHTTP",
    description:
      "Master AtomHTTP advanced features: interceptors, progress tracking, FormData, concurrent requests, and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AdvancedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
