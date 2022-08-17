
export default {
  name: 'kick',
  aliases: ['kick','expulsar'],
  ownerOnly: false,
  async exec({ client, args, message, d, t }) {
  
    if (!message.guild.members.me.permissions.has('KickMembers')) return message.reply(`${t('commands:BotPermissions.KickMembers')}`).then(d);

    if (!message.member.permissions.has('KickMembers') && !client.owners.some(id => id === message.author.id)) return message.reply(`${t('commands:UserPermissions.KickMembers',{ user: String(message.author)})}`).then(d);
  
    let usuario = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => {});

    let motivo = args.slice(1).join(' ') || `${t('commands:Kick.Reason')}`;
  
    if (!args[0]) return message.reply(`${t('commands:Kick.Message')}`).then(d);
  
    if (!usuario) return message.reply(`${t('commands:Kick.InvalidUser')}`).then(d);
  
    if (usuario.id  === message.guild.ownerId) return message.reply(`${t('commands:Kick.NoOwner')}`).then(d);

    if (usuario.id  === message.author.id) return message.reply(`${t('commands:Kick.NoAuthor')}`).then(d);

    if (usuario.id  === client.user.id) return message.reply(`${t('commands:Kick.NoClient')}`).then(d);

    if (usuario.roles.highest.position > message.guild.members.me.roles.highest.position ) return message.reply(`${t('commands:Kick.NoRole')}`).then(d);
  
    message.guild.members.kick(usuario, [motivo]);
    message.reply(`${t('commands:Kick.Yes')}`);
  
  }
};