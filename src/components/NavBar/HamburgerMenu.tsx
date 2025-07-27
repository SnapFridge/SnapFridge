"use client";

import Button from "@components/Button";
import { ON_MOBILE } from "@components/Global";
import Icon from "@components/Icon";
import Link from "@components/Link";
import ThemeSwitch from "@components/ThemeSwitch";
import User from "./Avatar";
import { styled } from "@pigment-css/react";
import { Dialog } from "radix-ui";
import { useRef } from "react";

type Props = {
  links: { href: "/" | "/snap" | "/about"; title: string }[];
};

function HamburgerMenu({ links }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <TriggerButton variant="icon">
          <Icon icon="Menu" description="Open menu" />
        </TriggerButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Wrapper
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            contentRef.current!.querySelector("a")!.focus();
          }}
        >
          <Title>Menu</Title>
          <Content ref={contentRef}>
            {links.map(({ href, title }, index) => (
              <Dialog.Close key={href} autoFocus={index === 0} asChild>
                <MenuLink href={href}>
                  <span>{title}</span>
                  <Icon icon="ChevronRight" />
                </MenuLink>
              </Dialog.Close>
            ))}
          </Content>
          <CenteredUser />
          <CenteredThemeSwitch />
          <Dialog.Close asChild>
            <CloseButton variant="icon">
              <Icon color="var(--error-500)" icon="X" description="Close menu" />
            </CloseButton>
          </Dialog.Close>
        </Wrapper>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const TriggerButton = styled(Button)({
  display: "none",

  [ON_MOBILE]: {
    display: "block",
  },
});

const Overlay = styled(Dialog.Overlay)({
  display: "none",
  // Rare exception where we don't want the color to change
  background: "#000000",
  opacity: "70%",
  position: "fixed",
  inset: 0,

  [ON_MOBILE]: {
    display: "block",
  },
});

const Wrapper = styled(Dialog.Content)({
  zIndex: 2,
  display: "none",
  gap: "12px",

  flexDirection: "column",
  position: "fixed",
  right: 0,
  height: "100%",
  padding: "20px 24px",
  width: "250px",
  background: "var(--background-0)",

  [ON_MOBILE]: {
    display: "flex",
  },
});

const Title = styled(Dialog.Title)({
  margin: "0 0 14px",
});

const Content = styled("div")({
  display: "flex !important",
  gap: "26px",

  borderLeft: "2px solid var(--text-800)",
  paddingLeft: "16px",
  flexDirection: "column",
  margin: "0 0 auto",
});

const MenuLink = styled(Link)({
  display: "flex",
  alignItems: "center",
  gap: "4px",

  fontSize: `${18 / 16}rem`,
  padding: "auto 0",
  minHeight: `${44 / 16}rem`,
  lineHeight: `${44 / 16}rem`,
});

const CenteredUser = styled(User)({
  display: "flex",
  justifyContent: "center",
  padding: `10px`,
  borderRadius: "8px",

  "&:hover": {
    background: "var(--background-100)",
  },
});

const CenteredThemeSwitch = styled(ThemeSwitch)({
  display: "flex",
  justifyContent: "center",
});

const CloseButton = styled(Button)({
  display: "flex",
  justifyContent: "center",
});

export default HamburgerMenu;
