import { endpoints } from "@/constants";

export async function useAgencyDashboardData() {
    const response = await fetch(endpoints.agencyDashboardData);

    const res = await response.json();

    return {
        activeSuppliers: res.dashboard.activeSupplierCount,
        activeHospitals: res.dashboard.hospitalCount,
        pendingApprovals: res.dashboard.pendingSupplierCount,
        lowStockAlerts: res.dashboard.lowStockProductCount,
        suppliers: res.suppliers.list,
        hospitals: res.hospitals.list,
        suppliersActive: res.suppliers.active,
        suppliersPending: res.suppliers.pending,
    }

}