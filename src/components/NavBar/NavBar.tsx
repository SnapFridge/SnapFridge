"use client";

import ThemeSwitcher from "@components/ThemeSwitcher";
import Icon from "@components/Icon";
import { css } from "@pigment-css/react";



function NavBar() {
    return (
        <nav className={NavCSS}>
            <div className={LeftNav}>
                <div className={NavItem}>
                    <Icon icon="logo"></Icon>
                        <span 
                            style={{
                                fontSize: `${24 / 16}rem`
                            }}
                        >
                            SnapFridge
                        </span>
                </div>
                <div className={NavItem}>
                    <a href="/">
                        <span 
                            style={{
                                fontSize: `${18 / 16}rem`
                            }}
                        >
                            Get Started
                        </span>
                    </a>
                    <a href="/about">
                        <span 
                            style={{
                                fontSize: `${18 / 16}rem`
                            }}
                        >
                            About Us
                        </span>
                    </a>
                </div>
            </div>
            <ThemeSwitcher></ThemeSwitcher>
        </nav>
    )
}

const LeftNav = css({
    display: "flex",
    gap: "32px",
    alignItems: "center",
});

const NavItem = css({
    display: "flex",
    gap: "12px",
    alignItems: "center",
    "&> *": {
        color: "var(--text-950)",
        textDecoration: "none",
    },
});

const NavCSS = css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 32px 0 5%",
    height: "80px",
    zIndex: 2,
    position: "sticky",
    top: 0,
    backdropFilter: "blur(16px)",
    borderRadius: "16px",
});


export default NavBar;