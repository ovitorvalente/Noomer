"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface OrderPlacedProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  restaurantSlug: string;
  cpf: string;
}

export function OrderPlaced({
  open,
  onOpenChange,
  restaurantSlug,
  cpf,
}: OrderPlacedProps) {
  const router = useRouter();

  const handleViewOrders = () => {
    router.push(`/${restaurantSlug}/orders?cpf=${cpf}`);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-8">
        <DialogHeader className="flex items-center justify-center gap-5">
          <Image
            src="/check icon.svg"
            alt="Pedido efetuado"
            width={72}
            height={72}
          />
          <div className="flex w-full flex-col items-center gap-2">
            <DialogTitle>Pedido Efetuado!</DialogTitle>
            <DialogDescription>
              Seu pedido foi realizado com sucesso!
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full items-center justify-center gap-2">
            <Button
              variant={"secondary"}
              size={"lg"}
              className="w-fit rounded-full bg-transparent font-bold text-red-500 shadow-none"
              onClick={handleViewOrders}
            >
              Ver Pedidos
            </Button>
            <DialogClose asChild>
              <Button
                variant={"secondary"}
                size={"lg"}
                className="w-fit rounded-full font-bold"
              >
                Continuar
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
