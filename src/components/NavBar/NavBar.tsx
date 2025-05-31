import ThemeSwitcher from "@components/ThemeSwitcher";
import Link from "@components/Link";
import Logo from "@components/Logo";
import { styled } from "@pigment-css/react";

function NavBar() {
    return (
        <Nav>
            <LeftNav>
                <Logo />
                <Link href="/">Get Started</Link>
                <Link href="/about">About Us</Link>
            </LeftNav>
            <ThemeSwitcher></ThemeSwitcher>
        </Nav>
    )
}

const LeftNav = styled("div")({
    display: "flex",
    gap: "45px",
    alignItems: "center",
});

// TODO: Add a prettier frosted glass implementation please :(
const Nav = styled("nav")({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 89px",
    height: `${80 / 16}rem`,
    zIndex: 2,
    position: "sticky",
    top: 0,
    backdropFilter: "blur(16px)",
});


export default NavBar;
