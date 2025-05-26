import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { auth } from "./auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/about",
    "/contact",
    "/learn",
    "/learn/:path*",
    "/profile/:path*",
    "/learn/:path*",
  ],
};
