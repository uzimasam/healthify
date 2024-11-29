import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/api/supplier";

interface SupplierProductsProps {
    products: Product[];
}

export function SupplierProducts({ products }: SupplierProductsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Product Catalog</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {products === null ? (
                        <Card>
                            <CardContent>
                                <div className="flex justify-center items-center h-40">
                                    <span className="text-gray-500">No products available</span>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        products.map((product) => (
                        <Card key={product.id} className="overflow-hidden">
                            <div className="aspect-square relative">
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="object-cover w-full h-full"
                                />
                                {product.stock <= product.min_stock && (
                                    <Badge
                                        variant="destructive"
                                        className="absolute top-2 right-2"
                                    >
                                        Low Stock
                                    </Badge>
                                )}
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-semibold">{product.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                                <div className="mt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Price:</span>
                                        <span className="font-medium">${product.price}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Stock:</span>
                                        <span className="font-medium">
                                            {product.stock} {product.unit}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Category:</span>
                                        <span className="font-medium">
                                            {product.category_id === 1 ? "PPE" :
                                                product.category_id === 2 ? "Medical Supplies" :
                                                    product.category_id === 3 ? "Equipment" :
                                                        product.category_id === 4 ? "Pharmaceuticals" : "Other"}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )))}
                </div>
            </CardContent>
        </Card>
    );
}