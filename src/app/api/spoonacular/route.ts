// import Spoonacular from "spoonacular";
import { NextResponse } from "next/server";

type Props = {
  ingredients: string;
};

async function getRecipes({ ingredients }: Props) {
  console.log("fetching from spoonacular started");

  // Trying to import using ES6 says "Could not find a declaration file for module 'spoonacular'" so using CommonJS for now
  // Tried adding a declarations.d.ts but still shows an error for some reason
  // Code from https://github.com/ddsky/spoonacular-api-clients/blob/master/javascript/docs/RecipesApi.md#searchRecipesByIngredients
  const Spoonacular = require("spoonacular");
  const defaultClient = Spoonacular.ApiClient.instance;
  // Configure API key authorization: apiKeyScheme
  const apiKeyScheme = defaultClient.authentications["apiKeyScheme"];
  apiKeyScheme.apiKey = process.env["SPOONACULAR_KEY"];
  // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
  //apiKeyScheme.apiKeyPrefix['x-api-key'] = "Token"

  const apiInstance = new Spoonacular.RecipesApi();
  let opts = {
    number: 10, // Number | The maximum number of items to return (between 1 and 100). Defaults to 10.
    ranking: 2, // Number | Whether to maximize used ingredients (1) or minimize missing ingredients (2) first.
    ignorePantry: true, // Boolean | Whether to ignore typical pantry items, such as water, salt, flour, etc.
  };

  return new Promise((resolve, reject) => {
    apiInstance.searchRecipesByIngredients(ingredients, opts, (error, data, response) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        console.log("fetched successfully");
        resolve(data);
      }
    });
  });
}

export async function POST(req: Request) {
  const ingredients = await req.text();
  const res = await getRecipes({ ingredients });

  return NextResponse.json(res);
}
