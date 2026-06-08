"use client";

import { useEffect } from "react";
import Section from "@/components/shared/Section";
import CodeBlock from "@/components/ui/CodeBlock";

const interceptorsData = {
  title: "Interceptors",
  description:
    "Interceptors are functions that can modify requests before they are sent or modify responses before they are returned to the caller. This is useful for adding authentication headers, logging, retry logic, error handling, or transforming data globally.",
  details:
    "Request interceptors run in the order they are added. Response interceptors run in the order they are added. You can remove interceptors using the index returned by the use() method.",
  parameters: [
    [
      "interceptor",
      "Callable",
      "Required",
      "Async or sync function that receives config/response and returns modified config/response",
    ],
    [
      "is_response",
      "bool",
      "False",
      "If True, adds to response interceptors; if False, adds to request interceptors",
    ],
  ],
  returns: ["int", "Index of the added interceptor (can be used with eject())"],
  code: `# Request interceptor - adds auth token to every request
async def auth_interceptor(config):
    config.headers['Authorization'] = 'Bearer my-secret-token'
    return config

# Request interceptor - logs each request
async def log_interceptor(config):
    print(f"Request: {config.method} {config.url}")
    return config

# Response interceptor - handles errors globally
async def error_interceptor(response):
    if response.status >= 400:
        print(f"Error {response.status}: {response.status_text}")
    return response

# Register interceptors
client.interceptors.use(auth_interceptor)
client.interceptors.use(log_interceptor)
client.interceptors.use(error_interceptor, is_response=True)

# Remove an interceptor by index
index = client.interceptors.use(some_interceptor)
client.interceptors.eject(index)`,
};

const progressData = {
  title: "Progress Tracking",
  description:
    "Monitor upload and download progress with real-time callbacks. This is essential for large file transfers, providing user feedback and enabling features like progress bars.",
  details:
    "The callback receives two parameters: loaded (bytes transferred so far) and total (total bytes expected, may be 0 if unknown). Progress tracking works with both request bodies (upload) and response bodies (download).",
  parameters: [
    [
      "on_upload_progress",
      "Callable",
      "None",
      "Callback function receiving (loaded, total) for uploads",
    ],
    [
      "on_download_progress",
      "Callable",
      "None",
      "Callback function receiving (loaded, total) for downloads",
    ],
    [
      "response_type",
      "str",
      '"json"',
      'Use "blob" or "stream" for large downloads',
    ],
  ],
  returns: [
    "Response",
    "Response object with data (bytes for blob, async iterator for stream)",
  ],
  code: `def on_upload(loaded, total):
    percent = (loaded / total) * 100 if total > 0 else 0
    print(f"Uploading: {percent:.1f}% ({loaded}/{total} bytes)")

def on_download(loaded, total):
    percent = (loaded / total) * 100 if total > 0 else 0
    print(f"Downloading: {percent:.1f}%")

# Large file upload with progress
with open('large_file.bin', 'rb') as f:
    response = await client.post(
        'https://httpbin.org/post',
        data=f,
        on_upload_progress=on_upload
    )

# Download with progress
response = await client.get(
    'https://httpbin.org/bytes/50000',
    on_download_progress=on_download,
    response_type='blob'
)`,
};

const formDataData = {
  title: "FormData & File Uploads",
  description:
    "Send multipart/form-data requests including both text fields and file uploads. This follows the browser FormData API, making it easy to construct complex form submissions.",
  details:
    "Files can be provided as bytes, file objects, or Path objects. The content-type is automatically detected from file extensions. Multiple values can be appended to the same field name.",
  methods: [
    [
      "append(name, value, filename, content_type)",
      "Adds a new value to the form data",
    ],
    ["delete(name)", "Removes all values for a field"],
    ["get(name)", "Returns the first value for a field"],
    ["get_all(name)", "Returns all values for a field as a list"],
    ["has(name)", "Checks if a field exists"],
    ["keys()", "Returns all field names"],
    ["items()", "Returns all (name, value) pairs"],
  ],
  code: `from atomhttp import AtomHTTP

form = AtomHTTP.FormData()
form.append('username', 'johndoe')
form.append('email', 'john@example.com')
form.append('avatar', open('profile.jpg', 'rb'), filename='profile.jpg')
form.append('document', open('resume.pdf', 'rb'), filename='resume.pdf')

# Supports multiple values for the same field
form.append('tags', 'python')
form.append('tags', 'http')
form.append('tags', 'async')

response = await client.post('https://api.example.com/upload', data=form)`,
};

const concurrentData = {
  title: "Concurrent Requests",
  description:
    "Execute multiple requests in parallel to significantly improve performance when you need to fetch multiple resources. AtomHTTP provides helper utilities similar to Promise.all() from JavaScript.",
  details:
    "The all() method runs all requests concurrently and waits for all to complete. The spread() method allows you to destructure the response array into individual arguments for cleaner callback code.",
  methods: [
    [
      "AtomHTTP.all(tasks)",
      "Execute multiple requests concurrently, returns list of responses",
    ],
    [
      "AtomHTTP.spread(callback, *responses)",
      "Spread responses array to individual callback arguments",
    ],
  ],
  returns: ["List[Response] (all)", "Any (spread - result of callback)"],
  code: `# Using AtomHTTP.all() for concurrent execution
tasks = [
    client.get('/posts/1'),
    client.get('/posts/2'),
    client.get('/posts/3')
]
responses = await AtomHTTP.all(tasks)

for resp in responses:
    print(f"Post {resp.data['id']}: {resp.status}")

# Using spread() to distribute responses to individual arguments
def process_results(res1, res2, res3):
    return {
        'first': res1.data['title'],
        'second': res2.data['title'],
        'third': res3.data['title']
    }

result = await AtomHTTP.spread(process_results, *responses)`,
};

const transformersData = {
  title: "Data Transformers",
  description:
    "Transform request data before sending or response data after receiving. This is useful for normalization, validation, serialization, or adding metadata to all requests/responses.",
  details:
    "transformRequest is called with the request data before it is sent. transformResponse is called with the response data before it is returned to your code. Both can be synchronous or asynchronous functions.",
  parameters: [
    [
      "transformRequest",
      "Callable",
      "None",
      "Function that transforms request data before sending",
    ],
    [
      "transformResponse",
      "Callable",
      "None",
      "Function that transforms response data after receiving",
    ],
  ],
  code: `# Transform request data - convert strings to uppercase
client.defaults.transformRequest = lambda data: data.upper() if isinstance(data, str) else data

# Transform response data - add timestamp and metadata
client.defaults.transformResponse = lambda data: {
    'timestamp': time.time(),
    'content': data,
    'version': 'v2'
} if isinstance(data, dict) else data

response = await client.post('/api/message', data='hello world')
print(response.data)
# {
#     'timestamp': 1700000000,
#     'content': 'hello world',
#     'version': 'v2'
# }`,
};

const authData = {
  title: "Authentication",
  description:
    "Built-in support for standard authentication mechanisms including Basic Authentication and Bearer Token authentication. These handlers automatically format the Authorization header correctly.",
  details:
    "Basic Auth encodes credentials as base64. Bearer Token adds the token directly. Both return a dictionary ready to be merged into request headers. For more complex authentication, you can use request interceptors to add custom headers.",
  classes: [
    [
      "BasicAuth(username, password)",
      "Creates Basic Authentication handler",
      'get_header() returns {"Authorization": "Basic base64..."}',
    ],
    [
      "BearerAuth(token)",
      "Creates Bearer Token handler",
      'get_header() returns {"Authorization": "Bearer token"}',
    ],
  ],
  code: `from atomhttp.auth import BasicAuth, BearerAuth

# Basic Authentication - encodes credentials as base64
basic = BasicAuth('username', 'password')
response = await client.get('https://httpbin.org/basic-auth/username/password',
                           headers=basic.get_header())

# Bearer Token Authentication - adds token directly
bearer = BearerAuth('your-jwt-token-here')
response = await client.get('https://api.example.com/protected',
                           headers=bearer.get_header())

# Using interceptors for complex auth flows
async def oauth_interceptor(config):
    token = await get_oauth_token()
    config.headers['Authorization'] = f'Bearer {token}'
    return config

client.interceptors.use(oauth_interceptor)`,
};

const blobData = {
  title: "Blob & ArrayBuffer",
  description:
    "Handle binary data with different response types. This is essential for working with images, PDFs, audio files, or any other binary data format.",
  details:
    "blob and arraybuffer both return binary data as bytes (arraybuffer is an alias for compatibility). stream returns an async iterator for processing large files without loading entire content into memory.",
  responseTypes: [
    [
      "blob",
      "Returns binary data as bytes",
      "Best for small to medium files (images, PDFs, etc.)",
    ],
    [
      "arraybuffer",
      "Returns binary data as bytes",
      "Alias for blob, for compatibility",
    ],
    [
      "stream",
      "Returns async iterator",
      "Best for very large files (videos, archives, etc.)",
    ],
  ],
  code: `# Download as Blob (bytes) - best for small to medium files
response = await client.get('https://httpbin.org/image/png', response_type='blob')
image_data = response.data  # bytes

# Save to file
with open('image.png', 'wb') as f:
    f.write(image_data)

# Download as ArrayBuffer (alias for blob)
response = await client.get('https://httpbin.org/bytes/10000', response_type='arraybuffer')
binary_data = response.data  # bytes

# Download as Stream - best for very large files
response = await client.get('https://example.com/large-file.zip', response_type='stream')
async for chunk in response.data:
    process_chunk(chunk)`,
};

const limitsData = {
  title: "Limits & Timeouts",
  description:
    "Configure maximum sizes for requests and responses to protect your application from overly large payloads. Set timeouts to prevent hanging requests from blocking your application indefinitely.",
  details:
    "maxBodyLength limits the request body size. maxContentLength limits the response body size. timeout can be set globally and overridden per request. keepAlive reuses connections for better performance. socketPath allows connection via Unix domain sockets instead of TCP/IP.",
  options: [
    [
      "timeout",
      "int/float",
      "30",
      "Request timeout in seconds (total duration)",
    ],
    ["maxRedirects", "int", "5", "Maximum number of redirects to follow"],
    [
      "maxBodyLength",
      "int",
      "-1",
      "Maximum request body size in bytes (-1 = unlimited)",
    ],
    [
      "maxContentLength",
      "int",
      "-1",
      "Maximum response body size in bytes (-1 = unlimited)",
    ],
    [
      "keepAlive",
      "bool",
      "True",
      "Enable HTTP keep-alive connections for connection reuse",
    ],
    [
      "socketPath",
      "str",
      "None",
      "Unix domain socket path (alternative to TCP/IP)",
    ],
    [
      "decompress",
      "bool",
      "True",
      "Automatically decompress gzip/deflate responses",
    ],
  ],
  code: `client = AtomHTTP({
    'timeout': 30,
    'maxRedirects': 5,
    'maxBodyLength': 10 * 1024 * 1024,   # 10MB
    'maxContentLength': 50 * 1024 * 1024, # 50MB
    'keepAlive': True,
    'socketPath': '/var/run/docker.sock',
    'decompress': True
})

# Override timeout for a specific request
response = await client.get('https://slow-api.com', timeout=5)`,
};

const Table = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}) => (
  <div className="overflow-x-auto rounded-xl border border-[#1a1a1a] mb-6">
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-[#1f1f1f]">
          {headers.map((h, i) => (
            <th
              key={i}
              className="text-left py-3 px-4 text-gray-400 font-medium"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-[#141414] last:border-0">
            {row.map((cell, j) => (
              <td key={j} className="py-3 px-4 text-sm text-gray-500">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FeatureSection = ({ data }: { data: any }) => (
  <Section
    id={data.title.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}
    className="scroll-mt-24"
  >
    <div className="mb-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
        {data.title}
      </h2>
      <p className="text-sm sm:text-base text-gray-400 mb-2">
        {data.description}
      </p>
      <p className="text-sm text-gray-500">{data.details}</p>
    </div>

    {data.parameters && (
      <>
        <h4 className="text-sm font-medium text-white mb-2 mt-4">Parameters</h4>
        <Table
          headers={["Parameter", "Type", "Default", "Description"]}
          rows={data.parameters}
        />
      </>
    )}

    {data.methods && (
      <>
        <h4 className="text-sm font-medium text-white mb-2 mt-4">Methods</h4>
        <Table headers={["Method", "Description"]} rows={data.methods} />
      </>
    )}

    {data.classes && (
      <>
        <h4 className="text-sm font-medium text-white mb-2 mt-4">Classes</h4>
        <Table
          headers={["Class", "Description", "Methods"]}
          rows={data.classes}
        />
      </>
    )}

    {data.options && (
      <>
        <h4 className="text-sm font-medium text-white mb-2 mt-4">
          Configuration Options
        </h4>
        <Table
          headers={["Option", "Type", "Default", "Description"]}
          rows={data.options}
        />
      </>
    )}

    {data.responseTypes && (
      <>
        <h4 className="text-sm font-medium text-white mb-2 mt-4">
          Response Types
        </h4>
        <Table
          headers={["Type", "Description", "Use Case"]}
          rows={data.responseTypes}
        />
      </>
    )}

    {data.returns && (
      <div className="mb-4">
        <h4 className="text-sm font-medium text-white mb-2">Returns</h4>
        <div className="text-sm text-gray-400">
          <code className="text-gray-300">{data.returns[0]}</code> —{" "}
          {data.returns[1]}
        </div>
      </div>
    )}

    <h4 className="text-sm font-medium text-white mb-2">Example</h4>
    <CodeBlock language="python" code={data.code} />
  </Section>
);

export default function AdvancedPage() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  const features = [
    interceptorsData,
    progressData,
    formDataData,
    concurrentData,
    transformersData,
    authData,
    blobData,
    limitsData,
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Advanced Features
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          Take full control of your HTTP requests with powerful advanced
          features
        </p>
      </div>

      <div className="space-y-10 sm:space-y-12">
        {features.map((feature) => (
          <FeatureSection key={feature.title} data={feature} />
        ))}
      </div>
    </>
  );
}
