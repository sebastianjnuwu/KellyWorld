import { exec } from 'child_process';
import { ApplicationCommandOptionType } from 'discord.js';
import { Command } from '../structures/Command';

const ANSI_REGEX = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

export default new Command({
  name: 'shell',
  description: '☝️ › Available to developers only',
  description_localizations: {
   'pt-BR': '☝️ › Disponível apenas para desenvolvedores'
  },
  owner: true,
  dm_permission: false,
  options: [
    {
      name: 'command',
      description: 'the command to be used',
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ],
  exec({ context }) {
 
    const _args = context.args.join(' ');
    if (!_args) return;

    exec(_args, (err, res) => {
      if (err) {
        return context.reply({
          content: `\`\`\`${err}\`\`\``,
          ephemeral: true
        });
      }
      return context.reply({
        content: `\`\`\`\n${res.replace(ANSI_REGEX, '').slice(0, 1900)}\`\`\``,
        ephemeral: true
      });
    });
    
  }
});
