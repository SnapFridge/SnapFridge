"use client";

import { styled } from "@pigment-css/react";
import { useRef, useState } from "react";
import { type Ingredient } from "@utils";
import Icon from "@components/Icon";
import { useInputState } from "../InputProvider";
import EditDialog from "../EditDialog";
import Button from "@components/Button";

type Props = {
  ingredient: Ingredient;
};

function IngredientBox({ ingredient }: Props) {
  const { dispatch } = useInputState();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const deleteBtn = useRef<HTMLButtonElement>(null);
  const editBtn = useRef<HTMLButtonElement>(null);
  return (
    <Wrapper>
      <EditDialog
        ingredient={ingredient}
        open={isDialogOpen}
        onOpenChange={setDialogOpen}
      />
      <IngredientBtn
        onClick={() => {
          deleteBtn.current!.focus();
          editBtn.current!.tabIndex = 0;
        }}
      >
        <IngredientName>{ingredient.name}</IngredientName>
        <p>
          {ingredient.amount} {ingredient.unit}
        </p>
      </IngredientBtn>
      <ActionContainer>
        <ActionButton
          ref={deleteBtn}
          tabIndex={-1}
          onClick={() => {
            dispatch({ type: "removeIngredient", ingredient });
          }}
        >
          <Icon
            icon="Trash2"
            color="var(--warn-500)"
            description={`Delete ${ingredient.name}`}
          />
        </ActionButton>
        <ActionButton
          ref={editBtn}
          tabIndex={-1}
          onClick={() => {
            setDialogOpen(true);
          }}
          onBlur={() => {
            editBtn.current!.tabIndex = -1;
          }}
        >
          <Icon
            icon="PencilLine"
            color="var(--gray-950)"
            description={`Edit ${ingredient.name}`}
          />
        </ActionButton>
      </ActionContainer>
    </Wrapper>
  );
}

const Wrapper = styled("li")({
  height: "38px",
  width: "fit-content",
  position: "relative",
  isolation: "isolate",
});

const IngredientBtn = styled("button")({
  display: "flex",
  gap: "8px",
  backgroundColor: "var(--accent-200)",
  padding: "6px 12px",
  borderRadius: "100px",
  height: "100%",
  color: "var(--text-950)",
  width: "fit-content",
  border: "2px solid var(--accent-400)",
  boxShadow: "var(--shadow)",

  transition: "transform .22s",
  [`${Wrapper}:hover > &, &:focus`]: {
    transform: "translateY(-6px)",
  },
});

const IngredientName = styled("p")({
  maxWidth: "150px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const ActionButton = styled(Button)({
  background: "transparent",
  padding: "4px",
  border: 0,

  transition: "transform .25s",
  "&:hover, &:focus": {
    transform: "translateY(-5px)",
  },
});

// Used so it's easier to click the buttons
const ActionContainer = styled("div")({
  position: "absolute",
  zIndex: 1,
  top: "calc(-100% - 4px)",
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
  transition: "opacity .22s, visibility 0s .22s",

  [`${Wrapper}:hover > &, ${IngredientBtn}:focus + &, &:focus-within`]: {
    transition: "opacity .22s, visibility 0s",
    opacity: 1,
    visibility: "unset",
  },
});

export default IngredientBox;
