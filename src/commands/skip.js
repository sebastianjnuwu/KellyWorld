import { SlashCommandBuilder } from 'discord.js';

const create = () => {
 let command = new SlashCommandBuilder()
  .setName('skip')
  .setDMPermission(false)
  .setDescription('skip to next song...')
  .setDescriptionLocalizations({
    "pt-BR": 'pule para a próxima música...',
    "en-US": 'skip to next song...',
    "es-ES": 'pasar a la siguiente canción...',
  });
  return command.toJSON();
};

const KellyWorld = async (client, interaction, lang) => {

    if (!interaction.member.voice.channel) return interaction.reply({ content: `${lang('language:music.novoice')}`, ephemeral: true });

  if (interaction.guild.members.me.voice?.channel && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) return interaction.reply({ content: `${lang('language:music.nomevoice')}`, ephemeral: true });

 const stop = client.vulkava.players.get(interaction.guild.id);

 if (!stop?.playing) return interaction.reply({ content: `${lang('language:music.nomusic')}`, ephemeral: true });

 if (stop?.queue.size === 0) return interaction.reply({ content: `${lang('language:music.nomusicplay')}`, ephemeral: true });

  stop.skip();

  interaction.reply({ content: `${lang('language:music.skip')}` });
  console.log(stop?.current.title);
};

export { create, KellyWorld };