"use client";

import Button from "@components/Button";
import { styled } from "@pigment-css/react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";
import deleteUser from "./actions";

export default function DeleteButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDeleteUser() {
    setLoading(true);
    setError(null);

    try {
      await deleteUser();
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) {
        message = err.message;
      }

      // dashboard and the server action might both try to redirect the user
      // causing a conflict, so ignore next redirect error
      if (message !== "NEXT_REDIRECT") {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <StyledButton
        onClick={() => void handleDeleteUser()}
        disabled={loading}
        variant="primary"
      >
        {loading ? "Deleting Account..." : "Delete Account"}
      </StyledButton>
      <AnimatePresence>
        {error && (
          <motion.p
            style={ErrorMessage}
            variants={ErrorMessageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            Error: {error}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}

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

const ErrorMessage = {
  color: "var(--error-700)",
  fontWeight: 700,
};

const StyledButton = styled(Button)({
  background: "transparent",
  color: "var(--error-400)",
  border: "2px solid var(--error-400)",
  transition: "background-color .25s ease, color .25s ease",

  "&:hover": {
    background: "var(--error-100)",
    color: "var(--text-950)",
  },
});
