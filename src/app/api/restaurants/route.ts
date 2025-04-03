import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        avatarImageUrl: true,
        slug: true,
      },
    });
    return NextResponse.json(restaurants);
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao carregar restaurantes: " + { error } },
      { status: 500 },
    );
  }
}
