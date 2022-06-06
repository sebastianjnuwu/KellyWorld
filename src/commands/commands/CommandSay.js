
//Import module accepted by hadler!
module.exports = {
    name: "say",
    aliases: ["falar", "say"],
  run: async (client, message, args) => {
 
 //first If to check if the person has permission to use it!
  if (!message.member.permissions.has("ADMINISTRATOR"))
    return message.reply(
      "Você não possui a permissão nescessária para utilizar esse comando!"
    );

    if (!message.guild.me.permissions.has('ADMINISTRATOR'))
        return message.channel
            .send(`${message.author} Eu não tenho a permissão necessária para isso!`);
            
   //We define the channel where the message should be sent as a mention!
    const canal = message.mentions.channels.first();
    
  //second If to warn that no channel has been set to send message!
    if (!canal) return message.channel.send(`${message.author} Você não mencionou um canal!`);   
   
   //responsible for picking up the messages and repeating!
    const mensagem =  args.slice(1).join(' ');
    
    //third party If responsible for notifying you that you have not defined the message to be sent!
    if (!mensagem) return message.reply("Defina uma mensagem!");
    
    //send the message on the defined channel!
    canal.send(mensagem);
    
    }
    //poiser we've reached the end once again!
};