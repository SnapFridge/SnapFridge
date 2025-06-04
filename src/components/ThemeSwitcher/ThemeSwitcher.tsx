"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Icon from "@components/Icon";
import Button from "@components/Button";
import { styled } from "@pigment-css/react";

function ThemeSwitcher({ ...delegated }) {
  const [isClient, setIsClient] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // if current theme equals system set current theme to just the system theme
  const currentTheme = theme === "system" ? systemTheme : theme;
  const icon = currentTheme === "dark" ? "Moon" : "Sun";

  if (!isClient) return undefined;

  return (
    <ThemeSwitchBtn
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      {...delegated}
    >
      <Icon icon={icon} color="var(--text-950)" size={24} />
    </ThemeSwitchBtn>
  );
}

const ThemeSwitchBtn = styled(Button)({
  backgroundColor: "transparent",

  "&:hover": {
    backgroundColor: "var(--background-100)",
  },
});

export default ThemeSwitcher;
