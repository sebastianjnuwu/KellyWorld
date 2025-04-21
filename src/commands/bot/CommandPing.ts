import { Command } from "../../structures/Command";

export default new Command({
  name: "ping",
  description: "🐾 › Replies with the bot latency",
  description_localizations: {
    "pt-BR": "🐾 › Resposta da latência do bot",
  },
  dm_permission: false,
  async exec({ context, client }) {
    await context.reply({
      content: `:ping_pong: **Pong!**\n:stopwatch: **Gateway Ping:** __${client.ws.ping}ms__`,
    });
  },
});
