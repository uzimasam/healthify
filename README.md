# Healthify - Medical Supply Distribution System

A comprehensive platform for managing medical supply distribution between hospitals, suppliers, and agencies. Built with React, TypeScript, and Tailwind CSS.

## Features

### Hospital Portal

- **Dashboard**: Real-time overview of inventory, orders, and alerts
- **Inventory Management**: Track and manage medical supplies
- **Order Management**: Place and track orders
- **Analytics**: Detailed insights into supply usage and costs
- **Notifications**: Real-time alerts for stock levels and deliveries

### Supplier Portal

- **Product Management**: Manage medical supply catalog
- **Order Fulfillment**: Process and track orders
- **Delivery Management**: Track and manage deliveries
- **Performance Analytics**: Monitor KPIs and metrics

### Agency Dashboard

- **Supply Chain Overview**: Monitor distribution network
- **Hospital Management**: Track connected hospitals
- **Supplier Management**: Manage supplier relationships
- **Analytics**: Network-wide performance metrics

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/uzimasam/healthify.git
```

2. Install dependencies:

```bash
cd healthify/frontend
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── hospital/      # Hospital-specific components
│   ├── supplier/      # Supplier-specific components
│   ├── layout/        # Layout components
│   └── ui/            # Base UI components
├── pages/             # Page components
│   ├── hospital/      # Hospital portal pages
│   └── supplier/      # Supplier portal pages
├── lib/              # Utility functions
└── types/            # TypeScript type definitions
```

## Key Features

### For Hospitals

- Real-time inventory tracking
- Automated reordering system
- Order tracking and management
- Analytics and reporting
- Supplier performance monitoring

### For Suppliers

- Order management
- Delivery tracking
- Performance analytics
- Hospital relationship management
- Inventory management

### For Agencies

- Network-wide monitoring
- Supply chain optimization
- Performance analytics
- Hospital and supplier management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Recharts](https://recharts.org/) for the charting library
- [Lucide](https://lucide.dev/) for the icons
