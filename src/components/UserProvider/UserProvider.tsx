"use client";

import { type User } from "@supabase/supabase-js";
import createClient from "@utils/supabase/client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

const UserContext = createContext<User | undefined>(undefined);

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User>();

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

  useEffect(() => void getUser(), []);

  return <UserContext value={user}>{children}</UserContext>;
}

export function useUser() {
  return useContext(UserContext);
}
