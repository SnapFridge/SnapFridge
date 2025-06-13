import Button from "@components/Button";
import { ON_MOBILE, PageMargin } from "@components/Global";
import { styled } from "@pigment-css/react";

export default function Page() {
  return (
    <PageMargin>
      <InputSection></InputSection>
    </PageMargin>
  );
}

const InputSection = styled("div")({
  display: "flex",
  flexDirection: "column",
});
