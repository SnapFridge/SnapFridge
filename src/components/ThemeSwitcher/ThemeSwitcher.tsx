"use client";

import { type ComponentProps, useState, useEffect } from "react";
import Button from "@components/Button";
import { DropdownMenu } from "radix-ui";
import Icon from "@components/Icon";
import useCurrentTheme from "./currentTheme.helper";

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
      <Icon
        icon={currentTheme === "dark" ? "Moon" : "Sun"}
        description={`Turn off ${currentTheme} mode`}
      />
    </>
  );
  if (mobile) {
    return <DropdownMenu.Item onSelect={toggleTheme}>{children}</DropdownMenu.Item>;
  }

  return (
    <Button variant="icon" onClick={toggleTheme} {...delegated}>
      {children}
    </Button>
  );
}

export default ThemeSwitcher;
