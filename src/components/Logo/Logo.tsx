import { styled, css } from "@pigment-css/react";
import Link from "@components/Link";
import Icon from "@components/Icon";

function Logo() {
  return (
    <Link href="/" className={Wrapper}>
      <Icon icon="Logo" size={53} className={A} />
      <LogoName>SnapFridge</LogoName>
    </Link>
  );
}

const Wrapper = css({
  position: "relative",

  "&:hover": {
    textDecoration: "none"
  }
});

const A = css({
  position: "absolute",
  top: 0,
  left: 0
});

const LogoName = styled("span")({
  color: "var(--text-950)",
  paddingLeft: "64px",
  fontSize: `${24 / 16}rem`,
  fontWeight: "bold"
});

export default Logo;
