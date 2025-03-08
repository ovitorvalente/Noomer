"use client";
import { Product } from "@prisma/client";
import { useContext } from "react";

import { Button } from "@/components/ui/button";

import { CartContext } from "../../contexts/cart";

interface ProductProps {
  product: Product;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export function AddToBag({ product, quantity, setQuantity }: ProductProps) {
  const { toggleCart, addProduct } = useContext(CartContext);
  const handleAddToCart = () => {
    addProduct({
      ...product,
      quantity: quantity,
    });
    setQuantity(1);
    toggleCart();
  };

  return (
    <>
      <Button onClick={handleAddToCart} className="w-full">
        Adicionar a Sacola
      </Button>
    </>
  );
}
