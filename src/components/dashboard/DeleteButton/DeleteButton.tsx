import Button from "@components/Button";
import deleteUser from "./actions";
import { useState } from "react";

export default function DeleteButton() {
  const [loading, setLoading] = useState(false);

  async function handleDeleteUser() {
    await deleteUser();
  }

  return (
    <>
      <Button onClick={() => handleDeleteUser()}>Delete Account</Button>
    </>
  );
}
