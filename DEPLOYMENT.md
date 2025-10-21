# GitHub Pages Deployment Guide

This guide explains how to deploy the ZCAS Innovation & Entrepreneurship Study Guide to GitHub Pages.

## Prerequisites
- GitHub account
- Repository created on GitHub
- Local project ready for deployment

## Setup Steps

### 1. Repository Configuration
1. Create a new repository on GitHub named `enter-study-guide`
2. **Do NOT initialize with README** (we already have one)
3. Set repository visibility to Public (required for GitHub Pages on free accounts)

### 2. GitHub Pages Settings
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. This will enable the workflow we've created

### 3. Local Deployment Preparation
The project is already configured with:
- ✅ `next.config.js` - Static export configuration
- ✅ `.github/workflows/deploy.yml` - GitHub Actions workflow
- ✅ `.nojekyll` - Bypass Jekyll processing
- ✅ Updated `package.json` - Build scripts

### 4. Push to GitHub (when ready)
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: ZCAS Study Guide with accessibility features"

# Add remote origin (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/enter-study-guide.git

# Push to main branch
git push -u origin main
```

### 5. Monitor Deployment
1. After pushing, go to the **Actions** tab in your GitHub repository
2. You'll see the deployment workflow running
3. Once completed, your site will be available at:
   `https://USERNAME.github.io/enter-study-guide/`

## Project Configuration Details

### Next.js Static Export
```javascript
// next.config.js
const nextConfig = {
  output: 'export',           // Static export
  trailingSlash: true,        // GitHub Pages compatibility
  distDir: 'dist',           // Output directory
  images: { unoptimized: true }, // Static images
  assetPrefix: '/enter-study-guide', // GitHub Pages path
  basePath: '/enter-study-guide',    // Base URL path
};
```

### Build Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "export": "next build && next export",
    "deploy": "npm run build && touch dist/.nojekyll"
  }
}
```

### GitHub Actions Workflow
- Automatically triggers on push to main/master
- Uses Node.js 18
- Builds static site
- Deploys to GitHub Pages

## Local Testing

### Test Static Build
```bash
# Build static version
npm run build

# Serve locally (optional - requires serve package)
npx serve dist
```

### Test Development Version
```bash
# Run development server
npm run dev
```

## Features Included
- ✅ Responsive design for all devices
- ✅ Text-to-speech accessibility features
- ✅ Interactive quiz system
- ✅ Progressive navigation
- ✅ Error boundaries and loading states
- ✅ Modern React architecture
- ✅ Tailwind CSS styling
- ✅ Cross-browser compatibility

## Troubleshooting

### Common Issues
1. **404 Error**: Ensure repository name matches the basePath in next.config.js
2. **Assets not loading**: Check assetPrefix configuration
3. **Workflow fails**: Verify GitHub Pages is enabled in repository settings
4. **White screen**: Check browser console for JavaScript errors

### Debug Steps
1. Check GitHub Actions logs for build errors
2. Verify all dependencies are in package.json
3. Test build locally: `npm run build`
4. Check GitHub Pages settings in repository

## Security Notes
- No sensitive data in client-side code
- All API keys/secrets should use GitHub Secrets
- Static site - no server-side vulnerabilities
- HTTPS enabled by default on GitHub Pages

## Performance Optimization
- Static generation for fast loading
- Code splitting enabled
- Optimized images (unoptimized for static export)
- Minimal bundle size with modern React patterns

## Future Updates
To update the deployed site:
1. Make changes locally
2. Test with `npm run dev`
3. Push changes to main branch
4. GitHub Actions will automatically redeploy

The site will be available at: `https://yourusername.github.io/enter-study-guide/`