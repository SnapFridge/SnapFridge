import { styled } from "@pigment-css/react";
import { ReactNode } from 'react';

function Dropdown({ children, ...delegated } : { children: ReactNode }) {
  return (
    <StyledDropdown {...delegated}>
      {children}
    </StyledDropdown>
  );
}

const StyledDropdown = styled("select")({
  textAlign: "center",
  textDecoration: "none",
  fontSize: `${16 / 16}rem`,
  padding: `${10 / 16}rem`,
  borderRadius: "8px",
  border: "none",
  backgroundColor: "var(--background)",
  color: "var(--color)",

  "&:hover": {
    backgroundColor: "var(--background-hover)",
  },
});

export default Dropdown;