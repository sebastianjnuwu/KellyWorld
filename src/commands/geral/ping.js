const Discord = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["ping"],

  run: async(client, message, msg, args) => {
  
   if(!message.guild.me.permissions.has("ADMINISTRATOR")) {
    return message.reply("<:K_zan:924366252024164363>  eu tou sem ah permissão de `ADMINISTRADOR` infelizmente sou inútil ಥ╭╮ಥ")
  }
  
  const embed = new Discord.MessageEmbed()
  .setDescription("**Ping sendo Calculado...**")
  .setColor(`RANDOM`)
  message.channel.send({ embeds: [embed]}).then(msg => {
    setTimeout(() => {
      let embed2 = new Discord.MessageEmbed()
      .setTitle(`🏓 Pong!`)
      .setDescription(`Latência da API: **${Math.round(client.ws.ping)}ms**\nLatência do Servidor: **${msg.createdTimestamp - message.createdTimestamp}ms**`)
      .setColor(`RANDOM`)
    msg.edit({embeds: [embed2]})
    }, 5000)
  });
}
}