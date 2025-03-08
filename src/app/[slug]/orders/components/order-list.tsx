import { OrderStatus, Prisma } from "@prisma/client";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";

interface OrderListProps {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: {
          select: {
            name: true;
            avatarImageUrl: true;
          };
        };
        orderProducts: {
          include: {
            product: true;
          };
        };
      };
    }>
  >;
}
export function OrderList({ orders }: OrderListProps) {
  const statusLabels: Record<OrderStatus, string> = {
    PENDING: "Pendente",
    CONFIRMED: "Confirmado",
    PREPARING: "Em Preparo",
    DELIVERING: "A Caminho",
    DELIVERED: "Entregue",
    CANCELED: "Cancelado",
  };
  const statusColors: Record<OrderStatus, string> = {
    PENDING: "bg-yellow-500 text-white",
    CONFIRMED: "bg-blue-500 text-white",
    PREPARING: "bg-orange-500 text-white",
    DELIVERING: "bg-purple-500 text-white",
    DELIVERED: "bg-green-500 text-white",
    CANCELED: "bg-red-500 text-white",
  };

  return (
    <>
      <div className="my-24 flex flex-col p-8">
        <div className="flexc flex-col space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex w-full flex-col gap-5 rounded-2xl border p-5"
            >
              <div className="flex items-center justify-between">
                <Badge
                  variant={"outline"}
                  className={`w-fit border-none font-semibold transition-all delay-75 duration-300 hover:bg-opacity-50 ${statusColors[order.status]}`}
                >
                  {statusLabels[order.status]}
                </Badge>
                <span className="text-xs opacity-50">#{order.id}</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative size-5">
                  <Image
                    className="rounded-2xl"
                    src={order.restaurant.avatarImageUrl}
                    alt={order.restaurant.name}
                    fill
                  />
                </div>
                <h3 className="">{order.restaurant.name}</h3>
              </div>
              <Separator />

              <div className="flex flex-col gap-2">
                {order.orderProducts.map((orderProduct) => (
                  <div
                    key={orderProduct.id}
                    className="flex items-center gap-2"
                  >
                    <div className="flex size-5 items-center justify-center rounded-full bg-muted-foreground text-xs font-semibold text-background">
                      {orderProduct.quantity}
                    </div>

                    <p className="">{orderProduct.product.name}</p>
                  </div>
                ))}
              </div>
              <Separator />
              <p className="text-sm font-semibold">
                Total: {formatCurrency(order.total)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
