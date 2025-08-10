"use client";

import Button from "@components/Button";
import AppDialog from "@components/Dialog";
import { styled } from "@pigment-css/react";
import { Plus } from "lucide-react";
import { Suspense, useState } from "react";
import FormSkeleton from "./FormSkeleton";
import IngredientForm from "./IngredientForm";

function IngredientDialog() {
  const [isOpen, setOpen] = useState(false);

  return (
    <AppDialog
      open={isOpen}
      onOpenChange={setOpen}
      title="Add Ingredient"
      trigger={
        <AddTrigger variant="icon">
          <Plus aria-hidden />
        </AddTrigger>
      }
    >
      <Suspense fallback={<FormSkeleton />}>
        <IngredientForm
          onSubmitSuccess={() => {
            setOpen(false);
          }}
        />
      </Suspense>
    </AppDialog>
  );
}

const AddTrigger = styled(Button)({
  width: "44px",
  height: "44px",
  position: "absolute",
  top: 0,
  right: 0,
});

export default IngredientDialog;
