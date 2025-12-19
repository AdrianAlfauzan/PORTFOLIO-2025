import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Hanya cek untuk admin routes
  if (path.startsWith("/admin")) {
    // Untuk DEVELOPMENT, comment baris redirect ini
    const adminAuth = request.cookies.get("admin_auth");

    // UNCOMMENT ini untuk enable auth di production
    // if (!adminAuth || adminAuth.value !== "true") {
    //   return NextResponse.redirect(new URL("/guestbook", request.url));
    // }

    console.log("Admin access:", path, "Auth:", adminAuth?.value);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
