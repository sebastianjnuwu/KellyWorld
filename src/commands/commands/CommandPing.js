//Importing the packages used in this command!
const Discord = require("discord.js");

//Import module accepted by hadler!
module.exports = {
    name: "ping",
    aliases: ['ping'],
  run: async(client, message) => {
  
  //We define our message in embed
 let ping = new Discord.MessageEmbed() 
      .setColor("RANDOM")
      .setDescription(`:ping_pong: **pong!**\nMeu ping atual encontra-se em \`${client.ws.ping}ms\`.`);

  message.reply({embeds:[ping]})
  
    }
    //we've reached the end of the code! hey
  };