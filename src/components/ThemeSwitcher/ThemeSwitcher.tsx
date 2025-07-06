"use client";

import { type ComponentProps, useState, useEffect } from "react";
import Button from "@components/Button";
import Icon from "@components/Icon";
import useCurrentTheme from "./currentTheme.helper";

function ThemeSwitcher({ ...delegated }: ComponentProps<"button">) {
  const [isClient, setIsClient] = useState(false);
  const [currentTheme, toggleTheme] = useCurrentTheme();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return undefined;

  return (
    <Button variant="icon" onClick={toggleTheme} {...delegated}>
      <Icon
        icon={currentTheme === "dark" ? "Sun" : "Moon"}
        description={`Turn off ${currentTheme} mode`}
      />
    </Button>
  );
}

export default ThemeSwitcher;
