"use client";

import { useToast } from "@components/ToastProvider";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function LoginError(): undefined {
  const params = useSearchParams();
  const { addToast } = useToast();

  // biome-ignore lint/correctness/useExhaustiveDependencies: addToast makes inf loop
  useEffect(() => {
    const error = params.get("error");
    if (!error) {
      return;
    }
    addToast("error", "Login Error", error);
    history.replaceState(null, "", `${location.origin}/login`);
  }, [params]);
}

export default LoginError;
