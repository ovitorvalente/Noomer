import Image from "next/image";
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "../data/get-restaurant-by-slug";
import { ConsumptionMethodOption } from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) return notFound();

  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      <div className="mt-20 flex flex-col items-center justify-center gap-2">
        <Image
          className="object-cover"
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={82}
          height={82}
        />
        <h1 className="text-xl font-semibold">{restaurant?.name}</h1>
      </div>

      <div className="flex flex-col items-center justify-center space-y-2 py-24">
        <h2 className="text-2xl font-semibold">Seja bem-vindo!</h2>
        <p className="max-w-xl text-center opacity-50">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <ConsumptionMethodOption
          slug={slug}
          imageUrl="/dine_in.svg"
          imageAlt="Comer aqui"
          buttonText="Comer aqui"
          option="DINE_IN"
        />
        <ConsumptionMethodOption
          slug={slug}
          imageUrl="/takeaway.svg"
          imageAlt="Para levar"
          buttonText="Para levar"
          option="TAKEAWAY"
        />
      </div>
    </div>
  );
}
