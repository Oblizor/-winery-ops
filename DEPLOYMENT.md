# Deployment Guide

This guide covers deploying both the frontend and backend of the Winery Operations application.

## Architecture

- **Frontend**: React + Vite app (deploy to Vercel/Netlify)
- **Backend**: Express.js API server (deploy to Railway/Render)

## Prerequisites

1. GitHub repository: https://github.com/Oblizor/-winery-ops.git
2. Accounts on deployment platforms:
   - Frontend: [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
   - Backend: [Railway](https://railway.app) or [Render](https://render.com)

## Frontend Deployment (Vercel - Recommended)

### Option 1: Vercel (Easiest)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import `Oblizor/-winery-ops`
   - Set **Root Directory** to `frontend/winery-app`

2. **Configure Build Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm install`

3. **Environment Variables**
   - Add `VITE_API_URL` = your backend URL (e.g., `https://your-backend.railway.app`)

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically deploy on every push to `main`

### Option 2: Netlify

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your repository

2. **Configure Build Settings**
   - Base directory: `frontend/winery-app`
   - Build command: `npm run build`
   - Publish directory: `frontend/winery-app/dist`

3. **Environment Variables**
   - Add `VITE_API_URL` = your backend URL

4. **Deploy**
   - Click "Deploy site"

## Backend Deployment

### Option 1: Railway (Recommended)

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select `Oblizor/-winery-ops`
   - Select "Backend" service

2. **Configure Service**
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

3. **Environment Variables**
   - `PORT`: Railway sets this automatically
   - `NODE_ENV`: `production`
   - `WINERY_DATA_DIR`: Path to your CSV files directory
     - If CSV files are in the repo: `/app/WineryOperations`
     - If using external storage: configure accordingly

4. **Add CSV Data**
   - Option A: Add CSV files to repository in `backend/WineryOperations/`
   - Option B: Use Railway volumes or external storage
   - Required files:
     - `tanks.csv`
     - `batches.csv`
     - `batch_components.csv`
     - `inventory_items.csv`
     - `inventory_movements.csv`
     - `packaging_recipes.csv`

5. **Deploy**
   - Railway will auto-deploy on push to `main`
   - Copy the generated URL (e.g., `https://your-app.railway.app`)

### Option 2: Render

1. **Create Web Service**
   - Go to [render.com](https://render.com)
   - Sign in with GitHub
   - Click "New" → "Web Service"
   - Connect your repository

2. **Configure Service**
   - Name: `winery-ops-backend`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

3. **Environment Variables**
   - `PORT`: Render sets this automatically (use `10000` if needed)
   - `NODE_ENV`: `production`
   - `WINERY_DATA_DIR`: `/opt/render/project/src/WineryOperations`

4. **Add CSV Data**
   - Upload CSV files to `backend/WineryOperations/` in your repo
   - Or use Render disk storage

5. **Deploy**
   - Click "Create Web Service"
   - Copy the generated URL

## Post-Deployment Setup

### 1. Update Frontend API URL

After backend is deployed, update the frontend environment variable:

1. Go to your frontend deployment dashboard (Vercel/Netlify)
2. Add/Update `VITE_API_URL` to your backend URL
3. Redeploy frontend

### 2. CORS Configuration

The backend already has CORS enabled. If you encounter CORS issues:

- Ensure your frontend URL is allowed (backend code has `app.use(cors())` which allows all origins)
- For production, consider restricting to your frontend domain

### 3. Health Check

Test your deployments:

- **Backend**: `https://your-backend-url/api/health`
- **Frontend**: Visit your frontend URL

## CSV Data Files

The backend requires CSV files in the `WineryOperations` directory:

```
backend/
  WineryOperations/
    tanks.csv
    batches.csv
    batch_components.csv
    inventory_items.csv
    inventory_movements.csv
    packaging_recipes.csv
```

**Important**: Add these files to your repository or configure external storage for your deployment platform.

## Continuous Deployment

Both Vercel and Railway automatically deploy on every push to the `main` branch. No manual deployment needed!

## Troubleshooting

### Frontend can't connect to backend
- Check `VITE_API_URL` environment variable
- Verify backend is running and accessible
- Check CORS settings

### Backend can't find CSV files
- Verify `WINERY_DATA_DIR` environment variable
- Ensure CSV files are in the correct location
- Check file permissions

### Build failures
- Check Node.js version (should be 18+)
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

## Quick Deploy Commands

### Local Testing

**Frontend:**
```bash
cd frontend/winery-app
npm install
npm run dev
```

**Backend:**
```bash
cd backend
npm install
npm run build
npm start
```

## Support

For issues, check:
- Deployment platform logs
- GitHub Actions workflow (`.github/workflows/deploy.yml`)
- Backend health endpoint: `/api/health`

