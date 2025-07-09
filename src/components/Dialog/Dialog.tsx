"use client";

import { Dialog } from "radix-ui";
import Icon from "@components/Icon";
import Button from "@components/Button";
import { styled } from "@pigment-css/react";
import { useState } from "react";
import { type Variants, AnimatePresence } from "motion/react";
import { div as MotionDiv } from "motion/react-client";

interface Props extends React.ComponentProps<typeof Dialog.Root> {
  title: React.ReactNode;
  description?: React.ReactNode;
  trigger: React.ReactNode;
}

function AppDialog({
  title,
  description,
  trigger,
  children,
  open,
  defaultOpen,
  onOpenChange,
  ...delegated
}: Props) {
  const [isOpen, setOpen] = useState(defaultOpen ?? false);

  const realOpen = open ?? isOpen;
  const realOnOpenChange = onOpenChange ?? setOpen;
  return (
    <Dialog.Root open={realOpen} onOpenChange={realOnOpenChange} {...delegated}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <AnimatePresence>
        {realOpen && (
          <>
            <Dialog.Portal forceMount>
              (
              <Overlay>
                <Background
                  variants={BackgroundVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                />
              </Overlay>
              <ContentContainer>
                <Content asChild>
                  <MotionDiv
                    variants={ContentVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                  >
                    <Title>{title}</Title>
                    <Description>{description}</Description>
                    {children}
                    <Dialog.Close asChild autoFocus>
                      <XButton variant="icon">
                        <Icon icon="X" description="Close dialog" />
                      </XButton>
                    </Dialog.Close>
                  </MotionDiv>
                </Content>
              </ContentContainer>
            </Dialog.Portal>
          </>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

const ContentVariants: Variants = {
  initial: {
    y: 10,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: 10,
    opacity: 0,
  },
};

const BackgroundVariants: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.7,
  },
  exit: {
    opacity: 0,
  },
};

// Set the content to be centered based on a div that takes up the entire screen
const ContentContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
});

const Overlay = styled(Dialog.Overlay)({
  // Rare exception where we don't want the color to change
  position: "fixed",
  inset: 0,
});

const Background = styled(MotionDiv)({
  width: "100%",
  height: "100%",
  background: "#000000",
});

const Content = styled(Dialog.Content)({
  position: "relative",
  background: "var(--background-0)",
  borderRadius: "16px",
  padding: "12px",
  width: "90vw",
  maxWidth: "600px",
  border: "1px solid var(--accent-400)",
});

const XButton = styled(Button)({
  position: "absolute",
  borderRadius: "50%",
  right: "10px",
  top: "10px",
});

const Title = styled(Dialog.Title)({
  fontSize: "var(--1-25rem)",
  color: "var(--text-950)",
});

const Description = styled(Dialog.Description)({
  fontSize: `${12 / 16}rem`,
  color: "var(--text-800)",
});

export default AppDialog;
