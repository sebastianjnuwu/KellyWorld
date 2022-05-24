//Importing the packages used in this command!
const Discord = require("discord.js");

//Import module accepted by hadler! 
module.exports = {
  name: "avatar",
  aliases: ['avatar','perfil'],
  async run(bot, message, args) {
  
  //we define the user variable either by mentioning id or author himself
  let user = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;
  
  //We define our message in embed
  const Avatar = new Discord.MessageEmbed()
        .setTitle(`🖼 ${user.username}`)
        .setColor("RED")
        .setDescription(`**click [aqui](${user.displayAvatarURL({dynamic:"gif",format: "png"})}) para fazer o download!**`)
        .setImage(user.displayAvatarURL({ dynamic: "gif", format: "png", size: 4096 }))

    message.reply({embeds: [Avatar]});
  }
  //we've reached the end of the code! hey
};