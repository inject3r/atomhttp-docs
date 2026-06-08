import Link from "next/link";
import { Metadata } from "next";
import Logo from "@/components/ui/Logo";
import { Project } from "@/project";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description:
    "The page you are looking for doesn't exist or has been moved. Learn AtomHTTP core API including HTTP methods (GET, POST, PUT, PATCH, DELETE), response handling, configuration options, headers, query parameters, and error handling.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black max-sm:mt-16">
      <div className="text-center px-6">
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>

        <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full text-sm text-gray-400 mb-8 border border-white/5">
          <span className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></span>
          HTTP 404
        </div>

        <h1 className="text-7xl sm:text-8xl font-bold text-white mb-4 tracking-tight">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl text-gray-300 mb-4">
          Page not found
        </h2>

        <p className="text-gray-500 max-w-md mx-auto mb-8 text-sm sm:text-base">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
          >
            ← Back to Home
          </Link>

          <Link
            href="/docs/getting-started"
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Go to Documentation
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-xs text-gray-600">
            AtomHTTP {Project.version} — Professional HTTP Client for Python
          </p>
        </div>
      </div>
    </div>
  );
}
