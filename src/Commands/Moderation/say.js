export default {
  name: 'say',
  aliases: ['say'],
  ownerOnly: false,
async exec({ client, args, message, d, t }) {
  
  if (!message.member.permissions.has('Administrator') && !client.owners.some(id => id === message.author.id) ) return message.reply(`${t('commands:Administrator')}`);
  
    let canal = message.mentions.channels.first();
 
    let mensagem = args.slice(1).join(' ');
 
    if (!canal) return message.reply(`${t('TEXT:say.nochannel')}`).then(d);
 
    if (!mensagem) return message.reply(`${t('TEXT:say.nomessage')}`).then(d);
 
    canal.send(mensagem);
    
    message.react('<:K_ACEITO:947545423952871496>');

  }
};