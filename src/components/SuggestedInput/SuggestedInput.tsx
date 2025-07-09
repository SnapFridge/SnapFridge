import { styled } from "@pigment-css/react";
import { useState, type ComponentProps, type ReactNode } from "react";
import { useCombobox } from "downshift";
import { Label, InputElement } from "@components/Input";

interface Props extends Omit<ComponentProps<"input">, "onChange"> {
  label: ReactNode;
  value: string;
  suggestions: string[];
  onChange: (newVal: string) => void;
}

function SuggestedInput({ label, value, suggestions, onChange, ...delegated }: Props) {
  function filterSuggestions(q: string) {
    const query = q.trim().toLowerCase();
    return suggestions.filter((s) => s.includes(query));
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
    <Wrapper {...delegated}>
      <Label {...getLabelProps()}>{label}</Label>
      <InputElement {...getInputProps({ value })} style={{ maxWidth: "100%" }} />
      <Menu
        {...getMenuProps({
          style: {
            borderWidth: isOpen ? "0 1px 1px 1px" : 0,
          },
        })}
      >
        {isOpen &&
          items.length > 0 &&
          items.map((item, index) => (
            <li
              key={item}
              {...getItemProps({
                item,
                style: {
                  ...itemStyle,
                  color: "var(--text-950)",
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
  borderColor: "var(--background-900)",
  borderStyle: "solid",
  overflow: "auto",
  height: "fit-content",
  maxHeight: "35vh",
});

const itemStyle = {
  paddingLeft: "8px",
};

export default SuggestedInput;
