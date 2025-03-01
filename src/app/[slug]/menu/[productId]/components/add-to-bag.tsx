"use client";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart";

export function AddToBag() {
  const { toggleCart } = useContext(CartContext);
  const handleAddToCart = () => toggleCart();

  return (
    <>
      <Button onClick={handleAddToCart} className="w-full">
        Adicionar a Sacola
      </Button>
    </>
  );
}
