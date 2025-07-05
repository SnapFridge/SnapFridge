import Button from "@components/Button";
import { ON_MOBILE } from "@components/Global";
import Icon from "@components/Icon";
import Link from "@components/Link";
import ThemeSwitcher from "@components/ThemeSwitcher";
import { css, styled } from "@pigment-css/react";
import { Dialog } from "radix-ui";

interface Props extends React.PropsWithChildren {
  links: { href: string; title: string }[];
}

function HamburgerMenu({ links }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className={SHOW_MOBILE} variant="icon">
          <Icon icon="Menu" description="Open menu" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Overlay className={SHOW_MOBILE} />
        <Wrapper className={SHOW_MOBILE}>
          <Title>Menu</Title>
          <Content>
            {links.map(({ href, title }) => (
              <Dialog.Close key={href} asChild>
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

const Overlay = styled(Dialog.Overlay)({
  // Rare exception where we don't want the color to change
  background: "#000000",
  opacity: "70%",
  position: "fixed",
  inset: 0,
});

const Wrapper = styled(Dialog.Content)({
  display: "flex",
  gap: "12px",

  flexDirection: "column",
  position: "fixed",
  right: 0,
  top: 0,
  bottom: 0,
  padding: "20px 24px",
  width: "250px",
  background: "var(--dialog-background)",
});

const Title = styled(Dialog.Title)({
  color: "var(--text-950)",
  marginBottom: "14px",
});

const Content = styled("div")({
  display: "flex",
  gap: "26px",

  borderLeft: "2px solid var(--text-500)",
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

const SHOW_MOBILE = css({
  display: "none",

  [ON_MOBILE]: {
    display: "revert",
  },
});

export default HamburgerMenu;
