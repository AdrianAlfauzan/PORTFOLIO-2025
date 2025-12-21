#!/bin/bash

# Script untuk deploy di VPS
set -e

echo "🔧 Pulling latest changes from GitHub..."
git pull origin main

echo "📦 Building Docker image..."
docker build -t portfolio-2025 .

echo "🛑 Stopping existing container..."
docker stop portfolio-2025 || true
docker rm portfolio-2025 || true

echo "🚀 Starting new container..."
docker run -d \
  --name portfolio-2025 \
  --restart unless-stopped \
  -p 8888:8888 \
  --env-file .env.production \
  portfolio-2025

echo "🧹 Cleaning up unused images..."
docker image prune -f

echo "✅ Deploy completed!"