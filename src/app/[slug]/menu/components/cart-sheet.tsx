"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useContext, useState } from "react";
import { CartItem } from "./cart-item";
import { CartContext } from "../contexts/cart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";
import { Button } from "@/components/ui/button";
import { FinishOrderDrawer } from "./finish-order-drawer";

export function CartSheet() {
  const [finishOrderDrawerOpen, setFinishOrderDrawerOpen] =
    useState<boolean>(false);
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  return (
    <>
      <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetContent className="flex w-[90%] flex-col items-start">
          <SheetHeader className="">
            <SheetTitle>Sacola</SheetTitle>
          </SheetHeader>
          <div className="flex h-full w-full flex-col items-start justify-between">
            <ScrollArea className="h-full w-full pr-4">
              {products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
            </ScrollArea>
            <div className="flex w-full flex-col justify-between gap-4 py-8">
              <div className="flex flex-col gap-2 rounded-2xl border px-6">
                <div className="flex items-center justify-between border-b py-4 opacity-50">
                  <p className="">Subtotal</p>
                  <p className="">{formatCurrency(total)}</p>
                </div>
                <div className="flex items-center justify-between border-b py-4 opacity-50">
                  <p className="">Descontos</p>
                  <p className="">{formatCurrency(0)}</p>
                </div>
                <div className="flex items-center justify-between border-b py-4 text-lg font-semibold">
                  <p className="">Total</p>
                  <p className="">{formatCurrency(total)}</p>
                </div>
              </div>
              <Button
                className="w-full"
                variant={"default"}
                size={"lg"}
                onClick={() => setFinishOrderDrawerOpen(true)}
              >
                Finalizar Pedido
              </Button>
              <FinishOrderDrawer
                open={finishOrderDrawerOpen}
                onOpenChange={setFinishOrderDrawerOpen}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
