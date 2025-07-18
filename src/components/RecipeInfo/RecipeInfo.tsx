import Image from "next/image";
import { styled } from "@pigment-css/react";
import AppTooltip from "@components/Tooltip";
import Link from "next/link";
import Icon from "@components/Icon";
import Button from "@components/Button";

export type SpoonacularRecipe = {
  id: number;
  title: string;
  image: string;
  servings: string;
  readyInMinutes: number;
  cookingMinutes: number;
  preparationMinutes: number;
  sourceName: string;
  sourceUrl: string;
  cheap: boolean;
  creditsText: string;
  dairyFree: boolean;
  glutenFree: boolean;
  ketogenic: boolean;
  sustainable: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  dishTypes: string[];
  extendedIngredients: {
    aisle: string;
    amount: number;
    consistency: string;
    id: number;
    image: string;
    measures: {
      metric: {
        amount: number;
        unitLong: string;
        unitShort: string;
      };
      us: {
        amount: number;
        unitLong: string;
        unitShort: string;
      };
    };
    meta: string[];
    name: string;
    original: string;
    originalName: string;
    unit: string;
  }[];
  summary: string;
};

export default function RecipeInfo({ recipeInfo }: { recipeInfo: SpoonacularRecipe }) {
  return (
    <>
      <Image src={recipeInfo.image} alt={recipeInfo.title} width={556} height={370} />
      <SourceCredit>
        Source: <Link href={recipeInfo.sourceUrl}>{recipeInfo.sourceName}</Link>
      </SourceCredit>
      <RecipeTitleSection>
        <RecipeTitle>{recipeInfo.title}</RecipeTitle>
        {recipeInfo.vegan && <AppTooltip type="vegan" />}
        {recipeInfo.vegetarian && <AppTooltip type="vegetarian" />}
        {recipeInfo.sustainable && <AppTooltip type="sustainable" />}
        {recipeInfo.veryHealthy && <AppTooltip type="healthy" />}
        {recipeInfo.veryPopular && <AppTooltip type="popular" />}
      </RecipeTitleSection>

      <RecipeInfoContentContainer>
        <RecipeInfoContent>
          <AllergenWarning>
            <Icon icon="TriangleAlert" color="var(--warn-500)" size={32} />
            <AllergenContent>
              <AllergenTitle>Possible Allergens</AllergenTitle>
              <AllergenText>
                {recipeInfo.dairyFree && "Dairy,"}
                {recipeInfo.extendedIngredients && "Gluten,"}
              </AllergenText>
            </AllergenContent>
          </AllergenWarning>
          <Summary dangerouslySetInnerHTML={{ __html: recipeInfo.summary }} />
        </RecipeInfoContent>
        <RecipeActionsContainer>
          <RecipeAction>
            <Icon icon="Heart" color="#FF4848" size={36} />
            <RecipeActionText>Save</RecipeActionText>
          </RecipeAction>
          <RecipeAction>
            <Icon icon="Share2" size={36} />
            <RecipeActionText>Share</RecipeActionText>
          </RecipeAction>
          <Button variant="primary">Metric</Button>
        </RecipeActionsContainer>
      </RecipeInfoContentContainer>

      <CookingInfoContainer>
        <CookingInfo>
          <CookingInfoTitle>Total Time:</CookingInfoTitle>
          <CookingInfoText>{recipeInfo.readyInMinutes} minutes</CookingInfoText>
        </CookingInfo>
        <CookingInfo>
          <CookingInfoTitle>Cooking:</CookingInfoTitle>
          <CookingInfoText>{recipeInfo.cookingMinutes} minutes</CookingInfoText>
        </CookingInfo>
        <CookingInfo>
          <CookingInfoTitle>Preparation:</CookingInfoTitle>
          <CookingInfoText>{recipeInfo.preparationMinutes} minutes</CookingInfoText>
        </CookingInfo>
        <CookingInfo>
          <CookingInfoTitle>Ingredients:</CookingInfoTitle>
          <CookingInfoText>{recipeInfo.extendedIngredients.length}</CookingInfoText>
        </CookingInfo>
        <CookingInfo>
          <CookingInfoTitle>Servings:</CookingInfoTitle>
          <CookingInfoText>{recipeInfo.servings}</CookingInfoText>
        </CookingInfo>
      </CookingInfoContainer>
    </>
  );
}

const RecipeTitleSection = styled("div")({
  display: "flex",
  gap: "24px",
});
const RecipeTitle = styled("h1")({});
const SourceCredit = styled("small")({});

const RecipeInfoContentContainer = styled("div")({});
const RecipeInfoContent = styled("div")({});

const AllergenWarning = styled("div")({});
const AllergenContent = styled("div")({});
const AllergenTitle = styled("h2")({});
const AllergenText = styled("p")({});

const Summary = styled("p")({});

const RecipeActionsContainer = styled("div")({});

const RecipeAction = styled(Button)({});
const RecipeActionText = styled("p")({});

const CookingInfoContainer = styled("div")({});
const CookingInfo = styled("div")({});
const CookingInfoTitle = styled("h2")({});
const CookingInfoText = styled("p")({});
