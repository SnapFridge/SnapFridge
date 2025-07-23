export function middleware(req: Request) {
  return Response.redirect(process.env["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"]!);
}

export const config = {
  matcher: "/__/auth/handler",
};
