import type { Dispatch } from "react";
import type { Action } from "../InputProvider";

function getIngredientWriter(dispatch: Dispatch<Action>) {
  let inStr = false;
  let strPart = "";
  return new WritableStream<string>({
    write(chunk) {
      let str = strPart;
      for (const c of chunk) {
        switch (c) {
          case '"':
            inStr = !inStr;
            if (!inStr) {
              dispatch({
                type: "addIngredient",
                ingredient: str,
              });
              str = "";
            }
            break;
          default:
            if (inStr) {
              str += c;
            }
        }
      }
      if (inStr) {
        strPart = str;
      }
    },
  });
}
export default getIngredientWriter;
