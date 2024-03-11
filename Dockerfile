FROM node:21.7.1-alpine

WORKDIR /KellyWorld
COPY package*.json ./
RUN npm install
COPY . .