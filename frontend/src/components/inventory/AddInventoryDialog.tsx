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

interface AddInventoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddInventoryDialog({ open, onOpenChange }: Readonly<AddInventoryDialogProps>) {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onOpenChange(false);
        }, 1000);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogDescription>
                            Add a new product to the inventory system.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input id="name" placeholder="Enter product name" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ppe">PPE</SelectItem>
                                        <SelectItem value="medical_supplies">Medical Supplies</SelectItem>
                                        <SelectItem value="equipment">Equipment</SelectItem>
                                        <SelectItem value="pharmaceuticals">Pharmaceuticals</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="supplier">Supplier</Label>
                                <Select required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select supplier" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="medtech">MedTech Supplies Inc.</SelectItem>
                                        <SelectItem value="global">Global Healthcare Solutions</SelectItem>
                                        <SelectItem value="premier">Premier Medical Supplies</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hospital">Hospital</Label>
                                <Select required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select hospital" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="metro">Metropolitan General Hospital</SelectItem>
                                        <SelectItem value="stmarys">St. Mary's Medical Center</SelectItem>
                                        <SelectItem value="city">City Children's Hospital</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="stock">Initial Stock</Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    placeholder="Enter quantity"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="unit">Unit</Label>
                                <Select required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select unit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pieces">Pieces</SelectItem>
                                        <SelectItem value="boxes">Boxes</SelectItem>
                                        <SelectItem value="packs">Packs</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Price per Unit ($)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    placeholder="Enter price"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="minStock">Minimum Stock Level</Label>
                                <Input
                                    id="minStock"
                                    type="number"
                                    placeholder="Enter minimum stock"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input
                                    id="expiryDate"
                                    type="date"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Additional Notes</Label>
                            <Input
                                id="notes"
                                placeholder="Enter any additional information"
                            />
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