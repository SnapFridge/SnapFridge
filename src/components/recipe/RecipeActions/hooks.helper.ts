import { createClient } from "@utils/supabase/client";
import { useEffect, useState } from "react";

export function useSavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    async function getSavedRecipes() {
      const supabase = createClient();
      const { data } = await supabase.from("saved_recipes").select();
      console.log(data);
    }

    void getSavedRecipes();
  }, []);

  return savedRecipes;
}
