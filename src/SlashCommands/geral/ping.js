const Discord = require("discord.js");
const { JsonDatabase } = require('kettraworld.db');
const db = new JsonDatabase({
  DatabaseJson:"./src/database/database.json"
});

module.exports =  {
    name: "ping", 
    description: "🏓 Information about my latency!", 
    type: "CHAT_INPUT",
    
    run: async (client, interaction, args) => {
        
    let language = db.get(`language_${interaction.guild.id}`);
    if( language == null ) { 
      db.set(`language_${messag.guild.id}`, "pt");
    }
    
    if (language === "pt") {
        if(!interaction.guild.me.permissions.has("ADMINISTRATOR")) {
  return interaction.reply("<:K_zan:924366252024164363> eu tou sem ah permissão de `ADMINISTRADOR` infelizmente sou inútil ಥ╭╮ಥ")
  };
  
      let ping = new Discord.MessageEmbed() 
        .setColor("RANDOM")
        .setDescription(`:ping_pong: **pong!**\nMeu ping atual encontra-se em \`${client.ws.ping}ms\`.`);
      interaction.reply({ embeds: [ping] })
    };
      
    if (!language || language === "en") {
      if(!interaction.guild.me.permissions.has("ADMINISTRATOR")) {
    return interaction.reply("<:K_zan:924366252024164363> I'm without `ADMINISTRATOR` permission unfortunately I'm useless ಥ╭╮ಥ")
      };
       
      let ping = new Discord.MessageEmbed() 
        .setColor("RANDOM")
        .setDescription(`:ping_pong: **pong!**\nMy current ping is at \`${client.ws.ping}ms\`.`);
      interaction.reply({ embeds: [ping] })
  };
   if (!language || language === "es") {
       if(!interaction.guild.me.permissions.has("ADMINISTRATOR")) {
    return interaction.reply("<:K_zan:924366252024164363> No tengo permiso de `ADMINISTRADOR` lamentablemente soy un inútil ಥ╭╮ಥ")
      };
     let ping = new Discord.MessageEmbed() 
        .setColor("RANDOM")
        .setDescription(`:ping_pong: **apestar!**\nMi ping actual está en \`${client.ws.ping}ms\`.`);
      interaction.reply({ embeds: [ping] })
    }
  }
}