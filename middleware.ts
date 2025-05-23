
import NextAuth from "next-auth";
import authConfig from "./auth.config";

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
