import { styled } from "@pigment-css/react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function FormSkeleton() {
  return (
    <div>
      <SkeletonTheme
        baseColor="var(--skeleton-base)"
        highlightColor="var(--skeleton-highlight)"
      >
        <Container>
          <Name>
            <Skeleton />
          </Name>
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
  margin: "0 0 6px",
  fontSize: `${16 / 16}rem`,
});

const Name = styled("label")({
  display: "inline-block",
  width: "min(100%, 200px)",
});

const Input = styled("div")({
  width: "100%",
});

const Button = styled("div")({
  lineHeight: 1,
  width: "min(100%, 150px)",
  margin: "10px 0 0",
});

export default FormSkeleton;
