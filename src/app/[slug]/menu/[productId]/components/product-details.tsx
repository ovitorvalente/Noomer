"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import { ProductAbout } from "./product-about";
import { ProductIngredients } from "./product-ingredients";
import { ProductChoiceOfQuantity } from "./product-choice-of-quantity";
import { formatCurrency } from "@/helpers/format-currency";
import { AddToBag } from "./add-to-bag";
import { CartSheet } from "./cart-sheet";
import { Prisma } from "@prisma/client";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
          slug: true;
        };
      };
    };
  }>;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <>
      <div className="z-50 flex h-full w-full flex-col items-center overflow-hidden rounded-t-3xl bg-foreground/5 p-5">
        <div className="flex-auto overflow-hidden">
          <div className="flex w-full flex-col items-start justify-center gap-2 pb-10">
            <div className="flex items-center justify-center gap-2">
              <Image
                className="rounded-full"
                src={product.restaurant.avatarImageUrl}
                alt={product.restaurant.name}
                width={16}
                height={16}
              />
              <span className="text-xs text-muted-foreground">
                {product.restaurant.name}
              </span>
            </div>
            <h1 className="text-xl font-semibold">{product.name}</h1>
            <div className="flex w-full items-center justify-between">
              <h3 className="text-xl font-semibold">
                {formatCurrency(product.price)}
              </h3>
              <ProductChoiceOfQuantity
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </div>
          </div>
          <ScrollArea className="h-full pr-6">
            <div className="flex flex-col gap-8">
              <ProductAbout product={product} />
              <ProductIngredients product={product} />
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
        <AddToBag
          product={product}
          quantity={quantity}
          setQuantity={setQuantity}
        />
        <CartSheet />
      </div>
    </>
  );
}
