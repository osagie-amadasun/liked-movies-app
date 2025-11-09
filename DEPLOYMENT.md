# GitHub Pages Deployment Guide

This guide explains how to deploy this React app to GitHub Pages.

## Problem Solved

GitHub Pages doesn't natively support client-side routing for Single Page Applications (SPAs). This project has been configured to work correctly with GitHub Pages by:

1. **Base Path Configuration**: Vite is configured to use your repository name as the base path
2. **Router Basename**: React Router is configured to match the base path
3. **404.html Redirect**: A 404.html file handles client-side routing by redirecting to index.html

## Deployment Steps

### 1. Update Base Path

Before building, you need to set the `VITE_BASE_PATH` environment variable to match your repository name.

**Important**: Replace `your-repo-name` with your actual GitHub repository name.

#### Option A: Build with environment variable (Recommended)

```bash
# Windows (PowerShell)
$env:VITE_BASE_PATH="/your-repo-name/"; npm run build

# Windows (CMD)
set VITE_BASE_PATH=/your-repo-name/ && npm run build

# Linux/Mac
VITE_BASE_PATH=/your-repo-name/ npm run build
```

#### Option B: Update vite.config.js directly

Edit `vite.config.js` and replace the base path:

```js
base: '/your-repo-name/', // Replace with your repo name
```

### 2. Build the Project

```bash
npm run build
```

This creates a `dist` folder with your production build.

### 3. Deploy to GitHub Pages

#### Option A: Deploy from dist folder (Manual)

1. Build the project with the correct base path
2. Copy the contents of the `dist` folder to the root of your `gh-pages` branch
3. Push to GitHub

#### Option B: Use GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/git-project/package-lock.json
      
      - name: Install dependencies
        run: |
          cd frontend/git-project
          npm ci
      
      - name: Build
        run: |
          cd frontend/git-project
          npm run build
        env:
          VITE_BASE_PATH: /${{ github.event.repository.name }}/
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/git-project/dist
```

#### Option C: Use gh-pages package

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json scripts:
```json
"scripts": {
  "deploy": "gh-pages -d dist"
}
```

3. Deploy:
```bash
VITE_BASE_PATH=/your-repo-name/ npm run build
npm run deploy
```

### 4. Configure GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Branch**: `gh-pages` (if using gh-pages package or Actions)
   - **Folder**: `/ (root)` or `/dist` (depending on your setup)
4. Click **Save**

### 5. Verify Deployment

Your app should be available at:
```
https://your-username.github.io/your-repo-name/
```

## Troubleshooting

### Assets not loading (404 errors)

- Make sure you've set the `VITE_BASE_PATH` correctly
- Rebuild the project after changing the base path
- Clear your browser cache

### Routes not working (404 on navigation)

- Verify that `404.html` exists in your `dist` folder
- Check that `BrowserRouter` has the `basename` prop set correctly
- Ensure the base path in `vite.config.js` matches your repository name

### Blank page

- Open browser developer tools and check the Console for errors
- Verify all asset paths are correct
- Check that the base path is set correctly

## Local Development

For local development, the base path defaults to `/`, so you can run:

```bash
npm run dev
```

The app will work normally at `http://localhost:5173` (or your Vite dev server port).

## Notes

- The `404.html` file handles client-side routing by redirecting all routes to `index.html`
- The `RedirectHandler` component in `App.jsx` processes the redirect and navigates to the correct route
- Make sure to rebuild and redeploy whenever you change the repository name or base path

