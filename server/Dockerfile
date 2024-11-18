# Use the official Node.js image
FROM node:18-alpine

# Create and change to the app directory
WORKDIR /usr/transport-manager

# Copy the package.json and package-lock.json files
# COPY package*.json ./
# COPY index.d.ts .
# COPY index.ts .
# COPY tsconfig.json .
COPY ./server ./server
COPY ./shared ./shared

WORKDIR /usr/transport-manager/shared

RUN npm install

RUN npm run declare:shared

RUN npm run db:generate && npm run db:migrate

COPY ./server .
WORKDIR /usr/transport-manager/server

# Install dependencies
RUN npm install

RUN echo $(npm run)

# Build Typescript
RUN npm run build

# Expose the port the app runs on
ARG VITE
ARG SERVER_PORT
ENV SERVER_PORT=$SERVER_PORT
EXPOSE $SERVER_PORT

# Start the application
CMD [ "npm", "run", "deploy"]
