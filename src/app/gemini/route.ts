import {
  GoogleGenAI,
  Type,
  type FileData,
  type GenerateContentResponse,
} from "@google/genai";
import { randomBytes } from "node:crypto";

const ai = new GoogleGenAI({ apiKey: process.env["GEMINI_KEY"]! });

async function ensureContext(contents: { fileData: FileData }[]) {
  const name = "ingredients";
  let file;
  try {
    file = await ai.files.get({ name });
  } catch {
    file = await ai.files.upload({
      file: "public/functions/" + name + ".csv",
      config: {
        mimeType: "text/csv",
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

// JSON minifier: Remove all whitespace + array syntax so we don't have to worry about it later + save on some networking
type Generator = AsyncGenerator<
  GenerateContentResponse,
  undefined,
  { value: GenerateContentResponse; done: boolean }
>;

function generator2Stream(gen: Generator) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await gen.next();
      if (done) {
        controller.close();
        return;
      }
      controller.enqueue(value.text!);
    },
  });
}

const systemInstruction = `
### **ROLE**
You are an AI Ingredient Identifier. Your sole purpose is to identify all raw food ingredients in an image based on a master list.

### **OBJECTIVE**
Analyze the provided image and return a simple JSON array containing the names of all identifiable ingredients.

### **CORE DIRECTIVES**
1.  **Use the Master List:** You can only identify an ingredient if its name exists in the provided "ingredients" csv file. Omit any ingredients not on this list.
2.  **Ingredients Only:** Do not identify containers, brands, or non-food items.
3.  **Omit if Uncertain:** If you are not highly confident in an ingredient's identity, do not include it.
4.  **No Duplicates:** List each unique ingredient name only once, even if it appears multiple times in the image.
`;

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.STRING,
  },
};

export async function POST(req: Request) {
  const files = (await req.formData()).getAll("files") as File[];
  const contents: { fileData: FileData }[] = [];
  await ensureContext(contents);
  const filenames: string[] = [];

  for (let i = 0; i < files.length; i++) {
    // 6-char random name
    filenames.push(randomBytes(3).toString("hex"));
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

  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
