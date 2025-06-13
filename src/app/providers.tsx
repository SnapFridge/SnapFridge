"use client";

import { ThemeProvider as NextThemeProvider, type ThemeProviderProps } from "next-themes";
import RadixThemeWrapper from "@components/RadixThemeWrapper";

export default function ThemeProvider({ children, ...props }: 
  { children: React.ReactNode } & ThemeProviderProps) {
  return (
    <NextThemeProvider {...props}>
      <RadixThemeWrapper>
        {children}
      </RadixThemeWrapper>
    </NextThemeProvider> 
  )

}
