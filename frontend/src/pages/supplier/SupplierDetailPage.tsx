import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupplierOverview } from "@/components/supplier/detail/SupplierOverview";
import { SupplierProducts } from "@/components/supplier/detail/SupplierProducts";
import { SupplierOrders } from "@/components/supplier/detail/SupplierOrders";
import { fetchSupplierDetails } from "@/lib/api/supplier";
import type { Supplier } from "@/lib/api/supplier";
import { Badge } from "@/components/ui/badge";

export function SupplierDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [supplier, setSupplier] = useState<Supplier | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadSupplier() {
            try {
                setIsLoading(true);
                const data = await fetchSupplierDetails(id!);
                setSupplier(data);
                setError(null);
            } catch (err) {
                setError('Failed to load supplier details. Please try again later.');
                console.error('Error loading supplier:', err);
            } finally {
                setIsLoading(false);
            }
        }

        if (id) {
            loadSupplier();
        }
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex-1 space-y-6 p-8 pt-6">
                <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
                <div className="space-y-6">
                    <div className="h-48 bg-gray-200 rounded animate-pulse" />
                    <div className="h-96 bg-gray-200 rounded animate-pulse" />
                </div>
            </div>
        );
    }

    if (error || !supplier) {
        return (
            <div className="flex-1 p-8 pt-6">
                <div className="text-center text-red-500">
                    {error || 'Supplier not found'}
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">
                    {supplier.organization.name}
                </h2>
                <Badge variant={supplier.organization.status === 'active' ? 'default' : 'secondary'}>
                    {supplier.organization.status}
                </Badge>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <SupplierOverview supplier={supplier} />
                </TabsContent>

                <TabsContent value="products">
                    <SupplierProducts products={supplier.products} />
                </TabsContent>

                <TabsContent value="orders">
                    <SupplierOrders orders={supplier.orders} />
                </TabsContent>
            </Tabs>
        </div>
    );
}