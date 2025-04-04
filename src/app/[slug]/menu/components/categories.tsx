"use client";
import { MenuCategory, Prisma } from "@prisma/client";
import { Clock, StarIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../contexts/cart";
import { CartSheet } from "./cart-sheet";
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
  const { products, total, toggleCart, totalQuantity } =
    useContext(CartContext);

  const handleCategoryClick = (category: MenuCategoriesWithProducts) => {
    setSelectedCategory(category);
  };

  const getCategoryButtonVariant = (category: MenuCategory) => {
    return selectedCategory.id === category.id ? "default" : "secondary";
  };

  return (
    <>
      <div className="relative z-50 flex w-full max-w-7xl flex-col space-y-2 rounded-t-3xl p-2">
        <div className="flex items-start justify-between rounded-3xl py-4">
          <div className="flex items-center gap-4">
            <Image
              src={restaurant.avatarImageUrl}
              alt={restaurant.name}
              width={45}
              height={45}
              className="rounded-2xl object-cover"
            />
            <div className="">
              <h1 className="text-lg font-semibold">{restaurant.name}</h1>
              <p className="text-sm opacity-50">{restaurant.description}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="flex w-fit items-center gap-2 px-2 text-sm font-semibold text-green-500">
              <Clock size={16} />
              Aberto
            </div>
            <div className="flex w-fit items-center gap-2 px-2 text-sm font-semibold text-yellow-500">
              <StarIcon className="text-yellow-500" size={14} />
              5.0
            </div>
          </div>
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

        <h3 className="mt-4 text-xl font-semibold">{selectedCategory.name}</h3>

        <Products products={selectedCategory.products} />

        {products.length > 0 && (
          <div
            onClick={toggleCart}
            className="fixed bottom-0 left-0 right-0 flex w-full cursor-pointer items-center justify-between bg-foreground px-8 py-4 lg:hidden"
          >
            <span className="text-sm font-bold text-background">
              Ver Sacola
            </span>
            <div className="flex items-center justify-center">
              <p className="text-sm font-semibold text-background">
                {formatCurrency(total)}
              </p>

              <span className="text-xs font-normal text-muted-foreground">
                / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
              </span>
            </div>
          </div>
        )}
      </div>
      <CartSheet />
    </>
  );
}
