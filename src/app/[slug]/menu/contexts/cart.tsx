"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  total: number;
  totalQuantity: number;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  decreaseProductQuantity: (productID: string) => void;
  increaseProductQuantity: (productID: string) => void;
  removeProduct: (productID: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
  total: 0,
  totalQuantity: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const total = products.reduce((accumulated, product) => {
    return accumulated + product.price * product.quantity;
  }, 0);

  const totalQuantity = products.reduce((accumulated, product) => {
    return accumulated + product.quantity;
  }, 0);

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

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }
        if (prevProduct.quantity === 1) {
          return prevProduct;
        } else {
          return { ...prevProduct, quantity: prevProduct.quantity - 1 };
        }
      });
    });
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity + 1 };
      });
    });
  };

  const removeProduct = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((prevProduct) => prevProduct.id !== productId),
    );
  };

  return (
    <CartContext.Provider
      value={{
        isOpen: isOpen,
        products: products,
        toggleCart: toggleCart,
        addProduct: addProduct,
        decreaseProductQuantity: decreaseProductQuantity,
        increaseProductQuantity: increaseProductQuantity,
        removeProduct: removeProduct,
        total: total,
        totalQuantity: totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
