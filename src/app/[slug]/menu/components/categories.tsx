"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MenuCategory, Prisma } from "@prisma/client";
import { Clock, StarIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Products } from "./products";

interface restaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true };
      };
    };
  }>;
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

export default function RestaurantCategories({
  restaurant,
}: restaurantCategoriesProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoriesWithProducts>(restaurant.menuCategories[0]);

  const handleCategoryClick = (category: MenuCategoriesWithProducts) => {
    setSelectedCategory(category);
  };

  const getCategoryButtonVariant = (category: MenuCategory) => {
    return selectedCategory.id === category.id ? "default" : "secondary";
  };

  return (
    <div className="relative z-50 mt-[-1.5rem] space-y-2 rounded-t-3xl bg-background p-8">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={45}
            height={45}
            className="object-cover"
          />
          <div className="">
            <h1 className="text-lg font-semibold">{restaurant.name}</h1>
            <p className="text-sm opacity-50">{restaurant.description}</p>
          </div>
        </div>
        <div className="flex w-fit items-center gap-2 rounded-full border px-2">
          <StarIcon className="text-yellow-500" size={14} />
          5.0
        </div>
      </div>
      <div className="flex w-fit items-center gap-2 rounded-full bg-green-50/5 px-2 font-semibold text-green-500">
        <Clock size={16} />
        Aberto
      </div>

      <ScrollArea className="w-full border-b">
        <div className="flex w-max gap-4 py-4">
          {restaurant.menuCategories.map((category) => (
            <Button
              onClick={() => handleCategoryClick(category)}
              key={category.id}
              variant={getCategoryButtonVariant(category)}
              size={"sm"}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <span className="mt-4 text-xl font-semibold">
        {selectedCategory.name}
      </span>

      <Products products={selectedCategory.products} />
    </div>
  );
}
