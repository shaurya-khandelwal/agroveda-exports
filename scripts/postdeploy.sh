#!/bin/bash

# Post-deployment script for Vercel
# This script runs database migrations and seeds the database

echo "🚀 Running post-deployment setup..."

# Check if MONGODB_URI (or DATABASE_URL fallback) is set
if [ -z "$MONGODB_URI" ] && [ -z "$DATABASE_URL" ]; then
  echo "❌ Error: MONGODB_URI (or DATABASE_URL) environment variable is not set"
  exit 1
fi

echo "🌱 Seeding database..."
npm run seed

echo "✅ Post-deployment setup complete!"
