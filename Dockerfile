FROM node:19.6.0-alpine

WORKDIR /docker/bot
COPY package*.json ./
RUN npm install
COPY . .