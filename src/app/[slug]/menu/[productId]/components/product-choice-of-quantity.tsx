"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductChoiceOfQuantityProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}
export function ProductChoiceOfQuantity({
  quantity,
  setQuantity,
}: ProductChoiceOfQuantityProps) {
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
        <Button onClick={handleIncrement} variant="default" size={"icon"}>
          <ChevronRight />
        </Button>
      </div>
    </>
  );
}
