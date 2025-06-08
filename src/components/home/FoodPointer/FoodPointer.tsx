import { scaledClamp } from '@components/Global';
import { styled } from '@pigment-css/react';
import { PropsWithChildren } from 'react';

export default function FoodPointer({ children, ...delegated }: PropsWithChildren) {
  return (
    <Pointer {...delegated}>{children}</Pointer>
  )
};

const Pointer = styled("div")({
  fontSize: scaledClamp(16, 25),
  height: "15px",
  position: "absolute",
  borderStyle: "solid",
  borderColor: "var(--text-950)",
  borderWidth: "3px 3px 0 0",
  zIndex: 2,
});