"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ScrollText } from "lucide-react";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  return (
    <>
      <header className="fixed z-50 flex w-full items-center gap-12 bg-background/80 p-8 backdrop-blur">
        <Button
          variant={"secondary"}
          size={"icon"}
          onClick={() => router.back()}
        >
          <ChevronLeft />
        </Button>
        <div className="flex items-center gap-2">
          <ScrollText />
          <h1 className="text-xl font-semibold">Meus Pedidos</h1>
        </div>
      </header>
    </>
  );
}
