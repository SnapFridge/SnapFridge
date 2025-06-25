"use client";

import { ThemeProvider as NextThemeProvider, type ThemeProviderProps } from "next-themes";

export default function ThemeProvider({
  children,
  ...props
}: { children: React.ReactNode } & ThemeProviderProps) {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}
