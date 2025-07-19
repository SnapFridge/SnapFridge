import "@pigment-css/react/styles.css";
import "./GlobalStyles";
import { Poppins } from "next/font/google";
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
import CookieBanner from "@components/CookieBanner";
import { type PropsWithChildren } from "react";
import { cookies } from "next/headers";

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
    <html lang="en" className={`${poppins.className} ${themeClass}`}>
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
