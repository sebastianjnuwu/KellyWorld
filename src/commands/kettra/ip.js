const Discord = require("discord.js");

module.exports = {
    name: "IP",
    aliases: ["ip"],
    run: async(client, message, msg, args) => {
  
   message.delete()
 	if( message.guild.id !== "893997835412971570") {
	  return
	} else {
   message.author.send(`${message.author}\n\n**Java Edition: \`kettraworld.jogar.io\`\nBedrock: \`190.115.197.81\`\nPorta: \`10001\`**`).catch((e) => {
   message.channel.send(`${message.author}\n\n**Java Edition: \`kettraworld.jogar.io\`\nBedrock: \`190.115.197.81\`\nPorta: \`10001\`**`)
  })
  
    }
}
}