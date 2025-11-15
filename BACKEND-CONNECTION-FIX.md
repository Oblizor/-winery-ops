# Fix Backend Connection Error

## Current Status
✅ Frontend is deployed and working on GitHub Pages  
❌ Backend is not connected (showing "Unable to reach backend: Failed to fetch")

## Solution: Deploy Backend and Configure Frontend

### Step 1: Deploy Backend to Railway

1. **Go to Railway**: https://railway.app
2. **Create New Project** → "Deploy from GitHub repo"
3. **Select repository**: `Oblizor/-winery-ops`
4. **Configure Service**:
   - Go to Settings → **Root Directory**: Set to `backend`
   - Railway will use the Dockerfile automatically
5. **Add CSV Data** (if needed):
   - Add CSV files to `backend/WineryOperations/` directory
   - Or configure external storage
6. **Get Backend URL**:
   - After deployment, Railway will provide a URL like: `https://your-app.railway.app`
   - Copy this URL

### Step 2: Add Backend URL to GitHub Secrets

1. **Go to GitHub Repository**: https://github.com/Oblizor/-winery-ops
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret**:
   - Name: `VITE_API_URL`
   - Value: Your Railway backend URL (e.g., `https://your-app.railway.app`)
   - Click **Add secret**

### Step 3: Redeploy Frontend

The frontend needs to be rebuilt with the new backend URL:

**Option A: Automatic (Recommended)**
- Make a small change and push:
  ```bash
  echo " " >> frontend/winery-app/src/App.tsx
  git add .
  git commit -m "Update backend URL"
  git push origin main
  ```

**Option B: Manual Trigger**
1. Go to **Actions** tab
2. Click **"Deploy Frontend to GitHub Pages"**
3. Click **"Run workflow"** → **"Run workflow"**

### Step 4: Verify Connection

1. Wait for deployment to complete (check Actions tab)
2. Visit: https://oblizor.github.io/-winery-ops/
3. The error should be gone and data should load!

## Quick Test

Test your backend directly:
```bash
# Replace with your Railway URL
curl https://your-backend.railway.app/api/health
```

Should return: `{"status":"ok","dataDir":"..."}`

## Troubleshooting

### Backend deployed but still getting errors?

1. **Check CORS**: Backend code already has `app.use(cors())` which allows all origins ✅
2. **Check Backend URL**: Make sure the secret `VITE_API_URL` is correct
3. **Check Backend is running**: Visit `https://your-backend.railway.app/api/health` directly
4. **Redeploy frontend**: After changing the secret, you must redeploy

### Backend URL format

- ✅ Correct: `https://your-app.railway.app` (no trailing slash)
- ❌ Wrong: `https://your-app.railway.app/` (trailing slash)
- ❌ Wrong: `http://localhost:5000` (won't work from GitHub Pages)

### Still having issues?

1. Check browser console (F12) for detailed error messages
2. Check Railway logs for backend errors
3. Check GitHub Actions logs for build errors

## Current Configuration

- **Frontend URL**: https://oblizor.github.io/-winery-ops/
- **Backend URL**: (Not set yet - needs to be deployed)
- **API Endpoint**: `/api/*` (relative to backend URL)

## Next Steps

1. ✅ Deploy backend to Railway
2. ✅ Add `VITE_API_URL` secret in GitHub
3. ✅ Redeploy frontend
4. ✅ Test the connection

Once backend is deployed and the secret is set, everything will work!

