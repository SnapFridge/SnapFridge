import Image from "next/image";
import { styled } from "@pigment-css/react";
import AppTooltip from "@components/Tooltip";
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
    <div>
      <Summary dangerouslySetInnerHTML={{ __html: recipeInfo.summary }} />

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
    </div>
  );
}

const Summary = styled("p")({});

const CookingInfoContainer = styled("div")({});
const CookingInfo = styled("div")({});
const CookingInfoTitle = styled("h2")({});
const CookingInfoText = styled("p")({});
