#!/bin/bash

echo "🐙 GitHub Repository Setup for Future Prep"
echo "=========================================="
echo ""

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not in a git repository. Please run this from the project directory."
    exit 1
fi

# Check if remote already exists
if git remote get-url origin > /dev/null 2>&1; then
    echo "✅ GitHub remote already configured:"
    git remote get-url origin
    echo ""
    echo "To push your code:"
    echo "git push -u origin main"
    exit 0
fi

echo "📝 Follow these steps to create your GitHub repository:"
echo ""
echo "1. Go to https://github.com/new"
echo "2. Repository name: future-prep"
echo "3. Description: Future Prep - Comprehensive SAT/ACT/AP resources, scholarships, and research opportunities for high school students"
echo "4. Make it Public"
echo "5. DON'T check 'Initialize with README' (we already have files)"
echo "6. Click 'Create repository'"
echo ""
echo "7. After creating the repository, GitHub will show you commands."
echo "   Use these commands to connect your local repository:"
echo ""
echo "   git remote add origin https://github.com/YOURUSERNAME/future-prep.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "Replace YOURUSERNAME with your actual GitHub username!"
echo ""
echo "🎉 After pushing, your code will be on GitHub and ready for Vercel deployment!"
