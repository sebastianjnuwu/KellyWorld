export default {
  name: 'say',
  aliases: ['say'],
  ownerOnly: false,
  async exec({ client, args, message, d, t }) {
 
   if (!message.guild.members.me.permissions.has('Administrator')) return message.reply(`${t('commands:BotPermissions.Administrator')}`).then(d);
  
  if (!message.member.permissions.has('Administrator') && !client.owners.some(id => id === message.author.id) ) return message.reply(`${t('commands:UserPermissions.Administrator',{ user: String(message.author)})}`).then(d);
  
 let canal = message.mentions.channels.first();
 
 let mensagem = args.slice(1).join(' ');
 
 if (!canal) return message.reply(`${t('commands:Say.NoChannel')}`).then(d);
 
 if (!mensagem) return message.reply(`${t('commands:Say.NoMessage')}`).then(d);
 
    canal.send(mensagem);
    message.reply(`${t('commands:Say.Yes',{ canal: String(canal)})}`).then(d);
  }
};