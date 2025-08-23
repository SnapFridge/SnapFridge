import Button from "@components/Button";
import { styled } from "@pigment-css/react";
import { scaleClamped } from "@utils";
import { ToggleGroup } from "radix-ui";

type Props = {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
};

// Pages are 0-indexed everywhere, but rendered as 1-indexed
function Pagination({ page, pageCount, onChange }: Props) {
  function getPageBtns() {
    const btns = [];
    for (let i = 0; i < pageCount; ++i) {
      btns.push(
        <ToggleGroup.Item key={i} value={`${i}`} asChild>
          <PageBtn
            variant={i === page ? "secondary" : "primary"}
            onClick={() => {
              onChange(i);
            }}
          >
            {i + 1}
          </PageBtn>
        </ToggleGroup.Item>
      );
    }
    return btns;
  }
  return (
    <Wrapper>
      <PageBtn
        variant="primary"
        disabled={page < 1}
        onClick={() => {
          onChange(page - 1);
        }}
      >
        {"<"}
      </PageBtn>
      <ToggleGroupRoot type="single">{getPageBtns()}</ToggleGroupRoot>
      <PageBtn
        variant="primary"
        disabled={page > pageCount - 2}
        onClick={() => {
          onChange(page + 1);
        }}
      >
        {">"}
      </PageBtn>
    </Wrapper>
  );
}

const Wrapper = styled("div")({
  gap: "3px",
  display: "flex",
  width: "100%",
  justifyContent: "center",
  margin: "0 0 28px",
});

const PageBtn = styled(Button)({
  ["--size" as string]: scaleClamped(28, 40),
  width: "var(--size)",
  height: "var(--size)",
  fontSize: "var(--1rem)",
});

const ToggleGroupRoot = styled(ToggleGroup.Root)({
  gap: "3px",
  display: "flex",
});

export default Pagination;
