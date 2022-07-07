import { EmbedBuilder } from 'discord.js';

export default {
  name: 'atm',
  aliases: ['atm','bal','saldo'],
  ownerOnly: false,
  async exec({ client, message, t }) {
   
   const player = message.author;
   
   const db = await client.db.user.findOne({ userID: player.id });
   
 function progressDef(current, total, barSize) {
  const progressLifi = Math.round((barSize*current)/total);
  return '▮'.repeat(progressLifi) + '▯'.repeat(barSize-progressLifi);
}
  
  const lifi = progressDef(db.economy.life, 100, 10);

  const atm = new EmbedBuilder()
   .setColor('Random')
   .setThumbnail(player.displayAvatarURL({ size: 2048, format: "png"}))
   .setTitle(`${client.e.bank} ${t('commands:atm.title')}`)
   .setDescription(`${t('commands:atm.description', { 
     ekethereum: client.e.kethereum, ekerein: client.e.kerein,
     elife: client.e.life, life: String(lifi),
     kerein: String(db.economy.kerein),
     kethereum: String(db.economy.kethereum)
   })}`)

   message.reply({ embeds: [atm] });
   
  }
};