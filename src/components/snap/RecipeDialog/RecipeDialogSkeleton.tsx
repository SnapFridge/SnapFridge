import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { styled } from "@pigment-css/react";

function RecipeDialogSkeleton() {
  return (
    <div>
      <SkeletonTheme
        baseColor="var(--skeleton-base)"
        highlightColor="var(--skeleton-highlight)"
      >
        <Container>
          <Label>
            <Skeleton width={200} />
          </Label>
          <Skeleton width={310} height={30} />
        </Container>
        <Container>
          <Label>
            <Skeleton width={120} />
          </Label>
          <Skeleton width={310} height={30} />
        </Container>
        <Container>
          <Label>
            <Skeleton width={280} />
          </Label>
          <Skeleton width={310} height={30} />
        </Container>
        <Button>
          <Skeleton width={150} height={44} borderRadius={8} />
        </Button>
      </SkeletonTheme>
    </div>
  );
}

const Label = styled("label")({
  fontSize: `${16 / 16}rem`,
});

const Container = styled("div")({
  marginBottom: "6px",
});

const Button = styled("div")({
  lineHeight: 1,
});

export default RecipeDialogSkeleton;
