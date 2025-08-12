import AllergenWarning from "@components/recipe/AllergenWarning";
import RecipeStepsList from "@components/recipe/DetailedRecipe";
import RecipeActions from "@components/recipe/RecipeActions";
import { RecipeInfo, type SpoonacularRecipe } from "@components/recipe/RecipeInfo";
import RecipeInfoList from "@components/recipe/RecipeInfoList";
import NutrientInfoList from "@components/recipe/RecipeInfoList/NutrientInfoList";
import Tooltip from "@components/recipe/Tooltip";
import { UnitProvider } from "@components/UnitProvider";
import { css, styled } from "@pigment-css/react";
import { ON_MOBILE, PageMargin, type SavedRecipe } from "@utils";
import { createClient } from "@utils/supabase/server";
import { type Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getRecipe(id: string) {
  const recipeRes = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true`,
    {
      headers: {
        "x-api-key": process.env["SPOONACULAR_KEY"]!,
      },
      next: {
        revalidate: 3600,
      },
    }
  );
  if (!recipeRes.ok) {
    if (recipeRes.status === 404) {
      return null;
    }
    const errorDetails = await recipeRes.text();
    throw new Error(
      `Failed to fetch recipe ${id}: ${recipeRes.status} ${recipeRes.statusText} - ${errorDetails}`
    );
  }
  const recipe = (await recipeRes.json()) as SpoonacularRecipe;
  if (!recipe || Object.keys(recipe).length === 0) {
    return null;
  }
  return recipe;
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

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Recipe ${id}`,
    description: `View, share, or save recipe ${id} on SnapFridge`,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const recipe = await getRecipe(id);
  if (!recipe) notFound();
  const initialSavedRecipes = await getSavedRecipes();

  return (
    <UnitProvider>
      <figure>
        <Image
          className={RecipeImage}
          src={recipe.image}
          alt={recipe.title}
          width={556}
          height={370}
          quality={90}
          priority
          fetchPriority="high"
        />
        <SourceCredit>
          Source: <Link href={recipe.sourceUrl}>{recipe.creditsText}</Link>
        </SourceCredit>
      </figure>
      <PageMargin>
        <TitleSection>
          <Title>{recipe.title}</Title>
          {recipe.vegan && <Tooltip type="vegan" />}
          {recipe.vegetarian && <Tooltip type="vegetarian" />}
          {recipe.sustainable && <Tooltip type="sustainable" />}
          {recipe.veryHealthy && <Tooltip type="healthy" />}
          {recipe.veryPopular && <Tooltip type="popular" />}
        </TitleSection>
        <AllergenWarning recipe={recipe} />
        <Wrapper>
          <RecipeActions
            id={recipe.id}
            name={recipe.title}
            imageType={recipe.imageType}
            initialSavedRecipes={initialSavedRecipes}
          />
          <RecipeInfo recipe={recipe} />
        </Wrapper>
        <ListContainer>
          <RecipeInfoList ingredients={recipe.extendedIngredients} />
          <Spacer />
          <NutrientInfoList nutrients={recipe.nutrition.nutrients} />
        </ListContainer>
        <RecipeStepsList recipes={recipe} />
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
