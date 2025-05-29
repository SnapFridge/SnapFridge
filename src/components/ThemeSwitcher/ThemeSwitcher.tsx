"use client";

import { useTheme } from "next-themes";
import Icon from "@components/Icon";
import Button from "@components/Button";
import { css } from "@pigment-css/react";

function ThemeSwitcher() {
  const { systemTheme, theme, setTheme } = useTheme();

  // if current theme equals system set current theme to just the system theme
  const currentTheme = theme === "system" ? systemTheme : theme;
  const icon = currentTheme === "dark" ? "Moon" : "Sun";

  return (
    <Button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className={ThemeSwitch}
    >
      <Icon icon={icon} color="var(--text-950)" size={24} />
    </Button>
  );
}

const ThemeSwitch = css({
  backgroundColor: "transparent",

  "&:hover": {
    backgroundColor: "var(--background-50)",
  },
});

export default ThemeSwitcher;
