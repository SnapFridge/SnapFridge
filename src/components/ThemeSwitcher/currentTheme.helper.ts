import { useTheme } from "next-themes";

export function useCurrentTheme(): [string | undefined, () => void] {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  function toggleTheme() {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  }

  return [currentTheme, toggleTheme];
}
