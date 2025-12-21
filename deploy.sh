#!/bin/bash
set -e  # Stop jika ada error

# Config
APP_NAME="portfolio-2025"
PORT=8888
ENV_FILE=".env.production"
GIT_BRANCH="main"
BACKUP_DIR="/root/backups"

echo "🚀 DEPLOYMENT SCRIPT v2.0"
echo "========================"

# Backup current version
echo "💾 Backing up current version..."
docker commit $APP_NAME $APP_NAME:backup-$(date +%Y%m%d-%H%M%S) 2>/dev/null || true

# Pull and build
echo "📥 Updating from GitHub..."
cd /root/PORTFOLIO-2025
git fetch origin
git checkout $GIT_BRANCH
git pull origin $GIT_BRANCH

echo "🏗️  Building new image..."
docker build -t $APP_NAME:latest -t $APP_NAME:$(git rev-parse --short HEAD) .

# Stop and cleanup
echo "🔄 Rotating containers..."
docker stop $APP_NAME 2>/dev/null || true
docker rm $APP_NAME 2>/dev/null || true

# Start new container
echo "🚀 Launching new version..."
docker run -d \
  --name $APP_NAME \
  --restart unless-stopped \
  -p $PORT:8888 \
  --env-file $ENV_FILE \
  $APP_NAME:latest

# Health check
echo "🏥 Running health check..."
sleep 5
for i in {1..10}; do
  if curl -s -f http://localhost:$PORT > /dev/null; then
    echo "✅ Health check passed!"
    
    # Cleanup old backups (keep last 3)
    echo "🧹 Cleaning old backups..."
    docker images $APP_NAME:backup-* --format "{{.Tag}}" | sort -r | tail -n +4 | \
      xargs -I {} docker rmi $APP_NAME:{} 2>/dev/null || true
    
    # Success message
    echo ""
    echo "🎉 DEPLOYMENT COMPLETE!"
    echo "📊 Version: $(git rev-parse --short HEAD)"
    echo "🌐 URL: https://portfolio.domaicuan.my.id"
    echo "🐳 Container: $APP_NAME"
    exit 0
  fi
  echo "⏳ Waiting for app to start... ($i/10)"
  sleep 2
done

# If health check fails
echo "❌ Health check failed!"
echo "🔄 Rolling back to previous version..."
docker stop $APP_NAME 2>/dev/null || true
docker rm $APP_NAME 2>/dev/null || true
docker run -d \
  --name $APP_NAME \
  --restart unless-stopped \
  -p $PORT:8888 \
  --env-file $ENV_FILE \
  $APP_NAME:previous

echo "⚠️  Rolled back to previous version. Check logs:"
docker logs $APP_NAME --tail 30
exit 1
