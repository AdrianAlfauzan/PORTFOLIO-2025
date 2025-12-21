# 🚀 Portfolio 2025 - Modern Developer Portfolio

**A modern, full-featured portfolio website built with Next.js 14, TypeScript, and Docker for production deployment.**

🌐 **Live Demo:** [https://portfolio.domaicuan.my.id](https://portfolio.domaicuan.my.id)

## ✨ Features

- ⚡ **Next.js 14** with App Router & Server Components
- 🎨 **Tailwind CSS** for styling with custom design system
- 🔒 **TypeScript** for type-safe development
- 🐳 **Dockerized** for consistent production deployment
- 📱 **Fully Responsive** design
- 🔄 **Real-time Guestbook** with Supabase backend
- 🛡️ **Admin Dashboard** for content management
- 📊 **Analytics & Monitoring** integration
- 🔐 **Environment-based Configuration**

## 🏗️ Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (Animations)
- React Toastify (Notifications)

**Backend:**
- Supabase (Database & Auth)
- Server Actions
- RESTful APIs

**DevOps:**
- Docker & Docker Compose
- Nginx Reverse Proxy
- Let's Encrypt SSL
- GitHub Actions (CI/CD)

**Hosting:**
- VPS (Ubuntu 22.04)
- Custom Domain
- Automated SSL Certificates

## 📁 Project Structure

```
PORTFOLIO-2025/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── sections/         # Page sections
│   └── admin/            # Admin components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   └── supabase.ts       # Supabase client
├── types/                # TypeScript definitions
├── public/               # Static assets
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Multi-container setup
├── deploy.sh            # Automated deployment script
├── next.config.ts       # Next.js configuration
└── tailwind.config.js   # Tailwind configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Docker
- Git
- Supabase account (for guestbook)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/AdrianAlfauzan/PORTFOLIO-2025.git
   cd PORTFOLIO-2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

### Using Docker for Development

```bash
# Build and run with Docker
docker build -t portfolio-dev .
docker run -p 3000:3000 --env-file .env.local portfolio-dev
```

## 🐳 Production Deployment

### Automated Deployment (Recommended)

1. **Clone to your VPS**
   ```bash
   git clone https://github.com/AdrianAlfauzan/PORTFOLIO-2025.git
   cd PORTFOLIO-2025
   ```

2. **Set up production environment**
   ```bash
   cp .env.example .env.production
   nano .env.production  # Add your production credentials
   ```

3. **Run deployment script**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

### Manual Deployment

1. **Build Docker image**
   ```bash
   docker build -t portfolio-2025 .
   ```

2. **Run container**
   ```bash
   docker run -d \
     --name portfolio-2025 \
     --restart unless-stopped \
     -p 8888:8888 \
     --env-file .env.production \
     portfolio-2025
   ```

3. **Set up Nginx reverse proxy** (see `nginx/` directory)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Admin dashboard password | Yes |
| `NEXT_PUBLIC_SITE_URL` | Production site URL | No |

### Docker Configuration

- **Port:** `8888` (configurable in Dockerfile)
- **Base Image:** `node:18-alpine`
- **Build Output:** Standalone mode for optimized production builds

## 📦 Docker Commands Cheatsheet

```bash
# Build image
docker build -t portfolio-2025 .

# Run container
docker run -d -p 8888:8888 --env-file .env.production portfolio-2025

# View logs
docker logs -f portfolio-2025

# Stop container
docker stop portfolio-2025

# Restart container
docker restart portfolio-2025

# Remove container
docker rm portfolio-2025

# Remove image
docker rmi portfolio-2025
```

## 🔄 CI/CD Pipeline

This project includes GitHub Actions workflow for automatic deployment:

```yaml
# .github/workflows/deploy.yml
name: Deploy to VPS
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /root/PORTFOLIO-2025
            ./deploy.sh
```

## 🛠️ Development Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
npm run lint        # Run ESLint

# Docker
npm run docker:dev   # Start dev with Docker
npm run docker:prod  # Start prod with Docker
npm run docker:build # Build Docker image

# Deployment
npm run deploy       # Deploy to production (uses deploy.sh)
```

## 📝 Admin Features

- **Guestbook Management**: Approve, edit, or delete comments
- **Content Moderation**: Mark comments as featured or needs revision
- **Auto-delete System**: Automatic cleanup of old comments
- **Real-time Updates**: Instant UI updates without page refresh

## 🔒 Security

- Environment variables for sensitive data
- Admin authentication with secure cookies
- Input validation and sanitization
- Rate limiting on API endpoints
- SSL/TLS encryption in production
- Docker container isolation

## 🚨 Troubleshooting

### Common Issues

1. **Docker build fails**
   ```bash
   # Clear Docker cache
   docker system prune -a
   # Rebuild with no cache
   docker build --no-cache -t portfolio-2025 .
   ```

2. **Port already in use**
   ```bash
   # Check which process uses port 8888
   lsof -i :8888
   # Kill the process or change port in Dockerfile
   ```

3. **Environment variables missing**
   ```bash
   # Verify .env.production exists
   ls -la .env*
   # Check if variables are loaded
   docker exec portfolio-2025 printenv | grep SUPABASE
   ```

### Logs Location

```bash
# Application logs
docker logs portfolio-2025

# Nginx access logs
tail -f /var/log/nginx/access.log

# Nginx error logs  
tail -f /var/log/nginx/error.log

# Docker daemon logs
journalctl -u docker --follow
```

## 📈 Performance Optimization

- ✅ Image optimization with Next.js Image component
- ✅ Code splitting and lazy loading
- ✅ Static generation for SEO pages
- ✅ Database query optimization
- ✅ CDN for static assets
- ✅ Gzip compression enabled

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Adrian Musa Alfauzan**
- GitHub: [@AdrianAlfauzan](https://github.com/AdrianAlfauzan)
- Website: [portfolio.domaicuan.my.id](https://portfolio.domaicuan.my.id)

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com)
- [Vercel](https://vercel.com) for amazing deployment platform

## 🚀 Deployment Status

![Docker](https://img.shields.io/badge/Docker-Running-success)
![SSL](https://img.shields.io/badge/SSL-Enabled-brightgreen)
![Uptime](https://img.shields.io/badge/Uptime-100%25-success)
![Version](https://img.shields.io/badge/Version-2025.12-blue)

---

**Happy Coding!** 🚀

*Built with ❤️ using Next.js, Docker, and lots of coffee.*
