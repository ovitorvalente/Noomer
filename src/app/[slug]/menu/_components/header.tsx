"use client";

import { Button } from "@/components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeft, ScrollText } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "coverImageUrl" | "name">;
}
export function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
  const router = useRouter();

  const handleGoBack = () => router.back();

  return (
    <>
      <Button
        variant="secondary"
        size={"icon"}
        className="absolute left-4 top-4 z-50"
        onClick={handleGoBack}
      >
        <ChevronLeft />
      </Button>
      <Image
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <Button
        variant="secondary"
        size={"icon"}
        className="absolute right-4 top-4 z-50"
      >
        <ScrollText />
      </Button>
    </>
  );
}
