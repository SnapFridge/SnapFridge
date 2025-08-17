import Button from "@components/Button";
import VisuallyHidden from "@components/VisuallyHidden";
import { css, styled } from "@pigment-css/react";
import { ON_MOBILE } from "@utils";
import { Trash2 } from "lucide-react";
import Image from "next/image";

type Props = {
  src: string;
  deleteImage: (arg: string) => void;
};

function FridgeImage({ src, deleteImage }: Props) {
  return (
    <Wrapper>
      <ImageBtn
        onClick={(e) => (e.currentTarget.nextSibling! as HTMLButtonElement).focus()}
        type="button"
      >
        <Image
          className={ImgCSS}
          width={150}
          height={150}
          src={src}
          onLoad={() => URL.revokeObjectURL(src)}
          alt="User uploaded image"
        />
      </ImageBtn>
      <DeleteBtn tabIndex={-1} onClick={() => deleteImage(src)}>
        <Trash2 aria-hidden color="var(--warn-500)" />
        <VisuallyHidden>Delete image</VisuallyHidden>
      </DeleteBtn>
    </Wrapper>
  );
}
const Wrapper = styled("li")({
  position: "relative",
  overflow: "clip",
  borderRadius: "8px",
  width: "min(calc(33% - var(--gap)), 163px)",
  [ON_MOBILE]: {
    width: "min(calc(50% - var(--gap)), 163px)",
  },
  aspectRatio: 1,
  lineHeight: 0,
});

const ImageBtn = styled("button")({
  width: "100%",
  height: "100%",

  transition: "all .25s",
  [`${Wrapper}:hover > &, &:focus`]: {
    boxShadow: "var(--shadow)",
    transform: "scale(1.05)",
  },
});

const DeleteBtn = styled(Button)({
  position: "absolute",
  right: "7px",
  top: "7px",
  background: "#000000b3",
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

const ImgCSS = css({
  width: "100%",
  height: "100%",
});

export default FridgeImage;
