FROM node:19.6.1-alpine

WORKDIR /docker/bot
COPY package*.json ./
RUN npm install
COPY . .