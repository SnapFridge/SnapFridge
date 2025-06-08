import { styled, css } from "@pigment-css/react";
import Link from "@components/Link";
import Icon from "@components/Icon";
import { ON_MOBILE, scaledClamp } from '@components/Global';

export default function Footer() {
  return (
  <AFooter>
    <div>
      <small className={LeftFooterCSS}>
        <strong>&copy; 2025 SnapFridge</strong> 
        <div>Rylex Phan, Andrew Kim, Andrew Trinh</div>
      </small>
      <LinksContainer>
        <li><Link href="/privacy-policy">Privacy Policy</Link></li>
        <li><Link href="/sitemap">Sitemap</Link></li>
        <li><Link href="/credits">Credits</Link></li>
        <li><Link href="/">Try SnapFridge</Link></li>
        <li><Link href="/about">About Us</Link></li>
      </LinksContainer>
    </div>
    <div className={RightFooterCSS}>
      <Link href="mailto:repulseshipp@gmail.com"><Icon icon="Mail" color="var(--text-950)" /></Link>
      <Link href="https://github.com/msqr1/SnapFridge"><Icon icon="Github" color="var(--text-950)" /></Link>
    </div>
  </AFooter>
  )
}

const AFooter = styled("footer")({
  backgroundColor: "var(--accent-200)",
  padding: "32px var(--page-margin)",
  marginTop: "96px",
  display: "flex",

  [ON_MOBILE]: {
    flexDirection: "column",
  },
});

const LinksContainer = styled("ul")({
  marginTop: "24px",
  padding: 0,
  listStyleType: "none",
  gap: "12px",
  fontWeight: "600",

  display: "grid",
  gridTemplateColumns: `repeat(2, ${scaledClamp(150, 190)})`,

  [ON_MOBILE]: {
    display: "block",
  }
});

const LeftFooterCSS = css({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  fontSize: scaledClamp(16, 22),
});

const RightFooterCSS = css({
  width: "100%",
  height: 0,
  display: "flex",
  gap: "12px",

  justifyContent: "end",

  [ON_MOBILE]: {
    marginTop: "20px",
    justifyContent: "center",
  }
});