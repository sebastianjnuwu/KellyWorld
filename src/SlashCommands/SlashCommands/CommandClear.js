// listing the packages used!
const Discord = require('discord.js')

//módulo de importação de comandos em slash
module.exports = {
    name: 'clear',
    description: '🧹 clean your junk chat!',
    type: 'CHAT_INPUT',
    options: [{
        name: 'quantidade',
        description: 'Número de mensagens para serem apagadas.',
        type: 'NUMBER',
        required: true,
    }],
   run: async (client, interaction, options) => {
    
    let delamount = interaction.options.getNumber('quantidade');

    if (!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content: `:K_negado: | Você não possui permissão para utilizar este comando.`, ephemeral: true });
    
    if (parseInt(delamount) > 99) return interaction.reply({ content: `Voce pode apagar apenas de 1 a 99 mensagens`, ephemeral: true });

    await interaction.channel.bulkDelete(parseInt(delamount), true);
    interaction.reply({ content: `o chat teve ${delamount} apagadas!`, ephemeral: true });

   }
};