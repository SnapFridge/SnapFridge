"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Icon from "@components/Icon";

export default function ThemeSwitcher() {
    const [ mounted, setMounted ] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();

    // if current theme equals system set current theme to just the system theme
    const currentTheme = theme === "system" ? systemTheme : theme;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <h1>idk why this code broke</h1>
    }

    console.log(currentTheme);
    return (
        <div>
            <button
                onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                type="button"
            >
                {currentTheme === "dark" ? (
                    <Icon icon="Moon" color="white" size={24}></Icon>
                ) : (
                    <h1>light mode</h1>
                )}
            </button>
        </div>
    )
}

