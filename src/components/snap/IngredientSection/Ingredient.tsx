import Button from "@components/Button";
import VisuallyHidden from "@components/VisuallyHidden";
import { styled } from "@pigment-css/react";
import { Trash2 } from "lucide-react";
import { useInputState } from "../InputProvider";

type Props = {
  ingredient: string;
};

function IngredientBox({ ingredient }: Props) {
  const { dispatch } = useInputState();
  return (
    <Wrapper>
      <IngredientBtn
        onClick={(e) =>
          (e.currentTarget.nextSibling!.firstChild! as HTMLButtonElement).focus()
        }
      >
        <span>{ingredient}</span>
      </IngredientBtn>
      <ActionContainer>
        <ActionButton
          tabIndex={-1}
          onClick={() => {
            dispatch({ type: "removeIngredient", ingredient });
          }}
        >
          <Trash2 aria-hidden color="var(--warn-500)" />
          <VisuallyHidden>Delete {ingredient}</VisuallyHidden>
        </ActionButton>
      </ActionContainer>
    </Wrapper>
  );
}

const Wrapper = styled("li")({
  height: "38px",
  width: "fit-content",
  position: "relative",
});

const IngredientBtn = styled("button")({
  display: "flex",
  gap: "8px",
  background: "var(--accent-200)",
  padding: "6px 12px",
  borderRadius: "100px",
  height: "100%",
  color: "var(--text-950)",
  width: "fit-content",
  maxWidth: "220px",
  border: "2px solid var(--accent-400)",
  boxShadow: "var(--shadow)",

  transition: "transform .25s",
  [`${Wrapper}:hover > &, &:focus`]: {
    transform: "scale(1.04)",
  },

  "& > span": {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
});

const ActionButton = styled(Button)({
  background: "none",
  padding: "4px",

  transition: "transform .25s",
  "&:hover, &:focus": {
    transform: "translateY(-5px)",
  },
});

// Used so it's easier to click the buttons
const ActionContainer = styled("div")({
  position: "absolute",
  zIndex: 1,
  top: "-100%",
  left: 0,
  right: 0,
  margin: "auto",
  width: "fit-content",
  height: "fit-content",
  background: "var(--gray-200)",
  borderRadius: "4px",
  boxShadow: "var(--shadow)",
  opacity: 0,
  visibility: "hidden",
  transition: "opacity .25s, visibility 0s .25s",

  [`${Wrapper}:hover > &, ${IngredientBtn}:focus + &, &:focus-within`]: {
    transition: "opacity .25s, visibility 0s",
    opacity: 1,
    visibility: "unset",
  },
});

export default IngredientBox;
