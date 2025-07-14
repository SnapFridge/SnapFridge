"use client";

import Image from "next/image";
import Icon from "@components/Icon";
import { styled } from "@pigment-css/react";
import Button from "@components/Button";

type Props = {
  src: string;
  deleteImage: (arg: string) => void;
};

function FridgeImage({ src, deleteImage }: Props) {
  return (
    <Wrapper>
      <FridgeImg
        tabIndex={0}
        width={150}
        height={150}
        src={src}
        alt="User uploaded image"
      />
      <DeleteBtn
        onClick={() => {
          deleteImage(src);
        }}
      >
        <Icon icon="Trash2" color="var(--warn-500)" />
      </DeleteBtn>
    </Wrapper>
  );
}
const Wrapper = styled("li")({
  position: "relative",
});

const FridgeImg = styled(Image)({
  border: 0,
  padding: 0,
  borderRadius: "8px",
  overflow: "hidden",
  position: "relative",
  flex: 1,
  minWidth: "125px",
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
    transform: "translateY(-4px)",
  },

  [`${Wrapper}:hover > &, ${FridgeImg}:focus + &, &:focus`]: {
    transition: "all .25s, visibility 0s",
    opacity: 1,
    visibility: "unset",
  },
});

export default FridgeImage;
