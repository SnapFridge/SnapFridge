"use client";

import { useCallback, useEffect, useState } from "react";
import Button from "@components/Button";
import Icon from "@components/Icon";
import Cookie from "js-cookie";

function ThemeSwitch({ ...delegated }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = useCallback(
    (override?: "light" | "dark") => {
      const nextTheme = override || theme === "light" ? "dark" : "light";
      setTheme(nextTheme);

      Cookie.set("color-theme", nextTheme, {
        expires: 1000,
      });

      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    [theme, setTheme]
  );

  useEffect(() => {
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    toggleTheme(darkMode ? "dark" : "light");
  }, [toggleTheme]);

  return (
    <Button
      variant="icon"
      onClick={() => {
        toggleTheme();
      }}
      {...delegated}
    >
      <Icon
        icon={theme === "light" ? "Sun" : "Moon"}
        description={`Turn off ${theme} mode`}
      />
    </Button>
  );
}

export default ThemeSwitch;
