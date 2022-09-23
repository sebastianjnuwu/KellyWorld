
export default {
  name: 'antiinvite',
  aliases: ['anticonvites','anti-inivite','antinvite'],
  ownerOnly: false,
  async exec({ client, message, args, d, t }) {
      
    if (!message.guild.members.me.permissions.has('ManageGuild')) return message.reply(`${t('commands:BotPermissions.ManageGuild')}`).then(d);
        
    if (!message.member.permissions.has('ManageGuild') && !client.owners.some(id => id === message.author.id)) return message.reply(`${t('commands:UserPermissions.ManageGuild',{ user: String(message.author)})}`).then(d);
  
    if (!args[0] || !['off','on','desativar', 'disable', 'ativar', 'enable'].some((x) => x == args[0].toLowerCase())) return message.reply(`${t('commands:antiinvite.Message')}`).then(d);
    
    if (['on','ativar','enable'].some((x) => x == args[0].toLowerCase())) {
      await client.db.guild.findOneAndUpdate({ _id: message.guild.id },{ $set: { 'antiinvite': true } });
      
      message.reply(`${t('TEXT:antiinvite.enabled')}`);
    }
  
    if (['off','desativar', 'desactivado','disable'].some((x) => x == args[0].toLowerCase())) {
      await client.db.guild.findOneAndUpdate({ _id: message.guild.id }, { $set: { 'antiinvite': false } });
       
      message.reply(`${t('TEXT:antiinvite.disabled')}**`);
    }
  }
};