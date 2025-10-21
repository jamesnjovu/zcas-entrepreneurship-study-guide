#!/bin/bash

# Manual deployment script for GitHub Pages
# Run this locally after building the project

echo "🏗️  Building project..."
npm run build

echo "📁 Preparing deployment..."
cd dist

# Initialize git in the dist folder
git init
git add .
git commit -m "Deploy to GitHub Pages"

# Force push to gh-pages branch
echo "🚀 Deploying to gh-pages branch..."
git remote add origin https://github.com/jamesnjovu/zcas-entrepreneurship-study-guide.git
git branch -M gh-pages
git push -f origin gh-pages

echo "✅ Deployment complete!"
echo "🌐 Your site will be available at: https://jamesnjovu.github.io/zcas-entrepreneurship-study-guide/"
echo ""
echo "Note: It may take a few minutes for changes to appear."
echo "Go to Settings → Pages and set Source to 'Deploy from a branch' and select 'gh-pages' branch."