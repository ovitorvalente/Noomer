"use server";

import { db } from "@/lib/prisma";
import { ConsumptionMethod } from "@prisma/client";
import { removeCpfPunctuation } from "../helpers/cpf";
import { redirect } from "next/navigation";

interface CreateOrderInput {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  restaurantSlug: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: input.restaurantSlug,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurante nao encontrado");
  }

  const productsWithPrice = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });

  const productsWithPriceAndQuantities = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productsWithPrice.find((p) => p.id === product.id)!.price,
  }));

  await db.order.create({
    data: {
      consumptionMethod: input.consumptionMethod,
      status: "PENDING",
      customerName: input.customerName.toUpperCase(),
      customerCpf: removeCpfPunctuation(input.customerCpf),
      orderProducts: {
        createMany: {
          data: productsWithPriceAndQuantities,
        },
      },
      total: productsWithPriceAndQuantities.reduce(
        (accumulated, product) =>
          accumulated + product.price * product.quantity,
        0,
      ),
      restaurantId: restaurant.id,
    },
  });
};
