import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ConsumptionMethodOptionProps {
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  slug: string;
  option: ConsumptionMethod;
}

export function ConsumptionMethodOption({
  imageUrl,
  imageAlt,
  buttonText,
  option,
  slug,
}: ConsumptionMethodOptionProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-center py-8">
        <div className="relative h-[80px] w-[80px]">
          <Image
            className="object-contain"
            src={imageUrl}
            fill
            alt={imageAlt}
          />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <Button variant={"secondary"} asChild>
          <Link href={`${slug}/menu?consumptionMethod=${option}`} passHref>
            {buttonText}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
