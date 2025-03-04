"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useContext } from "react";
import { CartItem } from "./cart-item";
import { CartContext } from "../contexts/cart";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CartSheet() {
  const { isOpen, toggleCart, products } = useContext(CartContext);
  return (
    <>
      <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetContent className="flex w-[90%] flex-col items-start">
          <SheetHeader className="">
            <SheetTitle>Sacola</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-5/6 w-full pr-4">
            <div className="flex w-full flex-col items-start">
              {products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
