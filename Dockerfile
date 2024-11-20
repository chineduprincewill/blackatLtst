# Build stage
FROM node:20.10.0-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci && \
    npm cache clean --force

# Copy project files
COPY . .

# Build application skipping type checking
RUN npm run vite build

# Production stage
FROM nginx:1.25-alpine

# Copy nginx config - fixed path to match your project structure
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Make port 8080 available for Cloud Run
ENV PORT=8080
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]