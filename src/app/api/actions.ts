"use server";

import { GoogleGenAI, Type, type FileData } from "@google/genai";

const SYS_INSTRUCTION = `
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

  ## UNIT & ESTIMATION RULES

  * **For ingredients in containers** (like milk or juice), estimate the remaining volume of the *ingredient*.
  * **For loose items** (like carrots or loose spinach), provide either a specific count or an estimated total weight (in 'g' or 'kg').
  * **Use standard units only:**
      * **Countable Items:** 'count' (e.g., for apples, eggs, cans of soda).
      * **Liquids:** 'ml' or 'l'.
      * **Solids:** 'g' or 'kg'.
      * **Other:** 'slices'.
  * **No Ambiguous Terms:** You are forbidden from using vague estimations like 'bunch', 'some', or 'a few'. Every item must have a concrete numerical estimate.
`;

const ai = new GoogleGenAI({ apiKey: process.env["GEMINI_KEY"]! });

export default async function AIprocessImages(files: File[]) {
  console.log(files);
  const fileDataParts: { fileData: FileData }[] = [];
  const filenames: string[] = [];

  for (let i = 0; i < files.length; i++) {
    filenames.push(crypto.randomUUID());
    const uploadedFile = await ai.files.upload({
      file: files[i]!,
      config: {
        name: filenames[i]!,
      },
    });
    fileDataParts.push({
      fileData: {
        fileUri: uploadedFile.uri!,
        mimeType: files[i]!.type,
      },
    });
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: fileDataParts,
    config: {
      systemInstruction: SYS_INSTRUCTION,
      responseMimeType: "application/json",
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
            unit: {
              type: Type.STRING,
            },
          },
          propertyOrdering: ["itemName", "value", "unit"],
        },
      },
      thinkingConfig: {
        thinkingBudget: -1,
      },
      temperature: 0.1,
    },
  });

  for (const filename of filenames) {
    await ai.files.delete({ name: filename });
  }

  if (response.text) {
    return response.text;
  }
  return "Fetching from Gemini failed.";
}
