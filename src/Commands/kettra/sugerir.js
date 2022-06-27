import { EmbedBuilder } from 'discord.js';

export default {
  name: 'sugerir',
  aliases: ['sugerir','sugestao','sugestão'],
  ownerOnly: false,
  async exec({ client, args, message, d, t }) {
  
  message.delete();
  
  if (message.guild.id !== "893997835412971570") {
   	 return;

  } else {

 const content = args.join(" ");

 if (!args[0]) return message.channel.send(`${message.author}, escreva a sugestão após o comando`).then(d);

  if (content.length > 1000) {
  return message.channel.send(`${message.author}, forneça uma sugestão de no máximo 1000 caracteres.`).then(d);
  } else {
 
 const canal = message.guild.channels.cache.find(ch => ch.id === "933873226092781578");
  
  const message_msg = new EmbedBuilder()
    .setColor("Random")
    .setTitle(`:smile_cat: Temos uma nova sugestão!`)
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription(`Enviado por ${message.author.username}\n\n**sugestão:** \`${content}\`\nㅤ`)
    .setTimestamp()    
    .setFooter({ text:`Obrigado por sugerir ${message.author.tag} ...`})

    canal.send({ embeds: [message_msg] }).then(msg => {
    let positivo = "<:K_1:947545373298290698>";
    let negativo = "<:K_1:947545394437578762>";
    msg.react(positivo);
    msg.react(negativo);
    });
  
  message.channel.send(`mensagem foi enviada para ${canal}`).then(d);
  
   }
  }
 }
};