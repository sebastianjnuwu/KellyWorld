
export default {
  name: 'say',
  aliases: ['say'],
  ownerOnly: false,
  async exec({ client, args, message, t }) {
  
    if (!message.guild.members.me.permissions.has('Administrator')) return message.reply(`${t('permissions:bot.Administrator')}`);
        
    if (!message.member.permissions.has('Administrator') && !client.owners.some(id => id === message.author.id)) return message.reply(`${t('permissions:user.Administrator')}`);
  
    let canal = message.mentions.channels.first();
 
    let mensagem = args.slice(1).join(' ');
 
    if (!canal) return message.reply(`${t('language:say.nochannel')}`);
 
    if (!mensagem) return message.reply(`${t('language:say.nomessage')}`);
 
    canal.send(mensagem);
    
    message.react('<:K_ACEITO:947545423952871496>');

  }
};