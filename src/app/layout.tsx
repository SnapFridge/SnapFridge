import "@pigment-css/react/styles.css";
import "./GlobalStyles";
import { Poppins } from "next/font/google";
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
import CookieBanner from "@components/CookieBanner";
import { type PropsWithChildren } from "react";
import { styled } from "@pigment-css/react";
import ToastProvider from "@components/ToastProvider";
import Toaster from "@components/Toaster";
import { UserProvider } from "@components/UserProvider";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "fallback",
});

function ThemeScript() {
  const s = (() => {
    const theme =
      localStorage.getItem("theme") ||
      (matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }).toString();
  return <script>{s.slice(s.indexOf("{") + 1, s.lastIndexOf("}"))}</script>;
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`${poppins.className}`} suppressHydrationWarning>
      <Body>
        <ThemeScript />
        <UserProvider>
          <NavBar />
        </UserProvider>
        <ToastProvider>
          <Main>{children}</Main>
          <Toaster />
        </ToastProvider>
        <Footer />
        <CookieBanner />
      </Body>
    </html>
  );
}

const Body = styled("body")({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const Main = styled("main")({
  flexGrow: 1,
});
