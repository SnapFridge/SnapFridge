import { css, styled } from "@pigment-css/react";
import { ON_MOBILE, PageMargin } from "@utils";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Page() {
  return (
    <SkeletonTheme
      baseColor="var(--skeleton-base)"
      highlightColor="var(--skeleton-highlight)"
    >
      <figure>
        <Skeleton height="min(362px, 50vh)" />
        <SourceCredit>
          <Skeleton />
        </SourceCredit>
      </figure>
      <PageMargin>
        <TitleSection>
          <Title>
            <Skeleton width="100%" />
            <BottomTitleSectionContainer>
              <Skeleton width="clamp(120px, 50vw, 320px)" />
              <AppTooltipContainer>
                <Skeleton width={36} height={36} />
                <Skeleton width={36} height={36} />
              </AppTooltipContainer>
            </BottomTitleSectionContainer>
          </Title>
        </TitleSection>

        <AllergenWarning>
          <Skeleton width="100%" height={84} />
        </AllergenWarning>

        <Wrapper>
          <RecipeInfoContainer>
            <Summary>
              <Skeleton count={8} />
            </Summary>

            <CookingInfo>
              <Skeleton width="min(100%, 480px)" height={200} />
            </CookingInfo>
          </RecipeInfoContainer>

          <RecipeActionsContainer>
            <RecipeAction>
              <Skeleton width={36} height={36} />
              <Skeleton width={48} />
            </RecipeAction>
            <RecipeAction>
              <Skeleton width={36} height={36} />
              <Skeleton width={48} />
            </RecipeAction>
            <Skeleton height={48} width="100%" className={RecipeActionButton} />
          </RecipeActionsContainer>
        </Wrapper>

        <ListContainer>
          <IngredientsList>
            <Skeleton width="100%" height={460} />
          </IngredientsList>
          <IngredientsList>
            <Skeleton width="100%" height={460} />
          </IngredientsList>
        </ListContainer>

        <StepsContainer>
          <StepItem>
            <StepTitle>
              <Skeleton />
            </StepTitle>
            <RecipeSteps>
              <Skeleton count={8} />
            </RecipeSteps>
          </StepItem>

          <StepItem>
            <StepTitle>
              <Skeleton />
            </StepTitle>
            <RecipeSteps>
              <Skeleton count={8} />
            </RecipeSteps>
          </StepItem>
        </StepsContainer>
      </PageMargin>
    </SkeletonTheme>
  );
}

const SourceCredit = styled("small")({
  display: "block",
  marginLeft: "auto",
  width: "min(100%, 192px)",
  marginRight: "36px",
});

const TitleSection = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "24px",
});

const Title = styled("h1")({
  margin: "5px",
  width: "100%",
});

const BottomTitleSectionContainer = styled("div")({
  display: "flex",
  gap: "12px",
});

const AppTooltipContainer = styled("div")({
  display: "flex",
  gap: "12px",
  overflow: "hidden",
});

const AllergenWarning = styled("div")({
  width: "min(100%, 331px)",
  height: "84px",
  marginBottom: "12px",
});

const Wrapper = styled("div")({
  display: "flex",
  gap: "16px",
});

const RecipeInfoContainer = styled("div")({
  width: "100%",
});

const Summary = styled("p")({});

const RecipeActionsContainer = styled("div")({
  width: "100px",
  [ON_MOBILE]: {
    display: "none",
  },
});

const RecipeAction = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const RecipeActionButton = css({
  borderRadius: `${36 / 16}rem`,
});

const CookingInfo = styled("div")({
  margin: "24px 0 0",
});

const ListContainer = styled("div")({
  margin: "24px 0 0",
  display: "flex",
  justifyContent: "space-around",
  gap: "36px",

  [ON_MOBILE]: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

const IngredientsList = styled("div")({
  width: "min(100%, 380px)",
  height: "460px",
});

const StepsContainer = styled("ul")({
  margin: "24px 0 0",
});

const StepItem = styled("li")({});

const StepTitle = styled("h1")({});

const RecipeSteps = styled("div")({
  marginLeft: "24px",
});
