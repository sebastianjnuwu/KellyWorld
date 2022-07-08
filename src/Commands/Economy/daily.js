export default {
  name: 'daily',
  aliases: ['daily'],
  ownerOnly: false,
  async exec({ client, message, t }) {

  const player = message.author;
   
  const db = await client.db.user.findOne({ _id: player.id });
  
  if (!db) {
  const newuser = new client.db.user({ _id: player.id });
  await newuser.save();
  db = await client.db.user.findOne({ _id: player.id });
  }
    
 if (Date.now() < db.cooldowns.daily) {
   const calc = db.cooldowns.daily - Date.now();
   return message.reply(`${t('commands:daily.time',{
   hora: String(ms(calc).hours),
   minutos: String(ms(calc).minutes),
   segundos: String(ms(calc).seconds)
   })}`);
 }
 
  const kerein = Math.floor(Math.random() * 380) + 50;
  await client.db.user.updateOne({  _id: player.id },
  { $set: {
     "economy.kerein": db.economy.kerein + kerein,
     "cooldowns.daily": Date.now() + 86400000
     }
 });
  
   message.reply(`${t('commands:daily.won', {
     ekerein: client.e.kerein,
     user: String(message.author),
     kerein: String(kerein)
   })}`);
  
  }
};

function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)
  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
}