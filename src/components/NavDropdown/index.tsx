import Button from "@components/Button";
import Icon from "@components/Icon";
import { styled } from "@pigment-css/react";
import { DropdownMenu } from "radix-ui";
import VisuallyHidden from "@components/VisuallyHidden";
import { ON_MOBILE } from "@components/Global";
import Link from "@components/Link";
import ThemeSwitcher from "@components/ThemeSwitcher";

export default function Dropdown() {
  return (
    <Wrapper>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <DropdownBtn>
            <VisuallyHidden>Open Menu</VisuallyHidden>
            <Icon icon="SquareChevronDown" color="var(--text-950)" />
          </DropdownBtn>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <Content hideWhenDetached>
            <Item asChild>
              <Link href="/">Get Started</Link>
            </Item>
            <Item asChild>
              <Link href="/about">About Us</Link>
            </Item>
            <ThemeSwitcher IsMobile={true} />
          </Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </Wrapper>
  );
}

const Wrapper = styled("div")({
  display: "none",

  [ON_MOBILE]: {
    display: "block",
  },
});

const DropdownBtn = styled(Button)({
  backgroundColor: "transparent",

  "&:hover": {
    backgroundColor: "var(--background-100)",
  },
});

const Content = styled(DropdownMenu.Content)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "var(--background)",
  borderRadius: "8px",
  padding: "8px 12px 10px 12px",
  gap: "4px",
});

const Item = styled(DropdownMenu.Item)({
  width: "fit-content",
});
