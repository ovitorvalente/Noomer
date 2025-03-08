import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import RestaurantCategories from "./components/categories";
import { RestaurantHeader } from "./components/menu-header";

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
    <div className="">
      <div className="relative h-[250px] w-full">
        <RestaurantHeader
          restaurantSlug={slug}
          src={restaurant.coverImageUrl}
          alt={restaurant.name}
        />
      </div>
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
}
