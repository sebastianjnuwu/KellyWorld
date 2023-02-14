import { Client, GatewayIntentBits } from 'discord.js';
import Guild from './Models/Guild.js';
import Locale from './Locale.js';
import { promisify } from 'util';
import mongoose from 'mongoose';
import g from 'glob';
const glob = promisify(g);
import colors from 'colors';

export default class KellyWorld extends
  Client {
  constructor() {
    super({ intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildBans,
      GatewayIntentBits.GuildEmojisAndStickers, 
      GatewayIntentBits.GuildIntegrations,
      GatewayIntentBits.GuildWebhooks,
      GatewayIntentBits.GuildInvites, 
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMessages, 
      GatewayIntentBits.GuildMessageReactions, 
      GatewayIntentBits.GuildMessageTyping,
      GatewayIntentBits.DirectMessages, 
      GatewayIntentBits.DirectMessageReactions, 
      GatewayIntentBits.DirectMessageTyping, 
      GatewayIntentBits.MessageContent ], 
  });
 
   this.owners = ['932678185970192404','591437825790967836','463384487569522689'];
   this.db = {
     guild: Guild
   }
  }
   
  async start() {
   this.loadEvents();
   this.LoadDatabase();
   this.Locale = new Locale(this);
   this.Locale.loadLocales();
   await super.login(global.config.token);
  }
  
 async loadEvents() {
  
  const events = await glob(`${global.process.cwd()}/src/events/**/*.js`);
    
  events.forEach(async (event) => {
    const file = await import(event);
    const { name, type, exec } = file.default;
  if (type)
    this.once(name, exec.bind(null, this));
  else
    this.on(name, exec.bind(null, this));
    });
  }
  
  async LoadDatabase() {
   mongoose.set('strictQuery', false);
   mongoose.connect(global.config.mongodb).then(() => {
      console.log(colors.brightGreen('• ') + `My memory is up to date...`);
    }).catch(Erro => {
      console.log(colors.brightRed('• ') + `Error when connecting: ${Erro.message}`);
    });
  }
}