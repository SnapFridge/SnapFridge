"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Icon from "@components/Icon";
import Button from "@components/Button";
import { styled } from "@pigment-css/react";
import VisuallyHidden from "@components/VisuallyHidden";
import { DropdownMenu } from "radix-ui";

interface Props extends React.ComponentProps<"button"> {
  mobile?: boolean;
}

export default function ThemeSwitcher({
  mobile = false,
  ...delegated
}: Props) {
  const [isClient, setIsClient] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // if current theme equals system set current theme to just the system theme
  const currentTheme = theme === "system" ? systemTheme : theme;
  const icon = currentTheme === "dark" ? "Moon" : "Sun";

  if (!isClient) return undefined;
  const children = (
    <>
      <VisuallyHidden>
        {currentTheme === "dark" ? "Turn On Light Mode" : "Turn On Dark Mode"}
      </VisuallyHidden>
      <Icon icon={icon} color="var(--text-950)" />
    </>
  );
  const switchTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };
  if (mobile) {
    return (
      <DropdownMenu.Item
        onSelect={switchTheme}
      >
        {children}
      </DropdownMenu.Item>
    );
  }

  return (
    <ThemeSwitchBtn
      onClick={switchTheme}
      {...delegated}
    >
      {children}
    </ThemeSwitchBtn>
  );
}

const ThemeSwitchBtn = styled(Button)({
  backgroundColor: "transparent",

  "&:hover": {
    backgroundColor: "var(--background-100)",
  },
});
