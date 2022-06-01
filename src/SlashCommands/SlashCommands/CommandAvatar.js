//importing the packages that will be used!
const {
    MessageEmbed
} = require('discord.js')

//Slash Commands export module
module.exports = {
    name: 'avatar',
    description: "📷 show your avatar or that of your friends!",
  type: "CHAT_INPUT",
    options: [{
        name: 'membro',
        type: 'USER',
        description: 'Seleciona o usuário',
        required: false,
    }],
    run: async (client, interaction, options) => {
        const user = interaction.options.getUser('membro') || interaction.member.user

        const embed = new MessageEmbed()
            .setTitle(`Avatar de ${user.username}`)
            .setColor('BLUE')
            .setImage(user.displayAvatarURL({
                dynamic: true,
                size: 1024
            }))
            .setDescription(`[Png](${user.avatarURL({ format: 'png' })}) | [Webp](${user.avatarURL({ dynamic: true })}) | [Jpg](${user.avatarURL({ format: 'jpg' })})`)
        
        await interaction.reply({ embeds: [embed] });
    }
    //I think it's the end!
} 
