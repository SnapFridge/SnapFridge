import { Dialog } from "radix-ui";
import Icon from "@components/Icon";
import Button from "@components/Button";
import { styled } from "@pigment-css/react";
import { type PropsWithChildren, type ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  trigger: ReactNode;
};

function AppDialog({ title, description, trigger, children }: PropsWithChildren<Props>) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Title>{title}</Title>
          <Description>{description}</Description>
          {children}
          <Dialog.Close asChild>
            <XButton variant="icon">
              <Icon icon="X" description="Close dialog" />
            </XButton>
          </Dialog.Close>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const Overlay = styled(Dialog.Overlay)({
  // Rare exception where we don't want the color to change
  background: "#000000",
  opacity: "30%",
  position: "fixed",
  inset: 0,
});

const Content = styled(Dialog.Content)({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "var(--bg)",
  borderRadius: "16px",
  padding: "16px",
  width: "90vw",
  maxWidth: "600px",
});

const XButton = styled(Button)({
  position: "absolute",
  borderRadius: "50%",
  right: "10px",
  top: "10px",
});

const Title = styled(Dialog.Title)({
  fontSize: "var(--1-25rem)",
  color: "var(--txt-950)",
});

const Description = styled(Dialog.Description)({
  fontSize: `${12 / 16}rem`,
  color: "var(--txt-800)",
});

export default AppDialog;
