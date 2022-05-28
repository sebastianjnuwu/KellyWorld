//Importing the packages used in this command!
const Discord = require("discord.js");

//Import module accepted by hadler!
module.exports = {   
  name: "ajuda",
  aliases: ['help','ajuda'],
  run: async(client, message) => {

  //We define the message in embed!
  let help = new Discord.MessageEmbed()
       .setColor("RANDOM")
       .setTitle('🔍 commandos!')
	     .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
       .setDescription('"Esta menina tem dois lados um é o sol o outro é a lua. Com o sol ela expressa felicidade e alegria. Com a lua ele expressa seu medo e tristeza."\n\nUma garota de 17 anos que busca a ajudar o próximo e a humanidade, com a sua disciplina ela ajudar manter seu seu servidor mais organizado e seguro para que os membros tenha um ambiente agradável!\n\n<:K_env:938833579981566043> Veja meus comandos clicando [aqui](https://KellyWorld.kellyuwu.repl.co)\n\n<:K_morri:927681449929359410> Encontrou algum bug? click [aqui](https://github.com/sebastianjnuwu/KellyWorld/issues)\n\n<:K_Aceito:943604636873523200>  Me ajude a ficar online! click [aqui](https://KellyWorld.kellyuwu.repl.co)')
       
      message.reply({ embeds: [help] });
  }
  //is this the end of the code? yes it is the end of the code! hahahaha
};