"use client";
import { Restaurant } from "@prisma/client";
import { ChevronLeft, ScrollText, ShoppingBasketIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartSheet } from "../[slug]/menu/components/cart-sheet";
import { CartContext } from "../[slug]/menu/contexts/cart";

interface HeaderProps {
  restaurant: Restaurant;
  restaurantSlug: string;
}
export function Header({ restaurantSlug }: HeaderProps) {
  const router = useRouter();
  const { total, toggleCart, totalQuantity } = useContext(CartContext);

  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between gap-8 border-b bg-background p-4">
      <Button
        variant={"ghost"}
        size={"sm"}
        onClick={() => router.back()}
        className="group rounded-full transition-all duration-500 ease-in-out"
      >
        <ChevronLeft />
        <span className="translate-x-2 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
          Voltar
        </span>
      </Button>
      {/* <div className="w-full max-w-7xl">teste</div> */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant={"ghost"}
          size={"sm"}
          className="group transition-all delay-75 duration-300 hover:bg-foreground/10"
          onClick={() => router.push(`/${restaurantSlug}/orders`)}
        >
          <span className="-translate-x-2 opacity-0 transition-all delay-75 duration-500 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
            Ver Pedidos
          </span>
          <ScrollText />
        </Button>
        <div className="max-lg:hidden">
          <Button variant={"outline"} size={"sm"} onClick={toggleCart}>
            <ShoppingBasketIcon />
            <div className="flex flex-col items-center justify-start">
              {formatCurrency(total)}
              <span className="flex items-center justify-start text-xs font-normal text-muted-foreground">
                {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
              </span>
            </div>
          </Button>
          <CartSheet />
        </div>
      </div>
    </header>
  );
}
