import { auth } from "./auth";

export default auth((req) => {
  console.log("Middleware - URL:", req.nextUrl.pathname);
  console.log("Middleware - Auth:", req.auth);
  console.log("Bonsoir");

  if (!req.auth && req.nextUrl.pathname !== "/signin") {
    console.log("Middleware - Redirecting to login");
    const newUrl = new URL("/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

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
    "/dashboard/:path*",
  ],
};
