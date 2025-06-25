import "@pigment-css/react/styles.css";
import "./globalStyles";
import { Poppins } from "next/font/google";
import ThemeProvider from "./providers";
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
import CookieBanner from "@components/CookieBanner";
import { styled } from "@pigment-css/react";
import ToastProvider from "@components/ToastProvider";
import Toaster from "@components/Toaster";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"]
});

export const metadata = {
  title: "SnapFridge",
  description: "Delicious recipes right from your fridge"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className} suppressHydrationWarning>
      <body>
        {/* theme provider from next-themes, handles the dark/light theming */}
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <Background>
              <NavBar />
              <Main>{children}</Main>
              <Footer />
              <CookieBanner />
              <Toaster />
            </Background>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
const Background = styled("div")({
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
  color: "var(--text-950)",
  background: "var(--background)",
  isolation: "isolate"
});

const Main = styled("main")({
  flex: 1
});
