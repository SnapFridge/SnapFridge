import { styled } from "@pigment-css/react";
import ClearRecipe from "./ClearRecipe";
import DeleteAccount from "./DeleteAccount";
import LogoutButton from "./Logout";
import { ON_MOBILE } from "@utils";

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
  marginTop: "24px",
  display: "flex",
  gap: "15px",

  [ON_MOBILE]: {
    flexDirection: "column",
  },
});

export default ActionButtons;
