import { headers } from "next/headers";

const PRODUCTION_HOSTS = new Set([
  "willyonthewire.com",
  "www.willyonthewire.com",
]);

function isStagingHost(host) {
  if (!host) return false;
  const hostname = host.split(":")[0].toLowerCase();
  if (PRODUCTION_HOSTS.has(hostname)) return false;
  return hostname.includes("staging") || hostname.endsWith(".vercel.app");
}

export default async function robots() {
  const headerList = await headers();
  const host = headerList.get("host") || "";
  const staging = isStagingHost(host);

  if (staging) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      host: `https://${host.split(":")[0]}`,
    };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: "https://willyonthewire.com/sitemap.xml",
    host: "https://willyonthewire.com",
  };
}
