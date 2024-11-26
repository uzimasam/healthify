# Healthify - Medical Supply Distribution System

A comprehensive platform for managing medical supply distribution between hospitals, suppliers, and agencies. Built with React and Go.

## Repository Structure

- `/frontend` - React TypeScript frontend application
- `/backend` - Go REST API backend application

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React

### Backend
- **Language**: Go
- **Database**: PostgreSQL
- **Architecture**: RESTful API
- **Features**:
  - JWT Authentication
  - Role-based access control
  - Real-time inventory tracking
  - Order management system
  - Analytics and reporting

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

## Getting Started

### Prerequisites
- Node.js 18+
- Go 1.21+
- PostgreSQL 14+

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Go dependencies:
```bash
go mod download
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Run database migrations:
```bash
go run cmd/migrate/main.go
```

5. Start the server:
```bash
go run main.go
```

The API will be available at `http://localhost:8020`

## Project Structure

### Frontend
```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── hospital/  # Hospital-specific components
│   │   ├── supplier/  # Supplier-specific components
│   │   ├── layout/    # Layout components
│   │   └── ui/        # Base UI components
│   ├── pages/         # Page components
│   ├── lib/           # Utility functions
│   └── types/         # TypeScript type definitions
```

### Backend
```
backend/
├── db/migrations/     # Database migrations
├── models/            # Database models
├── routes/            # API routes
├── storage/           # File storage
├── utils/             # Utility functions
```

## API Documentation

The API documentation is available at `/api/docs` when running the backend server. It includes:
- Authentication endpoints
- Hospital management
- Supplier management
- Order processing
- Inventory tracking
- Analytics and reporting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Repository

[https://github.com/uzimasam/healthify](https://github.com/uzimasam/healthify)

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Recharts](https://recharts.org/) for the charting library
- [Lucide](https://lucide.dev/) for the icons
- [Go](https://golang.org/) for the backend runtime
- [PostgreSQL](https://www.postgresql.org/) for the database