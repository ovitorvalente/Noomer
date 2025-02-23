import Link from "next/link";
import { GetAllRestaurants } from "../data/get-all-restaurants";
import Image from "next/image";

export default async function RestaurantList() {
  const restaurants = await GetAllRestaurants();

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
