// We are assuming:
// - No object nesting
// - Strings only occur inside the ingredient object
// - Whitespace only occurs inside strings

import { type Dispatch } from "react";
import { type Action } from "../InputProvider";
import { type Ingredient } from "@components/Global";

function getIngredientWriter(dispatch: Dispatch<Action>) {
  let inObj = false;
  let objPart = "";
  let objStart = 0;
  let objEnd = 0;
  return new WritableStream({
    write(chunk) {
      let processed = objPart;
      for (const c of chunk) {
        switch (c) {
          case "{":
            inObj = true;

            // Mark current start
            objStart = processed.length;
            break;
          case "}":
            inObj = false;

            // If current doesn't end, it should be previous end
            objEnd = processed.length + 1;
            break;
        }
        processed += c;
      }
      // If we end before the current object end, store the object part for the next chunk
      if (inObj) {
        objPart = processed.slice(objStart);

        // If we didn't even get another object
        if (objEnd < 1) {
          return;
        }
        processed = processed.slice(0, objEnd);
      } else {
        objPart = "";
      }

      // In the rare case where we end right at the comma
      if (processed.at(-1) === ",") {
        processed = processed.slice(0, -1);
      }
      dispatch({
        type: "addIngredients",
        ingredients: JSON.parse(`[${processed}]`) as Ingredient[],
      });
    },
  });
}
export default getIngredientWriter;
