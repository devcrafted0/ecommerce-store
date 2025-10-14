import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const role = req.cookies.get("role")?.value;

  const pathname = req.nextUrl.pathname;

  // Routes that require *any* authenticated user
  const protectedRoutes = ["/users/dashboard", "/users/logout"];
  const isProtected = protectedRoutes.some(path => pathname.startsWith(path));


  const sellerOnlyRoutes = ["/users/dashboard"];
  const isSellerOnly = sellerOnlyRoutes.some(path => pathname.startsWith(path));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isSellerOnly && role !== "seller") {
    return NextResponse.redirect(new URL("/users/switchtoseller", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/users/dashboard/:path*", "/users/logout"],
};