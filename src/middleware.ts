import { updateSession } from "@utils/supabase/middleware";

export default updateSession;

export const config = {
  matcher: ["/dashboard", "/login"],
};
