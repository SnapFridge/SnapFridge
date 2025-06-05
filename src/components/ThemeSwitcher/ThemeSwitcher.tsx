"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Icon from "@components/Icon";
import Button from "@components/Button";
import { styled } from "@pigment-css/react";
import VisuallyHidden from "@components/VisuallyHidden";
import { DropdownMenu } from "radix-ui";

interface Props extends React.ComponentProps<"button"> {
  MobileInterface?: boolean;
}

function ThemeSwitcher({ MobileInterface = false, ...delegated }: Props) {
  const [isClient, setIsClient] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // if current theme equals system set current theme to just the system theme
  const currentTheme = theme === "system" ? systemTheme : theme;
  const icon = currentTheme === "dark" ? "Moon" : "Sun";

  if (!isClient) return undefined;

  // So it works in the dropdown menu (kind of a hacky solution but it works :D)
  const Component = MobileInterface ? DropdownMenu.Item : ThemeSwitchBtn;

  return (
    <Component
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      {...delegated}
    >
      <VisuallyHidden>
        {currentTheme === "dark" ? "Turn On Light Mode" : "Turn On Dark Mode"}
      </VisuallyHidden>
      <Icon icon={icon} color="var(--text-950)" />
    </Component>
  );
}

const ThemeSwitchBtn = styled(Button)({
  backgroundColor: "transparent",

  "&:hover": {
    backgroundColor: "var(--background-100)",
  },
});

export default ThemeSwitcher;
