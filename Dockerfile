# Use the official Node.js image as the base image
# Alpine is a lightweight version of Linux
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
# This takes advantage of Docker's layer caching for faster builds
COPY package*.json ./

# Install dependencies
# 'npm ci' is faster and more reliable for production builds than 'npm install'
RUN npm ci 
# --only=production

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
# We use the "production" script from package.json
CMD ["npm", "run", "production"]
