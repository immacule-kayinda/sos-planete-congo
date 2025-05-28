import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { auth } from "./auth";
import { NextRequest, NextResponse } from "next/server";

export default auth((req) => {
  console.log("middleware");
  if (!req.auth && req.nextUrl.pathname !== "/signin") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/", "/learn", "signup", "/signin"],
};
