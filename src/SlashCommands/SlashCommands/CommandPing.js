//importing the packages that will be used!
const Discord = require("discord.js");

//Slash Commands export module
module.exports =  {
  name: "ping", 
  description: "🏓 Quer ver o meu ping?", 
  type: "CHAT_INPUT",
  run: async (client, interaction) => {
  
  //we define the embede message!
  let ping = new Discord.MessageEmbed() 
     .setColor("RANDOM")
     .setDescription(`:ping_pong: **pong!**\nMeu ping atual encontra-se em \`${client.ws.ping}ms\`.`);
  interaction.reply({ embeds: [ping] });
      
  }
  //will it be the end of the code? I think so!
};
