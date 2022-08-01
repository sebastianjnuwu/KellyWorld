
export default {
  name: 'give',
  aliases: ['give','doar','pay'],
  ownerOnly: false,
  async exec({ client, args, message, t }) {
    
  let player = message.author;
  let db = await client.db.user.findOne({ _id: player.id });
  
  if (!args[0]) return message.reply(`${t('commands:Give.NoUser')}`);
  
  if(args[1] < '1') return message.reply('7-7');
  
  if (isNaN(args[1])) {
    return message.reply(`${t('commands:Give.NoNumber')}`).then(d);
    }
    
  if (!args[1]) return message.reply(`${t('commands:Give.NoValue')}`);
  
  let usuario = message.mentions.members.first();
  let userdb = await client.db.user.findOne({ _id: usuario.id });
  
  if (!userdb) {
      const newuser = new client.db.user({ _id: usuario.id });
      await newuser.save();
      userdb = await client.db.user.findOne({ _id: usuario.id });
    }
  
  if (!usuario) return message.reply(`${t('commands:Give.NoFound')}`);
 
  if (usuario.id === message.author.id) return message.reply(`${t('commands:Give.NoAuthor')}`);
  
  if (usuario.id === client.user.id) return message.reply(`${t('commands:Give.NoClient')}`);
  
  if (args[1] > db.economy.kerein) return message.reply(`${t('commands:Give.Minimum')}`);
  
  
  await client.db.user.updateOne({  _id: usuario.id },
        { $set: { 
          'economy.kerein': userdb.economy.kerein + args[1]
        }});
        
  message.reply(`${t('commands:Give.won',{ ganhou: String(args[1]), user: String(usuario) })}`);
  
  }
}