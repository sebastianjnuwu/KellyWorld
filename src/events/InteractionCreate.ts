import CommandContext from "../structures/CommandContext";
import { Event } from "../structures/Event";
import {
	ApplicationCommandOptionType,
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	GuildMember,
	Interaction,
} from "discord.js";
import client from "../main";
import { request } from 'undici';
import i18next, { TFunction } from 'i18next';
import colors from "colors";

export default new Event("interactionCreate",
	async (interaction: Interaction) => {
		
  if (interaction instanceof ChatInputCommandInteraction) {
  
  const command = client.commands.get(interaction.commandName);

  if (!command) return;
  
  const guild = await client.db.guild.findFirst({
    where: {
      id: interaction.guild.id
    }
  });

  if (!guild) {
    await client.db.guild.create({
      data: {
        id: interaction.guild.id,
        welcome: {
         enable: false
        }
      }
    });
  };
  
  let l: TFunction | undefined;

  switch (guild?.language) {
  case 'pt-BR':
    l = i18next.getFixedT('pt-BR');
    break;
  case 'en-US':
    l = i18next.getFixedT('en-US');
    break;
  default:
    l = i18next.getFixedT('en-US');
 };
  
  if (command.player) {
    
   const member = interaction.member as GuildMember;
   
   const currentChannel = member?.voice?.channelId;
   
   if (!currentChannel) {
        return interaction.reply({
          content: '**☝️ Você precisa estar em um canal de voz para usar este comando**',
          ephemeral: true
        });
      };
      
   if (interaction.guild.members.me?.voice?.channel) {
        if (currentChannel !== interaction.guild.members.me?.voice?.channelId)
          return interaction.reply({
            content: '**☝️ Você precisa estar no mesmo canal de voz que eu.**',
            ephemeral: true
          });
      };
      
  };
  
  if (command.owner && !client.owner.some((id) => interaction.user.id === id)) return;
  
  const args = [];
  
  for (const option of interaction.options.data) {
      if (option.type === ApplicationCommandOptionType.Subcommand) {
        if (option.name) args.push(option.name);
        option.options?.forEach(x => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    };

  const context = new CommandContext(client, interaction, args);

  client.logger.info(
  	`Command ${colors.blue(command.name)} used in ${colors.blue(
  		context.guild ? context.guild.name : "DM",
  	)} by ${colors.blue(context.user.username)}`,
  	{
  		tags: ["Command"],
  	},
  );

  await command.exec({ 
    context, client, interaction, l
  });

  if (interaction instanceof AutocompleteInteraction) {
    if (!interaction.member) return;
    const value = interaction.options.getFocused();
    if (!value) return interaction.respond([]);
    const res = await request(`https://clients1.google.com/complete/search?client=youtube&hl=pt-PT&ds=yt&q=${encodeURIComponent(value)}`, {
      headers: {
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36'
      }
    }).then(async r => Buffer.from(await r.body.arrayBuffer()).toString('latin1'));

    const choices = [];

    const data = res.split('[');

    for (let i = 3, min = Math.min(8 * 2, data.length); i < min; i += 2) {
      const choice = data[i].split('"')[1].replace(/\\u([0-9a-fA-F]{4})/g, (_, cc) => String.fromCharCode(parseInt(cc, 16)));

      if (choice) {
        choices.push({
          name: choice,
          value: choice
        });
      }
    }

    interaction.respond(choices);
  }
		
};

});