import Icon from "@components/Icon";
import Link from "@components/Link";
import VisuallyHidden from "@components/VisuallyHidden";
import { css, styled } from "@pigment-css/react";

function Logo() {
  return (
    <Link href="/" className={Wrapper}>
      <VisuallyHidden>Home</VisuallyHidden>
      <Icon icon="Logo" size={53} className={A} />
      <LogoName>SnapFridge</LogoName>
    </Link>
  );
}

const Wrapper = css({
  position: "relative",

  "&:hover": {
    textDecoration: "none",
  },
});

const A = css({
  position: "absolute",
  top: 0,
  left: 0,
});

const LogoName = styled("span")({
  paddingLeft: "64px",
  fontSize: `${24 / 16}rem`,
  fontWeight: 700,
});

export default Logo;
