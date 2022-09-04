// importing the main packages...
import express from 'express';
import colors from 'colors';
import KellyWorld from './src/Client.js';
const client = new KellyWorld();
const app = express();
client.start();

const trainerror = (error) => {
  console.error(colors.brightRed("[Info] - ") + error.stack); 
};

global.process.on('unhandledRejection', trainerror);
global.process.on('uncaughtException', trainerror);

export default client;