import {
  GoogleGenAI,
  Type,
  type FileData,
  type GenerateContentResponse,
} from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env["GEMINI_KEY"]! });

async function ensureContext(contents: { fileData: FileData }[]) {
  const names = ["Units.txt", "Ingredients.txt"];
  for (const name of names) {
    let file = await ai.files.get({ name });
    if (!file) {
      file = await ai.files.upload({
        file: "/" + name,
        config: {
          mimeType: "text/plain",
          name,
        },
      });
    }
    contents.push({
      fileData: {
        fileUri: file.uri!,
        mimeType: file.mimeType!,
      },
    });
  }
}

// JSON minifier: Remove all whitespace + array syntax so we don't have to worry about it later + save on some networking
type Generator = AsyncGenerator<
  GenerateContentResponse,
  undefined,
  { value: GenerateContentResponse; done: boolean }
>;
function generator2Stream(gen: Generator) {
  let inStr = false;
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await gen.next();
      if (done) {
        controller.close();
        return;
      }
      let processed = "";
      for (const c of value.text!) {
        switch (c) {
          // Ignore whitespace, except when we're in a string
          case " ":
          case "\n":
            if (inStr) {
              break;
            }
          // Ignore arrays, it should only appear at the start and end
          case "[":
          case "]":
            continue;
          case '"':
            inStr = !inStr;
        }
        processed += c;
      }
      controller.enqueue(processed);
    },
  });
}

const systemInstruction = `
  ## ROLE
  You are a highly precise AI Ingredient Analyst. Your sole purpose is to identify and quantify the raw ingredients available in an image, ignoring all other details.

  ## OBJECTIVE
  Analyze the provided image of a refrigerator's interior to produce a clean list of all identifiable ingredients. You will aggregate all instances of a single ingredient into one entry and provide a total estimated quantity for it.

  ## CORE DIRECTIVES (NON-NEGOTIABLE)

  1.  **INGREDIENTS ONLY. NO CONTAINERS. EVER.** This is the most important rule. Your output must only name the food or drink ingredient itself.
      * **DO:** Identify "Milk", "Orange Juice", "Olives", "Mustard".
      * **DO NOT:** Output "Milk Carton", "Jar of Olives", or "Yellow Sauce Bottle".
      * You are forbidden from using the name, color, or type of a container in your output.

  2.  **AGGREGATE ALL INSTANCES:** Group all occurrences of the same core ingredient into a single item.
      * If you see three separate water bottles, you must provide a single entry for "Water" with the total combined volume.
      * Do not create separate entries like "Water bottle (front)" or "Water bottle (swing top)".

  3.  **OMIT IF UNCERTAIN:** If you are not highly confident about the specific ingredient inside a container or package, you MUST omit the item entirely from your report.
      * It is better to have a shorter, accurate list than a longer list with guesses.
      * Forbidden guesses include: "Unknown Beverage", "White Carton Drink", "Possible Leftovers".

  4.  **NO LOCATIONS:** Do not describe, mention, or allude to the location of any item. Your report must not contain words like "shelf", "door", "top", or "back".

  ## UNIT & ESTIMATION RULES

    * **Mandatory Units:** You MUST use a unit from the provided Units.txt file for every ingredient. No other units are permitted.

    * **Unit Selection Guidance:**
      * For **LIQUIDS** (e.g., milk, juice, sauces), select the most appropriate unit from line 1 to 19 inclusive in Units.txt (e.g., L, mL, fl oz, tbsp).
      * For **SOLIDS** (e.g., cheese, meat, butter), select the most appropriate unit from line 20 to 36 inclusive in Units.txt (e.g., g, lb, slice, block).
      * Units from line 36 to 89 inclusive inclusive in Units.txt should be used when they appropriately describe the ingredient itself (e.g., "clove" of garlic, "leaf" of spinach, "stick" of butter).
      * For **COUNTABLE ITEMS** that are typically enumerated (e.g., eggs, fruit), use "count".
    
    * **Ingredient-Focused, Not Container-Focused:** Your choice of unit must describe the food or drink, never its packaging. For example, if you see a can of soup, the ingredient is "Soup" and the unit should be an estimate of its volume (e.g., "400 mL"), not "1 can".

    * **Concrete Estimates Only:** Every item must have a concrete numerical estimate (e.g., "250 mL", "3 count", "5 slices").

    * **Forbidden Ambiguity:** You are forbidden from using vague estimations. While the provided lists contain descriptive terms (like "piece" or "dollop"), you must only use them when they are clear and specific. If a descriptive unit is ambiguous, default to a standard measurement of weight (g), volume (mL), or a specific enumeration (count).

    * **Estimating Remaining Quantity:** For ingredients inside packages or containers, your estimate must be for the remaining amount of the ingredient, not the total capacity of the container.
`;

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
      },
      amount: {
        type: Type.INTEGER,
      },
      unit: {
        type: Type.STRING,
      },
    },
    required: ["name", "amount", "unit"],
  },
};

export async function POST(req: Request) {
  const files = (await req.formData()).getAll("files") as File[];
  const contents: { fileData: FileData }[] = [];
  const filenames: string[] = [];

  for (let i = 0; i < files.length; i++) {
    filenames.push(crypto.randomUUID());
    const file = files[i]!;
    const uploadedFile = await ai.files.upload({
      file,
      config: {
        name: filenames[i]!,
      },
    });
    contents.push({
      fileData: {
        fileUri: uploadedFile.uri!,
        mimeType: file.type,
      },
    });
  }

  await ensureContext(contents);
  /* eslint-disable  @typescript-eslint/no-unsafe-assignment */
  const res: Generator = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema,
      thinkingConfig: {
        thinkingBudget: -1,
      },
      temperature: 0,
    },
  });

  for (const filename of filenames) {
    await ai.files.delete({ name: filename });
  }

  return new Response(generator2Stream(res));
}
