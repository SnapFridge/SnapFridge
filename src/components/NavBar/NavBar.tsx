import { css, styled } from "@pigment-css/react";
import ThemeSwitcher from "@components/ThemeSwitcher";
import Link from "@components/Link";
import Logo from "@components/Logo";
import Dropdown from '@components/Dropdown';
import { MOBILE_BREAKPOINT } from '@components/Global';

function NavBar() {
  return (
    <Nav>
      <LeftNav>
        <Logo/>
        <Link className={MobileGone} href="/">Get Started</Link>
        <Link className={MobileGone} href="/about">About Us</Link>
      </LeftNav>
      <ThemeSwitcher className={MobileGone}></ThemeSwitcher>
      <Dropdown className={MobileAppear}>
        <Link href="/" className={MobileAppear}>Get Started</Link>
        <Link href="/about" className={MobileAppear}>About Us</Link>
        <ThemeSwitcher className={MobileAppear}></ThemeSwitcher>
      </Dropdown>
    </Nav>
  );
}

const LeftNav = styled("div")({
  display: "flex",
  gap: "45px",
  alignItems: "center",
});

const MobileGone = css({
  [`@media (width <= ${MOBILE_BREAKPOINT}px)`]: {
    display: "none",
  }
});

const MobileAppear = css({
  [`@media (width <= ${MOBILE_BREAKPOINT}px)`]: {
    display: "block",
  },
  display: "none"
});

// TODO: Add a prettier frosted glass implementation please :(
const Nav = styled("nav")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 var(--page-margin)",
  marginTop: "var(--nav-margin)",
  height: `var(--nav-height)`,
  zIndex: 2,
  position: "sticky",
  top: 0,
  backdropFilter: "blur(16px)",
});

export default NavBar;
