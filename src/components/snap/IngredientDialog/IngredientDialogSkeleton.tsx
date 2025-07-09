import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { styled } from "@pigment-css/react";

function FormSkeleton() {
  return (
    <div>
      <SkeletonTheme
        baseColor="var(--skeleton-base)"
        highlightColor="var(--skeleton-highlight)"
      >
        <Container>
          <IngredientName>
            <Skeleton />
          </IngredientName>
          <Input>
            <Skeleton height={`${38 / 16}rem`} />
          </Input>
        </Container>

        <Container>
          <Amount>
            <Skeleton />
          </Amount>
          <Input>
            <Skeleton height={`${38 / 16}rem`} />
          </Input>
        </Container>

        <Container>
          <Unit>
            <Skeleton />
          </Unit>
          <Input>
            <Skeleton height={`${38 / 16}rem`} />
          </Input>
        </Container>

        <Button>
          <Skeleton height={44} />
        </Button>
      </SkeletonTheme>
    </div>
  );
}

const Container = styled("div")({
  marginBottom: "6px",
  fontSize: `${16 / 16}rem`,
});

// Label Names
const IngredientName = styled("label")({
  display: "inline-block",
  width: "min(100%, 200px)",
});

const Amount = styled("label")({
  display: "inline-block",
  width: "min(100%, 120px)",
});

const Unit = styled("label")({
  display: "inline-block",
  width: "min(100%, 280px)",
});

const Input = styled("div")({
  width: "min(100%, 310px)",
});

const Button = styled("div")({
  lineHeight: 1,
  width: "min(100%, 150px)",
});

export default FormSkeleton;
