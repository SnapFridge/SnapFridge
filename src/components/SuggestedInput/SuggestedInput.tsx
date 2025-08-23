import { InputElement, Label } from "@components/Input";
import { styled } from "@pigment-css/react";
import { useCombobox } from "downshift";
import { type ComponentPropsWithoutRef, type ReactNode, useRef, useState } from "react";

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
  const ref = useRef<HTMLInputElement>(null);

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
      ref.current!.setCustomValidity(
        suggestions.includes(inputValue) ? "" : "Invalid entry"
      );
      onChange(inputValue);
    },
    items,
  });

  return (
    <Wrapper>
      <Label {...getLabelProps()}>{label}</Label>
      <InputElement {...getInputProps({ value, ref, type: "text" })} {...delegated} />
      <Menu
        {...getMenuProps()}
        style={
          isOpen && items.length > 0
            ? {
                visibility: "unset",
              }
            : undefined
        }
      >
        {items.map((item, index) => (
          <Item
            key={item}
            {...getItemProps({
              item,
              style: {
                background:
                  highlightedIndex === index
                    ? "var(--background-100)"
                    : "var(--background-0)",
                fontWeight: selectedItem === item ? 700 : "unset",
              },
            })}
          >
            {item}
          </Item>
        ))}
      </Menu>
    </Wrapper>
  );
}

const Wrapper = styled("div")({
  position: "relative",
  width: "100%",
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
  scrollbarWidth: "none",
});

const Item = styled("li")({
  color: "var(--text-950)",
  padding: "6px 8px",
  contentVisibility: "auto",
});

export default SuggestedInput;
