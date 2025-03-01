"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function ProductChoiceOfQuantity() {
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrement = () => setQuantity((quantity) => quantity + 1);
  const handleDecrement = () =>
    setQuantity((quantity) => (quantity > 1 ? quantity - 1 : 1));

  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <Button onClick={handleDecrement} variant="outline" size={"icon"}>
          <ChevronLeft />
        </Button>
        <p className="flex w-4 items-center justify-center">{quantity}</p>
        <Button onClick={handleIncrement} variant="destructive" size={"icon"}>
          <ChevronRight />
        </Button>
      </div>
    </>
  );
}
