import { NextApiRequest, NextApiResponse } from "next";

import { GetAllRestaurants } from "@/app/restaurantes/data/get-all-restaurants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const restaurants = await GetAllRestaurants();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: `Erro ao buscar restaurantes: ${error}` });
  }
}
