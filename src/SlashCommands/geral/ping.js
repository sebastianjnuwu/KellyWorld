const Discord = require("discord.js")

module.exports =  {
    name: "ping",
    description: "Que ver meu ping?",
    type: "CHAT_INPUT",    
    
    run: async (client, interaction, args) => {

        let don = new Discord.MessageEmbed()
        .setColor("#36393e")
        .setDescription(`**\\📡 Meu ping está em** \`${client.ws.ping}ms\`**.**`);

        interaction.reply({ embeds: [don] });

    }
}