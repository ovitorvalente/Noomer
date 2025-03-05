"use client";

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
import Image from "next/image";
import { useRouter } from "next/navigation";

interface OrderPlacedProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  restaurantSlug: string;
}

export function OrderPlaced({
  open,
  onOpenChange,
  restaurantSlug,
}: OrderPlacedProps) {
  const router = useRouter();

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
          <div className="flex w-full flex-col gap-2">
            <DialogTitle>Pedido Efetuado!</DialogTitle>
            <DialogDescription>
              Seu pedido foi realizado com sucesso!
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant={"secondary"}
              size={"lg"}
              className="rounded-full bg-transparent font-bold text-red-500 shadow-none"
              onClick={() => router.push(`/${restaurantSlug}/orders`)}
            >
              Ver Pedidos
            </Button>
            <DialogClose asChild>
              <Button
                variant={"secondary"}
                size={"lg"}
                className="w-full rounded-full font-bold"
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
