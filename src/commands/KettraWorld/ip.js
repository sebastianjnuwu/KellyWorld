const Discord = require("discord.js");

module.exports = {
    name: "IP",
    aliases: ["ip"],

    run: async(client, message, msg, args) => {
        
try {
message.reply("olhe o seu pv querido! ^^")
                
message.author.send(`**Java Edition: \`kettraworld.jogar.io\`\nBedrock: \`190.115.197.81\`\nPorta: \`10001\`**`);
 
        } catch (e) {
            message.reply(`**Java Edition: \`kettraworld.jogar.io\`\nBedrock: \`190.115.197.81\`\nPorta: \`10001\`**`).then(m => {
                setTimeout(() => {
                    m.delete()
               //@kettraworld
                }, 12000) //seconds
            })
        }
    }
}
 