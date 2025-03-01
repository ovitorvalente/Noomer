import { formatCurrency } from "@/helpers/format-currency";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProductsProps {
  products: Product[];
}

export function Products({ products }: ProductsProps) {
  const { slug } = useParams<{ slug: string }>();
  return (
    <div className="flex h-full w-full flex-col">
      {products.map((product) => (
        <Link
          href={`/${slug}/menu/${product.id}`}
          key={product.id}
          className="flex items-center justify-between gap-10 border-b py-4"
        >
          <div className="flex flex-col gap-0.5">
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            <p className="pt-3 text-sm font-semibold">
              {formatCurrency(product.price)}
            </p>
          </div>
          <div className="relative min-h-[100px] min-w-[100px]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
