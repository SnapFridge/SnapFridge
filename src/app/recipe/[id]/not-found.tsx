import { styled } from "@pigment-css/react";
import Link from "@components/Link";

export default function NotFound() {
  return (
    <Container>
      <TitleMessage>404 - Recipe Not Found</TitleMessage>
      <HomeButton href="/">Back to Home</HomeButton>
    </Container>
  );
}

const Container = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const TitleMessage = styled("h1")({});

const HomeButton = styled(Link)({
  marginTop: "12px",
  backgroundColor: "transparent",
  border: "1px solid var(--accent-200)",
  padding: "12px 36px",
  borderRadius: "24px",

  "&:hover": {
    backgroundColor: "var(--gray-100)",
  },
});
