const Discord = require("discord.js");
module.exports = {
    name: "historia",
    aliases: ["historia"],

run: async(client, message, args) => {
message.delete();

		if( message.guild.id !== "893997835412971570") {
	       return;
  	} else {
			
    const content2 = args.join(" ");

     if (!args[0]) {
          return message.channel.send(`${message.author.username}, sua pergunta sobre a historia de kettra....`)
    } else if (content2.length > 1000) {
          return message.channel.send(`${message.author.username}, forneça uma pergunta de no máximo 1000 caracteres.`);
                        } else {
   var canal = message.guild.channels.cache.find(ch => ch.id === "955517600236986389");
   
   const historia = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`<:K_new:942610996223180841> temos uma nova pergunta!`)
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription(`Enviado por ${message.author}\n\n**pergunta:** ${content2}\nㅤ`)
    .setTimestamp()    
    .setFooter({ text:`Obrigado por querer saber mais sobre a historia de kettta ${message.author.tag} ...`})
  
    canal.send({embeds: [historia]})
    
    message.channel.send(`${message.author} a mensagem foi enviada com sucesso!`).then(k => {
	setTimeout(() => {
                    k.delete()
               
                }, 12000) 
            })
	 }
}
}
}