type Props = {
  params: Promise<{
    id: string;
  }>;
};
export default async function Page({ params }: Props) {
  const { id } = await params;
  return <div>My Post: {id}</div>;
}
