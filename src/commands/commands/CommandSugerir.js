//Importing the packages used in this command!
const { MessageEmbed } = require('discord.js');

//Import module accepted by hadler! 
module.exports = {
    name: "sugerir",
    aliases: ["sugerir", "sugestão","sugestao"],
run: async (client, message, args) => {

//delete command messages after executed!
message.delete();

//Simple IF for the command to be valid only on the KettraWorld server
	if(message.guild.id !== "893997835412971570") {
   	 return

	} else {

//we set the args variable!
const content = args.join(" ");

//the first If responsible for warning if the author does not put the suggestion
if (!args[0]) {
  return message.channel.send(`${message.author.username}, escreva a sugestão após o comando`)
  
//second If warns the author that he has passed 1k characters
} else if (content.length > 1000) {
  return message.channel.send(`${message.author.username}, forneça uma sugestão de no máximo 1000 caracteres.`);
} else {
  
 //We define the channel where the suggestion will be sent!
  const canal = message.guild.channels.cache.find(ch => ch.id === "933873226092781578");
  
  //we set the message in suggestion embed!
  const message_msg = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`:smile_cat: Temos uma nova sugestão!`)
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription(`Enviado por ${message.author.username}\n\n**sugestão:** \`${content}\`\nㅤ`)
    .setTimestamp()    
    .setFooter({ text:`Obrigado por sugerir ${message.author.tag} ...`})

    canal.send({ embeds: [message_msg] }).then(msg => {
      
 //we set the positive and negative emojis for voting
    let positivo = "<:K_1:947545373298290698>";
    let negativo = "<:K_1:947545394437578762>";
    msg.react(positivo) 
    msg.react(negativo)
    })

//Soon after submitting the suggestion, it will send a warning to an author that they deleted in seconds
message.channel.send(`${message.author} a mensagem foi enviada com sucesso!`).then(k => {
	setTimeout(() => {
  k.delete()
  }, 12000) 
  })
  }
  }
}
}
