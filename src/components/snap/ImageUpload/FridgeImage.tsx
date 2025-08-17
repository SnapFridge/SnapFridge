import Button from "@components/Button";
import VisuallyHidden from "@components/VisuallyHidden";
import { styled } from "@pigment-css/react";
import { scaleClamped } from "@utils";
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
  ["--size" as string]: scaleClamped(113, 150, false, 320, 406),
  maxWidth: "var(--size)",
  maxHeight: "var(--size)",
  overflow: "clip",
  borderRadius: "8px",
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
