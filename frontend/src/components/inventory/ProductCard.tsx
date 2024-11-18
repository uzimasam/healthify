import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export function ProductCard({ product, onEdit }: ProductCardProps) {
  const isLowStock = product.stock < 10;

  return (
    <Card>
      <CardHeader className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {isLowStock && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Low Stock
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.manufacturer}</p>
        <div className="mt-2 space-y-1">
          <div className="flex justify-between">
            <span className="text-sm">Stock:</span>
            <span className="text-sm font-medium">{product.stock} {product.unit}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Price:</span>
            <span className="text-sm font-medium">${product.price}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onEdit(product)} className="w-full">
          Manage Stock
        </Button>
      </CardFooter>
    </Card>
  );
}