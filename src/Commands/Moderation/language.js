export default {
  name: 'language',
  aliases: ['setlang', 'lang'],
  async exec({ client, args, message, d, t }) {
   
   if (!message.guild.members.me.permissions.has('ManageGuild')) return message.reply(`${client.e.perm} ${t('commands:permissions.BotManageGuild')}`).then(d);
        
  if (!message.member.permissions.has('ManageGuild') && !client.owners.some(id => id === message.author.id)) return message.reply(`${t('commands:permissions.ManageGuild',{ user: String(message.author)})}`).then(d);
  
  if (args[0] === "pt") {
   await client.db.guild.findOneAndUpdate({ _id: message.guild.id }, { $set: { lang: 1 } });
   message.reply({ content: "🇧🇷 O idioma do servidor foi definido para **português.**" });
   }
  
  if (args[0] === "es") {
     await client.db.guild.findOneAndUpdate({ _id: message.guild.id }, { $set: { lang: 2 } });
     message.reply({ content: "🇪🇸 el idioma del servidor se configuró en **español.**" });
  }
  
  if (args[0] === "en"){
     await client.db.guild.findOneAndUpdate({ _id: message.guild.id }, { $set: { lang: 3 } });  
     message.reply({ content: "🇺🇲 Server language has been set to **English.**" });
  }
  
  if (!args[0] || args[0] !== "pt" && args[0] !== "en" && args[0] !== "es") {
   message.reply({ content: `${client.e.env} ${t('commands:lang.messagem')}` }).then(d);
     }
   }
};