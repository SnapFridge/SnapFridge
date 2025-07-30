"use client";

import { useSearchParams } from "next/navigation";
import useToast from "@components/ToastProvider/UseToast";
import { useEffect } from "react";

function LoginError() {
  const params = useSearchParams();
  const { addError } = useToast();

  useEffect(() => {
    const error = params.get("error");
    if (!error) {
      return;
    }
    addError("Login Error", error);
    history.replaceState(null, "", location.origin + "/login");
  }, []);
}

export default LoginError;
