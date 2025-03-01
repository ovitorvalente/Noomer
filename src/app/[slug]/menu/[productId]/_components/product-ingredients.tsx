import { Product } from "@prisma/client";
import { ChefHat } from "lucide-react";

interface ProductIngredientsProps {
  product: Product;
}
export function ProductIngredients({ product }: ProductIngredientsProps) {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-2">
        <ChefHat />
        <h4 className="font-semibold">Ingredientes</h4>
      </div>
      <ul className="list-disc space-y-1 px-6 text-sm text-muted-foreground">
        {product.ingredients.map((ingredient) => (
          <li key={ingredient} className="text-sm text-muted-foreground">
            {ingredient}
          </li>
        ))}
      </ul>
    </div>
  );
}
