import { NextResponse } from "next/server";

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

export function middleware(request) {
  const response = NextResponse.next();
  const host = request.headers.get("host") || "";

  if (isStagingHost(host)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
