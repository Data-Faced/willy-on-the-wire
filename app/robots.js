export default function robots() {
  const allowAll = {
    userAgent: "*",
    allow: "/",
  };

  return {
    rules: [
      allowAll,
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
