import {
	ActivityType,
	ApplicationCommandDataResolvable,
	Client,
	ClientEvents,
	Collection,
	GatewayIntentBits,
	Options,
} from "discord.js";
import { 
  PrismaClient 
} from '@prisma/client';
import { promises as fs } from "fs";
import path from "path";
// @ts-ignore
import { CommandType } from "./Command";
import i18next from 'i18next';
import i18nbackend from 'i18next-fs-backend';
import { readdirSync } from 'node:fs';
import { Event } from "./Event";
import { Nodes } from '../Nodes';
import { Manager } from './Music';
import { 
  createLogger, Logger
} from "./Logger";

export class KellyWorld extends Client { 
  
	public commands: Collection<string, CommandType>;
	public owner: string[];
	public logger: Logger;
	public manager: Manager;
	public db: PrismaClient;

	constructor() {
		super({
		  makeCache: Options.cacheWithLimits({
        ApplicationCommandManager: 0,
        BaseGuildEmojiManager: 0,
        GuildMemberManager: Infinity,
        GuildStickerManager: 0,
        GuildScheduledEventManager: 0,
        MessageManager: Infinity,
        StageInstanceManager: 0,
        ThreadManager: 0,
        ThreadMemberManager: 0,
        UserManager: 0
      }),
			intents: [
		  	GatewayIntentBits.Guilds,
		  	GatewayIntentBits.GuildMessages,
		  	GatewayIntentBits.MessageContent,
		  	GatewayIntentBits.GuildMembers,
		  	GatewayIntentBits.GuildVoiceStates
			],
			presence: {
				status: "idle",
				activities: [
					{
						name: "/ping - KellyWorld",
						type: ActivityType.Listening,
					},
				],
			},
			allowedMentions: {
				parse: ["users"],
				repliedUser: false,
			},
		});
		this.commands = new Collection();
		this.db = new PrismaClient();
		this.manager = new Manager(this, Nodes);
		this.owner = ["932678185970192404"];
	}

	async init() {
	  this.logger = createLogger({
	    handleExceptions: true,
			handleRejections: true,
		}, this);
		this.register();
		await this.login(process.env.DISCORD_TOKEN);
	};

	async register() {
	  this.loadLanguage();
		this.loadCommands();
    this.loadDatabase();
  	this.loadEvents();
	};

  async loadCommands() {
  
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    
    const commandFiles = await fs.readdir(path.join(__dirname, "../commands"));
	  
	 for (const file of commandFiles) {
	
	  if (file.endsWith(".ts") || file.endsWith(".js")) {
   
    const _file = path.join(__dirname, "../commands", file);
      
    const command: CommandType = await this.importFile(_file);
      
    if (!command.name) return;
    this.commands.set(command.name, command);
    await slashCommands.push(command);
      
	  }
  };

    this.logger.info(`Loaded ${commandFiles.length} commands successfully!`, { tags: ['Commands'] });

    this.on('ready', () => {
      this.application.commands.set(slashCommands);
    });
  };
  
  async loadDatabase() {
   try {
    this.db.$connect();
   } catch (err) {
     
   };
  };
  
  async loadEvents() {
    
   const eventFiles = await fs.readdir(path.join(__dirname, "../events"));
	  
   for (const file of eventFiles) {
 
    if (file.endsWith(".ts") || file.endsWith(".js")) {
    
     const _file = path.join(__dirname, "../events", file);
   
     const event = await this.importFile(_file);
   
     this.on(event.name, event.exec);
      
    };
  };
   
   this.logger.info(`Loaded ${eventFiles.length} events successfully!`, {
			tags: ["Events"],
		});
		
	};
	
	async loadLanguage() {
	  await i18next.use(i18nbackend).init({
			backend: {
				loadPath: 'src/locales/{{lng}}/{{ns}}.json',
			},
			defaultNS: 'language',
			fallbackLng: 'en-US',
			interpolation: {
				escapeValue: false,
				useRawValueToEscape: true,
			},
			load: 'all',
			ns: ['language'],
			preload: readdirSync('src/locales'),
		//	debug: true,
			returnEmptyString: false,
			returnObjects: true,
		});
	};

	async importFile(file: string) {
		return (await import(file))?.default;
	};
	
};