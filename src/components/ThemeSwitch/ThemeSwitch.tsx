"use client";

import Button from "@components/Button";
import VisuallyHidden from "@components/VisuallyHidden";
import { Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

function ThemeSwitch({ ...delegated }) {
  const [dark, setDark] = useState<boolean>();
  const toggleTheme = useCallback(
    (darkOverride?: boolean) => {
      if (darkOverride !== undefined) {
        setDark(darkOverride);
      } else {
        setDark(!dark);
        document.documentElement.classList.toggle("dark");
      }

      localStorage.setItem("theme", dark ? "dark" : "light");
    },
    [dark]
  );
  useEffect(() => {
    toggleTheme(document.documentElement.classList.contains("dark"));
  }, [toggleTheme]);
  return (
    dark !== undefined && (
      <Button variant="icon" onClick={() => toggleTheme()} {...delegated}>
        {dark ? (
          <>
            <Moon />
            <VisuallyHidden>Turn on light mode</VisuallyHidden>
          </>
        ) : (
          <>
            <Sun />
            <VisuallyHidden>Turn on dark mode</VisuallyHidden>
          </>
        )}
      </Button>
    )
  );
}

export default ThemeSwitch;
