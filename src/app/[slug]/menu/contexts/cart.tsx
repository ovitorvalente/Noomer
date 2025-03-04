"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleCart = () => setIsOpen((isOpen) => !isOpen);

  const addProduct = (product: CartProduct) => {
    const productIsAlreadyOnTheCart = products.some((p) => p.id === product.id);

    if (!productIsAlreadyOnTheCart) {
      setProducts((prevProducts) => [...prevProducts, product]);
    } else {
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + product.quantity }
            : p,
        ),
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        isOpen: isOpen,
        products: products,
        toggleCart: toggleCart,
        addProduct: addProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
