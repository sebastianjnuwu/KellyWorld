import { ApplicationCommandOptionType } from 'discord.js';
import { inspect } from 'util';
import { Command } from '../structures/Command';

export default new Command({
  name: 'eval',
  description: '☝️ › Available to developers only',
  description_localizations: {
   'pt-BR': '☝️ › Disponível apenas para desenvolvedores'
  },
  owner: true,
  dm_permission: false,
  options: [
    {
      name: 'code',
      description: 'the code to be evaluated',
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ],
  async exec({ context }) {
    try {
      const expr = context.args.join(' ');
      const res = await eval(expr);
      const cleanResult = typeof res !== 'string' ? inspect(res, { depth: 0 }).replaceAll(context.client.token, '*') : res.replaceAll(context.client.token, '*');
      return context.reply({
        content: `\`\`\`js\n${cleanResult.slice(0, 1900)}\`\`\``,
        ephemeral: true
      });
    } catch (err) {
      if (err instanceof Error) {
        return context.reply({
          content: `\`\`\`js\n${err.stack}\`\`\``,
          ephemeral: true
        });
      }
    }
  },
});