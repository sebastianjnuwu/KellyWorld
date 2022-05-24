//Importing the packages used in this command!
const Discord = require("discord.js");

//Import module accepted by hadler!
module.exports = {
    name: "ping",
    aliases: ['ping'],
  run: async(client, message) => {
    
 //simple If to check if the bot contains admin permission
  if(!message.guild.me.permissions.has("ADMINISTRATOR") {
      return message.reply("<:K_zan:924366252024164363> eu tou sem ah permissão de `ADMINISTRADOR` infelizmente sou inútil ಥ╭╮ಥ")
  })
  
  //We define our message in embed
 let ping = new Discord.MessageEmbed() 
      .setColor("RANDOM")
      .setDescription(`:ping_pong: **pong!**\nMeu ping atual encontra-se em \`${client.ws.ping}ms\`.`);

  message.reply({embeds:[ping]})
  
    }
    //we've reached the end of the code! hey
  };