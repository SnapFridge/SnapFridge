import { styled } from '@pigment-css/react';
import { PropsWithChildren } from 'react';

export default function FoodPointer({ children, ...delegated }: PropsWithChildren) {
  return (
    <Pointer {...delegated}>{children}</Pointer>
  )
};

const Pointer = styled("div")({
  position: "absolute",
  borderStyle: "solid",
  borderColor: "var(--text-950)",
  borderWidth: "2px 2px 0 0",
  zIndex: 2,
});