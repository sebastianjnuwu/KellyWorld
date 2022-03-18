const {Client,Message,MessageEmbed} = require('discord.js');

module.exports = {

  name: 'clear',

  aliases:["clear","limpar"],
    run: async (client, message, args, Discord) => {
        try {
            let delamount = args[0];

            if (!message.member.permissions.has("MANAGE_MESSAGES")){return message.channel.send(`Lhe falta permissão para executar esse comando.`)}

            if (isNaN(delamount) || parseInt(delamount <= 0)) return message.reply('**Você não colocou nenhum número.**')

            if (parseInt(delamount) > 99) return message.reply('Acho que você que apagar além do que eu posso, apago de **2 a 99 messagens**, sorry')


            await message.channel.bulkDelete(parseInt(delamount) + 1, true);

            await message.channel.send('*Deletando as messagens.*'). then(m => {
                setTimeout(() => {
                    m.delete()
               //@kettraworld
                }, 1000) // 1 seconds
            })
        } catch (e) {
            console.log(e)
        }
    }
				}