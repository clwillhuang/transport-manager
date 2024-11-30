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

WORKDIR /usr/transport-manager/server

# Install dependencies
RUN npm install

RUN echo $(npm run)

# Build Typescript
RUN npm run build

RUN npm run db:generate

# Expose the port the app runs on
ARG VITE
ARG SERVER_PORT
ENV SERVER_PORT=$SERVER_PORT

ARG DB_HOST
ENV DB_HOST=$DB_HOST
ARG DB_PORT
ENV DB_PORT=$DB_PORT
ARG DB_USER
ENV DB_USER=$DB_USER
ARG DB_PASSWORD
ENV DB_PASSWORD=$DB_PASSWORD
ARG DB_NAME 
ENV DB_NAME=$DB_NAME

RUN echo "Running on " $SERVER_PORT
RUN echo "WITH DATABASE HOST" $DB_HOST
RUN echo "DB PORT" $DB_PORT
RUN echo "DB USER" $DB_USER
RUN echo "DB_PASSWORD" $DB_PASSWORD
RUN echo "DB_NAME" $DB_NAME

EXPOSE $SERVER_PORT

# Start the application
CMD [ "npm", "run", "deploy"]
