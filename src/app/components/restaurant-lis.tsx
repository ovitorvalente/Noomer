"use client";
import { useEffect, useState } from "react";

interface Restaurant {
  id: number;
  name: string;
  description: string;
}

export function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("../../api/restaurants");
        if (!response.ok) {
          throw new Error(
            `Erro na requisição: ${response.status} ${response.statusText}`,
          );
        }
        const data: Restaurant[] = await response.json();
        setRestaurants(data);
        setError(null);
      } catch (error) {
        console.error("Erro ao buscar restaurantes:", error);
        setError(
          "Erro ao carregar os restaurantes. Tente novamente mais tarde.",
        );
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div>
      <h1>Restaurantes</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : restaurants.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id}>
              <h2>{restaurant.name}</h2>
              <p>{restaurant.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
