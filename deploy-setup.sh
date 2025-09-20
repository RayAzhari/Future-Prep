#!/bin/bash

echo "🚀 Future Prep Deployment Setup"
echo "================================"

# Check if git is configured
if ! git config user.name > /dev/null 2>&1; then
    echo "⚠️  Git is not configured. Please set up your git identity:"
    echo "git config --global user.name 'Your Name'"
    echo "git config --global user.email 'your.email@example.com'"
    echo ""
fi

echo "📋 Deployment Steps:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   - Go to https://github.com/new"
echo "   - Repository name: future-prep"
echo "   - Make it public"
echo "   - Don't initialize with README (we already have one)"
echo ""

echo "2. Add the GitHub remote and push:"
echo "   git remote add origin https://github.com/YOURUSERNAME/future-prep.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""

echo "3. Deploy to Vercel:"
echo "   - Go to https://vercel.com/new"
echo "   - Import your GitHub repository"
echo "   - Vercel will auto-detect Next.js settings"
echo "   - Click 'Deploy'"
echo ""

echo "✅ Your Future Prep app will be live in minutes!"
echo ""
echo "🔗 After deployment, update the README.md with your actual GitHub URL"
echo "   Replace 'yourusername' with your actual GitHub username"
