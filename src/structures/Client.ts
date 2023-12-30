import {
	ActivityType,
	ApplicationCommandDataResolvable,
	Client,
	ClientEvents,
	Collection,
	GatewayIntentBits,
	Options,
} from "discord.js";
import Locale from './Locale';
import { promises as fs } from "fs";
import path from "path";
// @ts-ignore
import { CommandType } from "./Command";
import { Event } from "./Event";
import { createLogger, Logger } from "./Logger";

export class KellyWorld extends Client {
	public commands: Collection<string, CommandType>;
	public aliases: Collection<string, string>;
	public logger: Logger;

	constructor() {
		super({
			makeCache: Options.cacheWithLimits({
				ApplicationCommandManager: 0,
				BaseGuildEmojiManager: 0,
				GuildMemberManager: Infinity,
				GuildStickerManager: 0,
				GuildScheduledEventManager: 0,
				MessageManager: 0,
				StageInstanceManager: 0,
				ThreadManager: 0,
				ThreadMemberManager: 0,
				UserManager: 0,
			}),
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildMembers,
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
		this.aliases = new Collection();
	}

	async init() {
		this.logger = createLogger(
			{
				handleExceptions: true,
				handleRejections: true,
			},
			this,
		);
		this.register();
		this.Locale = new Locale(this);
		this.Locale.loadLocales();
		await this.login(process.env.token);
	}

	register() {
		this.loadCommands();
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
      if (command.aliases) {
        command.aliases.forEach(alias => {
          this.aliases.set(alias, command.name);
        });
      }
      slashCommands.push(command);
	 }
	 };

    this.logger.info(`Loaded ${commandFiles.length} commands successfully!`, { tags: ['Commands'] });

    this.on('ready', () => {
      this.application.commands.set(slashCommands);
    });
  }
  
  async loadEvents() {
    
   const eventFiles = await fs.readdir(path.join(__dirname, "../events"));
	  
	  for (const file of eventFiles) {
 
    if (file.endsWith(".ts") || file.endsWith(".js")) {
     const _file = path.join(__dirname, "../events", file);
     const event: Event<keyof ClientEvent> = await this.importFile(_file);
   
     this.on(event.name, event.exec);
      
    };
  };
   
   this.logger.info(`Loaded ${eventFiles.length} events successfully!`, {
			tags: ["Events"],
		});
		
	};

	async importFile(file: string) {
		return (await import(file))?.default;
	};
	
};