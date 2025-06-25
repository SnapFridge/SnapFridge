"use client";

import { ThemeProvider as NextThemeProvider, type ThemeProviderProps } from "next-themes";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function ThemeProvider({ children, ...props }: Props & ThemeProviderProps) {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}
