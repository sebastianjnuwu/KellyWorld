export default {
  name: 'work',
  aliases: ['work'],
  ownerOnly: false,
  async exec({ client, args, message, t }) {
  
  function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)
  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
}

  const player = message.author;
  
  const db = await client.db.user.findOne({ _id: player.id });

  if (Date.now() < db.cooldowns.work) {
     
  const calc = db.cooldowns.work - Date.now()
      
  return message.reply(`${t('commands:Work.time',{
     minutos: String(ms(calc).minutes),
     segundos: String(ms(calc).seconds)
  })}`);
 };
 
 const kerein = Math.floor(Math.random() * 39) + 21 * 2;
 
 let frase = [
  `${t('work:advogado', { won: String(kerein) })}`,
  `${t('work:comerciante', { won: String(kerein) })}`,
  `${t('work:medico', { won: String(kerein) })}`,
  `${t('work:presidente', { won: String(kerein) })}`,
  `${t('work:eletricista', { won: String(kerein) })}`,
  `${t('work:programador', { won: String(kerein) })}`,
  `${t('work:advogado', { won: String(kerein) })}`,
  `${t('work:padeiro', { won: String(kerein) })}`
 ];
 
 let work = frase[Math.floor(Math.random() * frase.length)];
 
  await client.db.user.updateOne({  _id: player.id },
  { $set: {
     "economy.kerein": db.economy.kerein + kerein,
     "cooldowns.work": Date.now() + 300000
     }
 });
  
  message.reply(`${work}`);
  
  }
};