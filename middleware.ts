import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Skip middleware for API routes and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Handle root path
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Map paths to query parameters
  if (pathname === "/home") {
    url.pathname = "/";
    url.searchParams.set("route", "home");
    return NextResponse.redirect(url);
  }

  if (pathname === "/login") {
    url.pathname = "/";
    url.searchParams.set("route", "login");
    return NextResponse.redirect(url);
  }

  if (pathname === "/register") {
    url.pathname = "/";
    url.searchParams.set("route", "register");
    return NextResponse.redirect(url);
  }

  if (pathname === "/profile-settings") {
    url.pathname = "/";
    url.searchParams.set("route", "profile-settings");
    return NextResponse.redirect(url);
  }

  if (pathname === "/ai-features") {
    url.pathname = "/";
    url.searchParams.set("route", "ai-features");
    return NextResponse.redirect(url);
  }

  if (pathname === "/culture-content") {
    url.pathname = "/";
    url.searchParams.set("route", "culture-content");
    return NextResponse.redirect(url);
  }

  if (pathname === "/community-forum") {
    url.pathname = "/";
    url.searchParams.set("route", "community-forum");
    return NextResponse.redirect(url);
  }

  // Handle lesson routes
  const lessonMatch = pathname.match(/^\/lesson\/([^/]+)$/);
  if (lessonMatch) {
    const lessonId = lessonMatch[1];
    url.pathname = "/";
    url.searchParams.set("route", "lesson");
    url.searchParams.set("lessonId", lessonId);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
