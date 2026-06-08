"use client";

import { useRef, useEffect, useState } from "react";
import Container from "@/components/shared/Container";
import Section from "@/components/shared/Section";
import CodeBlock from "@/components/ui/CodeBlock";
import Logo from "@/components/ui/Logo";
import {
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Cpu,
  Layers,
  BarChart,
  Lock,
  Rocket,
  Check,
  Copy,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Zap,
    title: "HTTP Methods",
    description: "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
    type: "methods",
  },
  {
    icon: Layers,
    title: "Interceptors",
    description: "Request/response middleware with eject support",
    type: "interceptors",
  },
  {
    icon: BarChart,
    title: "Progress Tracking",
    description: "Upload + download realtime callbacks",
    type: "progress",
  },
  {
    icon: Shield,
    title: "Data Types",
    description: "JSON, FormData, Blob, ArrayBuffer, Stream",
    type: "dataTypes",
  },
  {
    icon: Lock,
    title: "Auth Layer",
    description: "Basic, Bearer, custom headers",
    type: "auth",
  },
  {
    icon: Globe,
    title: "Concurrent Requests",
    description: ".all() + .spread() helpers",
    type: "concurrent",
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Keep-Alive, compression, connection pooling",
    type: "performance",
  },
  {
    icon: Cpu,
    title: "Type Hints",
    description: "Full typing support for IDE autocompletion",
    type: "typeHints",
  },
];

const stats = [
  { value: "44+", label: "Built-in Features" },
  { value: "100%", label: "Type Hints Coverage" },
  { value: "1", label: "Core Dependency" },
  { value: "3.8+", label: "Python Version" },
];

const comparisonData = [
  {
    feature: "Async/Await",
    atomhttp: "✓",
    requests: "✗",
    aiohttp: "✓",
    httpx: "✓",
  },
  {
    feature: "Interceptors",
    atomhttp: "✓",
    requests: "✗",
    aiohttp: "Limited",
    httpx: "✓",
  },
  {
    feature: "Upload Progress",
    atomhttp: "✓",
    requests: "✗",
    aiohttp: "✗",
    httpx: "✗",
  },
  {
    feature: "Download Progress",
    atomhttp: "✓",
    requests: "✗",
    aiohttp: "✗",
    httpx: "✗",
  },
  {
    feature: "FormData/File Upload",
    atomhttp: "✓",
    requests: "✓",
    aiohttp: "✓",
    httpx: "✓",
  },
  {
    feature: "Blob/ArrayBuffer",
    atomhttp: "✓",
    requests: "Partial",
    aiohttp: "✓",
    httpx: "✓",
  },
  {
    feature: "Base URL",
    atomhttp: "✓",
    requests: "✗",
    aiohttp: "✗",
    httpx: "✓",
  },
  {
    feature: "Type Hints",
    atomhttp: "Full",
    requests: "Partial",
    aiohttp: "✓",
    httpx: "✓",
  },
  {
    feature: "Feature Count",
    atomhttp: "44+",
    requests: "~30",
    aiohttp: "~35",
    httpx: "~40",
  },
];

const drawRoundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) => {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
};

const safeArc = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) => {
  if (radius > 0) {
    ctx.arc(x, y, radius, startAngle, endAngle);
  }
};

const useFeatureCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  type: string,
) => {
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 80;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;

      if (w === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";

      timeRef.current += 0.02;

      const centerX = w / 2;
      const centerY = h / 2;
      const progress = timeRef.current % 1;
      const waveX = ((timeRef.current * 100) % (w + 50)) - 25;

      if (type === "methods") {
        const methods = ["GET", "POST", "PUT", "DELETE"];
        const spacing = w / (methods.length + 1);

        for (let i = 0; i < methods.length; i++) {
          const x = spacing * (i + 1);
          ctx.beginPath();
          ctx.moveTo(x, h - 20);
          ctx.lineTo(x, 20);
          ctx.stroke();

          ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
          ctx.font = "bold 9px monospace";
          ctx.textAlign = "center";
          ctx.fillText(methods[i], x, h - 8);

          const offset = Math.sin(timeRef.current * 3 + i) * 6;
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(timeRef.current * 2 + i) * 0.2})`;
          safeArc(ctx, x, centerY + offset, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        for (let i = 0; i < 3; i++) {
          const t = (timeRef.current * 2 + i * 2) % 1;
          const x = w * t;
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${0.5 - Math.abs(t - 0.5) * 0.5})`;
          safeArc(ctx, x, centerY, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (type === "interceptors") {
        const levels = [30, w / 2, w - 30];

        for (let i = 0; i < levels.length; i++) {
          ctx.beginPath();
          drawRoundRect(ctx, levels[i] - 18, centerY - 12, 36, 24, 4);
          ctx.stroke();
          ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + Math.sin(timeRef.current * 2 + i) * 0.05})`;
          ctx.fill();
        }

        for (let i = 0; i < levels.length - 1; i++) {
          ctx.beginPath();
          ctx.moveTo(levels[i] + 18, centerY);
          ctx.lineTo(levels[i + 1] - 18, centerY);
          ctx.stroke();

          const arrowX =
            levels[i] + 18 + (levels[i + 1] - levels[i] - 36) * progress;
          ctx.beginPath();
          ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
          safeArc(ctx, arrowX, centerY, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (type === "progress") {
        const barWidth = w - 60;

        ctx.beginPath();
        drawRoundRect(ctx, 30, centerY - 6, barWidth, 12, 6);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        drawRoundRect(ctx, 30, centerY - 6, barWidth * progress, 12, 6);
        ctx.fill();

        const dotX = 30 + barWidth * progress;
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        safeArc(ctx, dotX, centerY, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.font = "8px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`${Math.floor(progress * 100)}%`, dotX, centerY - 8);
      } else if (type === "dataTypes") {
        const icons = ["{ }", '" "', "📄", "🎵"];
        const spacing = w / (icons.length + 1);

        for (let i = 0; i < icons.length; i++) {
          const x = spacing * (i + 1);
          ctx.beginPath();
          drawRoundRect(ctx, x - 14, centerY - 12, 28, 24, 4);
          ctx.stroke();
          ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
          ctx.font = "10px monospace";
          ctx.textAlign = "center";
          ctx.fillText(icons[i], x, centerY + 4);

          const pulse = Math.sin(timeRef.current * 3 + i) * 3;
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(timeRef.current * 2 + i) * 0.2})`;
          const radius = Math.max(0.1, 2 + pulse);
          safeArc(ctx, x, centerY - 14, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (type === "auth") {
        ctx.beginPath();
        safeArc(ctx, centerX, centerY, 16, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        safeArc(ctx, centerX, centerY, 6, 0, Math.PI * 2);
        ctx.fill();

        const angle = timeRef.current * Math.PI * 2;
        const radius = 24;
        const keyX = centerX + Math.cos(angle) * radius;
        const keyY = centerY + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.moveTo(keyX, keyY);
        ctx.lineTo(keyX + 8, keyY - 4);
        ctx.lineTo(keyX + 4, keyY + 4);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        safeArc(ctx, keyX, keyY, 3, 0, Math.PI * 2);
        ctx.fill();
      } else if (type === "concurrent") {
        const lines = 3;
        const spacing = (w - 60) / (lines - 1);

        for (let i = 0; i < lines; i++) {
          const x = 30 + i * spacing;
          ctx.beginPath();
          ctx.moveTo(x, 20);
          ctx.lineTo(x, h - 20);
          ctx.stroke();

          for (let j = 0; j < 3; j++) {
            ctx.beginPath();
            ctx.moveTo(x - 4, 30 + j * 12);
            ctx.lineTo(x + 4, 30 + j * 12);
            ctx.stroke();
          }
        }

        for (let i = 0; i < lines; i++) {
          const yOff = Math.sin(timeRef.current * 3 + i) * 6;
          ctx.beginPath();
          ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
          safeArc(ctx, 30 + i * spacing, centerY + yOff, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (type === "performance") {
        const bars = 8;
        const barWidth = (w - 60) / bars - 3;

        for (let i = 0; i < bars; i++) {
          const height = 8 + Math.sin(timeRef.current * 4 + i) * 12;
          const x = 30 + i * (barWidth + 3);
          ctx.beginPath();
          drawRoundRect(ctx, x, centerY - height / 2, barWidth, height, 3);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + Math.sin(timeRef.current * 2 + i) * 0.15})`;
          ctx.fill();
          ctx.stroke();
        }

        ctx.beginPath();
        for (let x = 0; x < 40; x++) {
          const y = centerY + Math.sin(x * 0.5 + timeRef.current * 8) * 8;
          if (x === 0) ctx.moveTo(waveX + x, y);
          else ctx.lineTo(waveX + x, y);
        }
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.stroke();
      } else if (type === "typeHints") {
        ctx.font = "bold 14px monospace";
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        ctx.textAlign = "center";
        ctx.fillText("T", w / 2 - 20, centerY + 5);
        ctx.fillText("→", w / 2, centerY + 5);
        ctx.fillText("U", w / 2 + 15, centerY + 5);

        const types = ["str", "int", "dict", "list"];
        const spacing = (w - 40) / 4;

        for (let i = 0; i < types.length; i++) {
          const x = 20 + i * spacing + spacing / 2;
          ctx.font = "8px monospace";
          ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + Math.sin(timeRef.current * 2 + i) * 0.1})`;
          ctx.fillText(types[i], x, centerY - 12);

          ctx.beginPath();
          drawRoundRect(ctx, x - 12, centerY - 20, 24, 14, 3);
          ctx.stroke();
        }

        for (let i = 0; i < 2; i++) {
          const t = (timeRef.current * 1.5 + i) % 1;
          const x = w * t;
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${0.3})`;
          safeArc(ctx, x, centerY, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [type]);

  return { timeRef };
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  type,
}: {
  icon: any;
  title: string;
  description: string;
  type: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useFeatureCanvas(canvasRef, type);

  return (
    <div className="group border border-[#1a1a1a] rounded-xl p-5 hover:border-[#2a2a2a] hover:bg-white/[0.02] transition-all duration-300 relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute bottom-0 left-0 w-full pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity"
        style={{ height: "80px" }}
      />
      <div className="relative z-10">
        <Icon className="w-8 h-8 text-gray-400 group-hover:text-white mb-3 transition-colors" />
        <h3 className="text-base font-medium text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const HeroCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;

      if (w === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.01;

      const centerX = w / 2;
      const centerY = h / 2;
      const radius = Math.min(w, h) * 0.3;

      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;

      for (let i = 0; i < 3; i++) {
        const r = radius + i * 20;
        ctx.beginPath();
        safeArc(ctx, centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = 0; i < 12; i++) {
        const angle = ((i * 30 + timeRef.current * 20) * Math.PI) / 180;
        const x1 = centerX + Math.cos(angle) * (radius - 5);
        const y1 = centerY + Math.sin(angle) * (radius - 5);
        const x2 = centerX + Math.cos(angle) * (radius + 25);
        const y2 = centerY + Math.sin(angle) * (radius + 25);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      for (let i = 0; i < 24; i++) {
        const angle = ((i * 15 + timeRef.current * 15) * Math.PI) / 180;
        const x = centerX + Math.cos(angle) * (radius + 10);
        const y = centerY + Math.sin(angle) * (radius + 10);

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + Math.sin(timeRef.current * 3 + i) * 0.05})`;
        safeArc(ctx, x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < 6; i++) {
        const angle = ((i * 60 + timeRef.current * 30) * Math.PI) / 180;
        const x = centerX + Math.cos(angle) * (radius + 35);
        const y = centerY + Math.sin(angle) * (radius + 35);

        const gradient = ctx.createLinearGradient(x - 8, y, x + 8, y);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.3)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.ellipse(x, y, 12, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        safeArc(ctx, x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      safeArc(ctx, centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
};

const ComparisonSection = () => (
  <Section className="py-16">
    <Container>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-3">
          How AtomHTTP compares
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          More features, better performance, and cleaner API than alternatives
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-4 text-gray-400 font-medium">
                Feature
              </th>
              <th className="text-left py-4 px-4 text-white font-semibold">
                AtomHTTP
              </th>
              <th className="text-left py-4 px-4 text-gray-500 font-medium">
                requests
              </th>
              <th className="text-left py-4 px-4 text-gray-500 font-medium">
                aiohttp
              </th>
              <th className="text-left py-4 px-4 text-gray-500 font-medium">
                httpx
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr
                key={index}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-3 px-4 text-gray-300">{row.feature}</td>
                <td className="py-3 px-4 text-emerald-400 font-medium">
                  {row.atomhttp}
                </td>
                <td className="py-3 px-4 text-gray-500">{row.requests}</td>
                <td className="py-3 px-4 text-gray-500">{row.aiohttp}</td>
                <td className="py-3 px-4 text-gray-500">{row.httpx}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  </Section>
);

export default function HomePage() {
  const [pipCopied, setPipCopied] = useState(false);

  const handlePipCopy = async () => {
    await navigator.clipboard.writeText("pip install atomhttp");
    setPipCopied(true);
    setTimeout(() => setPipCopied(false), 2000);
  };

  return (
    <>
      <Section className="pt-32 pb-16 relative overflow-hidden">
        <HeroCanvas />
        <Container>
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full text-sm text-gray-400 mb-6 border border-white/5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              async · type-safe · production ready
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              AtomHTTP
            </h1>
            <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
              Professional asynchronous HTTP client for Python — built for
              modern applications that demand speed, reliability, and developer
              experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                href="/docs/getting-started"
                className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={handlePipCopy}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-medium hover:bg-white/10 transition-colors text-sm sm:text-base group"
              >
                <code className="text-xs sm:text-sm font-mono">
                  pip install atomhttp
                </code>
                {pipCopied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                )}
              </button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-3 sm:p-4 rounded-xl border border-white/5 bg-white/[0.02]"
              >
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-16">
        <Container>
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Everything you need
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
              A complete HTTP client with all the features you expect from a
              modern library
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </Container>
      </Section>

      <ComparisonSection />

      <Section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Get started in seconds
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Simple, intuitive API that feels familiar
              </p>
            </div>
            <CodeBlock
              language="python"
              code={`import asyncio
from atomhttp import AtomHTTP

async def main():
    client = AtomHTTP({
        'baseURL': 'https://jsonplaceholder.typicode.com',
        'timeout': 10
    })
    
    response = await client.get('/posts/1')
    print(f"Status: {response.status}")
    print(f"Title: {response.data['title']}")

asyncio.run(main())`}
            />
            <div className="mt-8 text-center">
              <Link
                href="/docs/getting-started"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
              >
                Read the documentation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16">
        <Container>
          <div className="bg-gradient-to-r from-white/[0.03] to-transparent rounded-2xl p-6 sm:p-8 text-center border border-white/5">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
              Ready to build something great?
            </h3>
            <p className="text-gray-400 text-sm sm:text-base mb-6">
              AtomHTTP is open source and free to use under the MIT license.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/inject3r/atomhttp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 sm:px-5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
              >
                GitHub
              </a>
              <Link
                href="/docs/reference"
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 sm:px-5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
              >
                API Reference
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
