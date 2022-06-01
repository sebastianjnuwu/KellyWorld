//importing the packages that will be used!
const Discord = require("discord.js");

//Slash Commands export module
module.exports = {
    name: 'avatar',
    description: "📷 show your avatar or that of your friends!",
  type: "CHAT_INPUT",
    options: [{
        name:'usuario',
        type: 'USER',
        description: 'Seleciona um usuário',
        required: false,
    }],
    run: async (client, interaction, options) => {
       
//we define the user!
const user = interaction.options.geUser('usuario') || interaction.member.user

        const embed = new Discord.MessageEmbed()
            .setTitle(`🖼️ Avatar de ${user.username}`)
            .setColor('BLUE')
            .setImage(user.displayAvatarURL({
                dynamic: true,
                size: 1024
            }))
        
        await interaction.reply({ embeds: [embed] });
    } //will be the end of the command? I think so!
}