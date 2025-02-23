import { db } from "@/lib/prisma";

export async function name(slug: string) {
  const restaurant = await db.restaurant.findUnique({ where: { slug: slug } });
  return restaurant;
}
