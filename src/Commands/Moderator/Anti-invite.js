
export default {
  name: 'invite',
  aliases: ['anti-invite'],
  ownerOnly: false,
  async exec({ client, message, args, t }) {
      
    if (!message.guild.members.me.permissions.has('ManageGuild')) return message.reply(`${t('permissions:bot.ManageGuild')}`);
        
    if (!message.member.permissions.has('ManageGuild') && !client.owners.some(id => id === message.author.id)) return message.reply(`${t('permissions:user.ManageGuild')}`);
  
    if (!args[0] || !['desativado', 'disable', 'ativado', 'enable'].some((x) => x == args[0].toLowerCase())) return message.reply(`${t('language:invitation.message')}`);
    
    if (['ativado','enable'].some((x) => x == args[0].toLowerCase())) {
      await client.db.guild.findOneAndUpdate({ _id: message.guild.id },{ $set: { 'antiinvite': true } });
      
      message.reply(`${t('language:invitation.activated')}`);
    }
  
    if (['desativado','disable'].some((x) => x == args[0].toLowerCase())) {
      await client.db.guild.findOneAndUpdate({ _id: message.guild.id }, { $set: { 'antiinvite': false } });
       
      message.reply(`${t('language:invitation.disabled')}`);
    }
  }
};