import { type User } from "@supabase/supabase-js";
import { createClient } from "@utils/supabase/client";
import { useState, useEffect } from "react";

function useUser() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
        error,
      } = await createClient().auth.getSession();
      if (error || session === null) {
        return;
      }
      setUser(session.user);
    };

    void getUser();
  }, []);

  return user;
}

export default useUser;
