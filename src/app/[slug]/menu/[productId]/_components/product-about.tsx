import { Product } from "@prisma/client";

interface ProductAboutProps {
  product: Product;
}
export function ProductAbout({ product }: ProductAboutProps) {
  return (
    <div className="w-full space-y-3">
      <h4 className="font-semibold">Sobre</h4>
      <p className="text-sm text-muted-foreground">{product.description}</p>
    </div>
  );
}
