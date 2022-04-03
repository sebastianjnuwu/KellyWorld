const Discord = require ("discord.js");

module.exports = {
    name: "say1",
    aliases: ["falar", "say"],

  run: async (client, message, args) => {
  
    if(!message.guild.me.permissions.has("ADMINISTRATOR")) {
    return message.reply("<:K_zan:924366252024164363>  eu tou sem ah permissão de `ADMINISTRADOR` infelizmente sou inútil ಥ╭╮ಥ")
  }
  
if (!message.member.permissions.has("ADMINISTRATOR"))
    return message.reply(
      "Você não possui a permissão nescessária para utilizar esse comando 🥲"
    );

    const canal = message.mentions.channels.first();
    if (!canal) return message.channel.send(`${message.author} Você não mencionou um canal!`);   

    const mensagem =  args.slice(1).join(' ');
    if (!mensagem) return message.reply("Defina uma mensagem!");

    canal.send(mensagem);
    }
    //@kettraworld
};