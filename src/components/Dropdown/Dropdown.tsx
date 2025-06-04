"use client";

import Button from '@components/Button';
import Icon from '@components/Icon';
import { styled } from '@pigment-css/react';
import { ReactNode, useState } from 'react';

function Dropdown({ children, ...delegated }: { children: ReactNode }) {
  const [display, setDisplay] = useState("none");
  return (
    <>
      <DropdownBtn onClick={() => setDisplay(display === "none" ? "flex" : "none")}
        {...delegated}>
        <Icon icon="SquareChevronDown" color="var(--text-950)" size={24}/>
      </DropdownBtn>
      <DropdownContent style={{display: display}}>
        {children}
      </DropdownContent>  
    </>
  );
}
const DropdownBtn = styled(Button)({
  backgroundColor: "transparent",

  "&:hover": {
    backgroundColor: "var(--background-100)",
  },
});

const DropdownContent = styled("div")({
  position: "absolute",
  flexDirection: "column",
  zIndex: 3,
});

export default Dropdown;