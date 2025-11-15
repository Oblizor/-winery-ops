# GitHub Pages Setup Guide

## Current Status: 404 Error

If you're seeing a 404 error, follow these steps to get GitHub Pages working.

## Step-by-Step Setup

### 1. Enable GitHub Pages in Repository Settings

1. Go to your repository: https://github.com/Oblizor/-winery-ops
2. Click **"Settings"** (top menu)
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select **"GitHub Actions"** (NOT "Deploy from a branch")
5. Click **"Save"**

### 2. Add Backend URL Secret (Optional but Recommended)

1. In repository Settings → **"Secrets and variables"** → **"Actions"**
2. Click **"New repository secret"**
3. Name: `VITE_API_URL`
4. Value: Your backend URL (e.g., `https://your-backend.railway.app`)
5. Click **"Add secret"**

### 3. Trigger the Deployment Workflow

The workflow will run automatically on the next push, OR you can trigger it manually:

1. Go to **"Actions"** tab in your repository
2. Click **"Deploy Frontend to GitHub Pages"** workflow
3. Click **"Run workflow"** button (top right)
4. Select branch: `main`
5. Click **"Run workflow"**

### 4. Wait for Deployment

1. Go to **"Actions"** tab
2. Click on the running workflow
3. Wait for both jobs to complete:
   - ✅ Build Frontend (green checkmark)
   - ✅ Deploy to GitHub Pages (green checkmark)

### 5. Access Your Site

Once deployed, your site will be available at:
```
https://oblizor.github.io/-winery-ops/
```

**Note:** It may take 1-2 minutes after deployment completes for the site to be accessible.

## Troubleshooting

### Still seeing 404?

1. **Check Actions tab**: Make sure the workflow ran successfully
   - Go to Actions → Check if "Deploy Frontend to GitHub Pages" has a green checkmark
   - If it failed, click on it to see error details

2. **Verify GitHub Pages is enabled**:
   - Settings → Pages
   - Source should be "GitHub Actions"
   - If it says "None" or "Deploy from a branch", change it to "GitHub Actions"

3. **Check repository name**:
   - Your repo is `-winery-ops` (starts with dash)
   - GitHub Pages URL will be: `oblizor.github.io/-winery-ops/`
   - The vite.config.ts is already configured for this path

4. **Wait a few minutes**:
   - GitHub Pages can take 1-5 minutes to propagate after deployment

5. **Clear browser cache**:
   - Try incognito/private browsing mode
   - Or hard refresh (Ctrl+F5 or Cmd+Shift+R)

### Workflow Not Running?

If the workflow doesn't appear in Actions:
1. Make sure you've pushed the workflow file to GitHub
2. Check that the file is at: `.github/workflows/deploy-frontend-gh-pages.yml`
3. Try making a small change and pushing again

### Build Failures?

Check the Actions tab for error messages:
- **Dependencies issue**: Make sure `package-lock.json` is committed
- **Build error**: Check if all dependencies are in `package.json`
- **Path error**: Verify `frontend/winery-app` directory structure

## Quick Test

To test if everything is set up correctly:

```bash
# Make a small change to trigger deployment
echo " " >> frontend/winery-app/src/App.tsx
git add .
git commit -m "Trigger GitHub Pages deployment"
git push origin main
```

Then check the Actions tab - the workflow should run automatically!

## Next Steps After Deployment

1. ✅ Frontend is live on GitHub Pages
2. ⚠️ Backend still needs to be deployed (Railway/Render/etc.)
3. 🔗 Update `VITE_API_URL` secret when backend is ready

## Support

- Check workflow logs: Repository → Actions → Click on workflow run
- GitHub Pages docs: https://docs.github.com/en/pages
- GitHub Actions docs: https://docs.github.com/en/actions

