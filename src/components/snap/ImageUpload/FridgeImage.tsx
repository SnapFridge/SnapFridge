"use client";

import Image from "next/image";
import Icon from "@components/Icon";
import React, { useRef } from "react";
import { css, styled } from "@pigment-css/react";

type Props = {
  src: string;
  deleteImage: (arg: string) => void;
};

function FridgeImage({ src, deleteImage }: Props) {
  const img = useRef<HTMLButtonElement>(null);

  function handleHoverEnter() {
    img.current!.classList.add("active");
  }

  function handleHoverLeave() {
    img.current!.classList.remove("active");
  }

  function handleClick() {
    img.current!.classList.toggle("active");
  }

  return (
    <Wrapper onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
      <ImageBtn onClick={handleClick} ref={img}>
        <Image
          className={FridgeImg}
          width={150}
          height={150}
          src={src}
          alt="User uploaded image"
        />
      </ImageBtn>
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

const ImageBtn = styled("button")({
  borderRadius: "8px",
  overflow: "hidden",
  position: "relative",
  flex: 1,
  minWidth: "125px",
  maxWidth: "300px",

  transition: "all .25s",
  "&.active": {
    boxShadow: "var(--shadow)",
    transform: "scale(1.05)",
  },
});

const DeleteBtn = styled("button")({
  position: "absolute",
  right: "8px",
  top: "8px",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  borderRadius: "4px",
  padding: "4px",
  opacity: 0,

  transition: "all .25s",
  "&:hover": {
    transform: "translateY(-2px)",
  },

  [`${ImageBtn}.active + &`]: {
    opacity: 1,
  },
});

const FridgeImg = css({
  width: "100%",
  aspectRatio: "1 / 1",
  objectFit: "cover",
});

export default FridgeImage;
