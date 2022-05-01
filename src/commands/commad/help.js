const Discord = require("discord.js");
const { JsonDatabase } = require('kettraworld.db');
const db = new JsonDatabase({
  DatabaseJson:"./src/database/database.json"
});

module.exports = {
    name: "ajuda!",
    aliases: ["help","ajuda","ayudar"],

  run: async(client, message, args) => {

 let language = db.get(`language_${message.guild.id}`);
 if( language == null ) { 
     db.set(`language_${messag.guild.id}`, "pt");
}

 if (language === "pt") {
   if(!message.guild.me.permissions.has("ADMINISTRATOR")) {
       return message.reply("<:K_zan:924366252024164363> eu tou sem ah permissão de `ADMINISTRADOR` infelizmente sou inútil ಥ╭╮ಥ")
 };
      let help = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle('🔍 commandos!')
	  .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setDescription('"Esta menina tem dois lados um é o sol o outro é a lua. Com o sol ela expressa felicidade e alegria. Com a lua ele expressa seu medo e tristeza."\n\nUma garota de 17 anos que busca a ajudar o próximo e a humanidade, com a sua disciplina ela ajudar manter seu seu servidor mais organizado e seguro para que os membros tenha um ambiente agradável!\n\n<:K_env:938833579981566043> Veja meus comandos clicando [aqui]()<:K_morri:927681449929359410> Encontrou algum bug? click [aqui]()')
      message.reply({ embeds: [help] })
 };
	  
  }
}