export default {
  name: 'clear',
  aliases: ['clear','limpar'],
  ownerOnly: false,
  async exec({ client, args, message, d, t }) {
 
    try {
 
      if (!message.guild.members.me.permissions.has('ManageMessages')) return message.reply(`${t('commands:BotPermissions.ManageMessages')}`).then(d);
        
      if (!message.member.permissions.has('ManageMessages') && !client.owners.some(id => id === message.author.id)) return message.reply(`${t('commands:UserPermissions.ManageMessages',{ user: String(message.author)})}`).then(d);
  
      let delamount = args[0];
 
      if (isNaN(delamount) || parseInt(delamount <= 1)) return message.reply(`${t('commands:clear.NoNumber')}`).then(d);
 
      if (parseInt(delamount) > 99) return message.reply(`${t('commands:clear.Mxm')}`).then(d);

      await message.channel.bulkDelete(parseInt(delamount) + 1, true);
 
      await message.channel.send(`**${t('commands:clear.Yes')}**`).then(m => {
        setTimeout(() => {
          m.delete();
        }, 1000);
      });
    } catch (e) {
      console.log(e);
    }
  }
};