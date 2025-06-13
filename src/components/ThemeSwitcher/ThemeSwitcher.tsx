"use client";

import { type ComponentProps, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Button from "@components/Button";
import { styled } from "@pigment-css/react";
import VisuallyHidden from "@components/VisuallyHidden";
import { DropdownMenu } from "radix-ui";
import Icon from "@components/Icon";
import { useCurrentTheme } from "./currentTheme.helper";

interface Props extends ComponentProps<"button"> {
  mobile?: boolean;
}

function ThemeSwitcher({ mobile = false, ...delegated }: Props) {
  const [isClient, setIsClient] = useState(false);
  const [currentTheme, toggleTheme] = useCurrentTheme();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return undefined;
  const children = (
    <>
      <VisuallyHidden>
        {currentTheme === "dark" ? "Turn On Light Mode" : "Turn On Dark Mode"}
      </VisuallyHidden>
      <Icon icon={currentTheme === "dark" ? "Moon" : "Sun"} />
    </>
  );
  if (mobile) {
    return (
      <DropdownMenu.Item onSelect={toggleTheme}>{children}</DropdownMenu.Item>
    );
  }

  return (
    <ThemeSwitchBtn onClick={toggleTheme} {...delegated}>
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

export default ThemeSwitcher;
