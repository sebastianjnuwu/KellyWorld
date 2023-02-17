import { SlashCommandBuilder } from 'discord.js';

const create = () => {
 let command = new SlashCommandBuilder()
  .setName('stop')
  .setDMPermission(false)
  .setDescription('stop all the music!')
  .setDescriptionLocalizations({
    "pt-BR": 'pare todas as música!',
    "en-US": 'stop all the music!',
    "es-ES": '¡Pare toda la música!',
  })
  return command.toJSON();
};

const KellyWorld = async (client, interaction) => {
  
  if (!interaction.member.voice.channel) return interaction.reply({ content: `Você precisa entrar em um canal de voz primeiro!`, ephemeral: true });
  
  if (interaction.guild.members.me.voice?.channel && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) return interaction.reply({ content: `Você não está no mesmo canal de voz que eu.`, ephemeral: true });
 
 const stop = client.vulkava.players.get(interaction.guild.id);
  
 if (!stop?.playing) return interaction.reply({ content: `Não há nenhuma faixa sendo reproduzida.` , ephemeral: true })
  
  stop.destroy();
  
  interaction.reply({ content: `Paramos de tocar ok?` , ephemeral: true });
}

export {
  create, KellyWorld
};