"use client";

import Button from "@components/Button";
import Icon from "@components/Icon";
import { styled } from "@pigment-css/react";
import Image from "next/image";
import { useRef } from "react";

type Props = {
  src: string;
  deleteImage: (arg: string) => void;
};

function FridgeImage({ src, deleteImage }: Props) {
  const deleteBtn = useRef<HTMLButtonElement>(null);
  return (
    <Wrapper>
      <ImageBtn onClick={() => deleteBtn.current!.focus()} type="button">
        <Image
          width={150}
          height={150}
          src={src}
          onLoad={() => URL.revokeObjectURL(src)}
          alt="User uploaded image"
        />
      </ImageBtn>
      <DeleteBtn ref={deleteBtn} tabIndex={-1} onClick={() => deleteImage(src)}>
        <Icon icon="Trash2" color="var(--warn-500)" />
      </DeleteBtn>
    </Wrapper>
  );
}
const Wrapper = styled("li")({
  position: "relative",
});

const ImageBtn = styled("button")({
  borderRadius: "8px",
  overflow: "hidden",
  position: "relative",
  flex: 1,
  maxWidth: "300px",

  transition: "all .25s",
  [`${Wrapper}:hover > &, &:focus`]: {
    boxShadow: "var(--shadow)",
    transform: "scale(1.05)",
  },
});

const DeleteBtn = styled(Button)({
  position: "absolute",
  right: "8px",
  top: "8px",
  backgroundColor: "#000000b3",
  borderRadius: "4px",
  padding: "4px",
  opacity: 0,
  visibility: "hidden",
  transition: "all .25s, visibility 0s .25s",

  "&:hover, &:focus": {
    transform: "scale(1.05)",
  },

  [`${Wrapper}:hover > &, ${ImageBtn}:focus + &, &:focus`]: {
    transition: "all .25s, visibility 0s",
    opacity: 1,
    visibility: "unset",
  },
});

export default FridgeImage;
