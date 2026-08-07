import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhook/clerk",
    "/icon.svg",
    "/favicon.svg",
    "/assets/(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
  ],
  ignoredRoutes: [
    "/api/webhook/clerk",
    "/icon.svg",
    "/favicon.svg",
    "/assets/(.*)",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};