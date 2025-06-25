import { css, styled } from "@pigment-css/react";
import ThemeSwitcher from "@components/ThemeSwitcher";
import Link from "@components/Link";
import Logo from "@components/Logo";
import Dropdown from "./Dropdown";
import { ON_MOBILE } from "@components/Global";

function NavBar() {
  return (
    <Nav>
      <LeftNav>
        <Logo />
        <Link className={MobileGone} href="/snap">
          Get Started
        </Link>
        <Link className={MobileGone} href="/about">
          About Us
        </Link>
      </LeftNav>
      <ThemeSwitcher className={MobileGone}></ThemeSwitcher>
      <Dropdown />
    </Nav>
  );
}

const LeftNav = styled("div")({
  display: "flex",
  gap: "45px",
  alignItems: "center"
});

const MobileGone = css({
  [ON_MOBILE]: {
    display: "none"
  }
});

const Nav = styled("nav")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 var(--page-margin)",
  marginTop: "var(--nav-margin)",
  height: `var(--nav-height)`,
  zIndex: 3,
  position: "sticky",
  top: 0,
  backdropFilter: "blur(16px)"
});

export default NavBar;
