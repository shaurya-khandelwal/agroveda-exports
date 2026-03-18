#!/bin/bash

# Startup script for Agroveda Exports website

echo "🚀 Starting Agroveda Exports Website Setup..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
MONGODB_URI="mongodb://127.0.0.1:27017/agroveda"
MONGODB_DB="agroveda"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$(openssl rand -base64 32)
WHATSAPP_NUMBER=+919876543210
EOF
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

echo "🌱 Seeding database with initial data..."
npm run seed

echo ""
echo "🎉 Setup complete! Starting development server..."
echo ""
echo "📍 Website will be available at: http://localhost:3000"
echo "🔐 Admin login: admin@agrovedaexports.com / admin123"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm run dev
