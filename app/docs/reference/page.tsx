"use client";

import { useState } from "react";
import {
  Zap,
  RotateCcw,
  CheckCircle,
  XCircle,
  Upload,
  Download,
  Shield,
  FileJson,
  FileText,
  File,
  Wind,
} from "lucide-react";
import Section from "@/components/shared/Section";
import CodeBlock from "@/components/ui/CodeBlock";

type TabId = "fast" | "requests" | "aiohttp" | "httpx";

interface Tab {
  id: TabId;
  label: string;
  badge?: React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: "fast",
    label: "AtomHTTP",
    badge: <CheckCircle className="w-3 h-3 text-white font-bold" />,
  },
  {
    id: "requests",
    label: "requests",
    badge: <XCircle className="w-3 h-3 text-gray-500" />,
  },
  {
    id: "aiohttp",
    label: "aiohttp",
    badge: <XCircle className="w-3 h-3 text-gray-500" />,
  },
  {
    id: "httpx",
    label: "httpx",
    badge: <XCircle className="w-3 h-3 text-gray-500" />,
  },
];

interface FeatureComparison {
  feature: string;
  fast: string;
  requests: string;
  aiohttp: string;
  httpx: string;
}

const featureData: Record<
  string,
  {
    fast: string;
    requests: string;
    aiohttp: string;
    httpx: string;
    description: string;
  }
> = {
  progress: {
    fast: "Full support with callbacks",
    requests: "No progress support",
    aiohttp: "No progress support",
    httpx: "No progress support",
    description:
      "Upload and download progress tracking with real-time callbacks",
  },
  concurrent: {
    fast: "Built-in .all() and .spread()",
    requests: "Requires ThreadPoolExecutor",
    aiohttp: "Yes (manual asyncio.gather)",
    httpx: "Yes (manual asyncio.gather)",
    description: "Execute multiple requests in parallel",
  },
  validation: {
    fast: "Built-in validateStatus",
    requests: "Manual check required",
    aiohttp: "Manual check required",
    httpx: "Manual check required",
    description: "Automatic HTTP status code validation",
  },
  blob: {
    fast: "response_type='blob'",
    requests: "response.content",
    aiohttp: "response.read()",
    httpx: "response.content",
    description: "Binary data handling (images, PDFs, etc.)",
  },
  interceptors: {
    fast: "Full request/response interceptors",
    requests: "No interceptor support",
    aiohttp: "No interceptor support",
    httpx: "Limited middleware",
    description: "Modify requests/responses globally",
  },
  headers: {
    fast: "Simple and clean",
    requests: "Simple",
    aiohttp: "Yes",
    httpx: "Yes",
    description: "Custom headers support",
  },
};

const codeExamples: Record<TabId, Record<string, string>> = {
  fast: {
    progress: `import asyncio
from atomhttp import AtomHTTP

def on_upload(loaded, total):
    percent = (loaded / total) * 100
    print(f"Upload: {percent:.1f}% ({loaded}/{total} bytes)")

async def upload_file():
    client = AtomHTTP({'baseURL': 'https://httpbin.org'})

    with open('test.txt', 'rb') as f:
        resp = await client.post(
            '/post',
            data=f,
            on_upload_progress=on_upload
        )

    print("AtomHTTP Status:", resp.status)
    await client.close()

asyncio.run(upload_file())`,
    concurrent: `import asyncio
from atomhttp import AtomHTTP

async def fetch_posts():
    client = AtomHTTP({'baseURL': 'https://jsonplaceholder.typicode.com'})
    
    tasks = [
        client.get('/posts/1'),
        client.get('/posts/2'),
        client.get('/posts/3')
    ]
    
    responses = await AtomHTTP.all(tasks)
    
    for resp in responses:
        print(f"AtomHTTP: Post {resp.data['id']} → {resp.data['title'][:30]}...")
    
    await client.close()

asyncio.run(fetch_posts())`,
    validation: `import asyncio
from atomhttp import AtomHTTP
from atomhttp.errors import AtomHTTPRequestError

async def check_status():
    client = AtomHTTP({
        'baseURL': 'https://httpbin.org',
        'validateStatus': lambda status: status == 200
    })
    
    try:
        resp1 = await client.get('/status/200')
        print(f"AtomHTTP: Status {resp1.status} OK")
        
        resp2 = await client.get('/status/404')
        print(f"This won't print")
        
    except AtomHTTPRequestError as e:
        print(f"AtomHTTP: Request failed with status {e.response.status}")
    
    await client.close()

asyncio.run(check_status())`,
    blob: `import asyncio
from atomhttp import AtomHTTP

async def download_image():
    client = AtomHTTP()
    
    response = await client.get(
        'https://httpbin.org/image/png',
        response_type='blob'
    )
    
    with open('atomhttp_image.png', 'wb') as f:
        f.write(response.data)
    
    print(f"AtomHTTP: Saved {len(response.data)} bytes")
    await client.close()

asyncio.run(download_image())`,
    interceptors: `import asyncio
from atomhttp import AtomHTTP

async def main():
    client = AtomHTTP()
    
    async def log_interceptor(config):
        print(f"Request: {config.method} {config.url}")
        return config
    
    client.interceptors.use(log_interceptor)
    
    response = await client.get('https://httpbin.org/get')
    await client.close()

asyncio.run(main())`,
    headers: `import asyncio
from atomhttp import AtomHTTP

async def custom_headers():
    client = AtomHTTP()
    
    response = await client.get(
        'https://httpbin.org/headers',
        headers={
            'Authorization': 'Bearer my-token-123',
            'X-Custom-Header': 'my-value'
        }
    )
    
    headers = response.data.get('headers', {})
    print(f"AtomHTTP: Authorization = {headers.get('Authorization')}")
    await client.close()

asyncio.run(custom_headers())`,
  },
  requests: {
    progress: `import requests

def upload_file():
    with open('test.txt', 'rb') as f:
        resp = requests.post(
            'https://httpbin.org/post',
            data=f
        )
    print("requests Status:", resp.status_code)

upload_file()`,
    concurrent: `import requests
from concurrent.futures import ThreadPoolExecutor

def fetch_post(post_id):
    resp = requests.get(f'https://jsonplaceholder.typicode.com/posts/{post_id}')
    return resp.json()

def fetch_all():
    with ThreadPoolExecutor(max_workers=3) as executor:
        results = list(executor.map(fetch_post, [1, 2, 3]))
    
    for data in results:
        print(f"requests: Post {data['id']} → {data['title'][:30]}...")

fetch_all()`,
    validation: `import requests

def check_status():
    urls = [
        'https://httpbin.org/status/200',
        'https://httpbin.org/status/404'
    ]
    
    for url in urls:
        resp = requests.get(url)
        if resp.status_code == 200:
            print(f"requests: Status {resp.status_code} OK")
        else:
            print(f"requests: Status {resp.status_code} failed")

check_status()`,
    blob: `import requests

def download_image():
    response = requests.get('https://httpbin.org/image/png')
    
    with open('requests_image.png', 'wb') as f:
        f.write(response.content)
    
    print(f"requests: Saved {len(response.content)} bytes")

download_image()`,
    interceptors: `import requests

# No built-in interceptor support
# Would need custom wrapper classes

def fetch():
    response = requests.get('https://httpbin.org/get')
    print(response.status_code)

fetch()`,
    headers: `import requests

def custom_headers():
    response = requests.get(
        'https://httpbin.org/headers',
        headers={
            'Authorization': 'Bearer my-token-123',
            'X-Custom-Header': 'my-value'
        }
    )
    
    headers = response.json().get('headers', {})
    print(f"requests: Authorization = {headers.get('Authorization')}")

custom_headers()`,
  },
  aiohttp: {
    progress: `import asyncio
import aiohttp

async def upload_file():
    with open('test.txt', 'rb') as f:
        data = f.read()
    
    async with aiohttp.ClientSession() as session:
        async with session.post(
            'https://httpbin.org/post',
            data=data
        ) as resp:
            print("aiohttp Status:", resp.status)

asyncio.run(upload_file())`,
    concurrent: `import asyncio
import aiohttp

async def fetch_post(session, post_id):
    async with session.get(f'https://jsonplaceholder.typicode.com/posts/{post_id}') as resp:
        return await resp.json()

async def fetch_all():
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_post(session, i) for i in range(1, 4)]
        results = await asyncio.gather(*tasks)
        
        for data in results:
            print(f"aiohttp: Post {data['id']} → {data['title'][:30]}...")

asyncio.run(fetch_all())`,
    validation: `import asyncio
import aiohttp

async def check_status():
    async with aiohttp.ClientSession() as session:
        for code in [200, 404]:
            async with session.get(f'https://httpbin.org/status/{code}') as resp:
                if resp.status == 200:
                    print(f"aiohttp: Status {resp.status} OK")
                else:
                    print(f"aiohttp: Status {resp.status} failed")

asyncio.run(check_status())`,
    blob: `import asyncio
import aiohttp

async def download_image():
    async with aiohttp.ClientSession() as session:
        async with session.get('https://httpbin.org/image/png') as response:
            data = await response.read()
            
            with open('aiohttp_image.png', 'wb') as f:
                f.write(data)
            
            print(f"aiohttp: Saved {len(data)} bytes")

asyncio.run(download_image())`,
    interceptors: `import asyncio
import aiohttp

# No built-in interceptor support
# Would need custom middleware

async def fetch():
    async with aiohttp.ClientSession() as session:
        async with session.get('https://httpbin.org/get') as resp:
            print(resp.status)

asyncio.run(fetch())`,
    headers: `import asyncio
import aiohttp

async def custom_headers():
    async with aiohttp.ClientSession() as session:
        async with session.get(
            'https://httpbin.org/headers',
            headers={
                'Authorization': 'Bearer my-token-123',
                'X-Custom-Header': 'my-value'
            }
        ) as response:
            data = await response.json()
            headers = data.get('headers', {})
            print(f"aiohttp: Authorization = {headers.get('Authorization')}")

asyncio.run(custom_headers())`,
  },
  httpx: {
    progress: `import asyncio
import httpx

async def upload_file():
    with open('test.txt', 'rb') as f:
        data = f.read()
    
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            'https://httpbin.org/post',
            content=data
        )
        print("httpx Status:", resp.status_code)

asyncio.run(upload_file())`,
    concurrent: `import asyncio
import httpx

async def fetch_post(client, post_id):
    resp = await client.get(f'https://jsonplaceholder.typicode.com/posts/{post_id}')
    return resp.json()

async def fetch_all():
    async with httpx.AsyncClient() as client:
        tasks = [fetch_post(client, i) for i in range(1, 4)]
        results = await asyncio.gather(*tasks)
        
        for data in results:
            print(f"httpx: Post {data['id']} → {data['title'][:30]}...")

asyncio.run(fetch_all())`,
    validation: `import asyncio
import httpx

async def check_status():
    async with httpx.AsyncClient() as client:
        for code in [200, 404]:
            resp = await client.get(f'https://httpbin.org/status/{code}')
            if resp.status_code == 200:
                print(f"httpx: Status {resp.status_code} OK")
            else:
                print(f"httpx: Status {resp.status_code} failed")

asyncio.run(check_status())`,
    blob: `import asyncio
import httpx

async def download_image():
    async with httpx.AsyncClient() as client:
        response = await client.get('https://httpbin.org/image/png')
        data = response.content
        
        with open('httpx_image.png', 'wb') as f:
            f.write(data)
        
        print(f"httpx: Saved {len(data)} bytes")

asyncio.run(download_image())`,
    interceptors: `import asyncio
import httpx

# Limited middleware support (event hooks)

async def fetch():
    async with httpx.AsyncClient() as client:
        response = await client.get('https://httpbin.org/get')
        print(response.status_code)

asyncio.run(fetch())`,
    headers: `import asyncio
import httpx

async def custom_headers():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            'https://httpbin.org/headers',
            headers={
                'Authorization': 'Bearer my-token-123',
                'X-Custom-Header': 'my-value'
            }
        )
        
        headers = response.json().get('headers', {})
        print(f"httpx: Authorization = {headers.get('Authorization')}")

asyncio.run(custom_headers())`,
  },
};

const comparisonTableData: FeatureComparison[] = [
  {
    feature: "Async/Await",
    fast: "✓",
    requests: "✓",
    aiohttp: "✓",
    httpx: "✓",
  },
  {
    feature: "Upload Progress",
    fast: "✓",
    requests: "✗",
    aiohttp: "✗",
    httpx: "✗",
  },
  {
    feature: "Download Progress",
    fast: "✓",
    requests: "✗",
    aiohttp: "✗",
    httpx: "✗",
  },
  {
    feature: "Interceptors",
    fast: "Full",
    requests: "✗",
    aiohttp: "✗",
    httpx: "Limited",
  },
  {
    feature: "validateStatus",
    fast: "Built-in",
    requests: "✗",
    aiohttp: "✗",
    httpx: "✗",
  },
  {
    feature: "Blob/ArrayBuffer",
    fast: "response_type",
    requests: "content",
    aiohttp: "read()",
    httpx: "content",
  },
  { feature: "Base URL", fast: "✓", requests: "✓", aiohttp: "✓", httpx: "✓" },
  {
    feature: "Concurrent Helpers",
    fast: ".all()/.spread()",
    requests: "ThreadPool",
    aiohttp: "manual",
    httpx: "manual",
  },
  {
    feature: "Type Hints",
    fast: "Full",
    requests: "Partial",
    aiohttp: "✓",
    httpx: "✓",
  },
];

const starStyles = `
  .stars-container {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }
  
  .star {
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 50%;
    opacity: 0;
    animation: twinkle 3s infinite ease-in-out;
  }
  
  .star.medium {
    width: 1.5px;
    height: 1.5px;
  }
  
  .star.small {
    width: 1px;
    height: 1px;
  }
  
  @keyframes twinkle {
    0%, 100% {
      opacity: 0;
      transform: scale(0.5);
    }
    50% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ComparisonTable = () => {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size:
      Math.random() > 0.7 ? "medium" : Math.random() > 0.4 ? "small" : "normal",
    delay: Math.random() * 4,
    duration: 1.5 + Math.random() * 2.5,
  }));

  return (
    <div className="overflow-x-auto rounded-xl border border-[#1a1a1a] mb-8">
      <style>{starStyles}</style>
      <table className="w-full border-collapse min-w-150">
        <thead>
          <tr className="border-b border-[#1f1f1f] bg-[#0a0a0a]">
            <th className="text-left py-3 px-4 text-gray-400 font-medium">
              Feature
            </th>
            <th className="text-left py-3 px-4 relative overflow-hidden bg-[#0a0a0a]">
              <div className="stars-container absolute inset-0 pointer-events-none">
                {stars.map((star) => (
                  <div
                    key={star.id}
                    className={`star ${star.size}`}
                    style={{
                      left: `${star.left}%`,
                      top: `${star.top}%`,
                      animationDelay: `${star.delay}s`,
                      animationDuration: `${star.duration}s`,
                    }}
                  />
                ))}
              </div>
              <span className="relative z-10 text-white font-bold">
                AtomHTTP
              </span>
            </th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium bg-[#0a0a0a]">
              requests
            </th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium bg-[#0a0a0a]">
              aiohttp
            </th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium bg-[#0a0a0a]">
              httpx
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisonTableData.map((row, i) => (
            <tr
              key={i}
              className="border-b border-[#141414] hover:bg-white/2 transition-colors"
            >
              <td className="py-3 px-4 text-gray-300 text-sm font-medium">
                {row.feature}
              </td>
              <td className="py-3 px-4 text-white font-bold text-sm relative bg-[#0a0a0a]/30">
                {row.fast === "✓" ? (
                  <CheckCircle className="w-4 h-4 text-white font-bold inline" />
                ) : row.fast === "✗" ? (
                  <XCircle className="w-4 h-4 text-gray-500 inline" />
                ) : (
                  row.fast
                )}
              </td>
              <td className="py-3 px-4 text-gray-500 text-sm">
                {row.requests === "✓" ? (
                  <CheckCircle className="w-4 h-4 text-gray-500 inline" />
                ) : row.requests === "✗" ? (
                  <XCircle className="w-4 h-4 text-gray-500 inline" />
                ) : (
                  row.requests
                )}
              </td>
              <td className="py-3 px-4 text-gray-500 text-sm">
                {row.aiohttp === "✓" ? (
                  <CheckCircle className="w-4 h-4 text-gray-500 inline" />
                ) : row.aiohttp === "✗" ? (
                  <XCircle className="w-4 h-4 text-gray-500 inline" />
                ) : (
                  row.aiohttp
                )}
              </td>
              <td className="py-3 px-4 text-gray-500 text-sm">
                {row.httpx === "✓" ? (
                  <CheckCircle className="w-4 h-4 text-gray-500 inline" />
                ) : row.httpx === "✗" ? (
                  <XCircle className="w-4 h-4 text-gray-500 inline" />
                ) : (
                  row.httpx
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const FeatureTabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: TabId;
  setActiveTab: (id: TabId) => void;
}) => (
  <div className="flex flex-wrap gap-2 border-b border-[#1a1a1a] mb-6">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-t-lg font-medium transition-all duration-200 ${
          activeTab === tab.id
            ? "bg-[#1a1a1a] text-white border-t border-x border-[#2a2a2a]"
            : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
        }`}
      >
        <span>{tab.label}</span>
        <span className="text-xs ml-1">{tab.badge}</span>
      </button>
    ))}
  </div>
);

const FeatureCard = ({
  title,
  description,
  activeTab,
  featureKey,
}: {
  title: string;
  description: string;
  activeTab: TabId;
  featureKey: string;
}) => (
  <div className="border border-[#1a1a1a] rounded-xl p-5 hover:border-[#2a2a2a] transition-all">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <span
        className={`text-sm px-2 py-0.5 rounded-full ${
          activeTab === "fast"
            ? "bg-white/20 text-white font-bold"
            : "bg-gray-500/20 text-gray-400"
        }`}
      >
        {activeTab === "fast"
          ? "Supported"
          : activeTab === "requests"
            ? "Not Supported"
            : "Limited"}
      </span>
    </div>
    <p className="text-gray-400 text-sm mb-4">{description}</p>
    <CodeBlock language="python" code={codeExamples[activeTab][featureKey]} />
  </div>
);

export default function ReferencePage() {
  const [activeTab, setActiveTab] = useState<TabId>("fast");

  const features = [
    {
      key: "progress",
      title: "Upload Progress Tracking",
      description: featureData.progress.description,
    },
    {
      key: "concurrent",
      title: "Concurrent Requests",
      description: featureData.concurrent.description,
    },
    {
      key: "validation",
      title: "Status Validation",
      description: featureData.validation.description,
    },
    {
      key: "blob",
      title: "Binary Data (Blob)",
      description: featureData.blob.description,
    },
    {
      key: "interceptors",
      title: "Request/Response Interceptors",
      description: featureData.interceptors.description,
    },
    {
      key: "headers",
      title: "Custom Headers",
      description: featureData.headers.description,
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Reference
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          Complete API reference, comparisons, and practical examples
        </p>
      </div>

      <div className="space-y-10 sm:space-y-12">
        <Section id="comparison" className="scroll-mt-24">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              Comparison with Other Libraries
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mb-3">
              AtomHTTP delivers the broadest feature set among Python HTTP
              clients: progress callbacks, full interceptor chain, concurrent
              helpers, Blob/ArrayBuffer support, and fine‑grained limits — all
              with a clean, modern API.
            </p>
          </div>

          <ComparisonTable />

          <div className="p-4 rounded-xl border border-[#1a1a1a]">
            <p className="text-gray-400 text-sm">
              <span className="text-white font-bold">AtomHTTP</span> combines
              the best features from existing libraries while adding unique
              capabilities like progress tracking, a full interceptor system,
              and comprehensive type hints. It is the only Python HTTP client
              that provides upload/download progress callbacks out of the box.
            </p>
          </div>
        </Section>

        <Section id="feature-comparison" className="scroll-mt-24">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              Feature Comparison
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mb-3">
              Compare AtomHTTP with other popular HTTP clients side by side.
              Each tab shows the same feature implemented in different
              libraries.
            </p>
          </div>

          <FeatureTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="space-y-6">
            {features.map((feature) => (
              <FeatureCard
                key={feature.key}
                title={feature.title}
                description={feature.description}
                activeTab={activeTab}
                featureKey={feature.key}
              />
            ))}
          </div>
        </Section>

        <Section id="why-atomhttp" className="scroll-mt-24">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              Why AtomHTTP Stands Out
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mb-3">
              AtomHTTP is the only library that combines all these features in
              one package:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-white/20 rounded-xl p-4 bg-white/5">
              <Upload className="text-white font-bold w-5 h-5 mb-2" />
              <h3 className="font-medium text-white mb-1">Upload Progress</h3>
              <p className="text-xs text-gray-500">
                Real-time upload progress callbacks
              </p>
            </div>
            <div className="border border-white/20 rounded-xl p-4 bg-white/5">
              <Download className="text-white font-bold w-5 h-5 mb-2" />
              <h3 className="font-medium text-white mb-1">Download Progress</h3>
              <p className="text-xs text-gray-500">
                Track download progress with ease
              </p>
            </div>
            <div className="border border-white/20 rounded-xl p-4 bg-white/5">
              <RotateCcw className="text-white font-bold w-5 h-5 mb-2" />
              <h3 className="font-medium text-white mb-1">Interceptors</h3>
              <p className="text-xs text-gray-500">
                Request/response middleware
              </p>
            </div>
            <div className="border border-white/20 rounded-xl p-4 bg-white/5">
              <Shield className="text-white font-bold w-5 h-5 mb-2" />
              <h3 className="font-medium text-white mb-1">Status Validation</h3>
              <p className="text-xs text-gray-500">Built-in validateStatus</p>
            </div>
            <div className="border border-white/20 rounded-xl p-4 bg-white/5">
              <Zap className="text-white font-bold w-5 h-5 mb-2" />
              <h3 className="font-medium text-white mb-1">
                Concurrent Helpers
              </h3>
              <p className="text-xs text-gray-500">
                .all() and .spread() methods
              </p>
            </div>
            <div className="border border-white/20 rounded-xl p-4 bg-white/5">
              <File className="text-white font-bold w-5 h-5 mb-2" />
              <h3 className="font-medium text-white mb-1">Blob/ArrayBuffer</h3>
              <p className="text-xs text-gray-500">
                Simple binary data handling
              </p>
            </div>
          </div>

          <div className="mt-6 p-5 rounded-xl border border-white/20 bg-white/5">
            <p className="text-gray-300 text-sm leading-relaxed">
              <span className="text-white font-bold">AtomHTTP</span> is the only
              Python HTTP client that can handle
              <span className="text-white">
                {" "}
                file uploads with progress tracking
              </span>
              ,
              <span className="text-white">
                {" "}
                concurrent requests with .all()/.spread()
              </span>
              ,<span className="text-white"> automatic status validation</span>,
              <span className="text-white">
                {" "}
                binary data with response_type="blob"
              </span>
              ,
              <span className="text-white">
                {" "}
                and request/response interceptors
              </span>{" "}
              — all in a single library.
            </p>
          </div>
        </Section>

        <Section id="api-methods" className="scroll-mt-24">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              API Methods Reference
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mb-3">
              Complete reference of all available methods on the AtomHTTP client
              and helper functions.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#1a1a1a]">
            <table className="w-full border-collapse min-w-175">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Method
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Example
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#141414] hover:bg-white/2 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs text-gray-300">
                    client.get(url, params)
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    HTTP GET request
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-gray-600">
                    await client.get("/users")
                  </td>
                </tr>
                <tr className="border-b border-[#141414] hover:bg-white/2 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs text-gray-300">
                    client.post(url, data)
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    HTTP POST request
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-gray-600">
                    await client.post("/users", data={"{...}"})
                  </td>
                </tr>
                <tr className="border-b border-[#141414] hover:bg-white/2 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs text-gray-300">
                    AtomHTTP.all(tasks)
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    Execute concurrent requests
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-gray-600">
                    responses = await AtomHTTP.all(tasks)
                  </td>
                </tr>
                <tr className="border-b border-[#141414] hover:bg-white/2 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs text-gray-300">
                    client.close()
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    Clean up resources
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-gray-600">
                    await client.close()
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="error-codes" className="scroll-mt-24">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              Error Codes Reference
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mb-3">
              AtomHTTP provides standardized error codes for programmatic error
              handling.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#1a1a1a]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Error Code
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Exception Type
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#141414] hover:bg-white/2 transition-colors">
                  <td className="py-3 px-4 font-mono text-sm text-gray-300">
                    ERR_BAD_REQUEST
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    Bad request (4xx) or malformed request
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    AtomHTTPRequestError
                  </td>
                </tr>
                <tr className="border-b border-[#141414] hover:bg-white/2 transition-colors">
                  <td className="py-3 px-4 font-mono text-sm text-gray-300">
                    ERR_NETWORK
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    Network connectivity issues
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    AtomHTTPNetworkError
                  </td>
                </tr>
                <tr className="border-b border-[#141414] hover:bg-white/2 transition-colors">
                  <td className="py-3 px-4 font-mono text-sm text-gray-300">
                    ECONNABORTED
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    Request exceeded timeout limit
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    AtomHTTPTimeoutError
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="response-types" className="scroll-mt-24">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              Response Types
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mb-3">
              AtomHTTP supports multiple response types for different use cases.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-[#1a1a1a] rounded-xl p-4 hover:border-[#2a2a2a] transition-all">
              <div className="flex items-center gap-2 mb-2">
                <FileJson className="text-white font-bold w-4 h-4" />
                <code className="text-sm font-mono text-white font-bold">
                  json
                </code>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Parse response as JSON (dict/list). Default option for API
                calls.
              </p>
            </div>
            <div className="border border-[#1a1a1a] rounded-xl p-4 hover:border-[#2a2a2a] transition-all">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="text-white font-bold w-4 h-4" />
                <code className="text-sm font-mono text-white font-bold">
                  text
                </code>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Return response as plain text string. Good for HTML, CSV, plain
                text.
              </p>
            </div>
            <div className="border border-[#1a1a1a] rounded-xl p-4 hover:border-[#2a2a2a] transition-all">
              <div className="flex items-center gap-2 mb-2">
                <File className="text-white font-bold w-4 h-4" />
                <code className="text-sm font-mono text-white font-bold">
                  blob
                </code>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Return response as bytes. Perfect for images, PDFs, ZIP files.
              </p>
            </div>
            <div className="border border-[#1a1a1a] rounded-xl p-4 hover:border-[#2a2a2a] transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="text-white font-bold w-4 h-4" />
                <code className="text-sm font-mono text-white font-bold">
                  stream
                </code>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Return async iterator. Best for very large files and video
                streaming.
              </p>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
