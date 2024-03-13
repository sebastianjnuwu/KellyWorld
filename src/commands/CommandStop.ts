import { Command } from '../structures/Command';

export default new Command({
  name: 'stop',
  description: '🎶 › Disconnects the bot from the voice channel and destroys the queue.',
  description_localizations: {
   'pt-BR': '🎶 › Desconecta o bot do canal de voz e destrói a fila.'
  },
  player: true,
	dm_permission: false,
  exec({ context, client, interaction, l }) {
    
  const stop = client.manager.players.get(interaction.guild.id);
    
  if (!stop?.playing) return context.reply({ content: "☝️ Não há nenhuma música tocando no momento.", ephemeral: true });
    
  stop.destroy();

  return context.reply({
      content: "**🐬 Disconnected from the voice channel sucessfully, hope you've enjoyed it!**"
    });
    
 }
});