export default {
  name: 'prefix',
  aliases: ['setprefix', 'prefixo'],
  playerOnly: false,
  async exec({ client, message, args, d, t }) { 
  
  if (!message.guild.members.me.permissions.has('ManageGuild')) return message.reply(`${t('commands:BotPermissions.ManageGuild')}`).then(d);
  
  if (!message.member.permissions.has('ManageGuild') && !client.owners.some(id => id === message.author.id) ) return message.reply(`${t('commands:UserPermissions.ManageGuild',{ user: String(message.author)})}`).then(d);

  if (!args[0]) return message.reply(`**${t('commands:Prefix.NoPrefix', { user: String(message.author.username)})}**`).then(d);

  if (args[0].length > 2) return message.reply(`**${t('commands:Prefix.Min', { user: String(message.author.username)})}**`).then(d);

  await client.db.guild.findOneAndUpdate({ _id: message.guild.id }, {  $set: { prefix: args[0] } });
    
  message.reply(`**${t('commands:Prefix.Set',{ user: String(message.author.username), prefixo: args[0]})}**`).then(d);
  }
};