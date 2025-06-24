import { Dialog } from "radix-ui";
import  AutoSuggest from "react-autosuggest";
import Icon from "@components/Icon";
import { type Ingredient } from "@components/Global";
import { css } from '@pigment-css/react';

type Props = {
  variant: "edit" | "add";
  prefilledIngredient: Ingredient;
}
function AppDialog({ variant,  }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Portal>
        <Dialog.Title className={Title}>{
          `${variant === "edit" ? "Edit" : "Add"} Ingredient`}
        </Dialog.Title>
        <fieldset>
          <label></label>
        </fieldset>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const Title = css({
  
});

export default AppDialog;