import { Client, GatewayIntentBits } from 'discord.js';
import Guild from './Models/Guild.js';
import Ticket from './Models/Ticket.js';
import Locale from './Locale.js';
import { promisify } from 'util';
import mongoose from 'mongoose';
import node from './Nodes.js';
import { Vulkava } from 'vulkava';
import g from 'glob';
const glob = promisify(g);
import colors from 'colors';
import '#http';

export default class KellyWorld extends Client {
	constructor() {
		super({
			intents: [
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
				GatewayIntentBits.MessageContent,
			],
		});
		this.db = {
			guild: Guild,
			ticket: Ticket,
		};
		this.vulkava = new Vulkava({
			nodes: node,
			sendWS: (guild, payload) => {
				this.guilds.cache.get(guild)?.shard.send(payload);
			},
		});
	}

	async start() {
		this.loadEvents();
		this.LoadDatabase();
		this.Locale = new Locale(this);
		this.Locale.loadLocales();
		await super.login(process.env.token);
	}

	async loadEvents() {
		const events = await glob(`${global.process.cwd()}/src/events/**/*.js`);

		events.forEach(async event => {
			const file = await import(event);
			const { name, type, exec } = file.default;
			switch (type) {
				case 'once':
					this.once(name, exec.bind(null, this));
					break;
				case 'on':
					this.on(name, exec.bind(null, this));
					break;
				case 'vulkava':
					this.vulkava.on(name, exec.bind(null, this));
					break;
			}
		});
	}

	async LoadDatabase() {
		mongoose.set('strictQuery', false);
		mongoose
			.connect(process.env.mongodb)
			.then(() => {
				console.log(colors.brightGreen('• ') + `My memory is up to date...`);
			})
			.catch(Erro => {
				console.log(colors.brightRed('• ') + `Error when connecting: ${Erro.message}`);
			});
	}
}
