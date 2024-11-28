import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AddProductDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface ProductPayload {
    supplier_id: number;
    name: string;
    category_id: number;
    price: number;
    stock: number;
    min_stock: number;
    image_url: string;
    description: string;
    sku: string;
    unit: string;
}

export function AddProductDialog({ open, onOpenChange }: AddProductDialogProps) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<ProductPayload>({
        supplier_id: 2, // Hardcoded for now - should come from auth context
        name: "",
        category_id: 1,
        price: 0,
        stock: 0,
        min_stock: 0,
        image_url: "",
        description: "",
        sku: "",
        unit: ""
    });

    const handleInputChange = (field: keyof ProductPayload, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8020/api/supplier/add-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add product');
            }

            toast({
                title: "Product added successfully",
                description: "The new product has been added to your inventory.",
            });

            onOpenChange(false);

            // Reset form
            setFormData({
                supplier_id: 2,
                name: "",
                category_id: 1,
                price: 0,
                stock: 0,
                min_stock: 0,
                image_url: "",
                description: "",
                sku: "",
                unit: ""
            });
        } catch (error) {
            console.error('Error adding product:', error);
            toast({
                title: "Error adding product",
                description: "There was a problem adding the product. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogDescription>
                            Add a new product to your inventory.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="Enter product name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    value={String(formData.category_id)}
                                    onValueChange={(value) => handleInputChange('category_id', Number(value))}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">PPE</SelectItem>
                                        <SelectItem value="2">Medical Supplies</SelectItem>
                                        <SelectItem value="3">Equipment</SelectItem>
                                        <SelectItem value="4">Pharmaceuticals</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Price ($)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={formData.price || ''}
                                    onChange={(e) => handleInputChange('price', Number(e.target.value))}
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="stock">Initial Stock</Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    value={formData.stock || ''}
                                    onChange={(e) => handleInputChange('stock', Number(e.target.value))}
                                    placeholder="0"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="minStock">Min Stock Level</Label>
                                <Input
                                    id="minStock"
                                    type="number"
                                    value={formData.min_stock || ''}
                                    onChange={(e) => handleInputChange('min_stock', Number(e.target.value))}
                                    placeholder="0"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Image URL</Label>
                            <Input
                                id="image"
                                type="url"
                                value={formData.image_url}
                                onChange={(e) => handleInputChange('image_url', e.target.value)}
                                placeholder="https://..."
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder="Enter product description"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="sku">SKU</Label>
                                <Input
                                    id="sku"
                                    value={formData.sku}
                                    onChange={(e) => handleInputChange('sku', e.target.value)}
                                    placeholder="Enter SKU"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="unit">Unit</Label>
                                <Select
                                    value={formData.unit}
                                    onValueChange={(value) => handleInputChange('unit', value)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Piece">Piece</SelectItem>
                                        <SelectItem value="Box">Box</SelectItem>
                                        <SelectItem value="Pack">Pack</SelectItem>
                                        <SelectItem value="Case">Case</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Adding..." : "Add Product"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}