// organize-imports-ignore

import "./GlobalStyles";
import CookieBanner from "@components/CookieBanner";
import Footer from "@components/Footer";
import NavBar from "@components/NavBar";
import Toaster from "@components/Toaster";
import { ToastProvider } from "@components/ToastProvider";
import { UserProvider } from "@components/UserProvider";
import "@pigment-css/react/styles.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import type { PropsWithChildren } from "react";

const title = {
  template: "%s - SnapFridge",
  default: "SnapFridge",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://snapfridge.netlify.app"),
  title,
  openGraph: {
    title,
    type: "website",
    images: {
      width: 1200,
      height: 630,
      url: "/og-image.png",
      alt: "Preview image for SnapFridge",
    },
  },
};

const globalFont = Rubik({
  subsets: ["latin"],
  display: "swap",
  fallback: ["arial"],
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
            <main>{children}</main>
            <Toaster />
          </ToastProvider>
        </UserProvider>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
