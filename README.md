# Winery Operations Management System

A full-stack application for managing winery operations including tanks, batches, inventory, and packaging.

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Data Storage**: CSV files

## 📁 Project Structure

```
.
├── backend/           # Express API server
│   ├── src/
│   │   └── server.ts # Main server file
│   └── package.json
├── frontend/
│   └── winery-app/   # React frontend application
│       ├── src/
│       └── package.json
└── DEPLOYMENT.md     # Deployment guide
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Oblizor/-winery-ops.git
   cd -winery-ops
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Backend runs on `http://localhost:5000`

3. **Frontend Setup**
   ```bash
   cd frontend/winery-app
   npm install
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

4. **Data Setup**
   - Create `backend/WineryOperations/` directory
   - Add CSV files:
     - `tanks.csv`
     - `batches.csv`
     - `batch_components.csv`
     - `inventory_items.csv`
     - `inventory_movements.csv`
     - `packaging_recipes.csv`

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**
- **Frontend**: Deploy to [Vercel](https://vercel.com) (recommended)
- **Backend**: Deploy to [Railway](https://railway.app) (recommended)

## 🔌 API Endpoints

- `GET /api/health` - Health check
- `GET /api/tanks` - Get all tanks
- `GET /api/batches` - Get all batches with components
- `GET /api/inventory` - Get inventory items
- `GET /api/inventory/movements` - Get inventory movements
- `GET /api/packaging` - Get packaging recipes

## 🛠️ Development

### Backend Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📝 Environment Variables

### Backend
- `PORT` - Server port (default: 5000)
- `WINERY_DATA_DIR` - Path to CSV data directory
- `NODE_ENV` - Environment (development/production)

### Frontend
- `VITE_API_URL` - Backend API URL (default: http://localhost:5000)

## 📄 License

ISC

## 🔗 Links

- **Repository**: https://github.com/Oblizor/-winery-ops
- **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)

