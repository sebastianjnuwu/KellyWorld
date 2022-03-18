const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ['avatar', 'avata'],
  async run(bot, message, args) {
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
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