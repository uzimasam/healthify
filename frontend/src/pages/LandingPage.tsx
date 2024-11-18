import { ArrowRight, Building2, Hospital, Truck, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <header className="border-b">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">Healthify</span>
          </div>
          <div className="space-x-4">
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Contact</Button>
            <Link to="/login" className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs group">
              Get Started
            </Link>
          </div>
        </nav>
        <div className="flex justify-center items-center min-h-screen">
          <div className="container ">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-6xl font-bold tracking-tight mb-8">
                Healthify.
              </h1>
              <h3 className="text-4xl text-gray-700 my-4">
                Medical Supply Distribution,
                <br />
                Simplified.
              </h3>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                Connecting healthcare providers with essential medical supplies through a streamlined distribution network.
              </p>
              <Link to="/login"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 group">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Stakeholders Section */}
      <section className="py-32 border-b">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="group">
              <Hospital className="h-8 w-8 mb-6" />
              <h3 className="text-xl font-semibold mb-4">For Hospitals</h3>
              <p className="text-gray-600 mb-6">
                Streamline your medical supply procurement with real-time inventory tracking.
              </p>
              <Link
                to="/register/hospital"
                className="inline-flex items-center text-sm font-medium group-hover:underline"
              >
                Join as Hospital
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="group">
              <Truck className="h-8 w-8 mb-6" />
              <h3 className="text-xl font-semibold mb-4">For Suppliers</h3>
              <p className="text-gray-600 mb-6">
                Expand your reach and efficiently manage distribution to healthcare facilities.
              </p>
              <Link
                to="/register/supplier"
                className="inline-flex items-center text-sm font-medium group-hover:underline"
              >
                Join as Supplier
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="group">
              <Building2 className="h-8 w-8 mb-6" />
              <h3 className="text-xl font-semibold mb-4">For Agencies</h3>
              <p className="text-gray-600 mb-6">
                Optimize your distribution network and supply chain operations.
              </p>
              <Link
                to="/register/agency"
                className="inline-flex items-center text-sm font-medium group-hover:underline"
              >
                Learn More
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-gray-600">Healthcare Facilities</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-gray-600">Monthly Orders</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-gray-600">Delivery Success</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Package className="h-5 w-5" />
                <span className="font-bold">Healthify</span>
              </div>
              <p className="text-sm text-gray-600">
                Revolutionizing medical supply distribution
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><button className="hover:text-black transition-colors">For Hospitals</button></li>
                <li><button className="hover:text-black transition-colors">For Suppliers</button></li>
                <li><button className="hover:text-black transition-colors">For Agencies</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><button className="hover:text-black transition-colors">About Us</button></li>
                <li><button className="hover:text-black transition-colors">Contact</button></li>
                <li><button className="hover:text-black transition-colors">Careers</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><button className="hover:text-black transition-colors">Privacy</button></li>
                <li><button className="hover:text-black transition-colors">Terms</button></li>
                <li><button className="hover:text-black transition-colors">Cookies</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-16 pt-8 text-sm text-center text-gray-600">
            <p>&copy; 2024 Healthify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}