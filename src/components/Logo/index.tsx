import { styled, css } from "@pigment-css/react";
import Image from "next/image"
import Link from "@components/Link";

export default function Logo() {
  return (
    <Link href="/" className={Wrapper}>
      <Image
        priority
        src="/Logo.avif"
        alt="Logo"
        width={50}
        height={36}
        className={A}
      />
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

const A = css({
  position: "absolute",
  top: 0,
  left: 0,
});

const LogoName = styled("span")({
  color: "var(--text-950)",
  paddingLeft: "64px",
  fontSize: `${24 / 16}rem`,
  fontWeight: "bold",
});
