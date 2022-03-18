const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ['avatar', 'avata'],
  async run(bot, message, args) {
  
  if(!message.guild.me.permissions.has("ADMINISTRATOR")) {
    return message.reply("<:K_zan:924366252024164363>  eu tou sem ah permissão de `ADMINISTRADOR` infelizmente sou inútil ಥ╭╮ಥ")
  }
  
  let user = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;
  const EMBED = new Discord.MessageEmbed()
    .setTitle(`🖼 ${user.username}`)
    .setDescription(
      `**Clique [aqui](${user.displayAvatarURL({
        dynamic: "gif",
        format: "png"
      })}) para baixar a imagem!**`
    )
    .setImage(
      user.displayAvatarURL({ dynamic: "gif", format: "png", size: 4096 })
    )
    .setColor("RED")

    message.reply({embeds: [EMBED]});
  //@kettraworld
}};