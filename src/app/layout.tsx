import "@pigment-css/react/styles.css";
import "./globalStyles";
import { Poppins } from "next/font/google";
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
import CookieBanner from "@components/CookieBanner";
import { styled } from "@pigment-css/react";
import ToastProvider from "@components/ToastProvider";
import Toaster from "@components/Toaster";
import { type PropsWithChildren } from "react";
import { type Metadata } from "next";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "fallback",
});

export const metadata: Metadata = {
  title: "SnapFridge",
  description: "Delicious recipes right from your fridge",
  other: {
    "google-site-verification": "eYERfWRX6kjvyvIaqgESxRtku7LR-9xDCg0Xge3aaQU",
  },
};

// Not a function to save on code size
const applyTheme = () => {
  addEventListener(
    "DOMContentLoaded",
    () => {
      const theme =
        localStorage.getItem("theme") ||
        (matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light");
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      }
    },
    { once: true }
  );
  addEventListener("beforeunload", () => {
    localStorage.setItem(
      "theme",
      `${document.documentElement.classList.contains("dark") ? "dark" : "light"}`
    );
  });
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={poppins.className} suppressHydrationWarning>
      <head>
        <script>{`(${applyTheme.toString()})()`}</script>
      </head>
      <body>
        <ToastProvider>
          <Background>
            <NavBar />
            <Main>{children}</Main>
            <Footer />
            <CookieBanner />
            <Toaster />
          </Background>
        </ToastProvider>
      </body>
    </html>
  );
}
const Background = styled("div")({
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
  color: "var(--text-950)",
  background: "var(--background-0)",
  isolation: "isolate",
});

const Main = styled("main")({
  flex: 1,
});
