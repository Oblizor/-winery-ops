FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy source files
COPY . .

# Fix permissions and build TypeScript
RUN chmod +x node_modules/.bin/* 2>/dev/null || true && \
    npm run build

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]

