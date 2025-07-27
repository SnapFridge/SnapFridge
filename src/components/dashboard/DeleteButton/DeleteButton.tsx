"use client";

import Button from "@components/Button";
import deleteUser from "./actions";

export default function DeleteButton() {
  function handleDeleteUser() {
    deleteUser();
  }

  return (
    <>
      <Button onClick={() => handleDeleteUser()}>Delete Account</Button>
    </>
  );
}
