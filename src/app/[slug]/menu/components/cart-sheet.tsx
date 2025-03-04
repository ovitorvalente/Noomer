"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useContext } from "react";
import { CartItem } from "./cart-item";
import { CartContext } from "../contexts/cart";

export function CartSheet() {
  const { isOpen, toggleCart, products } = useContext(CartContext);
  return (
    <>
      <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetContent className="flex w-[90%] flex-col items-start">
          <SheetHeader className="flex items-center justify-between">
            <SheetTitle>Sacola</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
          <div className="flex w-full flex-col items-start gap-8">
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
