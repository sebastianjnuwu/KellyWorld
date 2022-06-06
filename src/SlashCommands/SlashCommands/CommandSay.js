const { MessageEmbed, version, CommandInteraction, Client } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: 'say',
    description: , '🗣️ message using Kelly in a channel'
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'description',
            description: 'Tell me the description',
            type: 'STRING',
            required: true,
        },
        {
            name: 'canal',
            description: 'Enter the channel you want to send',
            type: 'CHANNEL',
            required: false,
        }
    ],
    run: async (client, interaction, args) => {

      
        let description = interaction.options.getString("description");
        let canal = interaction.options.getChannel('canal') || interaction.channel;
      try {

if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content: "Você não tem permissão para usar este comando!", ephemeral: true})
  

        interaction.reply({ content: `Anúncio enviado com sucesso no canal: <#${canal.id}>`, ephemeral: true })
        canal.send({content: `${description}`})


  } catch (err) {

        let dev_don = new Discord.MessageEmbed()
        .setDescription(`:noo: | ${interaction.user} Opss... algo de errado não está certo. User \`/reportbug\` para reportar! `)
        .setColor("#36393e")
        interaction.reply({embeds: [dev_don]});
        
    }
 }
} 
