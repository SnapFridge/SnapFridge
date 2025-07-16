"use client";
import useSWR from "swr";
import { use } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function recipeFetcher(url: string) {
  const res = await fetch(url);
  return res.json();
}

export default function Page({ params }: Props) {
  const { id } = use(params);
  const { data, error, isLoading } = useSWR(`/api/recipe/${id}`, recipeFetcher);

  if (error) {
    return <h1>error</h1>;
  }

  if (isLoading) {
    return <h1>loading</h1>;
  }

  return <div>{data.hi}</div>;
}
