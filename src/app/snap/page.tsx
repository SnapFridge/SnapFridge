import Button from '@components/Button';
import { ON_MOBILE, PageMargin } from '@components/Global';
import { styled } from '@pigment-css/react';

export default function Page() {
  return (
    <PageMargin>
      <InputSection>
        <PhotoSection>
          <h1>Upload Photos</h1>
          <Photos>
          </Photos>
          <Button></Button>
        </PhotoSection>
        <IngredientSection>
          <h1>Ingredients</h1>
          <Ingredients>

          </Ingredients>
        </IngredientSection>
      </InputSection>
    </PageMargin>
  )
}
const InputSection = styled("section")({
  display: "flex",
  width: "100%",
  gap: "3%",
  minHeight: "200px",

  [ON_MOBILE]: {
    display: "block",
  }
})

const PhotoSection = styled("section")({
  border: "1px solid var(--accent-950)",
  borderRadius: "12px",
  padding: "24px",
  boxShadow: "var(--shadow)",
  width: "100%",
  fontSize: "var(--1-25rem)",
});

const Photos = styled("div")({
  width: "100%",
});

const IngredientSection = styled("section")({
  border: "1px solid var(--accent-950)",
  borderRadius: "12px",
  padding: "24px",
  boxShadow: "var(--shadow)",
  fontSize: "var(--1-25rem)",
  width: "100%",
  
  [ON_MOBILE]: {
    marginTop: "20px",
  }
});

const Ingredients = styled("ul")({

});