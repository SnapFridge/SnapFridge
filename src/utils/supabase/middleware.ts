import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(req: NextRequest) {
  const res = NextResponse.next({
    request: req,
  });
  const reqCookies = req.cookies.getAll();
  for (const { name, value } of reqCookies) {
    res.cookies.set(name, value);
  }
  const supabase = createServerClient(
    process.env["NEXT_PUBLIC_SUPABASE_URL"]!,
    process.env["NEXT_PUBLIC_SUPABASE_KEY"]!,
    {
      cookies: {
        getAll() {
          return reqCookies;
        },
        setAll(cookies) {
          for (const { name, value, options } of cookies) {
            res.cookies.set(name, value, options);
          }
        },
      },
    }
  );

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  const url = req.nextUrl;
  if (!user && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/login";
    return Response.redirect(url);
  }
  if (user && url.pathname.startsWith("/login")) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url, res);
  }
  return res;
}
