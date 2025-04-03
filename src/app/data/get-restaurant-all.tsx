import { Restaurant } from "@prisma/client";

import { db } from "@/lib/prisma";

export const getRestaurantAll = async (): Promise<Restaurant[]> => {
  const restaurants = await db.restaurant.findMany();
  return restaurants;
};
