import Button from "@components/Button";
import type { InputDispatch } from "../InputSection/inputReducer.helper";
import { styled } from "@pigment-css/react";

type Props = {
  dispatch: InputDispatch;
};

function AddIngredient({ dispatch }: Props) {
  function addIngredient() {
    dispatch;
  }
  <NewIngredientBtn variant="secondary" onClick={addIngredient}>
    New Ingredient...
  </NewIngredientBtn>;
}
const NewIngredientBtn = styled(Button)({});

export default AddIngredient;
