import { LoaderFunctionArgs } from "react-router";
import { Beer } from "../features/data";

export const API_URL = "http://localhost:3000";

export async function getMenu(): Promise<Beer[]> {
  const res = await fetch(`${API_URL}/beers`);
  const data = await res.json();
  return data;
}

export async function getBeer(id: string | number): Promise<Beer | null> {
  const res = await fetch(`${API_URL}/beers/${id}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data[0];
}

export async function beerLoader(
  args: LoaderFunctionArgs<Beer>,
): Promise<Beer | null> {
  const { params } = args;
  const beer = await getBeer(+params.id as number);
  return beer;
}
