import { EmbedBuilder } from 'discord.js';

export default {
  name: 'help',
  aliases: ['ajuda','help'],
  ownerOnly: false,
  async exec({ client, message, t }) {
    
    const help = new EmbedBuilder()
      .setColor('Random')
      .setThumbnail(client.user.displayAvatarURL({ size: 2048, format: 'png'}))
      .setTitle(`${t('language:help.title')}`)
      .setDescription(`${t('language:help.description')}`)
      .setTimestamp()
      .setFooter({ text: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ size: 2048, format: 'png'})});

    message.reply({ embeds: [help] });
   
  }
};