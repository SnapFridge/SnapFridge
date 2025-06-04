import { styled, css } from "@pigment-css/react";
import Link from "@components/Link";
import Icon from "@components/Icon";


function Footer() {
    return (
        <FooterItem>
            <TopFooter>
                <small className={TopLeftFooterCSS}>
                    <span>&copy; <span dateTime="2025">2025</span> <span itemProp="name">SnapFridge</span></span>
                    <AddressSection>
                        <span itemProp="author">Rylex Phan</span><span>, </span>
                        <span itemProp="author">Andrew Kim</span><span>, </span>
                        <span itemProp="author">Andrew Trinh</span>
                    </AddressSection>
                </small>
                <div className={TopRightFooterCSS}>
                    <Link href="mailto:repulseshipp@gmail.com"><Icon icon="Mail" size={28} color="var(--text-950)" /></Link>
                    <Link href="https://github.com/msqr1/SnapFridge"><Icon icon="Github" size={28} color="var(--text-950)" /></Link>
                </div>
            </TopFooter>
            <LinksContainer>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/sitemap">Sitemap</Link></li>
                <li><Link href="/credits">Credits</Link></li>
                <li><Link href="/">Try SnapFridge</Link></li>
                <li><Link href="/about">About Us</Link></li>
            </LinksContainer>
        </FooterItem>
    )
}

const FooterItem = styled("footer")({
    backgroundColor: "var(--accent-200)",
    padding: "32px var(--page-margin)",
    marginTop: "96px"
});

const TopFooter = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "24px",
});

const LinksContainer = styled("ul")({
    fontSize: `${16 / 16}rem`,
    padding: 0,
    listStyleType: "none",  
    display: "grid",
    gap: "12px",
    gridTemplateColumns: "repeat(2, 150px)",
    fontWeight: "600",
});

const AddressSection = styled("address")({
    fontStyle: "normal",
});

const TopLeftFooterCSS = css({
    display: "flex",
    flexDirection: "column",
    fontSize: `${18 / 16}rem`,

    "&> span": {
        fontWeight: "600",
    }
});

const TopRightFooterCSS = css({
    display: "flex",
    gap: "12px",
});


 
export default Footer;