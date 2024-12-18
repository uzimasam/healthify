import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { LandingPage } from "@/pages/LandingPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { ForgotPasswordPage } from "@/pages/ForgotPasswordPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { InventoryPage } from "@/pages/InventoryPage";
import { OrdersPage } from "@/pages/OrdersPage";
import { SuppliersPage } from "@/pages/SuppliersPage";
import { HospitalsPage } from "@/pages/HospitalsPage";
import { AnalyticsPage } from "@/pages/AnalyticsPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { Organization } from './types/organization';
import { ReportsPage } from './pages/ReportsPage';
import { OrganizationContext } from './context';
import ProtectedRoute from './components/ProtectedRoute';
import { SupplierSidebar } from './components/layout/SupplierSidebar';
import { SupplierDashboard } from './pages/supplier/SupplierDashboard';
import { SupplierProducts } from './pages/supplier/SupplierProducts';
import { SupplierOrders } from './pages/supplier/SupplierOrders';
import { SupplierDeliveries } from './pages/supplier/SupplierDeliveries';
import { SupplierPerformance } from './pages/supplier/SupplierPerformance';
import { SupplierHospitals } from './pages/supplier/SupplierHospitals';
import { SupplierHistory } from './pages/supplier/SupplierHistory';
import { SupplierReports } from './pages/supplier/SupplierReports';
import { SupplierNotifications } from './pages/supplier/SupplierNotifications';
import { SupplierSettings } from './pages/supplier/SupplierSettings';
import { HospitalDashboard } from './pages/hospital/HospitalDashboard';
import { HospitalSidebar } from './components/layout/HospitalSidebar';
import { PlaceOrderPage } from './pages/hospital/PlaceOrderPage';
import { ActiveOrdersPage } from './pages/hospital/ActiveOrdersPage';
import { HospitalInventoryPage } from './pages/hospital/HospitalInventoryPage';
import { OrderHistoryPage } from './pages/hospital/OrderHistoryPage';
import { HospitalAnalyticsPage } from './pages/hospital/HospitalAnalyticsPage';
import { NotificationsPage } from './pages/hospital/NotificationsPage';
import { HospitalSettingsPage } from './pages/hospital/HospitalSettingsPage';
import { SupplierDetailPage } from './pages/supplier/SupplierDetailPage';

const queryClient = new QueryClient();

// Layout wrapper for dashboard routes
function DashboardLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <Header />
        {children}
      </main>
    </div>
  );
}

// Layout wrapper for hospital dashboard routes
function HospitalDashboardLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <HospitalSidebar />
      </div>
      <main className="md:pl-72">
        <Header />
        {children}
      </main>
    </div>
  );
}

// Layout wrapper for supplier dashboard routes
function SupplierDashboardLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <SupplierSidebar />
      </div>
      <main className="md:pl-72">
        <Header />
        {children}
      </main>
    </div>
  );
}

function App() {
  const [organization, setOrganization] = useState<Organization | null>(null);

  useEffect(() => {
    function getOrganization() {
      const organization = sessionStorage.getItem("organization");
      if (organization) {
        setOrganization(JSON.parse(organization));
      }
    }
    getOrganization();
  }, []);

  const organizationContextValue = useMemo(() => ({ organization, setOrganization }), [organization, setOrganization]);

  return (
    <QueryClientProvider client={queryClient}>
      <OrganizationContext.Provider value={organizationContextValue}>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><DashboardPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/dashboard/inventory" element={<ProtectedRoute><DashboardLayout><InventoryPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/dashboard/orders" element={<ProtectedRoute><DashboardLayout><OrdersPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/dashboard/suppliers" element={<ProtectedRoute><DashboardLayout><SuppliersPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/dashboard/hospitals" element={<ProtectedRoute><DashboardLayout><HospitalsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/dashboard/analytics" element={<ProtectedRoute><DashboardLayout><AnalyticsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path='/dashboard/reports' element={<ProtectedRoute><DashboardLayout><ReportsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><DashboardLayout><SettingsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/dashboard/supplier/:id" element={<ProtectedRoute><DashboardLayout><SupplierDetailPage /></DashboardLayout></ProtectedRoute>} />

            {/* Hospital Dashboard Routes */}
            <Route path="/hospital/dashboard" element={<HospitalDashboardLayout><HospitalDashboard /></HospitalDashboardLayout>} />
            <Route path='/hospital/place-order' element={<HospitalDashboardLayout><PlaceOrderPage /></HospitalDashboardLayout>} />
            <Route path='/hospital/active-orders' element={<HospitalDashboardLayout><ActiveOrdersPage /></HospitalDashboardLayout>} />
            <Route path='/hospital/inventory' element={<HospitalDashboardLayout><HospitalInventoryPage /></HospitalDashboardLayout>} />
            <Route path='/hospital/order-history' element={<HospitalDashboardLayout><OrderHistoryPage /></HospitalDashboardLayout>} />
            <Route path='/hospital/analytics' element={<HospitalDashboardLayout><HospitalAnalyticsPage /></HospitalDashboardLayout>} />
            <Route path='/hospital/notifications' element={<HospitalDashboardLayout><NotificationsPage /></HospitalDashboardLayout>} />
            <Route path='/hospital/settings' element={<HospitalDashboardLayout><HospitalSettingsPage /></HospitalDashboardLayout>} />

            {/* Supplier Dashboard Routes */}
            <Route path="/supplier/dashboard" element={<SupplierDashboardLayout><SupplierDashboard /></SupplierDashboardLayout>} />
            <Route path="/supplier/products" element={<SupplierDashboardLayout><SupplierProducts /></SupplierDashboardLayout>} />
            <Route path="/supplier/orders" element={<SupplierDashboardLayout><SupplierOrders /></SupplierDashboardLayout>} />
            <Route path="/supplier/deliveries" element={<SupplierDashboardLayout><SupplierDeliveries /></SupplierDashboardLayout>} />
            <Route path='/supplier/performance' element={<SupplierDashboardLayout><SupplierPerformance /></SupplierDashboardLayout>} />
            <Route path='/supplier/hospitals' element={<SupplierDashboardLayout><SupplierHospitals /></SupplierDashboardLayout>} />
            <Route path='/supplier/history' element={<SupplierDashboardLayout><SupplierHistory /></SupplierDashboardLayout>} />
            <Route path="/supplier/reports" element={<SupplierDashboardLayout><SupplierReports /></SupplierDashboardLayout>} />
            <Route path='/supplier/notifications' element={<SupplierDashboardLayout><SupplierNotifications /></SupplierDashboardLayout>} />
            <Route path='/supplier/settings' element={<SupplierDashboardLayout><SupplierSettings /></SupplierDashboardLayout>} />
          </Routes>
        </Router>
      </OrganizationContext.Provider>
    </QueryClientProvider>
  );
}

export default App;