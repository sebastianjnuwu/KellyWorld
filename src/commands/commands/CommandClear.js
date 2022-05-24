//Importing the packages used in this command!
const { Message,MessageEmbed } = require('discord.js');

//Import module accepted by hadler!
module.exports = {
  name: 'clear',
  aliases:["clear","limpar"],
  run: async (client, message, args) => {
   try {
          
  //define the arguments to be used
     let delamount = args[0];
  
  //check if there is permission!
   if (!message.member.permissions.has("MANAGE_MESSAGES")){return message.channel.send(`Lhe falta permissão para executar esse comando.`)}

  //check if you put a number to pay for messages!
   if (isNaN(delamount) || parseInt(delamount <= 0)) return message.reply('**Você não colocou nenhum número.**')

//You can only delete up to 100 messages on discord
  if (parseInt(delamount) > 99) return message.reply('Acho que você que apagar além do que eu posso, apago de **2 a 99 messagens**, sorry')  
  
   //deleting the messages
    await message.channel.bulkDelete(parseInt(delamount) + 1, true);
 
   //Send the following message to the author!
    await message.channel.send('*Deletando as messagens.*'). then(m => {
                setTimeout(() => {
                    m.delete()
               //@kettraworld
                }, 1000) // 1 seconds
            })
        } catch (e) {
            console.log(e)
        }
        //End of code? is not? I think so!
    }
				}