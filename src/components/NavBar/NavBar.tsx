import { css, styled } from "@pigment-css/react";
import ThemeSwitch from "@components/ThemeSwitch";
import Link from "@components/Link";
import Logo from "@components/Logo";
import { ON_MOBILE, scaleClamped } from "@components/Global";
import HamburgerMenu from "./HamburgerMenu";

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
      <HamburgerMenu links={Links} />
    </Nav>
  );
}

const LeftNav = styled("div")({
  display: "flex",
  gap: scaleClamped(30, 45),
  alignItems: "center",
});

const NavLink = styled(Link)({
  fontSize: "var(--1rem)",
});

const MobileGone = css({
  display: "block",

  [ON_MOBILE]: {
    display: "none",
  },
});

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
