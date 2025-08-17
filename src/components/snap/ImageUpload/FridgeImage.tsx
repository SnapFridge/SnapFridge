import Button from "@components/Button";
import VisuallyHidden from "@components/VisuallyHidden";
import { styled } from "@pigment-css/react";
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
  maxWidth: "150px",
  maxHeight: "150px",
  overflow: "clip",
  borderRadius: "8px",
  width: "calc(33% - var(--gap))",
  [ON_MOBILE]: {
    width: "calc(50% - var(--gap))",
  },
});

const ImageBtn = styled("button")({
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

export default FridgeImage;
