//The packages used for the command work!
const { Message, GuildMember } = require('discord.js');
const ms = require('ms');

//Command import module accepted by hadler
module.exports = {
  name: "castigo",
  aliases: ['castigo'],
  async run(client, message, args) {

//Time to delete messages
const deletarMsgComTempo = (msg, segundos = 10) =>

        setTimeout(() => msg.delete().catch(() => {}), segundos * 1000);


    if (!message.member.permissions.has('MODERATE_MEMBERS'))
        return message.channel
            .send('Você não tem permissão para usar esse comando!')
            .then(deletarMsgComTempo);

    if (!message.guild.me.permissions.has('MODERATE_MEMBERS'))
        return message.channel
            .send('Eu não tenho a permissão necessária para isso!')
            .then(deletarMsgComTempo);

   const modoUso = `${message.author} utilize assim **K.castigo @user motivo**`;

    /** @type {GuildMember} */
    const membro = message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        await message.guild.members.fetch(args[0]).catch(() => {});

    if (!membro) return message.channel.send(modoUso).then(deletarMsgComTempo);

    if (args.length < 2)
        return message.channel.send(modoUso).then(deletarMsgComTempo);

    const tempo = ms(args[1]);

    if (!tempo) return message.channel.send(modoUso).then(deletarMsgComTempo);

    const motivo = args.slice(2) || 'Sem motivo';

    const botNaoConseguePunir = message.guild.me.roles.highest
        .comparePositionTo(membro.roles.highest) < 0;

    if (botNaoConseguePunir)
        return message.channel
            .send(`${message.author} O cargo de ${membro.displayName} é maior do que o meu!`)
            .then(deletarMsgComTempo);

    if (membro.isCommunicationDisabled())
        return message.channel.send(`${message.author} Esse usuário já está em timeout!`).then(deletarMsgComTempo);

    try {
    /** @type { GuildMember } */
        const membroEmTimeout = await membro.timeout(tempo, motivo);
        message.channel.send(
            `${message.author} o ${membroEmTimeout} está em timeout até <t:${~~(
                membroEmTimeout.communicationDisabledUntilTimestamp / 1000
            )}>`
        ).then(deletarMsgComTempo);
    }
    catch (error) {
    message.channel.send(`${message.author} Desculpa me desculpa mesmo não consegui fazer o que foi solicitado.....`).then(deletarMsgComTempo);
        console.log(error);
    }
  }
  //end of code I think so! ugh
};
