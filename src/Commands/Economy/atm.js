import { EmbedBuilder } from 'discord.js';

export default {
  name: 'atm',
  aliases: ['atm','bal','saldo'],
  ownerOnly: false,
  async exec({ client, message, t }) {
   
   const player = message.author;
   
   const db = await client.db.user.findOne({ _id: player.id });
   
  const atm = new EmbedBuilder()
   .setColor('Random')
   .setThumbnail(player.displayAvatarURL({ size: 2048, format: "png"}))
   .setTitle(`${client.e.bank} ${t('commands:atm.title')}`)
   .setDescription(`${t('commands:atm.description', { 
     ekethereum: client.e.kethereum,
     ekerein: client.e.kerein,
     kerein: String(db.economy.kerein),
     kethereum: String(db.economy.kethereum)
   })}`)

   message.reply({ embeds: [atm] });
   
  }
};