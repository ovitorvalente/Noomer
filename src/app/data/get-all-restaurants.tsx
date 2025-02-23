import { db } from "@/lib/prisma";

export async function GetAllRestaurants() {
  const restaurants = await db.restaurant.findMany();
  return restaurants;
}
