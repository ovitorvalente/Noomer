"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ScrollText } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductsHeaderProps {
  src: string;
  alt: string;
}
export function ProdutctHeader({ src, alt }: ProductsHeaderProps) {
  const router = useRouter();

  const handleGoBack = () => router.back();

  return (
    <>
      <div className="relative h-96 min-h-80 w-full">
        <Button
          variant="secondary"
          size={"icon"}
          className="absolute left-4 top-4 z-50"
          onClick={handleGoBack}
        >
          <ChevronLeft />
        </Button>
        <Image src={src} alt={alt} fill className="object-contain" />
        <Button
          variant="secondary"
          size={"icon"}
          className="absolute right-4 top-4 z-50"
        >
          <ScrollText />
        </Button>
      </div>
    </>
  );
}
