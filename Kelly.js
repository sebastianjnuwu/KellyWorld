// ฅ⁠^⁠•⁠ﻌ⁠•⁠^⁠ฅ Milk is importan...
import KellyWorld from './src/Client.js';
import { readFileSync } from 'node:fs';
const Client = new KellyWorld();
import { load } from 'js-yaml';
global.config = load(readFileSync('./config.yml', 'utf8'));

Client.start();


global.process.on('unhandledRejection', (() => {}));
global.process.on('uncaughtException', (() => {})); 

export default Client;
