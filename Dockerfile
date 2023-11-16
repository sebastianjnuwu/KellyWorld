FROM node:21.2.0-alpine

WORKDIR /docker/bot
COPY package*.json ./
RUN npm install
COPY . .