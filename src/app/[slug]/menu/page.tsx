import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { RestaurantHeader } from "./_components/header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

export default async function RestaurantMenuPage({
  params,
  searchParams,
}: RestaurantMenuPageProps) {
  const { slug } = await params;
  const restaurant = await db.restaurant.findUnique({ where: { slug } });
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
        <RestaurantHeader restaurant={restaurant} />
      </div>
    </div>
  );
}
