"use client";

import Button from "@components/Button";
import deleteUser from "./actions";
import { useState } from "react";
import { styled } from "@pigment-css/react";

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
      <Button onClick={() => handleDeleteUser()} disabled={loading} variant="primary">
        {loading ? "Deleting Account..." : "Delete Account"}
      </Button>
      {error && <p>Error: {error}</p>}
    </>
  );
}
