import { css, styled } from "@pigment-css/react";
import { ON_MOBILE, PageMargin, scaleClamped } from "@utils";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Page() {
  const tooltipSize = scaleClamped(30, 40);
  return (
    <SkeletonTheme
      baseColor="var(--skeleton-base)"
      highlightColor="var(--skeleton-highlight)"
    >
      <Skeleton height="min(calc(100vw * 0.618), 60vh)" />
      <PageMargin>
        <TitleSection>
          <Title>
            <Skeleton width="clamp(120px, 50vw, 320px)" />
          </Title>
          <Skeleton width={tooltipSize} height={tooltipSize} />
          <Skeleton width={tooltipSize} height={tooltipSize} />
        </TitleSection>
        <AllergenWarning>
          <Skeleton width="100%" height={84} />
        </AllergenWarning>
        <Wrapper>
          <RecipeInfoContainer>
            <Skeleton count={6} />
            <Skeleton width="min(100%, 480px)" height={114} />
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
      </PageMargin>
    </SkeletonTheme>
  );
}

const AllergenWarning = styled("div")({
  width: "min(100%, 288px)",
  margin: "0 0 24px",
  [ON_MOBILE]: {
    margin: "0 auto 24px",
  },
});

const RecipeInfoContainer = styled("div")({
  width: "100%",
});

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

const TitleSection = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "24px",
});

const Title = styled("h1")({
  fontSize: scaleClamped(24, 35),
  margin: "5px 0 24px",
  [ON_MOBILE]: {
    margin: "12px 0 24px",
    width: "100%",
    textAlign: "center",
  },
});

const Wrapper = styled("div")({
  display: "flex",
  gap: "16px",
});
