# Single stage build (lebih cepat)  
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY package-lock.json ./
RUN npm ci --verbose
COPY .env.production ./
COPY . .
RUN npm run build
EXPOSE 8888
CMD ["npx", "next", "start", "-p", "8888", "-H", "0.0.0.0"]