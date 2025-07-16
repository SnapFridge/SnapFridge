import { NextResponse } from "next/server";

type paramProps = {
  params: {
    recipeID: string;
  };
};

export async function GET(req: Request, params: paramProps) {
  const { recipeID } = await params.params;

  console.log(recipeID);

  return NextResponse.json({ hi: "test" });
}
