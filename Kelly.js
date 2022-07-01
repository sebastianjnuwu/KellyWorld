// importing the main packages...
import { load } from 'js-yaml';
import colors from 'colors';
import { readFileSync } from 'node:fs';
import { AutoPoster } from 'topgg-autoposter';
import KellyWorld from './src/Client.js';
//global.config = load(readFileSync('./config.yml', 'utf8'));

const client = new KellyWorld();
client.start();
// AutoPoster(global.config.connections.topgg, client);
AutoPoster(process.env.topgg, client);

const trainerror = (error) => {
  if (error.toString().includes('Missing Permissions') || error.toString().includes('Missing acess')) return;
  console.error(colors.brightRed("[Info] - ") + error.stack); 
};

global.process.on('unhandledRejection', trainerror);
global.process.on('uncaughtException', trainerror);

export default client;