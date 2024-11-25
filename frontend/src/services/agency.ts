import { endpoints } from "@/constants";

export async function useAgencyDashboardData() {
    const response = await fetch(endpoints.agencyDashboardData);

    const res = await response.json();

    return {
        activeSuppliers: res.dashboard.supplierCompliantCount,
        activeHospitals: res.dashboard.hospitalCount,
        pendingApprovals: res.dashboard.supplierNonCompliantCount,
        suppliers: res.suppliers.list
    }

}