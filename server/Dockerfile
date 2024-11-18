# Use the official Node.js image
FROM node:14

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./
COPY index.d.ts .
COPY index.ts .
COPY tsconfig.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./src .

# Build Typescript
RUN npm run build

# Run database generation and migration scripts
RUN npm run db:generate && npm run db:migrate

# Expose the port the app runs on
ARG SERVER_PORT
ENV SERVER_PORT=$SERVER_PORT
EXPOSE $SERVER_PORT

# Start the application
CMD [ "npm", "run", "start" ]
