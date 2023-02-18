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

const KellyWorld = async (client, interaction) => {

  if (!interaction.member.voice.channel) return interaction.reply({ content: `Você precisa entrar em um canal de voz primeiro!`, ephemeral: true });

  if (interaction.guild.members.me.voice?.channel && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) return interaction.reply({ content: `Você não está no mesmo canal de voz que eu.`, ephemeral: true });


 const stop = client.vulkava.players.get(interaction.guild.id);

 if (!stop?.playing) return interaction.reply({ content: `Não há nenhuma faixa sendo reproduzida.`, ephemeral: true });

 if (stop?.queue.size === 0) return interaction.reply({ content: `Não tem nenhuma outra música para ser tocada!`, ephemeral: true });

  stop.skip();

  interaction.reply({ content: `pulando para a próxima música .....` });
  console.log(stop?.current.title);
};

export { create, KellyWorld };