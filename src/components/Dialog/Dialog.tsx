import { Dialog } from "radix-ui";
import Icon from "@components/Icon";
import Button from "@components/Button";
import { styled } from "@pigment-css/react";
import { type ReactNode } from "react";

type Props = {
  title: string;
  show: boolean;
  children: ReactNode;
};
function AppDialog({ title, show, children }: Props) {
  return (
    <Dialog.Root open={show}>
      <Dialog.Close>
        <XButton variant="icon">
          <Icon icon="X" description="Close dialog" />
        </XButton>
      </Dialog.Close>
      <Dialog.Portal>
        <Dialog.Content>
          <Title>{title}</Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const XButton = styled(Button)({
  position: "absolute",
  right: "10px",
  top: "10px"
});

const Title = styled(Dialog.Title)({
  fontSize: "var(--1-25rem)"
});

export default AppDialog;
