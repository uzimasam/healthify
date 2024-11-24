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
          </Routes>
        </Router>
      </OrganizationContext.Provider>
    </QueryClientProvider>
  );
}

export default App;