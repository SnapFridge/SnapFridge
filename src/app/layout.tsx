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

const ThemeScript = () => {
  const blockingScript = `
    (function() {
      const cookieExists = document.cookie.includes("color-theme=");

      if (!cookieExists) {
        const theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : undefined;
        if (theme) document.documentElement.classList.add('dark');
      }
    })();
  `;
  return <script>{blockingScript}</script>;
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const savedTheme = (await cookies()).get("color-theme");
  const theme = savedTheme?.value || "light";

  const themeClass = theme === "dark" ? "dark" : "";

  return (
    <Html
      lang="en"
      className={`${poppins.className} ${themeClass}`}
      suppressHydrationWarning
    >
      <Body>
        <ThemeScript />
        <NavBar />
        <Main>{children}</Main>
        <Footer />
        <CookieBanner />
      </Body>
    </Html>
  );
}

const Html = styled("html")({
  minHeight: "100%",
});

const Body = styled("body")({
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
});

const Main = styled("main")({
  flexGrow: 1,
});
