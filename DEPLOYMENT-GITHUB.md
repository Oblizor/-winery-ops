# Deploying on GitHub

This guide covers deploying your application using GitHub's built-in features.

## What GitHub Can Host

✅ **Frontend**: Can be hosted on GitHub Pages (free, static hosting)  
❌ **Backend**: GitHub doesn't host Node.js backends directly

## Option 1: Frontend on GitHub Pages (Free!)

GitHub Pages can host your React frontend for free. The backend still needs to be hosted elsewhere (Railway, Render, etc.).

### Setup Steps

1. **Enable GitHub Pages**
   - Go to your repository: https://github.com/Oblizor/-winery-ops
   - Click "Settings" → "Pages" (in left sidebar)
   - Under "Source", select "GitHub Actions"
   - Save

2. **Set Backend URL Secret**
   - Go to "Settings" → "Secrets and variables" → "Actions"
   - Click "New repository secret"
   - Name: `VITE_API_URL`
   - Value: Your backend URL (e.g., `https://your-backend.railway.app`)
   - Click "Add secret"

3. **Deploy**
   - The workflow `.github/workflows/deploy-frontend-gh-pages.yml` will automatically run
   - On push to `main`, it will build and deploy to GitHub Pages
   - Your site will be available at: `https://oblizor.github.io/-winery-ops/`

### Accessing Your Site

After deployment, your frontend will be live at:
```
https://oblizor.github.io/-winery-ops/
```

## Option 2: Full CI/CD with GitHub Actions

GitHub Actions can:
- ✅ Build and test your code automatically
- ✅ Deploy frontend to GitHub Pages
- ✅ Deploy backend to Railway/Render (via their APIs)
- ✅ Run tests on every push

### Existing Workflows

1. **`.github/workflows/deploy.yml`** - Builds both frontend and backend
2. **`.github/workflows/deploy-frontend-gh-pages.yml`** - Deploys frontend to GitHub Pages
3. **`.github/workflows/backend-deploy.yml`** - Builds and tests backend

### Viewing Workflow Runs

- Go to your repository → "Actions" tab
- See all workflow runs and their status
- Click on any run to see detailed logs

## Option 3: Backend Deployment via GitHub Actions

You can automate backend deployment to Railway using GitHub Actions:

1. **Get Railway Token**
   - Go to Railway → Account Settings → Tokens
   - Create a new token
   - Copy the token

2. **Add Railway Token to GitHub**
   - Go to GitHub repo → Settings → Secrets → Actions
   - Add secret: `RAILWAY_TOKEN` = your Railway token

3. **Deploy**
   - The workflow will automatically deploy on push to `main`

## Recommended Setup

**Best combination:**
- **Frontend**: GitHub Pages (free, automatic deployments)
- **Backend**: Railway (free tier available, easy setup)

### Quick Start

1. **Backend** (Railway):
   - Deploy backend to Railway (see `DEPLOYMENT.md`)
   - Get your backend URL

2. **Frontend** (GitHub Pages):
   - Add `VITE_API_URL` secret in GitHub (your Railway backend URL)
   - Enable GitHub Pages (Settings → Pages → GitHub Actions)
   - Push to `main` - frontend deploys automatically!

## Troubleshooting

### Frontend not loading on GitHub Pages
- Check GitHub Actions workflow status
- Ensure `VITE_API_URL` secret is set correctly
- Verify the build succeeds in Actions tab

### CORS errors
- Make sure backend CORS is configured to allow your GitHub Pages domain
- Backend code already has `app.use(cors())` which allows all origins

### Build failures
- Check Actions tab for error logs
- Ensure all dependencies are in `package.json`
- Verify Node.js version (should be 20+)

## Benefits of GitHub-Based Deployment

✅ **Free hosting** for frontend  
✅ **Automatic deployments** on every push  
✅ **CI/CD built-in** - no external services needed for builds  
✅ **Version control** - every deployment is tied to a commit  
✅ **Easy rollback** - revert to previous version easily  

## Next Steps

1. Enable GitHub Pages in repository settings
2. Add `VITE_API_URL` secret with your backend URL
3. Deploy backend to Railway (or another service)
4. Push to `main` - everything deploys automatically!

