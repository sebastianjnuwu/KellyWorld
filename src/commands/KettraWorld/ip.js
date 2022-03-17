const Discord = require("discord.js");

module.exports = {
    name: "IP",
    aliases: ["ip"],
    run: async(client, message, msg, args) => {
      
  message.author.send(`**Java Edition: \`kettraworld.jogar.io\`\nBedrock: \`190.115.197.81\`\nPorta: \`10001\`**`).catch((e) => {
    message.channel.send(`**Java Edition: \`kettraworld.jogar.io\`\nBedrock: \`190.115.197.81\`\nPorta: \`10001\`**`)
  })
    }
}