"use client";

import { useUser } from "@components/UserProvider";
import { styled } from "@pigment-css/react";
import { useEffect, useState } from "react";

type GreetingTime = "morning" | "afternoon" | "evening";

function Greeting() {
  const user = useUser();
  const [greeting, setGreeting] = useState<GreetingTime>();

  useEffect(() => {
    const time = new Date().getHours();
    if (time < 12) {
      setGreeting("morning");
    } else if (time < 18) {
      setGreeting("afternoon");
    } else {
      setGreeting("evening");
    }
  }, []);

  if (!(greeting && user)) {
    return;
  }

  return (
    <h1>
      Good {greeting}, <Name>{user.user_metadata["name"] || user.email}</Name>
    </h1>
  );
}

const Name = styled("span")({
  background: "text linear-gradient(to right, var(--text-800), var(--text-400)) ",
  color: "transparent",
  fontSize: `${36 / 16}rem`,
  fontWeight: 700,
});

export default Greeting;
