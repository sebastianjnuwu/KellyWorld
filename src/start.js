import KellyWorld from './structure/Client.js';
import { readFileSync } from 'node:fs';
import { load } from 'js-yaml';
const Client = new KellyWorld();
import 'dotenv';

global.config = load(readFileSync('./config.yml', 'utf8'));

Client.start();

export default Client;