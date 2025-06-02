import Button from "@components/Button";
import Link from "@components/Link";
import Image from "next/image";
import { styled, css } from "@pigment-css/react";
import React from "react";


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
interface RecipeProps {
    recipe: Recipe
}


function RecipeCard({ recipe }: RecipeProps) {

    return (
        <Card>
            <h1>{ recipe.title }</h1>
            <MainContent>
                <Image src={recipe.image} alt={recipe.title} width={312} height={231} className={ImageCSS} />
                <MainInformation>
                    { recipe.usedIngredientCount !== 0 && 
                        <>
                            <h2>Ingredients</h2>
                            <p>
                                {
                                    recipe.usedIngredients.map((ingredient, index) => (
                                        <React.Fragment key={ingredient.name}>
                                            {String(ingredient.name).charAt(0).toUpperCase() + String(ingredient.name).slice(1)}

                                            {/* prevent comma from appearing for the last ingredient */}
                                            {index < recipe.usedIngredients.length - 1 && ", "}
                                        </React.Fragment>                                
                                    ))
                                }
                            </p>                        
                        </>
                    }

                    { recipe.missedIngredientCount !== 0 && 
                        <>
                            <h2 className={WarningCSS}>Missing Ingredients</h2>
                            <p className={WarningCSS}>
                                {
                                    recipe.missedIngredients.map((ingredient, index) => (
                                        <React.Fragment key={ingredient.name}>
                                            {String(ingredient.name).charAt(0).toUpperCase() + String(ingredient.name).slice(1)}

                                            {/* prevent comma from appearing for the last ingredient */}
                                            {index < recipe.missedIngredients.length - 1 && ", "}
                                        </React.Fragment>                                
                                    ))
                                }
                            </p>                        
                        </>
                    }

                    <Link href={`/recipe`} className={ButtonLinkCSS}><Button type="secondary" className={ViewButton}>View</Button></Link>
                </MainInformation>
            </MainContent>
            
        </Card>
    )
}

const ViewButton = css({
    padding: "8px 36px",
    backgroundColor: "var(--background-50)",
    boxShadow: "var(--shadow)",

    "&:hover": {
        backgroundColor: "var(--background-100)",
    }
});

const ButtonLinkCSS = css({
    position: "absolute",
    bottom: 0,
    right: 0,
});

const ImageCSS = css({
    borderRadius: "24px",
});

const WarningCSS = css({
    color: "var(--warning)",
});



const Card = styled("li")({
    display: "flex",
    flexDirection: "column",    
    gap: "16px",
    border: "1px solid var(--accent-950)",
    borderRadius: '12px',
    padding: "24px",
    boxShadow: "var(--shadow)",
});

const MainContent = styled("div")({
    display: "flex",
    gap: "36px",
    marginLeft: "5%",
});

const MainInformation = styled("div")({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    position: "relative",
    overflow: "hidden",

    "&> h2": {
        fontSize: `${32 / 16}rem`,
    },
    "&> p": {
        fontSize: `${20 / 16}rem`,
        marginLeft: "18px",
        marginBottom: "32px",
    },
});

 
export default RecipeCard; 