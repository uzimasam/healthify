import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Plus, ArrowUpDown } from "lucide-react";
import { ProductGrid } from "@/components/supplier/products/ProductGrid";
import { ProductList } from "@/components/supplier/products/ProductList";
import { ProductCategories } from "@/components/supplier/products/ProductCategories";
import { AddProductDialog } from "@/components/supplier/products/AddProductDialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function SupplierProducts() {
    const [view, setView] = useState("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [sortBy, setSortBy] = useState("name");

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                <Button onClick={() => setShowAddDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex gap-2">
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                            <ArrowUpDown className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="name">Name</SelectItem>
                            <SelectItem value="stock">Stock Level</SelectItem>
                            <SelectItem value="price">Price</SelectItem>
                            <SelectItem value="category">Category</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                </div>
            </div>

            <ProductCategories />

            <Tabs value={view} onValueChange={setView} className="space-y-4">
                <div className="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="grid">Grid View</TabsTrigger>
                        <TabsTrigger value="list">List View</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="grid" className="space-y-4">
                    <ProductGrid searchQuery={searchQuery} sortBy={sortBy} />
                </TabsContent>

                <TabsContent value="list" className="space-y-4">
                    <ProductList searchQuery={searchQuery} sortBy={sortBy} />
                </TabsContent>
            </Tabs>

            <AddProductDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
        </div>
    );
}