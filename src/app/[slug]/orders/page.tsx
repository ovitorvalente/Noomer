import { db } from "@/lib/prisma";

import { isValidCpf, removeCpfPunctuation } from "../menu/helpers/cpf";
import { CpfForm } from "./components/cpf-form";
import { Header } from "./components/header";
import { OrderList } from "./components/order-list";

interface OrdersPageProps {
  searchParams: Promise<{ cpf: string }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const { cpf } = await searchParams;
  if (!cpf || !isValidCpf(cpf)) {
    return <CpfForm />;
  }

  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      customerCpf: removeCpfPunctuation(cpf),
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <>
      <div className="flex w-full flex-col">
        <Header />
        <OrderList orders={orders} />
      </div>
    </>
  );
}
