import { randomBytes } from "node:crypto";
import {
  type FileData,
  type GenerateContentResponse,
  GoogleGenAI,
  Type,
} from "@google/genai";

const ai = new GoogleGenAI({});

async function ensureContext(contents: { fileData: FileData }[]) {
  const name = "ingredients";

  // biome-ignore lint/suspicious/noImplicitAnyLet: Can't import type File_2
  let file;
  try {
    file = await ai.files.get({ name });
  } catch {
    file = await ai.files.upload({
      file: `public/functions/${name}.csv`,
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

export async function POST(req: Request) {
  const files = (await req.formData()).getAll("files") as File[];
  const contents: { fileData: FileData }[] = [];
  await ensureContext(contents);
  const filenames: string[] = [];

  for (let i = 0; i < files.length; ++i) {
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

  const res: Generator = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
      },
      thinkingConfig: {
        thinkingBudget: -1,
      },
      temperature: 0,
    },
  });

  for (const name of filenames) {
    await ai.files.delete({ name });
  }

  return new Response(generator2Stream(res));
}
