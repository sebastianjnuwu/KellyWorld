const { MessageEmbed, version, CommandInteraction, Client } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: 'say',
    description:  '🗣️ message using Kelly in a channel',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'description',
            description: 'coloque a mensagem a ser enviada!',
            type: 'STRING',
            required: true,
        },
        {
            name: 'canal',
            description: 'o canal a ser enviada!',
         type            required: false,
        }
    ],
    run: async (client, interaction, args) => {

      
        let description = interaction.options.getString("description");
        let canal = interaction.options.getChannel('canal') || interaction.channel;
      try {

if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content: "<:K_negado:943604703378415688> | Você não tem permissão para usar este comando!", ephemeral: true})
  

        interaction.reply({ content: `Anúncio enviado com sucesso no canal: <#${canal.id}>`, ephemeral: true })
        canal.send({content: `${description}`})


  } catch (err) {

        let Erro = new Discord.MessageEmbed()
        .setDescription(`<:K_negado:943604703378415688> | ${interaction.user} Opss... algo de errado não está certo.`)
        .setColor("#36393e")
        interaction.reply({embeds: [Erro]});
        
    }
 }
} 
