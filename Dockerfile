FROM node:21.3.0-alpine

WORKDIR /docker/bot
COPY package*.json ./
RUN npm install
COPY . .