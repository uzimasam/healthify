import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ProductCard } from "@/components/inventory/ProductCard";
import { DashboardStats, Product } from "@/types";

// Mock data
const mockStats: DashboardStats = {
  totalOrders: 156,
  pendingOrders: 23,
  lowStockItems: 8,
  revenue: 52890,
};

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Surgical Masks",
    category: "PPE",
    stock: 5,
    price: 12.99,
    unit: "box",
    manufacturer: "MedTech Inc",
    expiryDate: "2024-12-31",
    image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "2",
    name: "Nitrile Gloves",
    category: "PPE",
    stock: 150,
    price: 24.99,
    unit: "box",
    manufacturer: "SafeCare",
    expiryDate: "2024-10-15",
    image: "https://images.unsplash.com/photo-1584636778264-b96d5bb83beb?auto=format&fit=crop&q=80&w=500",
  },
];

function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <StatsCard stats={mockStats} />
    </div>
  );
}

function Inventory() {
  const handleEdit = (product: Product) => {
    console.log("Edit product:", product);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Inventory</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard/*"
          element={
            <div className="h-full relative">
              <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <Sidebar />
              </div>
              <main className="md:pl-72">
                <Header />
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="inventory" element={<Inventory />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;