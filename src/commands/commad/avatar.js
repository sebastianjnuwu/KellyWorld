const Discord = require("discord.js");
const { JsonDatabase } = require('kettraworld.db');
const db = new JsonDatabase({
  DatabaseJson:"./src/database/database.json"
});

module.exports = {
  name: "avatar",
  aliases: ['avatar', 'avata'],
  async run(bot, message, args) {
    
    let language = db.get(`language_${message.guild.id}`);
    if( language == null ) { 
      db.set(`language_${messag.guild.id}`, "pt");
    }
  
  let user = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;
  
      if (language === "pt") {
      if(!message.guild.me.permissions.has("ADMINISTRATOR")) {
           return message.reply("<:K_zan:924366252024164363> eu tou sem ah permissão de `ADMINISTRADOR` infelizmente sou inútil ಥ╭╮ಥ")
  };
  
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
      }
      
          if (language === "en") {
      if(!message.guild.me.permissions.has("ADMINISTRATOR")) {
    return message.reply("<:K_zan:924366252024164363> I'm without `ADMINISTRATOR` permission unfortunately I'm useless ಥ╭╮ಥ")
      };
      
    const EMBED = new Discord.MessageEmbed()
    .setTitle(`🖼 ${user.username}`)
    .setDescription(
      `**Click [here](${user.displayAvatarURL({
        dynamic: "gif",
        format: "png"
      })}) to download the image!**`
    )
    .setImage(
      user.displayAvatarURL({ dynamic: "gif", format: "png", size: 4096 })
    )
    .setColor("RED")
    message.reply({embeds: [EMBED]});
      }
      
      if (language === "es") {
       if(!message.guild.me.permissions.has("ADMINISTRATOR")) {
    return message.reply("<:K_zan:924366252024164363> No tengo permiso de `ADMINISTRADOR` lamentablemente soy un inútil ಥ╭╮ಥ")
      };
      
      const EMBED = new Discord.MessageEmbed()
    .setTitle(`🖼 ${user.username}`)
    .setDescription(
      `**Haga clic [aquí](${user.displayAvatarURL({
        dynamic: "gif",
        format: "png"
      })}) para descargar la imagen!**`
    )
    .setImage(
      user.displayAvatarURL({ dynamic: "gif", format: "png", size: 4096 })
    )
    .setColor("RED")
    message.reply({embeds: [EMBED]});
      }
  //fim
}};