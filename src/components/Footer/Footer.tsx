import Icon from "@components/Icon";
import Link from "@components/Link";
import VisuallyHidden from "@components/VisuallyHidden";
import { css, styled } from "@pigment-css/react";
import { ON_MOBILE, scaleClamped } from "@utils";
import { Mail } from "lucide-react";

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
            <Link href="/snap">Snap</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
        </LinksContainer>
      </div>
      <div className={RightFooterCSS}>
        <Link href="mailto:repulseshipp@gmail.com">
          <Mail aria-hidden />
          <VisuallyHidden>Email us</VisuallyHidden>
        </Link>
        <Link href="https://github.com/msqr1/SnapFridge">
          <Icon icon="Github" description="Our github" />
        </Link>
      </div>
    </AFooter>
  );
}

const AFooter = styled("footer")({
  background: "var(--accent-200)",
  padding: "32px var(--page-margin)",
  margin: "96px 0 0",
  display: "flex",
  contentVisibility: "auto",
  [ON_MOBILE]: {
    display: "block",
  },
});

const LinksContainer = styled("ul")({
  margin: "24px 0 0",
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
  height: "fit-content",
  display: "flex",
  gap: "12px",

  justifyContent: "flex-end",

  [ON_MOBILE]: {
    margin: "20px 0 0",
    justifyContent: "center",
  },
});

export default Footer;
