"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Icon from "@components/Icon";
import { css } from "@pigment-css/react";


// remove default button theme
const ButtonTheme = css({
    border: 0,
    padding: 0,
    backgroundColor: "transparent",
});

function ThemeSwitcher() {
    const [ mounted, setMounted ] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();

    // if current theme equals system set current theme to just the system theme
    const currentTheme = theme === "system" ? systemTheme : theme;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    // console.log(currentTheme);
    return (
        <div>
            <button
                onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                type="button"
                className={ButtonTheme}
            >
                {currentTheme === "dark" ? (
                    <Icon icon="Moon" color="white" size={24}></Icon>
                ) : (
                    <Icon icon="Sun" color="black" size={24}></Icon>
                )}
            </button>
        </div>
    )
}



export default ThemeSwitcher;

