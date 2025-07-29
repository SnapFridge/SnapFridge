import LoginButtons from "@components/login/LoginButtons";
import { PageMargin } from "@utils";
import { ToastProvider } from "@radix-ui/react-toast";

export default function Page() {
  return (
    <PageMargin>
      <LoginButtons />
      <ToastProvider></ToastProvider>
    </PageMargin>
  );
}
