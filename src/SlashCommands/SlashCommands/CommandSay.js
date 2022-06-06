//importing the packages that will be used!
const Discord = require("discord.js");

module.exports =  {
  name: "say", 
  description: "🗣️ talk in a chat using the bot", 
  type: "CHAT_INPUT",
  options: [{
        name: 'mensagem',
        description: 'Digite as palavras que você quer que eu fale!',
        type: 'STRING',
        required: true,
    }],
  run: async (client, args, options, interaction) => {
  
  if (!message.guild.me.permissions.has('ADMINISTRATOR'))
       return interaction.reply({ content: "<:K_negado:943604703378415688> Eu preciso da permissão de `ADMINISTRADOR` para executar este comando!", ephemeral: true });
  
  if (!interaction.member.permissions.has("ADMINISTRATOR")) 
      return interaction.reply({ content: "<:K_negado:943604703378415688> você não tem a permissão necessaria para usar este comando, você precisa ter a permissão de `ADMINISTRADOR`", ephemeral: true });
  
  
  }
}