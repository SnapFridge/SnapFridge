import { styled } from "@pigment-css/react";
import { ON_MOBILE } from "@utils";
import ClearRecipe from "./ClearRecipe";
import DeleteAccount from "./DeleteAccount";
import LogoutButton from "./Logout";

function ActionButtons() {
  return (
    <Container>
      <LogoutButton />
      <ClearRecipe />
      <DeleteAccount />
    </Container>
  );
}

const Container = styled("div")({
  margin: "24px 0 0",
  display: "flex",
  gap: "15px",

  [ON_MOBILE]: {
    flexDirection: "column",
  },
});

export default ActionButtons;
