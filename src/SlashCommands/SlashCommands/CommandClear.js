// listing the packages used!
const Discord = require('discord.js')

//módulo de importação de comandos em slash
module.exports = {
    name: 'clear',
    description: '🗑️ limpar as mensagens do canal?',
    type: 'CHAT_INPUT',
    options: [{
        name: 'quantidade',
        description: 'Número de mensagens para serem apagadas.',
        type: 'NUMBER',
        required: true,
    }],
   run: async (client, interaction, options) => {
    
    let delamount = interaction.options.getNumber('quantidade');

    if(!interaction.guild.me.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "<:K_negado:943604703378415688> | eu não tenho a permissão de `ADMINISTRADOR`.....", ephemeral: true });
    
    if (!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content: `<:K_negado:943604703378415688> | Você não possui permissão para utilizar este comando.`, ephemeral: true });
    
    if (delamount <= 0) return interaction.reply({ content: `<:K_negado:943604703378415688> | Voce pode apagar apenas de 1 a 99 mensagens`, ephemeral: true });

    if (parseInt(delamount) > 99) return interaction.reply({ content: `<:K_negado:943604703378415688> | Voce pode apagar apenas de 1 a 99 mensagens`, ephemeral: true });

    await interaction.channel.bulkDelete(parseInt(delamount), true);
    interaction.reply({ content: `o chat teve ${delamount} apagadas!`, ephemeral: true });

   }
};