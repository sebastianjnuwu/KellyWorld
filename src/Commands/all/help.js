import { EmbedBuilder } from 'discord.js';

export default {
  name: 'help',
  aliases: ['help','ajuda','comando','command'],
  ownerOnly: false,
  async exec({ client, message, t }) {
   
   const help = new EmbedBuilder()
   .setColor('Random')
   .setThumbnail(client.user.displayAvatarURL({ size: 2048, format: "png"}))
   .setTitle(`${client.e.verification} ${t('commands:help.title')}`)
   .setDescription(`${t('commands:help.description', { 
     atm: client.e.kerein,
     bau: client.e.bau,
     bet: client.e.bet,
     user: String(message.author), 
     emoji: client.e.PointBlue
     })}`)
   .setTimestamp()
   .setFooter({ text: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ size: 2048, format: "png"})});

   message.reply({ embeds: [help] });
   
  }
};