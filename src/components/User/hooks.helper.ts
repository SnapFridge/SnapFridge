import { createClient } from "@utils/supabase/client";
import { useEffect, useState } from "react";

export function useUserImage() {
  const [image, setImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchUserImage = async () => {
      const { data, error } = await createClient().auth.getSession();
      if (error) {
        console.error(error);
      }
      setImage((data.session?.user.user_metadata["avatar_url"] as string) ?? null);
    };
    void fetchUserImage();
  }, []);

  return image;
}

export function useEmail() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmail = async () => {
      const { data, error } = await createClient().auth.getSession();
      if (error) {
        console.error(error);
      }

      setEmail((data.session?.user.user_metadata["email"] as string) ?? null);
    };

    void fetchEmail();
  }, []);

  return email;
}
