import Tooltip from "@components/recipe/Tooltip";
import { RecipeInfo, type SpoonacularRecipe } from "@components/recipe/RecipeInfo";
import Image from "next/image";
import { css, styled } from "@pigment-css/react";
import { ON_MOBILE, PageMargin, type SavedRecipe } from "@utils";
import RecipeActions from "@components/recipe/RecipeActions";
import RecipeInfoList from "@components/recipe/RecipeInfoList";
import RecipeStepsList from "@components/recipe/DetailedRecipe";
import { notFound } from "next/navigation";
import NutrientInfoList from "@components/recipe/RecipeInfoList/NutrientInfoList";
import { UnitProvider } from "@components/UnitProvider";
import AllergenWarning from "@components/recipe/AllergenWarning";
import { createClient } from "@utils/supabase/server";

// Revalidate the cache every hour
const CACHE_ONE_HOUR = 3600;

async function getRecipe(id: string) {
  const recipeInfoRes = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true`,
    {
      headers: {
        "x-api-key": process.env["SPOONACULAR_KEY"]!,
      },
      next: {
        revalidate: CACHE_ONE_HOUR,
      },
    }
  );
  if (!recipeInfoRes.ok) {
    if (recipeInfoRes.status === 404) {
      return null;
    }
    const errorDetails = await recipeInfoRes.text();
    throw new Error(
      `Failed to fetch recipe ${id}: ${recipeInfoRes.status} ${recipeInfoRes.statusText} - ${errorDetails}`
    );
  }
  const recipeInfo = (await recipeInfoRes.json()) as SpoonacularRecipe;
  if (!recipeInfo || Object.keys(recipeInfo).length === 0) {
    return null;
  }
  return recipeInfo;
}

async function getSavedRecipes(): Promise<SavedRecipe[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return [];
  }
  const { data } = await supabase.from("saved_recipes").select();
  return data![0]!.recipes as SavedRecipe[];
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipeInfo = await getRecipe(id);
  if (!recipeInfo) notFound();
  const initialSavedRecipes = await getSavedRecipes();

  return (
    <UnitProvider>
      <figure>
        <Image
          className={RecipeImage}
          src={recipeInfo.image}
          alt={recipeInfo.title}
          width={556}
          height={370}
          quality={90}
        />
        <SourceCredit>
          Source: <Link href={recipeInfo.sourceUrl}>{recipeInfo.creditsText}</Link>
        </SourceCredit>
      </figure>
      <PageMargin>
        <TitleSection>
          <Title>{recipeInfo.title}</Title>
          {recipeInfo.vegan && <Tooltip type="vegan" />}
          {recipeInfo.vegetarian && <Tooltip type="vegetarian" />}
          {recipeInfo.sustainable && <Tooltip type="sustainable" />}
          {recipeInfo.veryHealthy && <Tooltip type="healthy" />}
          {recipeInfo.veryPopular && <Tooltip type="popular" />}
        </TitleSection>
        <AllergenWarning recipeInfo={recipeInfo} />
        <Wrapper>
          <RecipeActions
            id={recipeInfo.id}
            name={recipeInfo.title}
            imageType={recipeInfo.imageType}
            initialSavedRecipes={initialSavedRecipes}
          />
          <RecipeInfo recipeInfo={recipeInfo} />
        </Wrapper>
        <ListContainer>
          <RecipeInfoList ingredients={recipeInfo.extendedIngredients} />
          <Spacer />
          <NutrientInfoList nutrients={recipeInfo.nutrition.nutrients} />
        </ListContainer>
        <RecipeStepsList recipes={recipeInfo} />
      </PageMargin>
    </UnitProvider>
  );
}

const RecipeImage = css({
  width: "100vw",
  height: "min(362px, 50vh)",
  objectFit: "cover",
  opacity: "60%",
});

const SourceCredit = styled("small")({
  display: "block",
  marginLeft: "auto",
  width: "fit-content",
  marginRight: "36px",
  fontSize: `${14 / 16}rem`,

  [ON_MOBILE]: {
    width: "100%",
    margin: 0,
    textAlign: "center",
  },
});

const Link = styled("a")({
  color: "var(--text-950)",

  "&:hover": {
    textDecoration: "none",
  },
});

const TitleSection = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "24px",
});

const Title = styled("h1")({
  fontSize: `${30 / 16}rem`,
  marginTop: "5px",
  marginBottom: "12px",

  [ON_MOBILE]: {
    marginTop: "12px",
    width: "100%",
    textAlign: "center",
  },
});

const Wrapper = styled("div")({
  display: "flex",
  gap: "16px",
  // Allows us to tab the controls first
  flexDirection: "row-reverse",
});

const ListContainer = styled("div")({
  display: "flex",
  marginBottom: "24px",
  gap: "12px",

  [ON_MOBILE]: {
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
  },
});

const Spacer = styled("div")({
  flex: 1,
  maxWidth: "200px",
});
