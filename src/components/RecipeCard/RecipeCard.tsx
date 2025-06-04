"use client";

import Button from "@components/Button";
import Link from "@components/Link";
import Image from "next/image";
import { styled, css } from "@pigment-css/react";
import React from "react";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";



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
    recipe: Recipe;
    RecipeVariants: Variants;
}

/* 


recipe.usedIngredients.map((ingredient, index) => (
    <React.Fragment key={ingredient.name}>
        {ingredient.name.charAt(0).toUpperCase() + (ingredient.name).slice(1)}


        {index < recipe.usedIngredients.length - 1 && ", "}
        </React.Fragment>                                
    ))
}
*/


function RecipeCard({ recipe, RecipeVariants }: RecipeProps) {
    let usedIngredientString: any = recipe.usedIngredients.map((ingredient: Ingredient) => {
        // split ingredient name into an array
        return ingredient.name.split(' ').map((ingredientWord: string) => {
            // capitalize every word
            return ingredientWord.charAt(0).toUpperCase() + ingredientWord.slice(1);
        }).join(' '); // join the array together with a space before returning it
    }).join(', '); // then join the array of ingredient names together with a comma


    let missedIngredientString: any = recipe.missedIngredients.map((ingredient: Ingredient) => {
        // split ingredient name into an array
        return ingredient.name.split(' ').map((ingredientWord: string) => {
            // capitalize every word
            return ingredientWord.charAt(0).toUpperCase() + ingredientWord.slice(1);
        }).join(' '); // join the array together with a space before returning it
    }).join(', '); // then join the array of ingredient names together with a comma


    return (
        <Card
            variants={RecipeVariants}
            initial="offscreen"
            whileInView="onscreen"
            whileHover="hover"
        >
            <h1>{ recipe.title }</h1>
            <MainContent>
                <Image src={recipe.image} alt={recipe.title} width={312} height={231} className={ImageCSS} />
                <MainInformation>
                    { recipe.usedIngredientCount !== 0 && 
                        <>
                            <h2>Ingredients</h2>
                            <p>{usedIngredientString}</p>                        
                        </>
                    }
                    { recipe.missedIngredientCount !== 0 && 
                        <>
                            <h2 className={WarningCSS}>Missing Ingredients</h2>
                            <p className={WarningCSS}>{missedIngredientString}</p>                        
                        </>
                    }
                    <Link href={`/recipe`} className={ButtonLinkCSS}><Button styling="secondary" className={ViewButton}>View</Button></Link>
                </MainInformation>
            </MainContent>   
        </Card>
    )
}

export const RecipeCardVariant = {
    offscreen: {
        y: 100,
        opacity: 0,
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 0.8,
        }
    },
    hover: {
        scale: 1.02,
        transition: {
            type: "spring",
            duration: 0.5,
        }
    }
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

const Card = styled(motion.li)({
    border: "1px solid var(--accent-950)",
    borderRadius: '12px',
    padding: "24px",
    boxShadow: "var(--shadow)",
});

const MainContent = styled("div")({
    display: "flex",
    gap: "36px",
    marginLeft: "5%",
    marginTop: "16px",
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