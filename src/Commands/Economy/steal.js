import { ApplicationCommandOptionType } from 'discord.js';

export default {
  name: 'steal',
  aliases: ['steal','rob','roubar'],
  ownerOnly: false,
  async exec({ client, args, message, d, t }) {
  
  function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)
  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
}

  let player = message.author;
  let db = await client.db.user.findOne({ _id: player.id });
  
  if (!args[0]) return message.reply(`${t('commands:Steal.NoUser')}`).then(d);
  
  let usuario = message.mentions.members.first();
  let userdb = await client.db.user.findOne({ _id: usuario.id });
  
  if (!userdb) {
  const newuser = new client.db.user({ _id: usuario.id });
  await newuser.save();
  userdb = await client.db.user.findOne({ _id: usuario.id });
  }

  if (!usuario) return message.reply(`${t('commands:Steal.NoFound')}`).then(d);

  if (usuario.id === message.author.id) return message.reply(`${t('commands:Steal.NoAuthor')}`).then(d);
  
  if (usuario.id === client.user.id) return message.reply(`${t('commands:Steal.NoClient')}`).then(d);
  
  if (db.economy.kerein < 150 ) return message.reply(`${t('commands:Steal.Minimum')}`).then(d);
  
  if (userdb.economy.kerein < 150) return message.reply(`${t('commands:Steal.NoKerein',{ user: String(usuario) })}`).then(d);
 
  if (Date.now() < db.cooldowns.steal) {
     
  const calc = db.cooldowns.steal - Date.now()
      
  return message.reply(`${t('commands:Steal.time',{
     minutos: String(ms(calc).minutes),
     segundos: String(ms(calc).seconds)
  })}`);
 };
 
 let steal = Math.floor(Math.random() * 10);
 let won = Math.floor(Math.random() * 90);

   if (steal < 5) {
   await client.db.user.updateOne({  _id: player.id },
   { $set: { 
     "economy.kerein": db.economy.kerein + won,
     "cooldowns.steal": Date.now() + 480000
 }});
    return message.reply(`${t('commands:Steal.won',{ ganhou: String(won), user: String(usuario) })}`);
  } else {
    await client.db.user.updateOne({  _id: usuario.id },
   { $set: { 
     "economy.kerein": userdb.economy.kerein - won,
     "cooldowns.steal": Date.now() + 480000
   }});
 
   return message.reply(`${t('commands:Steal.lost',{ perdeu: String(won)})}`);
  }
  
  }
};