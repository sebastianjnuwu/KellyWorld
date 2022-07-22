export default {
  name: 'bet',
  aliases: ['bet','apostar'],
  ownerOnly: false,
  async exec({ client, args, message, d, t }) {
   const player = message.author;
   
   const db = await client.db.user.findOne({ _id: player.id });
   
  if (!args[0]) {
    return message.reply(`${t('commands:Bet.NoMoney')}`).then(d);
  }
  
  if(args[0] < '1') return message.reply('7-7');
  
  if (db.economy.kerein < 49 ) {
   return message.reply(`${t('commands:Bet.Minimum')}`).then(d);
 }
 
  if (isNaN(args[0])) {
    return message.reply(`${t('commands:Bet.NoNumber')}`).then(d);
 }
 
 if (args[0] > db.economy.kerein) {
   return message.reply(`${t('commands:Bet.InvalidValue')}`).then(d);
 }
 
 let won = 2 * args[0];
 let bet = Math.floor(Math.random() * 10);
/*
 if(db.economy.kerein > 2000) {
 
  if(bet < 2) {
     await client.db.user.updateOne({  _id: player.id },
   { $set: { "economy.kerein": db.economy.kerein + won }});
    return message.reply(`${t('commands:Bet.won',{ ganhou: String(won)})}`);
  } else {
    await client.db.user.updateOne({  _id: player.id },
   { $set: { "economy.kerein": db.economy.kerein - args[0] }});
    return message.reply(`${t('commands:Bet.lost',{ perdeu: String(args[0])})}`);
  }
 }*/
 
  if(bet < 10) {
   await client.db.user.updateOne({  _id: player.id },
   { $set: { "economy.kerein": db.economy.kerein + won }});
    return message.reply(`${t('commands:Bet.won',{ ganhou: String(won)})}`);
  } else {
    await client.db.user.updateOne({  _id: player.id },
   { $set: { "economy.kerein": db.economy.kerein - args[0] }});
    return message.reply(`${t('commands:Bet.lost',{ perdeu: String(args[0])})}`);
  }
  
  }
};