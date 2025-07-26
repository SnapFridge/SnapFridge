import Tooltip from "@components/recipe/Tooltip";
import RecipeInfo from "@components/recipe/RecipeInfo";
import { type SpoonacularRecipe } from "@components/recipe/RecipeInfo/RecipeInfo";
import Image from "next/image";
import { css, styled } from "@pigment-css/react";
import { ON_MOBILE, PageMargin } from "@components/Global";
import RecipeActions from "@components/recipe/RecipeActions";
import Icon from "@components/Icon";
import RecipeInfoList from "@components/recipe/RecipeInfoList";
import RecipeStepsList from "@components/recipe/DetailedRecipe";
import { notFound } from "next/navigation";
import MobileRecipeActions from "@components/recipe/RecipeActions/MobileRecipeActions";
import NutrientInfoList from "@components/recipe/RecipeInfoList/NutrientInfoList";
import UnitProvider from "@components/UnitProvider";

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

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipeInfo = await getRecipe(id);

  // Send to not-found.tsx
  if (!recipeInfo) notFound();

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
      {/* We should we able to tab to the controls first */}
      <MobileRecipeActions />

      <PageMargin>
        <TitleSection>
          <Title>{recipeInfo.title}</Title>
          {recipeInfo.vegan && <Tooltip type="vegan" />}
          {recipeInfo.vegetarian && <Tooltip type="vegetarian" />}
          {recipeInfo.sustainable && <Tooltip type="sustainable" />}
          {recipeInfo.veryHealthy && <Tooltip type="healthy" />}
          {recipeInfo.veryPopular && <Tooltip type="popular" />}
        </TitleSection>

        <AllergenWarning>
          <Icon
            icon="TriangleAlert"
            color="var(--warn-500)"
            size={32}
            description="Warning"
          />
          <AllergenContent>
            <AllergenTitle>Possible Allergens</AllergenTitle>
            <AllergenText>
              {!recipeInfo.dairyFree && "Dairy,"}
              {!recipeInfo.glutenFree && "Gluten,"}
            </AllergenText>
          </AllergenContent>
        </AllergenWarning>

        <Wrapper>
          <RecipeActions />
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

const AllergenWarning = styled("section")({
  padding: "12px 24px",
  width: "fit-content",
  display: "flex",
  alignItems: "center",
  position: "relative",
  gap: "24px",
  borderLeft: "2px solid var(--warn-600)",
  marginBottom: "12px",

  "&::before": {
    content: "''",
    position: "absolute",
    borderTopRightRadius: "8px",
    borderBottomRightRadius: "8px",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "var(--warn-500)",
    opacity: "30%",
    zIndex: -1,
  },

  [ON_MOBILE]: {
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const AllergenContent = styled("div")({});
const AllergenTitle = styled("h2")({
  fontSize: `${20 / 16}rem`,
});
const AllergenText = styled("p")({
  fontSize: `${16 / 16}rem`,
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
