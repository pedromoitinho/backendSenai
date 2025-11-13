# Use Node.js LTS version
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema and config
COPY prisma ./prisma/
COPY prisma.config.ts ./
COPY .env ./

# Generate Prisma Client
RUN npx prisma generate

# Copy source code
COPY src ./src
COPY tsconfig*.json ./

# Run migrations
RUN npx prisma migrate deploy || true

# Expose port
EXPOSE 3000

# Start the application with tsx
CMD ["npx", "tsx", "src/index.ts"]