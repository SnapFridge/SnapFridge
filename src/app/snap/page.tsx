import InputSection from "@components/snap/InputSection";
import { PageMargin } from "@components/Global";
import RecipeSection from "@components/RecipeSection";

export default function Page() {
  return (
    <PageMargin>
      <InputSection></InputSection>
      <RecipeSection />
      <RecipeSection headerText="Previous Snaps" />
    </PageMargin>
  );
}
