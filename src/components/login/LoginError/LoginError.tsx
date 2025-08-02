"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function LoginError() {
  const params = useSearchParams();
  useEffect(() => {
    const error = params.get("error");
    if (!error) {
      return;
    }
    console.error(error);
    history.replaceState(null, "", location.origin + "/login");
  }, [params]);

  return <></>;
}

export default LoginError;
