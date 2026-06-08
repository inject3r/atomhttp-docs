"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { Project } from "@/project";

const menuItems = [
  { href: "/docs/getting-started", label: "Getting Started" },
  { href: "/docs/core-api", label: "Core API" },
  { href: "/docs/advanced", label: "Advanced" },
  { href: "/docs/reference", label: "Reference" },
];

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-400 group-hover:text-white transition"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleCopyCommand = async () => {
    await navigator.clipboard.writeText("pip install atomhttp");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/5 transition-colors"
        aria-label="Open menu"
      >
        <Menu size={22} className="text-white" />
      </button>

      <div
        className={`fixed inset-0 z-[999] transition-all duration-300 ease-in-out ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-md transition-opacity duration-300 h-dvh ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        <aside
          className={`absolute left-0 top-0 h-[100dvh] w-full max-w-sm bg-black border-r border-white/10 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <Logo size="md" />
              <div>
                <p className="text-white font-semibold text-lg leading-tight">
                  AtomHTTP
                </p>
                <p className="text-[10px] text-gray-500 font-mono leading-tight">
                  Professional HTTP Client
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} className="text-white" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-base font-medium"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-2">
              <a
                href="https://github.com/inject3r/atomhttp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-base font-medium"
              >
                <GitHubIcon />
                <span>GitHub</span>
              </a>
            </div>

            <div className="mt-8 pt-4">
              <div className="flex items-center justify-between gap-2 p-3 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all">
                <code className="text-xs font-mono text-gray-300 flex-1 overflow-x-auto whitespace-nowrap">
                  pip install atomhttp
                </code>
                <button
                  onClick={handleCopyCommand}
                  className="flex-shrink-0 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
                  aria-label="Copy command"
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
              {copied && (
                <p className="text-xs text-green-400 mt-3 text-center">
                  Copied to clipboard!
                </p>
              )}
            </div>
          </div>

          <div className="p-5 border-t border-white/10 shrink-0">
            <p className="text-[11px] text-center text-gray-500">
              AtomHTTP {Project.version} · MIT License
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
