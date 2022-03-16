No"tmessage"tmessagetmessa"tmessagetmessatmessagetmessatmessagetmessatmessagetmessa onst willindo = new Discord.MessageEmbed()  .setDescription("ng sendo Calculado...**")
  .setColor('#ff0f00')
  message.channel.send(willindo).then(msg => {
    setTimeout(() => {
      let willping = new Discord.MessageEmbed()
      .setTitle(`🏓 | Pong !`)
      .setDescription(`Latência da API: **${Math.round(client.ws.ping)}ms**
Latência do Servidor: **${msg.createdTimestamp - message.createdTimestamp}ms**`)
      .setColor('#ff0f00')
    msg.edit(willping)
    }, 5000)
  });
} 