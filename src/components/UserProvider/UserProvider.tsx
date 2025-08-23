"use client";

import type { User } from "@supabase/supabase-js";
import createClient from "@utils/supabase/client";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

const UserContext = createContext<User | undefined>(undefined);

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function getUser() {
      const {
        data: { session },
        error,
      } = await createClient().auth.getSession();
      if (error || session === null) {
        return;
      }
      setUser(session.user);
    }
    getUser();
  });

  return <UserContext value={user}>{children}</UserContext>;
}

export function useUser() {
  return useContext(UserContext);
}
