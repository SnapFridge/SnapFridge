import Button from "@components/Button";
import VisuallyHidden from "@components/VisuallyHidden";
import { styled } from "@pigment-css/react";
import { Plus, X } from "lucide-react";
import { Dialog } from "radix-ui";
import { Suspense, useState } from "react";
import FormSkeleton from "./FormSkeleton";
import IngredientForm from "./IngredientForm";

function IngredientDialog() {
  const [isOpen, setOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <AddTrigger variant="icon">
          <Plus aria-hidden />
          <VisuallyHidden>Add ingredient</VisuallyHidden>
        </AddTrigger>
      </Dialog.Trigger>
      <Dialog.Portal>
        {isOpen && (
          <div>
            <Overlay />
            <Content>
              <Title>Add Ingredient</Title>
              <Description>Add an ingredient for recipe search</Description>
              <Suspense fallback={<FormSkeleton />}>
                <IngredientForm onSubmitSuccess={() => setOpen(false)} />
              </Suspense>
              <Dialog.Close asChild autoFocus>
                <XButton variant="icon">
                  <X aria-hidden />
                  <VisuallyHidden>Close dialog</VisuallyHidden>
                </XButton>
              </Dialog.Close>
            </Content>
          </div>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const AddTrigger = styled(Button)({
  width: "44px",
  height: "44px",
  position: "absolute",
  top: 0,
  right: 0,
});

const Overlay = styled(Dialog.Overlay)({
  position: "fixed",
  inset: 0,
  opacity: 0.7,
  width: "100%",
  height: "100%",
  background: "#000000",
});

const Content = styled(Dialog.Content)({
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  position: "fixed",
  margin: "auto",
  background: "var(--background-0)",
  borderRadius: "16px",
  padding: "12px",
  height: "fit-content",
  width: "90vw",
  maxWidth: "600px",
  border: "1px solid var(--accent-400)",
});

const XButton = styled(Button)({
  position: "absolute",
  borderRadius: "50%",
  right: "10px",
  top: "10px",
});

const Title = styled(Dialog.Title)({
  fontSize: "var(--1-25rem)",
  color: "var(--text-950)",
});

const Description = styled(Dialog.Description)({
  margin: "0 0 12px",
});

export default IngredientDialog;
