import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProdutctHeader } from "./components/product-header";
import { ProductDetails } from "./components/product-details";

interface ProductPageProps {
  params: { slug: string; productId: string };
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
      <ProdutctHeader
        restaurantSlug={slug}
        src={product.imageUrl ?? "/fallback.png"}
        alt={product.name}
      />
      <ProductDetails product={product} />
    </div>
  );
}
