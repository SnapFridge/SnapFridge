// organize-imports-ignore

import "./GlobalStyles";
import CookieBanner from "@components/CookieBanner";
import Footer from "@components/Footer";
import NavBar from "@components/NavBar";
import ToastProvider from "@components/ToastProvider";
import Toaster from "@components/Toaster";
import { UserProvider } from "@components/UserProvider";
import { styled } from "@pigment-css/react";
import "@pigment-css/react/styles.css";
import { Rubik } from "next/font/google";
import { type PropsWithChildren } from "react";

const globalFont = Rubik({
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
    <html lang="en" className={globalFont.className} suppressHydrationWarning>
      <body>
        <ThemeScript />
        <UserProvider>
          <NavBar />
          <ToastProvider>
            <Main>{children}</Main>
            <Toaster />
          </ToastProvider>
        </UserProvider>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}

const Main = styled("main")({
  flexGrow: 1,
});
