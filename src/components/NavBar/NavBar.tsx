import { css, styled } from "@pigment-css/react";
import ThemeSwitch from "@components/ThemeSwitch";
import Link from "@components/Link";
import Logo from "@components/Logo";
import { ON_MOBILE, scaleClamped } from "@utils";
import HamburgerMenu from "./HamburgerMenu";
import User from "@components/Avatar";

const Links: { href: "/snap" | "/about"; title: string }[] = [
  {
    href: "/snap",
    title: "Get Started",
  },
  {
    href: "/about",
    title: "About Us",
  },
];

function NavBar() {
  return (
    <Nav>
      <LeftNav>
        <Logo />
        {Links.map(({ href, title }) => (
          <NavLink key={href} className={MobileGone} href={href}>
            {title}
          </NavLink>
        ))}
      </LeftNav>
      <ThemeSwitch className={MobileGone} />
      <User className={MobileGone} />
      <HamburgerMenu links={Links} />
    </Nav>
  );
}

const LeftNav = styled("div")({
  display: "flex",
  gap: scaleClamped(30, 45),
  alignItems: "center",
  marginRight: "auto",
});

const NavLink = styled(Link)({
  fontSize: "var(--1rem)",
});

const MobileGone = css({
  [ON_MOBILE]: {
    display: "none !important",
  },
});

const Nav = styled("nav")({
  display: "flex",
  alignItems: "center",
  padding: "0 var(--page-margin)",
  marginTop: "var(--nav-margin)",
  height: `var(--nav-height)`,
  gap: "16px",
  zIndex: 2,
  position: "sticky",
  top: 0,
  backdropFilter: "blur(16px)",
});

export default NavBar;
