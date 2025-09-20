#!/bin/bash

echo "🚀 Installing Future Prep dependencies..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🎉 Future Prep is ready to run!"
    echo ""
    echo "To start the development server, run:"
    echo "npm run dev"
    echo ""
    echo "Then open http://localhost:3000 in your browser."
else
    echo "❌ Installation failed. Please check the errors above."
    exit 1
fi
