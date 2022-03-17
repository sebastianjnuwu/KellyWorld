const Discord = require("discord.js");

module.exports = {
    name: "IP",
    aliases: ["ip"],
    run: async(client, message, msg, args) => {
       
try {
                
  message.author.send(`**Java Edition: \`kettraworld.jogar.io\`\nBedrock: \`190.115.197.81\`\nPorta: \`10001\`**`);

  message.reply("olhe o seu pv querido! ^^").then(m => {
                setTimeout(() => {
                    m.delete()
            
                }, 60000) 
            })
 
        } catch (e) {
            message.reply(`**Java Edition: \`kettraworld.jogar.io\`\nBedrock: \`190.115.197.81\`\nPorta: \`10001\`**`).then(m => {
                setTimeout(() => {
                    m.delete()
            
                }, 12000) 
            })
        }
    }
}
