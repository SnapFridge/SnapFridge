"use client";

import Button from "@components/Button";
import Icon from "@components/Icon";
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
        <Icon
          icon={dark ? "Moon" : "Sun"}
          description={`Turn on ${dark ? "light" : "dark"} mode`}
        />
      </Button>
    )
  );
}

export default ThemeSwitch;
