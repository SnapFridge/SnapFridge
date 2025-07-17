"use client";

import { useEffect, useState } from "react";
import Button from "@components/Button";
import Icon from "@components/Icon";
import Cookie from "js-cookie";

function ThemeSwitch({ ...delegated }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  function toggleTheme(override?: "light" | "dark") {
    const nextTheme = (override ?? theme === "light") ? "dark" : "light";
    setTheme(nextTheme);

    Cookie.set("color-theme", nextTheme, {
      expires: 1000,
    });

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  useEffect(() => {
    if (!Cookie.get("color-theme")) {
      const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      toggleTheme(darkMode ? "dark" : "light");
    } else {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    }
  }, []);

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
        description={`Turn on ${theme === "dark" ? "light" : "dark"} mode`}
      />
    </Button>
  );
}

export default ThemeSwitch;
