export default {
  name: 'say',
  aliases: ['say'],
  ownerOnly: false,
  async exec({ client, args, message, d, t }) {
 
   if (!message.guild.members.me.permissions.has('Administrator')) return message.reply(`${client.e.perm} ${t('commands:permissions.BotAdministrator')}`).then(d);
  
  if (!message.member.permissions.has('Administrator') && !client.owners.some(id => id === message.author.id) ) return message.reply(`${t('commands:permissions.Administrator',{ user: String(message.author)})}`).then(d);
  
 let canal = message.mentions.channels.first();
 
 let mensagem = args.slice(1).join(' ');
 
 if (!canal) return message.channel.send(`${message.author} Você não mencionou um canal!`).then(d);
 
 if (!mensagem) return message.reply("Defina uma mensagem!").then(d);
 
  canal.send(mensagem);
  message.reply(`enviado no canal ${canal}`)
  }
};