import "@pigment-css/react/styles.css";
import "./GlobalStyles";
import { Poppins } from "next/font/google";
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
import CookieBanner from "@components/CookieBanner";
import { type PropsWithChildren } from "react";
import { cookies } from "next/headers";
import { styled } from "@pigment-css/react";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "fallback",
});

export default async function RootLayout({ children }: PropsWithChildren) {
  const savedTheme = (await cookies()).get("color-theme");
  const theme = savedTheme?.value || "light";

  const themeClass = theme === "dark" ? "dark" : "";

  return (
    <Html lang="en" className={`${poppins.className} ${themeClass}`}>
      <Body>
        <NavBar />
        <Main>{children}</Main>
        <Footer />
        <CookieBanner />
      </Body>
    </Html>
  );
}

const Html = styled("html")({
  height: "100%",
});

const Body = styled("body")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

const Main = styled("main")({
  flexGrow: 1,
});
