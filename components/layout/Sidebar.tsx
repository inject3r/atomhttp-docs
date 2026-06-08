"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";

const sidebarItems = {
  'Getting Started': [
    { href: '/docs/getting-started', label: 'Overview', sectionId: 'overview' },
    { href: '/docs/getting-started', label: 'Installation', sectionId: 'installation' },
    { href: '/docs/getting-started', label: 'Quick Start', sectionId: 'quick-start' },
    { href: '/docs/getting-started', label: 'First Request', sectionId: 'first-request' },
    { href: '/docs/getting-started', label: 'System Requirements', sectionId: 'requirements' },
    { href: '/docs/getting-started', label: 'Next Steps', sectionId: 'next-steps' },
  ],
  'Core API': [
    { href: '/docs/core-api', label: 'HTTP Methods', sectionId: 'http-methods' },
    { href: '/docs/core-api', label: 'Response Handling', sectionId: 'response-handling' },
    { href: '/docs/core-api', label: 'Configuration', sectionId: 'configuration' },
    { href: '/docs/core-api', label: 'Headers & Params', sectionId: 'headers-params' },
    { href: '/docs/core-api', label: 'Error Handling', sectionId: 'error-handling' },
  ],
  'Advanced Features': [
    { href: '/docs/advanced', label: 'Interceptors', sectionId: 'interceptors' },
    { href: '/docs/advanced', label: 'Progress Tracking', sectionId: 'progress' },
    { href: '/docs/advanced', label: 'FormData & File Uploads', sectionId: 'formdata' },
    { href: '/docs/advanced', label: 'Concurrent Requests', sectionId: 'concurrent' },
    { href: '/docs/advanced', label: 'Data Transformers', sectionId: 'transformers' },
    { href: '/docs/advanced', label: 'Authentication', sectionId: 'auth' },
    { href: '/docs/advanced', label: 'Blob & ArrayBuffer', sectionId: 'blob' },
    { href: '/docs/advanced', label: 'Limits & Timeouts', sectionId: 'limits' },
  ],
  Reference: [
    { href: '/docs/reference', label: 'Comparison', sectionId: 'comparison' },
    { href: '/docs/reference', label: 'Complete Examples', sectionId: 'examples' },
    { href: '/docs/reference', label: 'API Methods', sectionId: 'api-methods' },
    { href: '/docs/reference', label: 'Error Codes', sectionId: 'error-codes' },
    { href: '/docs/reference', label: 'Response Types', sectionId: 'response-types' },
  ],
}

const normalizePath = (path: string): string => {
  return path.replace(/\/$/, '');
};

const pageOrderRaw = [
  "/docs/getting-started",
  "/docs/core-api",
  "/docs/advanced",
  "/docs/reference",
];

const pageOrder = pageOrderRaw.map(normalizePath);

const pathToCategory: Record<string, string> = {
  "/docs/getting-started": "Getting Started",
  "/docs/core-api": "Core API",
  "/docs/advanced": "Advanced Features",
  "/docs/reference": "Reference",
};

const pageTitles: Record<string, string> = {
  "/docs/getting-started": "Getting Started",
  "/docs/core-api": "Core API",
  "/docs/advanced": "Advanced Features",
  "/docs/reference": "Reference",
};

export default function Sidebar() {
  const rawPathname = usePathname();
  const pathname = normalizePath(rawPathname || '');
  
  const [activeSection, setActiveSection] = useState<string>("");
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >(() => {
    const initial: Record<string, boolean> = {};
    Object.keys(sidebarItems).forEach((category) => {
      initial[category] = true;
    });
    return initial;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentCategory = useMemo(() => {
    return pathToCategory[pathname] || null;
  }, [pathname]);

  const currentIndex = useMemo(() => {
    return pageOrder.indexOf(pathname);
  }, [pathname]);

  const prevPage = useMemo(() => {
    return currentIndex > 0 ? pageOrder[currentIndex - 1] : null;
  }, [currentIndex]);

  const nextPage = useMemo(() => {
    return currentIndex < pageOrder.length - 1 && currentIndex !== -1
      ? pageOrder[currentIndex + 1]
      : null;
  }, [currentIndex]);

  const isValidPage = currentIndex !== -1;

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      window.history.pushState({}, "", `${pathname}#${sectionId}`);
      setActiveSection(sectionId);

      if (window.innerWidth < 1024) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0]);
        }
      },
      {
        rootMargin: "-80px 0px -50% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.slice(1);
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          setActiveSection(hash);
        }, 100);
      }
    }
  }, [pathname]);

  const isActiveLink = (sectionId: string) => {
    return activeSection === sectionId;
  };

  const SidebarContent = () => {
    if (!currentCategory) {
      return (
        <div className="text-gray-500 text-sm">
          No documentation available for this page.
        </div>
      );
    }

    const items = sidebarItems[currentCategory as keyof typeof sidebarItems];
    
    if (!items) return null;

    return (
      <div className="space-y-6">
        <div>
          <div className="w-full flex items-center justify-between py-1 text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-white">
              {currentCategory}
            </span>
          </div>

          <div className="mt-2 space-y-1">
            {items.map((item) => {
              const isActive = isActiveLink(item.sectionId);

              return (
                <button
                  key={`${item.href}#${item.sectionId}`}
                  onClick={() => scrollToSection(item.sectionId)}
                  className={`w-full text-left block py-1.5 px-2 text-sm rounded-md transition-all duration-200 ${
                    isActive
                      ? "text-white bg-white/10 font-medium"
                      : "text-gray-500 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 z-40 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-lg hover:bg-white/20 transition-all duration-200"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>

      <div className="hidden lg:block sticky top-20 w-full">
        <SidebarContent />

        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            {prevPage && isValidPage ? (
              <Link
                href={prevPage}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <ChevronLeft className="w-4 h-4" />
                <div>
                  <div className="text-xs text-gray-500">Previous</div>
                  <div className="text-sm font-medium">
                    {pageTitles[prevPage]}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextPage && isValidPage ? (
              <Link
                href={nextPage}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group text-right"
              >
                <div>
                  <div className="text-xs text-gray-500">Next</div>
                  <div className="text-sm font-medium">
                    {pageTitles[nextPage]}
                  </div>
                </div>
                <ChevronRightIcon className="w-4 h-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`absolute left-0 top-0 h-full w-80 bg-black border-r border-white/10 shadow-2xl transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div>
                <h2 className="text-white font-semibold">Documentation</h2>
                <p className="text-xs text-gray-500">
                  {currentCategory || "Navigation"}
                </p>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <SidebarContent />
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                {prevPage && isValidPage ? (
                  <Link
                    href={prevPage}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <div>
                      <div className="text-xs text-gray-500">Previous</div>
                      <div className="text-sm font-medium">
                        {pageTitles[prevPage]}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                {nextPage && isValidPage ? (
                  <Link
                    href={nextPage}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group text-right"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div>
                      <div className="text-xs text-gray-500">Next</div>
                      <div className="text-sm font-medium">
                        {pageTitles[nextPage]}
                      </div>
                    </div>
                    <ChevronRightIcon className="w-4 h-4" />
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}