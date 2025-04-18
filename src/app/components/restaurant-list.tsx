"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Restaurant {
  id: string;
  name: string;
  description: string;
  avatarImageUrl: string;
  slug: string;
}

export function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("/api/restaurants");
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error("Erro ao buscar restaurantes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Carregando...</p>
      </div>
    );

  return (
    <>
      <h1 className="mb-6 mt-12 text-2xl font-bold max-md:flex max-md:justify-center">Restaurantes</h1>
      <div className="grid grid-cols-8 gap-4 md:grid-cols-3 max-md:flex max-md:justify-center max-md:flex-col]">
        {restaurants.map((restaurant) => (
          <Link
            href={`/${restaurant.slug}`}
            key={restaurant.id}
            className="h-30 flex w-fit items-center gap-2 rounded-3xl bg-black/10 p-2 shadow-2xl shadow-slate-500/15 transition-all delay-75 duration-300 hover:scale-105 hover:bg-black/20 hover:shadow-slate-500/30 max-xl:flex-col"
          >
            <div className="">
              <Image
                src={restaurant.avatarImageUrl}
                alt={restaurant.name}
                className="w-full object-cover"
                width={82}
                height={82}
              />
            </div>
            <div className="justify-start00 flex h-full flex-col items-start p-2">
              <h3 className="text-xl font-medium">{restaurant.name}</h3>
              <p className="text-sm font-normal text-zinc-600">
                {restaurant.description}
              </p>
              <span className="text-blue-500 hover:underline">
                Ver detalhes
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
