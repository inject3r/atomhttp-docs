"use client";

import { useEffect } from "react";
import Section from "@/components/shared/Section";
import CodeBlock from "@/components/ui/CodeBlock";

const installationOptions = [
  {
    title: "Basic installation",
    desc: "Minimal setup for production use",
    code: "pip install atomhttp",
  },
  {
    title: "With development dependencies",
    desc: "Includes pytest, black, mypy, ruff for development",
    code: "pip install atomhttp[dev]",
  },
  {
    title: "With testing dependencies only",
    desc: "Only testing tools without linters",
    code: "pip install atomhttp[test]",
  },
];

const quickStartExamples = [
  {
    title: "Basic GET request",
    desc: "Simple request to fetch a single resource",
    code: `import asyncio
from atomhttp import AtomHTTP

async def main():
    client = AtomHTTP()
    
    response = await client.get('https://jsonplaceholder.typicode.com/posts/1')
    print(f"Status: {response.status}")
    print(f"Title: {response.data['title']}")
    print(f"User ID: {response.data['userId']}")
    
    await client.close()

asyncio.run(main())`,
  },
  {
    title: "With configuration",
    desc: "Using baseURL, timeout, and default headers",
    code: `import asyncio
from atomhttp import AtomHTTP

async def main():
    client = AtomHTTP({
        'baseURL': 'https://jsonplaceholder.typicode.com',
        'timeout': 10,
        'headers': {'Accept': 'application/json'}
    })
    
    response = await client.get('/posts', params={'_limit': 5})
    
    for post in response.data:
        print(f"Post {post['id']}: {post['title'][:50]}...")
    
    await client.close()

asyncio.run(main())`,
  },
  {
    title: "POST request with JSON",
    desc: "Creating a new resource",
    code: `import asyncio
from atomhttp import AtomHTTP

async def main():
    client = AtomHTTP({'baseURL': 'https://jsonplaceholder.typicode.com'})
    
    new_post = await client.post('/posts', data={
        'title': 'My Awesome Post',
        'body': 'This is the content of my post',
        'userId': 1
    })
    
    print(f"Created with ID: {new_post.data['id']}")
    print(f"Status: {new_post.status}")
    
    await client.close()

asyncio.run(main())`,
  },
];

const pythonVersions = ["3.8", "3.9", "3.10", "3.11", "3.12", "3.13"];
const operatingSystems = [
  "Windows 10/11",
  "macOS (Intel + Apple Silicon)",
  "Linux (Ubuntu, Debian, CentOS, etc.)",
  "WSL (Windows Subsystem for Linux)",
];

const nextSteps = [
  {
    href: "/docs/core-api",
    title: "Core API →",
    desc: "HTTP methods, response handling, configuration, headers, parameters, and error handling",
  },
  {
    href: "/docs/advanced",
    title: "Advanced Features →",
    desc: "Interceptors, progress tracking, FormData, concurrent requests, and authentication",
  },
  {
    href: "/docs/reference",
    title: "API Reference →",
    desc: "Complete API documentation, comparison charts, and examples",
  },
  {
    href: "https://github.com/inject3r/atomhttp",
    title: "GitHub →",
    desc: "Source code, issues, contributions, and releases",
    external: true,
  },
];

const InfoBox = ({ children }: { children: React.ReactNode }) => (
  <div className="border border-white/10 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent p-6 sm:p-8">
    {children}
  </div>
);

const RequirementCard = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => (
  <div className="border border-white/10 rounded-xl p-5">
    <h3 className="font-medium text-white mb-3">{title}</h3>
    <ul className="space-y-2 text-gray-400 text-sm">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <span className="text-white/60">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const NextStepCard = ({
  href,
  title,
  desc,
  external,
}: {
  href: string;
  title: string;
  desc: string;
  external?: boolean;
}) => {
  const CardContent = () => (
    <>
      <h3 className="font-medium text-white mb-1 group-hover:text-white/80 transition-colors">
        {title}
      </h3>
      <p className="text-xs text-gray-500">{desc}</p>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block border border-white/10 rounded-xl p-4 hover:border-white/30 hover:bg-white/[0.02] transition-all group"
      >
        <CardContent />
      </a>
    );
  }

  return (
    <a
      href={href}
      className="block border border-white/10 rounded-xl p-4 hover:border-white/30 hover:bg-white/[0.02] transition-all group"
    >
      <CardContent />
    </a>
  );
};

export default function GettingStartedPage() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Getting Started
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          Everything you need to start making HTTP requests with AtomHTTP
        </p>
      </div>

      <div className="space-y-10 sm:space-y-12">
        <Section id="overview" className="scroll-mt-24">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              Why AtomHTTP?
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mb-3">
              AtomHTTP is a modern asynchronous HTTP client for Python that
              combines the best features from popular libraries while adding
              unique capabilities like progress tracking, interceptors, and full
              type hints.
            </p>
          </div>
          <InfoBox>
            <p className="text-gray-300 text-base sm:text-lg mb-4">
              AtomHTTP is a modern, feature-rich asynchronous HTTP client
              designed for Python developers who need reliability, flexibility,
              and performance.
            </p>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              With comprehensive built-in features including interceptors,
              progress tracking, multiple response types (JSON, text, blob,
              arraybuffer, stream), FormData support, concurrent request
              helpers, and thorough error handling with standardized error codes
              — AtomHTTP provides everything you need for production-grade HTTP
              communication.
            </p>
          </InfoBox>
        </Section>

        <Section id="installation" className="scroll-mt-24">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              Installation
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mb-3">
              Install AtomHTTP using pip. The library has minimal dependencies
              and works with Python 3.8 and above.
            </p>
          </div>

          <div className="space-y-4">
            {installationOptions.map((opt) => (
              <div key={opt.title}>
                <p className="text-sm text-gray-300 mb-2">
                  {opt.title}:
                  <span className="text-gray-500 text-xs ml-2">{opt.desc}</span>
                </p>
                <CodeBlock language="bash" code={opt.code} />
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-lg">
            <p className="text-white/80 text-sm">
              Requires Python 3.8 or higher
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Core dependency: aiohttp 3.8.0+ (automatically installed)
            </p>
          </div>
        </Section>

        <Section id="quick-start" className="scroll-mt-24">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              Quick Start
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mb-3">
              Create a client instance and start making requests in just a few
              lines of code.
            </p>
          </div>

          <div className="space-y-6">
            {quickStartExamples.map((ex) => (
              <div key={ex.title}>
                <p className="text-sm text-gray-300 mb-2">
                  {ex.title}:
                  <span className="text-gray-500 text-xs ml-2">{ex.desc}</span>
                </p>
                <CodeBlock language="python" code={ex.code} />
              </div>
            ))}
          </div>
        </Section>

        <Section id="requirements" className="scroll-mt-24">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              System Requirements
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mb-3">
              AtomHTTP works on all major operating systems and has minimal
              requirements.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <RequirementCard title="Python Version" items={pythonVersions} />
            <RequirementCard
              title="Operating Systems"
              items={operatingSystems}
            />
          </div>
        </Section>

        <Section id="first-request" className="scroll-mt-24">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              Your First Request
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mb-3">
              Let's make a complete example that demonstrates the most common
              features.
            </p>
          </div>
          <CodeBlock
            language="python"
            code={`import asyncio
from atomhttp import AtomHTTP

async def main():
    # 1. Create client with configuration
    client = AtomHTTP({
        'baseURL': 'https://jsonplaceholder.typicode.com',
        'timeout': 10,
        'headers': {
            'Accept': 'application/json',
            'User-Agent': 'AtomHTTP-Demo/1.0'
        }
    })
    
    # 2. GET request with query parameters
    print("Fetching posts...")
    response = await client.get('/posts', params={'_limit': 3})
    
    print(f"Status: {response.status}")
    print(f"Headers: {dict(list(response.headers.items())[:3])}")
    
    for post in response.data:
        print(f"  Post {post['id']}: {post['title'][:40]}...")
    
    # 3. POST request
    print("\\nCreating a new post...")
    new_post = await client.post('/posts', data={
        'title': 'Hello AtomHTTP!',
        'body': 'This is my first request with AtomHTTP',
        'userId': 1
    })
    
    print(f"Created with ID: {new_post.data['id']}")
    print(f"Response status: {new_post.status}")
    
    # 4. Clean up
    await client.close()
    print("\\nDone!")

if __name__ == "__main__":
    asyncio.run(main())`}
          />
        </Section>

        <Section id="next-steps" className="scroll-mt-24">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              Next Steps
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mb-3">
              Now that you've mastered the basics, explore more advanced
              features.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {nextSteps.map((step) => (
              <NextStepCard
                key={step.href}
                href={step.href}
                title={step.title}
                desc={step.desc}
                external={step.external}
              />
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
