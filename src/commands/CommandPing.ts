import { Time } from "../functions/time";
import { Command } from "../structures/Command";

export default new Command({
	name: "ping",
	description: "🐾 › Replies with the bot latency",
	description_localizations: {
   'pt-BR': '🐾 › Resposta da latência do bot'
  },
	dm_permission: false,
	exec({ context, client }) {
		context.reply({
			content: `**🏓 Pong!\n🛰️ Api - __${
				client.ws.ping
			}__ms\n⏱️ Uptime - __${Time(client.uptime)}__**`,
		});
	},
});