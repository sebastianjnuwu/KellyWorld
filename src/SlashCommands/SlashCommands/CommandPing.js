// importing the packages/libraries used this command!
const Discord = require("discord.js");

// slash command import module supported by hadler.
module.exports =  {
  name: "ping", 
  description: "🏓 Quer ver o meu ping?", 
  type: "CHAT_INPUT",
  run: async (client, interaction) => {
  
  //we define the embede message!
  let ping = new Discord.MessageEmbed() 
     .setColor("RANDOM")
     .setDescription(`:ping_pong: **pong!**\nMeu ping atual encontra-se em \`${client.ws.ping}ms\`.`);
  
  // sending the message in embed.
  interaction.reply({ embeds: [ping] });
 
  }
};