import { styled } from "@pigment-css/react";
import { useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { useCombobox } from "downshift";
import { Label, InputElement } from "@components/Input";

interface Props extends Omit<ComponentPropsWithoutRef<"input">, "onChange"> {
  label: ReactNode;
  value: string;
  suggestions: string[];
  onChange: (newVal: string) => void;
}

function SuggestedInput({ label, value, suggestions, onChange, ...delegated }: Props) {
  function filterSuggestions(q: string) {
    const query = q.trim().toLowerCase();
    return suggestions.filter((s) => s.startsWith(query));
  }

  const [items, setItems] = useState(suggestions);
  const {
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    isOpen,
    highlightedIndex,
    selectedItem,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      setItems(filterSuggestions(inputValue));
      onChange(inputValue);
    },
    items,
  });
  return (
    <Wrapper style={{ maxWidth: "100%" }}>
      <Label {...getLabelProps()}>{label}</Label>
      <InputElement {...getInputProps({ value, type: "text" })} {...delegated} />
      <Menu
        {...getMenuProps()}
        style={
          isOpen && items.length > 0
            ? {
                visibility: "visible",
              }
            : undefined
        }
      >
        {items.map((item, index) => (
          <li
            key={item}
            {...getItemProps({
              item,
              style: {
                color: "var(--text-950)",
                padding: "6px 8px",
                contentVisibility: "auto",
                backgroundColor:
                  highlightedIndex === index
                    ? "var(--background-100)"
                    : "var(--background-0)",
                fontWeight: selectedItem === item ? "bold" : "normal",
              },
            })}
          >
            {item}
          </li>
        ))}
      </Menu>
    </Wrapper>
  );
}

const Wrapper = styled("div")({
  width: "fit-content",
  position: "relative",
});

const Menu = styled("ul")({
  width: "100%",
  zIndex: 1,
  position: "absolute",
  border: "1px solid var(--background-900)",
  borderTop: 0,
  visibility: "hidden",
  overflow: "auto",
  height: "fit-content",
  maxHeight: "35vh",
});

export default SuggestedInput;
