"use client";

import createClient from "@utils/supabase/client";
import { styled } from "@pigment-css/react";
import { useState } from "react";
import Button from "@components/Button";
import { useUser } from "@components/UserProvider";
import { motion, type Variants, AnimatePresence } from "motion/react";

function ClearRecipeButton() {
  const supabase = createClient();
  const user = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function clearRecipesFromDatabase() {
    setLoading(true);
    setError(null);

    try {
      await supabase
        .from("saved_recipes")
        .update({ recipes: [] })
        .eq("user_id", user!.id);
    } catch (err) {
      let errMessage: string = "Unknown Error";
      if (err instanceof Error) {
        errMessage = err.message;
      }

      setError(errMessage);
    }
    setLoading(false);
  }

  return (
    <div>
      <StyledButton
        onClick={() => void clearRecipesFromDatabase()}
        variant="primary"
        disabled={loading}
      >
        {loading ? "Clearing Saved Recipes..." : "Clear Saved Recipes"}
      </StyledButton>
      <AnimatePresence>
        {error && (
          <ErrorMessageElement
            variants={ErrorMessageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {error}
          </ErrorMessageElement>
        )}
      </AnimatePresence>
    </div>
  );
}

const StyledButton = styled(Button)({
  width: "100%",
});

const ErrorMessageVariants: Variants = {
  initial: {
    y: 10,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const ErrorMessageElement = styled(motion.p)({
  color: "var(--error-700)",
  fontWeight: 700,
});

export default ClearRecipeButton;
