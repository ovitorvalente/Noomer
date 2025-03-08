"use client";

import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext, CartProduct } from "../contexts/cart";

interface CartItemProps {
  product: CartProduct;
}

export function CartItem({ product }: CartItemProps) {
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } =
    useContext(CartContext);
  return (
    <>
      <div className="flex w-full items-center justify-between border-b border-secondary py-6">
        <div className="flex items-center justify-center gap-2">
          <div className="relative h-24 w-24 rounded-3xl bg-secondary">
            <Image
              src={product.imageUrl}
              alt={product.name}
              className="object-cover p-1"
              fill
            />
          </div>

          <div className="flex max-w-[90%] flex-col items-start space-y-1">
            <p className="truncate text-ellipsis text-sm">{product.name}</p>
            <p className="text-sm font-semibold">
              {formatCurrency(product.price)}
            </p>

            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={() => decreaseProductQuantity(product.id)}
                variant="outline"
                size={"icon"}
              >
                <ChevronLeft />
              </Button>
              <p className="flex w-4 items-center justify-center">
                {product.quantity}
              </p>
              <Button
                onClick={() => increaseProductQuantity(product.id)}
                variant="default"
                size={"icon"}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>

        <Button
          onClick={() => removeProduct(product.id)}
          variant={"outline"}
          size={"icon"}
          className="transition-all delay-75 duration-300 hover:rotate-12 hover:bg-red-500 hover:text-white"
        >
          <Trash2 />
        </Button>
      </div>
    </>
  );
}
