import { ThemeProvider as NextThemeProvider, ThemeProviderProps } from "next-themes";

export default function ThemeProvider({ children, ...props }: 
  { children: React.ReactNode } & ThemeProviderProps) {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}
