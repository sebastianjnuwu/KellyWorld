
export default {
  name: 'antiinvite',
  aliases: ['anticonvites', 'antinvite'],
  ownerOnly: false,
  async exec({ client, message, args, d, t }) {
      
  if (!message.guild.members.me.permissions.has('ManageGuild')) return message.reply(`${client.e.perm} ${t('commands:permissions.BotManageGuild')}`).then(d);
        
  if (!message.member.permissions.has('ManageGuild') && !client.owners.some(id => id === message.author.id)) return message.reply(`${t('commands:permissions.ManageGuild',{ user: String(message.author)})}`).then(d);
  
  const guild = await client.db.guild.findOne({ _id: message.guild.id });
  
  if (!args[0] || ![
      'desativar',
      'disable',
      'ativar',
      'enable',
      'activado',
      'desactivado',
    ].some((x) => x == args[0].toLowerCase())
    ) return message.reply(`${client.e.aten} ${t('commands:antiinvite.messagem')}`).then(d);
    
  if (['ativar', 'activado','enable'].some((x) => x == args[0].toLowerCase())) {
      await client.db.guild.findOneAndUpdate({ _id: message.guild.id },
        {
          $set: {
            'antiinvite': true
          }
        });
      message.reply(`**${client.e.yes} ${t('commands:antiinvite.enabled')}**`);
    }
  
  if (['desativar', 'desactivado','disable'].some((x) => x == args[0].toLowerCase())) {
      await client.db.guild.findOneAndUpdate({ _id: message.guild.id }, {
        $set: {
          'antiinvite': false
        }
      });
      message.reply(`**${client.e.yes} ${t('commands:antiinvite.disabled')}**`);
    }
  }
};