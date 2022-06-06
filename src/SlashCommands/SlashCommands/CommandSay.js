//importing the packages that will be used!
const Discord = require("discord.js");

//import module
module.exports =  {
  name: "say", 
  description: "🗣️ talk in a chat using the bot", 
  type: "CHAT_INPUT",
  options: [
    {
      name: 'canal'
      description: 'Qual canal onde sera enviada a mensagem?'
      type: 'CHANNEL'
    },
    {
        name: 'mensagem',
        description: 'Digite as palavras que você quer que eu fale!',
        type: 'STRING',
        required: true,
    }],
  run: async (client, args, options, interaction) => {
  
  //permission the bot needs to use the command
  if (!message.guild.me.permissions.has('ADMINISTRATOR'))
       return interaction.reply({ content: "<:K_negado:943604703378415688> Eu preciso da permissão de `ADMINISTRADOR` para executar este comando!", ephemeral: true });
  
  //the necessary permission that the member must have
  if (!interaction.member.permissions.has("ADMINISTRATOR")) 
      return interaction.reply({ content: "<:K_negado:943604703378415688> você não tem a permissão necessaria para usar este comando, você precisa ter a permissão de `ADMINISTRADOR`", ephemeral: true });
  
 // we define the channel where the message will be sent
  let canal = interaction.options.getChannel("canal");
  
  //we define the message that will be quoted
  let mensagem = interaction.options.getString("mensagem");
  
  //send the message on the indicated channel
  interaction.reply({content: `${mensagem}`});

  }
  //finally finished the slash code '-'
}