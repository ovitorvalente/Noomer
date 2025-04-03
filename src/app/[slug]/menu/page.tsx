import Image from "next/image";
import { notFound } from "next/navigation";

import { Header } from "@/app/components/header";
import { db } from "@/lib/prisma";

import RestaurantCategories from "./components/categories";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

export default async function RestaurantMenuPage({
  params,
  searchParams,
}: RestaurantMenuPageProps) {
  const { slug } = await params;
  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: {
      menuCategories: {
        include: { products: true },
      },
    },
  });
  const { consumptionMethod } = await searchParams;

  const isConsumptionMethodValid = (consumptionMethod: string) => {
    return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
  };

  if (!restaurant || !isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Header restaurantSlug={slug} restaurant={restaurant} />
      <div className="relative mt-20 h-96 w-full max-w-7xl">
        <Image
          src={restaurant.coverImageUrl}
          alt={restaurant.name}
          fill
          className="pointer-events-none rounded-3xl object-fill p-2"
        />
      </div>

      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
}
