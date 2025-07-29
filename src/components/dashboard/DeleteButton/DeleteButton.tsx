"use client";

import Button from "@components/Button";
import deleteUser from "./actions";
import { useState } from "react";
import { motion, type Variants, AnimatePresence } from "motion/react";
import "./Button.css";

export default function DeleteButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDeleteUser() {
    setLoading(true);
    setError(null);

    try {
      await deleteUser();
    } catch (err: any) {
      // dashboard and the server action might both try to redirect the user
      // causing a conflict, so ignore next redirect error

      // rylex i know you want to delete this, but it shows the redirect error guaranteed without it
      if (err.message !== "NEXT_REDIRECT") {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* apparently you can't use :hover with regular js objects so moved style to a vanilla CSS file */}
      {/* empty style object to override Button's default styling and to prevent errors */}
      <Button
        onClick={() => handleDeleteUser()}
        disabled={loading}
        variant="primary"
        className="delete-button"
        style={{}}
      >
        {loading ? "Deleting Account..." : "Delete Account"}
      </Button>
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
  fontWeight: "bold",
};

/*
const ButtonCSS = {
  backgroundColor: "transparent",
  color: "var(--error-400)",
  border: "2px solid var(--error-400)",

  "&:hover:not(:disabled)": {
    backgroundColor: "var(--error-100)",
  },
};
*/
