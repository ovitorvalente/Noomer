import { Restaurant } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { GetAllRestaurants } from "../data/get-all-restaurants";

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchRestaurants() {
      try {
        setLoading(true);
        const data = await GetAllRestaurants();
        setRestaurants(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocorreu um erro ao carregar os restaurantes.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurants();

    return () => {
      abortController.abort();
    };
  }, []);

  if (loading) {
    return <div>Carregando restaurantes...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Lojas</h2>
      <div className="flex flex-col">
        {restaurants.map((restaurant) => (
          <Link
            key={restaurant.slug}
            href={restaurant.slug}
            className="flex items-center justify-start gap-4 border-b p-4"
          >
            <Image
              className="object-fill"
              src={restaurant.avatarImageUrl}
              alt={restaurant.name}
              width={50}
              height={50}
            />
            <div className="">
              <h2>{restaurant.name}</h2>
              <p>{restaurant.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
