import { Tooltip } from "radix-ui";
import Icon from "@components/Icon";
import { styled } from "@pigment-css/react";

type Props = {
  type: "vegan" | "vegetarian" | "sustainable" | "healthy" | "popular";
};

export default function AppTooltip({ type }: Props) {
  let iconName: any;
  let color: string;

  switch (type) {
    case "vegan":
      iconName = "Leaf";
      color = "#57904B";
      break;
    case "vegetarian":
      iconName = "Sprout";
      color = "#5EC064";
      break;
    case "sustainable":
      iconName = "Flower";
      color = "#D27FE1";
      break;
    case "healthy":
      iconName = "Salad";
      color = "#79EDB3";
      break;
    case "popular":
      iconName = "Trophy";
      color = "#ABC40D";
      break;
  }

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button>
            <Icon icon={iconName} color={color} size={36} />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <ContentContainer sideOffset={5}>
            This recipe is {type}!
            <Arrow />
          </ContentContainer>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

const Button = styled("button")({
  background: "none",
  color: "inherit",
  border: "none",
  padding: "0",
  font: "inherit",
  cursor: "pointer",
  outline: "inherit",
});

const ContentContainer = styled(Tooltip.Content)({
  borderRadius: "4px",
  padding: "10px 15px",
  lineHeight: 1,
  fontSize: `${18 / 16}rem`,
  backgroundColor: "white",
  boxShadow: "var(--shadow)",
  color: "black",
  userSelect: "none",
});

const Arrow = styled(Tooltip.Arrow)({
  fill: "white",
});
