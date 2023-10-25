FROM node:21.0.0-alpine

WORKDIR /docker/bot
COPY package*.json ./
RUN npm install
COPY . .