import Logo from "@/components/ui/Logo";
import { Project } from "@/project";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <div>
              <span className="text-gray-400 text-sm">
                AtomHTTP {Project.version}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a
              href="https://github.com/inject3r/atomhttp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              GitHub
            </a>
            <a
              href="/docs/getting-started"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Documentation
            </a>
            <a
              href="/docs/reference"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              API Reference
            </a>
          </div>

          <div className="text-right">
            <p className="text-gray-600 text-xs">MIT License</p>
            <p className="text-gray-700 text-[11px] mt-1">
              © {currentYear} Abolfazl Hosseini
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
