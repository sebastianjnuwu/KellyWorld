export default {
  name: 'ban',
  aliases: ['ban'],
  ownerOnly: false,
  async exec({ client, args, message, d, t }) {
  
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.fetch(args[0]).catch(() => {});
  
  let motivo = args.slice(2) || 'Não especificado...';
  
  if (!args[0]) return message.reply('para punir um usuário precisa mencionalo ou color o id....').then(d);
  
  if(user.id === message.guild.ownerId) return message.reply('não posso banir o dono do servidor').then(d);

  if(user.id === client.user.id) return message.reply('vc não pode me banir').then(d);
  
  if (user.id === message.user.id) return message.reply('vc não pode se banir').then(d);
  
  if (user.roles.highest.position > interaction.guild.me.roles.highest.position ) return message.reply('meu cargo é menor').then(d);
    
   message.guild.members.ban(user, { reason: motivo });

   message.reply({ content: `${user} foi banido com sucesso!`});
  }
};