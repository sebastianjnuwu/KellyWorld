// importing the main packages...
import colors from 'colors';
import express from 'express';
import { load } from 'js-yaml';
import { readFileSync } from 'node:fs';
import KellyWorld from './src/Client.js';
//global.config = load(readFileSync('./config.yml', 'utf8'));

const client = new KellyWorld();
const app = express();
client.start();

const trainerror = (error) => {
  if (error.toString().includes('Missing Permissions') || error.toString().includes('Missing acess')) return;
  console.error(colors.brightRed("[Info] - ") + error.stack); 
};

global.process.on('unhandledRejection', trainerror);
global.process.on('uncaughtException', trainerror);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(process.env.PORT || 8080, (req, res) =>
  console.log(colors.cyan("[Info]")+` servidor ligado na porta: 8080`)
);

export default client;