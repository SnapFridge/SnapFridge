"use client";

import Button from "@components/Button";
import { useToast } from "@components/ToastProvider";
import { useUser } from "@components/UserProvider";
import { styled } from "@pigment-css/react";
import createClient from "@utils/supabase/client";
import { useState } from "react";

function ClearRecipeButton() {
  const supabase = createClient();
  const user = useUser();
  const { addToast } = useToast();

  const [pending, setPending] = useState(false);
  async function clearRecipes() {
    setPending(true);
    try {
      await supabase.from("saved_recipes").update({ recipes: [] }).eq("id", user!.id);
    } catch (err) {
      const message = (err instanceof Error && err.message) || "Unknown Error";
      addToast("error", "Error clearing recipes", message);
    }
    setPending(false);
  }

  return (
    <div>
      <StyledButton
        onClick={() => void clearRecipes()}
        variant="primary"
        disabled={pending}
      >
        {pending ? "Clearing Saved Recipes..." : "Clear Saved Recipes"}
      </StyledButton>
    </div>
  );
}

const StyledButton = styled(Button)({
  width: "100%",
});

export default ClearRecipeButton;
