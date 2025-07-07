import Button from "@components/Button";
import AppDialog from "@components/Dialog";
import Icon from "@components/Icon";
import { styled } from "@pigment-css/react";
import { Suspense } from "react";
import IngredientForm from "./IngredientForm";

function RecipeDialog() {
  return (
    <AppDialog
      title="Add Ingredient"
      trigger={
        <AddTrigger variant="icon">
          <Icon icon="Plus" description="Add ingredient" />
        </AddTrigger>
      }
    >
      {/* TODO: Implement an actual form skeleton */}
      <Suspense fallback={<p>Loading form..</p>}>
        <IngredientForm />
      </Suspense>
    </AppDialog>
  );
}

const AddTrigger = styled(Button)({
  position: "absolute",
  top: 0,
  right: 0,
});

export default RecipeDialog;
