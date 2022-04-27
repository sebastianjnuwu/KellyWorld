const Discord = require("discord.js");
const { JsonDatabase } = require('kettraworld.db');
const db = new JsonDatabase({
  DatabaseJson:"./src/database/database.json"
});

module.exports = {
   name: "icon",
    aliases: ["icon"],
  run: async (client, message, args) => {
    
    let language = db.get(`language_${message.guild.id}`);
    if( language == null ) { 
      db.set(`language_${messag.guild.id}`, "pt");
    }
    
  const sicon = message.guild.iconURL({ dynamic : true, format: "png", size: 1024});
  const svicon = message.guild.iconURL()
  
    if (language === "pt") {
        if(!message.guild.me.permissions.has("ADMINISTRATOR")) {
  return message.reply("<:K_zan:924366252024164363> eu tou sem ah permissão de `ADMINISTRADOR` infelizmente sou inútil ಥ╭╮ಥ")
  };
  const embed = new Discord.MessageEmbed()
       .setTitle(`Ícone do servidor:`)
       .setDescription(`[Link da imagem aqui](${sicon})`)
       .setImage(sicon)
       .setColor('#ef00ff')
    await message.channel.send({ embeds: [embed] })
    }
    
    if (language === "en") {
      if(!message.guild.me.permissions.has("ADMINISTRATOR")) {
    return message.reply("<:K_zan:924366252024164363> I'm without `ADMINISTRATOR` permission unfortunately I'm useless ಥ╭╮ಥ")
      };
      
    const embed = new Discord.MessageEmbed()
        .setTitle(`Server icon:`)
        .setDescription(`[Image link here](${sicon})`)
        .setImage(sicon)
        .setColor('#ef00ff')
    await message.channel.send({ embeds: [embed] })
    }
    
       if (language === "es") {
       if(!message.guild.me.permissions.has("ADMINISTRATOR")) {
    return message.reply("<:K_zan:924366252024164363> No tengo permiso de `ADMINISTRADOR` lamentablemente soy un inútil ಥ╭╮ಥ")
      };
      
    const embed = new Discord.MessageEmbed()
       .setTitle(`Icono del servidor:`)
       .setDescription(`[Enlace de imagen aquí](${sicon})`)
       .setImage(sicon)
       .setColor('#ef00ff')
    await message.channel.send({ embeds: [embed] })
       }
}
}