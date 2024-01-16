FROM node:21.6.0-alpine

WORKDIR /KellyWorld
COPY package*.json ./
RUN npm install
COPY . .