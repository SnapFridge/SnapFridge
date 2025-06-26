import { styled, css } from "@pigment-css/react";
import Link from "@components/Link";
import { ON_MOBILE, scaleClamped } from "@components/Global";
import Icon from "@components/Icon";

function Footer() {
  return (
    <AFooter>
      <div>
        <small className={LeftFooterCSS}>
          <strong>&copy; 2025 SnapFridge</strong>
          <div>Rylex Phan, Andrew Kim, Andrew Trinh</div>
        </small>
        <LinksContainer>
          <li>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/credits">Credits</Link>
          </li>
          <li>
            <Link href="/snap">Try SnapFridge</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
        </LinksContainer>
      </div>
      <div className={RightFooterCSS}>
        <Link href="mailto:repulseshipp@gmail.com">
          <Icon icon="Mail" description="Email us" />
        </Link>
        <Link href="https://github.com/msqr1/SnapFridge">
          <Icon icon="Github" description="Our Github" />
        </Link>
      </div>
    </AFooter>
  );
}

const AFooter = styled("footer")({
  backgroundColor: "var(--accent-200)",
  padding: "32px var(--page-margin)",
  marginTop: "96px",
  display: "flex",

  [ON_MOBILE]: {
    display: "block",
  },
});

const LinksContainer = styled("ul")({
  marginTop: "24px",
  padding: 0,
  listStyleType: "none",
  gap: "12px",
  fontWeight: "600",

  display: "grid",
  gridTemplateColumns: `repeat(2, ${scaleClamped(150, 190)})`,

  [ON_MOBILE]: {
    display: "block",
  },
});

const LeftFooterCSS = css({
  width: "100%",
  fontSize: "var(--1rem)",
});

const RightFooterCSS = css({
  width: "100%",
  height: 0,
  display: "flex",
  gap: "12px",

  justifyContent: "flex-end",

  [ON_MOBILE]: {
    marginTop: "20px",
    justifyContent: "center",
  },
});

export default Footer;
