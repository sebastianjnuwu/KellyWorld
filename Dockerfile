FROM node:21.5.0-alpine

WORKDIR /KellyWorld
COPY package*.json ./
RUN npm install
COPY . .