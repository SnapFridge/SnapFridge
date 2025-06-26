"use client";

import { type CSSProperties } from "react";
import { styled } from "@pigment-css/react";
import FileUpload from "../ImageUpload/ImageUpload";
import IngredientSection from "@components/snap/IngredientSection";
import { BarLoader } from "react-spinners";
import { useActionState } from "react";
import AIprocessImages from "@app/api/actions";
import useToast from "@components/ToastProvider/UseToast";
import { useInputState } from "../InputProvider";

function InputSection() {
  const { state, dispatch } = useInputState();
  const { files } = state;

  const boundAction = AIprocessImages.bind(null, files);
  const { addError } = useToast();

  // Update the ingredient state when calling the action
  async function wrapperFunction() {
    try {
      const result = await boundAction();
      if (result) {
        dispatch({ type: "addIngredients", ingredients: result });
      }
    } catch {
      addError("Scan error", "Gemini likely timed out.");
    }
  }

  const [_message, formAction, isPending] = useActionState(wrapperFunction, null);

  return (
    <Wrapper>
      <FileUpload formAction={formAction} />
      <BarLoader color="var(--text-950)" cssOverride={Fetching} loading={isPending} />
      <IngredientSection />
    </Wrapper>
  );
}

const Fetching: CSSProperties = {
  width: "100%",
  maxWidth: "576px"
};

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%"
});

export default InputSection;
