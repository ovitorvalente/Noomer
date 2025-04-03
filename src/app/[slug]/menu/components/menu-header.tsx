"use client";

import { ChevronLeft, ScrollText } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface RestaurantHeaderProps {
  restaurantSlug: string;
}
export function RestaurantMenuHeader({
  restaurantSlug,
}: RestaurantHeaderProps) {
  const router = useRouter();

  const handleGoBack = () => router.back();

  return (
    <>
      <Button
        variant="secondary"
        size={"icon"}
        className="fixed left-4 top-4 z-50"
        onClick={handleGoBack}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="secondary"
        size={"icon"}
        className="fixed right-4 top-4 z-50"
        onClick={() => router.push(`/${restaurantSlug}/orders`)}
      >
        <ScrollText />
      </Button>
    </>
  );
}
