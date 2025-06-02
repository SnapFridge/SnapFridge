import RecipeCard from "@components/RecipeCard";
import Icon from "@components/Icon";
import { styled } from "@pigment-css/react"; 

interface Ingredient {
    aisle: string,
    amount: number,
    id: number,
    image: string,
    meta: string[],
    name: string,
    original: string,
    originalName: string,
    unit: string,
    unitLong: string,
    unitShort: string,
}

interface Recipe {
    id: number,
    image: string,
    imageType: string,
    likes: number,
    missedIngredientCount: number,
    missedIngredients: Ingredient[],
    title: string,
    unusedIngredients: Ingredient[],
    usedIngredientCount: number,
    usedIngredients: Ingredient[],
}

interface Props {
    recipes: Recipe[];
    headerText?: string;
}

function RecipeSection({ recipes, headerText = "Recipes Found" }: Props) {
    return (
        <RecipeSectionTag>
            <Header>
                <h1>{ headerText }</h1>
                <Icon icon="Sparkles" color="var(--text-800)" size={50}></Icon>
            </Header>
            <RecipeList>
                {recipes.map((recipe) => {
                    return <RecipeCard recipe={recipe} key={recipe.title}/>
                })}
            </RecipeList>   
        </RecipeSectionTag>
    )
}

const RecipeSectionTag = styled('div')({
    padding: "24px 98px",
    display: "flex",
    flexDirection: "column",
  
    "&> div": {
      display: "flex",
      alignItems: "center",
      gap: "32px",
    }
  
});

const RecipeList = styled("ul")({
    padding: "12px 32px",
    listStyleType: "none",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
});

const Header = styled("div")({
    display: "flex",
    fontSize: `${24 / 16}rem`,
});




export default RecipeSection;