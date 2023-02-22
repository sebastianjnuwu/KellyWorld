FROM node:19.7.0-alpine

WORKDIR /docker/bot
COPY package*.json ./
RUN npm install
COPY . .