"use client";

import { useUser } from "@components/UserProvider";
import { styled } from "@pigment-css/react";

function getGreeting() {
  const timeOfDay = new Date().getHours();
  if (timeOfDay < 12) {
    return "morning";
  } else if (timeOfDay < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
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
