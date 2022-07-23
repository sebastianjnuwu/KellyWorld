export default {
  name: 'ban',
  aliases: ['ban'],
  ownerOnly: false,
  async exec({ client, args, message, d, t }) {

    if (!message.guild.members.me.permissions.has('ManageGuild')) return message.reply(`${t('commands:BotPermissions.ManageGuild')}`).then(d);
        
    if (!message.member.permissions.has('ManageGuild') && !client.owners.some(id => id === message.author.id)) return message.reply(`${t('commands:UserPermissions.ManageGuild',{ user: String(message.author)})}`).then(d);
  
    let usuario = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => {});

    let motivo = args.slice(1).join(' ') || `${t('commands:Ban.Reason')}`;

    if (!args[0]) return message.reply(`${t('commands:Ban.Message')}`).then(d);

    if (!usuario) return message.reply(`${t('commands:Ban.InvalidUser')}`).then(d);

    if (usuario.id  === message.guild.ownerId) return message.reply(`${t('commands:Ban.NoOwner')}`).then(d);

    if (usuario.id  === message.author.id) return message.reply(`${t('commands:Ban.NoAuthor')}`).then(d);

    if (usuario.id  === client.user.id) return message.reply(`${t('commands:Ban.NoClient')}`).then(d);

    if (usuario.roles.highest.position > message.guild.members.me.roles.highest.position ) return message.reply(`${t('commands:Ban.NoRole')}`).then(d);

    message.guild.members.ban(usuario, { reason: motivo });

    message.reply(`${t('commands:Ban.YesBan')}`);

  }
};