import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

async function updateSession(request: NextRequest) {
  const res = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env["NEXT_PUBLIC_SUPABASE_URL"]!,
    process.env["NEXT_PUBLIC_SUPABASE_KEY"]!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookies) {
          for (const { name, value, options } of cookies) {
            res.cookies.set(name, value, options);
          }
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const url = request.nextUrl;
  if (!user && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/login";
    return Response.redirect(url);
  }
  if (user && url.pathname.startsWith("/login")) {
    url.pathname = "/dashboard";
    return Response.redirect(url);
  }
  return res;
}
export default updateSession;
