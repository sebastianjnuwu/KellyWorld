import {
  Client, GatewayIntentBits, Partials, Collection } from 'discord.js';
import { Guild, User, Emojis , LocaleManager } from './Util/Index.js';
import config from '../config.js';
import { promisify } from 'util';
import colors from 'colors';
import pkg from 'mongoose';
const { connect } = pkg;
import 'dotenv/config';
import g from 'glob';
const glob = promisify(g);

export default class KellyWorld extends Client {
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
    partials: [Partials.Channel, Partials.Message],
    shardCount: 1 });
    this.e = Emojis;
    this.config = config;
    this.owners = this.config.owners.user;
    this.channel = this.config.channel.economy;
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
    this.loadDatabase();
    this.localeManager = new LocaleManager(this);
    this.localeManager.loadLocales();
    await super.login(this.config.client.token);
  }

  async loadDatabase() {
    connect(this.config.connections.mongodb).then(() => { console.log(colors.brightGreen('[Info] - ') + 'Connected to mongodb database.');
    }).catch((e) => { console.log(colors.brightRed('[Info] - ') + 'nine an error connecting to database: ' + e);});
  }

  async loadEvents() {
    const events = await glob(`${global.process.cwd()}/src/Events/**/*.js`);
    events.forEach(async (eventFile) => {
      const file = await import(eventFile);
      const { name, exec } = file.default;
      super.on(name, exec.bind(null, this));
    });
  }
  
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