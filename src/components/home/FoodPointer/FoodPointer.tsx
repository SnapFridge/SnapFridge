import { styled } from '@pigment-css/react';

export default function FoodPointer() {
  return(
    <div style={{position: "absolute"}}>
      <div>Food</div>
      <Rect></Rect>
    </div>
  )
};

const Rect = styled("div")({
  borderStyle: "solid",
  borderColor: "var(--text-100)",
  borderTop: "2px",
  borderRight: "2px",
});