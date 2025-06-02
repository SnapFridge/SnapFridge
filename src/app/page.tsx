import React from "react";
import Button from "@components/Button";
import Link from "@components/Link";
import Image from "next/image";
import RecipeSection from "@components/RecipeSection";
import { styled, css } from "@pigment-css/react";


const recipesExample = [
  {
      "id": 73420,
      "image": "https://img.spoonacular.com/recipes/73420-312x231.jpg",
      "imageType": "jpg",
      "likes": 0,
      "missedIngredientCount": 3,
      "missedIngredients": [
          {
              "aisle": "Baking",
              "amount": 1.0,
              "id": 18371,
              "image": "https://img.spoonacular.com/ingredients_100x100/white-powder.jpg",
              "meta": [],
              "name": "baking powder",
              "original": "1 tsp baking powder",
              "originalName": "baking powder",
              "unit": "tsp",
              "unitLong": "teaspoon",
              "unitShort": "tsp"
          },
          {
              "aisle": "Spices and Seasonings",
              "amount": 1.0,
              "id": 2010,
              "image": "https://img.spoonacular.com/ingredients_100x100/cinnamon.jpg",
              "meta": [],
              "name": "cinnamon",
              "original": "1 tsp cinnamon",
              "originalName": "cinnamon",
              "unit": "tsp",
              "unitLong": "teaspoon",
              "unitShort": "tsp"
          },
          {
              "aisle": "Milk, Eggs, Other Dairy",
              "amount": 1.0,
              "id": 1123,
              "image": "https://img.spoonacular.com/ingredients_100x100/egg.png",
              "meta": [],
              "name": "egg",
              "original": "1 egg",
              "originalName": "egg",
              "unit": "",
              "unitLong": "",
              "unitShort": ""
          }
      ],
      "title": "Apple Or Peach Strudel",
      "unusedIngredients": [],
      "usedIngredientCount": 1,
      "usedIngredients": [
          {
              "aisle": "Produce",
              "amount": 6.0,
              "id": 9003,
              "image": "https://img.spoonacular.com/ingredients_100x100/apple.jpg",
              "meta": [],
              "name": "apples",
              "original": "6 large baking apples",
              "originalName": "baking apples",
              "unit": "large",
              "unitLong": "larges",
              "unitShort": "large"
          }
      ]
  },
  {
      "id": 632660,
      "image": "https://img.spoonacular.com/recipes/632660-312x231.jpg",
      "imageType": "jpg",
      "likes": 3,
      "missedIngredientCount": 4,
      "missedIngredients": [
          {
              "aisle": "Milk, Eggs, Other Dairy",
              "amount": 1.5,
              "extendedName": "unsalted butter",
              "id": 1001,
              "image": "https://img.spoonacular.com/ingredients_100x100/butter-sliced.jpg",
              "meta": [
                  "unsalted",
                  "cold"
              ],
              "name": "butter",
              "original": "1 1/2 sticks cold unsalted butter cold unsalted butter<",
              "originalName": "cold unsalted butter cold unsalted butter<",
              "unit": "sticks",
              "unitLong": "sticks",
              "unitShort": "sticks"
          },
          {
              "aisle": "Produce",
              "amount": 4.0,
              "id": 1079003,
              "image": "https://img.spoonacular.com/ingredients_100x100/red-delicious-apples.png",
              "meta": [
                  "red",
                  " such as golden delicious, peeled, cored and cut into 1/4-inch-thick slices "
              ],
              "name": "red apples",
              "original": "4 larges red apples, such as Golden Delicious, peeled, cored and cut into 1/4-inch-thick slices",
              "originalName": "s red apples, such as Golden Delicious, peeled, cored and cut into 1/4-inch-thick slices",
              "unit": "large",
              "unitLong": "larges",
              "unitShort": "large"
          },
          {
              "aisle": "Spices and Seasonings",
              "amount": 2.0,
              "id": 2010,
              "image": "https://img.spoonacular.com/ingredients_100x100/cinnamon.jpg",
              "meta": [],
              "name": "cinnamon",
              "original": "2 teaspoons cinnamon",
              "originalName": "cinnamon",
              "unit": "teaspoons",
              "unitLong": "teaspoons",
              "unitShort": "tsp"
          },
          {
              "aisle": "Nut butters, Jams, and Honey",
              "amount": 2.0,
              "id": 19719,
              "image": "https://img.spoonacular.com/ingredients_100x100/apricot-jam.jpg",
              "meta": [
                  "melted"
              ],
              "name": "apricot preserves",
              "original": "2 tablespoons apricot preserves, melted and strained",
              "originalName": "apricot preserves, melted and strained",
              "unit": "tablespoons",
              "unitLong": "tablespoons",
              "unitShort": "Tbsp"
          },
      ],
      "title": "Apricot Glazed Apple Tart",
      "unusedIngredients": [
          {
              "aisle": "Produce",
              "amount": 1.0,
              "id": 9003,
              "image": "https://img.spoonacular.com/ingredients_100x100/apple.jpg",
              "meta": [],
              "name": "apples",
              "original": "apples",
              "originalName": "apples",
              "unit": "serving",
              "unitLong": "serving",
              "unitShort": "serving"
          }
      ],
      "usedIngredientCount": 0,
      "usedIngredients": []
  }
]


export default function Page() {
  return (
      <Main>

        <Header>
          <h1>SnapFridge</h1>
          {/* Remember to add that thing where it removes excellent and types a different word */}
          <h2>Excellent recipes right from your fridge.</h2>
          <div>
            <Link href="/about"><Button type="primary">About Us</Button></Link>
            <Link href="/"><Button type="secondary">Get Started</Button></Link>
          </div>
        </Header>


        {/* TODO: Somehow make the fridge responsive so it doesn't take up 90% of the screen */}
        <ImageWrapper>
          <Image 
            src="/FridgeL.png"
            alt="Fridge"
            width={848}
            height={1470}
            sizes="(min-width) 100vw, 600px"
          />
        </ImageWrapper>
      
        <RecipeSection recipes={recipesExample}></RecipeSection>

        <StatisticsSection>
          <TopStatistics>
            <h2>Around 30-40% of food gets wasted every year</h2>
            <small>According to the USDA</small>
          </TopStatistics>


          <BottomStatistics>

            <BottomStatistics2>
              <h2>That's <strong>60 Million</strong> tons</h2>
              <h2>Or <strong>120 Billion</strong> pounds</h2>
            </BottomStatistics2>

            <Image 
              src='/Landfill.png'
              alt="A landfill worker in a neon vest clearing through a landfill of fruit waste"
              height={700}
              width={700}
            />

          </BottomStatistics>
        </StatisticsSection>

        <CallToActionSection>
          <h2>Join the Fight Against Food Waste Today</h2>
          <Link href="/appidk"><Button className={CoAButtonCSS}>Get Started</Button></Link>
        </CallToActionSection>
      </Main>
  );
}

const Main = styled('main')({
  display: "flex",
  flexDirection: "column",
});

const Header = styled("div")({
  display: "flex",
  flexDirection: "column",  
  justifyContent: "center",
  gap: "12px",
  padding: "20px 89px",

  background: 
  `
    linear-gradient(
      120deg,
      hsl(230deg 34% 69% / 0.2) 0%,
      hsl(209deg 27% 49% / 0.2) 20%,
      hsl(197deg 43% 31% / 0.2) 40%,
      hsl(190deg 56% 19% / 0.2) 60%,
      hsl(185deg 50% 12% / 0.2) 80%,
      hsl(176deg 68% 5% / 0.2) 100%
    )
  `,
  backgroundColor: "#000",  
  

  "&> h1": {
    fontSize: `${80 / 16}rem`,
  },

  "&> h2": {  
    fontSize: `${26 / 16}rem`,
    fontWeight: "500",
  },

  "&> div": {
    display: "flex",
    gap: "12px",
  }
});

const ImageWrapper = styled('div')({

});


const StatisticsSection = styled('div')({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "64px",
  color: "var(--text-950)",
});

const TopStatistics = styled('div')({
  width: "50%",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  "&> h2": {
    fontSize: `${50 / 16}rem`,
  },
  "&> small": {
    fontSize: `${16 / 16}rem`, 
    color: ``
  }
});

const BottomStatistics = styled('div')({
  width: "100%",
  padding: "32px 111px",
  display: "flex",
  justifyContent: "space-between",

  "&> img": {
    borderRadius: "6px",
  },
});

const BottomStatistics2 = styled('div')({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",

  "&> h2": {
    fontSize: `${48 / 16}rem`,
    fontWeight: "500",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  "&> h2 > strong": {
    fontSize: `${50 / 16}rem`,
  }
});


const CallToActionSection = styled('div')({
  padding: "96px",
  gap: "24px",
  marginBottom: "96px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "&> h2": {
    fontSize: `${50 / 16}rem`,
  }
});

const CoAButtonCSS = css({
  width: "185px",
  height: "55px",
  color: "var(--text-100)",
  fontSize: `${20 / 16}rem`,
  backgroundColor: "var(--background-600)",
  borderRadius: "8px",
});


