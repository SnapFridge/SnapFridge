import * as React from "react";
import { styled, css } from "@pigment-css/react";
import Icon from "@components/Icon";
import Link from "@components/Link";

export default function Logo() {
  return (
    <Link href="/" className={Wrapper}>
      <IconWrapper>
        <Icon color="var(--text-950)" icon="logo" size={64}></Icon>
      </IconWrapper>
      <LogoName>SnapFridge</LogoName>
    </Link>
  );
}

const Wrapper = css({
  position: "relative",

  "&:hover": {
    textDecoration: "none",
  }
});

const IconWrapper = styled("div")({
  position: "absolute",
  top: 0,
  bottom: 0,
  margin: "auto",
  left: 0,
  width: "64px",
  height: "64px",
});

const LogoName = styled("span")({
  paddingLeft: "64px",
  fontSize: `${24 / 16}rem`,
  fontWeight: "bold",
});
