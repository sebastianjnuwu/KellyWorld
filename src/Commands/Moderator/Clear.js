export default {
  name: 'clear',
  aliases: ['clear','limpar'],
  ownerOnly: false,
  async exec({ client, args, message, t }) {
 
    try {
 
      if (!message.guild.members.me.permissions.has('ManageMessages')) return message.reply(`${t('permissions:bot.ManageMessages')}`);
        
      if (!message.member.permissions.has('ManageMessages') && !client.owners.some(id => id === message.author.id)) return message.reply(`${t('permissions:user.ManageMessages')}`);
  
      let delamount = args[0];
 
      if (isNaN(delamount) || parseInt(delamount <= 1)) return message.reply(`${t('language:clear.NoNumber')}`);
 
      if (parseInt(delamount) > 99) return message.reply(`${t('language:clear.Mxm')}`);

      await message.channel.bulkDelete(parseInt(delamount) + 1, true);
 
      await message.channel.send(`**${t('language:clear.Yes')}**`).then(m => {
        setTimeout(() => {
          m.delete();
        }, 1000);
      });
    } catch (e) {
      console.log(e);
    }
  }
};