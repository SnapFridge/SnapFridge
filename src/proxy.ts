export { default as proxy } from "@utils/supabase/proxy";

export const config = {
  matcher: ["/dashboard", "/login", "/recipe/:path*"],
};
