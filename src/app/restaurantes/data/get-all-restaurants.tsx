import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GetAllRestaurants() {
  const restaurants = await prisma.restaurant.findMany();
  return restaurants;
}
