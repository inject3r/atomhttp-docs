"use client";

import { useState, useMemo } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({
  code,
  language = "python",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const linesCount = useMemo(() => code.split("\n").length, [code]);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#111111] shadow-2xl">
      <button
        onClick={handleCopy}
        className="
          absolute
          right-3
          top-3
          z-10
          flex
          items-center
          gap-1.5
          rounded-lg
          border
          border-[#2a2a2a]
          bg-[#111111]/90
          px-2.5
          py-1.5
          text-xs
          text-[#6b6b6b]
          opacity-0
          backdrop-blur-md
          transition-all
          duration-200
          group-hover:opacity-100
          hover:border-[#4a4a4a]
          hover:text-[#e5e5e5]
          max-sm:opacity-100
          max-sm:bg-[#111111]/80
        "
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" />
            <span className="max-sm:text-[11px]">Copied</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span className="max-sm:text-[11px]">Copy</span>
          </>
        )}
      </button>

      <div className="overflow-x-auto">
        <div className="flex min-w-max">
          <div
            className="
              sticky
              left-0
              z-10
              shrink-0
              select-none
              border-r
              border-[#1a1a1a]
              bg-[#0a0a0a]
              text-right
              text-sm
              text-[#4a4a4a]
              font-mono
              max-sm:text-xs
              max-sm:px-2
              max-sm:py-4
              px-4
              py-5
            "
          >
            {Array.from({ length: linesCount }, (_, i) => (
              <div
                key={i}
                className="leading-[24.50px] max-sm:leading-[24.56px]"
              >
                {i + 1}
              </div>
            ))}
          </div>

          <div className="flex-1">
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: "1.25rem",
                background: "#060606",
                fontSize: "14px",
                lineHeight: "1.75",
                fontFamily:
                  "'Menlo', 'Consolas', 'Monaco', 'Courier New', monospace",
                whiteSpace: "pre",
                overflow: "visible",
              }}
              codeTagProps={{
                style: {
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  lineHeight: "inherit",
                  whiteSpace: "pre",
                },
              }}
              showLineNumbers={false}
              wrapLongLines={false}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}
