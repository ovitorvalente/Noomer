import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProdutctHeader } from "./components/product-header";
import Image from "next/image";
import { formatCurrency } from "@/helpers/format-currency";
import { ProductChoiceOfQuantity } from "./components/product-choice-of-quantity";
import { ProductAbout } from "./components/product-about";
import { ProductIngredients } from "./components/product-ingredients";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AddToBag } from "./components/add-to-bag";
import { CartSheet } from "./components/cart-sheet";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, productId } = await params;
  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      restaurant: { select: { name: true, avatarImageUrl: true, slug: true } },
    },
  });

  if (!product) return notFound();
  if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase())
    return notFound();

  return (
    <div className="flex h-full w-full flex-col items-center">
      <ProdutctHeader src={product.imageUrl} alt={product.name} />
      <div className="z-50 flex h-full w-full flex-col items-center overflow-hidden rounded-t-3xl bg-foreground/5 p-5">
        <div className="flex-auto overflow-hidden">
          <div className="flex w-full flex-col items-start justify-center gap-2 pb-10">
            <div className="flex items-center justify-center gap-2">
              <Image
                className="rounded-full"
                src={product.restaurant.avatarImageUrl}
                alt={product.restaurant.name}
                width={16}
                height={16}
              />
              <span className="text-xs text-muted-foreground">
                {product.restaurant.name}
              </span>
            </div>
            <h1 className="text-xl font-semibold">{product.name}</h1>
            <div className="flex w-full items-center justify-between">
              <h3 className="text-xl font-semibold">
                {formatCurrency(product.price)}
              </h3>
              <ProductChoiceOfQuantity />
            </div>
          </div>
          <ScrollArea className="h-full pr-6">
            <div className="flex flex-col gap-8">
              <ProductAbout product={product} />
              <ProductIngredients product={product} />
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
        <AddToBag />
        <CartSheet />
      </div>
    </div>
  );
}
