export default async function Page({
  params,
}: {
  params: Promise<{ recipeID: string }>;
}) {
  const { recipeID } = await params;
  return <div>My Post: {recipeID}</div>;
}
