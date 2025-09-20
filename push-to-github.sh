#!/bin/bash

echo "🚀 Pushing Future Prep to GitHub..."
echo "Repository: https://github.com/RayAzhari/future-prep"
echo ""

# Check if remote is already configured
if git remote get-url origin > /dev/null 2>&1; then
    echo "✅ GitHub remote already configured"
    echo "Remote URL: $(git remote get-url origin)"
else
    echo "📝 Adding GitHub remote..."
    git remote add origin https://github.com/RayAzhari/future-prep.git
fi

echo ""
echo "🔄 Setting main branch..."
git branch -M main

echo ""
echo "📤 Pushing to GitHub..."
echo "Note: You'll be prompted for your GitHub credentials"
echo "Username: RayAzhari"
echo "Password: Use your GitHub Personal Access Token"
echo ""

git push -u origin main

echo ""
echo "✅ If successful, your code is now on GitHub!"
echo "🔗 Repository: https://github.com/RayAzhari/future-prep"
echo ""
echo "Next step: Deploy to Vercel at https://vercel.com/new"
