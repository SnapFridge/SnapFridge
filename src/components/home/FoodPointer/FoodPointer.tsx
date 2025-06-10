
import { ON_MOBILE } from '@components/Global';
import { styled } from '@pigment-css/react';
import { type PropsWithChildren } from 'react';

export default function FoodPointer({ children, ...delegated }: PropsWithChildren) {
  return (
    <Pointer {...delegated}>{children}</Pointer>
  )
};

const Pointer = styled("div")({
  fontSize: "var(--1rem)",
  height: "15px",
  position: "absolute",
  borderStyle: "solid",
  borderColor: "var(--text-950)",
  zIndex: 2,
  borderWidth: "2px 2px 0 0",

  [ON_MOBILE]: {
    borderWidth: "1px 1px 0 0",
  },
});