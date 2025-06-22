"use server";

import { GoogleGenAI, Type } from "@google/genai";

// Temporary imports for testing with the fridge image
import fs from 'fs';
import path from "path";
import { blob } from "stream/consumers";

const PROMPT = `
  ## ROLE
  You are a highly precise AI Ingredient Analyst. Your sole purpose is to identify and quantify the raw ingredients available in an image, ignoring all other details.

  ## OBJECTIVE
  Analyze the provided image of a refrigerator's interior to produce a clean list of all identifiable ingredients. You will aggregate all instances of a single ingredient into one entry and provide a total estimated quantity for it.

  ## CORE DIRECTIVES (NON-NEGOTIABLE)

  1.  **INGREDIENTS ONLY. NO CONTAINERS. EVER.** This is the most important rule. Your output must only name the food or drink ingredient itself.
      * **DO:** Identify 'Milk', 'Orange Juice', 'Olives', 'Mustard'.
      * **DO NOT:** Output 'Milk Carton', 'Jar of Olives', or 'Yellow Sauce Bottle'.
      * You are forbidden from using the name, color, or type of a container in your output.

  2.  **AGGREGATE ALL INSTANCES:** Group all occurrences of the same core ingredient into a single item.
      * If you see three separate water bottles, you must provide a single entry for "Water" with the total combined volume.
      * Do not create separate entries like "Water bottle (front)" or "Water bottle (swing top)".

  3.  **OMIT IF UNCERTAIN:** If you are not highly confident about the specific ingredient inside a container or package, you MUST omit the item entirely from your report.
      * It is better to have a shorter, accurate list than a longer list with guesses.
      * Forbidden guesses include: 'Unknown Beverage', 'White Carton Drink', 'Possible Leftovers'.

  4.  **NO LOCATIONS:** Do not describe, mention, or allude to the location of any item. Your report must not contain words like 'shelf', 'door', 'top', or 'back'.

  ## MEASUREMENT & ESTIMATION RULES

  * **For ingredients in containers** (like milk or juice), estimate the remaining volume of the *ingredient*.
  * **For loose items** (like carrots or loose spinach), provide either a specific count or an estimated total weight (in 'g' or 'kg').
  * **Use standard units only:**
      * **Countable Items:** 'count' (e.g., for apples, eggs, cans of soda).
      * **Liquids:** 'ml' or 'l'.
      * **Solids:** 'g' or 'kg'.
      * **Other:** 'slices'.
  * **No Ambiguous Terms:** You are forbidden from using vague estimations like 'bunch', 'some', or 'a few'. Every item must have a concrete numerical estimate.
`

const ai = new GoogleGenAI({ apiKey: process.env['API_KEY']! });

// Construct an absolute path to the file
// Keep this to test for the TestFridgeForAI image. 
const filePath = path.join(process.cwd(), 'public/testImgs', 'TestFridgeForAI.png');
const base64ImageFile = fs.readFileSync(filePath, { encoding: 'base64' });

async function convertUrlsToBlobs(blobUrls: string[]) {
  try {
    // 1. .map() creates an array of promises. It doesn't wait.
    //    Each 'fetch' starts concurrently.
    const blobPromises = blobUrls.map(async (blobUrl) => {
      const response = await fetch(blobUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${blobUrl}`);
      }
      return response.blob();
    });

    console.log("This is an array of pending Promises:", blobPromises);
    // You would see [ Promise { <pending> }, Promise { <pending> } ]

    // 2. Promise.all() waits for ALL promises in the array to resolve.
    //    This is the line that was missing.
    const actualBlobsArray = await Promise.all(blobPromises);

    console.log("This is the final array of Blob objects:", actualBlobsArray);
    // You will now see [ Blob { size: ..., type: '...' }, Blob { size: ..., type: '...' } ]

    return actualBlobsArray;

  } catch (error) {
    console.error("An error occurred while converting blobs:", error);
    return null;
  }
}


export default async function AIprocessImages(prevState, queryData) {
  console.log('Fetching from Gemini started...');

  const fileData = queryData.get('fileInput');
  console.log(fileData);


  /*
  const uploadedFiles = BlobsArray.map((image) => {
    return ai.files.upload({
      file: image.blob,
      config: { mimeType: Blob.type }
    })
  })
  */


  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        inlineData: {
          mimeType: 'image/png',
          data: base64ImageFile,
        },
      },
      { text: PROMPT },
    ],
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            itemName: {
              type: Type.STRING,
            },
            value: {
              type: Type.INTEGER,
            },
            measurement: {
              type: Type.STRING,
            },
          },
          propertyOrdering: ["itemName", "value", "measurement"],
        },
      },
    },
  });

  if (response.text) {
    return response.text;
  }
  return 'Fetching from Gemini failed.'
}