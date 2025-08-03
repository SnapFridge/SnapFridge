"use client";

import { useUser } from "@components/UserProvider";
import { styled } from "@pigment-css/react";

function getGreeting() {
  const date = new Date();
  // 0-23
  const timeOfDay = date.getHours();
  if (timeOfDay < 6 || timeOfDay > 18) {
    return "evening";
  } else if (timeOfDay < 12) {
    return "morning";
  }
  return "afternoon";
}

function Greeting() {
  const user = useUser();

  return (
    <h1>
      Good {getGreeting()},{" "}
      <Name>{user && (user.user_metadata["name"] || user.email)}</Name>
    </h1>
  );
}

const Name = styled("span")({
  backgroundImage: "linear-gradient(to right, var(--text-800), var(--text-400))",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  fontSize: `${36 / 16}rem`,
  fontWeight: "bold",
});

export default Greeting;
