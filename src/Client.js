import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js';
import LocaleManager from './Structure/LocaleManager.js';
import Guild from './Structure/Models/Guild.js';
import User from './Structure/Models/User.js';
import { promisify } from 'util';
import g from 'glob';
const glob = promisify(g);
import pkg from 'mongoose';
const { connect } = pkg;

// We define the bot's main class.
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
    partials: [Partials.Channel, Partials.Message], shardCount: 1 });
    this.owners = ['932678185970192404','591437825790967836','463384487569522689'];
    this.commands = new Collection();
    this.aliases = new Collection();
    this.db = { 
      user: User, 
      guild: Guild
    };
  }
   
  async start() {
    this.loadEvents();
    this.loadCommands();
    this.localeManager = new LocaleManager(this);
    this.localeManager.loadLocales();
    connect(global.config.database);
    await super.login(global.config.token);
  }
 
  // loading events...
  async loadEvents() {
    const events = await glob(`${global.process.cwd()}/src/Events/**/*.js`);
    events.forEach(async (eventFile) => {
      const file = await import(eventFile);
      const { name, exec } = file.default;
      super.on(name, exec.bind(null, this));
    });
  }
  
  // loading commands...
  async loadCommands() {
    await glob(`${global.process.cwd()}/src/Commands/**/*js`, async (err, filePaths) => {
      if (err) return console.log(err);
      filePaths.forEach(async (file) => {
        const pull = await import(file);
        const { name, aliases } = pull.default;
        if (name) this.commands.set(name, pull.default);
        if (aliases && Array.isArray(aliases)) {
          aliases.forEach((alias) => this.aliases.set(alias, name));
        }
      });
    });
  }
}