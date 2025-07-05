"use client";
import Button from "@components/Button";
import { ON_MOBILE } from "@components/Global";
import Icon from "@components/Icon";
import Link from "@components/Link";
import ThemeSwitcher from "@components/ThemeSwitcher";
import { styled } from "@pigment-css/react";
import { Dialog } from "radix-ui";
import { useRef } from "react";

interface Props extends React.PropsWithChildren {
  links: { href: string; title: string }[];
}

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
            contentRef.current?.querySelector("a")?.focus();
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
          <ThemeSwitch />
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
  display: "none",
  gap: "12px",

  flexDirection: "column",
  position: "fixed",
  right: 0,
  top: 0,
  bottom: 0,
  padding: "20px 24px",
  width: "250px",
  background: "var(--dialog-background)",

  [ON_MOBILE]: {
    display: "flex",
  },
});

const Title = styled(Dialog.Title)({
  color: "var(--text-950)",
  marginBottom: "14px",
});

const Content = styled("div")({
  display: "flex !important",
  gap: "26px",

  borderLeft: "2px solid var(--text-800)",
  paddingLeft: "16px",
  flexDirection: "column",
  marginBottom: "auto",
});

const MenuLink = styled(Link)({
  display: "flex",
  alignItems: "center",
  gap: "4px",

  fontSize: `${18 / 16}rem`,
  paddingTop: "auto",
  paddingBottom: "auto",
  minHeight: `${44 / 16}rem`,
  lineHeight: `${44 / 16}rem`,
});

const ThemeSwitch = styled(ThemeSwitcher)({
  display: "flex",
  justifyContent: "center",
});

const CloseButton = styled(Button)({
  display: "flex",
  justifyContent: "center",
});

export default HamburgerMenu;
