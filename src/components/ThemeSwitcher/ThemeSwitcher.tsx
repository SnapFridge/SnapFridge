"use client";

import { type ComponentProps, useEffect, useState } from "react";
import Button from "@components/Button";
import Icon from "@components/Icon";

function ThemeSwitcher({ ...delegated }: ComponentProps<"button">) {
  const [dark, setDark] = useState<boolean>();
  function toggleTheme() {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  }

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  return (
    dark !== undefined && (
      <Button variant="icon" onClick={toggleTheme} {...delegated}>
        <Icon
          icon={dark ? "Sun" : "Moon"}
          description={`Turn on ${dark ? "light" : "dark"} mode`}
        />
      </Button>
    )
  );
}

export default ThemeSwitcher;
