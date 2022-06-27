export default {
  name: 'prefix',
  aliases: ['setprefix', 'prefixo'],
  playerOnly: false,
  async exec({ client, message, args, d, t }) { 
  
  if (!message.guild.members.me.permissions.has('ManageGuild')) return message.reply(`${client.e.perm} ${t('commands:permissions.BotManageGuild')}`).then(d);
  
  if (!message.member.permissions.has('ManageGuild') && !client.owners.some(id => id === message.author.id) ) return message.reply(`${t('commands:permissions.ManageGuild',{ user: String(message.author)})}`).then(d);

  if (!args[0]) return message.reply(`**${t('commands:prefix.nop', { user: String(message.author.username)})}**`).then(d);

  if (args[0].length > 2) return message.reply(`**${t('commands:prefix.min', { user: String(message.author.username)})}**`).then(d);

  await client.db.guild.findOneAndUpdate({ _id: message.guild.id }, {  $set: { prefix: args[0] } });
    
  message.reply(`${client.e.yes} **${t('commands:prefix.set',{ user: String(message.author.username), prefixo: args[0]})}**`).then(d);
  }
};