import { styled } from "@pigment-css/react";
import { useId, type ComponentProps } from "react";
import Autosuggest from "react-autosuggest";

interface Props extends ComponentProps<"input"> {
  type: "text" | "number" | "search";
  label: string;
  value: string;
  suggestions?: string[];
}

function Input({ type, label, value, onChange, suggestions = [] }: Props) {
  const id = useId();
  if (type === "search" && suggestions.length > 1) {
    function getSuggestions(q: string) {
      const query = q.trim().toLowerCase();
      const queryLen = query.length;
      return queryLen < 1
        ? []
        : suggestions.filter((suggestion) => suggestion.slice(0, queryLen) === query);
    }
    return (
      <>
        <div>
          <Label htmlFor={id}>{label}</Label>
          {/*<Autosuggest
            id={id}
            inputProps={{
              value,
              onChange,
            }}
          ></Autosuggest>*/}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <Label htmlFor={id}>{label}</Label>
          <InputElem id={id} value={value} onChange={onChange}></InputElem>
        </div>
      </>
    );
  }
}

const Label = styled("label")({
  display: "block",
  width: "100%",
  textAlign: "left",
});

const InputElem = styled("input")({});
export default Input;
