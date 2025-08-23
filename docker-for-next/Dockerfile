# syntax=docker/dockerfile:1
FROM node:20-alpine AS base

WORKDIR /src

# Copy package files from src directory
COPY src/package.json src/package-lock.json ./

RUN npm install

# Copy source files from src directory
COPY src .


EXPOSE 3000

# Use development mode for live reloading
CMD ["npm", "run", "dev"]