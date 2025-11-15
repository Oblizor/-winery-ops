# Connect Frontend to Backend - Final Step!

## ✅ Current Status
- ✅ Backend deployed successfully on Railway
- ✅ Frontend deployed successfully on GitHub Pages
- ❌ Frontend can't find backend (needs backend URL)

## Quick Fix (3 Steps)

### Step 1: Get Your Backend URL from Railway

1. Go to your Railway dashboard
2. Click on your `-winery-ops` service
3. Go to the **"Settings"** tab
4. Scroll down to **"Networking"** section
5. Look for **"Public Domain"** or **"Generate Domain"**
6. Click to generate/expose your service
7. Copy the URL (e.g., `https://your-app.railway.app`)

**OR** if you see a domain already:
- Check the **"Deployments"** tab
- The URL might be shown there
- Or check the service overview for a public URL

### Step 2: Add Backend URL to GitHub Secrets

1. Go to: https://github.com/Oblizor/-winery-ops/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `VITE_API_URL`
4. Value: Your Railway backend URL (e.g., `https://your-app.railway.app`)
   - ⚠️ Important: No trailing slash!
   - ✅ Correct: `https://your-app.railway.app`
   - ❌ Wrong: `https://your-app.railway.app/`
5. Click **"Add secret"**

### Step 3: Redeploy Frontend

After adding the secret, trigger a new frontend deployment:

**Option A: Automatic (Recommended)**
```bash
# Make a tiny change to trigger rebuild
echo " " >> frontend/winery-app/src/App.tsx
git add .
git commit -m "Update backend connection"
git push origin main
```

**Option B: Manual Trigger**
1. Go to: https://github.com/Oblizor/-winery-ops/actions
2. Click **"Deploy Frontend to GitHub Pages"**
3. Click **"Run workflow"** → **"Run workflow"**

### Step 4: Verify Connection

1. Wait for deployment to complete (check Actions tab)
2. Visit: https://oblizor.github.io/-winery-ops/
3. The error should be gone! 🎉
4. Data should load from your backend

## Troubleshooting

### Can't find Railway URL?

1. **Check if service is exposed:**
   - Railway → Settings → Networking
   - Make sure "Generate Domain" is enabled
   - Or manually create a public domain

2. **Check deployment logs:**
   - Railway → Deployments → Click on successful deployment
   - Look for URL in the logs

3. **Service might be unexposed:**
   - Railway shows "Unexposed service" in your screenshot
   - You need to expose it to get a public URL
   - Go to Settings → Networking → Generate Domain

### Still getting errors after adding secret?

1. **Verify secret name:** Must be exactly `VITE_API_URL` (case-sensitive)
2. **Check secret value:** No trailing slash, full URL with `https://`
3. **Redeploy frontend:** Secrets only apply to new builds
4. **Check browser console:** F12 → Console tab for detailed errors

### Backend URL format

- ✅ `https://your-app.railway.app`
- ✅ `https://your-app.up.railway.app`
- ❌ `http://localhost:5000` (won't work)
- ❌ `https://your-app.railway.app/` (trailing slash)

## Quick Test

Test your backend directly:
```bash
# Replace with your Railway URL
curl https://your-app.railway.app/api/health
```

Should return: `{"status":"ok","dataDir":"..."}`

## What Happens Next

Once you:
1. ✅ Expose Railway service (get public URL)
2. ✅ Add `VITE_API_URL` secret in GitHub
3. ✅ Redeploy frontend

Your app will be fully functional! 🚀

## Current URLs

- **Frontend**: https://oblizor.github.io/-winery-ops/
- **Backend**: (Get from Railway - see Step 1)

