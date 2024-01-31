FROM node:21.6.1-alpine

WORKDIR /KellyWorld
COPY package*.json ./
RUN npm install
COPY . .